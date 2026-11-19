/*
 * ============================================================
 *  OUTIL DE L'ATELIER (fichier du formateur)
 *  Noah n'a PAS besoin de lire ni de modifier ce fichier.
 *
 *  Il :
 *   1. charge le fichier exercices/exNN.js choisi dans la liste ;
 *   2. recopie les console.log sur la page ;
 *   3. explique les erreurs en français, avec le numéro de ligne ;
 *   4. fournit la fonction verifier(description, obtenu, attendu).
 *
 *  Adresse : atelier/index.html?ex=05
 *  Mode formateur (charge la correction) : index.html?ex=05&solution=1
 * ============================================================
 */

const EXERCICES = [
    { numero: "01", titre: "Chasse aux bugs" },
    { numero: "02", titre: "if / else if / else à trous" },
    { numero: "03", titre: "Écris ta condition : la potion" },
    { numero: "04", titre: "Prédis les boucles" },
    { numero: "05", titre: "Le monstre frappe 3 fois" },
    { numero: "06", titre: "Régénération et compte à rebours" },
    { numero: "07", titre: "Les boucles cassées" },
    { numero: "08", titre: "Démonte la fonction" },
    { numero: "09", titre: "Fonction à trous : infligerDegats" },
    { numero: "10", titre: "Fonction à trous : soigner" },
    { numero: "11", titre: "Fonctions guidées : estVivant et etatDuHeros" },
    { numero: "12", titre: "Fonction + boucle : la rafale" },
    { numero: "13", titre: "L'inventaire" },
    { numero: "14", titre: "Parcourir l'inventaire" },
    { numero: "15", titre: "Le plus gros coup" },
    { numero: "16", titre: "Parler à la page", scene: true },
    { numero: "17", titre: "Remplir la liste", scene: true },
    { numero: "18", titre: "Boss final : le bouton potion", scene: true }
];

const parametres = new URLSearchParams(window.location.search);
const modeSolution = parametres.get("solution") === "1";
let exercice = EXERCICES.find(function (e) {
    return e.numero === parametres.get("ex");
});
if (!exercice) {
    exercice = EXERCICES[0];
}

const sortie = document.getElementById("sortie");
const bilan = document.getElementById("bilan");
let nbReussis = 0;
let nbRates = 0;
let nbErreurs = 0;

/* ===== AFFICHAGE ===== */

function ajouterLigne(texte, type) {
    const ligne = document.createElement("li");
    ligne.className = type;
    ligne.textContent = texte;
    sortie.appendChild(ligne);
    mettreAJourBilan();
}

function mettreAJourBilan() {
    let texte = "";
    if (nbReussis + nbRates > 0) {
        texte = "✅ " + nbReussis + " réussi(s)   ❌ " + nbRates + " raté(s)";
    }
    if (nbErreurs > 0) {
        texte = texte + "   💥 programme arrêté par une erreur";
    }
    if (nbReussis > 0 && nbRates === 0 && nbErreurs === 0) {
        texte = texte + "   🎉 Bravo !";
    }
    bilan.textContent = texte;
}

// Écrit une valeur comme dans la console : les textes entre guillemets,
// pour bien voir la différence entre 100 (nombre) et "100" (texte).
function formater(valeur) {
    if (typeof valeur === "string") {
        return "\"" + valeur + "\"";
    }
    if (Array.isArray(valeur)) {
        return "[" + valeur.map(formater).join(", ") + "]";
    }
    return String(valeur);
}

/* ===== console.log recopié sur la page ===== */

const logOriginal = console.log;
console.log = function () {
    logOriginal.apply(console, arguments);
    const morceaux = [];
    for (let i = 0; i < arguments.length; i++) {
        const valeur = arguments[i];
        morceaux.push(typeof valeur === "string" ? valeur : formater(valeur));
    }
    ajouterLigne(morceaux.join(" "), "log");
};

/* ===== verifier() : utilisée dans les lignes 🔒 des exercices ===== */

window.verifier = function (description, obtenu, attendu) {
    const ok = JSON.stringify(obtenu) === JSON.stringify(attendu)
        && typeof obtenu === typeof attendu;
    if (ok) {
        nbReussis++;
        ajouterLigne("✅ " + description, "reussi");
        return;
    }
    nbRates++;
    let texte = "❌ " + description
        + "\n   attendu : " + formater(attendu)
        + "\n   obtenu  : " + formater(obtenu);
    if (obtenu === undefined) {
        texte = texte + "\n   💡 undefined = « rien ». As-tu oublié le return ?";
    } else if (typeof obtenu !== typeof attendu) {
        texte = texte + "\n   💡 Regarde les guillemets : un nombre et un texte, ce n'est pas pareil.";
    }
    ajouterLigne(texte, "rate");
};

/* ===== Les erreurs, expliquées en français ===== */

