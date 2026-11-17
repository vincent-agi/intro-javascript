// Le journal de combat

/**
 * Le message principal et la liste des derniers événements du combat.
 */
export class Journal {
    /**
     * @param {HTMLElement} liste - la liste <ul> où afficher les événements
     * @param {HTMLElement} message - le paragraphe du message principal
     * @param {number} taille - combien d'événements garder à l'écran
     */
    constructor(liste, message, taille) {
        this.liste = liste;
        this.message = message;
        this.taille = taille;
        this.evenements = [];
    }

    /**
     * Efface tous les événements (au début d'un nouveau combat).
     */
    vider() {
        this.evenements = [];
        this.afficher();
    }

    /**
     * Affiche un nouvel événement (et le met en message principal).
     * @param {string} texte
     */
    ajouter(texte) {
        this.message.textContent = texte;
        this.evenements.push(texte);
        this.afficher();
    }

    afficher() {
        this.liste.innerHTML = "";

        const debut = Math.max(0, this.evenements.length - this.taille);
        for (let i = debut; i < this.evenements.length; i++) {
            const ligne = document.createElement("li");
            ligne.textContent = this.evenements[i];
            this.liste.appendChild(ligne);
        }
    }
}
