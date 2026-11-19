# 🔒 Corrections formateur – Niveau 5 : la page (DOM)

> **Objectif du niveau** : remplacer les « fonctions inventées » (`document.message(...)`, relevé au questionnaire) par la recette fiable **retrouver → changer**, puis assembler tout le parcours dans un mini-jeu fonctionnel.

---

## Exercice 16 – Parler à la page

### Correction commentée

```javascript
const zoneMessage = document.getElementById("message");
zoneMessage.textContent = "⚔️ Un slime sauvage apparaît !";

const textePv = document.getElementById("pv-joueur");
textePv.textContent = 75;

let pvHeros = 75;
pvHeros = pvHeros - 20;
textePv.textContent = pvHeros;     // la page affiche 55
```

### Erreurs fréquentes à surveiller

- `document.getElementByID` / `getElementbyId` → 💥 `... is not a function`. Insister sur la casse (et sur l'autocomplétion de VS Code : taper `document.getE` puis `Tab`).
- `zoneMessage.___` remplacé par `zoneMessage.text` ou `.value` → **pas d'erreur**, juste ❌ : JavaScript crée une propriété inutile en silence. Expliquer : « seuls les noms qui existent font quelque chose ».
- `getElementById(pv-joueur)` sans guillemets → 💥 `pv is not defined` (JavaScript lit une soustraction). L'indice 2 en parle.
- `getElementById("#pv-joueur")` (réflexe CSS) → `null` → 💥 `Cannot set properties of null` au moment du `textContent`. Le 💡 de l'atelier pointe vers l'id.
- `textePv = 55;` (oublie `.textContent`) → 💥 `Assignment to constant variable` : il essaie de remplacer l'élément lui-même.

### Question orale de vérification

> « Pourquoi `document.message("Bonjour")` ne marche pas ? » (Parce que `message` n'est pas un outil de `document` ; il faut **retrouver** l'élément par son id puis changer son `textContent`.)

---

## Exercice 17 – Remplir la liste

### Correction commentée

```javascript
const inventaire = ["🧪 Potion", "🗡️ Épée", "🛡️ Bouclier"];
inventaire.push("🔑 Clé");                         // partie 2, AVANT la boucle

const liste = document.getElementById("inventaire");

for (let i = 0; i < inventaire.length; i++) {
    const ligne = document.createElement("li");    // fabrique
    ligne.textContent = inventaire[i];             // remplit
    liste.appendChild(ligne);                      // accroche
}
```

### Erreurs fréquentes à surveiller

- `createElement("<li>")` avec chevrons → 💥 `InvalidCharacterError`.
- Oubli de `appendChild` → la ligne est fabriquée mais jamais visible.
- `liste.appendChild("🧪 Potion")` (accroche un texte au lieu de l'élément) → 💥 `parameter 1 is not of type 'Node'`.
- Partie 2 : `push` placé **après** la boucle → la clé est dans le tableau mais pas sur la page (❌ 3 objets). Excellent pour comprendre que l'ordre d'exécution est **de haut en bas**.

---

## Exercice 18 – Boss final : le bouton potion

### Correction commentée

```javascript
function afficherPv() {
    textePv.textContent = pvHeros;
}

function ajouterEvenement(texte) {
    zoneMessage.textContent = texte;
    historique.push(texte);

    journal.innerHTML = "";                         // on vide avant de tout réafficher
    for (let i = 0; i < historique.length; i++) {
        const ligne = document.createElement("li");
        ligne.textContent = historique[i];
        journal.appendChild(ligne);
    }
}

function boirePotion() {
    if (potions === 0) {
        ajouterEvenement("🎒 Plus de potion !");
    } else if (pvHeros === PV_MAX) {
        ajouterEvenement("❤️ Inutile, tu es en pleine forme");
    } else {
        pvHeros = Math.min(PV_MAX, pvHeros + 30);
        potions = potions - 1;
        ajouterEvenement("🧪 Glou glou ! Il reste " + potions + " potion(s)");
    }
    afficherPv();                                   // dans tous les cas
}

// sans parenthèses : on DONNE la fonction au bouton
boutonPotion.addEventListener("click", boirePotion);
```

C'est la même architecture que `app.js` du Mini RPG (`afficherVie`, `ajouterEvenement`, `afficherJournal`, `addEventListener`) : le lui faire remarquer à la fin.

### Ce que testent les vérifications automatiques

Le « robot » clique 5 fois : 40 → **70** (2 potions) → **100** (1) → « Inutile » (toujours 1) → le robot met `pvHeros = 50` → **80** (0) → « Plus de potion ». Il contrôle les PV, le texte de la page, le message, les potions et les **5 lignes** du journal, puis remet tout à zéro.

### Erreurs fréquentes à surveiller

- **`addEventListener("click", boirePotion())`** → la fonction s'exécute une fois au chargement, puis le bouton ne fait plus rien (💥 ou ❌ selon le cas). Il **connaît** ce point (acquis au questionnaire) : lui faire réexpliquer.
- `potions = potions - 1` placé **après** `ajouterEvenement(...)` → le message annonce « Il reste 3 potion(s) » au 1er clic → ❌ sur le message. L'ordre des lignes compte.
- `afficherPv()` seulement dans le `else` → pas d'impact visible ici, mais à signaler (règle « dans tous les cas »).
- Journal en double (oubli de `journal.innerHTML = ""`) → ❌ « 5 lignes » (obtenu 15). Indice 4.
- Il recopie `ajouterEvenement` **dans** `boirePotion` au lieu de l'**appeler** : signe que l'idée « une fonction en utilise une autre » n'est pas acquise → revenir à l'exercice 08.

### Grille d'évaluation de l'exercice 18 (bilan du parcours)

| Compétence | Indicateur observable | Acquis / En cours / Non acquis |
| --- | --- | --- |
| Rigueur syntaxique | Corrige seul les 💥 en lisant ligne + message | |
| Conditions | `if / else if / else` correct, `===` | |
| Boucles | Boucle sur `historique.length` avec `<` | |
| Fonctions | 3 fonctions écrites, paramètre `texte` utilisé, appels entre fonctions | |
| Tableaux | `push` + accès `historique[i]` | |
| DOM | `textContent`, `createElement`, `appendChild`, `addEventListener` sans `()` | |
