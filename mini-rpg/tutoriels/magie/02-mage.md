# 02 – Le Mage et sa barre de mana

🎯 **À la fin de cette étape** : tu joues un Mage à 80 PV, avec une barre de mana bleue sous sa barre de vie.

## Le concept

Un Mage **est un** héros : il attaque et se soigne comme lui, mais avec d'autres chiffres, et il a **en plus** du mana. C'est exactement le rôle de l'**héritage** :

```javascript
class Mage extends Heros { ... }
```

Le Mage récupère **tout** ce que sait faire `Heros` (attaquer, se soigner, recevoir des dégâts…). On n'écrit que ce qui **change**.

Un problème : aujourd'hui, `Heros` impose ses chiffres (100 PV, 10 à 20 de dégâts). Pour que le Mage puisse donner les siens, on ajoute des **paramètres avec valeur par défaut** au constructeur de `Heros` (tu as vu cette astuce dans le dossier `son`, pour le volume).

## Le code

**1.** Remplace le constructeur de `Heros` :

```javascript
// Le héros : par défaut 100 PV, attaque de 10 à 20, sait se soigner
class Heros extends Personnage {
    constructor(nom, pvMax = 100, degatsMin = 10, degatsMax = 20) {
        super(nom, pvMax, degatsMin, degatsMax);
    }
    // ... attaquer et soigner : inchangées
```

`new Heros("Chevalier")` marche toujours comme avant : les valeurs par défaut s'appliquent.

**2.** Juste **sous** la classe `Heros`, crée la classe `Mage` :

```javascript
// Le mage : moins de PV, un bâton qui tape peu... mais du mana pour la magie
class Mage extends Heros {
    constructor(nom) {
        super(nom, 80, 4, 8);
        this.manaMax = 50;
        this.mana = this.manaMax;
    }
}
```

- `super(nom, 80, 4, 8)` appelle le constructeur de `Heros` avec les chiffres du Mage ;
- `manaMax` et `mana` fonctionnent comme `pvMax` et `pv` : un maximum, et la valeur actuelle.

**3.** Dans `index.html`, dans la section du héros, sous sa barre de vie, ajoute la zone de mana :

```html
<div class="barre"><div id="barre-joueur" class="vie"></div></div>
<!-- Le mana du mage -->
<div id="zone-mana">
    <p>🔮 Mana : <span id="mana-joueur">50</span></p>
    <div class="barre"><div id="barre-mana" class="vie"></div></div>
</div>
```

Et dans `carte.css`, colore la barre en bleu :

```css
/* La barre de mana : bleue */
#barre-mana {
    background: #3f6fd8;
}
```

**4.** Dans le constructeur de `Combat`, récupère les deux nouveaux éléments, sous `this.textePvJoueur = ...` :

```javascript
this.texteManaJoueur = document.getElementById("mana-joueur");
this.barreMana = document.getElementById("barre-mana");
```

Et à la fin de `afficherVie`, affiche le mana **comme les PV** :

```javascript
// Le mana, comme les PV : un texte et une barre
this.texteManaJoueur.textContent = this.heros.mana;
this.barreMana.style.width = (this.heros.mana / this.heros.manaMax) * 100 + "%";
```

**5.** Dans `demarrerJeu`, ton héros devient un Mage :

```javascript
const heros = new Mage("Mage");
```

## Vérifier

Recharge et trouve un monstre : le héros a `80` PV, et une barre bleue « Mana : 50 » s'affiche sous sa vie. Attaque : les coups de bâton font moins mal (4 à 8). Le Mage est pour l'instant **plus faible** que le Chevalier : il lui manque ses sorts !

> 🆘 Bloqué ? Compare avec le [code complet de l'étape 02](./etapes/etape-02/).

### Ce qu'il faut retenir

- `class Mage extends Heros` : le Mage **hérite** de tout ce que sait faire `Heros`.
- `super(...)` appelle le constructeur du parent avec les bons chiffres.
- Une classe enfant peut **ajouter** des propriétés (`mana`, `manaMax`).

## 🏆 Défi

Change les chiffres du Mage avec ceux que tu as imaginés à l'étape 01. Que se passe-t-il si `manaMax` vaut `100` ? La barre s'adapte-t-elle toute seule ? Pourquoi ?

➡️ Suite : [03 – Les sorts](./03-sorts.md)
