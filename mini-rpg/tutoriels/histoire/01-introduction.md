# 01 – Introduction : c'est ton jeu maintenant

Tu as construit un vrai petit RPG : une carte, des collisions, des monstres venus d'Internet, des combats, du son (et peut-être un Mage). Jusqu'ici, tu **suivais** un tutoriel. À partir de maintenant, c'est **toi** qui décides.

Ce dossier ne te donne pas un jeu à recopier. Il t'aide à **faire évoluer le tien**, avec ton histoire, tes règles, tes personnages et tes images. C'est exactement ce que fait un développeur de jeux : partir d'un jeu qui marche, et l'améliorer **petit à petit**, sans jamais le casser.

## Point de départ

Pars de ton jeu à la fin du dossier [`son`](../son/06-sons-manquants-code-final.md). Si tu as fait le dossier [`magie`](../magie/01-introduction.md), pars de celui-là : les exemples marchent aussi, et les rares différences sont signalées.

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

| Je veux changer… | Je regarde… |
| --- | --- |
| la forme du monde, les obstacles, le départ | `map.json` |
| les couleurs, les images, la mise en page | `carte.css`, `index.html` |
| les PV, les dégâts, le soin du héros | classes `Personnage` et `Heros` |
| les monstres (qui, combien de PV, quels dégâts) | classe `Monstre`, fonction `chargerMonstreAleatoire` |
| ce qui se passe quand on marche (collisions, rencontres) | classe `Exploration`, méthode `deplacer` |
| le déroulement d'un combat (tours, victoire, défaite) | classe `Combat` |
| les sons et la musique | `FICHIERS_SONS` et classe `Sons` |
| comment tout est relié (qui prévient qui) | fonction `demarrerJeu` |

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
