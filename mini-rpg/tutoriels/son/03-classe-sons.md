# 03 – La classe `Sons` et les effets sonores

## Le concept

Comme pour `Journal` ou `Carte`, on regroupe les sons dans **une classe**. Elle fait trois choses :

1. **charger** tous les fichiers au démarrage (avec `fetch`, comme dans le tutoriel précédent) ;
2. **jouer** un son à partir de son nom (`sons.jouer("attaque")`) ;
3. **ne jamais bloquer** le jeu si un fichier manque.

Pour charger un fichier audio avec `fetch`, on récupère son contenu brut, un **blob** (*Binary Large OBject*), puis on fabrique une adresse temporaire avec `URL.createObjectURL`. Le son est alors **déjà en mémoire** : il joue sans délai.

Pour télécharger tous les fichiers **en même temps**, on utilise `Promise.all`, qui attend la fin de toutes les promesses d'un tableau.

Pour **superposer** plusieurs sons identiques (des pas rapprochés), on joue une **copie** : `audio.cloneNode()`.

## Le code

**1.** En haut d'`app.js`, sous les fonctions `nombreAuHasard` et `chargerJson`, ajoute la table des sons :

```javascript
// Les sons du jeu : nom -> fichier (à télécharger sur opengameart.org)
const FICHIERS_SONS = {
    pas: "sons/pas.wav",
    collision: "sons/collision.wav",
    rencontre: "sons/rencontre.wav",
    attaque: "sons/attaque.wav",
    degats: "sons/degats.wav",
    soin: "sons/soin.wav",
    victoire: "sons/victoire.wav",
    defaite: "sons/defaite.wav"
};

const VOLUME_EFFETS = 0.6;
```

Si tes fichiers portent un autre nom ou une autre extension, **change-les ici** : c'est le seul endroit.

**2.** Avant la classe `Personnage`, ajoute la classe :

```javascript
// Charge et joue les sons. Un son manquant ne bloque jamais le jeu.
class Sons {
    constructor(fichiers) {
        this.fichiers = fichiers;
        this.audios = {}; // nom -> objet Audio prêt à jouer
    }

    // Charge tous les fichiers en parallèle, renvoie les noms de ceux qui manquent
    async charger() {
        const manquants = [];

        await Promise.all(Object.keys(this.fichiers).map(async (nom) => {
            try {
                this.audios[nom] = await this.chargerUn(this.fichiers[nom]);
            } catch (erreur) {
                console.warn("Son manquant :", nom, erreur.message);
                manquants.push(nom);
            }
        }));

        return manquants;
    }

    // Télécharge un fichier avec fetch et le transforme en objet Audio
    async chargerUn(url) {
        const reponse = await fetch(url);
        if (!reponse.ok) {
            throw new Error("Erreur " + reponse.status + " pour " + url);
        }
        const blob = await reponse.blob(); // le fichier brut, en mémoire
        return new Audio(URL.createObjectURL(blob));
    }

    // Joue un effet (on peut le rejouer avant la fin du précédent)
    jouer(nom) {
        const audio = this.audios[nom];
        if (!audio) return; // son absent : on ne fait rien

        const copie = audio.cloneNode();
        copie.volume = VOLUME_EFFETS;
        copie.play().catch(() => {}); // le navigateur peut refuser : on ignore
    }
}
```

Quelques points :

- `Object.keys(...)` donne le tableau des noms (`["pas", "collision", ...]`) ; `.map(async …)` lance un chargement par nom ;
- chaque chargement a son propre `try` / `catch` : **un fichier absent n'empêche pas les autres** ;
- `jouer` ignore un nom inconnu : si `soin.wav` manque, `sons.jouer("soin")` ne fait simplement rien.

**3.** Donne `sons` aux classes qui en ont besoin. C'est l'**injection de dépendance** : au lieu d'une variable globale, on passe l'objet au constructeur.

```javascript
class Exploration {
    constructor(carte, sons) {
        this.carte = carte;
        this.sons = sons;
        // ... le reste est inchangé
```

```javascript
class Combat {
    constructor(heros, journal, sons) {
        this.heros = heros;
        this.journal = journal;
        this.sons = sons;
        // ... le reste est inchangé
```

**4.** Déclenche les effets, un par contexte.

Dans `Exploration.deplacer` :

```javascript
if (!this.carte.estPraticable(x, y)) {
    this.sons.jouer("collision");   // ajouté
    return;
}

this.x = x;
this.y = y;
this.afficher();
this.sons.jouer("pas");             // ajouté

// Dans l'herbe haute : 1 chance sur 4 de rencontrer un monstre
if (this.carte.typeEn(x, y) === "herbe" && Math.random() < 0.25) {
    this.sons.jouer("rencontre");   // ajouté
    this.surRencontre();
}
```

Dans `Combat` :

```javascript
riposte() {
    this.sons.jouer("degats");      // ajouté
    this.journal.ajouter(this.monstre.attaquer(this.heros));
}
```

```javascript
// dans attaquer(), avant la ligne qui appelle this.heros.attaquer(...)
this.sons.jouer("attaque");

// dans soigner(), avant la ligne qui appelle this.heros.soigner()
this.sons.jouer("soin");
```

Dans `verifierFin`, ajoute une ligne dans chaque branche :

```javascript
if (this.monstre.estVaincu()) {
    this.journal.ajouter("🎉 Victoire ! " + this.monstre.nom + " est vaincu !");
    this.enCours = false;
    this.sons.jouer("victoire");    // ajouté
} else if (this.heros.estVaincu()) {
    this.journal.ajouter("💀 Défaite... Le héros est à terre.");
    this.enCours = false;
    this.sons.jouer("defaite");     // ajouté
}
```

**5.** Dans `demarrerJeu`, crée et charge les sons **avant** le reste, puis passe-les aux deux classes :

```javascript
async function demarrerJeu() {
    const ecranCarte = document.getElementById("carte");
    const ecranCombat = document.getElementById("combat");

    const sons = new Sons(FICHIERS_SONS);
    await sons.charger();               // on attend la fin du chargement

    // ... heros et journal, comme avant ...
    const combat = new Combat(heros, journal, sons);   // + sons
    // ...
    const exploration = new Exploration(carte, sons);  // + sons
    // ... la suite est inchangée
}
```

## Vérifier

Recharge la page. **Appuie sur une flèche** (premier geste du joueur), puis :

- avance : un **pas** à chaque case ;
- fonce dans un arbre ou le bord de la carte : le bruit de **collision** ;
- marche dans l'herbe jusqu'à la rencontre ;
- attaque, soigne-toi, gagne ou perds : un son par action.

Si un son ne joue pas, ouvre la console (`F12`) : `Son manquant : soin Erreur 404…` t'indique le fichier à corriger. Dans l'onglet **Réseau**, tu vois les 8 fichiers chargés au démarrage.

### Ce qu'il faut retenir

- Une classe dédiée centralise le chargement et la lecture des sons.
- `fetch` + `blob` charge un fichier **avant** de s'en servir : pas de délai au moment du jeu.
- `Promise.all` lance plusieurs chargements en parallèle.
- `cloneNode()` permet de superposer le même son.
- Un fichier absent ne doit **jamais** casser le jeu : `try` / `catch`, et `if (!audio) return`.

## 🏆 Défi

Les pas résonnent à chaque case, même en maintenant la touche appuyée. Ajoute un volume plus bas pour `pas` : donne à `jouer` un second paramètre `volume = VOLUME_EFFETS`, et appelle `this.sons.jouer("pas", 0.2)`.

➡️ Suite : [04 – Musique d'ambiance](./04-musique.md)
