/* 🔒 CORRECTION – Exercice 03 – la potion */

const PV_MAX = 100;
let pvHeros = 80;
let potions = 2;
let message = "";

if (potions === 0) {
    message = "🎒 Plus de potion !";
} else if (pvHeros === PV_MAX) {
    message = "❤️ Inutile, tu es en pleine forme";
} else {
    // Math.min garde le plus PETIT des deux : 110 → 100
    pvHeros = Math.min(PV_MAX, pvHeros + 30);
    potions = potions - 1;
    message = "🧪 Glou glou ! +30 PV";
}

console.log(message);
console.log("PV : " + pvHeros + " | potions : " + potions);

verifier("Le message est le bon", message, "🧪 Glou glou ! +30 PV");
verifier("pvHeros ne dépasse pas 100", pvHeros, 100);
verifier("Il reste 1 potion", potions, 1);
