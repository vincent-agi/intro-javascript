# Niveau 1 – La rigueur : écrire du code que l'ordinateur comprend

L'ordinateur est un lecteur **très** pointilleux : une parenthèse oubliée, une lettre en moins, et il ne comprend plus rien. Bonne nouvelle : les erreurs sont presque toujours **les mêmes**. Ici, tu vas apprendre à les repérer, puis à ne plus les faire.

> 🧰 **Comment travailler** (rappel du [mode d'emploi](./README.md#-mode-demploi-pour-noah))
> 1. Ouvre `atelier/index.html` avec **Live Server** et choisis l'exercice dans la liste.
> 2. Ouvre le fichier `atelier/exercices/exNN.js` dans VS Code.
> 3. Modifie → **enregistre** (`Ctrl + S`) → **recharge** la page (`F5`) → lis le résultat.
> 4. ✅ vert = réussi. ❌ rouge = pas encore. 💥 = erreur : lis le numéro de ligne et le 💡 conseil.
>
> Garde l'[aide-mémoire](./aide-memoire.md) ouvert à côté : il contient les **gabarits** à recopier.

---

## Exercice 01 – Chasse aux bugs 🐛

⏱️ 15 min · 🔍 Correction de bugs · Fichier : `atelier/exercices/ex01.js`

### 🎯 Énoncé

Un apprenti magicien a écrit ce code… avec **5 erreurs**. Trouve-les et corrige-les **une par une**.

Résultat attendu à l'écran :

```text
Le combat commence
💀 Le héros est KO
Tour 1
Tour 2
Tour 3
```

### 📝 Le code de départ

```javascript
const PV_MAX = 100;
let pvHeros = 0;
let tours = 0;

consol.log("Le combat commence");

if pvHeros <= 0 {
    console.log("💀 Le héros est KO");
}

for (let tour = 1; tour <= 3; tour++); {
    tours = tours + 1;
    console.log("Tour " + tour);
}

if (pvHeros = PV_MAX) {
    console.log("❤️ Le héros est en pleine forme");

// ⬆️ Fin de ton code ⬆️
```

### 🔁 La méthode (à suivre à chaque erreur)

1. Recharge la page.
2. Lis la ligne 💥 : **quel numéro de ligne ?** Va à cette ligne dans VS Code.
3. Lis la ligne 👉 (la ligne fautive) et le 💡 conseil.
4. Corrige **une seule chose**, enregistre, recharge.
5. Recommence jusqu'à ce que tout soit ✅.

Note chaque erreur trouvée dans ce tableau (sur papier) :

| N° | Ligne | Ce qui n'allait pas | Ce que j'ai écrit à la place |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

### ✅ C'est réussi quand…

Les 2 vérifications sont vertes et l'écran affiche **exactement** les 5 lignes attendues (pas de « pleine forme » !).

### 🆘 Indices (ouvre-les un par un, seulement si tu bloques)

<details>
<summary>Indice 1 – Où chercher ?</summary>

Les 5 erreurs sont de 5 sortes différentes : une **faute de frappe**, des **parenthèses** oubliées, un **point-virgule en trop**, un **signe de comparaison** faux, une **accolade** oubliée.
</details>

<details>
<summary>Indice 2 – Les règles à vérifier</summary>

- Après `if` et après `for`, il y a **toujours** des parenthèses `( )`.
- Entre la parenthèse `)` d'un `for` et son accolade `{`, il n'y a **rien**.
- Pour **comparer**, on utilise `===`. Un seul `=` **range** une valeur dans la variable.
- Chaque `{` a son `}`. Compte-les !
</details>

<details>
<summary>Indice 3 – Les deux bugs « silencieux »</summary>

Deux erreurs ne déclenchent pas de 💥 : le programme tourne, mais fait n'importe quoi.

- Si « ❤️ pleine forme » s'affiche alors que le héros a 0 PV, regarde le signe dans le dernier `if`.
- L'accolade qui manque doit être placée **juste avant** la ligne `// ⬆️ Fin de ton code ⬆️`.
</details>

---

## Exercice 02 – `if / else if / else` à trous 🩺

⏱️ 10 min · 🧩 Code à trous · Fichier : `atelier/exercices/ex02.js`

### 🎯 Énoncé

L'état du héros dépend de ses PV. Complète les **5 trous** `___` pour obtenir :

| PV du héros | État |
| --- | --- |
| 70 ou plus | `"💪 En forme"` |
| 30 ou plus | `"🤕 Blessé"` |
| plus que 0 | `"🆘 En danger"` |
| sinon (0) | `"💀 KO"` |

### 📝 Le code de départ

```javascript
let pvHeros = 45;
let etat = "";

___ (pvHeros >= 70) {
    etat = "💪 En forme";
} ___ if (pvHeros >= 30) ___
    etat = "🤕 Blessé";
} else if (___) {
    etat = "🆘 En danger";
} ___ {
    etat = "💀 KO";
}

console.log("PV : " + pvHeros + " → " + etat);
```

### ✅ C'est réussi quand…

1. La vérification est verte et l'écran affiche `PV : 45 → 🤕 Blessé`.
2. **Bonus papier** : change `pvHeros` en `80`, puis `10`, puis `0`. Note l'état affiché à chaque fois. *(La vérification devient rouge : c'est normal, elle est prévue pour 45.)* Remets `45` à la fin.

### 🆘 Indices

<details>
<summary>Indice 1 – Le squelette</summary>

Une condition à plusieurs choix a **toujours** cette forme :

```javascript
if (condition1) {
    ...
} else if (condition2) {
    ...
} else {
    ...
}
```

Pose le code de départ à côté et compare mot à mot.
</details>

<details>
<summary>Indice 2 – Le trou entre parenthèses</summary>

« plus que 0 » se dit « plus grand que 0 ». Le signe « plus grand que » est `>`. Il faut écrire la variable **et** le nombre.
</details>

<details>
<summary>Indice 3 – Pourquoi l'ordre compte</summary>

L'ordinateur lit les conditions **de haut en bas** et s'arrête à la **première** qui est vraie. Avec 80 PV, `pvHeros >= 70` est vraie : il ne regarde même pas les suivantes.
</details>

---

## Exercice 03 – Écris ta condition : la potion 🧪

⏱️ 15 min · ✍️ Production guidée · Fichier : `atelier/exercices/ex03.js`

### 🎯 Énoncé

Le héros veut boire une potion. Écris **un seul** `if / else if / else` :

1. **S'il n'y a plus de potion** (`potions` vaut `0`) → `message = "🎒 Plus de potion !"`
2. **Sinon, si le héros a déjà tous ses PV** (`pvHeros` vaut `PV_MAX`) → `message = "❤️ Inutile, tu es en pleine forme"`
3. **Sinon**, il boit :
   - `pvHeros` augmente de `30`, **sans dépasser** `PV_MAX` ;
   - `potions` baisse de `1` ;
   - `message = "🧪 Glou glou ! +30 PV"`

### 📝 Le code de départ

```javascript
const PV_MAX = 100;
let pvHeros = 80;
let potions = 2;
let message = "";

// ✏️ À toi ! Écris UN if / else if / else ici



console.log(message);
console.log("PV : " + pvHeros + " | potions : " + potions);
```

### ✅ C'est réussi quand…

Les 3 vérifications sont vertes. Avec 80 PV, le héros doit finir à **100**, pas à 110 !

### 🆘 Indices

<details>
<summary>Indice 1 – Commence par le squelette</summary>

Recopie d'abord le gabarit **vide** de l'[aide-mémoire](./aide-memoire.md), avec ses 3 blocs `{ }`. Enregistre et recharge : pas d'erreur ? Alors seulement, remplis les conditions, puis les blocs.
</details>

<details>
<summary>Indice 2 – Les deux premières conditions</summary>

« vaut » = « est égal à » = `===`. La première condition compare `potions` et `0`. La deuxième compare `pvHeros` et `PV_MAX`.
</details>

<details>
<summary>Indice 3 – Ne pas dépasser 100</summary>

Dans le jeu, la fonction `soigner` utilise `Math.min(PV_MAX, ...)`. `Math.min` garde le **plus petit** des deux nombres : `Math.min(100, 110)` donne `100`, et `Math.min(100, 70)` donne `70`. Écris : `pvHeros = Math.min(PV_MAX, pvHeros + 30);`
</details>

<details>
<summary>Indice 4 – Enlever une potion</summary>

Même forme que les PV : la nouvelle valeur = l'ancienne valeur moins 1. `potions = potions - 1;`
</details>

➡️ Suite : [Niveau 2 – Les boucles](./2-boucles.md)
