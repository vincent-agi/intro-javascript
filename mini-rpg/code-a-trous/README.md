# 🧩 Mini RPG – Parcours « code à trous » (consolidation des bases)

Parcours d'exercices de **consolidation** pour reprendre les bases de JavaScript avant (ou pendant) le [tutoriel Mini RPG](../tutoriels/01-introduction.md). On part du **code à trous** et on va vers la **production guidée**, toujours dans l'univers du jeu (PV, potions, monstres, inventaire, journal).

> 📁 Ce dossier est **nouveau** : aucun fichier existant du dépôt n'a été modifié.

---

## 🎯 Pourquoi ce parcours ? (diagnostic → objectifs)

Questionnaire de bases de Noah : **6/24**.

| Constat au questionnaire | Ce que le parcours fait travailler | Exercices |
| --- | --- | --- |
| ✅ Acquis : `const`, booléens, `===` / `!==`, rôle de `return`, callback différé | On s'appuie dessus (vocabulaire repris, pas réexpliqué) | toutes |
| ❌ Syntaxe fragile : `if pv <= 0` sans `( )`, accolades, `consol.log`, `for (...) ;` | Chasse aux bugs, gabarits à recopier, checklist, atelier qui explique les erreurs en français | 01, 02, 03, 07 |
| ❌ Bornes de boucle `<` / `<=` | Prédiction sur papier, règle « de 1 à N » vs « cases d'un tableau » | 04, 05, 07, 14 |
| ❌ Corps de boucle à écrire seul | Trous → production guidée, compte à rebours | 05, 06, 12 |
| ❌ Ne comprend pas les fonctions (paramètres, utilisation) | Métaphore de la **machine**, deux moments « fabriquer / utiliser », activité débranchée | 08 → 12 |
| ❌ `.length`, accès par index | Le sac à cases numérotées, `length - 1`, boucle sur un tableau | 13, 14, 15 |
| ❌ `Math.max` | `Math.max` / `Math.min` comme « plancher » et « plafond », `Math.max` avec des virgules | 03, 09, 10, 15 |
| ❌ DOM inventé (`document.message(...)`) | La recette **retrouver → changer**, les 3 outils à connaître | 16, 17, 18 |

## 🧭 Les principes du parcours

1. **Une difficulté à la fois.** Chaque exercice vise une notion ; les autres sont déjà écrites.
2. **Lire → corriger → compléter → écrire.** Chaque niveau suit cette progression : prédiction ou chasse aux bugs, puis code à trous, puis production guidée.
3. **Prédire avant d'exécuter** (exercices 04 et 08) : c'est la prédiction ratée qui fait progresser.
4. **Le gabarit d'abord.** Pour tout `if`, `for` ou `function` : recopier le squelette vide de l'[aide-mémoire](./aide-memoire.md), recharger, **puis** remplir. Ça règle une grande partie des fautes de syntaxe.
5. **Un retour immédiat et bienveillant.** L'atelier affiche ✅ / ❌, explique chaque erreur en français et montre la ligne fautive.
6. **Indices progressifs**, jamais la solution : ils sont repliés et s'ouvrent un par un.
7. **Le fil rouge Mini RPG** : l'exercice 18 assemble tout en un vrai bouton de jeu, construit comme `app.js`.

## 🗺️ Le parcours

| N° | Exercice | Type | Durée | Notion |
| --- | --- | --- | --- | --- |
| | **[Niveau 1 – La rigueur](./1-syntaxe.md)** | | | |
| 01 | Chasse aux bugs | 🔍 bugs | 15 min | `( )`, `{ }`, `;`, `===`, fautes de frappe |
| 02 | `if / else if / else` à trous | 🧩 trous | 10 min | structure d'une condition, ordre des tests |
| 03 | Écris ta condition : la potion | ✍️ guidé | 15 min | condition complète, `Math.min` |
| | **[Niveau 2 – Les boucles](./2-boucles.md)** | | | |
| 04 | Prédis les boucles | 🧠 prédiction | 10 min | `<` vs `<=`, nombre de tours |
| 05 | Le monstre frappe 3 fois | 🧩 trous | 10 min | 3 réglages + corps de boucle |
| 06 | Régénération et compte à rebours | ✍️ guidé | 20 min | écrire une boucle seul, `i--` |
| 07 | Les boucles cassées | 🔍 bugs | 15 min | `;` après `for`, borne manquante |
| | **[Niveau 3 – Les fonctions](./3-fonctions.md)** | | | |
| 08 | Démonte la fonction | 🧠 prédiction | 15 min | définition / appel, paramètres, `return` |
| 09 | `infligerDegats` à trous | 🧩 trous | 10 min | paramètres, `return`, `Math.max` |
| 10 | `soigner` à trous | 🧩 trous | 10 min | `Math.min`, appeler une fonction |
| 11 | `estVivant` et `etatDuHeros` | ✍️ guidé | 25 min | écrire une fonction complète |
| 12 | La rafale | ✍️ guidé | 20 min | fonction + boucle + `return` |
| | **[Niveau 4 – Les tableaux](./4-tableaux.md)** | | | |
| 13 | L'inventaire | 🧩 trous | 10 min | `[0]`, `.length`, `length - 1`, `.push()` |
| 14 | Parcourir l'inventaire | 🧩 → ✍️ | 20 min | boucle sur un tableau, `if` dans la boucle |
| 15 | Le plus gros coup | 🧩 → ✍️ | 25 min | fonction qui reçoit un tableau, record, `Math.max` |
| | **[Niveau 5 – La page (DOM)](./5-dom.md)** | | | |
| 16 | Parler à la page | 🧩 → ✍️ | 15 min | `getElementById`, `textContent` |
| 17 | Remplir la liste | 🧩 trous | 15 min | `createElement`, `appendChild` |
| 18 | 🏆 Boss final : le bouton potion | ✍️ guidé | 45 min | tout le parcours + `addEventListener` |

