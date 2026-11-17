# 03 – Le héros marche

🎯 **À la fin de cette étape** : à chaque pas, le héros fait un petit **saut**. Il **regarde** à gauche quand il va à gauche. Et quand il fonce dans un arbre, il **tremble**.

## Le concept : `element.animate`

Ces animations ne tournent pas toutes seules : elles **répondent** à une touche. On les lance donc en JavaScript, avec `element.animate(étapes, durée)` :

```javascript
element.animate([
    { transform: "translateY(0)" },     // étape 1 : position normale
    { transform: "translateY(-8px)" },  // étape 2 : 8 pixels plus haut
    { transform: "translateY(0)" }      // étape 3 : retour au sol
], 150);                                // en 150 millisecondes
```

C'est un `@keyframes`… écrit en JavaScript, sous forme de **tableau d'étapes**. Le navigateur passe en douceur d'une étape à la suivante, puis l'élément reprend son état normal.

Essaie dans la console (`F12`), sur le titre de la page :

```javascript
document.querySelector("h1").animate([{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }], 1000);
```

## Le code

**1.** On va animer à plusieurs endroits du jeu. Plutôt que de répéter les options partout, crée un **outil** dans `js/outils.js` (c'est sa place, depuis le dossier `modules`), avant `chargerJson` :

```javascript
/**
 * Joue une petite animation sur un élément de la page.
 * @param {Element} element - l'élément à animer
 * @param {Keyframe[]} etapes - les étapes de l'animation (comme dans un @keyframes)
 * @param {number} duree - la durée, en millisecondes
 * @returns {Promise<void>} se termine quand l'animation est finie
 * @example animer(bouton, [{ opacity: 0 }, { opacity: 1 }], 300);
 */
export function animer(element, etapes, duree) {
    const animation = element.animate(etapes, { duration: duree, easing: "ease-out" });
    return animation.finished.then(() => {});
}
```

- `easing: "ease-out"` : le mouvement **ralentit** à la fin, plus naturel ;
- `animation.finished` est une **promesse** qui se réalise quand l'animation est finie : on pourra écrire `await animer(...)` ou `animer(...).then(...)` pour faire quelque chose **après**. Ça servira à l'étape 05.

**2.** En haut de `js/exploration.js`, importe-le :

```javascript
import { animer } from "./outils.js";
```

**3.** Dans `Exploration.deplacer`, ajoute trois choses. D'abord, **au début** (après `if (!this.actif) return;`), le héros regarde où il va :

```javascript
// Le héros regarde dans la direction où il va (scaleX(-1) = effet miroir)
if (dx !== 0) {
    this.element.style.transform = dx < 0 ? "scaleX(-1)" : "";
}
```

`scaleX(-1)` retourne l'élément comme dans un miroir. On le met sur la **case** (`this.element`), pas sur le `span` : comme ça, il ne se mélange pas avec la respiration.

> Ton emoji regarde déjà vers la gauche ? Inverse simplement la condition : `dx > 0`.

Ensuite, dans le bloc de la **collision**, après le son :

```javascript
animer(this.sprite, [         // le héros tremble
    { transform: "translateX(0)" },
    { transform: "translateX(-4px)" },
    { transform: "translateX(4px)" },
    { transform: "translateX(0)" }
], 200);
```

Enfin, après le son des **pas** :

```javascript
animer(this.sprite, [             // un petit saut à chaque pas
    { transform: "translateY(0)" },
    { transform: "translateY(-8px)" },
    { transform: "translateY(0)" }
], 150);
```

> Le `span` respire déjà (animation CSS) ! Pendant les 150 ms du saut, l'animation JavaScript **passe devant** ; dès qu'elle est finie, la respiration reprend toute seule.

## Vérifier

1. Avance : un petit saut à chaque case. Ça ressemble enfin à une **marche**.
2. Va à gauche, puis à droite : le héros se retourne.
3. Fonce dans un arbre ou dans l'eau : il tremble (et tu entends le choc).
4. Garde une flèche enfoncée : les sauts s'enchaînent sans bug.

> 🆘 Bloqué ? Compare avec le [projet complet de l'étape 03](./etapes/etape-03/).

### Ce qu'il faut retenir

- `element.animate([étapes], durée)` : une animation **déclenchée** par le code, au bon moment.
- Une fonction `animer` dans `outils.js` évite de répéter les mêmes options : **un outil, partout**.
- `animation.finished` dit **quand** l'animation est finie.
- Pour combiner des mouvements, on anime des **éléments différents** (la case se retourne, le `span` saute).

## 🏆 Défi

Quand le héros entre dans l'**herbe**, fais-le « s'enfoncer » un instant : un `animer` qui le rend un peu plus petit (`transform: "scale(0.8)"`) puis normal. Où places-tu ce code dans `deplacer` ? (Indice : `this.carte.typeEn(x, y)`.)

➡️ Suite : [04 – L'entrée en combat](./04-entree-combat.md)
