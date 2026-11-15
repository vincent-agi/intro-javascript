# 01 – Introduction : donner une voix au jeu

Ton Mini RPG se déplace, charge des Pokémon et se bat, mais il est **muet**. Un jeu rétro, c'est aussi des *bips*, des coups d'épée et une musique qui change selon la situation. Dans ce tutoriel, tu vas ajouter tout ça.

Les sons ne sont **pas fournis** : tu vas les télécharger toi-même sur OpenGameArt. C'est un vrai geste de développeur de jeu.

## Quel son, dans quel contexte ?

| Fichier | Quand il joue | Mots-clés à chercher |
| --- | --- | --- |
| `pas.wav` | un pas du héros | *footstep*, *step* |
| `collision.wav` | le héros se cogne (arbre, eau, bordure) | *bump*, *blip*, *wall* |
| `rencontre.wav` | un monstre apparaît dans l'herbe | *alert*, *encounter*, *warning* |
| `attaque.wav` | le héros attaque | *sword*, *slash*, *hit* |
| `degats.wav` | le héros est touché | *hurt*, *damage* |
| `soin.wav` | le héros se soigne | *heal*, *powerup*, *magic* |
| `victoire.wav` | le monstre est vaincu | *victory*, *fanfare*, *jingle* |
| `defaite.wav` | le héros est à terre | *game over*, *defeat*, *lose* |
| `musique-carte.mp3` | ambiance sur la carte (en boucle) | *overworld*, *exploration*, *village* |
| `musique-combat.mp3` | ambiance du combat (en boucle) | *battle*, *fight*, *boss* |

## Télécharger sur OpenGameArt

1. Va sur [opengameart.org](https://opengameart.org), utilise la recherche et filtre sur **Art Type** : *Sound Effect* ou *Music*.
2. **Vérifie la licence** sur la page de chaque son :
   - **CC0** : domaine public, tu fais ce que tu veux (idéal) ;
   - **CC-BY** : autorisé, mais tu dois **citer l'auteur** ;
   - **CC-BY-SA**, **GPL** : conditions plus lourdes, à éviter pour débuter.
3. Télécharge le fichier, **renomme-le** comme dans le tableau, et place-le dans un dossier `sons/`.
4. Note l'auteur, la licence et l'adresse dans un fichier `sons/CREDITS.md` (modèle fourni dans le dossier du tutoriel).

Pour gagner du temps, deux pages à explorer (vérifie la licence de chaque fichier avant de l'utiliser) :

- [512 Sound Effects (8-bit style)](https://opengameart.org/content/512-sound-effects-8-bit-style) : une énorme collection de bruitages rétro, pas, coups, soins, victoires… ;
- [CC0 – Retro Music](https://opengameart.org/content/cc0-retro-music) : des musiques rétro libres, dont des thèmes de combat et d'exploration.

> **Format** : choisis du `.wav` pour les effets et du `.mp3` pour les musiques. Ils marchent sur tous les navigateurs. Le `.ogg` est refusé par certaines versions de Safari. Si tu n'as qu'un `.ogg`, convertis-le, ou adapte les noms de fichiers à l'étape 03.

## Le plan

| Étape | Ce que tu ajoutes | Notion |
| --- | --- | --- |
| 02 | Ton premier son | objet `Audio`, `play()`, règle de l'autoplay |
| 03 | Une classe `Sons` et des effets dans chaque contexte | `fetch` + `blob`, `Promise.all`, `cloneNode` |
| 04 | Une musique différente sur la carte et en combat | `loop`, fondu avec `setInterval` |
| 05 | Bouton muet et sons manquants | `localStorage`, jeu robuste, code final |

## Point de départ

Copie le dossier du tutoriel précédent (`api`) dans un nouveau dossier de travail, et ajoute un dossier `sons/` avec tes fichiers :

```
mon-rpg-son/
├── index.html
├── style.css      (celui de mini-rpg ; lien à adapter dans index.html)
├── carte.css
├── map.json
├── app.js
└── sons/
    ├── pas.wav
    ├── collision.wav
    ├── ... (les 10 fichiers)
    └── CREDITS.md
```

Lance ton serveur local (`npx serve` ou `python3 -m http.server`) comme à l'étape 01 du tutoriel précédent.

> **Pas de panique si certains sons manquent** : le jeu que tu vas écrire fonctionne même sans eux. Tu peux commencer avec un ou deux sons et en ajouter ensuite.

## 🏆 Défi

Avant de coder, télécharge **au moins** `attaque.wav` et `musique-combat.mp3`, écoute-les dans ton lecteur, et remplis leur ligne dans `CREDITS.md`.

➡️ Suite : [02 – Ton premier son](./02-premier-son.md)
