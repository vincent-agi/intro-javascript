# 01 – Introduction : c'est ton jeu maintenant

Tu as construit un vrai petit RPG : une carte, des collisions, des monstres venus d'Internet, des combats, du son (et peut-être un Mage). Jusqu'ici, tu **suivais** un tutoriel. À partir de maintenant, c'est **toi** qui décides.

Ce dossier ne te donne pas un jeu à recopier. Il t'aide à **faire évoluer le tien**, avec ton histoire, tes règles, tes personnages et tes images. C'est exactement ce que fait un développeur de jeux : partir d'un jeu qui marche, et l'améliorer **petit à petit**, sans jamais le casser.

## Point de départ

Pars de ton jeu le plus avancé : à la fin du dossier [`animations`](../animations/07-mouvement-reduit-code-final.md) (code en modules, documenté et animé), ou du dossier [`modules`](../modules/06-bilan-code-final.md), sinon du dossier [`magie`](../magie/01-introduction.md) ou du dossier [`son`](../son/06-sons-manquants-code-final.md). Les exemples marchent dans tous les cas, et les rares différences sont signalées.

> Si ton code est rangé en modules, chaque exemple te dit **quelle classe** modifier : la carte du code ci-dessous t'indique **dans quel fichier** elle se trouve. Et si tu crées une nouvelle classe, pense à l'`export`er et à l'`import`er là où tu t'en sers.

**Avant de toucher à quoi que ce soit, fais une copie de sauvegarde** de ton dossier (`mon-rpg-v1`). Si tu casses tout, tu pourras toujours revenir en arrière. (Et si tu connais Git, c'est le moment de faire un *commit* !)

## La méthode : 4 temps, en boucle

Chaque idée, même la plus folle, se construit de la même façon :

| Temps | Ce que tu fais | Exemple : « je veux des potions » |
| --- | --- | --- |
| 🧠 **Imaginer** | Décris l'idée en une phrase, **sans code** | « Le héros trouve des potions sur la carte et peut les boire en combat. » |
| ✂️ **Découper** | Coupe-la en **petits morceaux**, chacun testable | 1. un compteur de potions ; 2. un bouton « Boire » ; 3. des potions sur la carte |
| 🔍 **Trouver où** | Pour chaque morceau : quelle classe ? quelle méthode ? | compteur → `Heros` ; bouton → `Combat` + `index.html` ; carte → `map.json` + `Exploration` |
| ⌨️ **Coder et tester** | Un seul morceau à la fois, puis **recharge et vérifie** | le compteur s'affiche dans la console : ✅, morceau suivant |

> 💡 La règle d'or : **ne code jamais plus de 10 lignes sans tester**. Si quelque chose casse, tu sais que c'est dans ces 10 lignes.

## La carte de ton code

Pour « trouver où », voici qui fait quoi dans ton jeu :

| Je veux changer… | Je regarde… | Fichier (si ton code est en modules) |
| --- | --- | --- |
| la forme du monde, les obstacles, le départ | `map.json` | `map.json` |
| les couleurs, les images, la mise en page | `carte.css`, `index.html` | `carte.css`, `index.html` |
| les PV, les dégâts, le soin du héros | classes `Personnage` et `Heros` (et `Mage`) | `js/personnages.js` |
| les sorts | classes `Sort` et `SortDeSoin` | `js/sorts.js` |
| les monstres (qui, combien de PV, quels dégâts) | classe `Monstre`, fonction `chargerMonstreAleatoire` | `js/monstre.js` |
| la carte en JavaScript (tuiles, collisions) | classe `Carte` | `js/carte.js` |
| ce qui se passe quand on marche (rencontres) | classe `Exploration`, méthode `deplacer` | `js/exploration.js` |
| le déroulement d'un combat (tours, victoire, défaite) | classe `Combat` | `js/combat.js` |
| les sons et la musique | `FICHIERS_SONS` et classe `Sons` | `js/sons.js` |
| comment tout est relié (qui prévient qui) | fonction `demarrerJeu` | `js/main.js` |
| les animations (CSS) | `@keyframes`, `transition` | `animations.css` |
| les animations déclenchées par le code | fonction `animer` | `js/outils.js` |

## Ta fiche « Mon histoire »

Crée un fichier `MON-HISTOIRE.md` dans ton projet, copie ce modèle et remplis-le. Pas besoin que ce soit long : quelques lignes suffisent.

```markdown
# Mon histoire

## Le pitch (2 ou 3 phrases)
Qui est le héros ? Où est-il ? Que doit-il faire ?

## Le monde
Quels lieux ? (forêt, village, grotte, château...)

## Les personnages
- Le héros :
- Les gentils (qui aide le héros ?) :
- Les méchants (qui l'en empêche ?) :

## Le but du jeu
Comment on gagne ? Comment on perd ?

## Mes idées (de la plus simple à la plus dure)
- [ ] ...
- [ ] ...
- [ ] ...
```

## Ton carnet de bord

Crée aussi un fichier `CARNET-DE-BORD.md`. Après chaque séance, écris **trois lignes** :

```markdown
## Séance du 12 mars
- ✅ Fait : les potions apparaissent sur la carte.
- 🐛 Problème : le héros pouvait boire une potion à 0 potion. Corrigé avec un if.
- ➡️ Prochaine étape : le bouton « Boire » en combat.
```

Ce carnet t'aide à reprendre là où tu t'étais arrêté, et à **voir tes progrès**.

## Le plan de ce dossier

Chaque chapitre contient **un exemple guidé** (code complet, à faire en premier), puis des **idées à toi de jouer**, notées par difficulté : ⭐ facile, ⭐⭐ moyen, ⭐⭐⭐ difficile.

| Chapitre | Thème | Exemple guidé |
| --- | --- | --- |
| 02 | Changer les règles | expérience et niveaux |
| 03 | Ajouter des personnages | un villageois qui parle |
| 04 | Faire évoluer le monde | une forêt sombre, plus dangereuse |
| 05 | Ajouter des images et des sons | des tuiles en images |
| 06 | Raconter une histoire, avec un début et une fin | un boss final et un écran de victoire |

Tu peux les faire **dans l'ordre que tu veux**. Et tu peux, à tout moment, sauter l'exemple guidé pour réaliser **ta** idée à la place.

## 🏆 Défi

Remplis ta fiche `MON-HISTOIRE.md`. Puis, dans la liste « Mes idées », souligne **une** idée ⭐ que tu pourrais coder aujourd'hui en moins de 30 minutes. Fais-la !

➡️ Suite : [02 – Changer les règles](./02-regles.md)
