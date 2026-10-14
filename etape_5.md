# Étape 5 : La Boucle Événementielle et assemblage final

Dans cette dernière étape, nous allons voir comment fonctionne la répétition dans un jeu web (la boucle de jeu) et assembler tous les morceaux pour que l'application soit 100 % fonctionnelle.

---

## 🎯 Objectif de cette étape
1. Comprendre la différence entre une boucle classique (*while* / *for*) et la boucle **événementielle** du web.
2. Gérer la fin de partie et le bouton de redémarrage.
3. Assembler le code complet du fichier `script.js`.

---

## 🔄 Qu'est-ce qu'une boucle événementielle ?

* **En programmation textuelle classique :** On utilise souvent une boucle `while` (tant que) qui bloque l'écran jusqu'à ce que le joueur trouve la solution.
* **Sur le Web (JavaScript) :** Le navigateur ne doit jamais se bloquer, sinon la page "gèle". La boucle est dite **événementielle** : le programme reste inactif et attend l'action du joueur (le clic ou l'appui sur "Entrée"). Chaque tentative agit comme une **itération** de la partie. Le joueur continue d'essayer tant que la condition de victoire n'est pas remplie.

---

## 🛑 Gérer l'état de la partie (`jeuEncours`)

Pour empêcher le joueur de continuer à jouer une fois qu'il a gagné, on utilise une variable d'état booléenne (`true` ou `false`) :

```javascript
// Fonction pour gérer la fin de partie
function terminerJeu() {
    jeuEncours = false; // On stoppe la boucle de jeu
    inputUser.disabled = true; // On désactive le champ de texte
    btnGuess.disabled = true; // On désactive le bouton Valider
    btnRestart.classList.remove('hidden'); // On affiche le bouton "Rejouer"
}
```

Et au début de la fonction de vérification, on ajoute une sécurité :

```javascript
if (!jeuEncours) return; // Si le jeu est fini, on sort immédiatement de la fonction
```

Alors ? Tu as réussi ? :) Va voir le code complet et commenté au besoin juste [ici](./fpolt.md) 
