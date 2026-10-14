# Étape 2 : Le DOM et la Liaison HTML / JavaScript

Dans la première étape, vous avez appris à stocker des informations dans des variables et à générer un nombre aléatoire. C'est bien, mais pour l'instant, tout se passe dans l'ombre (dans la console du navigateur). 

Pour créer un véritable **jeu web**, JavaScript doit pouvoir interagir avec la page HTML visible par l'utilisateur. C'est là qu'intervient le **DOM** (*Document Object Model*).

---

## 1. C'est quoi le DOM ?

Le DOM est une représentation de votre page HTML sous forme d'arbre que le navigateur comprend. 
Lorsque la page se charge, JavaScript peut utiliser le DOM pour :
* **Lire** ce qu'un utilisateur a écrit dans un champ de texte.
* **Modifier** du texte, des couleurs ou cacher/afficher des éléments.

Pour attraper un élément HTML depuis JavaScript, on utilise généralement son identifiant unique (`id`) grâce à la fonction magique `document.getElementById()`.

---

## 2. Rappel de notre structure HTML

Dans votre fichier `index.html`, vous avez des éléments avec des `id` précis :

```html
<!-- Le champ où le joueur tape son nombre -->
<input type="number" id="user-input" min="0" max="100" placeholder="Votre nombre...">

<!-- Le bouton pour valider -->
<button id="btn-guess">Valider</button>

<!-- La zone où le message de feedback s'affiche -->
<div id="message">Faites une première proposition !</div>

<!-- Le compteur de tentatives -->
<span>Tentatives : <strong id="attempts-count">0</strong></span>
```

---

## 3. Comment capturer ces éléments en JavaScript ?

Pour que JavaScript puisse piloter ces éléments, on les stocke dans des variables de type `const` au début de votre script :

```javascript
// On attrape l'input de l'utilisateur
const inputUser = document.getElementById('user-input');

// On attrape le bouton de validation
const btnGuess = document.getElementById('btn-guess');

// On attrape la zone de texte pour les messages
const messageDiv = document.getElementById('message');

// On attrape le compteur de tentatives
const attemptsSpan = document.getElementById('attempts-count');
```

---

## 4. Comment modifier le HTML depuis JavaScript ?

Une fois que vous avez capturé un élément dans une variable, vous pouvez interagir avec lui :

* **Lire ou modifier du texte** avec `.textContent` :
  ```javascript
  // Change le texte du message à l'écran
  messageDiv.textContent = "C'est parti, devinez le nombre !";
  ```

* **Lire ou modifier une valeur saisie** avec `.value` :
  ```javascript
  // Récupère ce que le joueur a tapé dans l'input
  let valeurTapee = inputUser.value;
  ```

* **Modifier le style (les couleurs, etc.)** avec `.style` :
  ```javascript
  // Change la couleur du texte en bleu
  messageDiv.style.color = "#38bdf8";
  ```

---

## 🛠️ À vous de jouer ! (Exercice pratique)

Pour tester cette étape :

1. Ouvrez votre fichier `script.js`.
2. Ajoutez la capture des éléments du DOM comme vu ci-dessus.
3. Testez à l'intérieur de votre code de modifier un texte ou d'afficher dans la console la valeur de l'input :
   ```javascript
   console.log("Élément input récupéré :", inputUser);
   ```

## ⏭️ Prochaine étape

Maintenant que vous savez comment récupérer et modifier les éléments de votre page web, vous allez apprendre à réagir aux actions du joueur grâce aux **Événements (Events)** et aux **Fonctions** [Par ici la suite](./etape_3.md) !
