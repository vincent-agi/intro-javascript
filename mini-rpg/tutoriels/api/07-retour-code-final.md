# 07 – Retour à la carte et code final

🎯 **À la fin de cette étape** : le jeu est complet. Après chaque combat, un bouton te ramène sur la carte. Si tu as gagné, tu repars d'où tu étais. Si tu as perdu, tu te réveilles au point de départ, soigné.

## Le concept

C'est la même sonnette qu'à l'étape 06, **dans l'autre sens** : quand le joueur clique sur « Retour à la carte », `Combat` prévient l'extérieur avec `surRetour`, et c'est `demarrerJeu` qui remet la carte à l'écran.

| Qui | Prévient avec | Pour dire |
| --- | --- | --- |
| `Exploration` | `surRencontre` | « un monstre surgit ! » |
| `Combat` | `surRetour` | « le combat est fini, on peut repartir » |

## Le code

**1.** Dans `index.html`, ajoute le bouton de retour, **caché**, dans `.actions` :

```html
<div class="actions">
    <button id="btn-attaque">⚔️ Attaquer</button>
    <button id="btn-soin">💚 Se soigner</button>
    <button id="btn-retour" hidden>🗺️ Retour à la carte</button>
</div>
```

**2.** Dans `Combat`, branche le bouton. Dans le **constructeur** :

```javascript
this.surRetour = () => {}; // branché depuis l'extérieur
this.boutonRetour = document.getElementById("btn-retour");
this.boutonRetour.addEventListener("click", () => this.surRetour());
```

Dans `demarrer`, avec les autres boutons, **cache** le retour (un combat commence) :

```javascript
this.boutonRetour.hidden = true;
```

Dans `verifierFin`, quand le combat est fini, **montre**-le :

```javascript
if (!this.enCours) {
    this.boutonAttaque.disabled = true;
    this.boutonSoin.disabled = true;
    this.boutonRetour.hidden = false;
}
```

**3.** Dans `Exploration`, ajoute une méthode pour renvoyer le héros au départ :

```javascript
// Après une défaite : retour à la case de départ
replacerAuDepart() {
    this.x = this.carte.depart.x;
    this.y = this.carte.depart.y;
    this.afficher();
}
```

**4.** Dans `demarrerJeu`, sous `exploration.surRencontre = ...`, branche la deuxième sonnette :

```javascript
// Fin du combat : retour à la carte (au départ si le héros est tombé)
combat.surRetour = () => {
    if (heros.estVaincu()) {
        heros.restaurer();
        exploration.replacerAuDepart();
    }
    ecranCombat.hidden = true;
    ecranCarte.hidden = false;
    exploration.actif = true;   // le héros peut de nouveau bouger
};
```

Remarque : après une victoire, le héros **garde ses blessures**. Comme dans les vieux jeux, il faut gérer ses PV d'un combat à l'autre !

## Vérifier

Joue une vraie partie :

1. Marche dans l'herbe jusqu'à une rencontre.
2. **Gagne** le combat : le bouton « Retour à la carte » apparaît. Clique : tu retrouves ta position, et tu peux bouger.
3. Enchaîne les combats sans te soigner jusqu'à **perdre** : après le retour, le héros est au départ, avec 100 PV.
4. Coupe Internet et provoque une rencontre : un Gobelin surgit, le jeu continue.

🎉 **Bravo, ton mini RPG est terminé !** Tu as fait parler ton jeu avec un serveur, chargé des données, dessiné une carte, géré le clavier et les collisions, et enchaîné exploration et combats.

> 🆘 Bloqué ? Le code complet est juste en dessous, et dans les fichiers [`app.js`](./app.js), [`index.html`](./index.html), [`carte.css`](./carte.css) et [`map.json`](./map.json). Lance-les avec un serveur local.

### Ce qu'il faut retenir

