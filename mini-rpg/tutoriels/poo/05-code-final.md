# 05 – Le chef d'orchestre `Combat` et le code final

## Le concept

Il reste des variables et fonctions **globales** : `jeuEnCours`, les éléments de la page, `attaquer`, `soigner`, `verifierFin`… Elles forment un tout : **le combat**. On en fait une dernière classe.

Un détail important : quand on passe `this.attaquer` à `addEventListener`, `this` est perdu au moment du clic. Une **fonction fléchée** règle ça :

```javascript
bouton.addEventListener("click", () => this.attaquer());
//                              ^^^^^ "this" reste le combat
```

## Le code

**1.** Sous `Journal`, crée la classe `Combat`. Pour passer des fonctions aux méthodes :

- `function attaquer() {…}` devient `attaquer() {…}` (plus de mot `function`) ;
- `jeuEnCours` devient `this.enCours` ;
- `joueur` devient `this.heros`, `monstre` devient `this.monstre`, `journal` devient `this.journal` ;
- tout appel à une autre méthode passe par `this.` (`this.riposte()`).

Les éléments de la page se cherchent dans le **constructeur**, qui branche aussi les boutons.

**2.** Termine `app.js` par le démarrage, trois lignes seulement :

```javascript
const journal = new Journal(
    document.getElementById("journal"),
    document.getElementById("message"),
    5
);

new Combat(new Heros("Héros"), new Monstre("Monstre"), journal);
```

## Le code final

Voici `app.js` complet pour comparer avec le tien (aussi disponible dans [`app.js`](./app.js), jouable via [`index.html`](./index.html)).

```javascript
/* ===== 1. LES CLASSES ===== */

// Renvoie un entier au hasard entre min et max (inclus)
function nombreAuHasard(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Le moule commun à tous les combattants
class Personnage {
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

    // Frappe la cible et renvoie les dégâts infligés
    attaquer(cible) {
        const degats = nombreAuHasard(this.degatsMin, this.degatsMax);
        cible.recevoirDegats(degats);
        return degats;
    }
}

// Le héros : 100 PV, attaque de 10 à 20, sait se soigner
class Heros extends Personnage {
    constructor(nom) {
        super(nom, 100, 10, 20);
    }

    attaquer(cible) {
        const degats = super.attaquer(cible);
        return "⚔️ Tu infliges " + degats + " dégâts !";
    }

    soigner() {
        this.recevoirSoin(15);
        return "💚 Tu récupères 15 PV.";
    }
}

// Le monstre : 80 PV, attaque de 5 à 15
class Monstre extends Personnage {
    constructor(nom) {
        super(nom, 80, 5, 15);
    }

    attaquer(cible) {
        const degats = super.attaquer(cible);
        return "👹 Le monstre riposte : -" + degats + " PV !";
    }
}

// Le message principal et la liste des derniers événements
class Journal {
    constructor(liste, message, taille) {
        this.liste = liste;
        this.message = message;
        this.taille = taille;
        this.evenements = [];
    }

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

// Le chef d'orchestre : page, tours de jeu et fin du combat
class Combat {
    constructor(heros, monstre, journal) {
        this.heros = heros;
        this.monstre = monstre;
        this.journal = journal;
        this.enCours = true;

        this.textePvJoueur = document.getElementById("pv-joueur");
        this.textePvMonstre = document.getElementById("pv-monstre");
        this.barreJoueur = document.getElementById("barre-joueur");
        this.barreMonstre = document.getElementById("barre-monstre");
        this.boutonAttaque = document.getElementById("btn-attaque");
        this.boutonSoin = document.getElementById("btn-soin");

        // Flèche () => : "this" reste le combat quand on clique
        this.boutonAttaque.addEventListener("click", () => this.attaquer());
        this.boutonSoin.addEventListener("click", () => this.soigner());

        this.afficherVie();
    }

    afficherVie() {
        this.textePvJoueur.textContent = this.heros.pv;
        this.textePvMonstre.textContent = this.monstre.pv;
        this.barreJoueur.style.width = (this.heros.pv / this.heros.pvMax) * 100 + "%";
        this.barreMonstre.style.width = (this.monstre.pv / this.monstre.pvMax) * 100 + "%";
    }

    riposte() {
        this.journal.ajouter(this.monstre.attaquer(this.heros));
    }

    verifierFin() {
        if (this.monstre.estVaincu()) {
            this.journal.ajouter("🎉 Victoire ! Le monstre est vaincu !");
            this.enCours = false;
        } else if (this.heros.estVaincu()) {
            this.journal.ajouter("💀 Défaite... Le héros est à terre.");
            this.enCours = false;
        }

        if (!this.enCours) {
            this.boutonAttaque.disabled = true;
            this.boutonSoin.disabled = true;
        }
    }

    attaquer() {
        if (!this.enCours) return;

        this.journal.ajouter(this.heros.attaquer(this.monstre));

        this.verifierFin();
        if (this.enCours) {
            this.riposte();
            this.verifierFin();
        }
        this.afficherVie();
    }

    soigner() {
        if (!this.enCours) return;

        this.journal.ajouter(this.heros.soigner());

        this.riposte();
        this.verifierFin();
        this.afficherVie();
    }
}

/* ===== 2. LE DÉMARRAGE ===== */

const journal = new Journal(
    document.getElementById("journal"),
    document.getElementById("message"),
    5
);

new Combat(new Heros("Héros"), new Monstre("Monstre"), journal);
```

## Avant / après

| Avant (fonctions) | Après (POO) |
| --- | --- |
| `pvJoueur`, `pvMonstre` | `heros.pv`, `monstre.pv` |
| `historique` + `afficherJournal()` | `journal.ajouter()` |
| `if` pour distinguer héros et monstre | classes `Heros` et `Monstre` |
| une quinzaine de variables globales | 1 seule : `journal` |

Ajouter un mage ? Une classe `Mage extends Personnage` de quelques lignes, sans toucher au reste.

## 🏆 Défi final

Choisis-en un :

1. Ajoute un bouton **Rejouer** (dans `index.html`) et une méthode `Combat.rejouer()` : remet `pv = pvMax`, vide `journal.evenements`, réactive les boutons.
2. Branche le `Mage` de l'étape 04 : ajoute un bouton **Boule de feu** dans `index.html`, une méthode `Combat.lancerSort()` qui appelle `heros.lancerSort(monstre)` (puis riposte et vérifie la fin), et crée le héros avec `new Mage("Merlin")`.
3. Fais de `Combat` un combat à **deux monstres** : que faut-il changer ?

Bravo, ton Mini RPG est maintenant orienté objet ! 🚀
