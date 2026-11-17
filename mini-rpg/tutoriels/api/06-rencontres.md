# 06 – Rencontres dans les hautes herbes

🎯 **À la fin de cette étape** : quand le héros marche dans l'herbe, un monstre invisible peut surgir. La carte clignote, puis laisse la place au combat contre un Pokémon.

## Le concept

Trois idées, toutes pratiques :

**1. Le hasard décide.** À chaque pas dans l'herbe, on tire un nombre entre `0` et `1` avec `Math.random()`. S'il est plus petit que `0.25`, un monstre surgit : une chance sur quatre.

**2. Deux écrans, un seul visible.** La carte et le combat sont deux blocs de la page. On cache l'un et on montre l'autre avec l'attribut `hidden` :

```javascript
ecranCarte.hidden = true;    // cache la carte
ecranCombat.hidden = false;  // montre le combat
```

**3. Prévenir sans tout mélanger.** `Exploration` sait **quand** un monstre surgit, mais ne doit pas gérer le combat (ce n'est pas son rôle). Elle se contente de **prévenir**, en appelant une fonction que quelqu'un d'autre a fournie. C'est une **fonction de rappel** (*callback*) :

```javascript
this.surRencontre = () => {};     // par défaut : ne fait rien
// plus tard, depuis l'extérieur :
exploration.surRencontre = () => console.log("Un monstre !");
```

C'est comme une sonnette : `Exploration` appuie sur le bouton, et c'est `demarrerJeu` qui décide ce qui sonne.

## Le code

**1.** Dans `index.html`, entoure **tout le combat** (sections héros et monstre, boutons, message, journal) d'un bloc **caché au départ**, et supprime le bouton « Nouveau combat » :

```html
<div id="carte"></div>

<!-- Le combat : caché tant qu'aucun monstre n'apparaît -->
<div id="combat" hidden>
    <!-- ... sections héros et monstre, comme avant ... -->

    <div class="actions">
        <button id="btn-attaque">⚔️ Attaquer</button>
        <button id="btn-soin">💚 Se soigner</button>
    </div>

    <!-- ... message et journal, comme avant ... -->
</div>
```

**2.** Ajoute à `carte.css` :

```css
/* display:grid écraserait l'attribut hidden : on le rétablit */
#carte[hidden] { display: none; }

/* Rencontre : la carte clignote, comme dans les vieux jeux */
.rencontre {
    animation: clignote 0.2s 4;
}

@keyframes clignote {
    50% { filter: brightness(3); }
}
```

L'animation `clignote` rend la carte très lumineuse à mi-parcours, puis la ramène à la normale. Elle dure `0.2` seconde et se répète `4` fois.

**3.** Dans `Exploration`, ajoute la sonnette dans le **constructeur** :

```javascript
this.surRencontre = () => {}; // branché depuis l'extérieur
```

Puis, **à la fin de `deplacer()`**, après `this.afficher();` :

```javascript
// Dans l'herbe haute : 1 chance sur 4 de rencontrer un monstre
if (this.carte.typeEn(x, y) === "herbe" && Math.random() < 0.25) {
    this.surRencontre();
}
```

Le monstre n'est **jamais** dessiné sur la carte : il n'existe qu'au moment où le hasard le décide.

**4.** Dans `Combat`, supprime ce qui concerne le bouton « Nouveau combat » : la ligne `this.boutonNouveau = ...`, son `addEventListener`, et toute la méthode `nouveauCombat`. C'est maintenant la carte qui lance les combats, avec `demarrer(monstre)`.

**5.** Tout en haut de `app.js`, sous `nombreAuHasard`, ajoute une petite fonction pour **faire une pause** :

```javascript
// Met le programme en pause pendant "ms" millisecondes (à utiliser avec await)
function attendre(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
```

Pas besoin de comprendre l'intérieur pour l'utiliser : `await attendre(800);` met la fonction en pause pendant 800 millisecondes.

**6.** Remplace `demarrerJeu`. Elle crée tout, puis **branche la sonnette** :

```javascript
async function demarrerJeu() {
    const ecranCarte = document.getElementById("carte");
    const ecranCombat = document.getElementById("combat");

    const heros = new Heros("Héros");
    const journal = new Journal(
        document.getElementById("journal"),
        document.getElementById("message"),
        5
    );
    const combat = new Combat(heros, journal);

    const carte = new Carte(await chargerJson("map.json"), ecranCarte);
    const exploration = new Exploration(carte);

    // Rencontre : on charge un monstre, puis on passe de la carte au combat
    exploration.surRencontre = async () => {
        exploration.actif = false;                // plus de déplacement
        ecranCarte.classList.add("rencontre");    // la carte clignote
        const monstre = await chargerMonstreAleatoire();
        await attendre(800);                      // le temps de voir le clignotement
        ecranCarte.classList.remove("rencontre");

        combat.demarrer(monstre);
        ecranCarte.hidden = true;
        ecranCombat.hidden = false;
    };
}

demarrerJeu();
```

Supprime l'ancien `const journal = new Journal(...)` qui était au-dessus : il est maintenant **dans** `demarrerJeu`.

Lis la rencontre dans l'ordre, comme une recette :

1. le héros est **figé** (`actif = false`) ;
2. la carte **clignote** pendant qu'on **télécharge** le monstre (client → serveur → client) ;
3. une petite **pause**, pour profiter de l'effet ;
4. le combat **démarre** et les écrans **s'échangent**.

## Vérifier

1. Recharge la page : seule la carte est visible.
2. Marche dans l'herbe (vert clair) : après quelques pas, la carte clignote, puis un Pokémon apparaît avec ses PV.
3. Pendant le combat, les flèches ne déplacent plus le héros.
4. Combats jusqu'au bout. Pour l'instant, tu restes bloqué sur l'écran de combat : recharge la page. On règle ça à l'étape suivante.

> 🆘 Bloqué ? Compare avec le [code complet de l'étape 06](./etapes/etape-06/).

### Ce qu'il faut retenir

- `Math.random() < 0.25` : un événement qui arrive **une fois sur quatre**.
- `hidden` : montrer ou cacher un écran entier.
- Une **fonction de rappel** permet à une classe de **prévenir** sans connaître les autres.
- Une fonction `async` se lit de haut en bas : chaque `await` attend la fin de l'étape avant de passer à la suivante.

## 🏆 Défi

1. Rends les rencontres plus rares : une chance sur dix.
2. Ajoute dans `map.json` une **herbe sombre** (symbole `"W"`, type `"herbe-sombre"`, couleur `#3f8f3a`), où l'on rencontre un monstre **une fois sur deux**. Indice : dans `deplacer`, il faut un `else if`.

➡️ Suite : [07 – Retour à la carte et code final](./07-retour-code-final.md)
