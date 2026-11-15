# 02 – Une classe `Personnage`

## Le concept

Le héros et le monstre ont les **mêmes** données (des PV, un maximum) et les **mêmes** actions (recevoir des dégâts, être vaincu). On écrit un moule **une seule fois** :

```javascript
class Chat {
    constructor(nom) {       // appelé automatiquement par "new"
        this.nom = nom;      // "this" = l'objet en cours de création
        this.energie = 10;
    }

    dormir() {               // une méthode
        this.energie = this.energie + 5;
    }
}

const felix = new Chat("Félix"); // fabrique un objet
felix.dormir();                  // appelle sa méthode
felix.energie;                   // 15
```

- `class` : définit le moule ;
- `constructor` : prépare chaque nouvel objet ;
- `this` : « cet objet-ci » ;
- `new` : fabrique un objet à partir de la classe.

## Le code

**1.** Tout en haut de `app.js`, ajoute la classe :

```javascript
/* ===== 1. LES CLASSES ===== */

class Personnage {
    constructor(nom, pvMax) {
        this.nom = nom;
        this.pvMax = pvMax;
        this.pv = pvMax; // on démarre en pleine forme
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
}
```

**2.** Remplace les variables d'état par deux objets :

```javascript
// AVANT
const PV_MAX_JOUEUR = 100;
const PV_MAX_MONSTRE = 80;
let pvJoueur = PV_MAX_JOUEUR;
let pvMonstre = PV_MAX_MONSTRE;

// APRÈS
const joueur = new Personnage("Héros", 100);
const monstre = new Personnage("Monstre", 80);
```

**3.** Adapte les fonctions. La logique des PV (`Math.max`, `Math.min`) est **partie dans la classe** : les fonctions s'allègent.

```javascript
function afficherVie() {
    textePvJoueur.textContent = joueur.pv;
    textePvMonstre.textContent = monstre.pv;
    barreJoueur.style.width = (joueur.pv / joueur.pvMax) * 100 + "%";
    barreMonstre.style.width = (monstre.pv / monstre.pvMax) * 100 + "%";
}

function riposte() {
    const degats = nombreAuHasard(5, 15);
    joueur.recevoirDegats(degats); // AVANT : pvJoueur = Math.max(0, pvJoueur - degats);
    ajouterEvenement("👹 Le monstre riposte : -" + degats + " PV !");
}

function verifierFin() {
    if (monstre.estVaincu()) {                       // AVANT : pvMonstre <= 0
        ajouterEvenement("🎉 Victoire ! Le monstre est vaincu !");
        jeuEnCours = false;
    } else if (joueur.estVaincu()) {
        ajouterEvenement("💀 Défaite... Le héros est à terre.");
        jeuEnCours = false;
    }

    if (!jeuEnCours) {
        boutonAttaque.disabled = true;
        boutonSoin.disabled = true;
    }
}
```

Dans `attaquer` et `soigner`, change seulement la ligne des PV :

```javascript
monstre.recevoirDegats(degats);  // dans attaquer
joueur.recevoirSoin(15);         // dans soigner
```

## Vérifier

Recharge la page : le jeu se comporte **exactement** comme avant. C'est le but d'un **refactoring** : changer la structure, pas le résultat.

Dans la console (`F12`), teste tes objets :

```javascript
joueur.pv;               // 100
joueur.recevoirDegats(30);
joueur.pv;               // 70
joueur.estVaincu();      // false
```

### Ce qu'il faut retenir

- Une **classe** décrit, un **objet** est fabriqué avec `new`.
- Le **constructeur** initialise les propriétés avec `this`.
- Les règles (« les PV ne descendent pas sous 0 ») vivent **dans la classe**, une seule fois.

## 🏆 Défi

Ajoute une méthode `estEnDanger()` qui renvoie `true` quand les PV sont sous `25 %` du maximum. Teste-la dans la console.

➡️ Suite : [03 – Une classe Journal](./03-classe-journal.md)
