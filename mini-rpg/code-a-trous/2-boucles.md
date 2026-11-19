# Niveau 2 – Les boucles `for` : répéter sans recopier

Le monstre frappe 3 fois ? Le héros se régénère pendant 4 tours ? Plutôt que de recopier la même ligne, on écrit une **boucle**.

```javascript
for (let i = 1; i <= 3; i++) {
    // ce bloc est répété : i vaut 1, puis 2, puis 3
}
```

Une boucle `for`, c'est **3 réglages** dans les parenthèses, séparés par des `;` :

| Réglage | Exemple | Ça veut dire |
| --- | --- | --- |
| ① le départ | `let i = 1` | « je commence à 1 » |
| ② la condition | `i <= 3` | « je continue **tant que** c'est vrai » |
| ③ le pas | `i++` | « après chaque tour, j'ajoute 1 » |

⚠️ **Jamais de `;` entre `)` et `{`.** Sinon la boucle tourne… à vide, et ton bloc ne s'exécute qu'une seule fois.

---

## Exercice 04 – Prédis les boucles 🔮

⏱️ 10 min · 🧠 Lecture et prédiction · Fichier : `atelier/exercices/ex04.js`

### 🎯 Énoncé

**Sans rien lancer**, écris sur papier ce que chaque boucle va afficher, et **combien de tours** elle fait. Ensuite seulement, lance l'exercice dans l'atelier et compare.

```javascript
// Boucle A
for (let i = 0; i < 3; i++) {
    console.log("A : " + i);
}

// Boucle B
for (let i = 1; i <= 3; i++) {
    console.log("B : " + i);
}

// Boucle C
for (let i = 0; i <= 3; i++) {
    console.log("C : " + i);
}

// Boucle D
for (let i = 1; i < 3; i++) {
    console.log("D : " + i);
}
```

| Boucle | Valeurs de `i` affichées | Nombre de tours | Correct ? ✅ / ❌ |
| --- | --- | --- | --- |
| A | | | |
| B | | | |
| C | | | |
| D | | | |

**Question finale** : quelles boucles font **exactement 3 tours** ?

### 🆘 Indices

<details>
<summary>Indice 1 – Faire la boucle « à la main »</summary>

Prends la boucle A et joue l'ordinateur :

1. `i` vaut 0. Est-ce que `0 < 3` ? Oui → j'affiche `A : 0`, puis `i++` → `i` vaut 1.
2. `i` vaut 1. Est-ce que `1 < 3` ? Oui → j'affiche…
3. … continue jusqu'à ce que la réponse soit **non**.
</details>

<details>
<summary>Indice 2 – La différence entre &lt; et &lt;=</summary>

- `i < 3` : 3 **n'est pas** compris (« strictement plus petit »).
- `i <= 3` : 3 **est** compris (« plus petit **ou égal** »).
</details>

### 📌 La règle à retenir (recopie-la dans ton cahier)

