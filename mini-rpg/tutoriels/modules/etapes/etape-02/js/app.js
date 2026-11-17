// Le jeu : ce qui n'a pas encore été rangé dans un module

import { nombreAuHasard, attendre, chargerJson } from "./outils.js";

// Les sons du jeu : nom -> fichier (téléchargés sur opengameart.org, voir l'étape 01)
const FICHIERS_SONS = {
    // Effets
    pas: "sons/pas.wav",
    collision: "sons/collision.wav",
    rencontre: "sons/rencontre.wav",
    attaque: "sons/attaque.wav",
    degats: "sons/degats.wav",
    soin: "sons/soin.wav",
    victoire: "sons/victoire.wav",
    defaite: "sons/defaite.wav",
    magie: "sons/magie.wav",
    // Musiques
    musiqueCarte: "sons/musique-carte.mp3",
    musiqueCombat: "sons/musique-combat.mp3"
};

// Tous les sons du jeu. Le reste du code ne touche jamais aux objets Audio :
// il demande simplement sons.jouer("attaque").
class Sons {
    constructor(fichiers) {
        this.fichiers = fichiers;
        this.volumeEffets = 0.6;  // de 0 (silence) à 1 (maximum)
        this.audios = {};         // nom -> objet Audio
        this.volumeMusique = 0.35; // plus bas que les effets, pour ne pas les couvrir
        this.nomMusique = null;    // la musique en cours
        this.muet = localStorage.getItem("muet") === "oui"; // choix retenu

        // Un objet Audio par fichier : le navigateur commence à les télécharger
        for (const nom in fichiers) {
            this.audios[nom] = new Audio(fichiers[nom]);
            this.audios[nom].muted = this.muet;
        }
    }

    // Joue un effet. On joue une copie : le même son peut se superposer à lui-même.
    jouer(nom, volume = this.volumeEffets) {
        const audio = this.audios[nom];
        if (!audio) return; // nom inconnu : on ne fait rien

        const copie = audio.cloneNode();
        copie.volume = volume;
        copie.muted = this.muet;
        copie.play().catch(() => {}); // fichier absent ou navigateur qui refuse : on ignore
    }

    // Lance une musique en boucle (une seule à la fois), avec un fondu d'entrée
    jouerMusique(nom) {
        if (nom === this.nomMusique) return; // déjà en cours

        this.arreterMusique();
        this.nomMusique = nom;

        const audio = this.audios[nom];
        if (!audio) return;

        audio.loop = true;       // recommence au début quand elle se termine
        audio.volume = 0;        // on part du silence...
        audio.play().catch(() => {});
        this.fondu(audio, this.volumeMusique); // ...et on monte doucement
    }

    // Coupe la musique en cours, avec un fondu de sortie
    arreterMusique() {
        const audio = this.audios[this.nomMusique];
        this.nomMusique = null;
        if (!audio) return;

        this.fondu(audio, 0, () => {
            audio.pause();
            audio.currentTime = 0; // la prochaine fois, depuis le début
        });
    }

    // Fait glisser le volume vers "cible", un petit cran toutes les 50 ms
    fondu(audio, cible, quandFini) {
        clearInterval(audio.minuteur); // annule un fondu déjà en cours

        audio.minuteur = setInterval(() => {
            const ecart = cible - audio.volume;

            if (Math.abs(ecart) <= 0.05) {   // presque arrivé : on s'arrête
                audio.volume = cible;
                clearInterval(audio.minuteur);
                if (quandFini) quandFini();
            } else if (ecart > 0) {
                audio.volume += 0.05;        // on monte
            } else {
                audio.volume -= 0.05;        // on descend
            }
        }, 50);
    }

    // Coupe ou remet tous les sons, et retient le choix
    basculerMuet() {
        this.muet = !this.muet;
        localStorage.setItem("muet", this.muet ? "oui" : "non");

        for (const nom in this.audios) {
            this.audios[nom].muted = this.muet;
        }
    }

    // Demande chaque fichier au serveur, renvoie les noms de ceux qui manquent
    async verifierFichiers() {
        const manquants = [];

        for (const nom in this.fichiers) {
            const reponse = await fetch(this.fichiers[nom]);
            if (!reponse.ok) {
                console.warn("Son manquant :", nom, "(" + this.fichiers[nom] + ")");
                manquants.push(nom);
            }
        }
        return manquants;
    }
}

// Le moule commun à tous les combattants
class Personnage {
    constructor(nom, pvMax, degatsMin, degatsMax) {
        this.nom = nom;
        this.pvMax = pvMax;
        this.pv = pvMax;
        this.degatsMin = degatsMin;
        this.degatsMax = degatsMax;
    }

