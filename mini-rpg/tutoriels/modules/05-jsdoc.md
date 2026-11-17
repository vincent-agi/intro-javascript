# 05 – Documenter avec JSDoc

🎯 **À la fin de cette étape** : quand tu passes la souris sur une fonction ou une classe, ton éditeur t'explique ce qu'elle fait et ce qu'elle attend. Dans certains fichiers, il **te prévient même d'une erreur avant que tu lances le jeu**.

## Le problème : le code « avant JSDoc »

Dans `personnages.js`, le Mage crée ses sorts :

```javascript
new Sort("Éclair", "⚡", 10, 12, 18)
```

Sans retourner voir la classe `Sort`, réponds :

- `10`, c'est le coût, les dégâts ou le niveau ?
- `12` et `18`, c'est quoi ? Et dans quel ordre ?
- y a-t-il un sixième paramètre possible ?

Tu dois ouvrir `sorts.js` et lire le constructeur. Maintenant, imagine **un camarade** qui découvre ton projet, ou **toi dans trois mois**. Et imagine que tu écrives par erreur :

```javascript
new Sort("Éclair", "⚡", "10", 12, 18)   // "10" est un texte, pas un nombre !
```

Rien ne te prévient. Le jeu se lance. Le bug n'apparaît qu'en plein combat, quand `this.mana -= sort.cout` donne un résultat bizarre. Va trouver d'où ça vient…

Voici ce que montre ton éditeur (VS Code) quand tu passes la souris sur `Sort`, **avant** JSDoc :

```
constructor Sort(nom: any, emoji: any, cout: any, effetMin: any, effetMax: any, son?: string): Sort
```

`any` veut dire « n'importe quoi » : l'éditeur ne sait rien.

## La solution : le code « après JSDoc »

**JSDoc** est une façon d'écrire des commentaires, entre `/**` et `*/`, que les **éditeurs savent lire**. On y décrit chaque paramètre : son **type** entre `{ }`, son **nom**, et à quoi il sert.

```javascript
/**
 * Un sort d'attaque : il coûte du mana et blesse la cible.
 */
export class Sort {
    /**
     * @param {string} nom - le nom affiché (ex. "Éclair")
     * @param {string} emoji - l'emoji affiché devant le nom (ex. "⚡")
     * @param {number} cout - le mana dépensé pour le lancer
     * @param {number} effetMin - l'effet minimum (dégâts ou soin)
     * @param {number} effetMax - l'effet maximum (dégâts ou soin)
     * @param {string} [son="magie"] - le nom du son à jouer (une clé de FICHIERS_SONS)
     * @example new Sort("Éclair", "⚡", 10, 12, 18)
     */
    constructor(nom, emoji, cout, effetMin, effetMax, son = "magie") {
```

Maintenant, passe la souris sur `new Sort(` dans `personnages.js` : l'éditeur affiche la description, et le rôle de **chaque** paramètre, au moment même où tu l'écris.

| | Avant JSDoc | Après JSDoc |
| --- | --- | --- |
| Savoir ce qu'attend une fonction | ouvrir son fichier et lire son code | passer la souris dessus |
| Ordre des paramètres | à deviner, ou à aller vérifier | affiché pendant qu'on tape |
| Erreur de type (`"10"` au lieu de `10`) | découverte en jouant… peut-être | soulignée en rouge **avant** de lancer le jeu (avec `@ts-check`) |
| Un camarade découvre le projet | il lit tout le code | il lit les descriptions |
| Le code change | le commentaire `//` peut devenir faux sans que personne le voie | l'éditeur signale les incohérences de type |

## Les mots-clés à connaître

| Mot-clé | Sert à | Exemple |
| --- | --- | --- |
| *(texte libre)* | dire ce que fait la fonction ou la classe | `Tire un nombre entier au hasard.` |
| `@param {type} nom - rôle` | décrire un paramètre | `@param {number} min - le plus petit résultat` |
| `@param {type} [nom=valeur]` | un paramètre **facultatif**, avec sa valeur par défaut | `@param {string} [sprite=""]` |
| `@returns {type} description` | décrire ce que renvoie la fonction | `@returns {boolean}` |
| `@throws {Error} quand` | prévenir qu'une erreur peut être lancée | `@throws {Error} si le serveur répond 404` |
| `@example` | montrer un exemple d'utilisation | `@example nombreAuHasard(1, 6)` |
| `@type {type}` | donner le type d'une variable | `@type {Object<string, string>}` |
| `@typedef` | décrire la forme d'un objet (par exemple le contenu d'un JSON) | voir `carte.js` |

