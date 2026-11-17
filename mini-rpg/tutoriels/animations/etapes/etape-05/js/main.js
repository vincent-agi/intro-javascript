// Le jeu : on crée les objets et on les relie

import { attendre, chargerJson } from "./outils.js";
import { FICHIERS_SONS, Sons } from "./sons.js";
import { Heros, Mage } from "./personnages.js";
import { chargerMonstreAleatoire } from "./monstre.js";
import { Journal } from "./journal.js";
import { Carte } from "./carte.js";
import { Exploration } from "./exploration.js";
import { Combat } from "./combat.js";

/**
 * Crée tous les objets du jeu et les relie entre eux.
 * @param {Heros} heros - le héros choisi par le joueur
 */
async function demarrerJeu(heros) {
    const ecranCarte = document.getElementById("carte");
    const ecranCombat = document.getElementById("combat");
    const boutonSon = document.getElementById("btn-son");
    const statut = document.getElementById("statut");

    const sons = new Sons(FICHIERS_SONS);
    statut.textContent = "⏳ Vérification des sons...";
    const manquants = await sons.verifierFichiers();
    statut.textContent = manquants.length > 0
        ? "🔇 Son(s) introuvable(s) : " + manquants.join(", ")
        : "🎵 Flèches du clavier pour se déplacer.";

    const journal = new Journal(
        document.getElementById("journal"),
        document.getElementById("message"),
        5
    );
    const combat = new Combat(heros, journal, sons);

    const carte = new Carte(await chargerJson("map.json"), ecranCarte);
    const exploration = new Exploration(carte, sons, heros.emoji);

    // Les navigateurs interdisent la musique avant une action du joueur :
    // on la lance à la première touche appuyée ("once" : une seule fois)
    document.addEventListener("keydown", () => sons.jouerMusique("musiqueCarte"), { once: true });

    // Rencontre : on charge un monstre, puis on passe de la carte au combat
    exploration.surRencontre = async () => {
        exploration.actif = false;                // plus de déplacement
        ecranCarte.classList.add("rencontre");    // la carte clignote
        const monstre = await chargerMonstreAleatoire();
        await attendre(800);                      // le temps de voir le clignotement
        ecranCarte.classList.remove("rencontre");

        combat.demarrer(monstre);
        sons.jouerMusique("musiqueCombat");
        ecranCarte.hidden = true;
        ecranCombat.hidden = false;
    };

    // Bouton muet : l'icône suit l'état des sons
    boutonSon.textContent = sons.muet ? "🔇" : "🔊";
    boutonSon.addEventListener("click", () => {
        sons.basculerMuet();
        boutonSon.textContent = sons.muet ? "🔇" : "🔊";
    });

    // Fin du combat : retour à la carte (au départ si le héros est tombé)
    combat.surRetour = () => {
        if (heros.estVaincu()) {
            heros.restaurer();               // PV et mana au maximum
            exploration.replacerAuDepart();
        } else {
            heros.regenererMana(20);         // la victoire redonne des forces
        }
        ecranCombat.hidden = true;
        ecranCarte.hidden = false;
        exploration.actif = true;
        sons.jouerMusique("musiqueCarte");
    };
}

// L'écran de choix : le jeu démarre avec le héros choisi
function choisirHeros(heros) {
    document.getElementById("choix").hidden = true;
    demarrerJeu(heros);
}

document.getElementById("btn-chevalier").addEventListener("click", () => choisirHeros(new Heros("Chevalier")));
document.getElementById("btn-mage").addEventListener("click", () => choisirHeros(new Mage("Mage")));
