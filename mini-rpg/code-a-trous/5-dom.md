# Niveau 5 – Parler à la page (le DOM)

## Le concept : la recette en 2 temps

Pour changer quelque chose sur la page, on fait **toujours** pareil :

```javascript
// 1. RETROUVER l'élément grâce à son id (écrit dans le HTML)
const zoneMessage = document.getElementById("message");

// 2. CHANGER son texte
zoneMessage.textContent = "⚔️ Un slime sauvage apparaît !";
```

⚠️ On ne peut **pas** inventer : `document.message(...)` ou `document.afficher(...)` n'existent pas. `document` ne connaît que ses propres outils. Les 3 à connaître :

| Outil | Rôle | Exemple |
| --- | --- | --- |
| `document.getElementById("id")` | **retrouver** un élément par son `id` | `document.getElementById("pv-joueur")` |
| `element.textContent = ...` | **changer** le texte d'un élément | `textePv.textContent = 55;` |
| `document.createElement("li")` + `liste.appendChild(ligne)` | **fabriquer** un élément, puis l'**accrocher** à la page | voir exercice 17 |

Dans l'atelier, ces exercices ont une **scène** (le cadre vert en haut de la page). Son HTML est dans `atelier/index.html` :

```html
<h2>🧙 Héros : <span id="pv-joueur">100</span> PV</h2>
<p id="message">Le héros attend tes ordres...</p>
<button id="btn-potion">🧪 Boire une potion</button>
<ul id="inventaire"></ul>
<ul id="journal"></ul>
```

---

## Exercice 16 – Parler à la page 📣

⏱️ 15 min · 🧩 Trous puis ✍️ production · Fichier : `atelier/exercices/ex16.js`

### 🎯 Énoncé

Complète les **4 trous**, puis écris l'étape 5 toi-même.

```javascript
// 1. Retrouve le paragraphe du message
const zoneMessage = document.___("message");

// 2. Change son texte
zoneMessage.___ = "⚔️ Un slime sauvage apparaît !";

// 3. Retrouve le texte des PV (son id : pv-joueur)
const textePv = document.getElementById(___);

// 4. Affiche 75 dans le texte des PV
textePv.textContent = ___;

// 5. ✏️ À toi, sans trou : le héros prend 20 dégâts.
//    - crée une variable pvHeros qui vaut 75
//    - enlève-lui 20
//    - affiche la nouvelle valeur dans textePv
```

### ✅ C'est réussi quand…

Les 2 vérifications sont vertes **et** tu vois le message et `55` PV dans le cadre vert.

### 🆘 Indices

<details>
<summary>Indice 1 – Les trous 1 et 2</summary>

Relis la recette en 2 temps, tout en haut de la fiche : les deux mots y sont. Attention aux majuscules : `getElementById` (le `d` de `Id` est minuscule).
</details>

<details>
<summary>Indice 2 – Le trou 3 : guillemets ou pas ?</summary>

Un `id` est un **texte** : il faut des guillemets. Sans guillemets, JavaScript croit que `pv-joueur` est un calcul (`pv` moins `joueur`) !
</details>

<details>
<summary>Indice 3 – L'étape 5</summary>

Trois lignes : `let pvHeros = 75;`, puis enlever 20 (même forme que dans les niveaux précédents), puis `textePv.textContent = pvHeros;`.
</details>

---

## Exercice 17 – Remplir la liste 📋

⏱️ 15 min · 🧩 Code à trous · Fichier : `atelier/exercices/ex17.js`

### 🎯 Énoncé

Affiche l'inventaire **dans la page** (et plus dans les résultats). Pour chaque objet : on **fabrique** une ligne `<li>`, on **met** le nom dedans, on l'**accroche** à la liste `<ul id="inventaire">`.

**Partie 1 (3 trous)**

```javascript
const inventaire = ["🧪 Potion", "🗡️ Épée", "🛡️ Bouclier"];
const liste = document.getElementById("inventaire");

for (let i = 0; i < inventaire.length; i++) {
    const ligne = document.___("li");      // 1. fabrique une ligne vide
    ligne.textContent = inventaire[___];   // 2. met le nom de l'objet dedans
    liste.___(ligne);                      // 3. accroche la ligne à la liste
}
```

**Partie 2** : à l'endroit indiqué dans le fichier (**avant** la boucle), ajoute `"🔑 Clé"` au tableau avec `push`. Recharge : la clé apparaît sur la page, **sans toucher à la boucle**. C'est toute la force de `.length` !

### ✅ C'est réussi quand…

