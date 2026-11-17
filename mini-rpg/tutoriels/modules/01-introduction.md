# 01 – Introduction : ranger son code

Ton Mini RPG marche : carte, monstres, sons, Mage et sorts. Mais ouvre `app.js` et fais défiler… **près de 700 lignes** dans un seul fichier ! Essaie de retrouver, sans `Ctrl + F` :

- où est calculé le coût d'un sort ?
- où est décidé qu'un monstre surgit dans l'herbe ?
- où est la musique de combat ?

Tu as perdu du temps ? C'est normal. Un gros fichier, c'est comme une chambre où tout est entassé sur le lit : tout y est, mais on ne trouve rien.

## Refactoriser, c'est quoi ?

**Refactoriser**, c'est **réorganiser le code sans changer ce que fait le jeu**. Le joueur ne voit aucune différence. Mais toi, tu gagnes :

- un code **facile à lire** : chaque fichier parle d'**un seul sujet** ;
- un code **facile à modifier** : pour changer les sorts, tu ouvres `sorts.js`, et rien d'autre ;
- un code **qui s'explique tout seul** : les commentaires JSDoc disent à ton éditeur (et à tes camarades) ce qu'attend chaque fonction.

> 💡 La règle d'or de la refactorisation : **le jeu doit marcher après chaque petite étape**. On déplace un morceau, on recharge, on vérifie, puis on passe au suivant.

## Où on va

À la fin, ton projet ressemblera à ça :

```
mon-rpg-modules/
├── index.html
├── carte.css
├── map.json
├── sons/
└── js/
    ├── main.js          le démarrage : crée les objets et les relie
    ├── outils.js        nombreAuHasard, attendre, chargerJson
    ├── sons.js          FICHIERS_SONS, Sons
    ├── personnages.js   Personnage, Heros, Mage
    ├── sorts.js         Sort, SortDeSoin
    ├── monstre.js       Monstre, chargerMonstreAleatoire
    ├── journal.js       Journal
    ├── carte.js         Carte
    ├── exploration.js   Exploration
    └── combat.js        Combat
```

Dix petits fichiers de 20 à 180 lignes chacun, au lieu d'un fichier de 700.

## Le plan

| Étape | Ce que tu fais | Ce que tu apprends |
| --- | --- | --- |
| 02 | Ton premier module : `outils.js` | `export`, `import`, `<script type="module">` |
| 03 | Les combattants et la magie dans leurs fichiers | un module qui en importe un autre |
| 04 | Tout le reste, et `main.js` | organiser un projet, lire les dépendances |
| 05 | Documenter avec JSDoc | le code **avant** et **après** JSDoc |
| 06 | Bilan et code final | relire son projet comme un pro |

## Point de départ

Copie le jeu terminé du dossier [`magie`](../magie/06-son-sorts-code-final.md), avec son dossier `sons/`. (Si tu n'as pas fait `magie`, tu peux suivre ce dossier avec le jeu du dossier `son` : il y aura juste moins de classes à ranger.)

Lance ton serveur local : les **modules** JavaScript ne fonctionnent **que** via un serveur, jamais en double-cliquant sur `index.html`.

> 🆘 **Bloqué à une étape ?** Le dossier [`etapes/`](./etapes/) contient le projet complet à la fin des étapes 02, 03 et 04. Le projet final, avec la JSDoc, est dans ce dossier-ci : [`index.html`](./index.html) et le dossier [`js/`](./js/). Copie ton dossier `sons/` à côté pour l'essayer.

## Vérifier

Fais une partie complète (Mage et Chevalier) **avant** de toucher au code, pour savoir exactement comment le jeu doit se comporter. Après chaque étape, refais ce même test : rien ne doit avoir changé.

## 🏆 Défi

Sur papier, regarde la liste des classes et fonctions d'`app.js`, et range-les **toi-même** dans des fichiers. Compare ensuite avec l'arborescence ci-dessus. Il n'y a pas une seule bonne réponse : pourquoi aurais-tu fait autrement ?

➡️ Suite : [02 – Ton premier module](./02-premier-module.md)
