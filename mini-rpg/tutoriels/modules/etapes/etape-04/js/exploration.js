// Le héros qui se promène sur la carte

// Le joueur sur la carte : position, clavier, collisions et rencontres
export class Exploration {
    constructor(carte, sons, emoji) {
        this.carte = carte;
        this.sons = sons;
        this.x = carte.depart.x;
        this.y = carte.depart.y;
        this.actif = true;
        this.surRencontre = () => {}; // branché depuis l'extérieur

        this.element = document.createElement("div");
        this.element.className = "joueur";
        this.element.textContent = emoji;
        this.element.style.width = carte.taille + "px";
        this.element.style.height = carte.taille + "px";
        carte.conteneur.appendChild(this.element);

        document.addEventListener("keydown", (evenement) => this.toucheAppuyee(evenement));
        this.afficher();
    }

    toucheAppuyee(evenement) {
        // Pour chaque touche : [déplacement en x, déplacement en y]
        const directions = {
            ArrowUp: [0, -1],
            ArrowDown: [0, 1],
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0]
        };
        const direction = directions[evenement.key];

        if (direction) {
            evenement.preventDefault(); // empêche la page de défiler
            this.deplacer(direction[0], direction[1]);
        }
    }

    deplacer(dx, dy) {
        if (!this.actif) return;

        const x = this.x + dx;
        const y = this.y + dy;
        if (!this.carte.estPraticable(x, y)) {
            this.sons.jouer("collision"); // collision : bruit, et on ne bouge pas
            return;
        }

        this.x = x;
        this.y = y;
        this.afficher();
        this.sons.jouer("pas", 0.3);      // les pas, plus discrets

        // Dans l'herbe haute : 1 chance sur 4 de rencontrer un monstre
        if (this.carte.typeEn(x, y) === "herbe" && Math.random() < 0.25) {
            this.sons.jouer("rencontre");
            this.surRencontre();
        }
    }

    // Après une défaite : retour à la case de départ
    replacerAuDepart() {
        this.x = this.carte.depart.x;
        this.y = this.carte.depart.y;
        this.afficher();
    }

    // Place le joueur à l'écran selon sa case
    afficher() {
        this.element.style.left = this.x * this.carte.taille + "px";
        this.element.style.top = this.y * this.carte.taille + "px";
    }
}
