// La magie : les sorts que lance le Mage

import { nombreAuHasard } from "./outils.js";

// Un sort d'attaque : un nom, un coût en mana, des dégâts
export class Sort {
    constructor(nom, emoji, cout, effetMin, effetMax, son = "magie") {
        this.nom = nom;
        this.emoji = emoji;
        this.cout = cout;         // mana dépensé
        this.effetMin = effetMin;
        this.effetMax = effetMax;
        this.son = son;           // le nom du son à jouer (voir FICHIERS_SONS)
    }

    // Applique l'effet du sort et renvoie le message du journal
    lancer(lanceur, cible) {
        const degats = nombreAuHasard(this.effetMin, this.effetMax);
        cible.recevoirDegats(degats);
        return this.emoji + " " + this.nom + " : " + degats + " dégâts !";
    }
}

// Un sort de soin : même moule que Sort, mais il soigne le lanceur
export class SortDeSoin extends Sort {
    lancer(lanceur, cible) {
        const soin = nombreAuHasard(this.effetMin, this.effetMax);
        lanceur.recevoirSoin(soin);
        return this.emoji + " " + this.nom + " : +" + soin + " PV !";
    }
}
