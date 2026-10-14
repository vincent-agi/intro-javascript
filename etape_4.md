# Étape 4 : Les Conditions (`if / else`) - Le Cerveau du Jeu

Dans cette étape, nous allons aborder l'élément le plus important pour donner de l'intelligence à votre programme : **les structures conditionnelles**.

---

## 🎯 Objectif de cette étape
Apprendre à prendre des décisions en fonction de la valeur entrée par le joueur :
* Est-ce que le nombre est **plus grand** que le nombre mystère ?
* Est-ce qu'il est **plus petit** ?
* Est-ce qu'il est **exactement égal** (le joueur a gagné) ?

---

## 🧠 Qu'est-ce qu'une condition ?

Une condition fonctionne comme un aiguillage sur une voie ferrée :
* Si une affirmation est **vraie (`true`)**, le programme exécute un bloc de code.
* Si elle est **fausse (`false`)**, le programme passe au suivant (ou ne fait rien).

En JavaScript, on utilise la syntaxe suivante :
```javascript
if (condition1) {
    // Code exécuté si la condition 1 est vraie
} else if (condition2) {
    // Code exécuté si la condition 2 est vraie
} else {
    // Code exécuté si aucune des conditions précédentes n'est vraie
}
```

## 💻 Implémentation dans notre jeu
Voici comment appliquer les conditions pour répondre aux règles du jeu (comparer les nombres et afficher le bon message) :

```javascript
function verifierProposition() {
    // 1. Récupérer la valeur et la convertir en nombre entier
    const valeurSaisie = inputUser.value;
    const nombreUtilisateur = parseInt(valeurSaisie, 10);

    // 2. Vérification de sécurité (si le champ est vide ou invalide)
    if (isNaN(nombreUtilisateur) || nombreUtilisateur < 0 || nombreUtilisateur > 100) {
        messageDiv.textContent = "⚠️ Veuillez entrer un nombre valide entre 0 et 100.";
        messageDiv.style.color = "#fca5a5"; // Rouge clair
        return; // On arrête l'exécution de la fonction ici
    }

    // 3. Incrémenter le compteur de tentatives
    nombreTentatives++;
    attemptsSpan.textContent = nombreTentatives;

    // 4. STRUCTURES CONDITIONNELLES : La comparaison
    if (nombreUtilisateur > nombreMystere) {
        // Le nombre du joueur est trop grand
        messageDiv.textContent = "📉 C'est moins ! Le nombre mystère est plus petit.";
        messageDiv.style.color = "#38bdf8"; // Bleu
    } 
    else if (nombreUtilisateur < nombreMystere) {
        // Le nombre du joueur est trop petit
        messageDiv.textContent = "📈 C'est plus ! Le nombre mystère est plus grand.";
        messageDiv.style.color = "#38bdf8"; // Bleu
    } 
    else {
        // Le nombre mystère et le nombre utilisateur sont identiques : VICTOIRE !
        messageDiv.textContent = `🎉 Bravo ! Vous avez trouvé le nombre en ${nombreTentatives} tentative(s) !`;
        messageDiv.style.color = "#4ade80"; // Vert
        
        // On appelle une fonction pour terminer le jeu
        terminerJeu();
    }

    // Vider le champ de saisie pour le coup suivant
    inputUser.value = "";
    inputUser.focus();
}
```

## 🔍 Décryptage du code :

- isNaN(nombreUtilisateur) : Vérifie si ce que l'utilisateur a entré n'est pas un nombre (Not-a-Number).
- > et < : Les opérateurs de comparaison stricts.
- === : L'opérateur d'égalité stricte (compare à la fois la valeur et le type). Attention : en programmation, = sert à assigner une variable, tandis que === sert à comparer.
- return; : Permet de stopper net la fonction si la saisie est incorrecte, pour éviter de compter une tentative inutile.

Alors ? C'est super ? On continu [par ici](./etape_5.md)
