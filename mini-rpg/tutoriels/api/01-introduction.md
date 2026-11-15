# 01 – Introduction : charger des données avec `fetch`

Ton Mini RPG en POO fonctionne, mais le monstre est **écrit à la main** dans le code (80 PV, toujours le même). Et si ses données venaient **d'Internet** ?

## Une API, c'est quoi ?

Une **API** est un service web qui répond à une adresse (une URL) en renvoyant des **données**. Ici, [PokeAPI](https://pokeapi.co) renvoie des fiches de Pokémon :

- `https://pokeapi.co/api/v2/pokemon/gengar` : la fiche de Gengar ;
- `https://pokeapi.co/api/v2/pokemon/94` : la même, par son numéro (`id`).

Les données arrivent en **JSON**, un texte qui ressemble à un objet JavaScript :

```json
{ "id": 94, "name": "gengar", "stats": [ { "base_stat": 60, "stat": { "name": "hp" } } ] }
```

## `fetch`, les promesses et `async` / `await`

Aller chercher une donnée sur Internet **prend du temps**. JavaScript ne bloque pas la page pendant l'attente : `fetch` renvoie une **promesse** (*Promise*), c'est-à-dire « la réponse arrivera plus tard ».

Avec `async` / `await`, on écrit ce code d'attente comme du code normal :

```javascript
async function chargerGengar() {                      // "async" : la fonction attend des choses
    const reponse = await fetch("https://pokeapi.co/api/v2/pokemon/gengar");
    const donnees = await reponse.json();             // transforme le JSON en objet
    console.log(donnees.name);                        // "gengar"
}
chargerGengar();
```

- `await` **met la fonction en pause** jusqu'à l'arrivée du résultat ;
- `await` ne s'utilise que dans une fonction `async` ;
- une fonction `async` renvoie elle-même une promesse : pour récupérer son résultat, on l'`await` aussi.

### Essaie dans la console

Ouvre ton navigateur, `F12`, onglet **Console**, et colle :

```javascript
const reponse = await fetch("https://pokeapi.co/api/v2/pokemon/gengar");
const gengar = await reponse.json();
gengar.stats;
```

(La console accepte `await` directement.) Explore l'objet : `gengar.sprites.front_default` est l'image du Pokémon.

## Le plan : le même jeu, de plus en plus riche

| Étape | Ce que tu ajoutes | Notion |
| --- | --- | --- |
| 02 | Gengar vient de PokeAPI | `fetch`, `async` / `await`, `static` |
| 03 | Un monstre au hasard, et un plan B si l'API échoue | `{id}` dynamique, `try` / `catch` |
| 04 | Une carte chargée depuis un fichier JSON, découpée en tuiles | `fetch` local, `split`, `map` |
| 05 | Un héros qui se déplace au clavier, avec des collisions | événements clavier, bordures, obstacles |
| 06 | Marcher dans l'herbe déclenche un combat | tout assembler |

## Point de départ

Copie le dossier `poo` (la fin du tutoriel précédent) dans un nouveau dossier de travail, avec le CSS :

```
mon-rpg-api/
├── index.html   (celui du dossier poo)
├── style.css    (celui de mini-rpg ; adapte le lien dans index.html : href="style.css")
└── app.js       (celui du dossier poo)
```

## Un petit serveur local

À partir de l'étape 04, tu chargeras un **fichier de ton projet** avec `fetch`. Les navigateurs **bloquent** cela quand la page est ouverte en double-cliquant (`file://`). Il faut la servir en HTTP. Au choix, dans le dossier du projet :

```bash
npx serve          # puis ouvre l'adresse affichée (ex. http://localhost:3000)
# ou
python3 -m http.server   # puis ouvre http://localhost:8000
```

> Autre option : l'extension **Live Server** de VS Code. Prends l'habitude de lancer le serveur dès maintenant.

## 🏆 Défi

Dans la console, récupère le Pokémon numéro `25` et affiche son nom et son `hp` : `donnees.stats[0].base_stat`. Qui est-ce ?

➡️ Suite : [02 – Gengar depuis l'API](./02-monstre-depuis-api.md)
