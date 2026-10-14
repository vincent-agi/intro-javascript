# Étape 3 : Les Fonctions et les Événements (*Events*)

Dans les étapes précédentes, vous avez appris à stocker des informations (les variables) et à faire dialoguer JavaScript avec la page HTML (le DOM).

Maintenant, nous allons voir comment faire réagir votre page lorsque le joueur interagit avec elle. C'est le rôle des **fonctions** et des **écouteurs d'événements**.

## 1. C'est quoi une fonction ?

Une fonction est un **bloc de code réutilisable** qui réalise une tâche précise. Au lieu d'écrire 10 lignes de code à chaque fois que vous en avez besoin, vous les regroupez dans une fonction, et il vous suffit de l'appeler par son nom pour qu'elle s'exécute.

### Exemple de syntaxe :

```
// Déclaration de la fonction
function direBonjour() {
    console.log("Bonjour, bienvenue dans le jeu !");
}

// Appel de la fonction pour l'exécuter
direBonjour();

```

## 2. C'est quoi un Événement (*Event*) ?

Un événement est un signal envoyé par le navigateur lorsqu'une action se produit (par exemple : un clic de souris, l'appui sur une touche du clavier, le chargement de la page).

Pour intercepter ces actions, JavaScript utilise des **écouteurs d'événements** (`addEventListener`). C'est un peu comme un "gardien" qui attend qu'une action précise se produise pour déclencher une fonction.

### Exemple concret avec notre bouton "Valider" :

```
// On récupère le bouton dans le DOM
const btnGuess = document.getElementById('btn-guess');

// On écoute le clic de souris sur ce bouton
btnGuess.addEventListener('click', function() {
    console.log("Le joueur a cliqué sur le bouton Valider !");
});

```

## 3. Combiner les deux pour le jeu

Dans notre mini-jeu, nous allons créer une fonction principale appelée `verifierProposition()` qui se lancera soit quand on clique sur le bouton, soit quand on appuie sur la touche *Entrée* du clavier.

```
// 1. Déclaration de la fonction qui gérera l'action
function verifierProposition() {
    console.log("La fonction de vérification est lancée !");
}

// 2. Écouteur sur le clic du bouton
btnGuess.addEventListener('click', verifierProposition);

// 3. Écouteur sur la touche "Entrée" du clavier dans l'input
inputUser.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        verifierProposition();
    }
});

```

## 🛠️ À vous de jouer ! (Exercice pratique)

1. Ouvrez votre fichier `script.js`.

2. Ajoutez une fonction simple qui affiche un message dans la console lorsque vous cliquez sur votre bouton.

3. Testez l'interaction dans votre navigateur en ouvrant la console (`F12`).

## ⏭️ Prochaine étape

Vous savez maintenant capter les actions du joueur ! Il ne vous reste plus qu'à écrire le cœur intelligent du jeu : **les conditions (`if / else`)** pour comparer le nombre du joueur au nombre mystère ! [Par ici la suite](./etape_4.md)
