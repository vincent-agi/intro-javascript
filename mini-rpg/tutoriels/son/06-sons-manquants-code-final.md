# 06 – Sons manquants et code final

🎯 **À la fin de cette étape** : au démarrage, le jeu vérifie que tous les sons sont là. S'il en manque un, il le dit clairement, et la partie continue quand même.

## Le concept

Un fichier oublié, mal nommé ou mal rangé arrive à **tout le monde**. Aujourd'hui, ton jeu reste silencieux sans rien dire, et tu ne sais pas quel fichier pose problème.

On va réutiliser ce que tu as appris avec PokeAPI : le jeu (le **client**) demande chaque fichier au **serveur** avec `fetch`, et regarde la réponse :

- `reponse.ok` vaut `true` : le fichier existe (code `200`) ;
- `reponse.ok` vaut `false` : il est introuvable (code `404`).

Bonus : le navigateur garde les fichiers téléchargés en mémoire. Les sons sont donc **prêts** avant même le premier pas.

## Le code

**1.** Dans `index.html`, sous le bouton son, ajoute une ligne d'état :

```html
<p id="statut"></p>
```

Et dans `carte.css` :

```css
/* Message d'état (sons manquants) */
#statut {
    min-height: 1.2em;
    color: #666;
}
```

**2.** Ajoute cette méthode à la classe `Sons` :

```javascript
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
```

La méthode est `async` : elle **attend** (`await`) chaque réponse avant de passer au fichier suivant. Elle renvoie un tableau, vide si tout va bien.

**3.** Dans `demarrerJeu`, récupère la ligne d'état en haut de la fonction :

```javascript
const statut = document.getElementById("statut");
```

Puis, juste après `const sons = new Sons(FICHIERS_SONS);` :

```javascript
statut.textContent = "⏳ Vérification des sons...";
const manquants = await sons.verifierFichiers();
statut.textContent = manquants.length > 0
    ? "🔇 Son(s) introuvable(s) : " + manquants.join(", ")
    : "🎵 Flèches du clavier pour se déplacer.";
```

`manquants.join(", ")` colle les éléments du tableau en un seul texte : `["soin", "pas"]` devient `"soin, pas"`.

## Vérifier

1. Recharge : « Vérification des sons... » s'affiche un instant, puis « Flèches du clavier pour se déplacer ». Dans l'onglet **Réseau**, tu vois les 10 fichiers demandés au serveur.
2. **Teste la robustesse** : renomme `sons/soin.wav` en `sons/soin2.wav` et recharge. Le message affiche « Son(s) introuvable(s) : soin », la console précise le fichier, et le jeu marche quand même : le soin est juste silencieux. Remets le bon nom.

🎉 **Bravo, ton Mini RPG a des bruitages et une bande-son !**

> 🆘 Bloqué ? Le code complet est juste en dessous, et dans les fichiers [`app.js`](./app.js), [`index.html`](./index.html), [`carte.css`](./carte.css) et [`map.json`](./map.json). Ajoute ton dossier `sons/` à côté.

### Ce qu'il faut retenir

- `fetch` sert aussi à **vérifier** qu'un fichier existe : `reponse.ok`.
- Un bon jeu **explique** ce qui ne va pas, au lieu de rester muet.
- La classe `Sons` regroupe **tout** ce qui concerne le son :

| Méthode | Rôle | Étape |
| --- | --- | --- |
| `constructor` | prépare un `Audio` par fichier, lit le choix « muet » | 02, 05 |
| `jouer(nom, volume)` | joue un effet (une copie, qui peut se superposer) | 02, 03 |
| `jouerMusique(nom)` | lance une musique en boucle, avec fondu | 04 |
| `arreterMusique()` | coupe la musique, avec fondu | 04 |
| `fondu(audio, cible, quandFini)` | fait glisser un volume petit à petit | 04 |
| `basculerMuet()` | coupe ou remet tout, et retient le choix | 05 |
| `verifierFichiers()` | trouve les fichiers manquants | 06 |

Et le reste du jeu ne connaît que trois phrases : `jouer`, `jouerMusique`, `arreterMusique`. C'est tout l'intérêt d'un objet bien conçu.

## Le code final

### `index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mini RPG</title>
    <link rel="stylesheet" href="../../style.css">
    <link rel="stylesheet" href="carte.css">
