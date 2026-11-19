# 🔒 Corrections formateur – Niveau 2 : les boucles `for`

> **Objectif du niveau** : maîtriser les 3 réglages du `for`, choisir entre `<` et `<=` **en raisonnant** (et pas au hasard), écrire un corps de boucle seul, et ne plus jamais mettre de `;` après la `)`.

---

## Exercice 04 – Prédis les boucles

### Correction

| Boucle | Valeurs affichées | Tours |
| --- | --- | --- |
| A `i = 0; i < 3` | 0, 1, 2 | **3** |
| B `i = 1; i <= 3` | 1, 2, 3 | **3** |
| C `i = 0; i <= 3` | 0, 1, 2, 3 | 4 |
| D `i = 1; i < 3` | 1, 2 | 2 |

Question finale : **A et B** font exactement 3 tours.

Nombre de tours = (dernière valeur − première valeur) + 1. Pour C : 3 − 0 + 1 = 4.

### Erreurs fréquentes à surveiller

- Croire que A affiche 1, 2, 3 (il « voit » le 3 de la condition comme une valeur affichée).
- Croire que C fait 3 tours (il ne compte pas le 0).
- **Il lance avant de prédire.** Exiger le tableau rempli **avant** : c'est la prédiction ratée qui fait apprendre, pas l'affichage.

### Question orale de vérification

> « Je veux afficher les tours 1 à 10. Dicte-moi la boucle. » (Attendu : `let i = 1; i <= 10; i++`.)
> « Et pour les 10 cases d'un tableau ? » (Attendu : `let i = 0; i < 10; i++`, ou mieux `i < tableau.length`.)

---

## Exercice 05 – Le monstre frappe 3 fois

### Correction commentée

```javascript
for (let coup = 1; coup <= 3; coup++) {      // numéros 1 à 3 → départ 1 et <=
    pvHeros = pvHeros - 10;
    console.log("👹 Coup n°" + coup + " : il reste " + pvHeros + " PV");
}
```

`coup = 0; coup < 3` donne aussi 3 tours (vérification verte !) mais affiche « Coup n°0 » → **non conforme** au résultat attendu. C'est voulu : la vérification automatique ne suffit pas, il faut **comparer l'affichage**.

### Erreurs fréquentes à surveiller

- `coup + 1` au lieu de `coup++` dans le pas (ne change pas `coup` → boucle infinie, la page se fige). Si la page ne répond plus : fermer l'onglet, corriger, rouvrir.
- `"coup"` entre guillemets dans le `console.log` → affiche le mot « coup » au lieu du numéro. Bonne occasion de revoir : guillemets = texte tel quel, sans guillemets = valeur de la variable.
- `pvHeros - 10;` sans `pvHeros =` devant.

---

## Exercice 06 – Régénération et compte à rebours

### Correction commentée

```javascript
let pvHeros = 50;

for (let tour = 1; tour <= 4; tour++) {
    pvHeros = pvHeros + 5;
    console.log("💚 Tour " + tour + " : " + pvHeros + " PV");
}

let nbAffichages = 0;

for (let i = 3; i >= 1; i--) {          // les 3 réglages sont inversés
    console.log("🔥 Le sort explose dans " + i + "...");
    nbAffichages = nbAffichages + 1;
}
console.log("💥 BOUM !");               // APRÈS l'accolade : une seule fois
```

### Erreurs fréquentes à surveiller

- **Compte à rebours** : `i <= 1` au lieu de `i >= 1` → la condition est fausse dès le départ (3 ≤ 1 ? non), **zéro tour**, aucun message d'erreur. Lui faire « jouer l'ordinateur » sur le 1er tour.
- `i--` oublié, remplacé par `i++` → boucle infinie (3, 4, 5… toujours ≥ 1). Prévenir **avant** : « si la page se fige, ferme l'onglet ».
- `💥 BOUM !` dans la boucle → affiché 3 fois. Faire repérer les accolades : « qu'est-ce qui est **dedans**, qu'est-ce qui est **après** ? ».
- Afficher `pvHeros` **avant** de l'augmenter → « Tour 1 : 50 PV ». L'ordre des lignes dans le bloc compte.

### Question orale de vérification

> « Montre-moi avec ton doigt où commence et où finit le bloc répété. »

---

## Exercice 07 – Les boucles cassées

### Correction commentée

```javascript
// Bug A : le ; après ) termine la boucle. Elle tourne 5 fois… à vide.
//         Le bloc { } qui suit n'en fait plus partie : il s'exécute 1 seule fois.
for (let i = 1; i <= 5; i++) {

// Bug B : de 1 à 5 INCLUS → <=   (avec <, le coffre n°5 n'est jamais ouvert)
for (let numero = 1; numero <= 5; numero++) {

// Bug C : il manquait la parenthèse fermante après i++
for (let i = 0; i < 3; i++) {
```

### Ce que voit Noah (vérifié dans l'atelier)

1. D'abord 💥 `Unexpected token '{'` + 👉 `for (let i = 0; i < 3; i++ {` → bug C. **Rien d'autre ne s'affiche** tant qu'il n'est pas corrigé.
2. Puis `Bug A : 1 tour(s) compté(s)` + ❌, et seulement 4 coffres + ❌.

### Erreurs fréquentes à surveiller

- **Bug A** : c'est **l'erreur exacte du questionnaire**. Elle est piégeuse car aucune erreur ne s'affiche. Exiger la phrase d'explication écrite.
- **Bug B** : il corrige en `numero < 6`. Accepter (c'est juste), mais demander quelle version est la plus **lisible** pour « de 1 à 5 » (`<= 5`).
- **Bug B** : il corrige en partant de 0 (`numero = 0; numero < 5`) → 5 tours, ✅… mais « Coffre n°0 ». Même remarque qu'à l'exercice 05.

### Si ça bloque encore

Pour fixer le `;` : lui faire écrire au tableau la « phrase » de la boucle : « **pour** i allant de 1 à 5, **fais** { … } ». Le `;` coupe la phrase après « pour i allant de 1 à 5 » : on ne sait plus quoi faire.
