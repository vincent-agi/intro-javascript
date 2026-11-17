# 06 – Raconter une histoire, avec un début et une fin

Pour l'instant, ton jeu ne finit **jamais** : on marche, on combat, on recommence. Une histoire, c'est un **début** (pourquoi suis-je là ?), une **quête** (que dois-je faire ?) et une **fin** (j'ai réussi !).

## 🧠 Réfléchis d'abord

- Relis le pitch de ta fiche `MON-HISTOIRE.md`. Comment le **raconter** au joueur dès le début ?
- Qu'est-ce qui **termine** la partie ? Battre un boss ? Trouver un objet ? Sauver quelqu'un ?
- Que voit le joueur à la fin ? Que peut-il faire ensuite ?

## Exemple guidé : un boss final et un écran de victoire

**L'idée.** Un texte d'introduction raconte la quête. Un dragon 🐉 garde un coin de la carte. Si le héros le bat, la partie se termine sur un écran de victoire.

**Découper.**

1. l'écran d'introduction et l'écran de fin → `index.html` ;
2. le dragon sur la carte → `map.json` et `carte.css` ;
3. se cogner contre le dragon lance le combat de boss → `Exploration` ;
4. après la victoire contre le boss, on affiche la fin → `demarrerJeu`.

**1.** Dans `index.html`, sous le `<h1>`, ajoute l'introduction :

```html
<!-- Le début de l'histoire -->
<div id="intro">
    <p>Un dragon s'est installé au fond de la vallée. Les villageois ont peur.</p>
    <p>Toi seul peux le vaincre. Traverse les hautes herbes... si tu l'oses !</p>
    <button id="btn-commencer">⚔️ Commencer l'aventure</button>
</div>
```

Et, juste avant `<script>`, l'écran de fin, caché :

```html
<!-- La fin de l'histoire -->
<div id="fin" hidden>
    <h2>🏆 Le dragon est vaincu !</h2>
    <p>La vallée est sauvée. Les villageois t'acclament.</p>
    <button id="btn-rejouer">🔄 Rejouer</button>
</div>
```

> Si tu as fait le dossier `magie`, place les deux paragraphes de l'histoire **dans** l'écran de choix du héros, au lieu d'un nouvel écran.

**2.** Dans `map.json`, ajoute le dragon : un symbole `B` dans la légende, le type `boss` dans les obstacles, et un `B` sur la carte, dans un coin éloigné du départ :

```json
"B": "boss"
```

```json
"obstacles": ["arbre", "eau", "boss"],
```

```json
"#.HH.#..~~B#",
```

(Cette ligne remplace l'avant-dernière ligne de la carte, `"#.HH.#..~~.#"`.)

Dans `carte.css` :

```css
/* Le boss : une case de chemin, avec un dragon dessus */
.tile-boss {
    background: #e8d9a8;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tile-boss::after {
    content: "🐉";
}
```

**3.** Dans `Exploration` :

Dans le constructeur :

```javascript
this.surBoss = () => {}; // branché depuis l'extérieur
```

Dans `deplacer`, **au début** du bloc de la collision :

```javascript
if (!this.carte.estPraticable(x, y)) {
    if (this.carte.typeEn(x, y) === "boss") {
        this.surBoss(); // on a défié le dragon !
        return;
    }
    // ... la suite est inchangée (son de collision...)
```

**4.** Dans `demarrerJeu`. D'abord, l'introduction : le héros ne bouge pas tant qu'on n'a pas cliqué. Après la création de `exploration` :

```javascript
// L'introduction : le héros attend qu'on commence
const intro = document.getElementById("intro");
ecranCarte.hidden = true;
exploration.actif = false;
document.getElementById("btn-commencer").addEventListener("click", () => {
    intro.hidden = true;
    ecranCarte.hidden = false;
    exploration.actif = true;
});
```

Ensuite, le passage de la carte au combat va servir **deux fois** (monstre sauvage et boss). Plutôt que de copier-coller, crée une petite fonction :

```javascript
// Passe de la carte au combat contre ce monstre
function lancerCombat(monstre) {
    combat.demarrer(monstre);
    sons.jouerMusique("musiqueCombat");
    ecranCarte.hidden = true;
    ecranCombat.hidden = false;
}
```

Dans `exploration.surRencontre`, **remplace** les quatre dernières lignes (de `combat.demarrer(monstre);` à `ecranCombat.hidden = false;`) par :

```javascript
lancerCombat(monstre);
```

Puis branche le boss. Le dragon est un monstre **fait main**, sans API :

```javascript
// Le boss : un combat spécial, qui peut terminer la partie
let combatDeBoss = false;
exploration.surBoss = () => {
    exploration.actif = false;
    combatDeBoss = true;
    lancerCombat(new Monstre("Dragon", 150, 8, 18));
};
```

Enfin, **au tout début** de `combat.surRetour`, avant le `if` de la défaite :

```javascript
// Le boss est vaincu : c'est la fin de l'histoire !
if (combatDeBoss && !heros.estVaincu()) {
    ecranCombat.hidden = true;
    document.getElementById("fin").hidden = false;
    sons.jouer("victoire");
    return;
}
combatDeBoss = false;
```

Et le bouton « Rejouer » recharge simplement la page :

```javascript
document.getElementById("btn-rejouer").addEventListener("click", () => location.reload());
```

**Tester.**

1. Recharge : seul le texte d'introduction s'affiche. Clique **Commencer** : la carte apparaît.
2. Va jusqu'au dragon 🐉 et cogne-toi contre lui : un combat contre « Dragon » (150 PV) commence.
3. **Perds** : tu reviens au départ, comme d'habitude. Le dragon t'attend toujours.
4. **Gagne** (monte de niveau d'abord, si tu as fait le chapitre 02 !) : l'écran de fin s'affiche. **Rejouer** relance tout.

## ⌨️ À toi de jouer

| Idée | Difficulté | 🔍 Où regarder | 💡 Indice |
| --- | --- | --- | --- |
| Écrire **ta** histoire dans l'intro et la fin | ⭐ | `index.html` | seulement du texte : c'est le plus important ! |
| Afficher sur l'écran de fin le nombre de monstres vaincus | ⭐⭐ | `Combat.verifierFin`, `demarrerJeu` | un compteur dans `Heros`, affiché dans un `<span>` |
| Le dragon est un vrai Pokémon (Dracolosse, n° 149) | ⭐⭐ | `demarrerJeu` (`surBoss`) | `await Monstre.depuisApi(149)` : la fonction doit devenir `async` |
| Le dragon refuse le combat tant que le héros n'est pas niveau 3 | ⭐⭐ | `surBoss` | un `if` sur `heros.niveau`, et un message dans le dialogue (chapitres 02 et 03) |
| Une introduction en plusieurs pages (bouton « Suite ») | ⭐⭐ | `index.html`, `demarrerJeu` | un tableau de textes, et un compteur de page |
| Deux fins différentes selon un choix du joueur | ⭐⭐⭐ | à toi de trouver ! | découpe d'abord sur papier |
| Sauvegarder la partie (niveau, position) pour la reprendre plus tard | ⭐⭐⭐ | `Heros`, `Exploration`, `demarrerJeu` | `localStorage`, comme pour le bouton muet du dossier `son` |

## 🎤 Partage ton jeu

Un jeu est fait pour être **joué par d'autres** :

1. **Fais-le tester** à quelqu'un, **sans l'aider**. Observe : où bloque-t-il ? Qu'est-ce qui l'amuse ? Note tout dans ton carnet de bord.
2. **Corrige** ce qui bloque, puis refais tester.
3. **Présente** ton jeu en 2 minutes : l'histoire, une fonctionnalité dont tu es fier, et un bug que tu as résolu (et comment).
4. **Publie-le** en ligne (par exemple avec GitHub Pages), et envoie le lien à tes amis. N'oublie pas tes `CREDITS.md` !

## ✅ Bilan

Relis ton carnet de bord du début. Compare ton jeu avec celui de la fin du dossier `son`. Tout ce qui a changé, **c'est toi qui l'as imaginé, découpé, codé et testé**. Tu es en train de devenir développeur. 🎮

⬅️ Retour au début : [01 – Introduction](./01-introduction.md)
