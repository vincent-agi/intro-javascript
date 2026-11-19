/* ============================================================
   Exercice 13 – L'inventaire
   📖 Consignes : fiche 4-tableaux.md
   ✏️ Remplace chaque ___ , enregistre, puis recharge l'atelier (F5).
   ============================================================ */

const inventaire = ["🧪 Potion", "🗡️ Épée", "🛡️ Bouclier"];
//                    case 0        case 1      case 2

// 1. Le PREMIER objet du sac
const premier = inventaire[___];

// 2. Le NOMBRE d'objets dans le sac (sans compter à la main !)
const nombreObjets = inventaire.___;

// 3. Le DERNIER objet, en utilisant nombreObjets (pas le chiffre 2 directement)
const dernier = inventaire[___];

// 4. Ajoute "🔑 Clé" à la fin du sac
inventaire.___("🔑 Clé");

console.log("Premier : " + premier);
console.log("Nombre d'objets : " + nombreObjets);
console.log("Dernier : " + dernier);
console.log("Sac après la clé :", inventaire);

// ⬆️ Fin de ton code ⬆️

/* ===== 🔒 VÉRIFICATIONS : ne touche pas à ces lignes ===== */
verifier("Premier objet", premier, "🧪 Potion");
verifier("Nombre d'objets (avant la clé)", nombreObjets, 3);
verifier("Dernier objet (avant la clé)", dernier, "🛡️ Bouclier");
verifier("Le sac contient 4 objets après la clé", inventaire.length, 4);
verifier("La clé est dans la case 3", inventaire[3], "🔑 Clé");
