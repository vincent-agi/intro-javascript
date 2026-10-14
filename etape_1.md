# Étape 1 : Les Variables et la Génération Aléatoire

Bienvenue dans ce tutoriel interactif pour créer votre mini-jeu "Devine le Nombre" en JavaScript ! 

Dans cette première étape, nous allons apprendre à utiliser les **variables** (pour stocker des informations) et la fonction de **hasard** (pour que l'ordinateur choisisse un nombre secret).

---

## 1. C'est quoi une variable ?

Une variable est comme une **boîte étiquetée** dans la mémoire de l'ordinateur. On y range une valeur pour pouvoir l'utiliser, l'afficher ou la modifier plus tard.

En JavaScript, on utilise généralement deux mots-clés pour créer des variables :
* `const` (pour *constante*) : La boîte ne pourra plus changer de contenu une fois remplie.
* `let` : La boîte peut changer de contenu au cours du temps (par exemple, le nombre de tentatives qui augmente).

### Exemple concret :
```javascript
let nombreTentatives = 0; // La boîte commence à 0
nombreTentatives = 1;     // La boîte contient maintenant 1
```

---

## 2. Le Hasard en JavaScript (`Math.random`)

Pour notre jeu, l'ordinateur doit choisir un nombre mystère compris entre **0 et 100**. Les ordinateurs ne savent pas deviner naturellement, il faut donc utiliser un outil mathématique.

En JavaScript, l'objet `Math` fournit des fonctions bien pratiques :
1. `Math.random()` génère un nombre décimal aléatoire compris entre `0` (inclus) et `1` (exclus), par exemple `0.74819...`.
2. Si on multiplie ce résultat par `101`, on obtient un nombre décimal entre `0` et `100.999...`.
3. `Math.floor()` sert à supprimer la partie décimale (arrondir vers le bas) pour obtenir un **nombre entier**.

### Le code magique :
```javascript
let nombreMystere = Math.floor(Math.random() * 101);
```

---

## 🛠️ À vous de jouer ! (Exercice pratique)

Pour valider cette première étape :
1. Créez un fichier nommé `test.js` (ouvrez votre éditeur de code comme VS Code).
2. Écrivez le code ci-dessous pour initialiser vos premières variables :

```javascript
// Déclaration des variables de base
let nombreTentatives = 0;
let jeuEncours = true;

// Génération du nombre mystère entre 0 et 100
let nombreMystere = Math.floor(Math.random() * 101);

// Affichage dans la console du navigateur pour vérifier
console.log("Le jeu est prêt !");
console.log("Le nombre mystère choisi est :", nombreMystere);
```

3. Ouvrez votre console de navigateur (touche `F12` sur votre clavier, puis onglet *Console*) pour voir le résultat s'afficher.

---

## ⏭️ Prochaine étape
Une fois que vous avez compris comment stocker des informations dans des variables et générer un nombre aléatoire, vous êtes prêt pour la suite : **Lier le HTML et le JavaScript grâce au DOM !**. [Par ici](./etape_2.md)
