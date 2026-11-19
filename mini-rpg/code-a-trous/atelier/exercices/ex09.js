/* ============================================================
   Exercice 09 – Fonction à trous : infligerDegats
   📖 Consignes : fiche 3-fonctions.md
   ✏️ Remplace chaque ___ , enregistre, puis recharge l'atelier (F5).
   ============================================================ */

// Cette fonction REÇOIT deux informations :
//   - pv     : les PV du combattant
//   - degats : les dégâts qu'il prend
// Elle RENVOIE les PV qui restent, sans jamais descendre sous 0.

function infligerDegats(___, ___) {
    const reste = pv - degats;
    ___ Math.max(0, reste);
}

let pvMonstre = 80;
pvMonstre = infligerDegats(pvMonstre, ___);   // le héros frappe de 25
console.log("👹 Le monstre a " + pvMonstre + " PV");

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("infligerDegats(100, 30) renvoie 70", infligerDegats(100, 30), 70);
verifier("infligerDegats(20, 50) renvoie 0 (et pas -30)", infligerDegats(20, 50), 0);
verifier("Le monstre a 55 PV", pvMonstre, 55);
