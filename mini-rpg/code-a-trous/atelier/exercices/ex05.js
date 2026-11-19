/* ============================================================
   Exercice 05 – Le monstre frappe 3 fois
   📖 Consignes : fiche 2-boucles.md
   ✏️ Remplace chaque ___ , enregistre, puis recharge l'atelier (F5).
   ============================================================ */

let pvHeros = 100;

// Le monstre frappe 3 fois, 10 dégâts à chaque coup.
// Résultat attendu :
//   👹 Coup n°1 : il reste 90 PV
//   👹 Coup n°2 : il reste 80 PV
//   👹 Coup n°3 : il reste 70 PV

for (let coup = ___; coup ___ 3; coup___) {
    pvHeros = pvHeros - ___;
    console.log("👹 Coup n°" + ___ + " : il reste " + pvHeros + " PV");
}

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("Après 3 coups de 10, il reste 70 PV", pvHeros, 70);
