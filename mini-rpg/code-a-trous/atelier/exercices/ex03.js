/* ============================================================
   Exercice 03 – Écris ta condition : la potion
   📖 Consignes : fiche 1-syntaxe.md
   ✏️ Écris ton code, enregistre, puis recharge l'atelier (F5).
   ============================================================ */

const PV_MAX = 100;
let pvHeros = 80;
let potions = 2;
let message = "";

// ✏️ À toi ! Écris UN if / else if / else :
//
//  1. s'il n'y a plus de potion (potions vaut 0)
//        → message = "🎒 Plus de potion !"
//
//  2. sinon, si le héros a déjà tous ses PV (pvHeros vaut PV_MAX)
//        → message = "❤️ Inutile, tu es en pleine forme"
//
//  3. sinon, le héros boit la potion :
//        → pvHeros augmente de 30, SANS dépasser PV_MAX
//        → potions baisse de 1
//        → message = "🧪 Glou glou ! +30 PV"




console.log(message);
console.log("PV : " + pvHeros + " | potions : " + potions);

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("Le message est le bon", message, "🧪 Glou glou ! +30 PV");
verifier("pvHeros ne dépasse pas 100", pvHeros, 100);
verifier("Il reste 1 potion", potions, 1);
