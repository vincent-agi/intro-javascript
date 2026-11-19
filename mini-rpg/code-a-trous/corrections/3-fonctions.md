# 🔒 Corrections formateur – Niveau 3 : les fonctions

> **Objectif du niveau** : c'est le **point le plus faible** de Noah (« ne comprend pas les fonctions »). On sépare clairement les **deux moments** (fabriquer / utiliser), on rend visible le trajet des valeurs (appel → paramètres → `return` → variable), puis on fait écrire des fonctions de plus en plus complètes.
>
> 🗣️ Vocabulaire à garder constant pendant toute la séance : **machine**, **entrées** (paramètres), **rend** (`return`), **utiliser / appeler**. Éviter « argument », « signature », « valeur de retour » au début.

---

## Exercice 08 – Démonte la fonction

### Correction

1. `calculerDegats` · 2. `force` et `bonus` · 3. `total` · 4. deux fois.
5. 1er appel : `force = 10`, `bonus = 5`, `total = 15`.
6. 2e appel : `force = 7`, `bonus = 0`, `total = 7`.
7. `Coup 1 : 15` puis `Coup 2 : 7`.
8. Étape 3 :

```javascript
const coup3 = calculerDegats(20, 3);
console.log("Coup 3 : " + coup3);
```

9. Sans `return` : `Coup 1 : undefined`. La machine calcule `total`… mais ne le **rend** pas : il est perdu à la fin de la fonction.

### Erreurs fréquentes à surveiller

