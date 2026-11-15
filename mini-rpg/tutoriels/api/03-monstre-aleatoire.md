# 03 – Monstre aléatoire et gestion d'erreurs

## Le concept

Une URL peut être **construite** : `".../pokemon/" + id`. Avec un `id` tiré au hasard, chaque combat a un nouvel adversaire.

Mais un réseau peut **échouer** (pas de connexion, API en panne, mauvais `id`). Un programme solide prévoit un plan B avec `try` / `catch` :

```javascript
try {
    // on essaie...
    const donnees = await chargerJson(url);
} catch (erreur) {
    // ...et si une erreur se produit, on arrive ici au lieu de planter
    console.error(erreur);
}
```

## Le code

**1.** Sous la classe `Monstre`, ajoute :

```javascript
// Un monstre au hasard parmi les 151 premiers, ou un gobelin si l'API échoue
async function chargerMonstreAleatoire() {
    try {
        return await Monstre.depuisApi(nombreAuHasard(1, 151));
    } catch (erreur) {
        console.error(erreur);
        return new Monstre("Gobelin", 80, 5, 15); // le plan B, fait main
    }
}
```

`nombreAuHasard` existe déjà : il sert ici à choisir l'`id`. Le `await` devant `Monstre.depuisApi` est **indispensable** dans le `try` : sans lui, l'erreur échapperait au `catch`.

**2.** Il faut pouvoir **recommencer un combat**. Ajoute une méthode `restaurer` à `Personnage` :

```javascript
restaurer() {
    this.pv = this.pvMax;
}
```

**3.** Dans `index.html`, ajoute un bouton dans `.actions` :

```html
<button id="btn-nouveau">🔄 Nouveau combat</button>
```

**4.** Transforme `Combat` : il ne reçoit plus de monstre à la création. Il en reçoit un à chaque `demarrer`. Voici les parties modifiées :

```javascript
class Combat {
    constructor(heros, journal) {          // plus de paramètre "monstre"
        this.heros = heros;
        this.journal = journal;
        this.monstre = null;               // pas encore d'adversaire
        this.enCours = false;

        // ... les éléments de la page, comme avant, plus :
        this.boutonNouveau = document.getElementById("btn-nouveau");

        this.boutonAttaque.addEventListener("click", () => this.attaquer());
        this.boutonSoin.addEventListener("click", () => this.soigner());
        this.boutonNouveau.addEventListener("click", () => this.nouveauCombat());
        // (plus d'appel à afficherMonstre ni afficherVie ici)
    }

    // Lance un combat contre ce monstre
    demarrer(monstre) {
        this.monstre = monstre;
        this.enCours = true;

        this.boutonAttaque.disabled = false;
        this.boutonSoin.disabled = false;

        this.afficherMonstre();
        this.journal.ajouter("❗ " + monstre.nom + " sauvage apparaît !");
        this.afficherVie();
    }

    // Soigne le héros, charge un monstre au hasard et démarre
    async nouveauCombat() {
        this.enCours = false;
        this.boutonAttaque.disabled = true;   // pas de coups pendant le chargement
        this.boutonSoin.disabled = true;
        this.boutonNouveau.disabled = true;
        this.journal.ajouter("⏳ Un adversaire approche...");

        this.heros.restaurer();
        this.demarrer(await chargerMonstreAleatoire());

        this.boutonNouveau.disabled = false;
    }

    // afficherMonstre, afficherVie, riposte, verifierFin, attaquer, soigner : inchangées
}
```

**5.** Remplace le démarrage :

```javascript
const combat = new Combat(new Heros("Héros"), journal);
combat.nouveauCombat();
```

(Tu peux supprimer la fonction `demarrer` de l'étape 02.)

## Vérifier

1. Recharge la page : un Pokémon au hasard apparaît. Clique **Nouveau combat** plusieurs fois.
2. **Teste le plan B** : coupe ta connexion (ou modifie temporairement l'URL en `".../pokemon-cassé/"`). Un **Gobelin** apparaît, et l'erreur est visible dans la console (`F12`). Remets l'URL correcte.

### Ce qu'il faut retenir

- Une URL se **compose** avec des variables.
- `try` / `catch` : le jeu continue même si le réseau échoue.
- Pendant un chargement, **désactive** les boutons pour éviter les actions en double.
- `Combat` est devenu **réutilisable** : il accepte un nouveau monstre à chaque `demarrer`.

## 🏆 Défi

Les Pokémon aux PV très élevés (Leveinard : 250) rendent le combat interminable. Dans `Monstre.depuisApi`, limite les PV avec `Math.min(stat("hp"), 120)`.

➡️ Suite : [04 – Charger et afficher la carte](./04-carte.md)
