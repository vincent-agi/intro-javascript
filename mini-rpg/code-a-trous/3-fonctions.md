# Niveau 3 – Les fonctions : des machines qui calculent pour toi

## Le concept : une fonction, c'est une machine

Imagine une **forge** dans le jeu. Tu lui donnes du **métal** et du **charbon**, elle te rend une **épée**.

```text
         ENTRÉES                 LA MACHINE                SORTIE
  (les paramètres)                                       (le return)

   force = 10   ─┐        ┌──────────────────┐
                 ├──────► │  calculerDegats  │ ──────►   15
   bonus = 5    ─┘        └──────────────────┘
```

En JavaScript :

```javascript
//        le nom          les entrées (paramètres)
function calculerDegats(force, bonus) {
    const total = force + bonus;   // ce que fait la machine
    return total;                  // la sortie : ce que la machine REND
}

const coup = calculerDegats(10, 5); // on utilise la machine → coup vaut 15
```

Il y a **deux moments** bien différents :

| Moment | À quoi ça ressemble | Ce qui se passe |
| --- | --- | --- |
| **1. Fabriquer** la machine | `function calculerDegats(force, bonus) { ... }` | Rien ne s'affiche, rien ne se calcule. On **range** la machine. |
| **2. Utiliser** la machine (l'appel) | `calculerDegats(10, 5)` | `force` prend la valeur `10`, `bonus` prend `5`, le code s'exécute, le `return` **rend** le résultat. |

Trois règles à retenir :

- les **paramètres** (`force`, `bonus`) sont des variables qui reçoivent les valeurs données à l'appel, **dans l'ordre** ;
- `return` **rend** une valeur ; sans `return`, la machine rend `undefined` (« rien ») ;
- le résultat, il faut le **ranger** quelque part : `const coup = calculerDegats(10, 5);`.

---

## Exercice 08 – Démonte la fonction 🔬

⏱️ 15 min · 🧠 Lecture et prédiction · Fichier : `atelier/exercices/ex08.js`

### 🎯 Énoncé

Lis ce code **sans le lancer** et réponds aux questions **sur papier**.

```javascript
function calculerDegats(force, bonus) {
    const total = force + bonus;
    return total;
}

const coup1 = calculerDegats(10, 5);
const coup2 = calculerDegats(7, 0);

console.log("Coup 1 : " + coup1);
console.log("Coup 2 : " + coup2);
```

**Étape 1 – Repère les morceaux**

1. Quel est le **nom** de la fonction ?
2. Quels sont ses **paramètres** ?
3. Quelle variable est **rendue** par `return` ?
4. Combien de fois la fonction est-elle **appelée** ?

**Étape 2 – Joue l'ordinateur**

5. Au premier appel, que valent `force`, `bonus` et `total` ?
6. Au deuxième appel, que valent `force`, `bonus` et `total` ?
7. Qu'est-ce qui va s'afficher à l'écran ? (Lance l'atelier pour vérifier.)

**Étape 3 – Utilise la machine**

8. Dans le fichier, crée une variable `coup3` qui vaut le résultat de `calculerDegats` avec une force de `20` et un bonus de `3`. Affiche-la avec `console.log`, comme les deux autres.

**Étape 4 – L'expérience** 🧪

9. Mets `//` devant la ligne `return total;` pour la désactiver. Recharge. Qu'est-ce qui s'affiche à la place des nombres ? Pourquoi ? **Remets ensuite la ligne.**

### ✅ C'est réussi quand…

Les 2 vérifications sont vertes et tu sais expliquer avec tes mots à quoi sert `return`.

### 🆘 Indices

<details>
<summary>Indice 1 – Questions 5 et 6</summary>

Les valeurs entre parenthèses de l'appel vont dans les paramètres, **dans l'ordre** : la 1re valeur dans le 1er paramètre, la 2e dans le 2e.
</details>

<details>
<summary>Indice 2 – Étape 3</summary>

Regarde la ligne `const coup1 = ...` : c'est exactement le modèle. Change le nom de la variable et les deux nombres.
</details>

---

## Exercice 09 – Fonction à trous : `infligerDegats` ⚔️

⏱️ 10 min · 🧩 Code à trous · Fichier : `atelier/exercices/ex09.js`

### 🎯 Énoncé

La fonction `infligerDegats` **reçoit** les PV d'un combattant et les dégâts qu'il prend. Elle **rend** les PV qui restent, sans jamais descendre sous 0. Complète les **4 trous**.

### 📝 Le code de départ

```javascript
function infligerDegats(___, ___) {
    const reste = pv - degats;
    ___ Math.max(0, reste);
}

let pvMonstre = 80;
pvMonstre = infligerDegats(pvMonstre, ___);   // le héros frappe de 25
console.log("👹 Le monstre a " + pvMonstre + " PV");
```

> 💡 **`Math.max(0, reste)`** rend le **plus grand** des deux nombres.
> `Math.max(0, 70)` → `70`. `Math.max(0, -30)` → `0`. Résultat : on ne descend jamais sous 0.

### ✅ C'est réussi quand…

Les 3 vérifications sont vertes.

### 🆘 Indices

<details>
<summary>Indice 1 – Les paramètres</summary>

Regarde la ligne `const reste = pv - degats;` : elle utilise deux noms. Ce sont eux, les paramètres. L'ordre compte : relis l'énoncé (« les PV… et les dégâts »).
</details>

<details>
<summary>Indice 2 – Le 3e trou</summary>

C'est le mot qui veut dire « rends ce résultat ».
</details>

<details>
<summary>Indice 3 – Le dernier trou</summary>

C'est la valeur des dégâts : regarde le commentaire au bout de la ligne.
</details>

---

## Exercice 10 – Fonction à trous : `soigner` 💚

