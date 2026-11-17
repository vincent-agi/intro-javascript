# 07 – Respecter les joueurs, et code final

🎯 **À la fin de cette étape** : si un joueur a demandé à son ordinateur de **réduire les animations**, ton jeu le respecte : plus rien ne bouge, mais tout marche. Et tu relis le code final complet.

## Le concept : `prefers-reduced-motion`

Pour certaines personnes, les mouvements à l'écran donnent **des vertiges ou des nausées** (et le clignotement peut être pénible). Les systèmes (Windows, macOS, Android, iOS) ont donc un réglage « **réduire les animations** ». Un site bien fait le **respecte**.

Le navigateur le transmet de deux façons :

- en **CSS**, avec une *media query* : `@media (prefers-reduced-motion: reduce) { ... }` ;
- en **JavaScript**, avec `window.matchMedia("(prefers-reduced-motion: reduce)").matches`, qui vaut `true` ou `false`.

Il faut donc couper **deux** sortes d'animations : celles du CSS, et celles lancées par `animer`. Et c'est là que notre **outil unique** de l'étape 03 montre sa force : on le modifie **une fois**, et tout le jeu en profite.

## Le code

**1.** À la fin d'`animations.css` :

```css
/* ===== Respecter les joueurs (étape 07) ===== */

/* Le joueur a demandé moins d'animations dans les réglages de son système :
   on coupe les animations et les transitions CSS */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation: none !important;
        transition: none !important;
    }
}
```

`*` veut dire « tous les éléments ». `!important` force la règle, même face à des règles plus précises comme `#sprite-monstre`.

**2.** Dans `js/outils.js`, juste avant la JSDoc d'`animer` :

```javascript
// Le joueur a demandé moins d'animations dans les réglages de son système ?
const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

Et au début d'`animer` :

```javascript
export function animer(element, etapes, duree) {
    if (mouvementReduit) return Promise.resolve(); // pas d'animation : on passe à la suite
    const animation = element.animate(etapes, { duration: duree, easing: "ease-out" });
    return animation.finished.then(() => {});
}
```

`Promise.resolve()` est une promesse **déjà réalisée** : le code qui attend la fin de l'animation (comme `.then(() => chiffre.remove())`) continue tout de suite. Rien ne casse.

`mouvementReduit` n'est **pas** exporté : c'est un détail interne d'`outils.js`. Les autres fichiers n'ont pas à le connaître.

## Vérifier

1. Joue normalement : rien n'a changé, tout bouge.
2. Simule le réglage : `F12` → menu `⋮` → *More tools* → **Rendering** → *Emulate CSS media feature prefers-reduced-motion* → **reduce**. Recharge.
3. Le héros ne respire plus, ne saute plus, l'eau est calme, les écrans apparaissent sans glisser, les chiffres ne s'envolent pas… et **le jeu marche toujours** du début à la fin.
4. Remets le réglage sur *No emulation*.

> 💡 Note : le clignotement de la rencontre (dossier `api`) est lui aussi coupé. La pause de 0,8 seconde reste, elle, car elle vient de `attendre(800)` en JavaScript, pas d'une animation.

> 🆘 Bloqué ? Le projet complet est dans ce dossier : [`index.html`](./index.html), [`carte.css`](./carte.css), [`animations.css`](./animations.css), [`map.json`](./map.json) et le dossier [`js/`](./js/). Ajoute ton dossier `sons/` à côté.

## Bilan : avant / après

| Moment du jeu | Avant | Après |
| --- | --- | --- |
| Rien ne se passe | tout est figé | l'eau scintille, le héros respire |
| Un pas | le pion glisse | le héros saute et regarde où il va |
| Un choc contre un arbre | un son | un son **et** le héros tremble |
| Un monstre surgit | l'écran change d'un coup | l'écran glisse, le monstre jaillit et flotte, les boutons arrivent en cascade |
| Un coup | un chiffre change | la cible tremble, « -24 » s'envole |
| Un soin | un chiffre change | « +30 » vert s'envole |
| PV en baisse | une barre verte plus courte | vert → orange → rouge qui clignote |
| Fin du combat | un message | le vaincu pâlit et s'affaisse, le vainqueur saute de joie |
| Joueur sensible au mouvement | — | tout est calme, le jeu marche |

### Ce qu'il faut retenir de tout le dossier

- **Trois outils** : `transition` (un changement en douceur), `@keyframes` (une animation qui tourne toute seule), `element.animate` (une animation déclenchée par le code).
- **CSS pour ce qui tourne seul, JavaScript pour ce qui répond au joueur.**
- **JavaScript change une classe, CSS fait le spectacle.**
- **Un seul outil `animer`** : facile à modifier pour tout le jeu (la preuve avec `prefers-reduced-motion`).
- Des animations **courtes** (150 à 600 ms) : elles doivent aider le joueur, pas le faire attendre.
- On **respecte** les joueurs qui demandent moins de mouvement.

## Le code final

Seuls ces fichiers ont changé depuis le dossier `modules`. Les autres (`carte.css`, `map.json`, `main.js`, `sons.js`, `personnages.js`, `sorts.js`, `monstre.js`, `journal.js`, `carte.js`) sont **identiques**.

### `index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mini RPG</title>
    <link rel="stylesheet" href="../../style.css">
    <link rel="stylesheet" href="carte.css">
    <link rel="stylesheet" href="animations.css">
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
        <section id="zone-heros">
            <h2><span id="nom-heros">Héros</span> : <span id="pv-joueur">100</span> PV</h2>
            <div class="barre"><div id="barre-joueur" class="vie"></div></div>
            <!-- Le mana du mage -->
            <div id="zone-mana">
                <p>🔮 Mana : <span id="mana-joueur">50</span></p>
                <div class="barre"><div id="barre-mana" class="vie"></div></div>
            </div>
        </section>

        <!-- Le monstre -->
        <section id="zone-monstre">
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

