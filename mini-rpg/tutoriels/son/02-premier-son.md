# 02 – Ton premier son

## Le concept

JavaScript sait jouer un son avec l'objet `Audio` :

```javascript
const son = new Audio("sons/attaque.wav"); // prépare le son
son.play();                                // le joue
```

Trois règles à connaître :

1. **Autoplay interdit** : un navigateur refuse de jouer un son tant que le joueur n'a pas **cliqué ou appuyé sur une touche** dans la page. C'est pour éviter les pages qui hurlent à l'ouverture.
2. `play()` renvoie une **promesse** (comme `fetch`) : elle échoue si le navigateur refuse, ou si le fichier est absent.
3. Un même objet `Audio` ne joue qu'**un son à la fois** : si tu le relances pendant qu'il joue, il ne se superpose pas.

## Le code

**1.** Teste dans la console de ton jeu (`F12`), après avoir cliqué dans la page :

```javascript
const son = new Audio("sons/attaque.wav");
son.play();
son.volume = 0.3;   // de 0 (silence) à 1 (maximum)
son.play();
```

**2.** Branche-le **provisoirement** sur le bouton Attaquer. En haut d'`app.js` :

```javascript
const sonAttaque = new Audio("sons/attaque.wav");
```

Dans la méthode `attaquer` de `Combat`, juste avant la ligne `this.journal.ajouter(this.heros.attaquer(...))` :

```javascript
sonAttaque.play();
```

Déclenche une rencontre et clique sur **Attaquer** : tu entends le coup.

## Les limites de cette méthode

Clique **très vite** sur Attaquer : le son se coupe ou n'est pas rejoué à chaque coup. Et imagine la suite :

- un fichier **absent** déclenche une erreur dans la console ;
- dix sons = dix variables globales éparpillées ;
- les musiques ont besoin de boucle, de fondu, de pause…

Il faut un **objet dédié** aux sons. C'est la suite.

Supprime la ligne `const sonAttaque…` et l'appel `sonAttaque.play();` : on les remplace proprement.

### Ce qu'il faut retenir

- `new Audio(adresse)` puis `.play()`.
- Le navigateur exige une **action du joueur** avant le premier son.
- `volume` va de `0` à `1`.
- Un seul objet `Audio` ne se superpose pas à lui-même.

## 🏆 Défi

Dans la console, joue le même son trois fois de suite avec `son.cloneNode().play()` appelé trois fois rapidement. Que se passe-t-il, comparé à `son.play()` ?

➡️ Suite : [03 – La classe `Sons` et les effets](./03-classe-sons.md)
