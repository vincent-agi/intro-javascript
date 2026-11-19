/* ============================================================
   Exercice 02 – if / else if / else à trous
   📖 Consignes : fiche 1-syntaxe.md
   ✏️ Remplace chaque ___ , enregistre, puis recharge l'atelier (F5).
   ============================================================ */

// L'état du héros dépend de ses PV :
//   70 ou plus   → "💪 En forme"
//   30 ou plus   → "🤕 Blessé"
//   plus que 0   → "🆘 En danger"
//   sinon        → "💀 KO"

let pvHeros = 45;
let etat = "";

// Il y a 5 trous ___ à remplir.
___ (pvHeros >= 70) {
    etat = "💪 En forme";
} ___ if (pvHeros >= 30) ___
    etat = "🤕 Blessé";
} else if (___) {
    etat = "🆘 En danger";
} ___ {
    etat = "💀 KO";
}

console.log("PV : " + pvHeros + " → " + etat);

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
// (Elles sont prévues pour pvHeros = 45. Si tu changes la valeur
//  pour tester, c'est normal que la vérification devienne rouge.)
verifier("45 PV → Blessé", etat, "🤕 Blessé");
