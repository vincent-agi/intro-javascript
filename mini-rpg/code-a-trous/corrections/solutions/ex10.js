/* 🔒 CORRECTION – Exercice 10 – soigner */

const PV_MAX = 100;

function soigner(pv, soin) {
    const total = pv + soin;
    return Math.min(PV_MAX, total);
}

let pvHeros = 50;
pvHeros = soigner(pvHeros, 30);
console.log("🧙 Le héros a " + pvHeros + " PV");

verifier("soigner(50, 30) renvoie 80", soigner(50, 30), 80);
verifier("soigner(90, 30) renvoie 100 (et pas 120)", soigner(90, 30), 100);
verifier("Le héros a 80 PV", pvHeros, 80);