    recevoirDegats(degats) {
        this.pv = Math.max(0, this.pv - degats);
    }

    recevoirSoin(montant) {
        this.pv = Math.min(this.pvMax, this.pv + montant);
    }

    estVaincu() {
        return this.pv <= 0;
    }

    restaurer() {
        this.pv = this.pvMax;
    }

    // Frappe la cible et renvoie les dégâts infligés
    attaquer(cible) {
        const degats = nombreAuHasard(this.degatsMin, this.degatsMax);
        cible.recevoirDegats(degats);
        return degats;
    }
}

// Le héros : par défaut 100 PV, attaque de 10 à 20, sait se soigner
class Heros extends Personnage {
    constructor(nom, pvMax = 100, degatsMin = 10, degatsMax = 20) {
        super(nom, pvMax, degatsMin, degatsMax);
        this.emoji = "🤺";
        this.manaMax = 0;  // un chevalier n'a pas de mana...
        this.mana = 0;
        this.sorts = [];   // ...et ne connaît aucun sort
    }

    // Un héros sans mana n'en récupère pas : cette version ne fait rien.
    // Le Mage a sa propre version, qui remplace celle-ci.
    regenererMana(montant) {}

    attaquer(cible) {
        const degats = super.attaquer(cible);
        return "⚔️ Tu infliges " + degats + " dégâts !";
    }

    soigner() {
        this.recevoirSoin(15);
        return "💚 Tu récupères 15 PV.";
    }
}

// Un sort d'attaque : un nom, un coût en mana, des dégâts
class Sort {
    constructor(nom, emoji, cout, effetMin, effetMax, son = "magie") {
        this.nom = nom;
        this.emoji = emoji;
        this.cout = cout;         // mana dépensé
        this.effetMin = effetMin;
        this.effetMax = effetMax;
        this.son = son;           // le nom du son à jouer (voir FICHIERS_SONS)
    }

    // Applique l'effet du sort et renvoie le message du journal
    lancer(lanceur, cible) {
        const degats = nombreAuHasard(this.effetMin, this.effetMax);
        cible.recevoirDegats(degats);
        return this.emoji + " " + this.nom + " : " + degats + " dégâts !";
    }
}

// Un sort de soin : même moule que Sort, mais il soigne le lanceur
class SortDeSoin extends Sort {
    lancer(lanceur, cible) {
        const soin = nombreAuHasard(this.effetMin, this.effetMax);
        lanceur.recevoirSoin(soin);
        return this.emoji + " " + this.nom + " : +" + soin + " PV !";
    }
}

// Le mage : moins de PV, un bâton qui tape peu... mais du mana pour la magie
class Mage extends Heros {
    constructor(nom) {
        super(nom, 80, 4, 8);
        this.emoji = "🧙";
        this.manaMax = 50;
        this.mana = this.manaMax;
        this.sorts = [
            new Sort("Éclair", "⚡", 10, 12, 18),
            new Sort("Boule de feu", "🔥", 20, 20, 30),
            new SortDeSoin("Lumière", "✨", 15, 25, 35, "soin")
        ];
    }

    // Assez de mana pour ce sort ?
    peutLancer(sort) {
        return this.mana >= sort.cout;
    }

    // Dépense le mana, puis laisse le sort agir
    lancerSort(sort, cible) {
        this.mana -= sort.cout;
        return sort.lancer(this, cible);
    }

    // Le mana remonte, sans dépasser le maximum
    regenererMana(montant) {
        this.mana = Math.min(this.manaMax, this.mana + montant);
    }

    // Après une défaite : PV et mana au maximum
    restaurer() {
        super.restaurer();
        this.mana = this.manaMax;
    }
}

// Un monstre, fabriqué à la main ou à partir des données de PokeAPI
class Monstre extends Personnage {
    constructor(nom, pvMax, degatsMin, degatsMax, sprite = "") {
        super(nom, pvMax, degatsMin, degatsMax);
        this.sprite = sprite; // adresse de l'image
    }

    // "static" : s'appelle sur la classe (Monstre.depuisApi), pas sur un objet
    static async depuisApi(idOuNom) {
        const donnees = await chargerJson("https://pokeapi.co/api/v2/pokemon/" + idOuNom);

        // Cherche dans le tableau "stats" la statistique de ce nom
        const stat = (nom) => donnees.stats.find((s) => s.stat.name === nom).base_stat;
        const attaque = stat("attack");
        const nom = donnees.name[0].toUpperCase() + donnees.name.slice(1); // "gengar" -> "Gengar"

        return new Monstre(
            nom,
            stat("hp"),                              // PV
            Math.max(1, Math.round(attaque / 10)),   // dégâts mini
            Math.max(1, Math.round(attaque / 5)),    // dégâts maxi
            donnees.sprites.front_default            // image
        );
    }

