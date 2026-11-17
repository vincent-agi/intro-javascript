# 06 – Victoire, défaite et barres de vie

🎯 **À la fin de cette étape** : les barres de vie passent du **vert** à l'**orange**, puis au **rouge qui clignote** quand on est en danger. À la fin du combat, le vaincu **pâlit, devient gris et s'affaisse**, et le héros victorieux **saute de joie**.

## Le concept : `transition` et classes CSS

Une **transition** dit au navigateur : « quand cette propriété change, ne saute pas d'un coup, **glisse** ».

```css
.vie {
    transition: width 0.3s, background-color 0.5s;
}
```

Ensuite, il suffit de **changer une classe** en JavaScript, et le CSS s'occupe de l'animation :

```javascript
barre.classList.add("critique");      // ajoute la classe
barre.classList.remove("critique");   // l'enlève
barre.classList.toggle("critique", condition); // l'ajoute si condition est vraie, sinon l'enlève
```

C'est une répartition des rôles très saine : **JavaScript décide** (« le monstre est vaincu »), **CSS dessine** (« un vaincu, c'est gris et pâle »).

## Le code

**1.** Dans `animations.css` :

```css
/* ===== Victoire, défaite et barres de vie (étape 06) ===== */

/* Le vaincu pâlit, devient gris et s'affaisse doucement */
.vaincu {
    opacity: 0.4;
    filter: grayscale(1);
    transform: translateY(10px);
    transition: opacity 0.8s, filter 0.8s, transform 0.8s;
}

/* La barre de vie change de couleur en douceur */
.vie {
    transition: width 0.3s, background-color 0.5s;
}

.vie.moyen    { background-color: #f5a623; } /* orange : moins de la moitié */
.vie.critique { background-color: #e53935; } /* rouge : presque à terre */

/* En danger, la barre rouge clignote */
.vie.critique {
    animation: alerte 0.5s ease-in-out infinite alternate;
}

@keyframes alerte {
    to { opacity: 0.5; }
}
```

**2.** Dans `js/combat.js`, ajoute une méthode qui choisit la couleur, juste avant `photo` :

```javascript
// Vert, orange ou rouge selon la part de vie qui reste (ratio entre 0 et 1)
colorerBarre(barre, ratio) {
    barre.classList.toggle("moyen", ratio <= 0.5 && ratio > 0.2);
    barre.classList.toggle("critique", ratio <= 0.2);
}
```

Appelle-la dans `afficherVie`, juste après les deux lignes qui règlent la largeur des barres :

```javascript
this.colorerBarre(this.barreJoueur, this.heros.pv / this.heros.pvMax);
this.colorerBarre(this.barreMonstre, this.monstre.pv / this.monstre.pvMax);
```

**3.** La fin du combat. Dans `verifierFin`, dans la branche de la **victoire**, après le son :

```javascript
this.zoneMonstre.classList.add("vaincu");
animer(this.zoneHeros, [                // le héros saute de joie
    { transform: "translateY(0)" },
    { transform: "translateY(-15px)" },
    { transform: "translateY(0)" },
    { transform: "translateY(-8px)" },
    { transform: "translateY(0)" }
], 600);
```

Dans la branche de la **défaite**, après le son :

```javascript
this.zoneHeros.classList.add("vaincu");
```

**4.** Sans rien d'autre, le monstre suivant serait… déjà gris ! Dans `demarrer`, **remets tout le monde debout**, après `this.boutonRetour.hidden = true;` :

```javascript
this.zoneHeros.classList.remove("vaincu");   // un nouveau combat : tout le monde debout
this.zoneMonstre.classList.remove("vaincu");
```

## Vérifier

1. Frappe un monstre : sous la moitié de ses PV, sa barre devient **orange** en douceur ; sous 20 %, **rouge**, et elle clignote.
2. Gagne : le monstre pâlit, grisonne et descend un peu, pendant que ton héros saute deux fois.
3. Perds (avec le Chevalier contre un gros Pokémon) : c'est **ta** zone qui devient grise.
4. Retourne sur la carte et trouve un autre monstre : tout le monde est de nouveau en couleur.

> 🆘 Bloqué ? Compare avec le [projet complet de l'étape 06](./etapes/etape-06/).

### Ce qu'il faut retenir

- `transition` : un changement de style devient une **animation douce**, sans `@keyframes`.
- **JavaScript change une classe, CSS fait le spectacle** : `classList.add`, `remove`, `toggle`.
- `classList.toggle("classe", condition)` : ajoute ou enlève selon la condition, en une ligne.
- Un état ajouté doit être **retiré** au bon moment (ici, au début de chaque combat).

## 🏆 Défi

Fais clignoter **en rouge** toute la zone du héros (pas seulement la barre) quand il lui reste moins de 20 % de vie. Une classe `.en-danger` sur `#zone-heros`, et un `@keyframes` qui change sa couleur de fond. Où places-tu le `toggle` ?

➡️ Suite : [07 – Respecter les joueurs et code final](./07-mouvement-reduit-code-final.md)
