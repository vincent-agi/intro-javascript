/* 🔒 CORRECTION – Exercice 09 – infligerDegats */

function infligerDegats(pv, degats) {
    const reste = pv - degats;
    return Math.max(0, reste);
}

let pvMonstre = 80;
pvMonstre = infligerDegats(pvMonstre, 25);
console.log("👹 Le monstre a " + pvMonstre + " PV");

verifier("infligerDegats(100, 30) renvoie 70", infligerDegats(100, 30), 70);
verifier("infligerDegats(20, 50) renvoie 0 (et pas -30)", infligerDegats(20, 50), 0);
verifier("Le monstre a 55 PV", pvMonstre, 55);