- Deux fonctions de rappel (`surRencontre`, `surRetour`) font **dialoguer** la carte et le combat, sans qu'ils se connaissent.
- `demarrerJeu` est le **chef d'orchestre** : elle crée les objets et les relie.
- Chaque classe a **un seul rôle** :

| Classe / fonction | Rôle |
| --- | --- |
| `chargerJson` | demander des données à un serveur (ou à un fichier) |
| `Personnage`, `Heros`, `Monstre` | les combattants |
| `Journal` | les messages du combat |
| `Carte` | les tuiles et les collisions |
| `Exploration` | le héros sur la carte, le clavier, les rencontres |
| `Combat` | un combat contre un monstre |
| `demarrerJeu` | crée et relie le tout |

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
    margin-top: 16px; /* un peu d'air sous la barre du héros */
    image-rendering: pixelated;
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

    // Efface tous les événements (au début d'un nouveau combat)
    vider() {
        this.evenements = [];
        this.afficher();
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
    constructor(carte) {
        this.carte = carte;
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
        if (!this.carte.estPraticable(x, y)) return; // collision : on ne bouge pas

        this.x = x;
        this.y = y;
        this.afficher();

        // Dans l'herbe haute : 1 chance sur 4 de rencontrer un monstre
        if (this.carte.typeEn(x, y) === "herbe" && Math.random() < 0.25) {
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
    constructor(heros, journal) {
        this.heros = heros;
        this.journal = journal;
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
        this.journal.vider();     // un nouveau combat, un journal propre

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
        this.journal.ajouter(this.monstre.attaquer(this.heros));
    }

    verifierFin() {
        if (this.monstre.estVaincu()) {
            this.journal.ajouter("🎉 Victoire ! " + this.monstre.nom + " est vaincu !");
            this.enCours = false;
        } else if (this.heros.estVaincu()) {
            this.journal.ajouter("💀 Défaite... Le héros est à terre.");
            this.enCours = false;
        }

        if (!this.enCours) {
            this.boutonAttaque.disabled = true;
            this.boutonSoin.disabled = true;
            this.boutonRetour.hidden = false;
        }
    }

    attaquer() {
        if (!this.enCours) return;

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

    const heros = new Heros("Héros");
    const journal = new Journal(
        document.getElementById("journal"),
        document.getElementById("message"),
        5
    );
    const combat = new Combat(heros, journal);

    const carte = new Carte(await chargerJson("map.json"), ecranCarte);
    const exploration = new Exploration(carte);

    // Rencontre : on charge un monstre, puis on passe de la carte au combat
    exploration.surRencontre = async () => {
        exploration.actif = false;                // plus de déplacement
        ecranCarte.classList.add("rencontre");    // la carte clignote
        const monstre = await chargerMonstreAleatoire();
        await attendre(800);                      // le temps de voir le clignotement
        ecranCarte.classList.remove("rencontre");

        combat.demarrer(monstre);
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
    };
}

demarrerJeu();
```

## 🏆 Défis pour aller plus loin

1. **Une case de soin** : ajoute une tuile `"F"` (fontaine, type `"soin"`, en bleu clair). Quand le héros marche dessus, il récupère tous ses PV (`heros.restaurer()`). Indice : une deuxième sonnette, `surSoin`, dans `Exploration`.
2. **Des monstres par zone** : ajoute une tuile `"S"` (plage, type `"sable"`) au bord des lacs. Sur le sable, on ne rencontre que des Pokémon d'eau. Range leurs numéros dans un tableau (`[7, 54, 60, 72, 79, 86, 90, 98, 116, 118, 120, 129]`) et tires-en un au hasard avec `nombreAuHasard`.
3. **Un compteur de victoires** affiché au-dessus de la carte.
4. **Une plus grande carte** : dessine ton propre monde dans `map.json`. Tu n'as rien à changer dans `app.js` !

➡️ Suite : [donne une voix à ton jeu avec des sons et de la musique](../son/01-introduction.md).
