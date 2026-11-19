# 🔒 Corrections formateur – Niveau 4 : les tableaux

> **Objectif du niveau** : index à partir de 0, `.length` (sans parenthèses) et son lien avec la boucle `i < tableau.length`, `.push()`, puis des fonctions qui **reçoivent un tableau**.

---

## Exercice 13 – L'inventaire

### Correction commentée

```javascript
const premier = inventaire[0];
const nombreObjets = inventaire.length;          // propriété : PAS de parenthèses
const dernier = inventaire[nombreObjets - 1];    // 3 objets → cases 0, 1, 2
inventaire.push("🔑 Clé");                        // fonction : AVEC parenthèses
```

### Erreurs fréquentes à surveiller

- `inventaire[1]` pour le premier (comptage humain).
- `inventaire.length()` → 💥 `inventaire.length is not a function`. Le 💡 de l'atelier en parle. Règle simple à donner : « `.length` est une **information**, `.push(...)` est une **action** ».
- `inventaire[nombreObjets]` → `undefined` (case 3 inexistante) → ❌ avec 💡 « undefined ». Lui faire dessiner les cases.
- Écrire `inventaire[2]` en dur pour le dernier : la vérification passe ✅, mais **refuser** (consigne explicite). Demander : « et si le sac a 10 objets ? ».
- `inventaire = inventaire.push(...)` → 💥 `Assignment to constant variable`. `push` modifie le tableau directement.
- `const` sur un tableau qu'on modifie : s'il demande pourquoi c'est possible, réponse simple : « `const` empêche de changer de **sac**, pas de changer ce qu'il y a **dans** le sac ».

---

## Exercice 14 – Parcourir l'inventaire

### Correction commentée

```javascript
// Partie 1
for (let i = 0; i < inventaire.length; i++) {
    console.log((i + 1) + ". " + inventaire[i]);
    lignesAffichees = lignesAffichees + 1;
}

// Partie 2
let nbPotions = 0;
for (let i = 0; i < inventaire.length; i++) {
    if (inventaire[i] === "🧪 Potion") {
        nbPotions = nbPotions + 1;
    }
}
```

### Erreurs fréquentes à surveiller

- **`i <= inventaire.length`** (la confusion de bornes du questionnaire) → 6 tours, dernière ligne `6. undefined`, ❌ « 5 objets affichés » (obtenu 6). Faire le lien explicite avec la règle du niveau 2 : les cases vont de 0 à `length - 1`.
- `i = 1` → le premier objet manque.
- `inventaire[i + 1]` au lieu de `inventaire[i]` (confusion entre le numéro **affiché** et la case **lue**).
- Partie 2 : `if (inventaire === "🧪 Potion")` (compare le **tableau entier**) → toujours faux → 0.
- Partie 2 : `"🧪 Potion"` recopié sans l'emoji, ou avec 2 espaces → 0. Conseiller de **copier-coller** le texte depuis le tableau.

---

## Exercice 15 – Le plus gros coup

### Correction commentée

```javascript
function totalDegats(liste) {
    let total = 0;
    for (let i = 0; i < liste.length; i++) {
        total = total + liste[i];       // la case n°i
    }
    return total;
}

function plusGrosCoup(liste) {
    let record = liste[0];
    for (let i = 0; i < liste.length; i++) {
        if (liste[i] > record) {
            record = liste[i];          // la case bat le record : elle devient le record
        }
    }
    return record;
}

const plusGrand = Math.max(12, 7, 19);
```

(La boucle peut aussi commencer à `i = 1`, puisque la case 0 est déjà le record de départ : les deux sont justes.)

### Erreurs fréquentes à surveiller

- `total = total + i` → additionne les **numéros de cases** (0+1+2+3+4 = 10) au lieu des valeurs. Très fréquent : `i` = le **numéro**, `liste[i]` = le **contenu**.
- `total = total + coups[i]` → marche pour `coups` mais pas pour `[5, 5]` (❌). Rappel du niveau 3 : dans la fonction, on utilise le **paramètre** `liste`.
- `let record = 0;` → marche ici (nombres positifs). Accepter, mais signaler que `liste[0]` est plus sûr.
- Inverser l'affectation : `liste[i] = record` → modifie le tableau !
- **`Math.max(coups)`** ou **`Math.max([12, 7, 19])`** → `NaN`. C'est le point du questionnaire : `Math.max` attend des nombres **séparés par des virgules**, pas un tableau. (La syntaxe `Math.max(...coups)` existe mais n'est pas au programme : ne pas l'introduire maintenant.)

### Question orale de vérification

> « Dans la boucle, que vaut `i` au 3e tour ? Et `liste[i]` ? » (i = 2, liste[2] = 19.)
