# 05 – Le bouton muet

🎯 **À la fin de cette étape** : un bouton 🔊 en haut à droite coupe et remet tout le son. Le jeu **se souvient** de ton choix, même après avoir fermé la page.

## Le concept

**1. Couper sans arrêter.** Un objet `Audio` a une propriété `muted`. Avec `muted = true`, il continue de jouer, mais en silence. Quand on remet le son, la musique reprend **au bon endroit**, sans redémarrer.

**2. Se souvenir.** `localStorage` est une petite mémoire du navigateur, propre à ton site, qui ne s'efface pas quand on ferme la page. Essaie dans la console :

```javascript
localStorage.setItem("muet", "oui");   // écrit
localStorage.getItem("muet");          // lit : "oui"
localStorage.getItem("inconnu");       // null : jamais écrit
```

Recharge la page et retape `localStorage.getItem("muet")` : la valeur est toujours là.

## Le code

**1.** Dans `index.html`, juste sous le `<h1>`, ajoute le bouton :

```html
<!-- Bouton son (et message d'état) -->
<button id="btn-son" title="Couper / remettre le son">🔊</button>
```

Et dans `carte.css` :

```css
/* Bouton son, en haut à droite */
#btn-son {
    position: fixed;
    top: 10px;
    right: 10px;
}
```

**2.** Dans le constructeur de `Sons`, **lis** le choix mémorisé, sous `this.nomMusique = null;` :

```javascript
this.muet = localStorage.getItem("muet") === "oui"; // choix retenu
```

`=== "oui"` vaut `true` ou `false` : la première fois, `getItem` renvoie `null`, donc le son est actif.

Dans la boucle du constructeur, applique ce choix à chaque son :

```javascript
for (const nom in fichiers) {
    this.audios[nom] = new Audio(fichiers[nom]);
    this.audios[nom].muted = this.muet;          // ajouté
}
```

**3.** Dans `jouer`, applique-le aussi à la **copie** :

```javascript
const copie = audio.cloneNode();
copie.volume = volume;
copie.muted = this.muet;                         // ajouté
copie.play().catch(() => {});
```

**4.** Ajoute la méthode qui **bascule** (son → muet → son…) et **retient** le choix :

```javascript
// Coupe ou remet tous les sons, et retient le choix
basculerMuet() {
    this.muet = !this.muet;
    localStorage.setItem("muet", this.muet ? "oui" : "non");

    for (const nom in this.audios) {
        this.audios[nom].muted = this.muet;
    }
}
```

- `!this.muet` inverse : `true` devient `false`, et l'inverse ;
- `condition ? a : b` choisit `a` si la condition est vraie, sinon `b`.

**5.** Dans `demarrerJeu`, récupère le bouton en haut de la fonction :

```javascript
const boutonSon = document.getElementById("btn-son");
```

Puis, juste avant `// Fin du combat` :

```javascript
// Bouton muet : l'icône suit l'état des sons
boutonSon.textContent = sons.muet ? "🔇" : "🔊";
boutonSon.addEventListener("click", () => {
    sons.basculerMuet();
    boutonSon.textContent = sons.muet ? "🔇" : "🔊";
});
```

La page **demande** à l'objet `sons` de basculer, puis **affiche** son état. Elle ne touche jamais aux objets `Audio` elle-même.

## Vérifier

1. Joue un peu, puis clique sur 🔊 : tout devient silencieux et le bouton affiche 🔇. La musique continue en silence.
2. Reclique : le son revient, la musique reprend là où elle en était.
3. Coupe le son et **recharge la page** : le bouton affiche toujours 🔇, le choix est retenu.
4. Pour repartir de zéro : `F12` → *Application* → *Local Storage* → supprime `muet`.

> 🆘 Bloqué ? Compare avec le [code complet de l'étape 05](./etapes/etape-05/).

### Ce qu'il faut retenir

- `muted` coupe un son sans l'arrêter.
- `localStorage.setItem` / `getItem` : une mémoire qui survit à la fermeture de la page. Elle ne stocke que du **texte**.
- L'état « muet » vit **dans** l'objet `sons` : c'est lui qui sait, les autres demandent.

## 🏆 Défi

Appuyer sur la touche `m` doit aussi couper ou remettre le son. Indice : un `addEventListener("keydown", ...)` qui teste `evenement.key === "m"`, et qui fait la même chose que le clic.

➡️ Suite : [06 – Sons manquants et code final](./06-sons-manquants-code-final.md)
