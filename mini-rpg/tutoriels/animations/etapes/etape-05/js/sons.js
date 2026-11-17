// Les sons et la musique du jeu

/**
 * Les sons du jeu : nom -> fichier (téléchargés sur opengameart.org).
 * @type {Object<string, string>}
 */
export const FICHIERS_SONS = {
    // Effets
    pas: "sons/pas.wav",
    collision: "sons/collision.wav",
    rencontre: "sons/rencontre.wav",
    attaque: "sons/attaque.wav",
    degats: "sons/degats.wav",
    soin: "sons/soin.wav",
    victoire: "sons/victoire.wav",
    defaite: "sons/defaite.wav",
    magie: "sons/magie.wav",
    // Musiques
    musiqueCarte: "sons/musique-carte.mp3",
    musiqueCombat: "sons/musique-combat.mp3"
};

/**
 * Tous les sons du jeu. Le reste du code ne touche jamais aux objets Audio :
 * il demande simplement sons.jouer("attaque").
 */
export class Sons {
    /**
     * @param {Object<string, string>} fichiers - nom du son -> adresse du fichier (voir FICHIERS_SONS)
     */
    constructor(fichiers) {
        this.fichiers = fichiers;
        this.volumeEffets = 0.6;  // de 0 (silence) à 1 (maximum)
        this.audios = {};         // nom -> objet Audio
        this.volumeMusique = 0.35; // plus bas que les effets, pour ne pas les couvrir
        this.nomMusique = null;    // la musique en cours
        this.muet = localStorage.getItem("muet") === "oui"; // choix retenu

        // Un objet Audio par fichier : le navigateur commence à les télécharger
        for (const nom in fichiers) {
            this.audios[nom] = new Audio(fichiers[nom]);
            this.audios[nom].muted = this.muet;
        }
    }

    /**
     * Joue un effet. On joue une copie : le même son peut se superposer à lui-même.
     * Un nom inconnu ou un fichier absent ne provoque aucune erreur.
     * @param {string} nom - une clé de FICHIERS_SONS (ex. "attaque")
     * @param {number} [volume] - de 0 à 1 (par défaut : this.volumeEffets)
     */
    jouer(nom, volume = this.volumeEffets) {
        const audio = this.audios[nom];
        if (!audio) return; // nom inconnu : on ne fait rien

        const copie = audio.cloneNode();
        copie.volume = volume;
        copie.muted = this.muet;
        copie.play().catch(() => {}); // fichier absent ou navigateur qui refuse : on ignore
    }

    /**
     * Lance une musique en boucle (une seule à la fois), avec un fondu d'entrée.
     * @param {string} nom - une clé de FICHIERS_SONS (ex. "musiqueCarte")
     */
    jouerMusique(nom) {
        if (nom === this.nomMusique) return; // déjà en cours

        this.arreterMusique();
        this.nomMusique = nom;

        const audio = this.audios[nom];
        if (!audio) return;

        audio.loop = true;       // recommence au début quand elle se termine
        audio.volume = 0;        // on part du silence...
        audio.play().catch(() => {});
        this.fondu(audio, this.volumeMusique); // ...et on monte doucement
    }

    // Coupe la musique en cours, avec un fondu de sortie
    arreterMusique() {
        const audio = this.audios[this.nomMusique];
        this.nomMusique = null;
        if (!audio) return;

        this.fondu(audio, 0, () => {
            audio.pause();
            audio.currentTime = 0; // la prochaine fois, depuis le début
        });
    }

    /**
     * Fait glisser le volume vers "cible", un petit cran toutes les 50 ms.
     * @param {HTMLAudioElement} audio
     * @param {number} cible - le volume à atteindre, de 0 à 1
     * @param {Function} [quandFini] - appelée une fois le volume atteint
     */
    fondu(audio, cible, quandFini) {
        clearInterval(audio.minuteur); // annule un fondu déjà en cours

        audio.minuteur = setInterval(() => {
            const ecart = cible - audio.volume;

            if (Math.abs(ecart) <= 0.05) {   // presque arrivé : on s'arrête
                audio.volume = cible;
                clearInterval(audio.minuteur);
                if (quandFini) quandFini();
            } else if (ecart > 0) {
                audio.volume += 0.05;        // on monte
            } else {
                audio.volume -= 0.05;        // on descend
            }
        }, 50);
    }

    // Coupe ou remet tous les sons, et retient le choix
    basculerMuet() {
        this.muet = !this.muet;
        localStorage.setItem("muet", this.muet ? "oui" : "non");

        for (const nom in this.audios) {
            this.audios[nom].muted = this.muet;
        }
    }

    /**
     * Demande chaque fichier au serveur.
     * @returns {Promise<string[]>} les noms des sons introuvables (tableau vide si tout va bien)
     */
    async verifierFichiers() {
        const manquants = [];

        for (const nom in this.fichiers) {
            const reponse = await fetch(this.fichiers[nom]);
            if (!reponse.ok) {
                console.warn("Son manquant :", nom, "(" + this.fichiers[nom] + ")");
                manquants.push(nom);
            }
        }
        return manquants;
    }
}
