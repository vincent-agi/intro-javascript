# 04 – La musique d'ambiance

## Le concept

La musique diffère des effets :

- elle **boucle** (`audio.loop = true`) ;
- il n'y en a **qu'une** à la fois : la musique de la carte laisse la place à celle du combat ;
- un changement **brutal** est désagréable : on utilise un **fondu** (*fade*), c'est-à-dire qu'on fait glisser le volume progressivement.

Le fondu se fait avec `setInterval`, qui répète une fonction toutes les N millisecondes :

```javascript
let compteur = 0;
const minuteur = setInterval(() => {
    compteur++;
    if (compteur === 5) clearInterval(minuteur); // arrête la répétition
}, 50);
```

## Le code

**1.** Ajoute les deux musiques à la table `FICHIERS_SONS` et un volume dédié (plus bas que les effets, pour ne pas les couvrir) :

```javascript
const FICHIERS_SONS = {
    // ... les effets, comme avant ...
    defaite: "sons/defaite.wav",
    // Musiques (jouées en boucle)
    musiqueCarte: "sons/musique-carte.mp3",
    musiqueCombat: "sons/musique-combat.mp3"
};

const VOLUME_EFFETS = 0.6;
const VOLUME_MUSIQUE = 0.35;
```

**2.** Dans la classe `Sons`, ajoute au constructeur :

```javascript
this.nomMusique = null; // la musique en cours
```

Puis ces trois méthodes :

```javascript
// Lance une musique en boucle, avec un fondu d'entrée
jouerMusique(nom) {
    if (nom === this.nomMusique) return; // déjà en cours

    this.arreterMusique();
    this.nomMusique = nom;

    const audio = this.audios[nom];
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0;                    // on part du silence...
    audio.play().catch(() => {});
    this.fondu(audio, VOLUME_MUSIQUE, 600); // ...et on monte en 0,6 seconde
}

// Coupe la musique en cours, avec un fondu de sortie
arreterMusique() {
    const audio = this.audios[this.nomMusique];
    this.nomMusique = null;
    if (!audio) return;

    this.fondu(audio, 0, 600, () => {
        audio.pause();
        audio.currentTime = 0;           // la prochaine fois, depuis le début
    });
}

// Fait glisser le volume vers "cible" en "duree" millisecondes
fondu(audio, cible, duree, apres) {
    clearInterval(audio.minuteur);       // annule un fondu déjà en cours

    const pas = (cible - audio.volume) / (duree / 50); // variation toutes les 50 ms
    audio.minuteur = setInterval(() => {
        const volume = audio.volume + pas;
        const fini = pas > 0 ? volume >= cible : volume <= cible;

        audio.volume = fini ? cible : volume;
        if (fini) {
            clearInterval(audio.minuteur);
            if (apres) apres();          // action de fin (ex. mettre en pause)
        }
    }, 50);
}
```

Le `clearInterval` au début de `fondu` évite un piège : si le joueur revient sur la carte pendant que la musique s'éteint encore, l'ancien fondu est annulé et ne mettra pas en pause la musique qui redémarre.

**3.** Branche la musique sur les changements d'écran, dans `demarrerJeu`.

Au démarrage, **après** la création de `exploration`. Le navigateur interdit toute musique avant une action du joueur (voir l'étape 02) : on attend donc la première touche ou le premier clic.

```javascript
const activerMusique = () => {
    sons.jouerMusique(exploration.actif ? "musiqueCarte" : "musiqueCombat");
    document.removeEventListener("keydown", activerMusique); // une seule fois
    document.removeEventListener("click", activerMusique);
};
document.addEventListener("keydown", activerMusique);
document.addEventListener("click", activerMusique);
```

Dans `surRencontre`, après `combat.demarrer(monstre);` :

```javascript
sons.jouerMusique("musiqueCombat");
```

Dans `combat.surRetour`, à la fin :

```javascript
sons.jouerMusique("musiqueCarte");
```

**4.** À la fin d'un combat, la musique doit **s'arrêter** pour laisser place au jingle de victoire ou de défaite. Dans `Combat.verifierFin`, ajoute `arreterMusique` **avant** le son de fin, dans chaque branche :

```javascript
this.enCours = false;
this.sons.arreterMusique();          // ajouté
this.sons.jouer("victoire");
```

```javascript
this.enCours = false;
this.sons.arreterMusique();          // ajouté
this.sons.jouer("defaite");
```

## Vérifier

1. Recharge, appuie sur une flèche : la **musique de la carte** démarre en fondu.
2. Entre dans l'herbe jusqu'à une rencontre : la carte s'éteint, la **musique de combat** monte.
3. Gagne : la musique s'arrête, le jingle de **victoire** joue.
4. **Retour à la carte** : la musique de la carte reprend.

### Ce qu'il faut retenir

- `loop = true` répète la musique sans fin.
- Une seule musique à la fois : on stocke son nom dans `nomMusique`.
- `setInterval` + `clearInterval` pour animer un volume.
- Les musiques ne démarrent qu'**après un geste du joueur**.
- Chaque **changement d'écran** déclenche un changement de musique : c'est la chef d'orchestre `demarrerJeu` qui s'en occupe.

## 🏆 Défi

Fais baisser la musique de combat à `0.15` quand le héros passe sous `25 PV`, pour laisser entendre les coups. Indice : une méthode `definirVolumeMusique(volume)` dans `Sons`, appelée depuis `Combat.riposte`.

➡️ Suite : [05 – Bouton muet, sons manquants et code final](./05-muet-code-final.md)