Les 2 vérifications sont vertes et le cadre vert affiche 4 objets.

### 🆘 Indices

<details>
<summary>Indice 1 – Les deux outils</summary>

Les deux noms sont dans le tableau « Les 3 à connaître », en haut de la fiche : un pour **fabriquer** (`create...`), un pour **accrocher** (`append...`).
</details>

<details>
<summary>Indice 2 – Le trou du milieu</summary>

À chaque tour, on veut l'objet de la case n°… ? C'est la variable de la boucle.
</details>

---

## Exercice 18 – Boss final : le bouton potion 🏆

⏱️ 45 min · ✍️ Production guidée · Fichier : `atelier/exercices/ex18.js`

### 🎯 Énoncé

Tout ce que tu as appris, réuni dans **un vrai morceau de jeu** : un bouton qui fait boire une potion au héros, met à jour la page et remplit un journal.

L'état du jeu et les éléments de la page sont **déjà prêts** dans le fichier. Tu écris **4 morceaux**, dans l'ordre. Après **chaque** étape : enregistre, recharge, vérifie qu'il n'y a pas de 💥.

**Étape A – `afficherPv()`** : écrit la valeur de `pvHeros` dans `textePv`.
*(Fonction sans paramètre, une seule ligne dedans.)*

**Étape B – `ajouterEvenement(texte)`** :

1. écrit `texte` dans `zoneMessage` ;
2. ajoute `texte` à la fin du tableau `historique` ;
3. vide le journal : `journal.innerHTML = "";` ;
4. avec une boucle `for`, crée un `<li>` pour **chaque** case de `historique` et accroche-le à `journal` (comme l'exercice 17).

**Étape C – `boirePotion()`** :

- s'il n'y a plus de potion → `ajouterEvenement("🎒 Plus de potion !")` ;
- sinon, si `pvHeros` vaut `PV_MAX` → `ajouterEvenement("❤️ Inutile, tu es en pleine forme")` ;
- sinon : `pvHeros` augmente de 30 sans dépasser `PV_MAX`, `potions` baisse de 1, puis `ajouterEvenement("🧪 Glou glou ! Il reste " + potions + " potion(s)")` ;
- à la fin, dans **tous** les cas : `afficherPv();`.

**Étape D – le bouton** : quand on clique sur `boutonPotion`, on lance `boirePotion`.

### ✅ C'est réussi quand…

1. Les 8 vérifications sont vertes. *(Un robot clique 5 fois à ta place pour vérifier, puis remet le jeu à zéro.)*
2. Tu cliques toi-même sur 🧪 : 40 → 70 → 100 → « Inutile »… et le journal se remplit.

### 🆘 Indices

<details>
<summary>Indice 1 – Tu ne sais pas par où commencer ?</summary>

Tu as **déjà écrit** chaque morceau :

- étape A → exercice 16 (`textContent`) ;
- étape B → exercices 13 (`push`) et 17 (la boucle `<li>`) ;
- étape C → exercice 03 (la potion), mais dans une fonction ;
- étape D → le Mini RPG : `boutonAttaque.addEventListener("click", attaquer);`.

Ouvre ces fichiers et inspire-toi.
</details>

<details>
<summary>Indice 2 – « afficherPv is not defined »</summary>

Normal tant que l'étape A n'est pas écrite : la ligne `afficherPv();` du démarrage l'utilise. Écris la fonction et l'erreur disparaît.
</details>

<details>
<summary>Indice 3 – L'étape D</summary>

```javascript
boutonPotion.addEventListener("click", boirePotion);
```

**Sans** parenthèses après `boirePotion` : on **donne** la machine au bouton, il la lancera lui-même au moment du clic. Avec `boirePotion()`, elle serait lancée tout de suite, une seule fois.
</details>

<details>
<summary>Indice 4 – Le journal affiche des lignes en double</summary>

Tu as oublié de vider le journal (`journal.innerHTML = "";`) **avant** la boucle : chaque clic réaffiche tout l'historique en dessous de l'ancien.
</details>

---

## 🎉 Bravo !

Si tu es arrivé ici, tu as écrit tout seul des conditions, des boucles, des fonctions avec paramètres et `return`, manipulé des tableaux et modifié une page web. Ce sont **exactement** les briques du Mini RPG.

➡️ Prochaine étape : rouvre le [tutoriel Mini RPG](../tutoriels/01-introduction.md) et relis `app.js`. Tu vas y reconnaître chaque morceau. Puis tente les 🏆 **Défis** des étapes 03 et 05.
