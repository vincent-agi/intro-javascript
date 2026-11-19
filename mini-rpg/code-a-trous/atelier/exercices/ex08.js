/* ============================================================
   Exercice 08 – Démonte la fonction
   📖 Consignes : fiche 3-fonctions.md
   ⚠️ Réponds d'abord aux questions de la fiche SUR PAPIER,
   puis seulement ensuite, lance et fais l'étape 3.
   ============================================================ */

function calculerDegats(force, bonus) {
    const total = force + bonus;
    return total;
}

const coup1 = calculerDegats(10, 5);
const coup2 = calculerDegats(7, 0);

console.log("Coup 1 : " + coup1);
console.log("Coup 2 : " + coup2);

// ✏️ Étape 3 : crée une variable coup3 qui vaut calculerDegats
//    avec une force de 20 et un bonus de 3,
//    puis affiche-la avec console.log, comme les deux autres.



// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("coup1 vaut 15", coup1, 15);
verifier("coup3 vaut 23", coup3, 23);
