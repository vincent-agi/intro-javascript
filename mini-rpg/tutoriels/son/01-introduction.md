# 01 – Introduction : donner une voix au jeu

Ton Mini RPG se déplace, charge des Pokémon et se bat, mais il est **muet**. Dans ce tutoriel, tu ajoutes des bruitages et de la musique, **étape par étape**. À la fin de **chaque** étape, le jeu marche et tu entends quelque chose de nouveau :

| Étape | Ce que tu entends en plus | Ce que tu pratiques |
| --- | --- | --- |
| 02 | Le coup d'épée quand tu attaques | une classe `Sons`, l'objet `Audio` |
| 03 | Les pas, les chocs, la rencontre, les dégâts, le soin, la victoire, la défaite | injecter un objet dans d'autres classes |
| 04 | Une musique sur la carte, une autre en combat | `loop`, fondu avec `setInterval` |
| 05 | Un bouton pour couper le son, qui se souvient de ton choix | `localStorage` |
| 06 | Un message clair si un son manque, et le code final | `fetch`, `reponse.ok` |

## L'idée : un seul objet s'occupe des sons

Comme `Carte` s'occupe des tuiles et `Combat` du combat, une classe **`Sons`** va s'occuper de **tout** le son. Les autres classes ne touchent jamais aux fichiers audio : elles demandent simplement :

```javascript
this.sons.jouer("attaque");
```

C'est le principe de la programmation orientée objet : **chaque objet a un rôle**, et les autres lui **demandent un service** sans savoir comment il s'y prend.

## Télécharger les sons (une seule fois)

Pas besoin de chercher : les sons sont déjà choisis. Ils viennent de [OpenGameArt](https://opengameart.org), un site de ressources libres pour les jeux. Tu n'as que **trois pages** à visiter. Les trois sont sous licence **CC0** (domaine public) : tu peux les utiliser librement, mais créditer l'auteur reste une bonne habitude.

Crée un dossier `sons/` dans ton projet. Tu vas y ranger **10 fichiers**, avec **exactement** les noms de la colonne de gauche.

### 1. Les bruitages : un seul pack pour les 8 effets

👉 [512 Sound Effects (8-bit style)](https://opengameart.org/content/512-sound-effects-8-bit-style), par SubspaceAudio, alias Juhani Junkala (CC0)

Télécharge le fichier `.zip` (bouton sous *File(s)*, environ 20 Mo) et décompresse-le. Tu obtiens un dossier `The Essential Retro Video Game Sound Effects Collection [512 sounds] By Juhani Junkala`, rangé en sous-dossiers. Pour chaque son du jeu, ouvre le sous-dossier indiqué, **écoute** quelques fichiers, choisis celui qui te plaît, **copie-le** dans `sons/` et **renomme-le** :

| Nom à donner | Quand il joue | Sous-dossier du pack | Par exemple |
| --- | --- | --- | --- |
| `pas.wav` | un pas du héros | `Movement/Footsteps` | `sfx_movement_footsteps1a.wav` |
| `collision.wav` | le héros se cogne (arbre, eau, bord) | `General Sounds/Impacts` | `sfx_sounds_impact1.wav` |
| `rencontre.wav` | un monstre surgit dans l'herbe | `General Sounds/Interactions` | `sfx_sounds_interaction5.wav` |
| `attaque.wav` | le héros attaque | `Weapons/Melee` | `sfx_wpn_sword1.wav` |
| `degats.wav` | le héros est touché | `General Sounds/Simple Damage Sounds` | `sfx_damage_hit3.wav` |
| `soin.wav` | le héros se soigne | `General Sounds/Positive Sounds` | `sfx_sounds_powerup3.wav` |
| `victoire.wav` | le monstre est vaincu | `General Sounds/Fanfares` | `sfx_sounds_fanfare1.wav` |
| `defaite.wav` | le héros est à terre | `General Sounds/Negative Sounds` | `sfx_sounds_error1.wav` |

> C'est **ton** jeu : les exemples ne sont que des points de départ. Écoute les voisins dans le même dossier et garde ceux que tu préfères. Choisis des sons **courts** (moins d'une seconde) : ils accompagnent une action, ils ne doivent pas la ralentir.

### 2. La musique de la carte

👉 [Town Theme RPG](https://opengameart.org/content/town-theme-rpg), par cynicmusic (CC0)

Télécharge le fichier `TownTheme.mp3`, place-le dans `sons/` et renomme-le **`musique-carte.mp3`**.

### 3. La musique de combat

👉 [Battle Theme A](https://opengameart.org/content/battle-theme-a), par cynicmusic (CC0)

Télécharge le fichier `battleThemeA.mp3`, place-le dans `sons/` et renomme-le **`musique-combat.mp3`**.

### Les crédits

Le fichier [`sons/CREDITS.md`](./sons/CREDITS.md) est déjà rempli avec ces trois sources. Copie-le dans ton dossier `sons/` et complète-le si tu changes un son.

> **Vérifie toujours la licence** sur la page d'un son avant de l'utiliser : **CC0** = libre ; **CC-BY** = libre, mais tu **dois** citer l'auteur ; **CC-BY-SA**, **GPL** = conditions plus lourdes, à éviter pour débuter.

## Point de départ

Copie le jeu terminé du tutoriel précédent ([`api`](../api/07-retour-code-final.md)) dans un nouveau dossier, et ajoute `sons/` :

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

Lance ton serveur local (`npx serve`, `python3 -m http.server` ou Live Server), comme dans le tutoriel précédent.

> 🆘 **Bloqué à une étape ?** Le dossier [`etapes/`](./etapes/) contient le code complet et fonctionnel des étapes 02 à 05. Le jeu final (étape 06) est dans ce dossier-ci. Les fichiers audio ne sont **pas** fournis : copie ton dossier `sons/` à côté du code que tu veux essayer.

## Vérifier

1. Double-clique sur deux ou trois fichiers de `sons/` : ils se lisent dans ton lecteur audio.
2. Ouvre `http://localhost:…/sons/attaque.wav` dans le navigateur (avec le port de ton serveur) : le son se joue. C'est la preuve que ton serveur le **sert** bien, et donc que le jeu pourra le charger.

## 🏆 Défi

Dans le pack de 512 sons, trouve un **deuxième** son d'attaque qui te plaît, et garde-le de côté sous le nom `attaque2.wav`. Il servira au défi de l'étape 02.

➡️ Suite : [02 – La classe `Sons` et le premier son](./02-premier-son.md)
