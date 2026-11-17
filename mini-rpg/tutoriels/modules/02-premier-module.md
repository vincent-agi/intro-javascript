# 02 – Ton premier module

🎯 **À la fin de cette étape** : les trois petits outils (`nombreAuHasard`, `attendre`, `chargerJson`) vivent dans leur propre fichier, `js/outils.js`. Le jeu marche exactement comme avant.

## Le concept

Un **module**, c'est un fichier JavaScript qui **choisit** ce qu'il partage avec les autres :

```javascript
// outils.js : je partage cette fonction
export function nombreAuHasard(min, max) { ... }
```

```javascript
// app.js : j'utilise la fonction partagée par outils.js
import { nombreAuHasard } from "./outils.js";
```

- `export` : « ce nom peut être utilisé par les autres fichiers » ;
- `import { ... } from "./fichier.js"` : « je veux utiliser ce nom, qui vient de ce fichier » ;
- tout ce qui n'est **pas** exporté reste **privé** au fichier : personne d'autre ne peut y toucher.

Pour que le navigateur comprenne `import` et `export`, la page doit charger le script comme un **module** :

```html
<script type="module" src="js/app.js"></script>
```

## Le code

**1.** Crée un dossier `js/` et **déplace** `app.js` dedans. Dans `index.html`, remplace la ligne du script :

```html
<script type="module" src="js/app.js"></script>
```

Recharge : le jeu marche toujours. (Les adresses `map.json` et `sons/...` sont lues **depuis la page**, pas depuis le fichier JavaScript : elles ne changent pas.)

**2.** Crée `js/outils.js`. **Coupe** (`Ctrl + X`) les trois fonctions du haut d'`app.js` et colle-les ici, en ajoutant `export` devant chacune :

```javascript
// Petits outils utilisés un peu partout dans le jeu

// Renvoie un entier au hasard entre min et max (inclus)
export function nombreAuHasard(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Met le programme en pause pendant "ms" millisecondes (à utiliser avec await)
export function attendre(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Charge une adresse et renvoie son contenu JSON
export async function chargerJson(url) {
    const reponse = await fetch(url);
    if (!reponse.ok) {  // 404, 500... : fetch ne plante pas tout seul !
        throw new Error("Erreur " + reponse.status + " pour " + url);
    }
    return reponse.json();
}
```

**3.** Recharge le jeu **maintenant**, avant la suite, ouvre la console (`F12`) et choisis un héros. Une erreur rouge apparaît :

```
Uncaught (in promise) ReferenceError: chargerJson is not defined
```

C'est normal, et c'est **instructif** : `app.js` utilise `chargerJson` (pour charger la carte), mais ne sait pas où la trouver. Avec les modules, **rien n'est partagé sans le dire**.

**4.** Tout en haut de `js/app.js`, importe les trois outils :

```javascript
import { nombreAuHasard, attendre, chargerJson } from "./outils.js";
```

Ici, `./` veut dire « dans le **même dossier** que ce fichier » : `app.js` et `outils.js` sont tous les deux dans `js/`.

## Vérifier

1. Recharge : plus d'erreur, le jeu marche comme avant. Fais une partie complète.
2. Ouvre l'onglet **Réseau** (`F12` → *Network*) et recharge : tu vois `app.js` **puis** `outils.js`. Le navigateur a lu l'`import` et est allé chercher le fichier tout seul.
3. Dans la console, tape `nombreAuHasard(1, 6)` : `ReferenceError` ! Dans un module, les noms ne sont plus **globaux**. Ils n'existent que là où on les importe. C'est voulu : plus de risque qu'un fichier écrase par erreur la variable d'un autre.

> 🆘 Bloqué ? Compare avec le [projet complet de l'étape 02](./etapes/etape-02/).

### Ce qu'il faut retenir

- `export` partage un nom ; `import { nom } from "./fichier.js"` l'utilise.
- `<script type="module">` est obligatoire pour utiliser `import`, et il faut un **serveur**.
- Un module est **fermé** par défaut : ses noms ne sont visibles que s'il les exporte, et seulement là où on les importe.
- Une erreur `is not defined` après un déplacement veut presque toujours dire : **il manque un `import`**.

## 🏆 Défi

Retire `attendre` de la ligne `import` d'`app.js`, recharge et déclenche une rencontre. L'erreur n'apparaît qu'**au moment** de la rencontre, pas au chargement. Pourquoi ? (Indice : quand la fonction `attendre` est-elle appelée ?) Remets-la ensuite.

➡️ Suite : [03 – Les combattants et la magie](./03-combattants.md)
