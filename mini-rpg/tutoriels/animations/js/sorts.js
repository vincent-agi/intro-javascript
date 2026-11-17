// La magie : les sorts que lance le Mage
// @ts-check
// (l'éditeur vérifie les types annoncés par la JSDoc : voir l'étape 05)

import { nombreAuHasard } from "./outils.js";

/**
 * Un sort d'attaque : il coûte du mana et blesse la cible.
 */
export class Sort {
    /**
     * @param {string} nom - le nom affiché (ex. "Éclair")
     * @param {string} emoji - l'emoji affiché devant le nom (ex. "⚡")
     * @param {number} cout - le mana dépensé pour le lancer
     * @param {number} effetMin - l'effet minimum (dégâts ou soin)
     * @param {number} effetMax - l'effet maximum (dégâts ou soin)
     * @param {string} [son="magie"] - le nom du son à jouer (une clé de FICHIERS_SONS)
     * @example new Sort("Éclair", "⚡", 10, 12, 18)
     */
    constructor(nom, emoji, cout, effetMin, effetMax, son = "magie") {
        this.nom = nom;
        this.emoji = emoji;
        this.cout = cout;         // mana dépensé
        this.effetMin = effetMin;
        this.effetMax = effetMax;
        this.son = son;           // le nom du son à jouer (voir FICHIERS_SONS)
    }

    /**
     * Applique l'effet du sort.
     * @param {import("./personnages.js").Personnage} lanceur - celui qui lance le sort
     * @param {import("./personnages.js").Personnage} cible - celui qui le reçoit
     * @returns {string} le message à afficher dans le journal
     */
    lancer(lanceur, cible) {
        const degats = nombreAuHasard(this.effetMin, this.effetMax);
        cible.recevoirDegats(degats);
        return this.emoji + " " + this.nom + " : " + degats + " dégâts !";
    }
}

/**
 * Un sort de soin : comme un Sort, mais il soigne le lanceur au lieu de blesser la cible.
 */
export class SortDeSoin extends Sort {
    lancer(lanceur, cible) {
        const soin = nombreAuHasard(this.effetMin, this.effetMax);
        lanceur.recevoirSoin(soin);
        return this.emoji + " " + this.nom + " : +" + soin + " PV !";
    }
}
