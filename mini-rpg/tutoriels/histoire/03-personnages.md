# 03 – Ajouter des personnages

Un monde où il n'y a que le héros et des monstres, c'est un peu vide. Les personnages donnent **vie** à ton histoire : un villageois qui prévient du danger, un marchand, un compagnon, un nouveau héros…

## 🧠 Réfléchis d'abord

- Qui habite ton monde ? Note **trois** personnages dans ta fiche `MON-HISTOIRE.md`.
- Pour chacun : est-il **sur la carte** ? Est-ce qu'il **parle**, **combat**, **donne** quelque chose ?
- Un personnage qui ne bouge pas sur la carte, c'est presque… une **tuile** ! Que faut-il ajouter dans `map.json` ?

## Exemple guidé : un villageois qui parle

**L'idée.** Une vieille dame 👵 se tient sur le chemin. Le héros ne peut pas la traverser, mais quand il **se cogne** contre elle, elle lui parle.

**Découper.**

1. une nouvelle tuile « villageois », qui est un obstacle → `map.json` et `carte.css` ;
2. ce que dit le villageois → `map.json` (c'est une **donnée**) ;
3. se cogner contre lui déclenche le dialogue → `Exploration.deplacer` ;
4. afficher le texte → `index.html` et `demarrerJeu`.

**1.** Dans `map.json`, ajoute le symbole `V` à la légende, le type `villageois` aux obstacles, et une nouvelle rubrique `dialogues` :

```json
"legende": {
    "#": "arbre",
    "~": "eau",
    ".": "chemin",
    "H": "herbe",
    "V": "villageois"
},
"obstacles": ["arbre", "eau", "villageois"],
"dialogues": {
    "villageois": "Prends garde, voyageur ! Des monstres se cachent dans les hautes herbes."
},
```

Puis place un `V` sur la carte, par exemple dans la 4e ligne, juste sous le départ :

```json
"#.#V.....#.#",
```

**2.** Dans `carte.css`, dessine la tuile : un chemin avec un personnage dessus.

```css
/* Le villageois : une case de chemin, avec un personnage dessus */
.tile-villageois {
    background: #e8d9a8;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tile-villageois::after {
    content: "👵";
}
```

`::after` ajoute un petit contenu **dans** la case, sans toucher au JavaScript.

**3.** Dans le constructeur de `Carte`, retiens les dialogues :

```javascript
this.dialogues = donnees.dialogues;
```

**4.** Dans `Exploration` :

Dans le constructeur, une nouvelle « sonnette » :

```javascript
this.surDialogue = () => {}; // branché depuis l'extérieur
```

Dans `deplacer`, complète le bloc de la collision :

```javascript
if (!this.carte.estPraticable(x, y)) {
    this.sons.jouer("collision");

    // A-t-on heurté quelqu'un qui parle ?
    const texte = this.carte.dialogues[this.carte.typeEn(x, y)];
    if (texte) {
        this.surDialogue(texte);
    }
    return;
}
```

Pour un arbre, `dialogues["arbre"]` n'existe pas : `texte` vaut `undefined` et le `if` ne fait rien.

**5.** Dans `index.html`, sous la carte :

```html
<!-- Ce que disent les personnages -->
<p id="dialogue"></p>
```

Et dans `demarrerJeu`, après la création de `exploration` :

```javascript
// Quand le héros parle à quelqu'un : on affiche le texte
const dialogue = document.getElementById("dialogue");
exploration.surDialogue = (texte) => {
    dialogue.textContent = "💬 " + texte;
};
```

**Tester.** Recharge : 👵 se tient sur le chemin. Va te cogner contre elle : son message s'affiche sous la carte.

## ⌨️ À toi de jouer

| Idée | Difficulté | 🔍 Où regarder | 💡 Indice |
| --- | --- | --- | --- |
| Un deuxième personnage (🧔 un bûcheron) avec son propre texte | ⭐ | `map.json`, `carte.css` | un nouveau symbole, un nouveau type… et **aucune** ligne de JavaScript |
| Effacer le dialogue quand le héros repart | ⭐ | `demarrerJeu`, `Exploration.deplacer` | une sonnette `surPas`, ou vider le texte au début de `deplacer` |
| Un personnage qui dit une phrase différente à chaque fois | ⭐⭐ | `map.json`, `Exploration` | dans `dialogues`, un **tableau** de phrases, et un compteur |
| Un guérisseur qui remet les PV au maximum | ⭐⭐ | `Exploration`, `demarrerJeu` | une sonnette `surGuerison`, puis `heros.restaurer()` |
| Un monstre fait main, rare et puissant (🐉 Dragon) | ⭐⭐ | `chargerMonstreAleatoire` | `if (Math.random() < 0.05) return new Monstre("Dragon", 150, 10, 25);` |
| Un nouveau héros (🏹 Archer) | ⭐⭐ | classe `Heros` | `class Archer extends Heros`, et dans `demarrerJeu`, `new Archer("Robin")` |
| Un marchand qui vend des potions contre de l'or | ⭐⭐⭐ | `Heros`, `Exploration`, `demarrerJeu` | il faut d'abord de l'or (chapitre 02) et des potions |

> 💡 Remarque comme le villageois est **une donnée** : ajouter un personnage qui parle ne demande plus aucun code. C'est le signe d'un code bien conçu.

## ✅ Avant de passer à la suite

- [ ] Mon jeu marche encore du début à la fin.
- [ ] La console n'affiche pas d'erreur rouge.
- [ ] Mes nouveaux personnages sont notés dans `MON-HISTOIRE.md`.

➡️ Suite : [04 – Faire évoluer le monde](./04-monde.md)
