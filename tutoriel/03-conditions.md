# 03 – Les conditions : « Plus » ou « Moins » ?

## Le concept

Une **condition** permet au programme de choisir quoi faire :

```javascript
if (condition1) {
    // fait ça si condition1 est vraie
} else if (condition2) {
    // sinon, fait ça si condition2 est vraie
} else {
    // sinon, fait ça dans tous les autres cas
}
```

Les comparaisons les plus courantes :

| Symbole | Sens |
| --- | --- |
| `<` | plus petit que |
| `>` | plus grand que |
| `===` | strictement égal à |

⚠️ Attention : `=` **range** une valeur dans une variable, `===` **compare** deux valeurs.

## Le code

Remplace ta fonction `valider` par celle-ci :

```javascript
function valider() {
    const proposition = Number(saisie.value);

    // Champ vide ou texte invalide : on ne continue pas
    if (saisie.value === "") {
        message.textContent = "⚠️ Entre un nombre d'abord !";
        return; // return = on quitte la fonction tout de suite
    }

    // On compare la proposition au nombre mystère
    if (proposition < vuesMystere) {
        message.textContent = "📈 Plus ! Il y a eu plus de vues.";
    } else if (proposition > vuesMystere) {
        message.textContent = "📉 Moins ! Il y a eu moins de vues.";
    } else {
        // Ni plus petit, ni plus grand : c'est égal !
        message.textContent = "🎉 Bravo ! C'était " + vuesMystere + " vues !";
    }
}
```

### Ce qu'il faut retenir

- JavaScript lit les conditions **de haut en bas** et s'arrête à la première vraie.
- Le `else` final n'a pas de condition : il attrape tout le reste.
- `return` permet de sortir de la fonction avant la fin.

## 🏆 Défi

Ajoute une condition pour dire à quel point on est loin. Par exemple, si l'écart est inférieur à `50`, affiche « 🔥 Tu brûles ! ».

Indice : l'écart se calcule avec `Math.abs(proposition - vuesMystere)`.

➡️ Suite : [04 – Boucles et tableau](./04-boucles-et-tableau.md)
