# Niveau 4 – Les tableaux : le sac du héros

## Le concept : un tableau, c'est un sac à cases numérotées

```javascript
const inventaire = ["🧪 Potion", "🗡️ Épée", "🛡️ Bouclier"];
```

```text
  case n°     0             1            2
          ┌───────────┬────────────┬─────────────┐
          │ 🧪 Potion │ 🗡️ Épée    │ 🛡️ Bouclier │
          └───────────┴────────────┴─────────────┘
  inventaire.length  →  3   (il y a 3 objets)
```

| Je veux… | J'écris… | Résultat |
| --- | --- | --- |
| l'objet de la case 0 | `inventaire[0]` | `"🧪 Potion"` |
| le **nombre** d'objets | `inventaire.length` | `3` |
| le **dernier** objet | `inventaire[inventaire.length - 1]` | `"🛡️ Bouclier"` |
| ajouter un objet **à la fin** | `inventaire.push("🔑 Clé");` | le sac a maintenant 4 objets |

⚠️ Les deux pièges :

- on compte les cases **à partir de 0** : avec 3 objets, la dernière case est la n°**2** ;
- `.length` s'écrit **sans parenthèses** (ce n'est pas une fonction), alors que `.push(...)` **en a** (c'est une fonction).

---

## Exercice 13 – L'inventaire 🎒

⏱️ 10 min · 🧩 Code à trous · Fichier : `atelier/exercices/ex13.js`

### 🎯 Énoncé

Complète les **4 trous**.

### 📝 Le code de départ

```javascript
const inventaire = ["🧪 Potion", "🗡️ Épée", "🛡️ Bouclier"];

// 1. Le PREMIER objet du sac
const premier = inventaire[___];

// 2. Le NOMBRE d'objets dans le sac (sans compter à la main !)
const nombreObjets = inventaire.___;

// 3. Le DERNIER objet, en utilisant nombreObjets (pas le chiffre 2 directement)
const dernier = inventaire[___];

// 4. Ajoute "🔑 Clé" à la fin du sac
inventaire.___("🔑 Clé");
```

### ✅ C'est réussi quand…

Les 5 vérifications sont vertes **et** le trou n°3 utilise `nombreObjets` (le formateur vérifiera !).

### 🆘 Indices

<details>
<summary>Indice 1 – Le dernier objet</summary>

Il y a 3 objets, numérotés 0, 1, 2. Le numéro du dernier, c'est donc « le nombre d'objets **moins 1** ». Écris-le avec `nombreObjets`.
</details>

<details>
<summary>Indice 2 – Pourquoi ne pas écrire 2 directement ?</summary>

Parce que si le sac change (on ajoute une clé), le dernier objet n'est plus dans la case 2. Avec `length - 1`, ça marche **toujours**.
</details>

---

## Exercice 14 – Parcourir l'inventaire 📜

⏱️ 20 min · 🧩 Trous puis ✍️ production · Fichier : `atelier/exercices/ex14.js`

### 🎯 Énoncé

**Partie 1 (4 trous).** Affiche tout le sac, avec un numéro devant chaque objet :

```text
1. 🧪 Potion
2. 🗡️ Épée
3. 🛡️ Bouclier
4. 🧪 Potion
5. 🔑 Clé
```

```javascript
const inventaire = ["🧪 Potion", "🗡️ Épée", "🛡️ Bouclier", "🧪 Potion", "🔑 Clé"];

let lignesAffichees = 0;
for (let i = ___; i ___ inventaire.___; i++) {
    console.log((i + 1) + ". " + inventaire[___]);
    lignesAffichees = lignesAffichees + 1;
}
```

**Partie 2 (sans trou).** Compte les potions : écris une boucle qui passe sur **chaque case** du sac. Si la case vaut `"🧪 Potion"`, ajoute 1 à `nbPotions`.

```javascript
let nbPotions = 0;

// ✏️ Ta boucle ici

console.log("Potions dans le sac : " + nbPotions);
```

### ✅ C'est réussi quand…

Les 2 vérifications sont vertes.

### 🆘 Indices

<details>
<summary>Indice 1 – La boucle « qui passe sur chaque case »</summary>

C'est **la** boucle des tableaux, à connaître par cœur (elle est dans l'aide-mémoire) :

```javascript
for (let i = 0; i < inventaire.length; i++) {
    // inventaire[i] = l'objet de la case n°i
}
```

Les cases vont de 0 à `length - 1` : on part de 0 et on utilise `<` (pas `<=`).
</details>

<details>
<summary>Indice 2 – Pourquoi (i + 1) dans l'affichage ?</summary>

Les cases commencent à 0, mais un humain compte à partir de 1. On **affiche** `i + 1`, mais on **lit** la case `i`.
</details>

<details>
<summary>Indice 3 – Partie 2 : un if dans la boucle</summary>

Dans le bloc de la boucle, mets un `if`. La condition compare `inventaire[i]` et `"🧪 Potion"` avec `===`.
</details>

---

## Exercice 15 – Le plus gros coup 💥

⏱️ 25 min · 🧩 Trous puis ✍️ production · Fichier : `atelier/exercices/ex15.js`

### 🎯 Énoncé

Le tableau `coups` contient les dégâts de chaque coup du combat : `[12, 7, 19, 4, 15]`.

**Partie 1 (2 trous).** La fonction `totalDegats(liste)` rend la **somme** de toutes les cases.

```javascript
function totalDegats(liste) {
    let total = 0;
    for (let i = 0; i < liste.length; i++) {
        total = total + ___;
    }
    return ___;
}
```

**Partie 2 (sans trou).** La fonction `plusGrosCoup(liste)` rend le **plus grand** nombre du tableau. L'idée : on garde un **record**.

- on part de la première case : `let record = liste[0];` (déjà écrit) ;
- on regarde chaque case : **si** elle est plus grande que le record, elle **devient** le record ;
- à la fin, on rend le record (déjà écrit).

**Partie 3 (1 trou).** `Math.max` fait la même chose avec des **nombres séparés par des virgules** : `Math.max(4, 9, 2)` rend `9`. Complète pour obtenir le plus grand entre 12, 7 et 19.

```javascript
const plusGrand = Math.max(___);
```

### ✅ C'est réussi quand…

Les 6 vérifications sont vertes.

### 🆘 Indices

<details>
<summary>Indice 1 – Partie 1</summary>

À chaque tour, on ajoute **la case n°i** du tableau. Comment écrit-on « la case n°i de `liste` » ?
</details>

<details>
<summary>Indice 2 – Partie 2 : le record, à la main</summary>

Avec `[12, 7, 19, 4, 15]` : record = 12. Case 7 : plus grande que 12 ? Non. Case 19 : oui → record = 19. Case 4 : non. Case 15 : non. Résultat : 19.

En code, le cœur de la boucle est :

```javascript
if (liste[i] > record) {
    record = ...;
}
```
</details>

<details>
<summary>Indice 3 – Partie 3</summary>

Entre les parenthèses de `Math.max`, écris les trois nombres, séparés par des virgules. Pas de crochets `[ ]`.
</details>

➡️ Suite : [Niveau 5 – La page (DOM)](./5-dom.md)
