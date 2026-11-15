# 04 – Charger et afficher la carte

## Le concept

Une **carte de jeu** est une grille de **tuiles** (*tiles*) : de petits carrés (herbe, arbre, eau…). Au lieu de dessiner la carte en HTML à la main, on la **décrit dans un fichier JSON**, que le jeu charge puis **découpe en tuiles**.

Chaque ligne de la carte est un texte. Chaque caractère est une tuile :

```
"#...HH"   →   # . . . H H   →   arbre, chemin, chemin, chemin, herbe, herbe
```

Deux outils pour découper :

```javascript
"#.H".split("");                      // ["#", ".", "H"] : texte -> tableau de caractères
["#", "."].map((c) => c + c);         // ["##", ".."] : transforme chaque élément
```

`map` fabrique un **nouveau tableau** en appliquant une fonction à chaque élément.

## Le code

**1.** Crée `map.json` à côté de `app.js` :

```json
{
    "tailleTile": 32,
    "legende": {
        "#": "arbre",
        "~": "eau",
        ".": "chemin",
        "H": "herbe"
    },
    "obstacles": ["arbre", "eau"],
    "depart": { "x": 1, "y": 1 },
    "lignes": [
        "############",
        "#...HHH..~~#",
        "#.#.HHH.##~#",
        "#.#......#.#",
        "#.####HH.#.#",
        "#......HH..#",
        "#.HH.#.....#",
        "#.HH.#..~~.#",
        "############"
    ]
}
```

- `legende` relie chaque caractère à un **type** de tuile ;
- `obstacles` liste les types que le joueur ne peut pas traverser ;
- `depart` donne la case de départ (`x` = colonne, `y` = ligne, en partant de `0` en haut à gauche).

La carte est **une donnée**, pas du code : tu pourras la modifier sans toucher à `app.js`.

**2.** Dans `index.html`, ajoute juste sous le `<h1>` :

```html
<!-- La carte (flèches du clavier pour se déplacer) -->
<div id="carte"></div>
```

**3.** Ajoute à `carte.css` :

```css
/* La carte : une grille de tuiles */
#carte {
    position: relative;
    display: grid;
    width: max-content;
    margin: 20px auto;
}

.tile-chemin { background: #e8d9a8; }
.tile-herbe  { background: #6cbf5a; }
.tile-arbre  { background: #2e6b34; }
.tile-eau    { background: #4aa3df; }
```

`display: grid` range les `div` en lignes et colonnes ; leur nombre de colonnes sera fixé par JavaScript.

**4.** Dans `app.js`, sous la classe `Journal`, ajoute la classe `Carte` :

```javascript
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
```

Après la double transformation, `this.tuiles` est un **tableau de tableaux** : `this.tuiles[y][x]` donne le type (`"herbe"`, `"arbre"`…) de la case en colonne `x`, ligne `y`. Remarque l'ordre : **d'abord la ligne `y`, ensuite la colonne `x`**.

**5.** Remplace le démarrage par une fonction `async` qui charge d'abord la carte :

```javascript
async function demarrerJeu() {
    const donnees = await chargerJson("map.json");
    new Carte(donnees, document.getElementById("carte"));

    const combat = new Combat(new Heros("Héros"), journal);
    combat.nouveauCombat();
}

demarrerJeu();
```

`chargerJson` (étape 02) sert une seconde fois : le même code charge une API distante **et** un fichier local.

## Vérifier

Via ton serveur local (voir l'étape 01), recharge la page : la carte de `12 × 9` apparaît au-dessus du combat, avec chemins, herbe, arbres et lacs. Si la page reste vide, ouvre la console : une erreur `Failed to fetch` indique que tu as ouvert le fichier directement au lieu de passer par le serveur.

### Ce qu'il faut retenir

- Une carte = une **grille de données** (ici des textes) transformée en éléments de page.
- `split("")` découpe un texte, `map` transforme un tableau.
- `tuiles[y][x]` : ligne d'abord, colonne ensuite.
- Séparer **les données** (`map.json`) **du code** rend le jeu facile à étendre.

## 🏆 Défi

Dans `map.json`, ajoute un type `"pont"` avec le symbole `"="` (couleur brune dans `carte.css`, non obstacle) et dessine un pont sur le lac. Tu n'as **rien** à changer dans `app.js`.

➡️ Suite : [05 – Déplacer le joueur et gérer les collisions](./05-deplacement-collisions.md)
