/* 🔒 CORRECTION – Exercice 15 – le plus gros coup */

const coups = [12, 7, 19, 4, 15];

function totalDegats(liste) {
    let total = 0;
    for (let i = 0; i < liste.length; i++) {
        total = total + liste[i];
    }
    return total;
}

function plusGrosCoup(liste) {
    let record = liste[0];

    for (let i = 0; i < liste.length; i++) {
        if (liste[i] > record) {
            record = liste[i];
        }
    }

    return record;
}

console.log("Total : " + totalDegats(coups));
console.log("Plus gros coup : " + plusGrosCoup(coups));

const plusGrand = Math.max(12, 7, 19);
console.log("Math.max : " + plusGrand);

verifier("totalDegats(coups) renvoie 57", totalDegats(coups), 57);
verifier("totalDegats([5, 5]) renvoie 10", totalDegats([5, 5]), 10);
verifier("plusGrosCoup(coups) renvoie 19", plusGrosCoup(coups), 19);
verifier("plusGrosCoup([3, 8, 2]) renvoie 8", plusGrosCoup([3, 8, 2]), 8);
verifier("plusGrosCoup([40, 1]) renvoie 40", plusGrosCoup([40, 1]), 40);
verifier("Math.max donne 19", plusGrand, 19);
