/* ============================================================
   Exercice 17 – Remplir la liste
   📖 Consignes : fiche 5-dom.md
   ✏️ Complète, enregistre, puis recharge l'atelier (F5).
   ============================================================ */

const inventaire = ["🧪 Potion", "🗡️ Épée", "🛡️ Bouclier"];

// ✏️ Partie 2 (après avoir réussi la partie 1) :
//    ICI, avant la boucle, ajoute "🔑 Clé" au tableau inventaire avec push.


// La liste <ul id="inventaire"> de la page
const liste = document.getElementById("inventaire");

// ===== Partie 1 (3 trous) =====
// Pour CHAQUE objet du sac : on fabrique une ligne <li>, puis on l'accroche à la liste.
for (let i = 0; i < inventaire.length; i++) {
    const ligne = document.___("li");      // 1. fabrique une ligne vide
    ligne.textContent = inventaire[___];   // 2. met le nom de l'objet dedans
    liste.___(ligne);                      // 3. accroche la ligne à la liste
}

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
const lignesDeLaPage = document.getElementById("inventaire").children;
verifier("La 1re ligne de la page est la potion", lignesDeLaPage[0].textContent, "🧪 Potion");
verifier("La page affiche 4 objets (avec la clé)", lignesDeLaPage.length, 4);
