/* 🔒 CORRECTION – Exercice 02 – if / else if / else */

let pvHeros = 45;
let etat = "";

if (pvHeros >= 70) {
    etat = "💪 En forme";
} else if (pvHeros >= 30) {
    etat = "🤕 Blessé";
} else if (pvHeros > 0) {
    etat = "🆘 En danger";
} else {
    etat = "💀 KO";
}

console.log("PV : " + pvHeros + " → " + etat);

verifier("45 PV → Blessé", etat, "🤕 Blessé");
