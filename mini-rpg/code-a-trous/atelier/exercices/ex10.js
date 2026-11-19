/* ============================================================
   Exercice 10 – Fonction à trous : soigner
   📖 Consignes : fiche 3-fonctions.md
   ✏️ Remplace chaque ___ , enregistre, puis recharge l'atelier (F5).
   ============================================================ */

const PV_MAX = 100;

// Cette fonction REÇOIT :
//   - pv   : les PV du héros
//   - soin : combien de PV la potion rend
// Elle RENVOIE les nouveaux PV, sans jamais dépasser PV_MAX.

function soigner(pv, soin) {
    const total = ___ + ___;
    return Math.___(PV_MAX, total);
}

let pvHeros = 50;
pvHeros = ___(pvHeros, 30);   // le héros boit une potion de 30
console.log("🧙 Le héros a " + pvHeros + " PV");

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("soigner(50, 30) renvoie 80", soigner(50, 30), 80);
verifier("soigner(90, 30) renvoie 100 (et pas 120)", soigner(90, 30), 100);
verifier("Le héros a 80 PV", pvHeros, 80);
