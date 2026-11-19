/* ============================================================
   Exercice 16 – Parler à la page
   📖 Consignes : fiche 5-dom.md
   ✏️ Complète, enregistre, puis recharge l'atelier (F5).
   ============================================================ */

// La page de l'atelier contient (cadre vert en haut) :
//   <span id="pv-joueur">100</span>
//   <p id="message">Le héros attend tes ordres...</p>
//
// La recette, toujours en 2 temps :
//   1. RETROUVER l'élément : const nom = document.getElementById("son-id");
//   2. CHANGER son texte   : nom.textContent = "nouveau texte";

// 1. Retrouve le paragraphe du message
const zoneMessage = document.___("message");

// 2. Change son texte
zoneMessage.___ = "⚔️ Un slime sauvage apparaît !";

// 3. Retrouve le texte des PV (son id : pv-joueur)
const textePv = document.getElementById(___);

// 4. Affiche 75 dans le texte des PV
textePv.textContent = ___;

// 5. ✏️ À toi, sans trou : le héros prend 20 dégâts.
//    - crée une variable pvHeros qui vaut 75
//    - enlève-lui 20
//    - affiche la nouvelle valeur dans textePv



// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("Le message est affiché sur la page",
    document.getElementById("message").textContent, "⚔️ Un slime sauvage apparaît !");
verifier("La page affiche 55 PV",
    document.getElementById("pv-joueur").textContent, "55");
