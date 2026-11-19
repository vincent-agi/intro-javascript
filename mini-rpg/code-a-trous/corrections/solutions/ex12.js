/* 🔒 CORRECTION – Exercice 12 – la rafale */

function rafale(nbCoups, degatsParCoup) {
    let total = 0;

    for (let coup = 1; coup <= nbCoups; coup++) {
        total = total + degatsParCoup;
        console.log("⚔️ Coup " + coup + " : " + degatsParCoup + " dégâts");
    }

    return total;   // APRÈS la boucle, sinon on s'arrête au 1er tour
}

const totalRafale = rafale(3, 10);
console.log("Total de la rafale : " + totalRafale);

verifier("rafale(3, 10) renvoie 30", totalRafale, 30);
verifier("rafale(5, 4) renvoie 20", rafale(5, 4), 20);
verifier("rafale(0, 10) renvoie 0", rafale(0, 10), 0);