    attaquer(cible) {
        const degats = super.attaquer(cible);
        return "👹 " + this.nom + " riposte : -" + degats + " PV !";
    }
}

// Un monstre au hasard parmi les 151 premiers, ou un gobelin si l'API échoue
async function chargerMonstreAleatoire() {
    try {
        return await Monstre.depuisApi(nombreAuHasard(1, 151));
    } catch (erreur) {
        console.error(erreur);
        return new Monstre("Gobelin", 80, 5, 15); // le plan B, fait main
    }
}

// Le message principal et la liste des derniers événements
class Journal {
    constructor(liste, message, taille) {
        this.liste = liste;
        this.message = message;
        this.taille = taille;
        this.evenements = [];
    }

    ajouter(texte) {
        this.message.textContent = texte;
        this.evenements.push(texte);
        this.afficher();
    }

    afficher() {
        this.liste.innerHTML = "";

        const debut = Math.max(0, this.evenements.length - this.taille);
        for (let i = debut; i < this.evenements.length; i++) {
            const ligne = document.createElement("li");
            ligne.textContent = this.evenements[i];
            this.liste.appendChild(ligne);
        }
    }
}

// La carte : une grille de tuiles décrite par map.json
class Carte {
    constructor(donnees, conteneur) {
        this.taille = donnees.tailleTile;
        this.obstacles = donnees.obstacles;
        this.depart = donnees.depart;
        this.conteneur = conteneur;

        // Chaque ligne de texte est découpée en caractères, puis en types de tuile
        this.tuiles = donnees.lignes.map((ligne) =>
            ligne.split("").map((symbole) => donnees.legende[symbole])
        );
        this.hauteur = this.tuiles.length;
        this.largeur = this.tuiles[0].length;

        this.afficher();
    }

    // Type de la tuile en (x, y), ou undefined si on est hors de la carte
    typeEn(x, y) {
        return this.tuiles[y]?.[x];
    }

    // Collision : hors carte (bordures) ou sur un obstacle = interdit
    estPraticable(x, y) {
        const type = this.typeEn(x, y);
        return type !== undefined && !this.obstacles.includes(type);
    }

    afficher() {
        this.conteneur.innerHTML = "";
        this.conteneur.style.gridTemplateColumns =
            "repeat(" + this.largeur + ", " + this.taille + "px)";

        for (let y = 0; y < this.hauteur; y++) {
            for (let x = 0; x < this.largeur; x++) {
                const tuile = document.createElement("div");
                tuile.className = "tile-" + this.tuiles[y][x];
                tuile.style.height = this.taille + "px";
                this.conteneur.appendChild(tuile);
            }
        }
    }
}

// Le joueur sur la carte : position, clavier, collisions et rencontres
class Exploration {
    constructor(carte, sons, emoji) {
        this.carte = carte;
        this.sons = sons;
        this.x = carte.depart.x;
        this.y = carte.depart.y;
        this.actif = true;
        this.surRencontre = () => {}; // branché depuis l'extérieur

        this.element = document.createElement("div");
        this.element.className = "joueur";
        this.element.textContent = emoji;
        this.element.style.width = carte.taille + "px";
        this.element.style.height = carte.taille + "px";
        carte.conteneur.appendChild(this.element);

        document.addEventListener("keydown", (evenement) => this.toucheAppuyee(evenement));
        this.afficher();
    }

    toucheAppuyee(evenement) {
        // Pour chaque touche : [déplacement en x, déplacement en y]
        const directions = {
            ArrowUp: [0, -1],
            ArrowDown: [0, 1],
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0]
        };
        const direction = directions[evenement.key];

        if (direction) {
            evenement.preventDefault(); // empêche la page de défiler
            this.deplacer(direction[0], direction[1]);
        }
    }

    deplacer(dx, dy) {
        if (!this.actif) return;

        const x = this.x + dx;
        const y = this.y + dy;
        if (!this.carte.estPraticable(x, y)) {
            this.sons.jouer("collision"); // collision : bruit, et on ne bouge pas
            return;
        }

        this.x = x;
        this.y = y;
        this.afficher();
        this.sons.jouer("pas", 0.3);      // les pas, plus discrets

        // Dans l'herbe haute : 1 chance sur 4 de rencontrer un monstre
        if (this.carte.typeEn(x, y) === "herbe" && Math.random() < 0.25) {
            this.sons.jouer("rencontre");
            this.surRencontre();
        }
    }

    // Après une défaite : retour à la case de départ
    replacerAuDepart() {
        this.x = this.carte.depart.x;
        this.y = this.carte.depart.y;
        this.afficher();
    }

    // Place le joueur à l'écran selon sa case
    afficher() {
        this.element.style.left = this.x * this.carte.taille + "px";
        this.element.style.top = this.y * this.carte.taille + "px";
    }
}

