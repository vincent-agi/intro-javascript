# 03 – Un son pour chaque action

🎯 **À la fin de cette étape** : chaque action a son bruitage. Les pas, les chocs contre les arbres, la rencontre, les coups, les dégâts, le soin, la victoire et la défaite.

## Le concept

Le gros du travail est fait : la classe `Sons` sait déjà jouer **n'importe quel** son de la liste. Il reste à :

1. **donner** l'objet `sons` à `Exploration`, comme on l'a fait pour `Combat` ;
2. ajouter une ligne `this.sons.jouer("...")` **au bon moment**.

Bonus : les pas reviennent à chaque case, ils doivent être **plus discrets**. On ajoute à `jouer` un **paramètre avec valeur par défaut** :

```javascript
jouer(nom, volume = this.volumeEffets) { ... }

this.sons.jouer("attaque");      // volume normal (0.6)
this.sons.jouer("pas", 0.3);     // plus doux
```

## Le code

**1.** Dans la classe `Sons`, modifie `jouer` pour accepter un volume :

```javascript
// Joue un effet. On joue une copie : le même son peut se superposer à lui-même.
jouer(nom, volume = this.volumeEffets) {
    const audio = this.audios[nom];
    if (!audio) return; // nom inconnu : on ne fait rien

    const copie = audio.cloneNode();
    copie.volume = volume;
    copie.play().catch(() => {}); // fichier absent ou navigateur qui refuse : on ignore
}
```

**2.** Dans `Exploration`, reçois `sons` dans le constructeur :

```javascript
class Exploration {
    constructor(carte, sons) {   // + sons
        this.carte = carte;
        this.sons = sons;        // ajouté
        // ... le reste est inchangé
```

**3.** Toujours dans `Exploration`, remplace la méthode `deplacer`. Trois sons : collision, pas, rencontre.

```javascript
deplacer(dx, dy) {
    if (!this.actif) return;

    const x = this.x + dx;
    const y = this.y + dy;
    if (!this.carte.estPraticable(x, y)) {
        this.sons.jouer("collision"); // collision : bruit, et on ne bouge pas
        return;
    }

    this.x = x;
    this.y = y;
    this.afficher();
    this.sons.jouer("pas", 0.3);      // les pas, plus discrets

    // Dans l'herbe haute : 1 chance sur 4 de rencontrer un monstre
    if (this.carte.typeEn(x, y) === "herbe" && Math.random() < 0.25) {
        this.sons.jouer("rencontre");
        this.surRencontre();
    }
}
```

Le `if` de la collision a maintenant **deux** lignes : il lui faut des accolades `{ }`.

**4.** Dans `Combat`, ajoute les sons du combat :

```javascript
riposte() {
    this.sons.jouer("degats");        // ajouté
    this.journal.ajouter(this.monstre.attaquer(this.heros));
}
```

```javascript
soigner() {
    if (!this.enCours) return;

    this.sons.jouer("soin");          // ajouté
    this.journal.ajouter(this.heros.soigner());
    // ... la suite est inchangée
```

Dans `verifierFin`, une ligne dans chaque branche :

```javascript
if (this.monstre.estVaincu()) {
    this.journal.ajouter("🎉 Victoire ! " + this.monstre.nom + " est vaincu !");
    this.enCours = false;
    this.sons.jouer("victoire");      // ajouté
} else if (this.heros.estVaincu()) {
    this.journal.ajouter("💀 Défaite... Le héros est à terre.");
    this.enCours = false;
    this.sons.jouer("defaite");       // ajouté
}
```

**5.** Dans `demarrerJeu`, donne `sons` à l'exploration :

```javascript
const exploration = new Exploration(carte, sons);   // + sons
```

## Vérifier

Recharge la page, **appuie sur une flèche** (c'est l'action du joueur qui autorise le son), puis :

- avance : un **pas** discret à chaque case ;
- fonce dans un arbre, dans l'eau ou contre le bord : le **choc** ;
- marche dans l'herbe : le son de **rencontre**, puis le combat ;
- attaque, soigne-toi, gagne ou perds : un son par action.

> 🆘 Bloqué ? Compare avec le [code complet de l'étape 03](./etapes/etape-03/app.js).

### Ce qu'il faut retenir

- Une fois la classe `Sons` écrite, ajouter un son = **une ligne** au bon endroit.
- `Exploration` et `Combat` reçoivent **le même** objet `sons` : on l'a créé une seule fois, dans `demarrerJeu`.
- Un paramètre peut avoir une **valeur par défaut** : `volume = this.volumeEffets`.

## 🏆 Défi

Les pas sur le chemin et dans l'herbe font le même bruit. Choisis dans le pack un deuxième son de pas (`pas-herbe.wav`), ajoute-le à `FICHIERS_SONS`, et joue-le quand le héros arrive sur une case `"herbe"`. Indice : `this.carte.typeEn(x, y)`.

➡️ Suite : [04 – La musique d'ambiance](./04-musique.md)
