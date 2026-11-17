# 02 – Changer les règles

Les règles, ce sont les **chiffres** et les **conditions** de ton jeu : combien de PV, combien de dégâts, quand on gagne, ce qu'on gagne. Changer une règle, c'est souvent changer **très peu de code** pour un **grand effet** sur le jeu.

## 🧠 Réfléchis d'abord

- Ton jeu est-il **trop facile** ou **trop dur** ? Qu'est-ce qui le rend ainsi ?
- Qu'est-ce qui donne envie de faire **un combat de plus** ?
- Après une victoire, le héros ne gagne **rien**. Est-ce normal dans un RPG ?

## Exemple guidé : l'expérience et les niveaux

**L'idée.** Chaque victoire rapporte de l'**expérience** (XP). Quand le héros en a assez, il **monte de niveau** : plus de PV, plus de dégâts, et ses PV remontent au maximum.

**Découper.**

1. le héros a un niveau et de l'expérience → `Heros` ;
2. il sait gagner de l'expérience et monter de niveau → une méthode dans `Heros` ;
3. la victoire donne de l'expérience → `Combat.verifierFin`.

**1.** Dans le constructeur de `Heros`, sous `super(...)`, ajoute :

```javascript
this.niveau = 1;
this.experience = 0;
```

**2.** Ajoute cette méthode à `Heros` :

```javascript
// Gagne de l'expérience. Renvoie un message si le héros monte de niveau, sinon "".
gagnerExperience(points) {
    this.experience += points;
    if (this.experience < this.niveau * 30) return ""; // pas encore assez

    this.experience = 0;
    this.niveau++;
    this.pvMax += 10;
    this.pv = this.pvMax;   // un niveau gagné, ça requinque !
    this.degatsMin += 2;
    this.degatsMax += 2;
    return "⭐ Niveau " + this.niveau + " ! PV max : " + this.pvMax;
}
```

`this.niveau * 30` : il faut 30 XP pour passer niveau 2, 60 pour le niveau 3… De plus en plus long, comme dans les vrais RPG.

**3.** Dans `Combat.verifierFin`, dans la branche de la victoire, sous le message « Victoire » :

```javascript
const points = Math.round(this.monstre.pvMax / 2); // plus le monstre est costaud, plus il rapporte
this.journal.ajouter("✨ +" + points + " XP");
const message = this.heros.gagnerExperience(points);
if (message !== "") {
    this.journal.ajouter(message);
}
```

**Tester.** Gagne quelques combats : le journal affiche les XP gagnés, puis « ⭐ Niveau 2 ! PV max : 110 ». Au combat suivant, la barre de vie compte 110 PV.

> 🐛 Ça ne marche pas ? Ouvre la console (`F12`). `gagnerExperience is not a function` : la méthode n'est pas dans la bonne classe, ou elle est mal écrite.

## ⌨️ À toi de jouer

Choisis **une** idée, découpe-la, code-la, teste-la. Puis note-la dans ton carnet de bord.

| Idée | Difficulté | 🔍 Où regarder | 💡 Indice |
| --- | --- | --- | --- |
| Afficher le niveau à côté du nom du héros | ⭐ | `index.html`, `Combat.afficherVie` | un `<span id="niveau">` et un `textContent` |
| Coup critique : 1 chance sur 10 de faire double dégâts | ⭐ | `Personnage.attaquer` | `Math.random() < 0.1` |
| Le soin ne marche que 3 fois par combat | ⭐⭐ | `Combat` (`demarrer` et `soigner`) | un compteur remis à 3 au début de chaque combat |
| Fuir le combat (1 chance sur 2 de réussir) | ⭐⭐ | `index.html`, `Combat` | un bouton 🏃 ; en cas de réussite, appelle `this.surRetour()` |
| Les monstres frappent plus fort quand le héros monte de niveau | ⭐⭐ | `demarrerJeu` (`surRencontre`) | multiplie `monstre.degatsMax` par le niveau du héros |
| De l'or : chaque victoire rapporte des pièces 🪙 | ⭐⭐ | `Heros`, `Combat.verifierFin` | même principe que l'expérience |
| Le héros perd la moitié de son or quand il est vaincu | ⭐⭐⭐ | `demarrerJeu` (`surRetour`) | `Math.floor(heros.or / 2)` |

## ✅ Avant de passer à la suite

- [ ] Mon jeu marche encore du début à la fin (exploration, combat, retour).
- [ ] La console (`F12`) n'affiche pas d'erreur rouge.
- [ ] J'ai noté ce que j'ai fait dans mon carnet de bord.

➡️ Suite : [03 – Ajouter des personnages](./03-personnages.md)
