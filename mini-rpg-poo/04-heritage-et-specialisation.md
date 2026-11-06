# 04 – Héritage et spécialisation

## Le concept

Un Guerrier et un Mage ont des points communs (nom, PV, attaque) mais aussi des différences. Plutôt que de recopier toute la classe `Combattant`, on utilise l'**héritage** : une **sous-classe** reprend tout ce que fait la classe parente, puis ajoute ou modifie ce qu'elle veut.

Retour aux gâteaux 🎂 : le moule « gâteau au chocolat » est une version spécialisée du moule « gâteau », avec quelques étapes en plus.

- `extends` : « cette classe hérite de celle-là ».
- `super(...)` : appelle le constructeur de la classe parente. Il doit venir **en premier** dans le constructeur.
- `super.methode()` : appelle la méthode de la classe parente (utile pour la compléter).

## Le code

Ajoute ces classes **sous** `Combattant` :

```javascript
// Le Guerrier : beaucoup de PV, une bonne attaque
class Guerrier extends Combattant {
    constructor(nom) {
        // On réutilise le constructeur parent avec des valeurs imposées
        super(nom, 150, 15);
    }

    // On redéfinit attaquer() pour ajouter un message, puis on réutilise l'original
    attaquer(cible) {
        console.log(`🛡️ ${this.nom} brandit son épée !`);
        super.attaquer(cible);
    }
}

// Le Mage : fragile, mais il a de la mana et des sorts
class Mage extends Combattant {
    constructor(nom) {
        super(nom, 70, 8);
        this.mana = 30; // propriété propre au Mage
    }

    // Méthode propre au Mage : le Guerrier ne sait pas faire ça
    lancerSort(cible) {
        if (this.mana >= 10) {
            this.mana -= 10;
            console.log(`🔥 ${this.nom} lance une boule de feu ! (mana : ${this.mana})`);
            cible.recevoirDegats(25);
        } else {
            console.log(`${this.nom} n'a plus de mana...`);
            this.attaquer(cible); // retour à l'attaque normale
        }
    }
}

const aragorn = new Guerrier("Aragorn");
const merlin = new Mage("Merlin");

aragorn.attaquer(merlin);    // méthode redéfinie du Guerrier
merlin.lancerSort(aragorn);  // méthode propre au Mage
merlin.estVivant();          // méthode héritée de Combattant
```

### Ce qu'il faut retenir

- Le Guerrier et le Mage **sont** des Combattants : ils ont `nom`, `pv`, `estVivant()`, `recevoirDegats()`… sans qu'on les ait recopiés.
- Redéfinir une méthode (on dit **surcharger**) permet d'adapter le comportement d'une sous-classe.
- Pour ajouter un Archer, il suffit d'une nouvelle sous-classe : le reste du code ne change pas.

## 🏆 Défi

Crée une classe `Voleur` qui hérite de `Combattant` (`80` PV, `10` d'attaque) avec une méthode `attaqueSournoise(cible)` qui inflige le **double** de son attaque.

➡️ Suite : [05 – Code final](./05-code-final-poo.md)
