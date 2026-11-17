# 04 – Tout ranger, et `main.js`

🎯 **À la fin de cette étape** : chaque classe a son fichier. `app.js` n'existe plus ; il est remplacé par un court `main.js` qui ne fait que **créer** les objets et les **relier**.

## Le concept

Tu connais maintenant la recette, qui se répète pour chaque classe :

1. **créer** le fichier ;
2. **couper / coller** la classe, avec `export` devant ;
3. **importer** dans ce fichier ce qu'il utilise ;
4. **importer** la classe là où on s'en sert ;
5. **recharger et tester**.

Une bonne surprise t'attend : `Journal`, `Carte`, `Exploration` et `Combat` n'importent **presque rien**. Pourquoi ? Parce que, depuis le dossier `son`, ils **reçoivent** leurs outils dans le constructeur (`new Combat(heros, journal, sons)`), au lieu d'aller les chercher. Cette **injection** les rend indépendants : il suffit de les déplacer.

## Le code

**1.** Crée un fichier par classe. Pour chacun : coupe la classe d'`app.js`, colle-la avec `export`, garde son commentaire d'en-tête.

| Fichier | Contenu | Imports nécessaires |
| --- | --- | --- |
| `js/sons.js` | `FICHIERS_SONS` et `Sons` | aucun |
| `js/journal.js` | `Journal` | aucun |
| `js/carte.js` | `Carte` | aucun |
| `js/exploration.js` | `Exploration` | aucun |
| `js/combat.js` | `Combat` | aucun |

Par exemple, `js/journal.js` :

```javascript
// Le journal de combat

// Le message principal et la liste des derniers événements
export class Journal {
    // ... la classe, inchangée
}
```

> Tu te demandes pourquoi `combat.js` n'importe pas `Heros` ni `Monstre` ? Il **utilise** des héros et des monstres, mais ne **crée** jamais d'objet avec `new Heros(...)` ni `new Monstre(...)`, et n'écrit nulle part le **nom** de ces classes. On n'importe que les noms qu'on **écrit** dans le fichier.

**2.** Il ne reste dans `app.js` que `demarrerJeu` et l'écran de choix. **Renomme** `app.js` en `main.js` : c'est le nom habituel du fichier qui **démarre** un programme. Mets à jour `index.html` :

```html
<script type="module" src="js/main.js"></script>
```

**3.** En haut de `main.js`, importe tout ce dont le démarrage a besoin :

```javascript
// Le jeu : on crée les objets et on les relie

import { attendre, chargerJson } from "./outils.js";
import { FICHIERS_SONS, Sons } from "./sons.js";
import { Heros, Mage } from "./personnages.js";
import { chargerMonstreAleatoire } from "./monstre.js";
import { Journal } from "./journal.js";
import { Carte } from "./carte.js";
import { Exploration } from "./exploration.js";
import { Combat } from "./combat.js";

async function demarrerJeu(heros) {
    // ... inchangée
}

// ... l'écran de choix, inchangé
```

Ces 8 lignes sont comme la **table des matières** du jeu : en les lisant, on sait de quoi il est fait.

## Vérifier

1. Fais une partie complète avec chaque héros : exploration, rencontres, sorts, sons, muet, victoire et défaite. Tout doit marcher comme au début de ce dossier.
2. Teste le plan B : coupe Internet et provoque une rencontre. Le Gobelin apparaît toujours.
3. Compare : ouvre `combat.js`, puis cherche « où est calculé le coût d'un sort ». Tu sais tout de suite qu'il faut ouvrir `sorts.js` ou `personnages.js`. C'est **tout l'intérêt** du rangement.

> 🆘 Bloqué ? Compare avec le [projet complet de l'étape 04](./etapes/etape-04/).

### Ce qu'il faut retenir

- **Un fichier = un sujet.** Le nom du fichier dit ce qu'on y trouve.
- `main.js` est le **point d'entrée** : c'est le seul fichier chargé par `index.html`. Tous les autres sont chargés par des `import`.
- Une classe qui **reçoit** ses outils (injection) se déplace sans effort : elle n'a besoin d'importer personne.
- On importe les noms qu'on **écrit** dans le fichier, pas ceux des objets qu'on manipule.

## 🏆 Défi

Les deux lignes `boutonSon.textContent = sons.muet ? "🔇" : "🔊";` de `main.js` se répètent. Ajoute à la classe `Sons` une méthode `icone()` qui renvoie `"🔇"` ou `"🔊"`, et utilise-la. Dans quel fichier écris-tu cette méthode ? Faut-il changer un `import` ?

➡️ Suite : [05 – Documenter avec JSDoc](./05-jsdoc.md)
