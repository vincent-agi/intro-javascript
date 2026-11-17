# 02 – Les bases du langage

Ce sont les briques de **tout** programme, dans **tous** les langages. Tu les utilises à chaque ligne sans même y penser : c'est le signe que tu les maîtrises.

## Les variables : retenir une information

**En une phrase** : une variable est une **boîte avec un nom**, qui garde une valeur pour plus tard.

```javascript
const PV_MAX_JOUEUR = 100;   // const : la valeur ne change jamais
let pvJoueur = PV_MAX_JOUEUR; // let : la valeur va changer pendant le jeu
let jeuEnCours = true;        // true / false : un booléen
```

- `const` quand la valeur ne bouge pas, `let` quand elle change ;
- les valeurs ont un **type** : nombre (`100`), texte (`"Gengar"`), booléen (`true` / `false`)…
- l'ensemble des variables à un instant donné, c'est l'**état** du jeu.

📍 Vu dans : [Bases 02 – Variables et état](../02-variables-et-etat.md)

## Les fonctions : donner un nom à une action

**En une phrase** : une fonction **regroupe des instructions** sous un nom, pour les lancer quand on veut, autant de fois qu'on veut.

```javascript
// Renvoie un entier au hasard entre min et max (inclus)
function nombreAuHasard(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const degats = nombreAuHasard(10, 20); // on l'appelle avec deux valeurs
```

- les **paramètres** (`min`, `max`) sont les « entrées » de la fonction ;
- `return` renvoie le **résultat** ;
- `nombreAuHasard` a été écrite dans les bases… et elle sert **encore** dans le jeu final (`js/outils.js`). Une bonne fonction se réutilise longtemps.

📍 Vu dans : [Bases 03 – Les fonctions](../03-fonctions-actions.md)

## Les conditions : prendre une décision

**En une phrase** : `if` / `else if` / `else` exécute un morceau de code **seulement si** une condition est vraie.

```javascript
if (pvMonstre <= 0) {
    ajouterEvenement("🎉 Victoire ! Le monstre est vaincu !");
    jeuEnCours = false;
} else if (pvJoueur <= 0) {
    ajouterEvenement("💀 Défaite... Le héros est à terre.");
    jeuEnCours = false;
}
```

- comparaisons : `===` (égal), `!==` (différent), `<`, `<=`, `>`, `>=` ;
- combinaisons : `&&` (et), `||` (ou), `!` (non) ;
- la **condition courte** `condition ? a : b` choisit entre deux valeurs : `sons.muet ? "🔇" : "🔊"`.

📍 Vu dans : [Bases 04 – Les conditions](../04-conditions-et-fin.md), et partout ensuite

## Les tableaux et les boucles : gérer une liste

**En une phrase** : un tableau **range plusieurs valeurs dans l'ordre** ; une boucle **répète** une action pour chacune.

```javascript
const historique = [];          // un tableau vide
historique.push("⚔️ Tu infliges 15 dégâts !"); // on ajoute à la fin

for (let i = debut; i < historique.length; i++) { // i = 0, 1, 2...
    const ligne = document.createElement("li");
    ligne.textContent = historique[i];   // l'élément numéro i
    journal.appendChild(ligne);
}
```

Tu connais trois sortes de boucles :

| Boucle | Elle parcourt… | Exemple dans ton jeu |
| --- | --- | --- |
| `for (let i = 0; i < n; i++)` | des **numéros** | les lignes du journal, les cases de la carte |
| `for (const sort of this.heros.sorts)` | les **éléments** d'un tableau | un bouton par sort (`magie`) |
| `for (const nom in this.fichiers)` | les **noms** (clés) d'un objet | un `Audio` par son (`son`) |

Et des outils de tableau tout prêts : `.push()` (ajouter), `.length` (taille), `.includes()` (contient ?), `.find()` (chercher), `.map()` (transformer), `.join(", ")` (coller en un texte), `.split("")` (découper un texte).

📍 Vu dans : [Bases 05 – Tableau et boucle](../05-tableau-historique-boucle.md), [API 04 – La carte](../api/04-carte.md) (`split`, `map`)

## Les objets : regrouper des informations

**En une phrase** : un objet range des valeurs sous des **noms** : c'est un **dictionnaire**.

```javascript
// Pour chaque touche : [déplacement en x, déplacement en y]
const directions = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0]
};
const direction = directions[evenement.key]; // ex. directions["ArrowUp"]
```

- un objet remplace une longue série de `if` : « pour cette touche, ce déplacement » ;
- le JSON (`map.json`, les fiches PokeAPI) n'est **rien d'autre** qu'un objet écrit dans un fichier ;
- `?.` lit une valeur **sans planter** si elle n'existe pas : `this.tuiles[y]?.[x]`.

📍 Vu dans : [API 05 – Déplacements et collisions](../api/05-deplacement-collisions.md)

## La page web (le DOM) : lire et modifier l'affichage

**En une phrase** : JavaScript **attrape** les éléments de la page HTML et **change** leur contenu, leur style ou leur présence.

```javascript
const message = document.getElementById("message"); // attraper
message.textContent = "🎉 Victoire !";             // changer le texte
barreJoueur.style.width = "50%";                     // changer le style
boutonAttaque.disabled = true;                       // désactiver
ecranCombat.hidden = false;                          // montrer / cacher
zone.classList.add("vaincu");                        // ajouter une classe CSS

const ligne = document.createElement("li");          // créer
journal.appendChild(ligne);                          // ajouter à la page
chiffre.remove();                                    // retirer
```

- HTML = la **structure**, CSS = l'**apparence**, JavaScript = le **comportement** ;
- changer une **classe** et laisser le CSS dessiner, c'est souvent plus propre que de changer le style à la main.

📍 Vu dans : [Bases 02](../02-variables-et-etat.md), et dans toutes les étapes

## Les événements : réagir au joueur

**En une phrase** : `addEventListener` dit « **quand** il se passe ceci, **lance** cette fonction ».

```javascript
boutonAttaque.addEventListener("click", attaquer);   // un clic sur un bouton

document.addEventListener("keydown", (evenement) => this.toucheAppuyee(evenement)); // une touche
```

- le programme ne « tourne » pas en boucle : il **attend** des événements, et y répond ;
- `(evenement) => ...` est une **fonction fléchée** : une petite fonction écrite en une ligne.

📍 Vu dans : [Bases 03](../03-fonctions-actions.md), [API 05 – le clavier](../api/05-deplacement-collisions.md)

## Le hasard

**En une phrase** : `Math.random()` donne un nombre entre `0` et `1`, ce qui rend chaque partie différente.

```javascript
if (this.carte.typeEn(x, y) === "herbe" && Math.random() < 0.25) { // 1 chance sur 4
    this.surRencontre();
}
```

📍 Vu dans : [Bases 03](../03-fonctions-actions.md), [API 06 – les rencontres](../api/06-rencontres.md)

## 🧠 Prendre du recul

Avec **seulement** ces briques (variables, fonctions, conditions, boucles, tableaux, objets, page web, événements), tu as écrit un vrai jeu dès le premier tutoriel. Tout ce qui a suivi (classes, modules, API…) n'a fait que **ranger** et **combiner** ces briques de façon plus intelligente.

> Ces briques existent dans **tous** les langages : Python, Java, C#, PHP… Les mots changent un peu, les idées restent les mêmes. Tu as appris bien plus que du JavaScript.

➡️ Suite : [03 – La programmation orientée objet](./03-poo.md)