// Le chef d'orchestre : page, tours de jeu et fin du combat
class Combat {
    constructor(heros, journal, sons) {
        this.heros = heros;
        this.journal = journal;
        this.sons = sons;
        this.monstre = null;      // pas encore d'adversaire
        this.enCours = false;
        this.surRetour = () => {}; // branché depuis l'extérieur

        this.nomHeros = document.getElementById("nom-heros");
        this.zoneMana = document.getElementById("zone-mana");
        this.textePvJoueur = document.getElementById("pv-joueur");
        this.texteManaJoueur = document.getElementById("mana-joueur");
        this.barreMana = document.getElementById("barre-mana");
        this.textePvMonstre = document.getElementById("pv-monstre");
        this.nomMonstre = document.getElementById("nom-monstre");
        this.spriteMonstre = document.getElementById("sprite-monstre");
        this.barreJoueur = document.getElementById("barre-joueur");
        this.barreMonstre = document.getElementById("barre-monstre");
        this.boutonAttaque = document.getElementById("btn-attaque");
        this.boutonSoin = document.getElementById("btn-soin");
        this.boutonRetour = document.getElementById("btn-retour");
        this.zoneSorts = document.getElementById("sorts");

        // Flèche () => : "this" reste le combat quand on clique
        this.boutonAttaque.addEventListener("click", () => this.attaquer());
        this.boutonSoin.addEventListener("click", () => this.soigner());
        this.boutonRetour.addEventListener("click", () => this.surRetour());

        this.nomHeros.textContent = heros.emoji + " " + heros.nom;
        this.zoneMana.hidden = heros.manaMax === 0; // pas de mana : pas de barre
        this.creerBoutonsSorts();
    }

    // Un bouton par sort connu du héros
    creerBoutonsSorts() {
        this.boutonsSorts = [];

        for (const sort of this.heros.sorts) {
            const bouton = document.createElement("button");
            bouton.textContent = sort.emoji + " " + sort.nom + " (" + sort.cout + " mana)";
            bouton.sort = sort; // on accroche le sort à son bouton
            bouton.addEventListener("click", () => this.lancerSort(sort));

            this.zoneSorts.appendChild(bouton);
            this.boutonsSorts.push(bouton);
        }
    }

    // Un sort n'est cliquable que pendant le combat, et avec assez de mana
    mettreAJourSorts() {
        for (const bouton of this.boutonsSorts) {
            bouton.disabled = !this.enCours || !this.heros.peutLancer(bouton.sort);
        }
    }

    // Lance un combat contre ce monstre
    demarrer(monstre) {
        this.monstre = monstre;
        this.enCours = true;

        this.boutonAttaque.disabled = false;
        this.boutonSoin.disabled = false;
        this.boutonRetour.hidden = true;

        this.afficherMonstre();
        this.journal.ajouter("❗ " + monstre.nom + " sauvage apparaît !");
        this.afficherVie();
    }

    afficherMonstre() {
        this.nomMonstre.textContent = this.monstre.nom;
        this.spriteMonstre.src = this.monstre.sprite;
        this.spriteMonstre.alt = this.monstre.nom;
        this.spriteMonstre.hidden = this.monstre.sprite === ""; // le gobelin n'a pas d'image
    }

    afficherVie() {
        this.textePvJoueur.textContent = this.heros.pv;
        this.textePvMonstre.textContent = this.monstre.pv;
        this.barreJoueur.style.width = (this.heros.pv / this.heros.pvMax) * 100 + "%";
        this.barreMonstre.style.width = (this.monstre.pv / this.monstre.pvMax) * 100 + "%";

        // Le mana, comme les PV : un texte et une barre (si le héros en a)
        if (this.heros.manaMax > 0) {
            this.texteManaJoueur.textContent = this.heros.mana;
            this.barreMana.style.width = (this.heros.mana / this.heros.manaMax) * 100 + "%";
        }

        this.mettreAJourSorts(); // le mana a peut-être changé
    }

    riposte() {
        this.sons.jouer("degats");
        this.journal.ajouter(this.monstre.attaquer(this.heros));
        this.heros.regenererMana(5); // fin du tour : le mage récupère un peu de mana
    }

