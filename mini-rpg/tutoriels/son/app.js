/* ===== 1. LES CLASSES ===== */

// Renvoie un entier au hasard entre min et max (inclus)
function nombreAuHasard(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Met le programme en pause pendant "ms" millisecondes (à utiliser avec await)
function attendre(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Charge une adresse et renvoie son contenu JSON
async function chargerJson(url) {
    const reponse = await fetch(url);
    if (!reponse.ok) {
        throw new Error("Erreur " + reponse.status + " pour " + url);
    }
    return reponse.json();
}

// Les sons du jeu : nom -> fichier (à télécharger sur opengameart.org)
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
    // Musiques (jouées en boucle)
    musiqueCarte: "sons/musique-carte.mp3",
    musiqueCombat: "sons/musique-combat.mp3"
};

const VOLUME_EFFETS = 0.6;
const VOLUME_MUSIQUE = 0.35;

// Charge, joue et coupe les sons. Un son manquant ne bloque jamais le jeu.
class Sons {
    constructor(fichiers) {
        this.fichiers = fichiers;
        this.audios = {};          // nom -> objet Audio prêt à jouer
        this.nomMusique = null;    // musique en cours
        this.muet = localStorage.getItem("muet") === "oui";
    }

    // Charge tous les fichiers en parallèle, renvoie les noms de ceux qui manquent
    async charger() {
        const manquants = [];

        await Promise.all(Object.keys(this.fichiers).map(async (nom) => {
            try {
                this.audios[nom] = await this.chargerUn(this.fichiers[nom]);
            } catch (erreur) {
                console.warn("Son manquant :", nom, erreur.message);
                manquants.push(nom);
            }
        }));

        return manquants;
    }

    // Télécharge un fichier avec fetch et le transforme en objet Audio
    async chargerUn(url) {
        const reponse = await fetch(url);
        if (!reponse.ok) {
            throw new Error("Erreur " + reponse.status + " pour " + url);
        }
        const blob = await reponse.blob(); // le fichier brut, en mémoire
        const audio = new Audio(URL.createObjectURL(blob));
        audio.muted = this.muet;
        return audio;
    }

    // Joue un effet (on peut le rejouer avant la fin du précédent)
    jouer(nom) {
        const audio = this.audios[nom];
        if (!audio) return;

        const copie = audio.cloneNode();
        copie.volume = VOLUME_EFFETS;
        copie.muted = this.muet;
        copie.play().catch(() => {}); // le navigateur peut refuser : on ignore
    }

    // Lance une musique en boucle, avec un fondu d'entrée
    jouerMusique(nom) {
        if (nom === this.nomMusique) return;

        this.arreterMusique();
        this.nomMusique = nom;

        const audio = this.audios[nom];
        if (!audio) return;

        audio.loop = true;
        audio.volume = 0;
        audio.play().catch(() => {});
        this.fondu(audio, VOLUME_MUSIQUE, 600);
    }

    // Coupe la musique en cours, avec un fondu de sortie
    arreterMusique() {
        const audio = this.audios[this.nomMusique];
        this.nomMusique = null;
        if (!audio) return;

        this.fondu(audio, 0, 600, () => {
            audio.pause();
            audio.currentTime = 0;
        });
    }

    // Fait glisser le volume vers "cible" en "duree" millisecondes
    fondu(audio, cible, duree, apres) {
        clearInterval(audio.minuteur); // annule un fondu déjà en cours

        const pas = (cible - audio.volume) / (duree / 50);
        audio.minuteur = setInterval(() => {
            const volume = audio.volume + pas;
            const fini = pas > 0 ? volume >= cible : volume <= cible;

            audio.volume = fini ? cible : volume;
            if (fini) {
                clearInterval(audio.minuteur);
                if (apres) apres();
            }
        }, 50);
    }

    // Coupe ou remet tous les sons, et retient le choix
    basculerMuet() {
        this.muet = !this.muet;
        localStorage.setItem("muet", this.muet ? "oui" : "non");

        for (const audio of Object.values(this.audios)) {
            audio.muted = this.muet;
        }
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

// Le héros : 100 PV, attaque de 10 à 20, sait se soigner
class Heros extends Personnage {
    constructor(nom) {
        super(nom, 100, 10, 20);
    }

    attaquer(cible) {
        const degats = super.attaquer(cible);
        return "⚔️ Tu infliges " + degats + " dégâts !";
    }

    soigner() {
        this.recevoirSoin(15);
        return "💚 Tu récupères 15 PV.";
    }
}

// Un monstre, fabriqué à la main ou à partir des données de PokeAPI
class Monstre extends Personnage {
    constructor(nom, pvMax, degatsMin, degatsMax, sprite = "") {
        super(nom, pvMax, degatsMin, degatsMax);
        this.sprite = sprite;
    }

    // "static" : s'appelle sur la classe (Monstre.depuisApi), pas sur un objet
    static async depuisApi(idOuNom) {
        const donnees = await chargerJson("https://pokeapi.co/api/v2/pokemon/" + idOuNom);

        const stat = (nom) => donnees.stats.find((s) => s.stat.name === nom).base_stat;
        const attaque = stat("attack");
        const nom = donnees.name[0].toUpperCase() + donnees.name.slice(1);

        return new Monstre(
            nom,
            stat("hp"),
            Math.max(1, Math.round(attaque / 10)),
            Math.max(1, Math.round(attaque / 5)),
            donnees.sprites.front_default
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
        return new Monstre("Gobelin", 80, 5, 15);
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
    constructor(carte, sons) {
        this.carte = carte;
        this.sons = sons;
        this.x = carte.depart.x;
        this.y = carte.depart.y;
        this.actif = true;
        this.surRencontre = () => {}; // branché depuis l'extérieur

        this.element = document.createElement("div");
        this.element.className = "joueur";
        this.element.textContent = "🧙";
        this.element.style.width = carte.taille + "px";
        this.element.style.height = carte.taille + "px";
        carte.conteneur.appendChild(this.element);

        document.addEventListener("keydown", (evenement) => this.toucheAppuyee(evenement));
        this.afficher();
    }

    toucheAppuyee(evenement) {
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
            this.sons.jouer("collision");
            return;
        }

        this.x = x;
        this.y = y;
        this.afficher();
        this.sons.jouer("pas");

        // Dans l'herbe haute : 1 chance sur 4 de rencontrer un monstre
        if (this.carte.typeEn(x, y) === "herbe" && Math.random() < 0.25) {
            this.sons.jouer("rencontre");
            this.surRencontre();
        }
    }

    replacerAuDepart() {
        this.x = this.carte.depart.x;
        this.y = this.carte.depart.y;
        this.afficher();
    }

    afficher() {
        this.element.style.left = this.x * this.carte.taille + "px";
        this.element.style.top = this.y * this.carte.taille + "px";
    }
}

// Le chef d'orchestre du combat : page, tours de jeu et fin
class Combat {
    constructor(heros, journal, sons) {
        this.heros = heros;
        this.journal = journal;
        this.sons = sons;
        this.monstre = null;
        this.enCours = false;
        this.surRetour = () => {}; // branché depuis l'extérieur

        this.textePvJoueur = document.getElementById("pv-joueur");
        this.textePvMonstre = document.getElementById("pv-monstre");
        this.nomMonstre = document.getElementById("nom-monstre");
        this.spriteMonstre = document.getElementById("sprite-monstre");
        this.barreJoueur = document.getElementById("barre-joueur");
        this.barreMonstre = document.getElementById("barre-monstre");
        this.boutonAttaque = document.getElementById("btn-attaque");
        this.boutonSoin = document.getElementById("btn-soin");
        this.boutonRetour = document.getElementById("btn-retour");

        // Flèche () => : "this" reste le combat quand on clique
        this.boutonAttaque.addEventListener("click", () => this.attaquer());
        this.boutonSoin.addEventListener("click", () => this.soigner());
        this.boutonRetour.addEventListener("click", () => this.surRetour());
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
    }

    riposte() {
        this.sons.jouer("degats");
        this.journal.ajouter(this.monstre.attaquer(this.heros));
    }

    verifierFin() {
        if (this.monstre.estVaincu()) {
            this.journal.ajouter("🎉 Victoire ! " + this.monstre.nom + " est vaincu !");
            this.enCours = false;
            this.sons.arreterMusique();
            this.sons.jouer("victoire");
        } else if (this.heros.estVaincu()) {
            this.journal.ajouter("💀 Défaite... Le héros est à terre.");
            this.enCours = false;
            this.sons.arreterMusique();
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

    soigner() {
        if (!this.enCours) return;

        this.sons.jouer("soin");
        this.journal.ajouter(this.heros.soigner());

        this.riposte();
        this.verifierFin();
        this.afficherVie();
    }
}

/* ===== 2. LE DÉMARRAGE ===== */

async function demarrerJeu() {
    const ecranCarte = document.getElementById("carte");
    const ecranCombat = document.getElementById("combat");
    const statut = document.getElementById("statut");
    const boutonSon = document.getElementById("btn-son");

    // 1. Les sons : on les charge avant de jouer
    const sons = new Sons(FICHIERS_SONS);
    statut.textContent = "⏳ Chargement des sons...";
    const manquants = await sons.charger();
    statut.textContent = manquants.length > 0
        ? "🔇 " + manquants.length + " son(s) introuvable(s) : voir la console."
        : "Flèches du clavier pour se déplacer.";

    boutonSon.textContent = sons.muet ? "🔇" : "🔊";
    boutonSon.addEventListener("click", () => {
        sons.basculerMuet();
        boutonSon.textContent = sons.muet ? "🔇" : "🔊";
    });

    // 2. Le jeu
    const heros = new Heros("Héros");
    const journal = new Journal(
        document.getElementById("journal"),
        document.getElementById("message"),
        5
    );
    const combat = new Combat(heros, journal, sons);

    const carte = new Carte(await chargerJson("map.json"), ecranCarte);
    const exploration = new Exploration(carte, sons);

    // Les navigateurs interdisent de lancer un son avant une action du joueur :
    // la musique démarre à la première touche ou au premier clic.
    const activerMusique = () => {
        sons.jouerMusique(exploration.actif ? "musiqueCarte" : "musiqueCombat");
        document.removeEventListener("keydown", activerMusique);
        document.removeEventListener("click", activerMusique);
    };
    document.addEventListener("keydown", activerMusique);
    document.addEventListener("click", activerMusique);

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

    // Fin du combat : retour à la carte (au départ si le héros est tombé)
    combat.surRetour = () => {
        if (heros.estVaincu()) {
            heros.restaurer();
            exploration.replacerAuDepart();
        }
        ecranCombat.hidden = true;
        ecranCarte.hidden = false;
        exploration.actif = true;
        sons.jouerMusique("musiqueCarte");
    };
}

demarrerJeu();