⏱️ 10 min · 🧩 Code à trous · Fichier : `atelier/exercices/ex10.js`

### 🎯 Énoncé

La fonction `soigner` **reçoit** les PV du héros et la quantité de soin. Elle **rend** les nouveaux PV, sans jamais dépasser `PV_MAX`. Complète les **4 trous**.

### 📝 Le code de départ

```javascript
const PV_MAX = 100;

function soigner(pv, soin) {
    const total = ___ + ___;
    return Math.___(PV_MAX, total);
}

let pvHeros = 50;
pvHeros = ___(pvHeros, 30);   // le héros boit une potion de 30
console.log("🧙 Le héros a " + pvHeros + " PV");
```

### ✅ C'est réussi quand…

Les 3 vérifications sont vertes. `soigner(90, 30)` doit rendre **100**, pas 120.

### 🆘 Indices

<details>
<summary>Indice 1 – max ou min ?</summary>

On veut **ne pas dépasser** 100. Entre 100 et 120, on garde lequel ? Le plus **grand** ou le plus **petit** ? (`max` = le plus grand, `min` = le plus petit.)
</details>

<details>
<summary>Indice 2 – Le dernier trou</summary>

Pour **utiliser** une machine, on écrit son **nom** suivi des parenthèses avec les valeurs. Quel est le nom de la machine ici ?
</details>

---

## Exercice 11 – Fonctions guidées : `estVivant` et `etatDuHeros` 🧙

⏱️ 25 min · ✍️ Production guidée · Fichier : `atelier/exercices/ex11.js`

### 🎯 Énoncé

Cette fois, tu écris les fonctions **en entier**. Pars toujours du gabarit :

```javascript
function nomDeLaFonction(parametre) {
    return resultat;
}
```

**Fonction 1 – `estVivant(pv)`** : rend `true` si `pv` est plus grand que 0, sinon `false`.

**Fonction 2 – `etatDuHeros(pv)`** : rend un texte selon les PV :

| `pv` | rend |
| --- | --- |
| 70 ou plus | `"💪 En forme"` |
| 30 ou plus | `"🤕 Blessé"` |
| plus que 0 | `"🆘 En danger"` |
| sinon | `"💀 KO"` |

> 🔁 Tu as déjà écrit ce `if / else if / else` dans l'exercice 02 ! La différence : au lieu de ranger le texte dans `etat`, tu le **rends** avec `return`.
> Et regarde : avec une fonction, on teste **8 cas d'un coup**, sans changer la valeur à la main.

### ✅ C'est réussi quand…

Les 8 vérifications sont vertes. Attention aux **bornes** : 70 PV, c'est « En forme » ; 30 PV, c'est « Blessé ».

### 🆘 Indices

<details>
<summary>Indice 1 – estVivant : une seule ligne suffit</summary>

Une comparaison comme `pv > 0` **vaut déjà** `true` ou `false`. Tu peux donc la rendre directement : `return pv > 0;`. (Un `if / else` avec deux `return` marche aussi.)
</details>

<details>
<summary>Indice 2 – etatDuHeros : la structure</summary>

```javascript
function etatDuHeros(pv) {
    if (...) {
        return "💪 En forme";
    } else if (...) {
        ...
    }
    ...
}
```

Dans les conditions, utilise `pv` (le paramètre), pas `pvHeros`.
</details>

<details>
<summary>Indice 3 – 70 donne « Blessé » ?</summary>

Tu as écrit `>` au lieu de `>=`. « 70 ou plus » = `>= 70`.
</details>

---

## Exercice 12 – Fonction + boucle : la rafale 🌪️

⏱️ 20 min · ✍️ Production guidée · Fichier : `atelier/exercices/ex12.js`

### 🎯 Énoncé

La fonction `rafale(nbCoups, degatsParCoup)` fait frapper le héros plusieurs fois d'affilée :

- elle **affiche** chaque coup : `⚔️ Coup 1 : 10 dégâts` ;
- elle **rend** le total des dégâts.

Exemple : `rafale(3, 10)` affiche 3 lignes et rend `30`.

### 📝 Le code de départ

```javascript
function rafale(nbCoups, degatsParCoup) {
    let total = 0;

    // ✏️ Étape 1 : une boucle for qui fait nbCoups tours (de 1 à nbCoups)
    // ✏️ Étape 2 : DANS la boucle, ajoute degatsParCoup à total
    // ✏️ Étape 3 : DANS la boucle, affiche le coup avec console.log

    // ✏️ Étape 4 : APRÈS la boucle, renvoie total

}

const totalRafale = rafale(3, 10);
console.log("Total de la rafale : " + totalRafale);
```

Fais les étapes **une par une** : écris l'étape 1 avec un bloc vide, enregistre, recharge. Pas d'erreur ? Passe à l'étape 2.

### ✅ C'est réussi quand…

Les 3 vérifications sont vertes. *(Les vérifications appellent `rafale` à nouveau : c'est normal de voir d'autres coups s'afficher.)*

### 🆘 Indices

<details>
<summary>Indice 1 – La boucle</summary>

Le nombre de tours n'est pas un chiffre fixe : c'est le paramètre `nbCoups`. Tu peux l'écrire directement dans la condition : `coup <= nbCoups`.
</details>

<details>
<summary>Indice 2 – Ajouter au total</summary>

Même forme que pour les PV : `total = total + ...;`
</details>

<details>
<summary>Indice 3 – Le total vaut 10 au lieu de 30 ?</summary>

Ton `return` est **dans** la boucle. `return` arrête la fonction immédiatement : la boucle n'a fait qu'un seul tour. Place-le **après** l'accolade `}` de la boucle.
</details>

➡️ Suite : [Niveau 4 – Les tableaux](./4-tableaux.md)
