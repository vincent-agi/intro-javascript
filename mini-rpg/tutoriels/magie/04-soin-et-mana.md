# 04 – Soin magique et mana qui remonte

🎯 **À la fin de cette étape** : le Mage connaît ✨ Lumière, un sort qui le **soigne**. Son mana remonte de 5 à chaque tour, de 20 après une victoire, et se remplit après une défaite.

## Le concept

**1. Un sort qui soigne.** Il a un nom, un coût, un effet… comme un `Sort`. Seule la façon de **lancer** change : au lieu de blesser la cible, il soigne le lanceur. On crée une classe enfant qui **redéfinit** uniquement `lancer` :

```javascript
class SortDeSoin extends Sort {
    lancer(lanceur, cible) { /* soigne le lanceur */ }
}
```

Le plus fort : **`Combat` ne change pas**. Il appelle `heros.lancerSort(sort, ...)`, qui appelle `sort.lancer(...)`. Si le sort est un `SortDeSoin`, c'est **sa** version de `lancer` qui s'exécute. C'est ça, le **polymorphisme**.

**2. Le mana remonte.** Le Mage reçoit une méthode `regenererMana`, construite comme `recevoirSoin` : on ajoute, sans dépasser le maximum.

## Le code

**1.** Sous la classe `Sort`, crée `SortDeSoin` :

```javascript
// Un sort de soin : même moule que Sort, mais il soigne le lanceur
class SortDeSoin extends Sort {
    lancer(lanceur, cible) {
        const soin = nombreAuHasard(this.effetMin, this.effetMax);
        lanceur.recevoirSoin(soin);
        return this.emoji + " " + this.nom + " : +" + soin + " PV !";
    }
}
```

Pas de constructeur : `SortDeSoin` utilise celui de `Sort`, dont il hérite.

**2.** Ajoute le sort à la liste du Mage :

```javascript
this.sorts = [
    new Sort("Éclair", "⚡", 10, 12, 18),
    new Sort("Boule de feu", "🔥", 20, 20, 30),
    new SortDeSoin("Lumière", "✨", 15, 25, 35)
];
```

**3.** Ajoute deux méthodes au `Mage` :

```javascript
// Le mana remonte, sans dépasser le maximum
regenererMana(montant) {
    this.mana = Math.min(this.manaMax, this.mana + montant);
}

// Après une défaite : PV et mana au maximum
restaurer() {
    super.restaurer();
    this.mana = this.manaMax;
}
```

`restaurer` existe déjà dans `Personnage` (il remet les PV au maximum). Le Mage la **redéfinit** : `super.restaurer()` fait le travail du parent, puis on ajoute le mana.

**4.** Dans `Combat.riposte`, à la fin du tour, le Mage récupère un peu de mana :

```javascript
riposte() {
    this.sons.jouer("degats");
    this.journal.ajouter(this.monstre.attaquer(this.heros));
    this.heros.regenererMana(5); // fin du tour : le mage récupère un peu de mana
}
```

**5.** Dans `demarrerJeu`, dans `combat.surRetour`, complète le `if` avec un `else` :

```javascript
if (heros.estVaincu()) {
    heros.restaurer();               // PV et mana au maximum
    exploration.replacerAuDepart();
} else {
    heros.regenererMana(20);         // la victoire redonne des forces
}
```

## Vérifier

1. En combat, un troisième bouton ✨ Lumière (15 mana) apparaît.
2. Prends des coups, puis lance Lumière : tes PV remontent de 25 à 35.
3. Lance une Boule de feu (mana `30`), attends la riposte : le mana remonte à `35`.
4. Gagne, retourne sur la carte, et trouve un autre monstre : ton mana a remonté de 20.

> 🆘 Bloqué ? Compare avec le [code complet de l'étape 04](./etapes/etape-04/).

### Ce qu'il faut retenir

- Une classe enfant peut **redéfinir** une méthode du parent : `SortDeSoin.lancer`, `Mage.restaurer`.
- `super.methode()` appelle la version du parent, pour la **compléter** au lieu de la réécrire.
- **Polymorphisme** : `Combat` appelle `lancer` sans savoir de quel sort il s'agit, et chaque sort fait **sa** version.

## 🏆 Défi

Crée un sort `SortDeVol` (🩸 Drain, 15 mana) qui inflige des dégâts **et** soigne le lanceur de la moitié des dégâts. Indice : `Math.round(degats / 2)`, et tu as besoin du `lanceur` **et** de la `cible`.

➡️ Suite : [05 – Choisir son héros](./05-choix-heros.md)
