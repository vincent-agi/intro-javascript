// Les combattants du côté du joueur : Personnage, Heros, Mage
// @ts-check
// (l'éditeur vérifie les types annoncés par la JSDoc : voir l'étape 05)

import { nombreAuHasard } from "./outils.js";
import { Sort, SortDeSoin } from "./sorts.js";

/**
 * Le moule commun à tous les combattants : héros et monstres.
 */
export class Personnage {
    /**
     * @param {string} nom - le nom affiché
     * @param {number} pvMax - les points de vie au départ (et au maximum)
     * @param {number} degatsMin - les dégâts minimum d'une attaque
     * @param {number} degatsMax - les dégâts maximum d'une attaque
     */
    constructor(nom, pvMax, degatsMin, degatsMax) {
        this.nom = nom;
        this.pvMax = pvMax;
        this.pv = pvMax;
        this.degatsMin = degatsMin;
        this.degatsMax = degatsMax;
    }

    recevoirDegats(degats) {
        this.pv = Math.max(0, this.pv - degats);
    }

    recevoirSoin(montant) {
        this.pv = Math.min(this.pvMax, this.pv + montant);
    }

    estVaincu() {
        return this.pv <= 0;
    }

    restaurer() {
        this.pv = this.pvMax;
    }

    /**
     * Frappe la cible.
     * @param {Personnage} cible - celui qui reçoit le coup
     * @returns {number|string} les dégâts infligés (Heros et Monstre renvoient plutôt un message)
     */
    attaquer(cible) {
        const degats = nombreAuHasard(this.degatsMin, this.degatsMax);
        cible.recevoirDegats(degats);
        return degats;
    }
}

/**
 * Le héros contrôlé par le joueur. Tel quel, c'est le Chevalier : sans mana ni sorts.
 */
export class Heros extends Personnage {
    /**
     * @param {string} nom - le nom affiché
     * @param {number} [pvMax=100]
     * @param {number} [degatsMin=10]
     * @param {number} [degatsMax=20]
     */
    constructor(nom, pvMax = 100, degatsMin = 10, degatsMax = 20) {
        super(nom, pvMax, degatsMin, degatsMax);
        this.emoji = "🤺";
        this.manaMax = 0;  // un chevalier n'a pas de mana...
        this.mana = 0;
        this.sorts = [];   // ...et ne connaît aucun sort
    }

    /**
     * Le héros a-t-il assez de mana pour ce sort ? (Avec 0 mana, le Chevalier ne peut jamais.)
     * @param {Sort} sort
     * @returns {boolean}
     */
    peutLancer(sort) {
        return this.mana >= sort.cout;
    }

    /**
     * Dépense le mana, puis laisse le sort agir.
     * Vérifie d'abord avec peutLancer : cette méthode ne le fait pas.
     * @param {Sort} sort - un des sorts de this.sorts
     * @param {Personnage} cible - le monstre visé
     * @returns {string} le message à afficher dans le journal
     */
    lancerSort(sort, cible) {
        this.mana -= sort.cout;
        return sort.lancer(this, cible);
    }

    // Un héros sans mana n'en récupère pas : cette version ne fait rien.
    // Le Mage a sa propre version, qui remplace celle-ci.
    regenererMana(montant) {}

    attaquer(cible) {
        const degats = super.attaquer(cible);
        return "⚔️ Tu infliges " + degats + " dégâts !";
    }

    soigner() {
        this.recevoirSoin(15);
        return "💚 Tu récupères 15 PV.";
    }
}

/**
 * Le Mage : moins de PV, un bâton qui tape peu... mais du mana et des sorts.
 */
export class Mage extends Heros {
    constructor(nom) {
        super(nom, 80, 4, 8);
        this.emoji = "🧙";
        this.manaMax = 50;
        this.mana = this.manaMax;
        this.sorts = [
            new Sort("Éclair", "⚡", 10, 12, 18),
            new Sort("Boule de feu", "🔥", 20, 20, 30),
            new SortDeSoin("Lumière", "✨", 15, 25, 35, "soin")
        ];
    }

    /**
     * Le mana remonte, sans dépasser le maximum.
     * @param {number} montant - le mana récupéré
     */
    regenererMana(montant) {
        this.mana = Math.min(this.manaMax, this.mana + montant);
    }

    // Après une défaite : PV et mana au maximum
    restaurer() {
        super.restaurer();
        this.mana = this.manaMax;
    }
}
