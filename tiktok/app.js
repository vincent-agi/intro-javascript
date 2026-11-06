/* ===== 1. LES VARIABLES ===== */

// Nombre de vues à deviner : entier au hasard entre 0 et 1000
const vuesMystere = Math.floor(Math.random() * 1001);

// Tableau qui garde tous les essais du joueur
const historique = [];

/* ===== 2. LES ÉLÉMENTS DE LA PAGE (DOM) ===== */

const saisie = document.getElementById("saisie");       // champ de texte
const bouton = document.getElementById("valider");      // bouton Valider
const message = document.getElementById("message");     // zone de réponse
const liste = document.getElementById("historique");    // liste des essais

/* ===== 3. LES FONCTIONS ===== */

// Affiche tous les essais du tableau dans la page
function afficherHistorique() {
    liste.innerHTML = ""; // on repart d'une liste vide

    // Boucle : une ligne <li> par essai
    for (let i = 0; i < historique.length; i++) {
        const ligne = document.createElement("li");
        ligne.textContent = "Essai " + (i + 1) + " : " + historique[i];
        liste.appendChild(ligne);
    }
}

// Appelée à chaque clic sur « Valider »
function valider() {
    // Si le champ est vide, on prévient et on s'arrête
    if (saisie.value === "") {
        message.textContent = "⚠️ Entre un nombre d'abord !";
        return;
    }

    // On transforme le texte saisi en vrai nombre
    const proposition = Number(saisie.value);

    // On mémorise l'essai et on met l'historique à jour
    historique.push(proposition);
    afficherHistorique();

    // On compare la proposition au nombre mystère
    if (proposition < vuesMystere) {
        message.textContent = "📈 Plus ! Il y a eu plus de vues.";
    } else if (proposition > vuesMystere) {
        message.textContent = "📉 Moins ! Il y a eu moins de vues.";
    } else {
        message.textContent = "🎉 Bravo ! C'était " + vuesMystere + " vues !";
    }

    // On vide le champ pour l'essai suivant
    saisie.value = "";
}

/* ===== 4. LES ÉVÉNEMENTS ===== */

// Clic sur le bouton → on valide
bouton.addEventListener("click", valider);
