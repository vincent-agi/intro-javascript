# 01 – Introduction : un vrai petit RPG

Ton Mini RPG en POO fonctionne, mais tout est **écrit à la main** : toujours le même monstre (80 PV), et pas de monde à explorer.

À la fin de ce tutoriel, ton jeu ressemblera aux vieux jeux Pokémon :

- 🗺️ une **carte** faite de tuiles (chemins, herbe, arbres, eau) ;
- 🧙 un **héros** que tu déplaces avec les flèches du clavier, qui ne traverse ni les arbres ni l'eau ;
- 🌿 dans les **hautes herbes**, un monstre **caché** peut surgir : l'écran clignote et le combat commence ;
- 👹 le monstre est un **vrai Pokémon**, avec son nom, son image et ses stats, téléchargé sur Internet ;
- ⚔️ après le combat, tu **retournes sur la carte** (ou au point de départ si tu as perdu).

## Client et serveur, en deux phrases

Ton jeu tourne dans le navigateur : c'est le **client**. Quand il a besoin d'un monstre, il **demande** à un **serveur** sur Internet, qui **répond** avec des données. Ce serveur, c'est [PokeAPI](https://pokeapi.co) : une **API**, c'est-à-dire une adresse web qui renvoie des données au lieu d'une page.

Essaie tout de suite : ouvre cette adresse dans un nouvel onglet.

👉 <https://pokeapi.co/api/v2/pokemon/gengar>

Tu vois un long texte : c'est la fiche de Gengar, au format **JSON**. Ça ressemble à un objet JavaScript :

```json
{ "id": 94, "name": "gengar", "stats": [ { "base_stat": 60, "stat": { "name": "hp" } } ] }
```

Change la fin de l'adresse par `pikachu`, puis par `25` : même principe, autre Pokémon. Ton jeu va faire exactement ça, mais en JavaScript.

## Le plan

Chaque étape ajoute **une chose visible** au jeu. Tu testes à chaque fois avant de passer à la suite.

| Étape | Ce que tu ajoutes | Ce que tu pratiques |
| --- | --- | --- |
| 02 | Gengar, téléchargé depuis PokeAPI | `fetch`, `async` / `await` |
| 03 | Un monstre au hasard, et un plan B si Internet tombe | URL construite, `try` / `catch` |
| 04 | Une carte chargée depuis un fichier | fichier JSON, `split`, `map`, grille CSS |
| 05 | Le héros se déplace, sans traverser les obstacles | clavier, coordonnées, collisions |
| 06 | Marcher dans l'herbe déclenche un combat | fonction de rappel, hasard, écrans |
| 07 | Retour à la carte après le combat, code final | assembler le tout |

> 🆘 **Bloqué à une étape ?** Le dossier [`etapes/`](./etapes/) contient le code **complet et fonctionnel** de chaque étape (`etape-02`, `etape-03`…). Compare-le avec le tien. Le jeu terminé (étape 07) est dans ce dossier-ci : [`app.js`](./app.js), [`index.html`](./index.html), [`carte.css`](./carte.css), [`map.json`](./map.json).

## Point de départ

Copie le code de la fin du tutoriel POO dans un nouveau dossier :

```
mon-rpg/
├── index.html   (celui du dossier poo)
├── style.css    (celui du dossier mini-rpg)
└── app.js       (celui du dossier poo)
```

Dans `index.html`, corrige le lien du style : `<link rel="stylesheet" href="style.css">`.

## Lancer un petit serveur local

À l'étape 04, ton jeu chargera un **fichier de ton projet** (la carte). Les navigateurs l'interdisent quand la page est ouverte par un double-clic (adresse en `file://`). Il faut ouvrir la page **via un serveur**. Prends l'habitude dès maintenant. Au choix :

- **VS Code** : installe l'extension **Live Server**, clic droit sur `index.html` → *Open with Live Server* ;
- **Terminal**, dans le dossier du projet :

```bash
npx serve                 # puis ouvre l'adresse affichée (ex. http://localhost:3000)
# ou
python3 -m http.server    # puis ouvre http://localhost:8000
```

## Vérifier

Ouvre ton jeu via le serveur : le combat de la version POO fonctionne comme avant. L'adresse commence par `http://localhost`, et non par `file://`.

## 🏆 Défi

Dans le navigateur, ouvre la fiche du Pokémon numéro `25`. Cherche son nom (`name`) et sa valeur de `hp` dans `stats`. Astuce : Firefox affiche le JSON joliment rangé, et `Ctrl + F` aide à chercher.

➡️ Suite : [02 – Gengar depuis l'API](./02-monstre-depuis-api.md)
