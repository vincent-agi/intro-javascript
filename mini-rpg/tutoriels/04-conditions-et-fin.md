# 04 – Les conditions : victoire et défaite

## Le concept

Une **condition** permet au programme de choisir quoi faire :

```javascript
if (condition1) {
    // fait ça si condition1 est vraie
} else if (condition2) {
    // sinon, fait ça si condition2 est vraie
} else {
    // sinon, fait ça dans tous les autres cas
}
```

Comparaisons utiles : `<` (plus petit), `>` (plus grand), `<=` (plus petit ou égal), `===` (égal).

Un **booléen** est une variable qui vaut seulement `true` (vrai) ou `false` (faux). Ici, il va servir à savoir si le combat est en cours.

## Le code

**1.** Ajoute une variable d'état avec les autres `let`, en haut du fichier :

```javascript
let jeuEnCours = true; // true = le combat continue, false = il est fini
```

**2.** Ajoute cette fonction avant `attaquer` :

```javascript
// Regarde si quelqu'un a perdu, et arrête le jeu si besoin
function verifierFin() {
    if (pvMonstre <= 0) {
        message.textContent = "🎉 Victoire ! Le monstre est vaincu !";
        jeuEnCours = false;
    } else if (pvJoueur <= 0) {
        message.textContent = "💀 Défaite... Le héros est à terre.";
        jeuEnCours = false;
    }
    // Sinon : personne n'a perdu, on ne change rien

    // Si le combat est fini, on bloque les boutons
    if (!jeuEnCours) {
        boutonAttaque.disabled = true;
        boutonSoin.disabled = true;
    }
}
```

`!jeuEnCours` se lit « jeuEnCours est faux ».

**3.** Remplace `attaquer` et `soigner` :

```javascript
function attaquer() {
    if (!jeuEnCours) return; // combat fini : on ne fait rien

    const degats = nombreAuHasard(10, 20);
    pvMonstre = Math.max(0, pvMonstre - degats);
    message.textContent = "⚔️ Tu infliges " + degats + " dégâts !";

    verifierFin();       // le monstre est peut-être mort
    if (jeuEnCours) {    // s'il est encore debout, il riposte
        riposte();
        verifierFin();   // le héros est peut-être tombé
    }
    afficherVie();
}

function soigner() {
    if (!jeuEnCours) return;

    pvJoueur = Math.min(PV_MAX_JOUEUR, pvJoueur + 15);
    message.textContent = "💚 Tu récupères 15 PV.";

    riposte();
    verifierFin();
    afficherVie();
}
```

### Ce qu'il faut retenir

- L'ordre des tests compte : on vérifie la victoire **avant** la défaite.
- `return` quitte la fonction immédiatement.
- Un monstre mort ne riposte pas : d'où le `if (jeuEnCours)`.

## 🏆 Défi

Ajoute dans `verifierFin` une alerte visuelle : quand le héros a **moins de 30 PV** (et que le combat continue), affiche « ⚠️ Attention, PV faibles ! » dans le message.

➡️ Suite : [05 – Tableau, historique et boucle](./05-tableau-historique-boucle.md)
