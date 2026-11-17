# 06 – Bilan et code final

🎯 **À la fin de cette étape** : tu relis ton projet rangé et documenté, tu compares avec le départ, et tu es prêt à le faire évoluer.

## Avant / après

| | Avant (dossier `magie`) | Après (ce dossier) |
| --- | --- | --- |
| Fichiers JavaScript | 1 (`app.js`, ~700 lignes) | 10 fichiers de 40 à 180 lignes |
| Trouver le code des sorts | chercher dans 700 lignes | ouvrir `sorts.js` |
| Savoir qui dépend de qui | impossible à voir | les `import` en haut de chaque fichier |
| Noms partagés | tout est global, tout le monde voit tout | chaque fichier choisit ce qu'il `export` |
| Comprendre une fonction | lire son code | passer la souris dessus (JSDoc) |
| Erreur `"10"` au lieu de `10` | découverte en jouant | soulignée par l'éditeur (`@ts-check`) |
| Ce que voit le joueur | le jeu | **exactement le même jeu** |

La dernière ligne est la plus importante : une refactorisation réussie ne change **rien** pour le joueur, et **tout** pour le développeur.

## La carte des fichiers

| Fichier | Rôle | Lignes | Importe |
| --- | --- | --- | --- |
| `main.js` | le point d'entrée : crée les objets et les relie | 86 | `outils.js`, `sons.js`, `personnages.js`, `monstre.js`, `journal.js`, `carte.js`, `exploration.js`, `combat.js` |
| `outils.js` | petites fonctions partagées | 38 | aucun |
| `sons.js` | bruitages et musique | 143 | aucun |
| `personnages.js` | Personnage, Heros, Mage | 137 | `outils.js`, `sorts.js` |
| `sorts.js` | Sort, SortDeSoin | 51 | `outils.js` |
| `monstre.js` | Monstre, chargerMonstreAleatoire | 66 | `outils.js`, `personnages.js` |
| `journal.js` | le journal de combat | 39 | aucun |
| `carte.js` | la grille de tuiles | 71 | aucun |
| `exploration.js` | le héros sur la carte | 87 | aucun |
| `combat.js` | le déroulement d'un combat | 179 | aucun |

Et les dépendances, en un schéma :

```
main.js ─┬─▶ outils.js
         ├─▶ sons.js
         ├─▶ personnages.js ──▶ sorts.js ──▶ outils.js
         ├─▶ monstre.js ──▶ personnages.js, outils.js
         ├─▶ journal.js
         ├─▶ carte.js
         ├─▶ exploration.js
         └─▶ combat.js
```

Remarque : les flèches vont toujours **dans le même sens**, vers les fichiers les plus « simples ». Aucun fichier n'importe `main.js`, et `outils.js` n'importe personne. C'est le signe d'un projet bien organisé.

## Vérifier : relis ton projet comme un pro

