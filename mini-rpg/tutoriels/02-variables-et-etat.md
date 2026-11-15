# 02 – Variables et état du jeu

## Le concept

Une **variable** est une boîte avec une étiquette, où tu ranges une valeur.

- `const` : la valeur ne changera **jamais** (par exemple les PV maximum).
- `let` : la valeur va **changer** (par exemple les PV actuels).

L'ensemble des variables qui décrivent le jeu à un instant donné s'appelle **l'état** du jeu.

Le **DOM**, c'est la page HTML vue par JavaScript. `document.getElementById("...")` retrouve un élément grâce à son `id`.

## Le code

Écris ceci dans `app.js` :

```javascript
/* ===== L'ÉTAT DU JEU ===== */

// Valeurs fixes : on ne les modifie jamais
const PV_MAX_JOUEUR = 100;
const PV_MAX_MONSTRE = 80;

// Valeurs qui vont changer pendant le combat
let pvJoueur = PV_MAX_JOUEUR;
let pvMonstre = PV_MAX_MONSTRE;

/* ===== LES ÉLÉMENTS DE LA PAGE ===== */

const textePvJoueur = document.getElementById("pv-joueur");
const textePvMonstre = document.getElementById("pv-monstre");
const barreJoueur = document.getElementById("barre-joueur");
const barreMonstre = document.getElementById("barre-monstre");

/* ===== L'AFFICHAGE ===== */

// Une fonction = un bloc de code qu'on peut lancer quand on veut.
// Celle-ci met l'écran à jour avec les valeurs actuelles.
function afficherVie() {
    // On écrit les PV dans le texte
    textePvJoueur.textContent = pvJoueur;
    textePvMonstre.textContent = pvMonstre;

    // On règle la largeur des barres en pourcentage.
    // Exemple : 50 PV sur 100 → 50 / 100 * 100 = 50 %
    barreJoueur.style.width = (pvJoueur / PV_MAX_JOUEUR) * 100 + "%";
    barreMonstre.style.width = (pvMonstre / PV_MAX_MONSTRE) * 100 + "%";
}

// On l'appelle une fois au chargement de la page
afficherVie();
```

### Ce qu'il faut retenir

- Les PV changent → `let`. Les PV max restent fixes → `const`.
- On écrit `PV_MAX_JOUEUR` en majuscules par habitude : c'est le signe d'une valeur fixe.
- Changer une variable ne modifie **pas** l'écran tout seul : il faut rappeler `afficherVie()`.

## 🏆 Défi

Juste sous `afficherVie();`, ajoute ces deux lignes puis recharge la page :

```javascript
pvMonstre = 20;
afficherVie();
```

La barre du monstre doit descendre à 25 %. Supprime ensuite ces deux lignes.

➡️ Suite : [03 – Fonctions et actions](./03-fonctions-actions.md)
