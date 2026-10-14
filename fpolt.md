# Correction

Code corrigé et commenté

Pour voir directement le projet : [jsfiddle](https://jsfiddle.net/svwyotu5/)

```javascript
/* --- JAVASCRIPT : Le script complet du jeu --- */

// 1. DÉCLARATION DES VARIABLES
let nombreMystere;       // Le nombre à deviner (généré aléatoirement)
let nombreTentatives = 0; // Compteur de coups joués
let jeuEncours = true;    // État de la partie (true = en cours, false = terminée)

// 2. SÉLECTION DES ÉLÉMENTS DU DOM (Interface HTML)
const inputUser = document.getElementById('user-input');
const btnGuess = document.getElementById('btn-guess');
const messageDiv = document.getElementById('message');
const attemptsSpan = document.getElementById('attempts-count');
const btnRestart = document.getElementById('btn-restart');
const gameControls = document.getElementById('game-controls');

// Initialise ou réinitialise une nouvelle partie
function initialiserJeu() {
    nombreMystere = Math.floor(Math.random() * 101); // Nombre aléatoire entre 0 et 100
    nombreTentatives = 0;
    jeuEncours = true;

    // Réinitialisation de l'affichage et des contrôles
    attemptsSpan.textContent = nombreTentatives;
    messageDiv.textContent = "C'est parti ! Entrez un nombre ci-dessus.";
    messageDiv.style.color = "#f8fafc";
    inputUser.value = "";
    inputUser.disabled = false;
    btnGuess.disabled = false;
    gameControls.classList.remove('hidden');
    btnRestart.classList.add('hidden');
    
    console.log("Mode triche - Le nombre mystère est :", nombreMystere);
}

// Vérifie la proposition du joueur à chaque essai
function verifierProposition() {
    if (!jeuEncours) return; // Bloque l'action si la partie est finie

    const valeurSaisie = inputUser.value;

    // Vérifie si le champ est vide
    if (valeurSaisie === "") {
        messageDiv.textContent = "Veuillez entrer un nombre valide !";
        messageDiv.style.color = "#fca5a5";
        return;
    }

    const nombreUtilisateur = parseInt(valeurSaisie, 10);

    // Vérifie si le nombre est bien dans la plage autorisée [0-100]
    if (nombreUtilisateur < 0 || nombreUtilisateur > 100) {
        messageDiv.textContent = "Le nombre doit être compris entre 0 et 100 !";
        messageDiv.style.color = "#fca5a5";
        return;
    }

    // Incrémente le compteur de tentatives
    nombreTentatives++;
    attemptsSpan.textContent = nombreTentatives;

    // Analyse de la proposition par rapport au nombre mystère
    if (nombreUtilisateur > nombreMystere) {
        messageDiv.textContent = "C'est moins ! Le nombre mystère est plus petit.";
        messageDiv.style.color = "#38bdf8";
    } 
    else if (nombreUtilisateur < nombreMystere) {
        messageDiv.textContent = "C'est plus ! Le nombre mystère est plus grand.";
        messageDiv.style.color = "#38bdf8";
    } 
    else {
        messageDiv.textContent = `🎉 Bravo ! Vous avez gagné en ${nombreTentatives} tentative(s) !`;
        messageDiv.style.color = "#4ade80";
        terminerJeu(); // Déclenche la fin de partie en cas de victoire
    }

    inputUser.value = ""; // Vide le champ de saisie
    inputUser.focus();    // Remet le curseur dedans
}

// Gère l'état de fin de partie (désactive les champs, affiche le bouton rejouer)
function terminerJeu() {
    jeuEncours = false;
    inputUser.disabled = true;
    btnGuess.disabled = true;
    gameControls.classList.add('hidden');
    btnRestart.classList.remove('hidden');
}

// 4. ÉCOUTEURS D'ÉVÉNEMENTS
btnGuess.addEventListener('click', verifierProposition);

// Permet de valider avec la touche "Entrée" du clavier
inputUser.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        verifierProposition();
    }
});

btnRestart.addEventListener('click', initialiserJeu);

// Lancement automatique de la première partie au chargement de la page
initialiserJeu();
```
