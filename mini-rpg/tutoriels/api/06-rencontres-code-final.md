# 06 – Rencontres et code final

## Le concept

On assemble tout : **marcher dans l'herbe** peut déclencher une rencontre. La carte laisse alors la place au combat contre un Pokémon venu de l'API. À la fin du combat, on **revient à la carte**.

Chaque classe garde **un seul rôle** et ne connaît pas les autres :

| Classe | Rôle |
| --- | --- |
| `Carte` | les tuiles et les collisions |
| `Exploration` | le joueur sur la carte |
| `Combat` | un combat contre un monstre |
| `demarrerJeu` | relie le tout |

Pour que `Exploration` prévienne le jeu sans connaître `Combat`, on utilise une **fonction de rappel** (*callback*) : une propriété que l'extérieur remplit.

```javascript
this.surRencontre = () => {};     // par défaut : ne fait rien
// plus tard, depuis l'extérieur :
exploration.surRencontre = () => console.log("Un monstre !");
```

## Le code

**1.** Dans `index.html`, entoure **tout le combat** (héros, monstre, boutons, message, journal) d'un bloc caché au départ, et remplace le bouton « Nouveau combat » par un bouton « Retour » :

```html
<div id="carte"></div>

<div id="combat" hidden>
    <!-- ... sections héros et monstre, comme avant ... -->

    <div class="actions">
        <button id="btn-attaque">⚔️ Attaquer</button>
        <button id="btn-soin">💚 Se soigner</button>
        <button id="btn-retour" hidden>🗺️ Retour à la carte</button>
    </div>

    <!-- ... message et journal, comme avant ... -->
</div>
```

L'attribut `hidden` cache un élément. Comme `#carte` a `display: grid`, il faut ajouter à `carte.css` :

```css
/* display:grid écraserait l'attribut hidden : on le rétablit */
#carte[hidden] { display: none; }
```

**2.** Dans `Exploration`, ajoute la fonction de rappel et le déclenchement :

```javascript
// dans le constructeur
this.surRencontre = () => {}; // branché depuis l'extérieur
```

```javascript
// dans deplacer(), à la fin, après this.afficher();

// Dans l'herbe haute : 1 chance sur 4 de rencontrer un monstre
if (this.carte.typeEn(x, y) === "herbe" && Math.random() < 0.25) {
    this.surRencontre();
}
```

`Math.random()` renvoie un nombre entre `0` et `1` : `< 0.25` arrive une fois sur quatre. Ajoute aussi la méthode utile après une défaite :

```javascript
replacerAuDepart() {
    this.x = this.carte.depart.x;
    this.y = this.carte.depart.y;
    this.afficher();
}
```

**3.** Dans `Combat`, supprime `boutonNouveau` et `nouveauCombat`, puis :

```javascript
// dans le constructeur
this.surRetour = () => {}; // branché depuis l'extérieur
this.boutonRetour = document.getElementById("btn-retour");
this.boutonRetour.addEventListener("click", () => this.surRetour());
```

Dans `demarrer`, cache le bouton retour :

```javascript
this.boutonRetour.hidden = true;
```

Dans `verifierFin`, quand le combat est fini, montre-le :

```javascript
if (!this.enCours) {
    this.boutonAttaque.disabled = true;
    this.boutonSoin.disabled = true;
    this.boutonRetour.hidden = false;
}
```

**4.** Remplace `demarrerJeu` par la version finale. Elle crée tout, puis **relie** carte et combat :

```javascript
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
        exploration.actif = false;                       // plus de déplacement
        const monstre = await chargerMonstreAleatoire();
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

Supprime l'ancien `const journal = new Journal(...)` global : il est maintenant **dans** `demarrerJeu`.

## Vérifier

Marche dans l'herbe : après quelques pas, la carte disparaît et un Pokémon apparaît. Bats-le (ou perds), clique **Retour à la carte** : tu retrouves ta position (ou le départ si tu as perdu).

## Le code final

Voici `app.js` complet. Tu le trouves aussi dans [`app.js`](./app.js), avec [`index.html`](./index.html), [`carte.css`](./carte.css) et [`map.json`](./map.json), à servir avec un serveur local.

```javascript
/* ===== 1. LES CLASSES ===== */

// Renvoie un entier au hasard entre min et max (inclus)
function nombreAuHasard(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Charge une adresse et renvoie son contenu JSON
async function chargerJson(url) {
    const reponse = await fetch(url);
    if (!reponse.ok) {
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
        if (!this.carte.estPraticable(x, y)) return;

        this.x = x;
        this.y = y;
        this.afficher();

        // Dans l'herbe haute : 1 chance sur 4 de rencontrer un monstre
        if (this.carte.typeEn(x, y) === "herbe" && Math.random() < 0.25) {
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
    constructor(heros, journal) {
        this.heros = heros;
        this.journal = journal;
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

        this.nomMonstre.textContent = monstre.nom;
        this.spriteMonstre.src = monstre.sprite;
        this.spriteMonstre.alt = monstre.nom;

        this.journal.ajouter("❗ " + monstre.nom + " sauvage apparaît !");
        this.afficherVie();
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
        exploration.actif = false;
        const monstre = await chargerMonstreAleatoire();
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

## Avant / après

| Avant (POO) | Après (API + carte) |
| --- | --- |
| un monstre écrit dans le code | un Pokémon chargé avec `fetch` |
| un seul écran | carte, puis combat |
| rien ne bouge | déplacement, collisions, rencontres |
| tout en dur | carte et monstres décrits par des **données** |

## 🏆 Défi final

Choisis-en un :

1. Ajoute un type de tuile `"maison"` (symbole `M`) : en y entrant, le héros **récupère tous ses PV**.
2. Compte les monstres vaincus et affiche le score au-dessus de la carte.
3. Remplace l'emoji 🧙 du héros par l'image `sprites.front_default` d'un Pokémon de ton choix, chargé via `Monstre.depuisApi`.
4. Charge une **seconde carte** (`map2.json`) quand le héros atteint une case spéciale.

Bravo : ton Mini RPG se déplace, charge ses données sur Internet et combat des Pokémon ! 🚀
