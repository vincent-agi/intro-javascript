# 03 – Les combattants et la magie

🎯 **À la fin de cette étape** : `Personnage`, `Heros` et `Mage` vivent dans `personnages.js`, les sorts dans `sorts.js`, et les monstres dans `monstre.js`. Le jeu marche toujours.

## Le concept

Un module peut **lui-même** importer d'autres modules. Les fichiers forment alors une chaîne de **dépendances** : « pour fonctionner, j'ai besoin de… ».

```
monstre.js ──▶ personnages.js ──▶ sorts.js ──▶ outils.js
     └──────────────────────────────────────────▶ outils.js
```

- `Monstre extends Personnage` → `monstre.js` a besoin de `personnages.js` ;
- le `Mage` crée des `Sort` → `personnages.js` a besoin de `sorts.js` ;
- les sorts et les attaques tirent des nombres au hasard → tout le monde a besoin d'`outils.js`.

Pour savoir quoi importer, pose-toi une seule question pour chaque fichier : **« quels noms j'utilise, qui ne sont pas définis ici ? »**

## Le code

**1.** Crée `js/sorts.js`. Coupe les classes `Sort` et `SortDeSoin` d'`app.js`, colle-les ici avec `export`, et importe ce dont elles ont besoin :

```javascript
// La magie : les sorts que lance le Mage

import { nombreAuHasard } from "./outils.js";

// Un sort d'attaque : un nom, un coût en mana, des dégâts
export class Sort {
    // ... la classe, inchangée
}

// Un sort de soin : même moule que Sort, mais il soigne le lanceur
export class SortDeSoin extends Sort {
    // ... la classe, inchangée
}
```

**2.** Crée `js/personnages.js`. Coupe `Personnage`, `Heros` et `Mage`, colle-les avec `export` :

```javascript
// Les combattants du côté du joueur : Personnage, Heros, Mage

import { nombreAuHasard } from "./outils.js";
import { Sort, SortDeSoin } from "./sorts.js";

export class Personnage { /* ... inchangée */ }

export class Heros extends Personnage { /* ... inchangée */ }

export class Mage extends Heros { /* ... inchangée */ }
```

`Personnage.attaquer` utilise `nombreAuHasard`, et le constructeur du `Mage` fait `new Sort(...)` et `new SortDeSoin(...)` : d'où les deux `import`.

**3.** Crée `js/monstre.js`. Coupe `Monstre` **et** la fonction `chargerMonstreAleatoire` (elle fabrique des monstres : elle a sa place ici) :

```javascript
// Les monstres, faits main ou venus de PokeAPI

import { nombreAuHasard, chargerJson } from "./outils.js";
import { Personnage } from "./personnages.js";

export class Monstre extends Personnage { /* ... inchangée */ }

export async function chargerMonstreAleatoire() { /* ... inchangée */ }
```

**4.** Mets à jour les `import` en haut d'`app.js`. Que reste-t-il d'utilisé dans `app.js` ? `attendre` et `chargerJson` (dans `demarrerJeu`), `Heros` et `Mage` (l'écran de choix), et `chargerMonstreAleatoire` (la rencontre) :

```javascript
import { attendre, chargerJson } from "./outils.js";
import { Heros, Mage } from "./personnages.js";
import { chargerMonstreAleatoire } from "./monstre.js";
```

`nombreAuHasard` a disparu de la liste : plus personne ne l'utilise dans `app.js`.

## Vérifier

1. Recharge et fais une partie avec le **Mage** : les sorts, le mana, le soin marchent.
2. Recharge et prends le **Chevalier** : combats, victoire, défaite.
3. Dans l'onglet **Réseau**, tu vois maintenant 5 fichiers JavaScript. Le navigateur suit les `import` de fichier en fichier, et ne charge chaque fichier **qu'une seule fois**, même si `outils.js` est importé par quatre modules.

> 🆘 Bloqué ? Compare avec le [projet complet de l'étape 03](./etapes/etape-03/).

### Ce qu'il faut retenir

- Un module importe **exactement** ce qu'il utilise, ni plus, ni moins.
- Les imports dessinent les **dépendances** du projet : on voit d'un coup d'œil qui a besoin de qui.
- Une fonction se range avec ce dont elle **parle** : `chargerMonstreAleatoire` va avec `Monstre`.
- `class B extends A` : le fichier de `B` doit importer `A`.

## 🏆 Défi

Dessine le schéma des dépendances de ton projet à la fin de cette étape (les 5 fichiers et leurs flèches). Y a-t-il un fichier qui n'importe **rien** ? C'est le plus « indépendant » : on pourrait le réutiliser tel quel dans un autre jeu.

➡️ Suite : [04 – Tout ranger, et main.js](./04-tout-ranger.md)
