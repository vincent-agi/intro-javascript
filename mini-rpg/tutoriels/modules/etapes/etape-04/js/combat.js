// Le déroulement d'un combat

// Le chef d'orchestre : page, tours de jeu et fin du combat
export class Combat {
    constructor(heros, journal, sons) {
        this.heros = heros;
        this.journal = journal;
        this.sons = sons;
        this.monstre = null;      // pas encore d'adversaire
        this.enCours = false;
        this.surRetour = () => {}; // branché depuis l'extérieur

        this.nomHeros = document.getElementById("nom-heros");
        this.zoneMana = document.getElementById("zone-mana");
        this.textePvJoueur = document.getElementById("pv-joueur");
        this.texteManaJoueur = document.getElementById("mana-joueur");
        this.barreMana = document.getElementById("barre-mana");
        this.textePvMonstre = document.getElementById("pv-monstre");
        this.nomMonstre = document.getElementById("nom-monstre");
        this.spriteMonstre = document.getElementById("sprite-monstre");
        this.barreJoueur = document.getElementById("barre-joueur");
        this.barreMonstre = document.getElementById("barre-monstre");
        this.boutonAttaque = document.getElementById("btn-attaque");
        this.boutonSoin = document.getElementById("btn-soin");
        this.boutonRetour = document.getElementById("btn-retour");
        this.zoneSorts = document.getElementById("sorts");

        // Flèche () => : "this" reste le combat quand on clique
        this.boutonAttaque.addEventListener("click", () => this.attaquer());
        this.boutonSoin.addEventListener("click", () => this.soigner());
        this.boutonRetour.addEventListener("click", () => this.surRetour());

        this.nomHeros.textContent = heros.emoji + " " + heros.nom;
        this.zoneMana.hidden = heros.manaMax === 0; // pas de mana : pas de barre
        this.creerBoutonsSorts();
    }

    // Un bouton par sort connu du héros
    creerBoutonsSorts() {
        this.boutonsSorts = [];

        for (const sort of this.heros.sorts) {
            const bouton = document.createElement("button");
            bouton.textContent = sort.emoji + " " + sort.nom + " (" + sort.cout + " mana)";
            bouton.sort = sort; // on accroche le sort à son bouton
            bouton.addEventListener("click", () => this.lancerSort(sort));

            this.zoneSorts.appendChild(bouton);
            this.boutonsSorts.push(bouton);
        }
    }

    // Un sort n'est cliquable que pendant le combat, et avec assez de mana
    mettreAJourSorts() {
        for (const bouton of this.boutonsSorts) {
            bouton.disabled = !this.enCours || !this.heros.peutLancer(bouton.sort);
        }
    }

    // Lance un combat contre ce monstre
    demarrer(monstre) {
        this.monstre = monstre;
        this.enCours = true;
        this.journal.vider();     // un nouveau combat, un journal propre

        this.boutonAttaque.disabled = false;
        this.boutonSoin.disabled = false;
        this.boutonRetour.hidden = true;

        this.afficherMonstre();
        this.journal.ajouter("❗ " + monstre.nom + " sauvage apparaît !");
        this.afficherVie();
    }

    afficherMonstre() {
        this.nomMonstre.textContent = this.monstre.nom;
        this.spriteMonstre.src = this.monstre.sprite;
        this.spriteMonstre.alt = this.monstre.nom;
        this.spriteMonstre.hidden = this.monstre.sprite === ""; // le gobelin n'a pas d'image
    }

    afficherVie() {
        this.textePvJoueur.textContent = this.heros.pv;
        this.textePvMonstre.textContent = this.monstre.pv;
        this.barreJoueur.style.width = (this.heros.pv / this.heros.pvMax) * 100 + "%";
        this.barreMonstre.style.width = (this.monstre.pv / this.monstre.pvMax) * 100 + "%";

        // Le mana, comme les PV : un texte et une barre (si le héros en a)
        if (this.heros.manaMax > 0) {
            this.texteManaJoueur.textContent = this.heros.mana;
            this.barreMana.style.width = (this.heros.mana / this.heros.manaMax) * 100 + "%";
        }

        this.mettreAJourSorts(); // le mana a peut-être changé
    }

    riposte() {
        this.sons.jouer("degats");
        this.journal.ajouter(this.monstre.attaquer(this.heros));
        this.heros.regenererMana(5); // fin du tour : le mage récupère un peu de mana
    }

    verifierFin() {
        if (this.monstre.estVaincu()) {
            this.journal.ajouter("🎉 Victoire ! " + this.monstre.nom + " est vaincu !");
            this.enCours = false;
            this.sons.arreterMusique();     // place au jingle de fin
            this.sons.jouer("victoire");
        } else if (this.heros.estVaincu()) {
            this.journal.ajouter("💀 Défaite... Le héros est à terre.");
            this.enCours = false;
            this.sons.arreterMusique();     // place au jingle de fin
            this.sons.jouer("defaite");
        }

        if (!this.enCours) {
            this.boutonAttaque.disabled = true;
            this.boutonSoin.disabled = true;
            this.boutonRetour.hidden = false;
        }
    }

    attaquer() {
        if (!this.enCours) return;

        this.sons.jouer("attaque");
        this.journal.ajouter(this.heros.attaquer(this.monstre));

        this.verifierFin();
        if (this.enCours) {
            this.riposte();
            this.verifierFin();
        }
        this.afficherVie();
    }

    lancerSort(sort) {
        if (!this.enCours || !this.heros.peutLancer(sort)) return;

        this.sons.jouer(sort.son);
        this.journal.ajouter(this.heros.lancerSort(sort, this.monstre));
        this.spriteMonstre.animate(            // le monstre s'illumine
            [{ filter: "brightness(3)" }, { filter: "none" }],
            400
        );

        this.verifierFin();
        if (this.enCours) {
            this.riposte();
            this.verifierFin();
        }
        this.afficherVie();
    }

    soigner() {
        if (!this.enCours) return;

        this.sons.jouer("soin");
        this.journal.ajouter(this.heros.soigner());

        this.riposte();
        this.verifierFin();
        this.afficherVie();
    }
}
