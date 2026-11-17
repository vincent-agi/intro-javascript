# 02 – La classe `Sons` et le premier son

🎯 **À la fin de cette étape** : quand tu cliques sur **Attaquer**, tu entends le coup d'épée.

## Essaie d'abord dans la console

Ouvre ton jeu (via le serveur), **clique une fois dans la page**, puis dans la console (`F12`) :

```javascript
const son = new Audio("sons/attaque.wav"); // prépare le son
son.play();                                // le joue !
son.volume = 0.2;                          // de 0 (silence) à 1 (maximum)
son.play();                                // plus doux
```

Deux choses à savoir, c'est tout :

1. **Le navigateur refuse de jouer un son tant que le joueur n'a pas cliqué ou appuyé sur une touche** dans la page. C'est pour éviter les sites qui hurlent dès l'ouverture. Si rien ne sort, clique dans la page et recommence.
2. Tape `son.play()` trois fois très vite : le son **ne se superpose pas**, un objet `Audio` ne joue qu'une fois à la fois. Avec `son.cloneNode().play()`, on joue une **copie** : là, les sons se superposent.

## Le code

**1.** En haut d'`app.js`, sous `chargerJson`, ajoute la **liste des sons** : un nom → un fichier.

```javascript
// Les sons du jeu : nom -> fichier (téléchargés sur opengameart.org, voir l'étape 01)
const FICHIERS_SONS = {
    // Effets
    pas: "sons/pas.wav",
    collision: "sons/collision.wav",
    rencontre: "sons/rencontre.wav",
    attaque: "sons/attaque.wav",
    degats: "sons/degats.wav",
    soin: "sons/soin.wav",
    victoire: "sons/victoire.wav",
    defaite: "sons/defaite.wav",
    // Musiques
    musiqueCarte: "sons/musique-carte.mp3",
    musiqueCombat: "sons/musique-combat.mp3"
};
```

Comme `map.json` pour la carte, c'est **une donnée** : si un fichier change de nom, c'est le seul endroit à modifier.

**2.** Juste dessous, crée la classe `Sons` :

```javascript
// Tous les sons du jeu. Le reste du code ne touche jamais aux objets Audio :
// il demande simplement sons.jouer("attaque").
class Sons {
    constructor(fichiers) {
        this.fichiers = fichiers;
        this.volumeEffets = 0.6;  // de 0 (silence) à 1 (maximum)
        this.audios = {};         // nom -> objet Audio

        // Un objet Audio par fichier : le navigateur commence à les télécharger
        for (const nom in fichiers) {
            this.audios[nom] = new Audio(fichiers[nom]);
        }
    }

    // Joue un effet. On joue une copie : le même son peut se superposer à lui-même.
    jouer(nom) {
        const audio = this.audios[nom];
        if (!audio) return; // nom inconnu : on ne fait rien

        const copie = audio.cloneNode();
        copie.volume = this.volumeEffets;
        copie.play().catch(() => {}); // fichier absent ou navigateur qui refuse : on ignore
    }
}
```

Ce qu'il faut remarquer :

- `for (const nom in fichiers)` parcourt les **noms** de l'objet : `"pas"`, `"collision"`, `"attaque"`… ;
- `this.audios` est un **dictionnaire** : `this.audios["attaque"]` est l'objet `Audio` du coup d'épée ;
- `.catch(() => {})` : si le son ne peut pas jouer (fichier absent, navigateur qui refuse), on **ignore** l'erreur. Un son raté ne doit **jamais** planter le jeu.

**3.** `Combat` a besoin des sons. Plutôt qu'une variable globale, on lui **donne** l'objet `sons` dans son constructeur. C'est ce qu'on appelle une **injection** : `Combat` reçoit ses outils au lieu d'aller les chercher.

```javascript
class Combat {
    constructor(heros, journal, sons) {   // + sons
        this.heros = heros;
        this.journal = journal;
        this.sons = sons;                 // ajouté
        // ... le reste est inchangé
```

**4.** Dans la méthode `attaquer` de `Combat`, joue le son **avant** le coup :

```javascript
attaquer() {
    if (!this.enCours) return;

    this.sons.jouer("attaque");           // ajouté
    this.journal.ajouter(this.heros.attaquer(this.monstre));
    // ... la suite est inchangée
```

**5.** Dans `demarrerJeu`, crée l'objet `sons` et donne-le au combat :

```javascript
const sons = new Sons(FICHIERS_SONS);                // ajouté
const heros = new Heros("Héros");
// ... journal, comme avant ...
const combat = new Combat(heros, journal, sons);     // + sons
```

## Vérifier

Recharge la page, marche dans l'herbe jusqu'à une rencontre, puis clique **Attaquer** : tu entends le coup. Clique très vite plusieurs fois : les coups se superposent (grâce à la copie).

Pas de son ? Vérifie, dans l'ordre :

1. le volume de ton ordinateur ;
2. l'onglet **Réseau** (`F12` → *Network*) : `attaque.wav` doit avoir le code `200`. Un `404` veut dire que le fichier n'est pas au bon endroit ou n'a pas le bon nom.

> 🆘 Bloqué ? Compare avec le [code complet de l'étape 02](./etapes/etape-02/app.js).

### Ce qu'il faut retenir

- `new Audio(adresse)` prépare un son, `.play()` le joue, `volume` va de `0` à `1`.
- Le navigateur exige une **action du joueur** avant le premier son.
- La classe `Sons` **cache** les détails : les autres classes disent seulement `jouer("attaque")`.
- **Injection** : on passe l'objet `sons` au constructeur de la classe qui en a besoin.

## 🏆 Défi

Tu as gardé un `attaque2.wav` ? Ajoute-le à `FICHIERS_SONS` sous le nom `attaque2`, puis dans `Combat.attaquer`, joue au hasard `"attaque"` ou `"attaque2"`. Indice : `nombreAuHasard(1, 2)`.

➡️ Suite : [03 – Un son pour chaque action](./03-effets.md)
