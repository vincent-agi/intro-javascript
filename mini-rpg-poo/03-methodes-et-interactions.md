# 03 – Méthodes et interactions

## Le concept

Une **méthode** est une fonction qui appartient à une classe. Elle décrit ce que l'objet **sait faire**. On l'écrit dans la classe, sans le mot `function`, et on l'appelle avec un point :

```javascript
objet.methode(parametres);
```

L'intérêt : un objet peut recevoir **un autre objet** en paramètre. C'est ainsi qu'ils interagissent. Dans `aragorn.attaquer(gobelin)`, le héros agit sur le gobelin.

## Le code

Complète la classe `Combattant` (remplace celle de l'étape 2) :

```javascript
class Combattant {
    constructor(nom, pv, attaque) {
        this.nom = nom;
        this.pv = pv;
        this.attaque = attaque;
    }

    // Renvoie true si le combattant a encore des PV
    estVivant() {
        return this.pv > 0;
    }

    // Retire des PV, sans descendre sous 0
    recevoirDegats(montant) {
        this.pv = Math.max(0, this.pv - montant);
        console.log(`${this.nom} perd ${montant} PV (reste : ${this.pv})`);

        if (!this.estVivant()) {
            console.log(`💀 ${this.nom} est vaincu !`);
        }
    }

    // Attaque un autre combattant : "cible" est lui-même un objet
    attaquer(cible) {
        console.log(`⚔️ ${this.nom} attaque ${cible.nom} !`);
        cible.recevoirDegats(this.attaque); // on appelle une méthode de la cible
    }
}

const heros = new Combattant("Aragorn", 100, 12);
const gobelin = new Combattant("Gobelin", 40, 6);

heros.attaquer(gobelin);   // Aragorn attaque Gobelin
gobelin.attaquer(heros);   // Gobelin riposte
```

Résultat attendu :

```
⚔️ Aragorn attaque Gobelin !
Gobelin perd 12 PV (reste : 28)
⚔️ Gobelin attaque Aragorn !
Aragorn perd 6 PV (reste : 94)
```

### Ce qu'il faut retenir

- Dans une méthode, `this` désigne l'objet qui l'appelle : `heros.attaquer(...)` → `this` est `heros`.
- `attaquer` ne modifie pas directement les PV de la cible : elle demande à la cible de le faire avec `recevoirDegats`. Chaque objet gère ses propres données.
- Les accents graves `` ` `` et `${...}` permettent d'insérer des variables dans un texte.

## 🏆 Défi

Ajoute une méthode `soigner(montant)` qui augmente les PV (sans dépasser `100`). Fais attaquer le héros par le gobelin, puis soigne-le, et affiche ses PV.

➡️ Suite : [04 – Héritage et spécialisation](./04-heritage-et-specialisation.md)
