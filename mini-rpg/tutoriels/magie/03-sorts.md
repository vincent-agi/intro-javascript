# 03 – Les sorts

🎯 **À la fin de cette étape** : deux boutons de sorts apparaissent en combat. ⚡ Éclair coûte 10 mana et 🔥 Boule de feu en coûte 20. Quand il n'y a plus assez de mana, le bouton se grise.

## Le concept

Un sort a un **nom**, un **emoji**, un **coût** et un **effet**. Plutôt que d'écrire une méthode par sort (`eclair()`, `bouleDeFeu()`…), on crée une classe **`Sort`**. Chaque sort est un **objet**, et le Mage en garde une **liste** :

```javascript
this.sorts = [
    new Sort("Éclair", "⚡", 10, 12, 18),
    new Sort("Boule de feu", "🔥", 20, 20, 30)
];
```

Ensuite, `Combat` **parcourt** cette liste pour fabriquer un bouton par sort. Ajouter un troisième sort ? Une ligne dans la liste, et le bouton apparaît tout seul.

## Le code

**1.** Au-dessus de la classe `Mage`, crée la classe `Sort` :

```javascript
// Un sort d'attaque : un nom, un coût en mana, des dégâts
class Sort {
    constructor(nom, emoji, cout, effetMin, effetMax) {
        this.nom = nom;
        this.emoji = emoji;
        this.cout = cout;         // mana dépensé
        this.effetMin = effetMin;
        this.effetMax = effetMax;
    }

    // Applique l'effet du sort et renvoie le message du journal
    lancer(lanceur, cible) {
        const degats = nombreAuHasard(this.effetMin, this.effetMax);
        cible.recevoirDegats(degats);
        return this.emoji + " " + this.nom + " : " + degats + " dégâts !";
    }
}
```

`lancer` reçoit le **lanceur** (le Mage) et la **cible** (le monstre). Ici, seule la cible compte ; le lanceur servira à l'étape suivante.

**2.** Dans la classe `Mage`, donne-lui ses sorts, à la fin du constructeur :

```javascript
this.sorts = [
    new Sort("Éclair", "⚡", 10, 12, 18),
    new Sort("Boule de feu", "🔥", 20, 20, 30)
];
```

Puis ajoute deux méthodes au Mage :

```javascript
// Assez de mana pour ce sort ?
peutLancer(sort) {
    return this.mana >= sort.cout;
}

// Dépense le mana, puis laisse le sort agir
lancerSort(sort, cible) {
    this.mana -= sort.cout;
    return sort.lancer(this, cible);
}
```

Les rôles sont bien séparés : le **Mage** gère son mana, le **Sort** gère son effet.

**3.** Dans `index.html`, sous le bloc `.actions` des boutons, ajoute une zone **vide** :

```html
<!-- Les sorts : un bouton par sort, créé par JavaScript -->
<div id="sorts" class="actions"></div>
```

Et dans `carte.css` :

```css
/* Les boutons de sorts, un peu d'espace entre eux */
#sorts button {
    margin: 4px;
}
```

**4.** Dans `Combat`, crée les boutons. Dans le constructeur, sous `this.boutonRetour = ...` :

```javascript
this.zoneSorts = document.getElementById("sorts");
```

À la **fin** du constructeur :

```javascript
this.creerBoutonsSorts();
```

Puis ajoute ces deux méthodes :

```javascript
// Un bouton par sort connu du héros
creerBoutonsSorts() {
    this.boutonsSorts = [];

    for (const sort of this.heros.sorts) {
        const bouton = document.createElement("button");
        bouton.textContent = sort.emoji + " " + sort.nom + " (" + sort.cout + " mana)";
        bouton.sort = sort; // on accroche le sort à son bouton
        bouton.addEventListener("click", () => this.lancerSort(sort));

        this.zoneSorts.appendChild(bouton);
        this.boutonsSorts.push(bouton);
    }
}

// Un sort n'est cliquable que pendant le combat, et avec assez de mana
mettreAJourSorts() {
    for (const bouton of this.boutonsSorts) {
        bouton.disabled = !this.enCours || !this.heros.peutLancer(bouton.sort);
    }
}
```

`for (const sort of ...)` parcourt les **éléments** d'un tableau, un par un : ici, chaque objet `Sort`.

**5.** À la fin de `afficherVie`, mets les boutons à jour. Elle est appelée après chaque action, c'est le bon moment :

```javascript
this.mettreAJourSorts(); // le mana a peut-être changé
```

**6.** Ajoute l'action de lancer un sort, juste avant `soigner`. Elle suit le même plan que `attaquer` :

```javascript
lancerSort(sort) {
    if (!this.enCours || !this.heros.peutLancer(sort)) return;

    this.sons.jouer("attaque");
    this.journal.ajouter(this.heros.lancerSort(sort, this.monstre));

    this.verifierFin();
    if (this.enCours) {
        this.riposte();
        this.verifierFin();
    }
    this.afficherVie();
}
```

## Vérifier

1. En combat, les boutons ⚡ et 🔥 apparaissent sous Attaquer et Se soigner.
2. Lance une Boule de feu : le monstre perd 20 à 30 PV, et ta barre de mana descend à `30`.
3. Lance-en une deuxième, puis un Éclair : il reste `0` mana, et les deux boutons se **grisent**.
4. Il ne te reste que le bâton... Le mana ne remonte pas encore : c'est pour l'étape suivante.

> 🆘 Bloqué ? Compare avec le [code complet de l'étape 03](./etapes/etape-03/).

### Ce qu'il faut retenir

- Un sort est un **objet** : ses données (nom, coût) et son comportement (`lancer`) sont regroupés.
- Une **liste d'objets** + une **boucle** = autant de boutons que de sorts, sans code en plus.
- Chacun son rôle : le Mage paie, le Sort agit, le Combat orchestre.

## 🏆 Défi

Invente un troisième sort d'attaque (❄️ Blizzard ? 🌪️ Tornade ?) avec son coût et ses dégâts. Tu n'as qu'**une ligne** à ajouter. Laquelle ?

➡️ Suite : [04 – Soin magique et mana qui remonte](./04-soin-et-mana.md)
