/* 🔒 CORRECTION – Exercice 14 – parcourir l'inventaire */

const inventaire = ["🧪 Potion", "🗡️ Épée", "🛡️ Bouclier", "🧪 Potion", "🔑 Clé"];

let lignesAffichees = 0;
for (let i = 0; i < inventaire.length; i++) {
    console.log((i + 1) + ". " + inventaire[i]);
    lignesAffichees = lignesAffichees + 1;
}

let nbPotions = 0;
for (let i = 0; i < inventaire.length; i++) {
    if (inventaire[i] === "🧪 Potion") {
        nbPotions = nbPotions + 1;
    }
}

console.log("Potions dans le sac : " + nbPotions);

verifier("Les 5 objets sont affichés", lignesAffichees, 5);
verifier("Il y a 2 potions dans le sac", nbPotions, 2);
