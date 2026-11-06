# 02 – Notre première classe

## Le concept

Une **classe** se déclare avec le mot `class`. Son **constructeur** (`constructor`) est la fonction spéciale appelée à chaque fabrication d'un nouvel objet : c'est lui qui remplit les « ingrédients ».

Dans le constructeur, `this` veut dire **« cet objet-ci »**, le gâteau en cours de fabrication. Pour fabriquer un objet, on utilise le mot `new`.

## Le code

Écris ceci dans `app.js` :

```javascript
// Le moule : tous les combattants auront un nom, des PV et une force d'attaque
class Combattant {
    // Appelé automatiquement à chaque "new Combattant(...)"
    constructor(nom, pv, attaque) {
        this.nom = nom;         // propriété : le nom
        this.pv = pv;           // propriété : les points de vie
        this.attaque = attaque; // propriété : les dégâts infligés
    }
}

// On fabrique deux gâteaux avec le même moule
const heros = new Combattant("Aragorn", 100, 12);
const gobelin = new Combattant("Gobelin", 40, 6);

// On lit les propriétés avec un point
console.log(heros.nom);    // "Aragorn"
console.log(gobelin.pv);   // 40

// Chaque objet est indépendant : modifier l'un ne touche pas l'autre
heros.pv = 80;
console.log(heros.pv, gobelin.pv); // 80 40
```

Lance `node app.js` : tu dois voir s'afficher `Aragorn`, `40`, puis `80 40`.

### Ce qu'il faut retenir

- Le nom d'une classe commence par une **majuscule** (`Combattant`).
- `this.pv = pv` : à gauche la propriété de l'objet, à droite le paramètre reçu.
- Sans `new`, aucun objet n'est créé.
- Un objet regroupe ses données au même endroit : plus besoin de `pvJoueur` et `pvMonstre`.

## 🏆 Défi

Ajoute une propriété `niveau` au constructeur (valeur par défaut : `1`). Astuce : un paramètre peut avoir une valeur par défaut, par exemple `constructor(nom, pv, attaque, niveau = 1)`. Crée un combattant sans préciser le niveau, puis un autre de niveau `5`, et affiche-les.

➡️ Suite : [03 – Méthodes et interactions](./03-methodes-et-interactions.md)
