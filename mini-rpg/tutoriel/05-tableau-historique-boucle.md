# 05 – Tableau, historique et boucle `for`

## Le concept

Un **tableau** (*array*) est une liste de valeurs rangées dans l'ordre :

```javascript
const fruits = ["pomme", "poire", "kiwi"];
fruits[0];             // "pomme" (on compte à partir de 0 !)
fruits.length;         // 3 (le nombre d'éléments)
fruits.push("fraise"); // ajoute "fraise" à la fin
```

Une **boucle `for`** répète un bloc de code :

```javascript
for (let i = 0; i < 3; i++) {
    // i vaut 0, puis 1, puis 2
}
```

1. `let i = 0` : départ ;
2. `i < 3` : on continue tant que c'est vrai ;
3. `i++` : après chaque tour, on ajoute 1 à `i`.

## Le code

**1.** Ajoute en haut du fichier, avec les autres variables :

```javascript
// Le tableau qui garde TOUS les événements du combat (vide au départ)
const historique = [];
// La liste <ul> de la page
const journal = document.getElementById("journal");
```

**2.** Ajoute ces deux fonctions avant `riposte` :

```javascript
// Affiche les 5 derniers événements dans le journal
function afficherJournal() {
    journal.innerHTML = ""; // on vide la liste avant de la remplir

    // On commence 5 cases avant la fin, sans descendre sous 0
    let debut = historique.length - 5;
    if (debut < 0) {
        debut = 0;
    }

    // La boucle passe sur chaque case, de "debut" jusqu'à la fin
    for (let i = debut; i < historique.length; i++) {
        const ligne = document.createElement("li"); // crée un <li>
        ligne.textContent = historique[i];          // met le texte dedans
        journal.appendChild(ligne);                 // l'ajoute à la page
    }
}

// Écrit un texte dans le message ET dans l'historique
function ajouterEvenement(texte) {
    message.textContent = texte;
    historique.push(texte);
    afficherJournal();
}
```

**3.** Dans `riposte`, `attaquer`, `soigner` et `verifierFin`, remplace chaque ligne `message.textContent = "...";` par un appel à `ajouterEvenement("...");`. Exemple pour `riposte` :

```javascript
function riposte() {
    const degats = nombreAuHasard(5, 15);
    pvJoueur = Math.max(0, pvJoueur - degats);
    ajouterEvenement("👹 Le monstre riposte : -" + degats + " PV !");
}
```

Compare ensuite avec le [code final ci-dessous](#le-code-final).

### Ce qu'il faut retenir

- `push` ajoute à la fin du tableau, sans jamais effacer les anciens événements.
- L'historique complet est conservé ; l'écran n'en montre que les 5 derniers.
- `historique.length` évite de compter à la main.

## Le code final

Voici le fichier `app.js` complet, pour comparer avec le tien.

```javascript
/* ===== 1. L'ÉTAT DU JEU ===== */

const PV_MAX_JOUEUR = 100;
const PV_MAX_MONSTRE = 80;

let pvJoueur = PV_MAX_JOUEUR;
let pvMonstre = PV_MAX_MONSTRE;
let jeuEnCours = true; // true = combat en cours, false = terminé

// Tous les événements du combat, dans l'ordre
const historique = [];

/* ===== 2. LES ÉLÉMENTS DE LA PAGE ===== */

const textePvJoueur = document.getElementById("pv-joueur");
const textePvMonstre = document.getElementById("pv-monstre");
const barreJoueur = document.getElementById("barre-joueur");
const barreMonstre = document.getElementById("barre-monstre");
const boutonAttaque = document.getElementById("btn-attaque");
const boutonSoin = document.getElementById("btn-soin");
const message = document.getElementById("message");
const journal = document.getElementById("journal");

/* ===== 3. LES FONCTIONS ===== */

// Renvoie un entier au hasard entre min et max (inclus)
function nombreAuHasard(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Met à jour les PV et les barres de vie
function afficherVie() {
    textePvJoueur.textContent = pvJoueur;
    textePvMonstre.textContent = pvMonstre;
    barreJoueur.style.width = (pvJoueur / PV_MAX_JOUEUR) * 100 + "%";
    barreMonstre.style.width = (pvMonstre / PV_MAX_MONSTRE) * 100 + "%";
}

// Affiche les 5 derniers événements de l'historique
function afficherJournal() {
    journal.innerHTML = "";

    let debut = historique.length - 5;
    if (debut < 0) {
        debut = 0;
    }

    for (let i = debut; i < historique.length; i++) {
        const ligne = document.createElement("li");
        ligne.textContent = historique[i];
        journal.appendChild(ligne);
    }
}

// Écrit un texte dans le message ET dans l'historique
function ajouterEvenement(texte) {
    message.textContent = texte;
    historique.push(texte);
    afficherJournal();
}

// Le monstre réplique : -5 à -15 PV pour le héros
function riposte() {
    const degats = nombreAuHasard(5, 15);
    pvJoueur = Math.max(0, pvJoueur - degats);
    ajouterEvenement("👹 Le monstre riposte : -" + degats + " PV !");
}

// Regarde si quelqu'un a perdu, et bloque le jeu si besoin
function verifierFin() {
    if (pvMonstre <= 0) {
        ajouterEvenement("🎉 Victoire ! Le monstre est vaincu !");
        jeuEnCours = false;
    } else if (pvJoueur <= 0) {
        ajouterEvenement("💀 Défaite... Le héros est à terre.");
        jeuEnCours = false;
    }

    if (!jeuEnCours) {
        boutonAttaque.disabled = true;
        boutonSoin.disabled = true;
    }
}

// Action : attaquer (-10 à -20 PV pour le monstre)
function attaquer() {
    if (!jeuEnCours) return;

    const degats = nombreAuHasard(10, 20);
    pvMonstre = Math.max(0, pvMonstre - degats);
    ajouterEvenement("⚔️ Tu infliges " + degats + " dégâts !");

    verifierFin();
    if (jeuEnCours) {
        riposte();
        verifierFin();
    }
    afficherVie();
}

// Action : se soigner (+15 PV, plafonnés au maximum)
function soigner() {
    if (!jeuEnCours) return;

    pvJoueur = Math.min(PV_MAX_JOUEUR, pvJoueur + 15);
    ajouterEvenement("💚 Tu récupères 15 PV.");

    riposte();
    verifierFin();
    afficherVie();
}

/* ===== 4. LES ÉVÉNEMENTS ET LE DÉMARRAGE ===== */

boutonAttaque.addEventListener("click", attaquer);
boutonSoin.addEventListener("click", soigner);

afficherVie();
```

## 🏆 Défi final

Choisis-en un :

1. Ajoute un bouton **Rejouer** qui remet les PV au maximum, vide l'historique (`historique.length = 0;`) et réactive les boutons.
2. Affiche le nombre de tours joués, en utilisant `historique.length`.
3. Change l'affichage du journal pour montrer les **10** derniers événements au lieu de 5.

Bien joué, tu viens de créer ton premier RPG en JavaScript ! 🚀
