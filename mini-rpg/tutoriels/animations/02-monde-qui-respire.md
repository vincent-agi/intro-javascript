# 02 – Un monde qui respire

🎯 **À la fin de cette étape** : l'eau de la carte scintille doucement, et le héros respire (il monte et descend un tout petit peu), même quand tu ne touches à rien.

## Le concept : `@keyframes`

Une animation CSS se fait en **deux temps** :

**1. On décrit le mouvement** avec `@keyframes`, en lui donnant un nom :

```css
@keyframes respire {
    to { transform: translateY(-3px); }   /* "à la fin" : 3 pixels plus haut */
}
```

`to` veut dire « à la fin de l'animation ». Le début (`from`) est l'état normal de l'élément : pas besoin de l'écrire.

**2. On l'applique** à un élément avec `animation` :

```css
.sprite-joueur {
    animation: respire 0.6s ease-in-out infinite alternate;
}
```

Lis cette ligne mot à mot :

| Morceau | Sens |
| --- | --- |
| `respire` | le nom du `@keyframes` à jouer |
| `0.6s` | durée d'un aller : 0,6 seconde |
| `ease-in-out` | démarre et finit en douceur (pas d'à-coup) |
| `infinite` | recommence **sans fin** |
| `alternate` | un aller, puis un **retour** : monte, descend, monte… |

## Le code

**1.** Crée le fichier `animations.css`, à côté de `carte.css`, et relie-le dans `index.html`, sous `carte.css` :

```html
<link rel="stylesheet" href="animations.css">
```

**2.** Dans `animations.css`, fais scintiller l'eau :

```css
/* Toutes les animations du jeu */

/* ===== Le monde qui respire (étape 02) ===== */

/* L'eau scintille : sa luminosité monte et descend, sans fin */
.tile-eau {
    animation: vagues 1.2s ease-in-out infinite alternate;
}

@keyframes vagues {
    to { filter: brightness(1.25); }
}
```

Recharge : les lacs brillent doucement. **Aucune ligne de JavaScript.**

**3.** Le héros, maintenant. Problème : son élément `.joueur` **glisse déjà** d'une case à l'autre (avec `left` et `top`). Si on le fait aussi respirer, les deux mouvements vont se mélanger. La solution : **deux éléments emboîtés**.

```
<div class="joueur">           ← la case : elle glisse sur la carte
    <span class="sprite-joueur">🧙</span>   ← le héros : lui respire, saute, tremble
</div>
```

Dans `js/exploration.js`, dans le constructeur, remplace la création de l'élément :

```javascript
// La case du héros (elle glisse d'une case à l'autre)...
this.element = document.createElement("div");
this.element.className = "joueur";

// ...et le héros lui-même, dans la case (lui respire, saute, tremble)
this.sprite = document.createElement("span");
this.sprite.className = "sprite-joueur";
this.sprite.textContent = emoji;
this.element.appendChild(this.sprite);
```

(La ligne `this.element.textContent = emoji;` disparaît : l'emoji est maintenant dans le `span`.)

**4.** Dans `animations.css`, fais respirer le héros :

```css
/* Le héros respire : il monte et descend de 3 pixels, sans fin */
.sprite-joueur {
    display: inline-block; /* un <span> doit être "inline-block" pour bouger */
    animation: respire 0.6s ease-in-out infinite alternate;
}

@keyframes respire {
    to { transform: translateY(-3px); }
}
```

`transform` ne marche pas sur un simple `<span>` (élément « en ligne ») : `display: inline-block` le rend « déplaçable ».

## Vérifier

1. Recharge et choisis un héros : il monte et descend doucement, sans arrêt. L'eau scintille.
2. Déplace-toi : le héros glisse **et** respire en même temps. Les deux mouvements ne se gênent pas, grâce aux deux éléments emboîtés.
3. Ouvre `F12` → onglet **Elements**, clique sur le `span` du héros, puis l'onglet **Animations** (dans le menu `⋮` → *More tools*) : tu vois ton animation `respire` tourner.

> 🆘 Bloqué ? Compare avec le [projet complet de l'étape 02](./etapes/etape-02/).

### Ce qu'il faut retenir

- `@keyframes nom { to { ... } }` décrit **le mouvement** ; `animation: nom durée ...` l'**applique**.
- `infinite` + `alternate` : un aller-retour sans fin, parfait pour « respirer » ou « scintiller ».
- `transform: translateY(...)` déplace un élément **sans** déranger la mise en page autour de lui.
- Deux mouvements différents ? **Deux éléments emboîtés**, un par mouvement.

## 🏆 Défi

Fais **onduler l'herbe** : un `@keyframes vent` qui change très légèrement sa teinte (`filter: hue-rotate(-10deg)`) toutes les 2 secondes. Puis essaie `animation-delay` sur `.tile-herbe:nth-child(odd)` pour que toutes les touffes ne bougent pas en même temps.

➡️ Suite : [03 – Le héros marche](./03-heros-marche.md)
