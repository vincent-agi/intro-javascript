/* ============================================================
   Exercice 07 – Les boucles cassées
   📖 Consignes : fiche 2-boucles.md
   ✏️ Répare les 3 boucles, enregistre, puis recharge l'atelier (F5).
   ============================================================ */

// ===== Bug A =====
// But : compter 5 tours de combat.
let toursA = 0;
for (let i = 1; i <= 5; i++); {
    toursA = toursA + 1;
}
console.log("Bug A : " + toursA + " tour(s) compté(s)");

// ===== Bug B =====
// But : ouvrir les 5 coffres, numérotés de 1 à 5.
let coffresOuverts = 0;
for (let numero = 1; numero < 5; numero++) {
    coffresOuverts = coffresOuverts + 1;
    console.log("📦 Coffre n°" + numero + " ouvert");
}

// ===== Bug C =====
// But : afficher 3 fois "⚔️ Attaque !"
let attaques = 0;
for (let i = 0; i < 3; i++ {
    attaques = attaques + 1;
    console.log("⚔️ Attaque !");
}

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("Bug A : 5 tours comptés", toursA, 5);
verifier("Bug B : 5 coffres ouverts", coffresOuverts, 5);
verifier("Bug C : 3 attaques", attaques, 3);
