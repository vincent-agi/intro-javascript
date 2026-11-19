# 🔒 Corrections formateur – Niveau 1 : la rigueur syntaxique

> Dossier **formateur**. Le code complet de chaque correction est dans [`solutions/`](./solutions/) et se lance avec `atelier/index.html?ex=NN&solution=1`.
>
> **Objectif du niveau** : faire disparaître les 5 fautes relevées au questionnaire (`if` sans parenthèses, accolades, `consol.log`, `;` après `for`, `=` / `===`) et installer le réflexe « gabarit vide d'abord ».

---

## Exercice 01 – Chasse aux bugs

### Correction commentée

```javascript
const PV_MAX = 100;
let pvHeros = 0;
let tours = 0;

console.log("Le combat commence");           // ❶ consol → console

if (pvHeros <= 0) {                           // ❷ parenthèses obligatoires après if
    console.log("💀 Le héros est KO");
}

for (let tour = 1; tour <= 3; tour++) {       // ❸ PAS de ; entre ) et {
    tours = tours + 1;
    console.log("Tour " + tour);
}

if (pvHeros === PV_MAX) {                     // ❹ === pour comparer (= range une valeur)
    console.log("❤️ Le héros est en pleine forme");
}                                             // ❺ l'accolade fermante manquante
```

### Ordre dans lequel l'atelier révèle les erreurs

C'est voulu : il apprend que **les erreurs d'écriture bloquent tout** et que les autres apparaissent ensuite.

| Ordre | Ce que voit Noah | Erreur |
| --- | --- | --- |
| 1 | 💥 `Unexpected identifier 'pvHeros'` + 👉 `if pvHeros <= 0 {` | ❷ parenthèses |
| 2 | 💥 `Unexpected end of input` | ❺ accolade (le navigateur la signale **en fin de fichier**, pas là où elle manque) |
| 3 | 💥 `consol is not defined` | ❶ faute de frappe |
| 4 | 💥 `tour is not defined` | ❸ `;` après `for` : le bloc `{ }` est exécuté **hors** de la boucle, où `tour` n'existe pas |
| 5 | ❤️ « pleine forme » s'affiche + ❌ `pvHeros vaut toujours 0` → obtenu `100` | ❹ `=` au lieu de `===` (bug **silencieux**) |

### Erreurs fréquentes à surveiller

- **Il corrige plusieurs choses à la fois** sans recharger → s'il casse autre chose, il ne sait plus quoi. Imposer « 1 correction = 1 rechargement ».
- **Il ne regarde pas le numéro de ligne.** Lui faire dire à voix haute : « l'erreur est ligne 24, elle dit… ».
- **Erreur ❺** : il place l'accolade **après** les vérifications → elles se retrouvent dans le `if` (faux) et ne s'exécutent plus : bilan vide. Le faire regarder où commence le bloc.
- **Erreur ❸** : il « corrige » `tour is not defined` en créant `let tour = 0;` au-dessus. Ça supprime le 💥 mais `tours` vaut 1 → ❌. Bon moment pour expliquer : « le `;` termine la boucle ; ce qui suit n'en fait plus partie ».
- **Erreur ❹** : il remplace `=` par `==`. Ça marche, mais on garde la convention du tuto : `===`.

### Question orale de vérification

> « Pourquoi `if (pvHeros = PV_MAX)` affiche "pleine forme" alors que le héros a 0 PV ? »
> Attendu (avec ses mots) : un seul `=` **met** 100 dans `pvHeros`, il ne compare pas.

---

## Exercice 02 – `if / else if / else` à trous

### Correction commentée

```javascript
if (pvHeros >= 70) {
    etat = "💪 En forme";
} else if (pvHeros >= 30) {     // trou 2 : else, trou 3 : {
    etat = "🤕 Blessé";
} else if (pvHeros > 0) {       // trou 4 : la condition complète
    etat = "🆘 En danger";
} else {                        // trou 5 : else, sans condition
    etat = "💀 KO";
}
```

Bonus papier : 80 → En forme, 10 → En danger, 0 → KO.

### Erreurs fréquentes à surveiller

- Trou 4 : écrire seulement `> 0` (sans la variable) ou `pvHeros > 0 && pvHeros < 30` (correct mais inutile : l'ordre des conditions s'en charge — bonne occasion de l'expliquer).
- Écrire `else (condition)` ou `else if` **sans** condition à la fin.
- Oublier le `{` (trou 3) : le navigateur signale l'erreur **plus bas**, sur le `}` orphelin.
- Ne pas comprendre pourquoi l'ordre compte : lui faire tester en inversant les deux premières conditions avec 80 PV (→ « Blessé »).

### Question orale de vérification

> « Avec 80 PV, est-ce que l'ordinateur lit la condition `pvHeros >= 30` ? »
> Attendu : non, il s'arrête à la première condition vraie.

---

## Exercice 03 – Écris ta condition : la potion

### Correction commentée

```javascript
if (potions === 0) {
    message = "🎒 Plus de potion !";
} else if (pvHeros === PV_MAX) {
    message = "❤️ Inutile, tu es en pleine forme";
} else {
    // Math.min garde le plus PETIT des deux : 110 → 100
    pvHeros = Math.min(PV_MAX, pvHeros + 30);
    potions = potions - 1;
    message = "🧪 Glou glou ! +30 PV";
}
```

Variante acceptable (plus lisible pour lui au début) :

```javascript
    pvHeros = pvHeros + 30;
    if (pvHeros > PV_MAX) {
        pvHeros = PV_MAX;
    }
```

### Erreurs fréquentes à surveiller

- **`Math.max` au lieu de `Math.min`** (confusion relevée au questionnaire) : `Math.max(100, 110)` → 110 → ❌. Faire verbaliser : « je veux le plus **petit** des deux ».
- Écrire `pvHeros + 30;` seul (calcul jeté, rien n'est rangé) → PV inchangés. Rappeler la forme `variable = nouvelle valeur`.
- `potions - 1;` ou `potions--` placé hors du `else` → la potion est perdue même quand c'est « inutile ».
- Des `if` séparés au lieu d'un `if / else if / else` (`if (potions === 0) {...} if (pvHeros === PV_MAX) {...} else {...}`) : avec 0 potion et 50 PV, le premier bloc écrit « Plus de potion », puis le `else` du second fait **boire quand même** → `potions` vaut `-1`. Les vérifications de l'exercice ne le détectent pas (2 potions au départ) : le faire tester avec `potions = 0`.
- Texte du message différent d'un caractère (espace, emoji oublié) → ❌. C'est l'occasion de parler de **précision** : l'ordinateur compare caractère par caractère.

### Question orale de vérification

> « Si on remplace le `else if` par un simple `if`, et que le héros a 100 PV et 0 potion, que se passe-t-il ? »

### Si ça bloque encore

Faire écrire le gabarit vide **à la main sur papier** 3 fois de suite (sans modèle la 3e fois), puis le taper. C'est de la mémoire musculaire : elle compte beaucoup pour la syntaxe.
