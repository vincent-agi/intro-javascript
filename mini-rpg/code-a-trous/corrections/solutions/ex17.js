/* 🔒 CORRECTION – Exercice 17 – remplir la liste */

const inventaire = ["🧪 Potion", "🗡️ Épée", "🛡️ Bouclier"];

inventaire.push("🔑 Clé");

const liste = document.getElementById("inventaire");

for (let i = 0; i < inventaire.length; i++) {
    const ligne = document.createElement("li");
    ligne.textContent = inventaire[i];
    liste.appendChild(ligne);
}

const lignesDeLaPage = document.getElementById("inventaire").children;
verifier("La 1re ligne de la page est la potion", lignesDeLaPage[0].textContent, "🧪 Potion");
verifier("La page affiche 4 objets (avec la clé)", lignesDeLaPage.length, 4);
