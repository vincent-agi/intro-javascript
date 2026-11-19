/* ============================================================
   Exercice 01 – Chasse aux bugs
   📖 Consignes : fiche 1-syntaxe.md
   ✏️ Modifie ce fichier, enregistre, puis recharge l'atelier (F5).
   ============================================================ */

// ⚠️ Ce code contient 5 erreurs. Corrige-les UNE PAR UNE :
// l'atelier te montre la première erreur trouvée, tu la corriges,
// tu recharges, et tu passes à la suivante.
//
// Résultat attendu à l'écran :
//   Le combat commence
//   💀 Le héros est KO
//   Tour 1
//   Tour 2
//   Tour 3

const PV_MAX = 100;
let pvHeros = 0;
let tours = 0;

consol.log("Le combat commence");

if pvHeros <= 0 {
    console.log("💀 Le héros est KO");
}

for (let tour = 1; tour <= 3; tour++); {
    tours = tours + 1;
    console.log("Tour " + tour);
}

if (pvHeros = PV_MAX) {
    console.log("❤️ Le héros est en pleine forme");

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("La boucle a fait 3 tours", tours, 3);
verifier("pvHeros vaut toujours 0 (personne ne l'a modifié)", pvHeros, 0);
