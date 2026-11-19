/* 🔒 CORRECTION – Exercice 16 – parler à la page */

const zoneMessage = document.getElementById("message");
zoneMessage.textContent = "⚔️ Un slime sauvage apparaît !";

const textePv = document.getElementById("pv-joueur");
textePv.textContent = 75;

let pvHeros = 75;
pvHeros = pvHeros - 20;
textePv.textContent = pvHeros;

verifier("Le message est affiché sur la page",
    document.getElementById("message").textContent, "⚔️ Un slime sauvage apparaît !");
verifier("La page affiche 55 PV",
    document.getElementById("pv-joueur").textContent, "55");
