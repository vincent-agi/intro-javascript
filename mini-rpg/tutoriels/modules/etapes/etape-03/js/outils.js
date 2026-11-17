// Petits outils utilisés un peu partout dans le jeu

// Renvoie un entier au hasard entre min et max (inclus)
export function nombreAuHasard(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Met le programme en pause pendant "ms" millisecondes (à utiliser avec await)
export function attendre(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Charge une adresse et renvoie son contenu JSON
export async function chargerJson(url) {
    const reponse = await fetch(url);
    if (!reponse.ok) {  // 404, 500... : fetch ne plante pas tout seul !
        throw new Error("Erreur " + reponse.status + " pour " + url);
    }
    return reponse.json();
}