    verifierFin() {
        if (this.monstre.estVaincu()) {
            this.journal.ajouter("🎉 Victoire ! " + this.monstre.nom + " est vaincu !");
            this.enCours = false;
            this.sons.arreterMusique();     // place au jingle de fin
            this.sons.jouer("victoire");
        } else if (this.heros.estVaincu()) {
            this.journal.ajouter("💀 Défaite... Le héros est à terre.");
            this.enCours = false;
            this.sons.arreterMusique();     // place au jingle de fin
            this.sons.jouer("defaite");
        }

        if (!this.enCours) {
            this.boutonAttaque.disabled = true;
            this.boutonSoin.disabled = true;
            this.boutonRetour.hidden = false;
        }
    }

    attaquer() {
        if (!this.enCours) return;

        this.sons.jouer("attaque");
        this.journal.ajouter(this.heros.attaquer(this.monstre));

        this.verifierFin();
        if (this.enCours) {
            this.riposte();
            this.verifierFin();
        }
        this.afficherVie();
    }

    lancerSort(sort) {
        if (!this.enCours || !this.heros.peutLancer(sort)) return;

        this.sons.jouer(sort.son);
        this.journal.ajouter(this.heros.lancerSort(sort, this.monstre));
        this.spriteMonstre.animate(            // le monstre s'illumine
            [{ filter: "brightness(3)" }, { filter: "none" }],
            400
        );

        this.verifierFin();
        if (this.enCours) {
            this.riposte();
            this.verifierFin();
        }
        this.afficherVie();
    }

    soigner() {
        if (!this.enCours) return;

        this.sons.jouer("soin");
        this.journal.ajouter(this.heros.soigner());

        this.riposte();
        this.verifierFin();
        this.afficherVie();
    }
}

/* ===== LE DÉMARRAGE ===== */

async function demarrerJeu(heros) {
    const ecranCarte = document.getElementById("carte");
    const ecranCombat = document.getElementById("combat");
    const boutonSon = document.getElementById("btn-son");
    const statut = document.getElementById("statut");

    const sons = new Sons(FICHIERS_SONS);
    statut.textContent = "⏳ Vérification des sons...";
    const manquants = await sons.verifierFichiers();
    statut.textContent = manquants.length > 0
        ? "🔇 Son(s) introuvable(s) : " + manquants.join(", ")
        : "🎵 Flèches du clavier pour se déplacer.";

    const journal = new Journal(
        document.getElementById("journal"),
        document.getElementById("message"),
        5
    );
    const combat = new Combat(heros, journal, sons);

    const carte = new Carte(await chargerJson("map.json"), ecranCarte);
    const exploration = new Exploration(carte, sons, heros.emoji);

    // Les navigateurs interdisent la musique avant une action du joueur :
    // on la lance à la première touche appuyée ("once" : une seule fois)
    document.addEventListener("keydown", () => sons.jouerMusique("musiqueCarte"), { once: true });

    // Rencontre : on charge un monstre, puis on passe de la carte au combat
    exploration.surRencontre = async () => {
        exploration.actif = false;                // plus de déplacement
        ecranCarte.classList.add("rencontre");    // la carte clignote
        const monstre = await chargerMonstreAleatoire();
        await attendre(800);                      // le temps de voir le clignotement
        ecranCarte.classList.remove("rencontre");

        combat.demarrer(monstre);
        sons.jouerMusique("musiqueCombat");
        ecranCarte.hidden = true;
        ecranCombat.hidden = false;
    };

    // Bouton muet : l'icône suit l'état des sons
    boutonSon.textContent = sons.muet ? "🔇" : "🔊";
    boutonSon.addEventListener("click", () => {
        sons.basculerMuet();
        boutonSon.textContent = sons.muet ? "🔇" : "🔊";
    });

    // Fin du combat : retour à la carte (au départ si le héros est tombé)
    combat.surRetour = () => {
        if (heros.estVaincu()) {
            heros.restaurer();               // PV et mana au maximum
            exploration.replacerAuDepart();
        } else {
            heros.regenererMana(20);         // la victoire redonne des forces
        }
        ecranCombat.hidden = true;
        ecranCarte.hidden = false;
        exploration.actif = true;
        sons.jouerMusique("musiqueCarte");
    };
}

// L'écran de choix : le jeu démarre avec le héros choisi
function choisirHeros(heros) {
    document.getElementById("choix").hidden = true;
    demarrerJeu(heros);
}

document.getElementById("btn-chevalier").addEventListener("click", () => choisirHeros(new Heros("Chevalier")));
document.getElementById("btn-mage").addEventListener("click", () => choisirHeros(new Mage("Mage")));