</head>
<body>
    <h1>Mini RPG ⚔️</h1>

    <!-- Bouton son (et message d'état) -->
    <button id="btn-son" title="Couper / remettre le son">🔊</button>
    <p id="statut"></p>

    <!-- La carte (flèches du clavier pour se déplacer) -->
    <div id="carte"></div>

    <!-- Le combat : caché tant qu'aucun monstre n'apparaît -->
    <div id="combat" hidden>
        <!-- Le héros -->
        <section>
            <h2>🧙 Héros : <span id="pv-joueur">100</span> PV</h2>
            <div class="barre"><div id="barre-joueur" class="vie"></div></div>
        </section>

        <!-- Le monstre -->
        <section>
            <img id="sprite-monstre" alt="">
            <h2>👹 <span id="nom-monstre">Monstre</span> : <span id="pv-monstre">80</span> PV</h2>
            <div class="barre"><div id="barre-monstre" class="vie"></div></div>
        </section>

        <!-- Les boutons d'action -->
        <div class="actions">
            <button id="btn-attaque">⚔️ Attaquer</button>
            <button id="btn-soin">💚 Se soigner</button>
            <button id="btn-retour" hidden>🗺️ Retour à la carte</button>
        </div>

        <!-- Message principal et journal de combat -->
        <p id="message"></p>
        <h3>Journal de combat</h3>
        <ul id="journal"></ul>
    </div>

    <script src="app.js"></script>
</body>
</html>
```

### `carte.css`

```css
/* La carte : une grille de tuiles, le joueur flotte par-dessus */
#carte {
    position: relative;
    display: grid;
    width: max-content;
    margin: 20px auto;
}

/* display:grid écraserait l'attribut hidden : on le rétablit */
#carte[hidden] { display: none; }

.tile-chemin { background: #e8d9a8; }
.tile-herbe  { background: #6cbf5a; }
.tile-arbre  { background: #2e6b34; }
.tile-eau    { background: #4aa3df; }

.joueur {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: left 0.12s, top 0.12s;
}

/* Rencontre : la carte clignote, comme dans les vieux jeux */
.rencontre {
    animation: clignote 0.2s 4;
}

@keyframes clignote {
    50% { filter: brightness(3); }
}

/* Le monstre venu de l'API */
#sprite-monstre {
    width: 96px;
    height: 96px;
    image-rendering: pixelated;
}

/* Bouton son, en haut à droite */
#btn-son {
    position: fixed;
    top: 10px;
    right: 10px;
}

/* Message d'état (sons manquants) */
#statut {
    min-height: 1.2em;
    color: #666;
}
```

### `app.js`

```javascript
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
    if (!reponse.ok) {  // 404, 500... : fetch ne plante pas tout seul !
        throw new Error("Erreur " + reponse.status + " pour " + url);
    }
    return reponse.json();
}

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
    const boutonSon = document.getElementById("btn-son");
    const statut = document.getElementById("statut");

    const sons = new Sons(FICHIERS_SONS);
    statut.textContent = "⏳ Vérification des sons...";
    const manquants = await sons.verifierFichiers();
    statut.textContent = manquants.length > 0
        ? "🔇 Son(s) introuvable(s) : " + manquants.join(", ")
        : "🎵 Flèches du clavier pour se déplacer.";

    const heros = new Heros("Héros");
    const journal = new Journal(
        document.getElementById("journal"),
        document.getElementById("message"),
        5
    );
    const combat = new Combat(heros, journal, sons);

    const carte = new Carte(await chargerJson("map.json"), ecranCarte);
    const exploration = new Exploration(carte, sons);

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
```

## 🏆 Défis pour aller plus loin

1. **Un curseur de volume** : `<input type="range" min="0" max="1" step="0.1">` qui change `sons.volumeMusique` (et le volume de la musique en cours) en direct.
2. **Un coup critique** : si les dégâts du héros dépassent `18`, joue un autre son (`critique.wav`, à choisir dans le pack).
3. **Une musique d'alerte** : quand le héros passe sous `25 PV`, remplace la musique de combat par une autre plus stressante.
4. **Les crédits dans le jeu** : un petit `<footer>` dans `index.html` qui cite les auteurs des sons.

➡️ Suite : [ajoute un Mage et de la magie](../magie/01-introduction.md), puis [écris ta propre histoire](../histoire/01-introduction.md).
