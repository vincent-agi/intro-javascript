// Les monstres, faits main ou venus de PokeAPI
// @ts-check
// (l'éditeur vérifie les types annoncés par la JSDoc : voir l'étape 05)

import { nombreAuHasard, chargerJson } from "./outils.js";
import { Personnage } from "./personnages.js";

/**
 * Un monstre, fabriqué à la main ou à partir des données de PokeAPI.
 */
export class Monstre extends Personnage {
    /**
     * @param {string} nom
     * @param {number} pvMax
     * @param {number} degatsMin
     * @param {number} degatsMax
     * @param {string} [sprite=""] - l'adresse de son image ("" : pas d'image)
     */
    constructor(nom, pvMax, degatsMin, degatsMax, sprite = "") {
        super(nom, pvMax, degatsMin, degatsMax);
        this.sprite = sprite; // adresse de l'image
    }

    /**
     * Fabrique un monstre à partir de sa fiche PokeAPI.
     * "static" : s'appelle sur la classe (Monstre.depuisApi), pas sur un objet.
     * @param {number|string} idOuNom - le numéro (ex. 94) ou le nom (ex. "gengar")
     * @returns {Promise<Monstre>}
     * @throws {Error} si l'API ne répond pas ou si le Pokémon n'existe pas
     */
    static async depuisApi(idOuNom) {
        const donnees = await chargerJson("https://pokeapi.co/api/v2/pokemon/" + idOuNom);

        // Cherche dans le tableau "stats" la statistique de ce nom
        const stat = (nom) => donnees.stats.find((s) => s.stat.name === nom).base_stat;
        const attaque = stat("attack");
        const nom = donnees.name[0].toUpperCase() + donnees.name.slice(1); // "gengar" -> "Gengar"

        return new Monstre(
            nom,
            stat("hp"),                              // PV
            Math.max(1, Math.round(attaque / 10)),   // dégâts mini
            Math.max(1, Math.round(attaque / 5)),    // dégâts maxi
            donnees.sprites.front_default            // image
        );
    }

    attaquer(cible) {
        const degats = super.attaquer(cible);
        return "👹 " + this.nom + " riposte : -" + degats + " PV !";
    }
}

/**
 * Un monstre au hasard parmi les 151 premiers Pokémon.
 * Ne plante jamais : si l'API échoue, renvoie un Gobelin fait main.
 * @returns {Promise<Monstre>}
 */
export async function chargerMonstreAleatoire() {
    try {
        return await Monstre.depuisApi(nombreAuHasard(1, 151));
    } catch (erreur) {
        console.error(erreur);
        return new Monstre("Gobelin", 80, 5, 15); // le plan B, fait main
    }
}
