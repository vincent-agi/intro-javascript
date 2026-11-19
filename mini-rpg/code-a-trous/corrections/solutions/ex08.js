/* 🔒 CORRECTION – Exercice 08 – démonte la fonction */

function calculerDegats(force, bonus) {
    const total = force + bonus;
    return total;
}

const coup1 = calculerDegats(10, 5);
const coup2 = calculerDegats(7, 0);

console.log("Coup 1 : " + coup1);
console.log("Coup 2 : " + coup2);

const coup3 = calculerDegats(20, 3);
console.log("Coup 3 : " + coup3);

verifier("coup1 vaut 15", coup1, 15);
verifier("coup3 vaut 23", coup3, 23);
