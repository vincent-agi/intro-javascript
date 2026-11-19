/* ============================================================
   Exercice 12 – Fonction + boucle : la rafale
   📖 Consignes : fiche 3-fonctions.md
   ✏️ Complète la fonction, enregistre, puis recharge l'atelier (F5).
   ============================================================ */

// rafale(nbCoups, degatsParCoup) : le héros frappe plusieurs fois d'affilée.
//   - elle AFFICHE chaque coup :  "⚔️ Coup 1 : 10 dégâts"
//   - elle RENVOIE le total des dégâts.
// Exemple : rafale(3, 10) affiche 3 lignes et renvoie 30.

function rafale(nbCoups, degatsParCoup) {
    let total = 0;

    // ✏️ Étape 1 : une boucle for qui fait nbCoups tours (de 1 à nbCoups)
    // ✏️ Étape 2 : DANS la boucle, ajoute degatsParCoup à total
    // ✏️ Étape 3 : DANS la boucle, affiche le coup avec console.log



    // ✏️ Étape 4 : APRÈS la boucle, renvoie total

}

const totalRafale = rafale(3, 10);
console.log("Total de la rafale : " + totalRafale);

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
// (Les vérifications rappellent rafale : c'est normal de voir d'autres coups s'afficher.)
verifier("rafale(3, 10) renvoie 30", totalRafale, 30);
verifier("rafale(5, 4) renvoie 20", rafale(5, 4), 20);
verifier("rafale(0, 10) renvoie 0", rafale(0, 10), 0);
