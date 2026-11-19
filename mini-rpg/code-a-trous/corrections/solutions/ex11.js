/* 🔒 CORRECTION – Exercice 11 – estVivant et etatDuHeros */

function estVivant(pv) {
    return pv > 0;   // une comparaison donne directement true ou false
}

function etatDuHeros(pv) {
    if (pv >= 70) {
        return "💪 En forme";
    } else if (pv >= 30) {
        return "🤕 Blessé";
    } else if (pv > 0) {
        return "🆘 En danger";
    } else {
        return "💀 KO";
    }
}

console.log("85 PV : " + etatDuHeros(85));
console.log("12 PV : " + etatDuHeros(12));

verifier("estVivant(50) renvoie true", estVivant(50), true);
verifier("estVivant(0) renvoie false", estVivant(0), false);
verifier("etatDuHeros(85) → En forme", etatDuHeros(85), "💪 En forme");
verifier("etatDuHeros(70) → En forme (70 compte !)", etatDuHeros(70), "💪 En forme");
verifier("etatDuHeros(45) → Blessé", etatDuHeros(45), "🤕 Blessé");
verifier("etatDuHeros(30) → Blessé (30 compte !)", etatDuHeros(30), "🤕 Blessé");
verifier("etatDuHeros(12) → En danger", etatDuHeros(12), "🆘 En danger");
verifier("etatDuHeros(0) → KO", etatDuHeros(0), "💀 KO");