**Durée totale estimée** : 5 h à 6 h, à répartir en **séances de 45 min à 1 h** (environ 1 niveau par séance, le niveau 3 peut en demander 2).

## 🗂️ Contenu du dossier

```text
code-a-trous/
├── README.md               ← ce fichier : proposition, parcours, mode d'emploi
├── aide-memoire.md         ← les gabarits à recopier + checklist avant de recharger
├── 1-syntaxe.md … 5-dom.md ← les fiches de Noah (énoncés, code de départ, indices)
├── atelier/
│   ├── index.html          ← la page d'exercices (à ouvrir avec Live Server)
│   ├── atelier.js          ← outil formateur : affichage, vérifications, erreurs en français
│   ├── style.css
│   └── exercices/
│       └── ex01.js … ex18.js   ← les fichiers que Noah modifie
└── corrections/            ← 🔒 FORMATEUR
    ├── 1-syntaxe.md … 5-dom.md ← corrections commentées + erreurs fréquentes + questions orales
    └── solutions/
        └── ex01.js … ex18.js   ← les corrections exécutables
```

## 🧰 Mode d'emploi pour Noah

1. Dans VS Code, clic droit sur `atelier/index.html` → **Open with Live Server** (comme dans le [tutoriel API](../tutoriels/api/01-introduction.md)).
2. Choisis l'exercice dans la liste en haut de la page.
3. Ouvre la fiche du niveau (`1-syntaxe.md`…) et le fichier `atelier/exercices/exNN.js`.
4. Modifie le fichier → **enregistre** (`Ctrl + S`) → **recharge** la page (`F5`).
5. Lis les résultats :
   - ✅ vert : réussi ;
   - ❌ rouge : la valeur n'est pas la bonne (l'atelier montre ce qui était **attendu** et ce que tu as **obtenu**) ;
   - 💥 erreur : le numéro de ligne, la ligne fautive (👉) et un 💡 conseil.
6. Bloqué ? Ouvre les indices **un par un**. Toujours bloqué après le dernier ? Appelle le formateur.

> Sans Live Server (double-clic sur le fichier), l'atelier fonctionne aussi, mais le navigateur cache le détail des erreurs : il faut alors ouvrir la console (`F12`).

## 👨‍🏫 Mode d'emploi pour le formateur

- **Ne pas donner le dossier `corrections/`** à Noah (ou le retirer de sa copie).
- **Voir une correction tourner** : `atelier/index.html?ex=05&solution=1` (la liste déroulante garde le mode).
- Chaque fiche de correction contient : la **correction commentée**, **ce que Noah verra** quand c'est utile, les **erreurs fréquentes à surveiller**, une **question orale** pour vérifier la compréhension, et des pistes **si ça bloque encore**.
- Toutes les corrections ont été exécutées dans l'atelier : **18 exercices, 88 vérifications ✅**.

### Routine de séance conseillée (45 min)

| Temps | Activité |
| --- | --- |
| 5 min | **Échauffement** : écrire de mémoire, sur papier, le gabarit du jour (`if`, `for` ou `function`) |
| 30 min | Exercices du niveau, en autonomie, formateur en appui |
| 5 min | **Question orale** de la fiche de correction, sur l'exercice le plus difficile du jour |
| 5 min | Noah complète sa grille de suivi (ci-dessous) |

Trois habitudes à installer, plus importantes que la vitesse :

1. **Lire l'erreur à voix haute** (« ligne 24, il dit… ») avant de toucher au code.
2. **Une correction = un rechargement.**
3. **Le gabarit vide d'abord**, rempli ensuite.

### Grille de suivi

Pour chaque exercice, noter : **S** = réussi seul · **I1 / I2 / I3** = réussi avec l'indice n° · **A** = avec l'aide du formateur.

| Ex. | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Résultat | | | | | | | | | | | | | | | | | | |
| Date | | | | | | | | | | | | | | | | | | |

**Règle de passage** : passer au niveau suivant quand l'exercice ✍️ **guidé** du niveau est réussi en **S** ou **I1**. Sinon, le refaire à la séance suivante **en partant d'un fichier vide** (on garde seulement les lignes 🔒 de vérification).

### Après le parcours

- Refaire le **questionnaire de bases** pour mesurer les progrès.
- Reprendre le tutoriel Mini RPG à l'[étape 03 – Fonctions](../tutoriels/03-fonctions-actions.md) et faire les 🏆 Défis des étapes 03 et 05 : ce sont des productions **libres** qui prolongent naturellement le parcours.