Les types les plus courants : `{number}`, `{string}`, `{boolean}`, `{string[]}` (un tableau de textes), `{Promise<Monstre>}` (ce que renvoie une fonction `async`), `{Monstre}` (un objet d'une de tes classes), `{number|string}` (l'un **ou** l'autre).

## Le code

**1.** Commence par `outils.js`. Remplace les commentaires `//` par de la JSDoc :

```javascript
/**
 * Tire un nombre entier au hasard entre min et max (inclus).
 * @param {number} min - le plus petit résultat possible
 * @param {number} max - le plus grand résultat possible
 * @returns {number} un entier entre min et max
 * @example nombreAuHasard(1, 6); // un lancer de dé
 */
export function nombreAuHasard(min, max) {
```

```javascript
/**
 * Met le programme en pause. À utiliser avec await.
 * @param {number} ms - la durée de la pause, en millisecondes
 * @returns {Promise<void>}
 * @example await attendre(800); // pause de 0,8 seconde
 */
export function attendre(ms) {
```

```javascript
/**
 * Télécharge une adresse et renvoie son contenu JSON, transformé en objet.
 * @param {string} url - l'adresse (une API ou un fichier du projet)
 * @returns {Promise<any>} les données
 * @throws {Error} si le serveur répond par une erreur (404, 500...)
 */
export async function chargerJson(url) {
```

Passe la souris sur `nombreAuHasard` dans `sorts.js` : la description apparaît, **même dans un autre fichier**. L'`import` relie aussi la documentation.

**2.** Documente `Sort` (le code est plus haut) et `SortDeSoin` dans `sorts.js`.

**3.** Un exemple plus riche : la forme de `map.json`. Dans `carte.js`, une `@typedef` décrit un objet **qui vient d'un fichier**, que JavaScript ne connaît pas à l'avance :

```javascript
/**
 * Le contenu de map.json.
 * @typedef {Object} DonneesCarte
 * @property {number} tailleTile - la taille d'une tuile, en pixels
 * @property {Object<string, string>} legende - symbole -> type de tuile (ex. "H" -> "herbe")
 * @property {string[]} obstacles - les types de tuile infranchissables
 * @property {{x: number, y: number}} depart - la case de départ du héros
 * @property {string[]} lignes - la carte, une ligne de symboles par rangée
 */

/**
 * La carte : une grille de tuiles décrite par map.json.
 */
export class Carte {
    /**
     * @param {DonneesCarte} donnees - le contenu de map.json
     * @param {HTMLElement} conteneur - l'élément de la page où dessiner la carte
     */
    constructor(donnees, conteneur) {
```

Dans le constructeur, tape `donnees.` : l'éditeur **propose** `tailleTile`, `legende`, `obstacles`… C'est l'**autocomplétion**.

**4.** Continue avec les autres fichiers. Pas besoin de tout documenter : commence par les **classes**, leurs **constructeurs**, et les méthodes **appelées depuis un autre fichier** (`sons.jouer`, `combat.demarrer`, `mage.lancerSort`…). Le [code final](./js/) te montre un exemple complet.

> Pour désigner une classe d'un autre fichier **sans l'importer** (juste pour la documentation), on écrit son chemin : `@param {import("./sons.js").Sons} sons`.

**5.** Le bonus qui change tout : `@ts-check`. Tout en haut de `sorts.js`, `personnages.js`, `monstre.js` et `outils.js`, ajoute :

```javascript
// @ts-check
```

Ce commentaire demande à VS Code de **vérifier** que le code respecte les types annoncés par la JSDoc. Teste-le : dans le constructeur du `Mage`, remplace `10` par `"10"` :

```javascript
new Sort("Éclair", "⚡", "10", 12, 18)
```

`"10"` est souligné en rouge, **sans même lancer le jeu** :

```
Argument of type 'string' is not assignable to parameter of type 'number'.
```

Remets `10`. Voilà concrètement le problème que résout JSDoc : **les erreurs sont trouvées en écrivant, pas en jouant**.

> Pourquoi pas `@ts-check` partout ? Dans `combat.js` ou `sons.js`, qui manipulent beaucoup la page HTML, l'éditeur signalerait des dizaines de petites remarques qui demandent plus de JSDoc pour disparaître. Commence par les fichiers « purs » (sans HTML), c'est déjà une grande aide.

## Vérifier

1. Le jeu marche exactement comme avant : JSDoc, ce ne sont **que** des commentaires, le navigateur les ignore.
2. Dans VS Code, passe la souris sur `new Sort(`, `nombreAuHasard(`, `sons.jouer(` et `Monstre.depuisApi(` : chaque fois, une description claire apparaît.
3. Avec `// @ts-check` en haut de `personnages.js`, l'erreur `"10"` est bien signalée.

### Ce qu'il faut retenir

- **Avant JSDoc** : pour savoir comment utiliser une fonction, il faut lire son code. Les erreurs de type se découvrent en jouant.
- **Après JSDoc** : l'éditeur **explique** chaque fonction, **complète** ce que tu tapes, et avec `@ts-check`, **signale** les erreurs avant l'exécution.
- JSDoc décrit le **quoi** (que fait la fonction, qu'attend-elle). Les commentaires `//` à l'intérieur gardent le **pourquoi** d'une ligne précise.
- Documente d'abord ce qui sert **ailleurs** : les classes, les constructeurs, les méthodes publiques.

## 🏆 Défi

Ajoute `// @ts-check` en haut de `journal.js`, puis documente `ajouter(texte)` avec `@param {string} texte`. Dans `combat.js`, essaie d'écrire `this.journal.ajouter(42)` et passe la souris dessus : que t'apprend l'éditeur ?

➡️ Suite : [06 – Bilan et code final](./06-bilan-code-final.md)
