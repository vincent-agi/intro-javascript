/* 🔒 CORRECTION – Exercice 01 – Chasse aux bugs */

const PV_MAX = 100;
let pvHeros = 0;
let tours = 0;

console.log("Le combat commence");           // ❶ consol → console

if (pvHeros <= 0) {                           // ❷ parenthèses obligatoires après if
    console.log("💀 Le héros est KO");
}

for (let tour = 1; tour <= 3; tour++) {       // ❸ PAS de ; entre ) et {
    tours = tours + 1;
    console.log("Tour " + tour);
}

if (pvHeros === PV_MAX) {                     // ❹ === pour comparer (= range une valeur)
    console.log("❤️ Le héros est en pleine forme");
}                                             // ❺ l'accolade fermante manquante

verifier("La boucle a fait 3 tours", tours, 3);
verifier("pvHeros vaut toujours 0 (personne ne l'a modifié)", pvHeros, 0);
