/* ============================================================
   Exercice 06 – Régénération et compte à rebours
   📖 Consignes : fiche 2-boucles.md
   ✏️ Écris tes boucles, enregistre, puis recharge l'atelier (F5).
   ============================================================ */

// ===== Partie 1 : la régénération =====
// Le héros a 50 PV. Pendant 4 tours, il récupère 5 PV par tour.
// Résultat attendu :
//   💚 Tour 1 : 55 PV
//   💚 Tour 2 : 60 PV
//   💚 Tour 3 : 65 PV
//   💚 Tour 4 : 70 PV

let pvHeros = 50;

// ✏️ Écris ta boucle for ici (un tour de jeu = un passage dans la boucle)



// ===== Partie 2 : le compte à rebours =====
// Résultat attendu :
//   🔥 Le sort explose dans 3...
//   🔥 Le sort explose dans 2...
//   🔥 Le sort explose dans 1...
//   💥 BOUM !

let nbAffichages = 0; // ← dans ta boucle, ajoute 1 à nbAffichages à chaque passage

// ✏️ Écris ta boucle for ici (elle compte à l'envers : i-- au lieu de i++)
//    puis, APRÈS la boucle, affiche "💥 BOUM !"



// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("Après 4 tours, le héros a 70 PV", pvHeros, 70);
verifier("Le compte à rebours passe 3 fois dans la boucle", nbAffichages, 3);
