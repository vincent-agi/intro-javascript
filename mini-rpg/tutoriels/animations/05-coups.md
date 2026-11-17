# 05 – Les coups qui portent

🎯 **À la fin de cette étape** : quand quelqu'un perd des PV, sa zone **tremble** et un chiffre rouge (**« -24 »**) s'envole au-dessus de lui en s'effaçant. Un soin fait s'envoler un chiffre vert (**« +30 »**).

## Le concept : créer, animer, supprimer

Le chiffre qui s'envole est un petit élément **créé exprès** pour l'animation :

1. **créer** un `<span>` avec le texte `-24` ;
2. le **poser** dans la zone du monstre ;
3. l'**animer** : il monte et devient transparent ;
4. quand l'animation est **finie**, le **supprimer** (sinon la page se remplirait de chiffres invisibles).

L'étape 4 utilise la promesse de notre outil `animer` (étape 03) :

```javascript
animer(chiffre, [...], 900).then(() => chiffre.remove());
//                          └── "quand c'est fini, retire-le de la page"
```

Et pour savoir **combien** de PV ont changé ? On prend une **photo** des PV avant l'action, et on compare après. Ça marche pour **tout** : attaque, sort, soin, riposte.

## Le code

**1.** Dans `index.html`, donne un `id` aux deux sections du combat :

```html
<!-- Le héros -->
<section id="zone-heros">
```

```html
<!-- Le monstre -->
<section id="zone-monstre">
```

**2.** Dans `animations.css` :

```css
/* ===== Les coups qui portent (étape 05) ===== */

/* Les zones du héros et du monstre servent de repère aux chiffres */
#zone-heros,
#zone-monstre {
    position: relative;
}

/* Un chiffre de dégâts ou de soin, posé par-dessus la zone */
.chiffre {
    position: absolute;
    top: 0;
    right: 10%;
    font-size: 28px;
    font-weight: bold;
    pointer-events: none; /* on peut cliquer "à travers" */
}

/* Côté monstre, le chiffre part de son image (plus bas dans la zone) */
#zone-monstre .chiffre {
    top: 30%;
}
```

`position: absolute` sur le chiffre + `position: relative` sur la zone = le chiffre se place **par rapport à la zone**, par-dessus son contenu.

**3.** Dans `js/combat.js`, importe l'outil en haut du fichier :

```javascript
import { animer } from "./outils.js";
```

Dans le constructeur, récupère les deux zones :

```javascript
this.zoneHeros = document.getElementById("zone-heros");
this.zoneMonstre = document.getElementById("zone-monstre");
```

**4.** Ajoute quatre petites méthodes à `Combat`, juste avant `riposte` :

```javascript
// Les PV de chacun, à un instant donné
photo() {
    return { heros: this.heros.pv, monstre: this.monstre.pv };
}

// Montre ce qui a changé depuis la photo "avant"
montrerChangements(avant) {
    this.montrerEcart(this.zoneHeros, this.heros.pv - avant.heros);
    this.montrerEcart(this.zoneMonstre, this.monstre.pv - avant.monstre);
}

// Un écart de PV : "-12" en rouge avec une secousse, ou "+20" en vert
montrerEcart(zone, ecart) {
    if (ecart < 0) {
        this.afficherChiffre(zone, String(ecart), "#d32f2f");
        animer(zone, [
            { transform: "translateX(0)" },
            { transform: "translateX(-8px)" },
            { transform: "translateX(8px)" },
            { transform: "translateX(-4px)" },
            { transform: "translateX(0)" }
        ], 300);
    } else if (ecart > 0) {
        this.afficherChiffre(zone, "+" + ecart, "#2e7d32");
    }
}

// Un chiffre qui s'envole et s'efface, puis disparaît de la page
afficherChiffre(zone, texte, couleur) {
    const chiffre = document.createElement("span");
    chiffre.className = "chiffre";
    chiffre.textContent = texte;
    chiffre.style.color = couleur;
    zone.appendChild(chiffre);

    animer(chiffre, [
        { transform: "translateY(0)", opacity: 1 },
        { transform: "translateY(-50px)", opacity: 0 }
    ], 900).then(() => chiffre.remove());
}
```

Chaque méthode fait **une seule chose**, et elles s'appellent l'une l'autre : `montrerChangements` → `montrerEcart` → `afficherChiffre`.

**5.** Branche-les. Le principe est le même partout : **photo, action, comparaison**. Dans `riposte` :

```javascript
riposte() {
    this.sons.jouer("degats");
    const avant = this.photo();
    this.journal.ajouter(this.monstre.attaquer(this.heros));
    this.montrerChangements(avant);
    this.heros.regenererMana(5); // fin du tour : le mage récupère un peu de mana
}
```

Dans `attaquer`, `lancerSort` et `soigner`, encadre de la même façon la ligne qui fait agir le héros. Par exemple dans `attaquer` :

```javascript
this.sons.jouer("attaque");
const avant = this.photo();
this.journal.ajouter(this.heros.attaquer(this.monstre));
this.montrerChangements(avant);
```

Dans `lancerSort`, profites-en pour remplacer `this.spriteMonstre.animate(` par notre outil `animer(this.spriteMonstre,` : un seul style dans tout le code.

## Vérifier

1. Attaque : la zone du monstre tremble et un « -15 » rouge s'envole de son image. Presque en même temps, il riposte : ta zone tremble, un « -6 » s'envole.
2. Avec le Mage, lance ✨ Lumière : un « +28 » **vert** s'envole au-dessus de toi.
3. Ouvre l'onglet **Elements** pendant le combat : les `<span class="chiffre">` apparaissent… puis **disparaissent** d'eux-mêmes. La page reste propre.

> 🆘 Bloqué ? Compare avec le [projet complet de l'étape 05](./etapes/etape-05/).

### Ce qu'il faut retenir

- Pour un effet ponctuel : **créer** un élément, l'**animer**, le **supprimer** à la fin (`.then(() => element.remove())`).
- `position: relative` sur le parent + `position: absolute` sur l'enfant : l'enfant se pose **par-dessus**, où on veut.
- **Photo avant / comparaison après** : une seule technique pour tous les cas (attaque, sort, soin, riposte).
- Des petites méthodes qui font **une seule chose** chacune sont faciles à lire et à réutiliser.

## 🏆 Défi

Pour l'instant, la riposte arrive **en même temps** que ton coup. Dans un vrai RPG, on attend un peu. Rends `attaquer` **`async`**, et ajoute `await attendre(500);` juste avant `this.riposte();` (importe `attendre` depuis `outils.js`). Attention : pendant cette demi-seconde, le joueur peut cliquer encore ! Comment l'en empêcher ? (Indice : `this.enCours`, ou désactiver les boutons.)

➡️ Suite : [06 – Victoire, défaite et barres de vie](./06-victoire-defaite.md)
