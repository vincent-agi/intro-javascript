/* ============================================================
   Exercice 11 – Fonctions guidées : estVivant et etatDuHeros
   📖 Consignes : fiche 3-fonctions.md
   ✏️ Écris les 2 fonctions, enregistre, puis recharge l'atelier (F5).
   ============================================================ */

// Le gabarit d'une fonction (à recopier puis adapter) :
//
//   function nomDeLaFonction(parametre) {
//       return resultat;
//   }

// ===== Fonction 1 : estVivant =====
// Reçoit des PV (pv).
// Renvoie true si pv est plus grand que 0, sinon false.

// ✏️ Écris la fonction estVivant ici



// ===== Fonction 2 : etatDuHeros =====
// Reçoit des PV (pv). Renvoie un texte :
//   70 ou plus   → "💪 En forme"
//   30 ou plus   → "🤕 Blessé"
//   plus que 0   → "🆘 En danger"
//   sinon        → "💀 KO"
// 💡 Reprends ton if / else if / else de l'exercice 02,
//    avec un return dans chaque bloc.

// ✏️ Écris la fonction etatDuHeros ici



console.log("85 PV : " + etatDuHeros(85));
console.log("12 PV : " + etatDuHeros(12));

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("estVivant(50) renvoie true", estVivant(50), true);
verifier("estVivant(0) renvoie false", estVivant(0), false);
verifier("etatDuHeros(85) → En forme", etatDuHeros(85), "💪 En forme");
verifier("etatDuHeros(70) → En forme (70 compte !)", etatDuHeros(70), "💪 En forme");
verifier("etatDuHeros(45) → Blessé", etatDuHeros(45), "🤕 Blessé");
verifier("etatDuHeros(30) → Blessé (30 compte !)", etatDuHeros(30), "🤕 Blessé");
verifier("etatDuHeros(12) → En danger", etatDuHeros(12), "🆘 En danger");
verifier("etatDuHeros(0) → KO", etatDuHeros(0), "💀 KO");
