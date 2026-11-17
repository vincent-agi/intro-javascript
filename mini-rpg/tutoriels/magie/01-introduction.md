# 01 – Introduction : un héros qui maîtrise la magie

Ton Mini RPG a une carte, des monstres, des combats et du son. Mais il n'y a qu'**un seul** héros, qui tape avec son épée. Dans ce tutoriel, tu crées un **Mage** :

- 🧙 il a **moins de PV** (80) et son bâton tape faiblement ;
- 🔮 mais il a une réserve de **mana** (50), affichée dans une barre bleue ;
- ⚡🔥✨ il lance des **sorts** qui coûtent du mana : Éclair, Boule de feu, et Lumière qui le soigne ;
- 🔄 son mana **remonte** un peu à chaque tour, et après chaque victoire ;
- 🤺 au début de la partie, le joueur **choisit** entre le Chevalier et le Mage.

## Ce que tu vas pratiquer : la POO pour de vrai

C'est le tutoriel où la programmation orientée objet montre toute sa force :

| Étape | Ce que tu ajoutes | Notion de POO |
| --- | --- | --- |
| 02 | Le Mage et sa barre de mana | **héritage** : `Mage extends Heros` |
| 03 | Des boutons de sorts qui coûtent du mana | une classe `Sort`, des **objets dans un tableau** |
| 04 | Un sort de soin, et le mana qui remonte | **redéfinir** une méthode (`SortDeSoin`) |
| 05 | L'écran de choix : Chevalier ou Mage | **polymorphisme** : même code, héros différents |
| 06 | Le son et l'éclat des sorts, code final | un objet qui **porte ses propres données** (`sort.son`) |

> Le **polymorphisme** est un mot savant pour une idée simple : `Combat` dit « héros, attaque ! » sans savoir **quel** héros il a en face. Chaque héros répond **à sa façon**.

## Point de départ

Copie le jeu terminé du dossier [`son`](../son/06-sons-manquants-code-final.md), avec son dossier `sons/`, dans un nouveau dossier :

```
mon-rpg-magie/
├── index.html
├── style.css      (celui de mini-rpg ; lien à adapter dans index.html)
├── carte.css
├── map.json
├── app.js
└── sons/          (tes 10 fichiers + CREDITS.md)
```

Lance ton serveur local, comme d'habitude.

À l'étape 06, tu ajouteras **un seul** nouveau son, `magie.wav`, à choisir dans le même pack qu'avant : [512 Sound Effects (8-bit style)](https://opengameart.org/content/512-sound-effects-8-bit-style), par Juhani Junkala (CC0), dossier *General Sounds*, un son *positive*, *power up* ou un « bling » magique.

> 🆘 **Bloqué à une étape ?** Le dossier [`etapes/`](./etapes/) contient le code complet des étapes 02 à 05. Le jeu final (étape 06) est dans ce dossier-ci. Copie ton dossier `sons/` à côté du code que tu veux essayer.

## Vérifier

Ouvre ton jeu : il fonctionne exactement comme à la fin du dossier `son`. C'est ta base de départ.

## 🏆 Défi

Avant de coder, imagine ton Mage sur papier : combien de PV ? Combien de mana ? Quels sorts, et combien coûte chacun ? Note tes idées. Tu pourras remplacer les valeurs du tutoriel par les tiennes.

➡️ Suite : [02 – Le Mage et sa barre de mana](./02-mage.md)