> Pour faire **N** tours :
> - `for (let i = 0; i < N; i++)` → de 0 à N-1 (parfait pour les **cases d'un tableau**) ;
> - `for (let i = 1; i <= N; i++)` → de 1 à N (parfait pour **compter** : tour 1, tour 2…).

---

## Exercice 05 – Le monstre frappe 3 fois 👹

⏱️ 10 min · 🧩 Code à trous · Fichier : `atelier/exercices/ex05.js`

### 🎯 Énoncé

Le monstre frappe **3 fois**, **10 dégâts** à chaque coup. Complète les **5 trous**.

Résultat attendu :

```text
👹 Coup n°1 : il reste 90 PV
👹 Coup n°2 : il reste 80 PV
👹 Coup n°3 : il reste 70 PV
```

### 📝 Le code de départ

```javascript
let pvHeros = 100;

for (let coup = ___; coup ___ 3; coup___) {
    pvHeros = pvHeros - ___;
    console.log("👹 Coup n°" + ___ + " : il reste " + pvHeros + " PV");
}
```

### ✅ C'est réussi quand…

La vérification est verte **et** les numéros affichés sont bien 1, 2, 3 (pas 0, 1, 2).

### 🆘 Indices

<details>
<summary>Indice 1 – Les 3 réglages</summary>

Regarde le résultat attendu : le premier coup s'appelle « n°1 ». Donc `coup` commence à… ? Et le dernier coup est le n°3 : il faut que 3 soit **compris**. Relis la règle de l'exercice 04.
</details>

<details>
<summary>Indice 2 – Le corps de la boucle</summary>

- Chaque coup enlève 10 PV.
- Le numéro du coup, c'est la variable de la boucle elle-même.
</details>

---

## Exercice 06 – Régénération et compte à rebours ⏳

⏱️ 20 min · ✍️ Production guidée · Fichier : `atelier/exercices/ex06.js`

### 🎯 Énoncé

**Partie 1 – La régénération.** Le héros a 50 PV. Pendant **4 tours**, il récupère **5 PV par tour**. Écris la boucle.

```text
💚 Tour 1 : 55 PV
💚 Tour 2 : 60 PV
💚 Tour 3 : 65 PV
💚 Tour 4 : 70 PV
```

**Partie 2 – Le compte à rebours.** Un sort va exploser. Écris une boucle qui compte **à l'envers**, de 3 à 1, puis affiche `💥 BOUM !` **après** la boucle. Dans la boucle, ajoute aussi 1 à `nbAffichages` (pour la vérification).

```text
🔥 Le sort explose dans 3...
🔥 Le sort explose dans 2...
🔥 Le sort explose dans 1...
💥 BOUM !
```

### 📝 Le code de départ

```javascript
let pvHeros = 50;

// ✏️ Partie 1 : écris ta boucle for ici


let nbAffichages = 0;

// ✏️ Partie 2 : écris ta boucle for ici (i-- au lieu de i++)
//    puis, APRÈS la boucle, affiche "💥 BOUM !"
```

### ✅ C'est réussi quand…

Les 2 vérifications sont vertes et `💥 BOUM !` ne s'affiche **qu'une seule fois**, à la fin.

### 🆘 Indices

<details>
<summary>Indice 1 – Partie 1 : pars de l'exercice 05</summary>

C'est presque la même boucle que l'exercice 05 : seuls le nombre de tours, le signe (`+` au lieu de `-`), la valeur (5) et le texte changent. Recopie le **gabarit** de l'aide-mémoire, puis adapte.
</details>

<details>
<summary>Indice 2 – Partie 2 : compter à l'envers</summary>

Les 3 réglages changent tous :

- départ : on commence à **3** ;
- condition : on continue tant que `i` est **plus grand ou égal** à 1 (`>=`) ;
- pas : on **enlève** 1 à chaque tour (`i--`).
</details>

<details>
<summary>Indice 3 – BOUM s'affiche 3 fois ?</summary>

Ta ligne `console.log("💥 BOUM !");` est **dans** les accolades de la boucle. Déplace-la **après** l'accolade fermante `}`.
</details>

---

## Exercice 07 – Les boucles cassées 🔧

⏱️ 15 min · 🔍 Correction de bugs · Fichier : `atelier/exercices/ex07.js`

### 🎯 Énoncé

Ces 3 boucles ont chacune **un** bug. Répare-les.

```javascript
// Bug A – But : compter 5 tours de combat.
let toursA = 0;
for (let i = 1; i <= 5; i++); {
    toursA = toursA + 1;
}

// Bug B – But : ouvrir les 5 coffres, numérotés de 1 à 5.
let coffresOuverts = 0;
for (let numero = 1; numero < 5; numero++) {
    coffresOuverts = coffresOuverts + 1;
    console.log("📦 Coffre n°" + numero + " ouvert");
}

// Bug C – But : afficher 3 fois "⚔️ Attaque !"
let attaques = 0;
for (let i = 0; i < 3; i++ {
    attaques = attaques + 1;
    console.log("⚔️ Attaque !");
}
```

Pour chaque bug, écris sur papier **une phrase** qui explique ce qui n'allait pas.

### ✅ C'est réussi quand…

Les 3 vérifications sont vertes.

### 🆘 Indices

<details>
<summary>Indice 1 – Par où commencer ?</summary>

Commence par le bug que l'atelier signale avec 💥 : tant qu'il y a une erreur d'écriture, **rien** ne s'exécute. Les deux autres bugs sont **silencieux** : il faut lire les ❌ et ce qui s'affiche.
</details>

<details>
<summary>Indice 2 – Bug A : « 1 tour compté » ?</summary>

Regarde ce qu'il y a entre `)` et `{`. Relis l'avertissement ⚠️ en haut de la fiche.
</details>

<details>
<summary>Indice 3 – Bug B : le coffre n°5 manque</summary>

Il faut que 5 soit **compris**. Quel signe faut-il ?
</details>

➡️ Suite : [Niveau 3 – Les fonctions](./3-fonctions.md)
