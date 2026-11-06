# 02 – Variables et saisie du joueur

## Le concept

Une **variable** est une boîte avec une étiquette. Tu y ranges une valeur pour la réutiliser plus tard.

- `const` : la boîte ne change **jamais** de contenu.
- `let` : le contenu peut **changer** plus tard.

Le **DOM**, c'est la page HTML vue par JavaScript. Avec `document.getElementById("...")`, tu récupères un élément grâce à son `id`.

## Le code

Écris ceci dans `app.js` (tu peux effacer le `console.log` de l'étape 1) :

```javascript
// Le nombre de vues à deviner : un entier au hasard entre 0 et 1000.
// Math.random() donne un nombre entre 0 et 1, on le multiplie par 1001,
// puis Math.floor() enlève les décimales.
const vuesMystere = Math.floor(Math.random() * 1001);

// On récupère les éléments de la page grâce à leur id
const saisie = document.getElementById("saisie");
const bouton = document.getElementById("valider");
const message = document.getElementById("message");

// Une fonction = un bloc de code qu'on peut lancer quand on veut
function valider() {
    // saisie.value est TOUJOURS du texte, même si on tape 42.
    // Number() le transforme en vrai nombre.
    const proposition = Number(saisie.value);

    console.log("Tu as proposé :", proposition);
}

// Quand on clique sur le bouton, on lance la fonction valider
bouton.addEventListener("click", valider);

// Triche pour tester ! À supprimer à la fin.
console.log("Réponse secrète :", vuesMystere);
```

### Ce qu'il faut retenir

- `vuesMystere` ne change pas pendant la partie → `const`.
- `addEventListener("click", ...)` veut dire : « quand on clique, exécute cette fonction ».
- Le texte et les nombres sont deux choses différentes : d'où `Number(...)`.

## 🏆 Défi

Dans la fonction `valider`, affiche la proposition **dans la page** au lieu de la console. Utilise :

```javascript
message.textContent = "Tu as proposé : " + proposition;
```

Teste : tape un nombre, clique, et vérifie que le texte apparaît sous le bouton.

➡️ Suite : [03 – Conditions](./03-conditions.md)
