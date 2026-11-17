// Les combattants du côté du joueur : Personnage, Heros, Mage

import { nombreAuHasard } from "./outils.js";
import { Sort, SortDeSoin } from "./sorts.js";

// Le moule commun à tous les combattants
export class Personnage {
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

    // Frappe la cible et renvoie les dégâts infligés
    attaquer(cible) {
        const degats = nombreAuHasard(this.degatsMin, this.degatsMax);
        cible.recevoirDegats(degats);
        return degats;
    }
}

// Le héros : par défaut 100 PV, attaque de 10 à 20, sait se soigner
export class Heros extends Personnage {
    constructor(nom, pvMax = 100, degatsMin = 10, degatsMax = 20) {
        super(nom, pvMax, degatsMin, degatsMax);
        this.emoji = "🤺";
        this.manaMax = 0;  // un chevalier n'a pas de mana...
        this.mana = 0;
        this.sorts = [];   // ...et ne connaît aucun sort
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

// Le mage : moins de PV, un bâton qui tape peu... mais du mana pour la magie
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

    // Assez de mana pour ce sort ?
    peutLancer(sort) {
        return this.mana >= sort.cout;
    }

    // Dépense le mana, puis laisse le sort agir
    lancerSort(sort, cible) {
        this.mana -= sort.cout;
        return sort.lancer(this, cible);
    }

    // Le mana remonte, sans dépasser le maximum
    regenererMana(montant) {
        this.mana = Math.min(this.manaMax, this.mana + montant);
    }

    // Après une défaite : PV et mana au maximum
    restaurer() {
        super.restaurer();
        this.mana = this.manaMax;
    }
}
