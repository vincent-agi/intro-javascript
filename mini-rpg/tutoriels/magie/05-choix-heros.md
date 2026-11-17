# 05 – Choisir son héros

🎯 **À la fin de cette étape** : au lancement, un écran propose 🤺 Chevalier ou 🧙 Mage. Le jeu s'adapte au choix : emoji sur la carte, nom en combat, barre de mana et sorts seulement pour le Mage.

## Le concept

Le jeu doit marcher avec **les deux** héros, sans `if (c'est un mage)` partout. L'astuce : donner à **tout** héros les mêmes propriétés, avec des valeurs « vides » pour le Chevalier.

| Propriété / méthode | Chevalier (`Heros`) | Mage |
| --- | --- | --- |
| `emoji` | `"🤺"` | `"🧙"` |
| `manaMax`, `mana` | `0` | `50` |
| `sorts` | `[]` (aucun) | 3 sorts |
| `regenererMana(montant)` | ne fait **rien** | remonte le mana |

Résultat : `Combat` crée « un bouton par sort ». Pour le Chevalier, la liste est vide, donc **aucun bouton**, sans écrire une ligne de plus. Et `regenererMana(5)` ne plante pas : la version du Chevalier ne fait simplement rien.

## Le code

**1.** Dans le constructeur de `Heros`, sous `super(...)`, donne les valeurs « vides » :

```javascript
this.emoji = "🤺";
this.manaMax = 0;  // un chevalier n'a pas de mana...
this.mana = 0;
this.sorts = [];   // ...et ne connaît aucun sort
```

Et ajoute à `Heros` cette méthode… qui ne fait rien :

```javascript
// Un héros sans mana n'en récupère pas : cette version ne fait rien.
// Le Mage a sa propre version, qui remplace celle-ci.
regenererMana(montant) {}
```

**2.** Dans le constructeur du `Mage`, sous `super(nom, 80, 4, 8);`, donne-lui son emoji :

```javascript
this.emoji = "🧙";
```

Le constructeur de `Heros` s'exécute **d'abord** (avec `super`) et met `"🤺"`, puis le Mage remplace par `"🧙"`. Pareil pour `manaMax`, `mana` et `sorts`.

**3.** Dans `index.html` :

Avant la carte, ajoute l'écran de choix :

```html
<!-- Le choix du héros, avant de commencer -->
<div id="choix">
    <h2>Choisis ton héros</h2>
    <button id="btn-chevalier">🤺 Chevalier<br><small>100 PV, frappe fort</small></button>
    <button id="btn-mage">🧙 Mage<br><small>80 PV, 50 mana, 3 sorts</small></button>
</div>
```

Le titre du héros affiche maintenant son nom. Remplace sa ligne `<h2>` :

```html
<h2><span id="nom-heros">Héros</span> : <span id="pv-joueur">100</span> PV</h2>
```

**4.** Dans `Combat` :

Dans le constructeur, avec les autres éléments :

```javascript
this.nomHeros = document.getElementById("nom-heros");
this.zoneMana = document.getElementById("zone-mana");
```

À la fin du constructeur, **avant** `this.creerBoutonsSorts();` :

```javascript
this.nomHeros.textContent = heros.emoji + " " + heros.nom;
this.zoneMana.hidden = heros.manaMax === 0; // pas de mana : pas de barre
```

Dans `afficherVie`, n'affiche le mana que si le héros en a (sinon, on diviserait par `0`) :

```javascript
// Le mana, comme les PV : un texte et une barre (si le héros en a)
if (this.heros.manaMax > 0) {
    this.texteManaJoueur.textContent = this.heros.mana;
    this.barreMana.style.width = (this.heros.mana / this.heros.manaMax) * 100 + "%";
}
```

**5.** Dans `Exploration`, l'emoji vient du héros. Le constructeur reçoit un paramètre de plus :

```javascript
constructor(carte, sons, emoji) {
```

Et la ligne de l'emoji devient :

```javascript
this.element.textContent = emoji;
```

**6.** Le démarrage. `demarrerJeu` **reçoit** le héros au lieu de le créer :

```javascript
async function demarrerJeu(heros) {
```

Supprime la ligne `const heros = new Mage("Mage");`, et passe l'emoji à l'exploration :

```javascript
const exploration = new Exploration(carte, sons, heros.emoji);
```

Enfin, **remplace** le `demarrerJeu();` de la dernière ligne par l'écran de choix :

```javascript
// L'écran de choix : le jeu démarre avec le héros choisi
function choisirHeros(heros) {
    document.getElementById("choix").hidden = true;
    demarrerJeu(heros);
}

document.getElementById("btn-chevalier").addEventListener("click", () => choisirHeros(new Heros("Chevalier")));
document.getElementById("btn-mage").addEventListener("click", () => choisirHeros(new Mage("Mage")));
```

## Vérifier

1. Recharge : l'écran de choix s'affiche, sans carte.
2. Choisis le **Mage** : 🧙 se promène, et en combat tu as la barre de mana et les 3 sorts.
3. Recharge et choisis le **Chevalier** : 🤺 se promène, pas de barre de mana, pas de sorts, 100 PV et des coups puissants.

> 🆘 Bloqué ? Compare avec le [code complet de l'étape 05](./etapes/etape-05/).

### Ce qu'il faut retenir

- **Polymorphisme** : `Combat` et `Exploration` travaillent avec « un héros », sans savoir lequel.
- Une méthode **vide** dans le parent (`regenererMana`) évite des `if` partout : l'enfant la remplace s'il en a besoin.
- Une liste vide (`sorts = []`) donne naturellement « zéro bouton ».

## 🏆 Défi

Crée un troisième héros : 🏹 l'**Archer** (`class Archer extends Heros`), 90 PV, 8 à 16 de dégâts, emoji `"🏹"`. Il te faut une classe, un bouton dans l'écran de choix, et une ligne `addEventListener`.

Bonus, à réfléchir : pour donner à l'Archer un sort 🎯 Tir précis (5 mana), de quelle classe devrait-il plutôt hériter, `Heros` ou `Mage` ? Pourquoi ? Essaie, et observe ce qui casse.

➡️ Suite : [06 – Le son des sorts et code final](./06-son-sorts-code-final.md)
