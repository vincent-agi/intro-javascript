/* ============================================================
   Exercice 14 – Parcourir l'inventaire
   📖 Consignes : fiche 4-tableaux.md
   ✏️ Complète, enregistre, puis recharge l'atelier (F5).
   ============================================================ */

const inventaire = ["🧪 Potion", "🗡️ Épée", "🛡️ Bouclier", "🧪 Potion", "🔑 Clé"];

// ===== Partie 1 : afficher le sac (4 trous) =====
// Résultat attendu :
//   1. 🧪 Potion
//   2. 🗡️ Épée
//   3. 🛡️ Bouclier
//   4. 🧪 Potion
//   5. 🔑 Clé

let lignesAffichees = 0;
for (let i = ___; i ___ inventaire.___; i++) {
    console.log((i + 1) + ". " + inventaire[___]);
    lignesAffichees = lignesAffichees + 1;
}

// ===== Partie 2 : compter les potions (sans trou) =====
// ✏️ Écris une boucle for qui passe sur CHAQUE case du sac.
//    Si la case vaut "🧪 Potion", ajoute 1 à nbPotions.

let nbPotions = 0;



console.log("Potions dans le sac : " + nbPotions);

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("Les 5 objets sont affichés", lignesAffichees, 5);
verifier("Il y a 2 potions dans le sac", nbPotions, 2);
