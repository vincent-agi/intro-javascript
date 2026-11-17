# 05 – Ajouter des images et des sons

Les **assets** sont tout ce qui n'est pas du code : images, sons, musiques, polices. Ce sont eux qui donnent son **ambiance** à ton jeu. Bonne nouvelle : ton code est déjà prêt à les accueillir.

## 🧠 Réfléchis d'abord

- Quelle **ambiance** veux-tu ? Rétro 8 bits ? Médiéval ? Mignon ? Effrayant ?
- Quelles images manquent le plus ? (les tuiles, le héros, les personnages…)
- Où trouver des assets que tu as le **droit** d'utiliser ?

## Trouver des assets libres

Tu connais déjà [OpenGameArt](https://opengameart.org). Pour les images :

1. dans la recherche, choisis **Art Type : 2D Art** ;
2. cherche par exemple `tileset 32x32`, `rpg tiles`, `top down character` ;
3. **vérifie la licence** : **CC0** = libre ; **CC-BY** = libre, mais tu **dois** citer l'auteur ; évite **CC-BY-SA** et **GPL** pour l'instant ;
4. note chaque asset dans un fichier `CREDITS.md`, comme pour les sons.

> 💡 Tes tuiles font `32` pixels de côté (`"tailleTile": 32` dans `map.json`). Choisis des images de cette taille, ou de 16 pixels (elles seront agrandies).

Tu peux aussi **dessiner tes propres images** avec un éditeur de pixel art gratuit (comme Piskel, en ligne). Un jeu avec tes dessins, c'est vraiment **ton** jeu.

## Exemple guidé : des tuiles en images

**L'idée.** Remplacer les couleurs unies de la carte par de vraies images.

**Découper.**

1. ranger les images → un dossier `images/` ;
2. afficher une image au lieu d'une couleur → `carte.css` ;
3. le héros en image au lieu d'un emoji → `carte.css` et `Exploration`.

**1.** Crée un dossier `images/` et places-y une image par type de tuile : `herbe.png`, `chemin.png`, `arbre.png`, `eau.png`. Découpe-les dans un *tileset*, ou dessine-les.

**2.** Dans `carte.css`, remplace les couleurs par les images :

```css
.tile-chemin { background: url("images/chemin.png"); }
.tile-herbe  { background: url("images/herbe.png"); }
.tile-arbre  { background: url("images/arbre.png"); }
.tile-eau    { background: url("images/eau.png"); }

/* Pour toutes les tuiles : l'image remplit la case, sans flou */
#carte > div {
    background-size: cover;
    image-rendering: pixelated;
}
```

`image-rendering: pixelated` garde des pixels bien nets quand une petite image est agrandie, pour un vrai look rétro.

**3.** Pour le héros, ajoute une image `images/heros.png`, puis dans `carte.css` :

```css
#carte .joueur {
    background: url("images/heros.png") center / contain no-repeat;
    image-rendering: pixelated;
}
```

Pourquoi `#carte .joueur` et pas `.joueur` ? Le héros est lui aussi une `div` dans `#carte`. La règle `#carte > div` du point 2 s'appliquerait donc à lui, et elle est plus **précise** que `.joueur` seul. `#carte .joueur` est encore plus précise : c'est elle qui gagne.

Et dans le constructeur d'`Exploration`, supprime l'emoji :

```javascript
this.element.textContent = ""; // le héros est maintenant une image (voir carte.css)
```

> Si tu as fait le dossier `magie`, la ligne d'origine est `this.element.textContent = emoji;`. Pour garder un héros différent par personnage, donne plutôt à chaque héros une propriété `image`, et utilise `this.element.style.backgroundImage`.

**Tester.** Recharge : la carte est faite de vraies images. Si une case reste vide, regarde l'onglet **Réseau** (`F12`) : un `404` signale une image mal nommée ou mal rangée.

## ⌨️ À toi de jouer

| Idée | Difficulté | 🔍 Où regarder | 💡 Indice |
| --- | --- | --- | --- |
| Une police rétro pour tout le jeu | ⭐ | `index.html`, `style.css` | sur Google Fonts, la police « Press Start 2P » : un `<link>` et un `font-family` |
| Une image pour le villageois (chapitre 03) | ⭐ | `carte.css` | remplace le `::after` par un `background` |
| Un son quand un personnage parle | ⭐ | `FICHIERS_SONS`, `demarrerJeu` | `sons.jouer("parler")` dans `surDialogue` |
| Une image de fond pour l'écran de combat | ⭐ | `carte.css` | `#combat { background: url(...); }` |
| Un tileset en une seule image (*sprite sheet*) | ⭐⭐ | `carte.css` | `background-position: -32px 0;` affiche la 2e tuile de la ligne |
| Le héros regarde dans la direction où il marche | ⭐⭐⭐ | `Exploration.deplacer`, `carte.css` | 4 images, et une classe CSS selon `dx` et `dy` (`classList`) |

## ✅ Avant de passer à la suite

- [ ] Toutes mes images et mes sons sont notés dans `CREDITS.md`, avec auteur et licence.
- [ ] Le jeu marche encore, même si une image manque (une case vide n'empêche pas de jouer).
- [ ] Les noms de fichiers n'ont ni espaces ni accents (`foret-sombre.png`, pas `Forêt Sombre.png`).

➡️ Suite : [06 – Raconter une histoire](./06-raconter.md)