function expliquer(message) {
    if (message.indexOf("___") !== -1) {
        return "Il reste un trou ___ à remplir sur cette ligne.";
    }
    if (/Script error/i.test(message)) {
        return "Le navigateur cache le détail de l'erreur. Ouvre la console (F12), "
            + "ou lance la page avec Live Server pour voir la ligne fautive.";
    }
    if (/before initialization|can't access lexical/i.test(message)) {
        return "Tu utilises une variable AVANT la ligne où tu la crées avec let ou const.";
    }
    if (/constant/i.test(message)) {
        return "Tu essaies de changer une const. Si la valeur doit changer, crée-la avec let.";
    }
    if (/is not defined/i.test(message)) {
        return "Ce nom n'existe pas. Vérifie l'orthographe lettre par lettre "
            + "(console, document, getElementById...) et les majuscules. "
            + "Si c'est une variable : est-elle créée avec let / const ? "
            + "Est-elle utilisée en dehors des { } où elle a été créée ?";
    }
    if (/is not a function/i.test(message)) {
        return "Tu utilises comme une fonction (avec des parenthèses) quelque chose qui n'en est pas une. "
            + "Vérifie le nom : par exemple document.message(...) n'existe pas, "
            + "on écrit document.getElementById(\"message\").";
    }
    if (/null|undefined/i.test(message)) {
        return "Quelque chose est vide (null / undefined). Si tu utilises getElementById, "
            + "vérifie que l'id entre guillemets est exactement celui du HTML.";
    }
    if (/end of input|missing \} |expected '?\}/i.test(message)) {
        return "Il manque une accolade } fermante. Compte les { et les } : il en faut autant.";
    }
    if (/unexpected|expected|missing|invalid/i.test(message)) {
        return "Erreur de syntaxe (l'écriture du code). Regarde autour de cette ligne : "
            + "les ( ) après if / for, les { }, les guillemets \" \", "
            + "un ; en trop, ou un = au lieu de ===.";
    }
    return "";
}

window.addEventListener("error", function (evenement) {
    nbErreurs++;
    const message = evenement.message || "Erreur inconnue";
    let texte = "💥 " + message;
    if (evenement.lineno) {
        texte = "💥 Ligne " + evenement.lineno + " : " + message;
    }
    ajouterLigne(texte, "erreur");

    // Si on a pu lire le fichier, on montre la ligne fautive elle-même
    const ligneFautive = lignesDuFichier[evenement.lineno - 1];
    if (ligneFautive !== undefined && ligneFautive.trim() !== "") {
        ajouterLigne("👉 " + ligneFautive.trim(), "erreur");
        if (ligneFautive.indexOf("___") !== -1) {
            ajouterLigne("💡 Il reste un trou ___ à remplir sur cette ligne.", "conseil");
            ajouterLigne("Le programme s'arrête à la première erreur. Corrige-la, enregistre, puis recharge (F5).", "info");
            return;
        }
    }

    const conseil = expliquer(message);
    if (conseil) {
        ajouterLigne("💡 " + conseil, "conseil");
    }
    ajouterLigne("Le programme s'arrête à la première erreur. Corrige-la, enregistre, puis recharge (F5).", "info");
});

/* ===== La liste des exercices ===== */

const choix = document.getElementById("choix-exercice");
for (let i = 0; i < EXERCICES.length; i++) {
    const option = document.createElement("option");
    option.value = EXERCICES[i].numero;
    option.textContent = EXERCICES[i].numero + " – " + EXERCICES[i].titre;
    if (EXERCICES[i] === exercice) {
        option.selected = true;
    }
    choix.appendChild(option);
}
choix.addEventListener("change", function () {
    let adresse = "?ex=" + choix.value;
    if (modeSolution) {
        adresse = adresse + "&solution=1";
    }
    window.location.search = adresse;
});

/* ===== Chargement de l'exercice ===== */

const dossier = modeSolution ? "../corrections/solutions/" : "exercices/";
const fichier = dossier + "ex" + exercice.numero + ".js";

document.getElementById("fichier-a-ouvrir").textContent = modeSolution
    ? "🔒 Mode formateur : correction chargée depuis " + fichier
    : "✏️ Fichier à modifier : atelier/" + fichier + ", puis enregistre et recharge la page (F5).";

if (exercice.scene) {
    document.getElementById("scene").hidden = false;
}

// Le texte du fichier, ligne par ligne (pour montrer la ligne fautive).
// Ne marche qu'avec un serveur local (Live Server) : sinon, tant pis,
// l'atelier fonctionne quand même, sans afficher la ligne.
let lignesDuFichier = [];

function lancerExercice() {
    const script = document.createElement("script");
    script.src = fichier + "?v=" + Date.now(); // évite l'ancienne version en cache
    script.onerror = function () {
        ajouterLigne("💥 Fichier introuvable : " + fichier, "erreur");
    };
    script.onload = function () {
        if (sortie.children.length === 0) {
            ajouterLigne("(Ton programme n'a rien affiché pour l'instant.)", "info");
        }
    };
    document.body.appendChild(script);
}

fetch(fichier, { cache: "no-store" })
    .then(function (reponse) {
        return reponse.text();
    })
    .then(function (texte) {
        lignesDuFichier = texte.split("\n");
    })
    .catch(function () {
        // Page ouverte sans serveur : on continue sans le texte du fichier
    })
    .finally(lancerExercice);
