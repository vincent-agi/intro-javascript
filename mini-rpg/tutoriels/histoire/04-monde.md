# 04 – Faire évoluer le monde

Ta carte est petite et partout pareille : de l'herbe où l'on rencontre n'importe quel Pokémon. Un monde intéressant a des **zones** différentes, avec leurs dangers et leurs habitants.

## 🧠 Réfléchis d'abord

- Dessine sur papier le monde de ton histoire. Quelles **zones** ? (village, forêt, marais, grotte…)
- Qu'est-ce qui rend chaque zone **différente** ? Les monstres ? La fréquence des rencontres ? La musique ?
- Aujourd'hui, la règle « 1 chance sur 4 dans l'herbe » est écrite **dans le code**. Ne serait-elle pas mieux **dans `map.json`** ?

## Exemple guidé : une forêt sombre, plus dangereuse

**L'idée.** Une nouvelle zone, la **forêt sombre**. On y rencontre un monstre **une fois sur deux**, et ce sont les Pokémon les plus forts (numéros 120 à 151).

**Découper.**

1. une tuile « forêt » → `map.json` et `carte.css` ;
2. la chance de rencontre de chaque zone devient une **donnée** → `map.json` et `Exploration` ;
3. la rencontre dit **où** elle a lieu, et on choisit le monstre selon la zone → `chargerMonstreAleatoire` et `demarrerJeu`.

**1.** Dans `map.json`, ajoute la tuile `F` à la légende, une rubrique `rencontres`, et dessine une forêt sur la carte :

```json
"legende": {
    "#": "arbre",
    "~": "eau",
    ".": "chemin",
    "H": "herbe",
    "F": "foret"
},
"rencontres": {
    "herbe": 0.25,
    "foret": 0.5
},
```

```json
"#FFF...HH..#",
```

(Cette ligne remplace la 6e ligne de la carte, `"#......HH..#"`.)

**2.** Dans `carte.css` :

```css
.tile-foret { background: #2f7d32; }
```

**3.** Dans le constructeur de `Carte`, retiens les chances de rencontre :

```javascript
this.rencontres = donnees.rencontres;
```

**4.** Dans `Exploration.deplacer`, **remplace** le bloc de la rencontre dans l'herbe par une version qui lit `map.json` :

```javascript
// Chaque type de tuile a sa chance de rencontre (voir map.json)
const type = this.carte.typeEn(x, y);
const chance = this.carte.rencontres[type];
if (chance !== undefined && Math.random() < chance) {
    this.sons.jouer("rencontre");
    this.surRencontre(type); // on dit où a lieu la rencontre
}
```

Pour une case de chemin, `rencontres["chemin"]` n'existe pas : `chance` vaut `undefined`, donc aucune rencontre.

**5.** `chargerMonstreAleatoire` choisit toujours entre 1 et 151. Donne-lui des paramètres (avec des valeurs par défaut, pour que l'herbe ne change pas) :

```javascript
async function chargerMonstreAleatoire(idMin = 1, idMax = 151) {
    try {
        return await Monstre.depuisApi(nombreAuHasard(idMin, idMax));
    } catch (erreur) {
        // ... le plan B, inchangé
```

**6.** Dans `demarrerJeu`, la rencontre reçoit le type de zone. Modifie le début de `surRencontre` :

```javascript
exploration.surRencontre = async (type) => {
    exploration.actif = false;
    ecranCarte.classList.add("rencontre");

    // Dans la forêt, les monstres sont plus forts
    let monstre;
    if (type === "foret") {
        monstre = await chargerMonstreAleatoire(120, 151);
    } else {
        monstre = await chargerMonstreAleatoire();
    }
    // ... la suite est inchangée (attendre, combat.demarrer...)
```

**Tester.** Une bande vert foncé apparaît à gauche de la carte. Marche dedans : les rencontres sont bien plus fréquentes, et les monstres plus coriaces. Dans l'herbe, rien n'a changé.

## ⌨️ À toi de jouer

| Idée | Difficulté | 🔍 Où regarder | 💡 Indice |
| --- | --- | --- | --- |
| Rendre les rencontres plus rares dans l'herbe | ⭐ | `map.json` | une seule valeur à changer, **aucun** code |
| Une plage où l'on ne croise que des Pokémon d'eau | ⭐⭐ | `map.json`, `demarrerJeu` | un tableau de numéros (`[7, 54, 60, 72, 79, 86, 90, 98, 116, 118, 120, 129]`), et un tirage au hasard dans ce tableau |
| Une carte plus grande | ⭐ | `map.json` | toutes les lignes doivent avoir la **même longueur** |
| Une musique différente dans la forêt | ⭐⭐ | `FICHIERS_SONS`, `demarrerJeu` | une sonnette `surPas(type)`, et `sons.jouerMusique(...)` selon la zone |
| Le jour et la nuit : la carte s'assombrit tous les 30 pas | ⭐⭐ | `Exploration`, `carte.css` | un compteur de pas, et `classList.toggle("nuit")` avec un `filter: brightness(0.5)` |
| Une porte vers une deuxième carte (`map2.json`) | ⭐⭐⭐ | `map.json`, `Exploration`, `demarrerJeu` | une tuile `porte` ; quand on marche dessus, on charge l'autre fichier et on recrée `Carte` et `Exploration` |
| Des potions à ramasser sur la carte | ⭐⭐⭐ | `Carte`, `Exploration` | une méthode `Carte.changerTuile(x, y, type)` qui remplace la potion par du chemin, et redessine |

## ✅ Avant de passer à la suite

- [ ] Mon jeu marche encore du début à la fin.
- [ ] Le héros ne peut pas sortir de la carte, même dans les nouvelles zones.
- [ ] J'ai dessiné mon monde dans `MON-HISTOIRE.md` (même en texte, avec des `#`, `.` et `H` !).

➡️ Suite : [05 – Ajouter des images et des sons](./05-assets.md)
