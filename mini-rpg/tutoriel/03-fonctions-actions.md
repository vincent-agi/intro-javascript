# 03 – Les fonctions : attaquer, soigner, riposter

## Le concept

Une **fonction** est un bloc de code auquel on donne un nom, pour le réutiliser :

```javascript
function direBonjour(prenom) {   // prenom = un paramètre (une info donnée à la fonction)
    return "Bonjour " + prenom;  // return = ce que la fonction renvoie
}

direBonjour("Léa");              // on l'appelle → "Bonjour Léa"
```

On peut relier une fonction à un bouton avec `addEventListener` : « quand on clique, lance cette fonction ».

## Le code

Ajoute ceci dans `app.js`, **après** `afficherVie();` :

```javascript
/* ===== LES BOUTONS ===== */

const boutonAttaque = document.getElementById("btn-attaque");
const boutonSoin = document.getElementById("btn-soin");
const message = document.getElementById("message");

/* ===== LES FONCTIONS ===== */

// Renvoie un entier au hasard entre min et max (inclus)
function nombreAuHasard(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Le monstre réplique : il enlève entre 5 et 15 PV au héros
function riposte() {
    const degats = nombreAuHasard(5, 15);
    // Math.max(0, ...) empêche d'avoir des PV négatifs
    pvJoueur = Math.max(0, pvJoueur - degats);
    message.textContent = "👹 Le monstre riposte : -" + degats + " PV !";
}

// Le héros attaque : il enlève entre 10 et 20 PV au monstre
function attaquer() {
    const degats = nombreAuHasard(10, 20);
    pvMonstre = Math.max(0, pvMonstre - degats);
    console.log("Tu infliges " + degats + " dégâts.");

    riposte();     // le monstre répond toujours
    afficherVie(); // on met l'écran à jour
}

// Le héros se soigne de 15 PV, sans dépasser le maximum
function soigner() {
    // Math.min(a, b) garde la plus petite des deux valeurs
    pvJoueur = Math.min(PV_MAX_JOUEUR, pvJoueur + 15);
    console.log("Tu récupères des PV.");

    riposte();
    afficherVie();
}

/* ===== LES ÉVÉNEMENTS ===== */

boutonAttaque.addEventListener("click", attaquer);
boutonSoin.addEventListener("click", soigner);
```

### Ce qu'il faut retenir

- Une fonction peut en appeler une autre (`attaquer` appelle `riposte`).
- `Math.max(0, x)` empêche de descendre sous 0, `Math.min(max, x)` empêche de dépasser un maximum.
- On écrit `attaquer` **sans parenthèses** dans `addEventListener` : on donne la fonction, on ne la lance pas encore.

## ⚠️ Un bug à repérer

Clique sur **Attaquer** jusqu'à ce que les PV du monstre tombent à `0`. Que se passe-t-il ? Le combat continue ! C'est le sujet de l'étape suivante.

## 🏆 Défi

Crée une fonction `coupCritique()` : elle enlève `30` PV au monstre, puis le monstre riposte. Ajoute un bouton dans le HTML (`id="btn-critique"`) et relie-le à ta fonction.

➡️ Suite : [04 – Conditions et fin de partie](./04-conditions-et-fin.md)
