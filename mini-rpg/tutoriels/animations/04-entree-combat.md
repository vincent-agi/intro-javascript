# 04 – L'entrée en combat

🎯 **À la fin de cette étape** : quand un monstre surgit, l'écran de combat **glisse** vers le haut en apparaissant, le monstre **jaillit** en rebondissant puis **flotte** sur place, et les boutons arrivent **l'un après l'autre**.

## Le concept : l'animation qui se rejoue à l'apparition

Bonne nouvelle : **pas une ligne de JavaScript** dans cette étape.

Une animation CSS **démarre quand l'élément apparaît**. Or, l'écran de combat est caché (`hidden`) puis montré à **chaque** rencontre. Son animation se rejoue donc **toute seule** à chaque combat !

Deux nouveautés CSS :

- **`from`** dans un `@keyframes` : l'état **de départ** (ici, invisible et un peu plus bas). La fin, c'est l'état normal.
- **`animation-delay`** : attendre un peu avant de démarrer. En décalant chaque bouton, on obtient un effet **en cascade**.

## Le code

Tout se passe dans `animations.css`, à la suite.

**1.** L'écran de combat arrive en fondu, en glissant :

```css
/* ===== L'entrée en combat (étape 04) ===== */

/* L'écran de combat arrive en fondu, en glissant vers le haut.
   Il se rejoue tout seul chaque fois que l'écran réapparaît. */
#combat {
    animation: arrivee 0.4s ease-out;
}

@keyframes arrivee {
    from { opacity: 0; transform: translateY(20px); }
}
```

**2.** Le monstre jaillit, puis flotte. Un élément peut avoir **plusieurs** animations, séparées par une virgule :

```css
/* Le monstre surgit en rebondissant, puis flotte sur place */
#sprite-monstre {
    animation:
        surgit 0.6s 0.2s cubic-bezier(0.3, 1.6, 0.6, 1) both,
        flotte 1.5s 0.8s ease-in-out infinite alternate;
}

@keyframes surgit {
    from { transform: scale(0); }
}

@keyframes flotte {
    to { transform: translateY(-6px); }
}
```

| Morceau | Sens |
| --- | --- |
| `surgit 0.6s 0.2s` | dure 0,6 s, **attend** 0,2 s avant de commencer |
| `cubic-bezier(0.3, 1.6, 0.6, 1)` | une courbe qui **dépasse** sa cible puis revient : l'effet « rebond » |
| `both` | pendant l'attente, le monstre est déjà dans l'état de départ (invisible) |
| `flotte 1.5s 0.8s ... infinite alternate` | commence **après** le rebond (0,8 s), puis flotte sans fin |

**3.** Les boutons, en cascade :

```css
/* Les boutons arrivent l'un après l'autre */
.actions button {
    animation: arrivee 0.3s ease-out both;
}

.actions button:nth-child(2) { animation-delay: 0.1s; }
.actions button:nth-child(3) { animation-delay: 0.2s; }
```

`arrivee` sert **deux fois** (écran et boutons) : un `@keyframes` est réutilisable. Et `:nth-child(2)` cible « le 2e bouton de son groupe ».

## Vérifier

1. Marche dans l'herbe jusqu'à une rencontre : après le clignotement, l'écran **glisse** en place, le monstre **jaillit** avec un rebond, puis flotte.
2. Les boutons Attaquer / Se soigner, puis les sorts du Mage, arrivent en cascade.
3. Gagne, retourne sur la carte, provoque une autre rencontre : **tout se rejoue**.
4. À la fin d'un combat, le bouton « Retour à la carte » apparaît lui aussi en glissant : il était caché, il apparaît, donc son animation démarre !

> 🆘 Bloqué ? Compare avec le [projet complet de l'étape 04](./etapes/etape-04/).

### Ce qu'il faut retenir

- Une animation CSS **démarre quand l'élément apparaît** : idéal pour les écrans qu'on cache et qu'on montre.
- `from { ... }` : l'état de départ. L'état final, c'est l'élément tel qu'il est.
- `animation-delay` (ou la 2e durée dans `animation`) décale le départ : effet cascade.
- Plusieurs animations sur un élément : on les sépare par des **virgules**.

## 🏆 Défi

Le Gobelin n'a pas d'image, donc pas d'animation… Fais apparaître son **nom** (`#nom-monstre`) avec un effet de **zoom** (`scale(2)` → normal). Ça marchera aussi pour les Pokémon !

➡️ Suite : [05 – Les coups qui portent](./05-coups.md)