- **Question 4** : il répond « 3 fois » en comptant la ligne `function calculerDegats...`. C'est **la** confusion clé : la définition n'est pas un appel. Insister.
- **Étape 3** : il écrit `calculerDegats(force = 20, bonus = 3)` ou `calculerDegats(20 + 3)`. Revenir à l'ordre des valeurs.
- **Étape 3** : il écrit `function coup3...` (il recrée une fonction au lieu d'utiliser la machine existante).
- Il oublie `const coup3 =` → le résultat est perdu, `coup3 is not defined` sur la vérification.

### Question orale de vérification

> « Si j'écris `calculerDegats(3, 20)`, est-ce que ça donne la même chose que `calculerDegats(20, 3)` ? Et `force`, elle vaut combien ? »
> (Même total ici, mais `force` vaut 3 : l'ordre décide qui reçoit quoi.)

### Activité débranchée conseillée (5 min, avant l'exercice 09)

Jouer la fonction **à deux** : le formateur « appelle » en tendant deux papiers (`10`, `5`) ; Noah est la machine, il écrit `force = 10`, `bonus = 5` sur ses étiquettes, calcule, et **rend** un papier `15` que le formateur range dans une boîte `coup1`. Puis recommencer avec `7`, `0`. Ça rend le trajet des valeurs concret.

---

## Exercice 09 – Fonction à trous : `infligerDegats`

### Correction commentée

```javascript
function infligerDegats(pv, degats) {        // les noms utilisés dans le corps
    const reste = pv - degats;
    return Math.max(0, reste);                // le plus grand entre 0 et reste
}

let pvMonstre = 80;
pvMonstre = infligerDegats(pvMonstre, 25);    // 80 - 25 = 55
```

### Erreurs fréquentes à surveiller

- Paramètres **inversés** `(degats, pv)` : la fonction marche quand même dans le corps (les noms correspondent), mais l'appel `infligerDegats(100, 30)` met 100 dans `degats` → `-70` → `0` → ❌. Excellente occasion : « ce sont les **positions** qui comptent à l'appel, pas les noms ».
- Mettre des valeurs dans les paramètres : `function infligerDegats(80, 25)` → 💥 erreur de syntaxe. Rappeler : dans la **fabrication**, on met des **noms** ; dans l'**utilisation**, des **valeurs**.
- `console.log(Math.max(0, reste))` au lieu de `return` → affiche, mais rend `undefined`. Différence cruciale **afficher ≠ rendre** : à expliciter.
- Confusion `Math.max` / `Math.min` : faire calculer à voix haute `Math.max(0, -30)`.

---

## Exercice 10 – Fonction à trous : `soigner`

### Correction commentée

```javascript
function soigner(pv, soin) {
    const total = pv + soin;
    return Math.min(PV_MAX, total);    // min : on garde le plus PETIT → plafond à 100
}

let pvHeros = 50;
pvHeros = soigner(pvHeros, 30);        // on UTILISE la machine par son nom
```

### Erreurs fréquentes à surveiller

- `Math.max` (réflexe de l'exercice 09) → `soigner(50, 30)` rend 100 au lieu de 80. Le faire raisonner : « max protège le **bas** (jamais sous 0), min protège le **haut** (jamais au-dessus de 100) ».
- `const total = pvHeros + 30;` : utilise les variables **extérieures** au lieu des paramètres. Le résultat ne dépend plus des valeurs données à l'appel : `soigner(50, 30)` rend 100 (car `pvHeros` vaut déjà 80 à ce moment) → ❌. Bon déclencheur pour comprendre à quoi servent les paramètres.
- Dernier trou : `function(pvHeros, 30)` ou `soin(pvHeros, 30)`.

### Question orale de vérification

> « Dans `soigner(90, 30)`, que vaut `pv` ? Et `pvHeros` ? » (`pv` = 90 ; `pvHeros` n'a rien à voir, il vaut ce qu'il vaut dehors.)

---

## Exercice 11 – Fonctions guidées : `estVivant` et `etatDuHeros`

### Correction commentée

```javascript
function estVivant(pv) {
    return pv > 0;   // une comparaison vaut déjà true ou false
}

function etatDuHeros(pv) {
    if (pv >= 70) {
        return "💪 En forme";
    } else if (pv >= 30) {
        return "🤕 Blessé";
    } else if (pv > 0) {
        return "🆘 En danger";
    } else {
        return "💀 KO";
    }
}
```

Variante acceptée pour `estVivant` :

```javascript
function estVivant(pv) {
    if (pv > 0) {
        return true;
    } else {
        return false;
    }
}
```

Accepter sans hésiter : elle est juste. Montrer ensuite la version courte comme « raccourci », sans l'imposer.

### Erreurs fréquentes à surveiller

- `return "true"` (texte) au lieu de `true` → ❌ avec le 💡 « regarde les guillemets ». Bonne occasion de revoir les types.
- Utiliser `pvHeros` dans les conditions → `pvHeros is not defined`. Le paramètre s'appelle `pv`.
- Garder `etat = "..."` (copié de l'exercice 02) **sans** `return` → la fonction rend `undefined` partout → 💡 « as-tu oublié le return ? ».
- `>` au lieu de `>=` → seules les vérifications **des bornes** (70 et 30) échouent : très formateur. Faire lire précisément les 2 ❌.
- Accolades : 4 blocs dans une fonction = beaucoup de `}`. Conseiller d'écrire le squelette complet **vide** avant de remplir.

### Question orale de vérification

> « Pourquoi c'est mieux en fonction que dans l'exercice 02 ? » (On teste 8 valeurs sans modifier le code ; on peut s'en servir partout dans le jeu.)

---

## Exercice 12 – Fonction + boucle : la rafale

### Correction commentée

```javascript
function rafale(nbCoups, degatsParCoup) {
    let total = 0;

    for (let coup = 1; coup <= nbCoups; coup++) {   // le paramètre sert de limite
        total = total + degatsParCoup;
        console.log("⚔️ Coup " + coup + " : " + degatsParCoup + " dégâts");
    }

    return total;   // APRÈS la boucle
}
```

### Erreurs fréquentes à surveiller

- **`return` dans la boucle** → rend 10 au lieu de 30 (la fonction s'arrête au 1er tour). Le piège le plus probable : bien l'expliquer (indice 3).
- Limite écrite en dur `coup <= 3` → `rafale(5, 4)` rend 12 → ❌. Montre l'intérêt du **paramètre**.
- `let total = 0;` déplacé **dans** la boucle → remis à 0 à chaque tour → rend 10.
- `rafale(0, 10)` : avec `coup = 1; coup <= 0` la boucle ne tourne pas → 0, ✅. S'il a fait `coup = 0; coup <= nbCoups` → 1 tour en trop → ❌ sur 3 vérifications : retour aux bornes du niveau 2.

### Critère de réussite du niveau

Noah sait, **sans aide**, écrire une fonction qui prend 1 ou 2 paramètres, les utilise, et rend un résultat avec `return`. Si ce n'est pas le cas, refaire l'exercice 11 le lendemain **à partir d'un fichier vide** (en gardant juste les vérifications) avant de passer au niveau 4.
