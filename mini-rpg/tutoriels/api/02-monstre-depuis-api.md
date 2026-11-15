# 02 – Gengar depuis l'API

## Le concept

On va fabriquer un `Monstre` **à partir de la fiche JSON** de PokeAPI. Pour cela :

- une fonction `async` réutilisable, `chargerJson`, qui gère le `fetch` ;
- une méthode `static` sur `Monstre` qui renvoie un nouveau monstre.

Une méthode **`static`** appartient à la **classe**, pas à un objet : on l'appelle avec `Monstre.depuisApi(...)`, **sans** `new`. C'est l'idéal pour une « usine à objets » (*factory*).

## Le code

**1.** Dans `index.html`, donne un nom et une image au monstre. Remplace la section du monstre :

```html
<section>
    <img id="sprite-monstre" alt="">
    <h2>👹 <span id="nom-monstre">Monstre</span> : <span id="pv-monstre">80</span> PV</h2>
    <div class="barre"><div id="barre-monstre" class="vie"></div></div>
</section>
```

**2.** Crée un fichier `carte.css` (il grossira plus tard) et relie-le dans le `<head>` avec `<link rel="stylesheet" href="carte.css">` :

```css
#sprite-monstre {
    width: 96px;
    height: 96px;
    image-rendering: pixelated;
}
```

**3.** Dans `app.js`, ajoute **avant** les classes cette fonction :

```javascript
// Charge une adresse et renvoie son contenu JSON
async function chargerJson(url) {
    const reponse = await fetch(url);
    if (!reponse.ok) {  // 404, 500... : fetch ne plante pas tout seul !
        throw new Error("Erreur " + reponse.status + " pour " + url);
    }
    return reponse.json();
}
```

> `fetch` ne signale **pas** une erreur 404 : c'est à toi de tester `reponse.ok`. `throw new Error(...)` déclenche une erreur que l'on pourra rattraper (étape 03).

**4.** Remplace la classe `Monstre` :

```javascript
// Un monstre, fabriqué à la main ou à partir des données de PokeAPI
class Monstre extends Personnage {
    constructor(nom, pvMax, degatsMin, degatsMax, sprite = "") {
        super(nom, pvMax, degatsMin, degatsMax);
        this.sprite = sprite; // adresse de l'image
    }

    static async depuisApi(idOuNom) {
        const donnees = await chargerJson("https://pokeapi.co/api/v2/pokemon/" + idOuNom);

        // Cherche dans le tableau "stats" la statistique de ce nom
        const stat = (nom) => donnees.stats.find((s) => s.stat.name === nom).base_stat;
        const attaque = stat("attack");
        const nom = donnees.name[0].toUpperCase() + donnees.name.slice(1); // "gengar" -> "Gengar"

        return new Monstre(
            nom,
            stat("hp"),                              // PV
            Math.max(1, Math.round(attaque / 10)),   // dégâts mini
            Math.max(1, Math.round(attaque / 5)),    // dégâts maxi
            donnees.sprites.front_default            // image
        );
    }

    attaquer(cible) {
        const degats = super.attaquer(cible);
        return "👹 " + this.nom + " riposte : -" + degats + " PV !";
    }
}
```

Quelques points :

- `.find(...)` renvoie le premier élément du tableau qui répond `true` à la fonction ;
- `(s) => s.stat.name === nom` est une **fonction fléchée** : une fonction courte, sans nom ;
- les dégâts viennent de la stat `attack` (Gengar : 65, donc 7 à 13 de dégâts), les PV de la stat `hp` (60) ;
- `sprite = ""` : valeur par défaut si on ne donne pas d'image.

**5.** Dans la classe `Combat`, affiche le nom et l'image. Dans le constructeur, ajoute avec les autres éléments :

```javascript
this.nomMonstre = document.getElementById("nom-monstre");
this.spriteMonstre = document.getElementById("sprite-monstre");
```

Ajoute la méthode :

```javascript
afficherMonstre() {
    this.nomMonstre.textContent = this.monstre.nom;
    this.spriteMonstre.src = this.monstre.sprite;
    this.spriteMonstre.alt = this.monstre.nom;
}
```

Appelle-la à la fin du constructeur, **juste avant** `this.afficherVie();`. Et dans `verifierFin`, remplace « Le monstre » par le vrai nom :

```javascript
this.journal.ajouter("🎉 Victoire ! " + this.monstre.nom + " est vaincu !");
```

**6.** Remplace le démarrage, en bas du fichier :

```javascript
async function demarrer() {
    const monstre = await Monstre.depuisApi("gengar");
    new Combat(new Heros("Héros"), monstre, journal);
}

demarrer();
```

Les trois lignes clés : on **attend** (`await`) le monstre, puis on lance le combat avec.

## Vérifier

Recharge la page : Gengar apparaît avec son image, ses `60` PV, et se bat comme les autres. Ouvre l'onglet **Réseau** (`F12` → *Network*) : tu vois la requête vers `pokeapi.co`.

### Ce qu'il faut retenir

- `await fetch(url)` puis `await reponse.json()` : deux attentes.
- Les données d'une API sont **adaptées** à ton jeu (ici : stats → PV et dégâts).
- `static` : une méthode de classe, appelée sans créer d'objet.
- `async function` : seule une fonction `async` peut utiliser `await`.

## 🏆 Défi

Dans `demarrer`, remplace `"gengar"` par `"pikachu"`, puis par `150` (Mewtwo). Qui est le plus dur à battre ?

➡️ Suite : [03 – Monstre aléatoire et gestion d'erreurs](./03-monstre-aleatoire.md)
