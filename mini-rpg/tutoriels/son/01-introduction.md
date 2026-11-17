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

👉 [512 Sound Effects (8-bit style)](https://opengameart.org/content/512-sound-effects-8-bit-style), par Juhani Junkala (CC0)

Télécharge le fichier `.zip` (bouton sous *File(s)*) et décompresse-le. Les sons sont rangés par dossiers. Écoute-en quelques-uns dans chaque dossier, choisis celui qui te plaît, **copie-le** dans `sons/` et **renomme-le** :

| Nom à donner | Quand il joue | Où le chercher dans le pack |
| --- | --- | --- |
| `pas.wav` | un pas du héros | dossier *Movement*, sons *footsteps* |
| `collision.wav` | le héros se cogne (arbre, eau, bord) | dossier *General Sounds*, sons *impact* ou *negative* |
| `rencontre.wav` | un monstre surgit dans l'herbe | dossier *General Sounds*, sons d'alarme ou *negative* |
| `attaque.wav` | le héros attaque | dossier *Weapons*, un coup d'épée ou un *hit* |
| `degats.wav` | le héros est touché | dossier *General Sounds*, sons *damage* ou *hit* |
| `soin.wav` | le héros se soigne | dossier *General Sounds*, sons *positive* ou *power up* |
| `victoire.wav` | le monstre est vaincu | dossier *General Sounds*, sons *fanfare* |
| `defaite.wav` | le héros est à terre | dossier *Death Screams* ou sons *negative* |

> C'est **ton** jeu : il n'y a pas de mauvais choix. Si un dossier porte un nom un peu différent, prends un son qui colle au moment du jeu.

### 2. La musique de la carte

👉 [Town Theme RPG](https://opengameart.org/content/town-theme-rpg), par cynicmusic (CC0)

Télécharge le fichier `.mp3`, place-le dans `sons/` et renomme-le **`musique-carte.mp3`**.

### 3. La musique de combat

👉 [Battle Theme A](https://opengameart.org/content/battle-theme-a), par cynicmusic (CC0)

Télécharge le fichier `.mp3`, place-le dans `sons/` et renomme-le **`musique-combat.mp3`**.

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
