# 04 – La musique d'ambiance

🎯 **À la fin de cette étape** : une musique calme joue sur la carte. Elle laisse la place à une musique de combat quand un monstre surgit, s'efface pour le jingle de victoire, puis revient quand tu retournes sur la carte.

## Le concept

Une musique n'est pas un effet comme les autres :

- elle **boucle** : `audio.loop = true` la fait recommencer quand elle se termine ;
- il n'y en a **qu'une à la fois** : la classe `Sons` retient laquelle joue, dans `this.nomMusique` ;
- un changement **brutal** est désagréable : on fait un **fondu**, c'est-à-dire qu'on monte ou baisse le volume **petit à petit**.

Pour le fondu, on répète une action toutes les 50 millisecondes avec `setInterval`, puis on l'arrête avec `clearInterval`. Essaie dans la console :

```javascript
let compteur = 0;
const minuteur = setInterval(() => {
    compteur++;
    console.log(compteur);
    if (compteur === 5) clearInterval(minuteur); // stop !
}, 500);
```

Tu vois `1, 2, 3, 4, 5` s'afficher, un toutes les demi-secondes, puis plus rien.

## Le code

**1.** Dans le constructeur de `Sons`, ajoute deux propriétés, sous `this.audios = {};` :

```javascript
this.volumeMusique = 0.35; // plus bas que les effets, pour ne pas les couvrir
this.nomMusique = null;    // la musique en cours
```

**2.** Ajoute trois méthodes à la classe `Sons`, après `jouer` :

```javascript
// Lance une musique en boucle (une seule à la fois), avec un fondu d'entrée
jouerMusique(nom) {
    if (nom === this.nomMusique) return; // déjà en cours

    this.arreterMusique();
    this.nomMusique = nom;

    const audio = this.audios[nom];
    if (!audio) return;

    audio.loop = true;       // recommence au début quand elle se termine
    audio.volume = 0;        // on part du silence...
    audio.play().catch(() => {});
    this.fondu(audio, this.volumeMusique); // ...et on monte doucement
}

// Coupe la musique en cours, avec un fondu de sortie
arreterMusique() {
    const audio = this.audios[this.nomMusique];
    this.nomMusique = null;
    if (!audio) return;

    this.fondu(audio, 0, () => {
        audio.pause();
        audio.currentTime = 0; // la prochaine fois, depuis le début
    });
}

// Fait glisser le volume vers "cible", un petit cran toutes les 50 ms
fondu(audio, cible, quandFini) {
    clearInterval(audio.minuteur); // annule un fondu déjà en cours

    audio.minuteur = setInterval(() => {
        const ecart = cible - audio.volume;

        if (Math.abs(ecart) <= 0.05) {   // presque arrivé : on s'arrête
            audio.volume = cible;
            clearInterval(audio.minuteur);
            if (quandFini) quandFini();
        } else if (ecart > 0) {
            audio.volume += 0.05;        // on monte
        } else {
            audio.volume -= 0.05;        // on descend
        }
    }, 50);
}
```

Lis `fondu` comme une recette répétée toutes les 50 ms : « Suis-je presque arrivé ? Alors je m'arrête. Sinon, je monte ou je descends d'un cran. »

- `quandFini` est une **fonction de rappel**, comme `surRencontre` : on dit à `fondu` quoi faire **une fois fini** (ici, mettre en pause) ;
- on range le minuteur **dans l'objet audio** (`audio.minuteur`) : chaque musique a le sien, donc la carte peut s'éteindre pendant que le combat monte.

**3.** Dans `Combat.verifierFin`, coupe la musique **avant** le jingle de fin, dans les deux branches :

```javascript
this.enCours = false;
this.sons.arreterMusique();     // place au jingle de fin
this.sons.jouer("victoire");
```

```javascript
this.enCours = false;
this.sons.arreterMusique();     // place au jingle de fin
this.sons.jouer("defaite");
```

**4.** Dans `demarrerJeu`, branche la musique sur les **changements d'écran**. C'est le rôle du chef d'orchestre.

Juste après `const exploration = new Exploration(carte, sons);` :

```javascript
// Les navigateurs interdisent la musique avant une action du joueur :
// on la lance à la première touche appuyée ("once" : une seule fois)
document.addEventListener("keydown", () => sons.jouerMusique("musiqueCarte"), { once: true });
```

Dans `exploration.surRencontre`, après `combat.demarrer(monstre);` :

```javascript
sons.jouerMusique("musiqueCombat");
```

Dans `combat.surRetour`, à la fin :

```javascript
sons.jouerMusique("musiqueCarte");
```

## Vérifier

1. Recharge, appuie sur une flèche : la **musique de la carte** monte doucement.
2. Marche dans l'herbe jusqu'à une rencontre : la carte clignote, puis la **musique de combat** remplace l'autre.
3. Gagne : la musique s'efface, le jingle de **victoire** joue.
4. Clique **Retour à la carte** : la musique de la carte reprend.

> 🆘 Bloqué ? Compare avec le [code complet de l'étape 04](./etapes/etape-04/app.js).

### Ce qu'il faut retenir

- `loop = true` : la musique tourne en boucle.
- Une seule musique à la fois : la classe `Sons` retient son nom dans `nomMusique`.
- `setInterval` répète, `clearInterval` arrête : de quoi animer un volume.
- La classe `Sons` sait **comment** jouer une musique ; `demarrerJeu` décide **quand**.

## 🏆 Défi

Ralentis le fondu : au lieu de crans de `0.05`, prends des crans de `0.01`. Qu'est-ce qui change à l'oreille ? Pense à modifier **aussi** le test `<= 0.05`.

➡️ Suite : [05 – Le bouton muet](./05-muet.md)
