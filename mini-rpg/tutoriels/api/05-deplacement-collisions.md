# 05 – Déplacer le joueur et gérer les collisions

🎯 **À la fin de cette étape** : le héros 🧙 se promène sur la carte avec les flèches du clavier, et se cogne contre les arbres, l'eau et les bords.

## Le concept

Pour déplacer le joueur :

1. on écoute le **clavier** (événement `keydown`) ;
2. on calcule la **case visée** : `x + dx`, `y + dy` ;
3. on vérifie qu'elle est **praticable** : sinon, on ne bouge pas. C'est la **collision**.

Deux cas de collision :

| Cas | Test |
| --- | --- |
| **Bordure** : la case est hors de la carte | `tuiles[y]` ou `tuiles[y][x]` n'existe pas |
| **Obstacle** : la case est un arbre ou de l'eau | son type est dans la liste `obstacles` |

Un seul test réunit les deux, grâce au **chaînage optionnel** `?.` :

```javascript
const tuiles = [["a", "b"]];
tuiles[0]?.[5];   // undefined : la case n'existe pas, mais pas d'erreur
tuiles[9][0];     // ERREUR : tuiles[9] est undefined
tuiles[9]?.[0];   // undefined : "?." s'arrête proprement
```

## Le code

**1.** Dans la classe `Carte`, ajoute deux méthodes (avant `afficher`) :

```javascript
// Type de la tuile en (x, y), ou undefined si on est hors de la carte
typeEn(x, y) {
    return this.tuiles[y]?.[x];
}

// Collision : hors carte (bordures) ou sur un obstacle = interdit
estPraticable(x, y) {
    const type = this.typeEn(x, y);
    return type !== undefined && !this.obstacles.includes(type);
}
```

`.includes(type)` renvoie `true` si le tableau contient la valeur.

**2.** Ajoute à `carte.css` le style du joueur, qui **flotte** au-dessus de la grille :

```css
.joueur {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: left 0.12s, top 0.12s; /* glissement d'une case à l'autre */
}
```

`#carte` est en `position: relative` : le joueur, en `absolute`, se place par rapport à elle avec `left` et `top`.

**3.** Dans `app.js`, sous la classe `Carte`, ajoute `Exploration` :

```javascript
// Le joueur sur la carte : position, clavier et collisions
class Exploration {
    constructor(carte) {
        this.carte = carte;
        this.x = carte.depart.x;
        this.y = carte.depart.y;
        this.actif = true;

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
    }

    // Place le joueur à l'écran selon sa case
    afficher() {
        this.element.style.left = this.x * this.carte.taille + "px";
        this.element.style.top = this.y * this.carte.taille + "px";
    }
}
```

Points à noter :

- `evenement.key` vaut `"ArrowUp"`, `"ArrowLeft"`… ; l'objet `directions` joue le rôle d'un **dictionnaire** touche → déplacement ;
- si la touche n'est pas dans le dictionnaire, `direction` vaut `undefined` : le `if` l'ignore ;
- `deplacer` **calcule d'abord** la case visée dans des variables locales, et ne modifie `this.x` / `this.y` que si c'est permis.

**4.** Dans `demarrerJeu`, remplace la ligne `new Carte(...)` :

```javascript
const carte = new Carte(donnees, document.getElementById("carte"));
new Exploration(carte);
```

## Vérifier

Déplace le héros avec les **flèches**. Teste :

- foncer dans le **mur d'arbres** de la bordure : il reste immobile ;
- contourner le **lac** et les arbres au centre : impossible de les traverser ;
- traverser l'**herbe** : il avance normalement.

> 🆘 Bloqué ? Compare avec le [code complet de l'étape 05](./etapes/etape-05/).

### Ce qu'il faut retenir

- Un déplacement = **calculer**, **vérifier**, puis **appliquer**.
- Les collisions avec les bordures et les obstacles passent par **un seul test** (`estPraticable`).
- `?.` évite l'erreur quand une donnée n'existe pas.
- Les données de la carte (`obstacles`) décident des collisions, pas le code.

## 🏆 Défi

Ajoute les touches `z`, `q`, `s`, `d` (clavier français) dans le dictionnaire `directions`. Ensuite, empêche le héros de traverser les cases d'herbe : que modifies-tu, dans le code ou dans `map.json` ? (Réponse : seulement `map.json`, en ajoutant `"herbe"` à `obstacles`. Remets-la ensuite !)

➡️ Suite : [06 – Rencontres dans les hautes herbes](./06-rencontres.md)
