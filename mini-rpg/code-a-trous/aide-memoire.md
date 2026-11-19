# 📌 Aide-mémoire : les gabarits à recopier

> Garde cette page ouverte pendant les exercices. Quand tu dois écrire un `if`, un `for` ou une fonction : **recopie le gabarit vide d'abord**, enregistre, recharge (pas d'erreur ?), **puis** remplis.

## 1. La condition

```javascript
if (condition1) {
    // si condition1 est vraie
} else if (condition2) {
    // sinon, si condition2 est vraie
} else {
    // sinon, dans tous les autres cas
}
```

| Je veux dire… | J'écris |
| --- | --- |
| est égal à | `===` |
| est différent de | `!==` |
| plus grand / plus petit | `>` / `<` |
| plus grand **ou égal** / plus petit **ou égal** | `>=` / `<=` |
| ET / OU / NON | `&&` / `\|\|` / `!` |

⚠️ `=` **range** une valeur (`pv = 100`). `===` **compare** (`pv === 100`).

## 2. La boucle `for`

```javascript
// Compter de 1 à N (N compris)
for (let i = 1; i <= N; i++) {
    // répété N fois : i vaut 1, 2, ..., N
}

// Passer sur chaque case d'un tableau
for (let i = 0; i < tableau.length; i++) {
    // tableau[i] = la case n°i
}
```

⚠️ **Jamais** de `;` entre `)` et `{`.

## 3. La fonction

```javascript
// Fabriquer la machine
function nomDeLaFonction(parametre1, parametre2) {
    const resultat = parametre1 + parametre2;
    return resultat;
}

// Utiliser la machine, et ranger ce qu'elle rend
const valeur = nomDeLaFonction(10, 5);
```

- les valeurs de l'appel vont dans les paramètres **dans l'ordre** ;
- `return` **rend** le résultat **et arrête** la fonction ;
- sans `return`, la fonction rend `undefined`.

## 4. Le tableau

```javascript
const sac = ["🧪 Potion", "🗡️ Épée"];

sac[0];                 // la 1re case (on compte à partir de 0 !)
sac.length;             // le nombre de cases (sans parenthèses)
sac[sac.length - 1];    // la dernière case
sac.push("🔑 Clé");     // ajoute à la fin (avec parenthèses)
```

## 5. La page (DOM)

```javascript
// Retrouver un élément par son id, puis changer son texte
const zone = document.getElementById("message");
zone.textContent = "Bonjour !";

// Fabriquer un élément et l'accrocher à une liste
const ligne = document.createElement("li");
ligne.textContent = "🧪 Potion";
liste.appendChild(ligne);

// Réagir à un clic (SANS parenthèses après le nom de la fonction)
bouton.addEventListener("click", nomDeLaFonction);
```

## 6. Les fonctions toutes prêtes

| Outil | Rend | Exemple |
| --- | --- | --- |
| `Math.max(a, b, ...)` | le plus **grand** | `Math.max(0, -30)` → `0` (« jamais sous 0 ») |
| `Math.min(a, b, ...)` | le plus **petit** | `Math.min(100, 120)` → `100` (« jamais au-dessus de 100 ») |
| `console.log(...)` | rien : affiche dans la console | `console.log("PV : " + pv);` |

## ✅ Ma checklist avant de recharger

- [ ] `console`, `document`, `getElementById` bien écrits (lettre par lettre, majuscules) ?
- [ ] des `( )` après chaque `if`, `else if`, `for` ?
- [ ] pas de `;` juste après la `)` d'un `if` ou d'un `for` ?
- [ ] autant de `{` que de `}` ? (VS Code colore les paires : clique sur une accolade)
- [ ] `===` pour comparer, `=` pour ranger ?
- [ ] les textes entre guillemets `" "` ?
- [ ] **enregistré** (`Ctrl + S`) avant de recharger ?