### `animations.css`

```css
/* Toutes les animations du jeu */

/* ===== Le monde qui respire (étape 02) ===== */

/* L'eau scintille : sa luminosité monte et descend, sans fin */
.tile-eau {
    animation: vagues 1.2s ease-in-out infinite alternate;
}

@keyframes vagues {
    to { filter: brightness(1.25); }
}

/* Le héros respire : il monte et descend de 3 pixels, sans fin */
.sprite-joueur {
    display: inline-block; /* un <span> doit être "inline-block" pour bouger */
    animation: respire 0.6s ease-in-out infinite alternate;
}

@keyframes respire {
    to { transform: translateY(-3px); }
}

/* ===== L'entrée en combat (étape 04) ===== */

/* L'écran de combat arrive en fondu, en glissant vers le haut.
   Il se rejoue tout seul chaque fois que l'écran réapparaît. */
#combat {
    animation: arrivee 0.4s ease-out;
}

@keyframes arrivee {
    from { opacity: 0; transform: translateY(20px); }
}

/* Le monstre surgit en rebondissant, puis flotte sur place */
#sprite-monstre {
    animation:
        surgit 0.6s 0.2s cubic-bezier(0.3, 1.6, 0.6, 1) both,
        flotte 1.5s 0.8s ease-in-out infinite alternate;
}

@keyframes surgit {
    from { transform: scale(0); }
}

@keyframes flotte {
    to { transform: translateY(-6px); }
}

/* Les boutons arrivent l'un après l'autre */
.actions button {
    animation: arrivee 0.3s ease-out both;
}

.actions button:nth-child(2) { animation-delay: 0.1s; }
.actions button:nth-child(3) { animation-delay: 0.2s; }

/* ===== Les coups qui portent (étape 05) ===== */

/* Les zones du héros et du monstre servent de repère aux chiffres */
#zone-heros,
#zone-monstre {
    position: relative;
}

/* Un chiffre de dégâts ou de soin, posé par-dessus la zone */
.chiffre {
    position: absolute;
    top: 0;
    right: 10%;
    font-size: 28px;
    font-weight: bold;
    pointer-events: none; /* on peut cliquer "à travers" */
}

/* Côté monstre, le chiffre part de son image (plus bas dans la zone) */
#zone-monstre .chiffre {
    top: 30%;
}

/* ===== Victoire, défaite et barres de vie (étape 06) ===== */

/* Le vaincu pâlit, devient gris et s'affaisse doucement */
.vaincu {
    opacity: 0.4;
    filter: grayscale(1);
    transform: translateY(10px);
    transition: opacity 0.8s, filter 0.8s, transform 0.8s;
}

/* La barre de vie change de couleur en douceur */
.vie {
    transition: width 0.3s, background-color 0.5s;
}

.vie.moyen    { background-color: #f5a623; } /* orange : moins de la moitié */
.vie.critique { background-color: #e53935; } /* rouge : presque à terre */

/* En danger, la barre rouge clignote */
.vie.critique {
    animation: alerte 0.5s ease-in-out infinite alternate;
}

@keyframes alerte {
    to { opacity: 0.5; }
}

/* ===== Respecter les joueurs (étape 07) ===== */

/* Le joueur a demandé moins d'animations dans les réglages de son système :
   on coupe les animations et les transitions CSS */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation: none !important;
        transition: none !important;
    }
}
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

// Le joueur a demandé moins d'animations dans les réglages de son système ?
const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Joue une petite animation sur un élément de la page.
 * @param {Element} element - l'élément à animer
 * @param {Keyframe[]} etapes - les étapes de l'animation (comme dans un @keyframes)
 * @param {number} duree - la durée, en millisecondes
 * @returns {Promise<void>} se termine quand l'animation est finie
 * @example animer(bouton, [{ opacity: 0 }, { opacity: 1 }], 300);
 */
export function animer(element, etapes, duree) {
    if (mouvementReduit) return Promise.resolve(); // pas d'animation : on passe à la suite
    const animation = element.animate(etapes, { duration: duree, easing: "ease-out" });
    return animation.finished.then(() => {});
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

### `js/exploration.js`

```javascript
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
```

### `js/combat.js`

```javascript
// Le déroulement d'un combat

