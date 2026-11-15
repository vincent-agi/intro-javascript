# 01 – Introduction : passer le Mini RPG en POO

Tu as déjà le Mini RPG fait avec des **variables** et des **fonctions** (tutoriels `01` à `05`, un dossier plus haut). Il marche. Mais regarde son code :

```javascript
let pvJoueur = PV_MAX_JOUEUR;
let pvMonstre = PV_MAX_MONSTRE;
```

Un deuxième monstre ? Il faudrait `pvMonstre2`, `barreMonstre2`, une `riposte2`… Tout est **éparpillé** : les données d'un côté, les fonctions de l'autre.

La **Programmation Orientée Objet** (POO) range chaque chose avec ses actions :

- une **classe** = un moule (ex. `Personnage`) ;
- un **objet** = une pièce fabriquée avec le moule (ex. le héros) ;
- les **propriétés** = ses données (`pv`, `nom`…) ;
- les **méthodes** = ses actions (`attaquer()`, `recevoirDegats()`…).

## Le plan : on fait évoluer le même jeu

À chaque étape, **le jeu reste jouable**. Tu transformes `app.js` petit à petit.

| Étape | Ce que tu changes | Notion |
| --- | --- | --- |
| 02 | `pvJoueur` et `pvMonstre` deviennent deux objets | **classe**, **constructeur**, **méthodes** |
| 03 | `historique` et le journal deviennent un objet | classe avec un **état** et des éléments de la page |
| 04 | Héros et monstre ont chacun leur comportement | **héritage** (`extends`, `super`) |
| 05 | Il ne reste plus aucune variable globale | classe **chef d'orchestre** |

## Point de départ

Crée un dossier de travail et copie-y ces fichiers du projet `mini-rpg` :

```
mon-rpg-poo/
├── index.html   (copié tel quel)
├── style.css    (copié tel quel)
└── app.js       (la version à base de fonctions, qu'on va transformer)
```

Ouvre `index.html` : le jeu doit marcher. Le HTML et le CSS **ne changeront plus** : seul `app.js` évolue.

> Pas de `app.js` complet sous la main ? Le [code final du tutoriel précédent](../05-tableau-historique-boucle.md#le-code-final) est ton point de départ.

## 🏆 Défi

Sans coder : liste **trois choses** du jeu qui seraient des objets (ex. le héros), et pour chacune **deux propriétés** et **deux méthodes**.

➡️ Suite : [02 – Une classe Personnage](./02-classe-personnage.md)
