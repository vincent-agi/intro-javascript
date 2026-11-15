# 03 – Une classe `Journal`

## Le concept

Une classe n'est pas réservée aux personnages. Tout ce qui a des **données** et des **actions** liées peut devenir un objet. Ici :

| Données | Actions |
| --- | --- |
| `historique`, `journal`, `message` | `ajouterEvenement`, `afficherJournal` |

Ces quatre morceaux dépendent les uns des autres : on les regroupe.

On peut aussi **donner des valeurs au constructeur** : l'objet les range dans ses propriétés et les réutilise dans ses méthodes.

## Le code

**1.** Dans la section des classes, sous `Personnage`, ajoute :

```javascript
class Journal {
    constructor(liste, message, taille) {
        this.liste = liste;       // le <ul> de la page
        this.message = message;   // le <p> du message principal
        this.taille = taille;     // nombre d'événements affichés
        this.evenements = [];     // l'historique complet
    }

    ajouter(texte) {
        this.message.textContent = texte;
        this.evenements.push(texte);
        this.afficher();
    }

    afficher() {
        this.liste.innerHTML = "";

        const debut = Math.max(0, this.evenements.length - this.taille);
        for (let i = debut; i < this.evenements.length; i++) {
            const ligne = document.createElement("li");
            ligne.textContent = this.evenements[i];
            this.liste.appendChild(ligne);
        }
    }
}
```

Compare avec l'ancien `afficherJournal` : c'est le même code. `Math.max(0, …)` remplace le `if (debut < 0)`.

**2.** Supprime ces morceaux devenus inutiles :

- `const historique = [];`
- `const message = …` et l'ancien `const journal = …`
- les fonctions `afficherJournal` et `ajouterEvenement`

**3.** Crée **un** objet journal, à la place des variables supprimées :

```javascript
const journal = new Journal(
    document.getElementById("journal"),
    document.getElementById("message"),
    5
);
```

> ⚠️ Une classe n'est utilisable qu'**après** sa définition. Garde bien les classes **en haut** du fichier.

**4.** Remplace chaque `ajouterEvenement(` par `journal.ajouter(` (fais une recherche-remplacement dans ton éditeur).

## Vérifier

Joue quelques tours : le message et le journal fonctionnent comme avant. Dans la console :

```javascript
journal.evenements;  // tout l'historique
journal.taille = 3;  // le journal montrera 3 lignes au prochain événement
```

### Ce qu'il faut retenir

- Le constructeur reçoit des **paramètres** pour configurer l'objet.
- Les méthodes lisent et modifient les propriétés avec `this`.
- Un objet cache ses détails : le reste du code appelle juste `journal.ajouter("…")`.

## 🏆 Défi

Ajoute une méthode `nombreDeTours()` qui renvoie `this.evenements.length`, et affiche-la dans la console.

➡️ Suite : [04 – Héritage : héros et monstre](./04-heritage.md)
