# 04 – Tableau et boucle : l'historique

## Le concept

Un **tableau** (*array*) est une liste de valeurs rangées dans l'ordre :

```javascript
const fruits = ["pomme", "poire", "kiwi"];
fruits[0];        // "pomme" (on compte à partir de 0 !)
fruits.length;    // 3 (le nombre d'éléments)
fruits.push("fraise"); // ajoute "fraise" à la fin
```

Une **boucle `for`** répète un bloc de code plusieurs fois :

```javascript
for (let i = 0; i < 3; i++) {
    // i vaut 0, puis 1, puis 2
}
```

Les trois parties entre parenthèses :

1. `let i = 0` : départ ;
2. `i < 3` : on continue tant que c'est vrai ;
3. `i++` : après chaque tour, on ajoute 1 à `i`.

## Le code

Ajoute ces lignes **en haut** de `app.js`, avec les autres variables :

```javascript
// Le tableau qui garde tous les essais du joueur (vide au départ)
const historique = [];
// La liste <ul> de la page
const liste = document.getElementById("historique");
```

Ajoute cette nouvelle fonction :

```javascript
function afficherHistorique() {
    // On vide la liste pour ne pas afficher les essais en double
    liste.innerHTML = "";

    // On passe sur chaque case du tableau, de 0 jusqu'à la fin
    for (let i = 0; i < historique.length; i++) {
        const ligne = document.createElement("li"); // crée un <li>
        ligne.textContent = historique[i];          // met l'essai dedans
        liste.appendChild(ligne);                   // l'ajoute à la page
    }
}
```

Enfin, dans `valider`, juste **après** le test du champ vide, mémorise l'essai et affiche la liste :

```javascript
    // On range la proposition dans le tableau, puis on rafraîchit l'affichage
    historique.push(proposition);
    afficherHistorique();
```

### Ce qu'il faut retenir

- `push` ajoute à la fin du tableau.
- `historique.length` évite de compter à la main.
- La boucle écrit une ligne par essai, quel que soit leur nombre.

## 🏆 Défi

Affiche aussi le numéro de l'essai. Dans la boucle, remplace le texte du `<li>` par :

```javascript
ligne.textContent = "Essai " + (i + 1) + " : " + historique[i];
```

Pourquoi `i + 1` ? Réponds à voix haute avant de regarder la suite : parce que `i` commence à `0`.

➡️ Suite : [05 – Code final](./05-code-final.md)
