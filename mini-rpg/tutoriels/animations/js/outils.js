// Petits outils utilisés un peu partout dans le jeu
// @ts-check
// (l'éditeur vérifie les types annoncés par la JSDoc : voir l'étape 05)

/**
 * Tire un nombre entier au hasard entre min et max (inclus).
 * @param {number} min - le plus petit résultat possible
 * @param {number} max - le plus grand résultat possible
 * @returns {number} un entier entre min et max
 * @example nombreAuHasard(1, 6); // un lancer de dé
 */
export function nombreAuHasard(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Met le programme en pause. À utiliser avec await.
 * @param {number} ms - la durée de la pause, en millisecondes
 * @returns {Promise<void>}
 * @example await attendre(800); // pause de 0,8 seconde
 */
export function attendre(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Le joueur a demandé moins d'animations dans les réglages de son système ?
const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Joue une petite animation sur un élément de la page.
 * @param {Element} element - l'élément à animer
 * @param {Keyframe[]} etapes - les étapes de l'animation (comme dans un @keyframes)
 * @param {number} duree - la durée, en millisecondes
 * @returns {Promise<void>} se termine quand l'animation est finie
 * @example animer(bouton, [{ opacity: 0 }, { opacity: 1 }], 300);
 */
export function animer(element, etapes, duree) {
    if (mouvementReduit) return Promise.resolve(); // pas d'animation : on passe à la suite
    const animation = element.animate(etapes, { duration: duree, easing: "ease-out" });
    return animation.finished.then(() => {});
}

/**
 * Télécharge une adresse et renvoie son contenu JSON, transformé en objet.
 * @param {string} url - l'adresse (une API ou un fichier du projet)
 * @returns {Promise<any>} les données
 * @throws {Error} si le serveur répond par une erreur (404, 500...)
 */
export async function chargerJson(url) {
    const reponse = await fetch(url);
    if (!reponse.ok) {  // 404, 500... : fetch ne plante pas tout seul !
        throw new Error("Erreur " + reponse.status + " pour " + url);
    }
    return reponse.json();
}
