/* 🔒 CORRECTION – Exercice 13 – l'inventaire */

const inventaire = ["🧪 Potion", "🗡️ Épée", "🛡️ Bouclier"];

const premier = inventaire[0];
const nombreObjets = inventaire.length;          // pas de parenthèses : ce n'est pas une fonction
const dernier = inventaire[nombreObjets - 1];    // 3 objets → cases 0, 1, 2 → la dernière est 3 - 1
inventaire.push("🔑 Clé");

console.log("Premier : " + premier);
console.log("Nombre d'objets : " + nombreObjets);
console.log("Dernier : " + dernier);
console.log("Sac après la clé :", inventaire);

verifier("Premier objet", premier, "🧪 Potion");
verifier("Nombre d'objets (avant la clé)", nombreObjets, 3);
verifier("Dernier objet (avant la clé)", dernier, "🛡️ Bouclier");
verifier("Le sac contient 4 objets après la clé", inventaire.length, 4);
verifier("La clé est dans la case 3", inventaire[3], "🔑 Clé");
