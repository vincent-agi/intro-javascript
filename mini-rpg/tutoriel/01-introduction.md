# 01 – Introduction : le Mini RPG

Bienvenue ! Dans ce tutoriel, tu vas apprendre les bases de **JavaScript** en créant un petit jeu de combat **au tour par tour**.

## Le jeu

Ton héros affronte un monstre. À chaque tour, tu choisis une action, puis le monstre réplique.

### Les règles du combat

- Le héros commence avec **100 PV** (points de vie), le monstre avec **80 PV**.
- ⚔️ **Attaquer** : tu enlèves entre `10` et `20` PV au monstre.
- 💚 **Se soigner** : tu récupères `15` PV (sans dépasser `100`).
- Après ton action, le monstre **riposte** automatiquement : il t'enlève entre `5` et `15` PV.
- Celui qui tombe à `0` PV a perdu. Le combat s'arrête alors.
- Les derniers événements s'affichent dans un **journal de combat**.

## Ce que tu vas apprendre

| Étape | Notion |
| --- | --- |
| 02 | Les **variables** : stocker les PV et l'état du jeu |
| 03 | Les **fonctions** : attaquer, se soigner, riposter |
| 04 | Les **conditions** (`if / else`) : victoire, défaite, blocage |
| 05 | Les **tableaux** et les **boucles** `for` : le journal |

## Le HTML de départ

HTML = la structure de la page. Il est déjà prêt.

Crée un dossier `mini-rpg`, puis un fichier `index.html` :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mini RPG</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Mini RPG ⚔️</h1>

    <!-- Le héros -->
    <section>
        <h2>🧙 Héros : <span id="pv-joueur">100</span> PV</h2>
        <div class="barre"><div id="barre-joueur" class="vie"></div></div>
    </section>

    <!-- Le monstre -->
    <section>
        <h2>👹 Monstre : <span id="pv-monstre">80</span> PV</h2>
        <div class="barre"><div id="barre-monstre" class="vie"></div></div>
    </section>

    <!-- Les boutons d'action -->
    <div class="actions">
        <button id="btn-attaque">⚔️ Attaquer</button>
        <button id="btn-soin">💚 Se soigner</button>
    </div>

    <!-- Message principal et journal de combat -->
    <p id="message">Le combat commence !</p>
    <h3>Journal de combat</h3>
    <ul id="journal"></ul>

    <script src="app.js"></script>
</body>
</html>
```

## Le CSS de départ

CSS = l'apparence. Crée un fichier `style.css` :

```css
body {
    font-family: sans-serif;
    max-width: 420px;
    margin: 30px auto;
    text-align: center;
}

/* Le cadre gris de la barre de vie */
.barre {
    height: 20px;
    background: #ddd;
    border-radius: 10px;
    overflow: hidden;
}

/* La partie verte : sa largeur change selon les PV */
.vie {
    height: 100%;
    width: 100%;
    background: #4caf50;
    transition: width 0.3s;
}

.actions {
    margin: 20px 0;
}

button {
    font-size: 16px;
    padding: 10px 16px;
    margin: 0 5px;
    cursor: pointer;
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.4;
}

#journal {
    text-align: left;
}
```

Repère les `id` (`pv-joueur`, `barre-monstre`, `btn-attaque`…) : ce sont les noms que JavaScript utilisera pour retrouver chaque élément.

Crée aussi un fichier **vide** `app.js` à côté.

## Vérifier que ça marche

Ouvre `index.html` dans ton navigateur : tu dois voir deux barres vertes pleines et deux boutons. Rien ne se passe au clic, c'est normal !

## 🏆 Défi

Dans `style.css`, change la couleur de `.vie` (par exemple `#e53935` pour du rouge). Recharge la page pour voir le résultat, puis remets le vert.

➡️ Suite : [02 – Variables et état](./02-variables-et-etat.md)
