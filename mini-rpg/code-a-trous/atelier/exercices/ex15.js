/* ============================================================
   Exercice 15 – Le plus gros coup
   📖 Consignes : fiche 4-tableaux.md
   ✏️ Complète, enregistre, puis recharge l'atelier (F5).
   ============================================================ */

// Les dégâts de chaque coup du combat, dans l'ordre
const coups = [12, 7, 19, 4, 15];

// ===== Partie 1 : le total des dégâts (2 trous) =====
// totalDegats(liste) renvoie la somme de toutes les cases du tableau.
function totalDegats(liste) {
    let total = 0;
    for (let i = 0; i < liste.length; i++) {
        total = total + ___;
    }
    return ___;
}

// ===== Partie 2 : le plus gros coup (sans trou) =====
// plusGrosCoup(liste) renvoie le plus grand nombre du tableau.
// Idée : on garde un « record ». On part de la première case,
// puis on regarde chaque case : si elle bat le record, elle devient le record.
function plusGrosCoup(liste) {
    let record = liste[0];

    // ✏️ Écris la boucle for et le if ici


    return record;
}

console.log("Total : " + totalDegats(coups));
console.log("Plus gros coup : " + plusGrosCoup(coups));

// ===== Partie 3 : avec Math.max (1 trou) =====
// Math.max reçoit des NOMBRES séparés par des virgules et renvoie le plus grand.
// ✏️ Complète pour obtenir le plus grand entre 12, 7 et 19.
const plusGrand = Math.max(___);
console.log("Math.max : " + plusGrand);

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("totalDegats(coups) renvoie 57", totalDegats(coups), 57);
verifier("totalDegats([5, 5]) renvoie 10", totalDegats([5, 5]), 10);
verifier("plusGrosCoup(coups) renvoie 19", plusGrosCoup(coups), 19);
verifier("plusGrosCoup([3, 8, 2]) renvoie 8", plusGrosCoup([3, 8, 2]), 8);
verifier("plusGrosCoup([40, 1]) renvoie 40", plusGrosCoup([40, 1]), 40);
verifier("Math.max donne 19", plusGrand, 19);
