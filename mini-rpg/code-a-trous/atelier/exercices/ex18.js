/* ============================================================
   Exercice 18 – Boss final : le bouton potion
   📖 Consignes : fiche 5-dom.md
   ✏️ Étape par étape : écris, enregistre, recharge (F5), vérifie.
   ============================================================ */

/* ===== L'ÉTAT DU JEU (déjà prêt) ===== */
const PV_MAX = 100;
let pvHeros = 40;
let potions = 3;
const historique = [];

/* ===== LES ÉLÉMENTS DE LA PAGE (déjà prêts) ===== */
const textePv = document.getElementById("pv-joueur");
const zoneMessage = document.getElementById("message");
const journal = document.getElementById("journal");
const boutonPotion = document.getElementById("btn-potion");

/* ===== Étape A : afficherPv() ===== */
// Écrit la valeur de pvHeros dans textePv.
// ✏️



/* ===== Étape B : ajouterEvenement(texte) ===== */
// 1. écrit texte dans zoneMessage
// 2. ajoute texte à la fin du tableau historique
// 3. vide le journal :  journal.innerHTML = "";
// 4. avec une boucle for, crée un <li> pour CHAQUE case de historique
//    et accroche-le au journal (comme dans l'exercice 17)
// ✏️



/* ===== Étape C : boirePotion() ===== */
// - s'il n'y a plus de potion        → ajouterEvenement("🎒 Plus de potion !")
// - sinon, si pvHeros vaut PV_MAX    → ajouterEvenement("❤️ Inutile, tu es en pleine forme")
// - sinon :
//      pvHeros augmente de 30 sans dépasser PV_MAX
//      potions baisse de 1
//      ajouterEvenement("🧪 Glou glou ! Il reste " + potions + " potion(s)")
// - à la fin, dans TOUS les cas : afficherPv();
// ✏️



/* ===== Étape D : relier le bouton ===== */
// Quand on clique sur boutonPotion, on lance boirePotion.
// ✏️



/* ===== LE DÉMARRAGE ===== */
afficherPv();

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes =====
   Le robot clique 5 fois sur le bouton à ta place, vérifie,
   puis remet le jeu à zéro pour que TU puisses cliquer. */
boutonPotion.click();
verifier("Clic 1 : le héros passe de 40 à 70 PV", pvHeros, 70);
verifier("Clic 1 : la page affiche 70", textePv.textContent, "70");
verifier("Clic 1 : le message", zoneMessage.textContent, "🧪 Glou glou ! Il reste 2 potion(s)");
boutonPotion.click();
verifier("Clic 2 : bloqué à 100 PV (pas 130)", pvHeros, 100);
boutonPotion.click();
verifier("Clic 3 : potion inutile", zoneMessage.textContent, "❤️ Inutile, tu es en pleine forme");
verifier("Clic 3 : la potion n'a pas été gaspillée", potions, 1);
pvHeros = 50; // le robot fait taper le héros par un monstre
boutonPotion.click();
boutonPotion.click();
verifier("Clic 5 : plus de potion", zoneMessage.textContent, "🎒 Plus de potion !");
verifier("Le journal de la page a 5 lignes", journal.children.length, 5);
// Remise à zéro
pvHeros = 40;
potions = 3;
historique.length = 0;
journal.innerHTML = "";
zoneMessage.textContent = "À toi de cliquer ! 🧪";
afficherPv();
