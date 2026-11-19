/* 🔒 CORRECTION – Exercice 05 – le monstre frappe 3 fois */

let pvHeros = 100;

for (let coup = 1; coup <= 3; coup++) {
    pvHeros = pvHeros - 10;
    console.log("👹 Coup n°" + coup + " : il reste " + pvHeros + " PV");
}

verifier("Après 3 coups de 10, il reste 70 PV", pvHeros, 70);
