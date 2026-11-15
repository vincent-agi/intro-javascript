# 04 – Héritage : `Heros` et `Monstre`

## Le concept

Le héros et le monstre sont des `Personnage`, mais ils ne se comportent pas pareil : le héros peut se soigner, les dégâts diffèrent, les messages aussi. L'**héritage** permet de **réutiliser** le moule de base et de le **spécialiser** :

```javascript
class Animal {
    constructor(nom) { this.nom = nom; }
    crier() { return "..."; }
}

class Chien extends Animal {          // Chien reçoit tout ce qu'a Animal
    constructor(nom) {
        super(nom);                   // appelle le constructeur d'Animal
    }
    crier() {                         // redéfinit la méthode
        return super.crier() + " Wouf !"; // super.xxx() = version du parent
    }
}
```

- `extends` : « est une sorte de » ;
- `super(...)` : appelle le constructeur du parent (obligatoire en premier) ;
- `super.methode()` : appelle la méthode du parent.

## Le code

**1.** `Personnage` sait maintenant attaquer. Il reçoit les dégâts min/max et une méthode `attaquer`. Modifie son constructeur et ajoute la méthode :

```javascript
class Personnage {
    constructor(nom, pvMax, degatsMin, degatsMax) {
        this.nom = nom;
        this.pvMax = pvMax;
        this.pv = pvMax;
        this.degatsMin = degatsMin;
        this.degatsMax = degatsMax;
    }

    // … recevoirDegats, recevoirSoin, estVaincu : inchangées

    // Frappe la cible et renvoie les dégâts infligés
    attaquer(cible) {
        const degats = nombreAuHasard(this.degatsMin, this.degatsMax);
        cible.recevoirDegats(degats);
        return degats;
    }
}
```

> `nombreAuHasard` est une fonction ordinaire : place-la **avant** les classes.

**2.** Sous `Personnage`, ajoute les deux classes filles :

```javascript
class Heros extends Personnage {
    constructor(nom) {
        super(nom, 100, 10, 20); // 100 PV, dégâts de 10 à 20
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

class Monstre extends Personnage {
    constructor(nom) {
        super(nom, 80, 5, 15); // 80 PV, dégâts de 5 à 15
    }

    attaquer(cible) {
        const degats = super.attaquer(cible);
        return "👹 Le monstre riposte : -" + degats + " PV !";
    }
}
```

Les deux **redéfinissent** `attaquer` : même nom, message différent. Chacune réutilise le calcul du parent via `super.attaquer(cible)`.

**3.** Crée les bons objets :

```javascript
const joueur = new Heros("Héros");
const monstre = new Monstre("Monstre");
```

**4.** Les fonctions de jeu deviennent très courtes, car les objets font le travail :

```javascript
function riposte() {
    journal.ajouter(monstre.attaquer(joueur));
}

function attaquer() {
    if (!jeuEnCours) return;

    journal.ajouter(joueur.attaquer(monstre));

    verifierFin();
    if (jeuEnCours) {
        riposte();
        verifierFin();
    }
    afficherVie();
}

function soigner() {
    if (!jeuEnCours) return;

    journal.ajouter(joueur.soigner());

    riposte();
    verifierFin();
    afficherVie();
}
```

## Spécialiser encore : un `Mage`

Une fille peut aussi avoir ses **propres propriétés** et **méthodes**, absentes du parent. Un `Mage` est un héros fragile, avec de la **mana** et un sort puissant :

```javascript
class Mage extends Heros {
    constructor(nom) {
        super(nom);
        this.pvMax = 70;  // plus fragile que le héros de base
        this.pv = 70;
        this.mana = 30;   // propriété propre au Mage
    }

    // Méthode propre au Mage : un Heros ne sait pas faire ça
    lancerSort(cible) {
        if (this.mana < 10) {
            return "Plus de mana... " + this.attaquer(cible);
        }
        this.mana -= 10;
        cible.recevoirDegats(25);
        return `🔥 Boule de feu ! 25 dégâts (mana : ${this.mana})`;
    }
}
```

Les accents graves `` ` `` et `${...}` (*template literal*) insèrent une variable dans un texte, plus lisible que les `+`.

Teste dans la console, sans toucher au jeu :

```javascript
const merlin = new Mage("Merlin");
merlin.lancerSort(monstre);  // méthode propre
merlin.soigner();            // héritée de Heros
merlin.estVaincu();          // héritée de Personnage
```

Le `Mage` hérite de **deux niveaux** : `Mage` → `Heros` → `Personnage`. On branchera ce sort sur un bouton dans le défi final.

## Vérifier

Le jeu est identique à l'écran. Dans la console :

```javascript
joueur instanceof Heros;       // true
joueur instanceof Personnage;  // true : un Heros EST un Personnage
monstre.soigner;               // undefined : seul le héros se soigne
```

### Ce qu'il faut retenir

- `extends` reprend tout le parent ; la fille ajoute ou redéfinit.
- `super(...)` dans le constructeur, `super.methode()` dans les méthodes.
- Le code commun est écrit **une fois** (dans `Personnage`), les différences **là où elles sont** (dans les filles).

## 🏆 Défi

Crée une classe `Gobelin extends Monstre` (`30` PV, dégâts `2` à `6`). Astuce : le constructeur de `Monstre` fixe déjà `80` PV. Que dois-tu changer pour que `Gobelin` ait les siens ? (Réponse possible : donner les PV au constructeur de `Monstre` en paramètre.)

➡️ Suite : [05 – Le chef d'orchestre et le code final](./05-code-final.md)
