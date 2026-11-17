// La carte du monde

/**
 * Le contenu de map.json.
 * @typedef {Object} DonneesCarte
 * @property {number} tailleTile - la taille d'une tuile, en pixels
 * @property {Object<string, string>} legende - symbole -> type de tuile (ex. "H" -> "herbe")
 * @property {string[]} obstacles - les types de tuile infranchissables
 * @property {{x: number, y: number}} depart - la case de départ du héros
 * @property {string[]} lignes - la carte, une ligne de symboles par rangée
 */

/**
 * La carte : une grille de tuiles décrite par map.json.
 */
export class Carte {
    /**
     * @param {DonneesCarte} donnees - le contenu de map.json
     * @param {HTMLElement} conteneur - l'élément de la page où dessiner la carte
     */
    constructor(donnees, conteneur) {
        this.taille = donnees.tailleTile;
        this.obstacles = donnees.obstacles;
        this.depart = donnees.depart;
        this.conteneur = conteneur;

        // Chaque ligne de texte est découpée en caractères, puis en types de tuile
        this.tuiles = donnees.lignes.map((ligne) =>
            ligne.split("").map((symbole) => donnees.legende[symbole])
        );
        this.hauteur = this.tuiles.length;
        this.largeur = this.tuiles[0].length;

        this.afficher();
    }

    /**
     * @param {number} x - la colonne
     * @param {number} y - la ligne
     * @returns {string|undefined} le type de la tuile (ex. "herbe"), ou undefined hors de la carte
     */
    typeEn(x, y) {
        return this.tuiles[y]?.[x];
    }

    /**
     * Le héros peut-il aller sur cette case ? (ni hors de la carte, ni sur un obstacle)
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    estPraticable(x, y) {
        const type = this.typeEn(x, y);
        return type !== undefined && !this.obstacles.includes(type);
    }

    afficher() {
        this.conteneur.innerHTML = "";
        this.conteneur.style.gridTemplateColumns =
            "repeat(" + this.largeur + ", " + this.taille + "px)";

        for (let y = 0; y < this.hauteur; y++) {
            for (let x = 0; x < this.largeur; x++) {
                const tuile = document.createElement("div");
                tuile.className = "tile-" + this.tuiles[y][x];
                tuile.style.height = this.taille + "px";
                this.conteneur.appendChild(tuile);
            }
        }
    }
}
