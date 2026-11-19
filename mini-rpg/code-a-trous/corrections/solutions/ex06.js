/* 🔒 CORRECTION – Exercice 06 – régénération et compte à rebours */

let pvHeros = 50;

for (let tour = 1; tour <= 4; tour++) {
    pvHeros = pvHeros + 5;
    console.log("💚 Tour " + tour + " : " + pvHeros + " PV");
}

let nbAffichages = 0;

for (let i = 3; i >= 1; i--) {
    console.log("🔥 Le sort explose dans " + i + "...");
    nbAffichages = nbAffichages + 1;
}
console.log("💥 BOUM !");

verifier("Après 4 tours, le héros a 70 PV", pvHeros, 70);
verifier("Le compte à rebours passe 3 fois dans la boucle", nbAffichages, 3);
