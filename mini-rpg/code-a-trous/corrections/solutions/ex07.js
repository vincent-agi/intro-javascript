/* 🔒 CORRECTION – Exercice 07 – les boucles cassées */

// Bug A : le ; après ) « ferme » la boucle à vide. Le bloc { } ne s'exécute qu'une fois.
let toursA = 0;
for (let i = 1; i <= 5; i++) {
    toursA = toursA + 1;
}
console.log("Bug A : " + toursA + " tour(s) compté(s)");

// Bug B : de 1 à 5 INCLUS → <= (avec <, on s'arrête à 4)
let coffresOuverts = 0;
for (let numero = 1; numero <= 5; numero++) {
    coffresOuverts = coffresOuverts + 1;
    console.log("📦 Coffre n°" + numero + " ouvert");
}

// Bug C : il manquait la parenthèse fermante après i++
let attaques = 0;
for (let i = 0; i < 3; i++) {
    attaques = attaques + 1;
    console.log("⚔️ Attaque !");
}

verifier("Bug A : 5 tours comptés", toursA, 5);
verifier("Bug B : 5 coffres ouverts", coffresOuverts, 5);
verifier("Bug C : 3 attaques", attaques, 3);
