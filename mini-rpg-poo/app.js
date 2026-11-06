/* ===== 1. LA CLASSE DE BASE ===== */

class Combattant {
    constructor(nom, pv, attaque) {
        this.nom = nom;         // nom affiché dans les messages
        this.pv = pv;           // points de vie restants
        this.attaque = attaque; // dégâts infligés à chaque coup
    }

    // Vrai tant que le combattant n'est pas à 0 PV
    estVivant() {
        return this.pv > 0;
    }

    // Retire des PV, sans jamais descendre sous 0
    recevoirDegats(montant) {
        this.pv = Math.max(0, this.pv - montant);
        console.log(`${this.nom} perd ${montant} PV (reste : ${this.pv})`);

        if (!this.estVivant()) {
            console.log(`💀 ${this.nom} est vaincu !`);
        }
    }

    // Frappe une autre cible avec sa force d'attaque
    attaquer(cible) {
        console.log(`⚔️ ${this.nom} attaque ${cible.nom} !`);
        cible.recevoirDegats(this.attaque);
    }
}

/* ===== 2. LES SOUS-CLASSES ===== */

// Solide et costaud
class Guerrier extends Combattant {
    constructor(nom) {
        super(nom, 150, 15); // PV et attaque imposés
    }

    attaquer(cible) {
        console.log(`🛡️ ${this.nom} brandit son épée !`);
        super.attaquer(cible); // on réutilise l'attaque de base
    }
}

// Fragile mais dangereux grâce à ses sorts
class Mage extends Combattant {
    constructor(nom) {
        super(nom, 70, 8);
        this.mana = 30; // propre au Mage
    }

    lancerSort(cible) {
        if (this.mana >= 10) {
            this.mana -= 10;
            console.log(`🔥 ${this.nom} lance une boule de feu ! (mana : ${this.mana})`);
            cible.recevoirDegats(25);
        } else {
            console.log(`${this.nom} n'a plus de mana...`);
            this.attaquer(cible);
        }
    }
}

/* ===== 3. LE COMBAT ===== */

// Instanciation : on fabrique nos deux combattants
const aragorn = new Guerrier("Aragorn");
const merlin = new Mage("Merlin");

let tour = 1;

// Le combat dure tant que les deux sont en vie
while (aragorn.estVivant() && merlin.estVivant()) {
    console.log(`\n--- Tour ${tour} ---`);

    aragorn.attaquer(merlin);

    // Merlin riposte seulement s'il a survécu
    if (merlin.estVivant()) {
        merlin.lancerSort(aragorn);
    }

    tour++;
}

// Annonce du vainqueur
const vainqueur = aragorn.estVivant() ? aragorn : merlin;
console.log(`\n🏆 ${vainqueur.nom} remporte le combat en ${tour - 1} tours !`);