- [ ] Le jeu marche exactement comme à la fin du dossier `magie` (les deux héros, les sorts, les sons, le muet, le Gobelin si l'API est en panne).
- [ ] La console n'affiche aucune erreur rouge.
- [ ] Chaque fichier commence par une ligne qui dit de quoi il parle.
- [ ] Chaque fichier n'importe que ce qu'il utilise (pas d'`import` inutile).
- [ ] Les classes, leurs constructeurs et leurs méthodes utilisées ailleurs ont leur JSDoc.
- [ ] `outils.js`, `sorts.js`, `personnages.js` et `monstre.js` ont `// @ts-check`, et l'éditeur n'y souligne rien.

> 🆘 Bloqué ? Le projet complet est dans ce dossier : [`index.html`](./index.html), [`carte.css`](./carte.css), [`map.json`](./map.json) et le dossier [`js/`](./js/). Ajoute ton dossier `sons/` à côté.

### Ce qu'il faut retenir

- **Refactoriser** = réorganiser sans changer le comportement, **par petites étapes testées**.
- **Modules** : `export` pour partager, `import` pour utiliser, `<script type="module">` et un serveur pour charger.
- **Un fichier = un sujet**, et `main.js` relie le tout.
- **JSDoc** transforme tes commentaires en aide **dans l'éditeur** : descriptions, autocomplétion, et erreurs signalées avant de jouer.

## Le code final

### `index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mini RPG</title>
    <link rel="stylesheet" href="../../style.css">
    <link rel="stylesheet" href="carte.css">
</head>
<body>
    <h1>Mini RPG ⚔️</h1>

    <!-- Bouton son (et message d'état) -->
    <button id="btn-son" title="Couper / remettre le son">🔊</button>
    <p id="statut"></p>

    <!-- Le choix du héros, avant de commencer -->
    <div id="choix">
        <h2>Choisis ton héros</h2>
        <button id="btn-chevalier">🤺 Chevalier<br><small>100 PV, frappe fort</small></button>
        <button id="btn-mage">🧙 Mage<br><small>80 PV, 50 mana, 3 sorts</small></button>
    </div>

    <!-- La carte (flèches du clavier pour se déplacer) -->
    <div id="carte"></div>

    <!-- Le combat : caché tant qu'aucun monstre n'apparaît -->
    <div id="combat" hidden>
        <!-- Le héros -->
        <section>
            <h2><span id="nom-heros">Héros</span> : <span id="pv-joueur">100</span> PV</h2>
            <div class="barre"><div id="barre-joueur" class="vie"></div></div>
            <!-- Le mana du mage -->
            <div id="zone-mana">
                <p>🔮 Mana : <span id="mana-joueur">50</span></p>
                <div class="barre"><div id="barre-mana" class="vie"></div></div>
            </div>
        </section>

        <!-- Le monstre -->
        <section>
            <img id="sprite-monstre" alt="">
            <h2>👹 <span id="nom-monstre">Monstre</span> : <span id="pv-monstre">80</span> PV</h2>
            <div class="barre"><div id="barre-monstre" class="vie"></div></div>
        </section>

        <!-- Les boutons d'action -->
        <div class="actions">
            <button id="btn-attaque">⚔️ Attaquer</button>
            <button id="btn-soin">💚 Se soigner</button>
            <button id="btn-retour" hidden>🗺️ Retour à la carte</button>
        </div>

        <!-- Les sorts : un bouton par sort, créé par JavaScript -->
        <div id="sorts" class="actions"></div>

        <!-- Message principal et journal de combat -->
        <p id="message"></p>
        <h3>Journal de combat</h3>
        <ul id="journal"></ul>
    </div>

    <script type="module" src="js/main.js"></script>
</body>
</html>
```

### `js/main.js`

```javascript
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
```

### `js/outils.js`

```javascript
// Petits outils utilisés un peu partout dans le jeu
// @ts-check
// (l'éditeur vérifie les types annoncés par la JSDoc : voir l'étape 05)

/**
 * Tire un nombre entier au hasard entre min et max (inclus).
 * @param {number} min - le plus petit résultat possible
 * @param {number} max - le plus grand résultat possible
 * @returns {number} un entier entre min et max
 * @example nombreAuHasard(1, 6); // un lancer de dé
 */
export function nombreAuHasard(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Met le programme en pause. À utiliser avec await.
 * @param {number} ms - la durée de la pause, en millisecondes
 * @returns {Promise<void>}
 * @example await attendre(800); // pause de 0,8 seconde
 */
export function attendre(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Télécharge une adresse et renvoie son contenu JSON, transformé en objet.
 * @param {string} url - l'adresse (une API ou un fichier du projet)
 * @returns {Promise<any>} les données
 * @throws {Error} si le serveur répond par une erreur (404, 500...)
 */
export async function chargerJson(url) {
    const reponse = await fetch(url);
    if (!reponse.ok) {  // 404, 500... : fetch ne plante pas tout seul !
        throw new Error("Erreur " + reponse.status + " pour " + url);
    }
    return reponse.json();
}
```

### `js/sons.js`

```javascript
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
```

### `js/personnages.js`

```javascript
// Les combattants du côté du joueur : Personnage, Heros, Mage
// @ts-check
// (l'éditeur vérifie les types annoncés par la JSDoc : voir l'étape 05)

import { nombreAuHasard } from "./outils.js";
import { Sort, SortDeSoin } from "./sorts.js";

/**
 * Le moule commun à tous les combattants : héros et monstres.
 */
export class Personnage {
    /**
     * @param {string} nom - le nom affiché
     * @param {number} pvMax - les points de vie au départ (et au maximum)
     * @param {number} degatsMin - les dégâts minimum d'une attaque
     * @param {number} degatsMax - les dégâts maximum d'une attaque
     */
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

    /**
     * Frappe la cible.
     * @param {Personnage} cible - celui qui reçoit le coup
     * @returns {number|string} les dégâts infligés (Heros et Monstre renvoient plutôt un message)
     */
    attaquer(cible) {
        const degats = nombreAuHasard(this.degatsMin, this.degatsMax);
        cible.recevoirDegats(degats);
        return degats;
    }
}

/**
 * Le héros contrôlé par le joueur. Tel quel, c'est le Chevalier : sans mana ni sorts.
 */
export class Heros extends Personnage {
    /**
     * @param {string} nom - le nom affiché
     * @param {number} [pvMax=100]
     * @param {number} [degatsMin=10]
     * @param {number} [degatsMax=20]
     */
    constructor(nom, pvMax = 100, degatsMin = 10, degatsMax = 20) {
        super(nom, pvMax, degatsMin, degatsMax);
        this.emoji = "🤺";
        this.manaMax = 0;  // un chevalier n'a pas de mana...
        this.mana = 0;
        this.sorts = [];   // ...et ne connaît aucun sort
    }

    /**
     * Le héros a-t-il assez de mana pour ce sort ? (Avec 0 mana, le Chevalier ne peut jamais.)
     * @param {Sort} sort
     * @returns {boolean}
     */
    peutLancer(sort) {
        return this.mana >= sort.cout;
    }

    /**
     * Dépense le mana, puis laisse le sort agir.
     * Vérifie d'abord avec peutLancer : cette méthode ne le fait pas.
     * @param {Sort} sort - un des sorts de this.sorts
     * @param {Personnage} cible - le monstre visé
     * @returns {string} le message à afficher dans le journal
     */
    lancerSort(sort, cible) {
        this.mana -= sort.cout;
        return sort.lancer(this, cible);
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

/**
 * Le Mage : moins de PV, un bâton qui tape peu... mais du mana et des sorts.
 */
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

    /**
     * Le mana remonte, sans dépasser le maximum.
     * @param {number} montant - le mana récupéré
     */
    regenererMana(montant) {
        this.mana = Math.min(this.manaMax, this.mana + montant);
    }

    // Après une défaite : PV et mana au maximum
    restaurer() {
        super.restaurer();
        this.mana = this.manaMax;
    }
}
```

### `js/sorts.js`

```javascript
// La magie : les sorts que lance le Mage
// @ts-check
// (l'éditeur vérifie les types annoncés par la JSDoc : voir l'étape 05)

import { nombreAuHasard } from "./outils.js";

/**
 * Un sort d'attaque : il coûte du mana et blesse la cible.
 */
export class Sort {
    /**
     * @param {string} nom - le nom affiché (ex. "Éclair")
     * @param {string} emoji - l'emoji affiché devant le nom (ex. "⚡")
     * @param {number} cout - le mana dépensé pour le lancer
     * @param {number} effetMin - l'effet minimum (dégâts ou soin)
     * @param {number} effetMax - l'effet maximum (dégâts ou soin)
     * @param {string} [son="magie"] - le nom du son à jouer (une clé de FICHIERS_SONS)
     * @example new Sort("Éclair", "⚡", 10, 12, 18)
     */
    constructor(nom, emoji, cout, effetMin, effetMax, son = "magie") {
        this.nom = nom;
        this.emoji = emoji;
        this.cout = cout;         // mana dépensé
        this.effetMin = effetMin;
        this.effetMax = effetMax;
        this.son = son;           // le nom du son à jouer (voir FICHIERS_SONS)
    }

    /**
     * Applique l'effet du sort.
     * @param {import("./personnages.js").Personnage} lanceur - celui qui lance le sort
     * @param {import("./personnages.js").Personnage} cible - celui qui le reçoit
     * @returns {string} le message à afficher dans le journal
     */
    lancer(lanceur, cible) {
        const degats = nombreAuHasard(this.effetMin, this.effetMax);
        cible.recevoirDegats(degats);
        return this.emoji + " " + this.nom + " : " + degats + " dégâts !";
    }
}

/**
 * Un sort de soin : comme un Sort, mais il soigne le lanceur au lieu de blesser la cible.
 */
export class SortDeSoin extends Sort {
    lancer(lanceur, cible) {
        const soin = nombreAuHasard(this.effetMin, this.effetMax);
        lanceur.recevoirSoin(soin);
        return this.emoji + " " + this.nom + " : +" + soin + " PV !";
    }
}
```

### `js/monstre.js`

```javascript
// Les monstres, faits main ou venus de PokeAPI
// @ts-check
// (l'éditeur vérifie les types annoncés par la JSDoc : voir l'étape 05)

import { nombreAuHasard, chargerJson } from "./outils.js";
import { Personnage } from "./personnages.js";

/**
 * Un monstre, fabriqué à la main ou à partir des données de PokeAPI.
 */
export class Monstre extends Personnage {
    /**
     * @param {string} nom
     * @param {number} pvMax
     * @param {number} degatsMin
     * @param {number} degatsMax
     * @param {string} [sprite=""] - l'adresse de son image ("" : pas d'image)
     */
    constructor(nom, pvMax, degatsMin, degatsMax, sprite = "") {
        super(nom, pvMax, degatsMin, degatsMax);
        this.sprite = sprite; // adresse de l'image
    }

    /**
     * Fabrique un monstre à partir de sa fiche PokeAPI.
     * "static" : s'appelle sur la classe (Monstre.depuisApi), pas sur un objet.
     * @param {number|string} idOuNom - le numéro (ex. 94) ou le nom (ex. "gengar")
     * @returns {Promise<Monstre>}
     * @throws {Error} si l'API ne répond pas ou si le Pokémon n'existe pas
     */
    static async depuisApi(idOuNom) {
        const donnees = await chargerJson("https://pokeapi.co/api/v2/pokemon/" + idOuNom);

        // Cherche dans le tableau "stats" la statistique de ce nom
        const stat = (nom) => donnees.stats.find((s) => s.stat.name === nom).base_stat;
        const attaque = stat("attack");
        const nom = donnees.name[0].toUpperCase() + donnees.name.slice(1); // "gengar" -> "Gengar"

        return new Monstre(
            nom,
            stat("hp"),                              // PV
            Math.max(1, Math.round(attaque / 10)),   // dégâts mini
            Math.max(1, Math.round(attaque / 5)),    // dégâts maxi
            donnees.sprites.front_default            // image
        );
    }

    attaquer(cible) {
        const degats = super.attaquer(cible);
        return "👹 " + this.nom + " riposte : -" + degats + " PV !";
    }
}

/**
 * Un monstre au hasard parmi les 151 premiers Pokémon.
 * Ne plante jamais : si l'API échoue, renvoie un Gobelin fait main.
 * @returns {Promise<Monstre>}
 */
export async function chargerMonstreAleatoire() {
    try {
        return await Monstre.depuisApi(nombreAuHasard(1, 151));
    } catch (erreur) {
        console.error(erreur);
        return new Monstre("Gobelin", 80, 5, 15); // le plan B, fait main
    }
}
```

### `js/journal.js`

```javascript
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
```

### `js/carte.js`

```javascript
// La carte du monde

/**
 * Le contenu de map.json.
 * @typedef {Object} DonneesCarte
 * @property {number} tailleTile - la taille d'une tuile, en pixels
 * @property {Object<string, string>} legende - symbole -> type de tuile (ex. "H" -> "herbe")
 * @property {string[]} obstacles - les types de tuile infranchissables
 * @property {{x: number, y: number}} depart - la case de départ du héros
 * @property {string[]} lignes - la carte, une ligne de symboles par rangée
 */

/**
 * La carte : une grille de tuiles décrite par map.json.
 */
export class Carte {
    /**
     * @param {DonneesCarte} donnees - le contenu de map.json
     * @param {HTMLElement} conteneur - l'élément de la page où dessiner la carte
     */
    constructor(donnees, conteneur) {
        this.taille = donnees.tailleTile;
        this.obstacles = donnees.obstacles;
        this.depart = donnees.depart;
        this.conteneur = conteneur;

        // Chaque ligne de texte est découpée en caractères, puis en types de tuile
        this.tuiles = donnees.lignes.map((ligne) =>
            ligne.split("").map((symbole) => donnees.legende[symbole])
        );
        this.hauteur = this.tuiles.length;
        this.largeur = this.tuiles[0].length;

        this.afficher();
    }

    /**
     * @param {number} x - la colonne
     * @param {number} y - la ligne
     * @returns {string|undefined} le type de la tuile (ex. "herbe"), ou undefined hors de la carte
     */
    typeEn(x, y) {
        return this.tuiles[y]?.[x];
    }

    /**
     * Le héros peut-il aller sur cette case ? (ni hors de la carte, ni sur un obstacle)
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     */
    estPraticable(x, y) {
        const type = this.typeEn(x, y);
        return type !== undefined && !this.obstacles.includes(type);
    }

    afficher() {
        this.conteneur.innerHTML = "";
        this.conteneur.style.gridTemplateColumns =
            "repeat(" + this.largeur + ", " + this.taille + "px)";

        for (let y = 0; y < this.hauteur; y++) {
            for (let x = 0; x < this.largeur; x++) {
                const tuile = document.createElement("div");
                tuile.className = "tile-" + this.tuiles[y][x];
                tuile.style.height = this.taille + "px";
                this.conteneur.appendChild(tuile);
            }
        }
    }
}
```

### `js/exploration.js`

```javascript
// Le héros qui se promène sur la carte

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

    /**
     * Essaie de déplacer le héros d'une case.
     * @param {number} dx - -1 (gauche), 0 ou 1 (droite)
     * @param {number} dy - -1 (haut), 0 ou 1 (bas)
     */
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
```

### `js/combat.js`

```javascript
// Le déroulement d'un combat

/**
 * Le chef d'orchestre du combat : page, tours de jeu et fin.
 * Prévient l'extérieur avec la fonction de rappel surRetour.
 */
export class Combat {
    /**
     * @param {import("./personnages.js").Heros} heros - le Chevalier ou le Mage
     * @param {import("./journal.js").Journal} journal
     * @param {import("./sons.js").Sons} sons
     */
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

    /**
     * Lance un combat contre ce monstre.
     * @param {import("./monstre.js").Monstre} monstre
     */
    demarrer(monstre) {
        this.monstre = monstre;
        this.enCours = true;

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

    /**
     * Le héros lance un sort, puis le monstre riposte.
     * @param {import("./sorts.js").Sort} sort
     */
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
```

## 🏆 Défis pour aller plus loin

1. **Un dossier par thème** : range `personnages.js`, `sorts.js` et `monstre.js` dans `js/combattants/`. Quels `import` dois-tu corriger ? (Indice : `../outils.js` remonte d'un dossier.)
2. **`export default`** : un module peut avoir **un** export « principal ». Cherche la différence entre `export default class Carte` et `export class Carte`, et pourquoi ce tutoriel préfère la seconde (indice : le nom à l'import).
3. **Chasse aux pièges avec `@ts-check`** : ajoute `// @ts-check` en haut de `combat.js` et lis les remarques de l'éditeur. La plupart demandent juste de préciser un type (par exemple `getElementById` renvoie un `HTMLElement` « général », sans `disabled`). Une remarque de ce genre a permis de trouver une vraie faille du dossier `magie` : `peutLancer` et `lancerSort` n'existaient que dans le `Mage`, alors que `Combat` les demande à **tous** les héros. Le jeu marchait seulement parce que le Chevalier n'a aucun bouton de sort. Elles sont maintenant dans `Heros`. Trouveras-tu un autre piège caché ?

➡️ Suite : ton code est rangé et documenté, mais ton jeu est encore bien statique. [Donne-lui du mouvement avec les animations](../animations/01-introduction.md).
