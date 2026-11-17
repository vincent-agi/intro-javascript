// Le héros qui se promène sur la carte

import { animer } from "./outils.js";

/**
 * Le héros sur la carte : position, clavier, collisions et rencontres.
 * Prévient l'extérieur avec la fonction de rappel surRencontre.
 */
export class Exploration {
    /**
     * @param {import("./carte.js").Carte} carte
     * @param {import("./sons.js").Sons} sons
     * @param {string} emoji - l'emoji du héros sur la carte (ex. "🧙")
     */
    constructor(carte, sons, emoji) {
        this.carte = carte;
        this.sons = sons;
        this.x = carte.depart.x;
        this.y = carte.depart.y;
        this.actif = true;
        this.surRencontre = () => {}; // branché depuis l'extérieur

        // La case du héros (elle glisse d'une case à l'autre)...
        this.element = document.createElement("div");
        this.element.className = "joueur";

        // ...et le héros lui-même, dans la case (lui respire, saute, tremble)
        this.sprite = document.createElement("span");
        this.sprite.className = "sprite-joueur";
        this.sprite.textContent = emoji;
        this.element.appendChild(this.sprite);
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

    /**
     * Essaie de déplacer le héros d'une case.
     * @param {number} dx - -1 (gauche), 0 ou 1 (droite)
     * @param {number} dy - -1 (haut), 0 ou 1 (bas)
     */
    deplacer(dx, dy) {
        if (!this.actif) return;

        // Le héros regarde dans la direction où il va (scaleX(-1) = effet miroir)
        if (dx !== 0) {
            this.element.style.transform = dx < 0 ? "scaleX(-1)" : "";
        }

        const x = this.x + dx;
        const y = this.y + dy;
        if (!this.carte.estPraticable(x, y)) {
            this.sons.jouer("collision"); // collision : bruit, et on ne bouge pas
            animer(this.sprite, [         // le héros tremble
                { transform: "translateX(0)" },
                { transform: "translateX(-4px)" },
                { transform: "translateX(4px)" },
                { transform: "translateX(0)" }
            ], 200);
            return;
        }

        this.x = x;
        this.y = y;
        this.afficher();
        this.sons.jouer("pas", 0.3);      // les pas, plus discrets
        animer(this.sprite, [             // un petit saut à chaque pas
            { transform: "translateY(0)" },
            { transform: "translateY(-8px)" },
            { transform: "translateY(0)" }
        ], 150);

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