import { animer } from "./outils.js";

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

        this.zoneHeros = document.getElementById("zone-heros");
        this.zoneMonstre = document.getElementById("zone-monstre");
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
        this.journal.vider();     // un nouveau combat, un journal propre

        this.boutonAttaque.disabled = false;
        this.boutonSoin.disabled = false;
        this.boutonRetour.hidden = true;
        this.zoneHeros.classList.remove("vaincu");   // un nouveau combat : tout le monde debout
        this.zoneMonstre.classList.remove("vaincu");

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
        this.colorerBarre(this.barreJoueur, this.heros.pv / this.heros.pvMax);
        this.colorerBarre(this.barreMonstre, this.monstre.pv / this.monstre.pvMax);

        // Le mana, comme les PV : un texte et une barre (si le héros en a)
        if (this.heros.manaMax > 0) {
            this.texteManaJoueur.textContent = this.heros.mana;
            this.barreMana.style.width = (this.heros.mana / this.heros.manaMax) * 100 + "%";
        }

        this.mettreAJourSorts(); // le mana a peut-être changé
    }

    // Vert, orange ou rouge selon la part de vie qui reste (ratio entre 0 et 1)
    colorerBarre(barre, ratio) {
        barre.classList.toggle("moyen", ratio <= 0.5 && ratio > 0.2);
        barre.classList.toggle("critique", ratio <= 0.2);
    }

    // Les PV de chacun, à un instant donné
    photo() {
        return { heros: this.heros.pv, monstre: this.monstre.pv };
    }

    // Montre ce qui a changé depuis la photo "avant"
    montrerChangements(avant) {
        this.montrerEcart(this.zoneHeros, this.heros.pv - avant.heros);
        this.montrerEcart(this.zoneMonstre, this.monstre.pv - avant.monstre);
    }

    // Un écart de PV : "-12" en rouge avec une secousse, ou "+20" en vert
    montrerEcart(zone, ecart) {
        if (ecart < 0) {
            this.afficherChiffre(zone, String(ecart), "#d32f2f");
            animer(zone, [
                { transform: "translateX(0)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(-4px)" },
                { transform: "translateX(0)" }
            ], 300);
        } else if (ecart > 0) {
            this.afficherChiffre(zone, "+" + ecart, "#2e7d32");
        }
    }

    // Un chiffre qui s'envole et s'efface, puis disparaît de la page
    afficherChiffre(zone, texte, couleur) {
        const chiffre = document.createElement("span");
        chiffre.className = "chiffre";
        chiffre.textContent = texte;
        chiffre.style.color = couleur;
        zone.appendChild(chiffre);

        animer(chiffre, [
            { transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(-50px)", opacity: 0 }
        ], 900).then(() => chiffre.remove());
    }

    riposte() {
        this.sons.jouer("degats");
        const avant = this.photo();
        this.journal.ajouter(this.monstre.attaquer(this.heros));
        this.montrerChangements(avant);
        this.heros.regenererMana(5); // fin du tour : le mage récupère un peu de mana
    }

    verifierFin() {
        if (this.monstre.estVaincu()) {
            this.journal.ajouter("🎉 Victoire ! " + this.monstre.nom + " est vaincu !");
            this.enCours = false;
            this.sons.arreterMusique();     // place au jingle de fin
            this.sons.jouer("victoire");
            this.zoneMonstre.classList.add("vaincu");
            animer(this.zoneHeros, [                // le héros saute de joie
                { transform: "translateY(0)" },
                { transform: "translateY(-15px)" },
                { transform: "translateY(0)" },
                { transform: "translateY(-8px)" },
                { transform: "translateY(0)" }
            ], 600);
        } else if (this.heros.estVaincu()) {
            this.journal.ajouter("💀 Défaite... Le héros est à terre.");
            this.enCours = false;
            this.sons.arreterMusique();     // place au jingle de fin
            this.sons.jouer("defaite");
            this.zoneHeros.classList.add("vaincu");
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
        const avant = this.photo();
        this.journal.ajouter(this.heros.attaquer(this.monstre));
        this.montrerChangements(avant);

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
        const avant = this.photo();
        this.journal.ajouter(this.heros.lancerSort(sort, this.monstre));
        this.montrerChangements(avant);
        animer(this.spriteMonstre,             // le monstre s'illumine
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
        const avant = this.photo();
        this.journal.ajouter(this.heros.soigner());
        this.montrerChangements(avant);

        this.riposte();
        this.verifierFin();
        this.afficherVie();
    }
}
```

## 🏆 Défis pour aller plus loin

1. **La rencontre version rétro** : remplace le clignotement par un rideau noir qui balaie l'écran de gauche à droite (`@keyframes` sur un `::after` de `#carte`, avec `width` de 0 à 100 %).
2. **Le sort qui vole** : quand le Mage lance une Boule de feu, crée un `<span>🔥</span>` qui part de la zone du héros et vole jusqu'au monstre (`animer` avec deux `transform: translate(...)`), et n'applique les dégâts **qu'à l'arrivée** (`await`).
3. **Le tour par tour animé** : fais le défi de l'étape 05 (riposte après une pause), puis désactive tous les boutons pendant les animations. Ton combat ressemblera enfin à celui des vieux jeux !

➡️ Ton jeu bouge, il est vivant. Place à ton imagination : [écris ton histoire](../histoire/01-introduction.md).
