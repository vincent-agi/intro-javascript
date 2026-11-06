# 01 – Introduction : « Devine les Vues Stream »

Bienvenue ! Dans ce tutoriel, tu vas apprendre les bases de **JavaScript** en créant un petit jeu.

## Le jeu

Un streamer vient de finir son live. Combien de personnes l'ont regardé ? Tu dois **deviner le nombre de vues**, entre `0` et `1000`.

À chaque essai, le jeu te répond :

- 📈 « Plus ! » si tu es trop bas ;
- 📉 « Moins ! » si tu es trop haut ;
- 🎉 « Bravo ! » si tu as trouvé.

Tous tes essais s'affichent dans un **historique**.

## Ce que tu vas apprendre

| Étape | Notion |
| --- | --- |
| 02 | Les **variables** et la lecture de ce que tape le joueur |
| 03 | Les **conditions** (`if / else if / else`) et les **fonctions** |
| 04 | Les **tableaux** et les **boucles** (`for`) |
| 05 | Le code final, assemblé |

## Le HTML de départ

HTML = la structure de la page. Il est déjà prêt : tu n'y touches pas.

Crée un dossier `devine-les-vues`, puis un fichier `index.html` avec ce contenu :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Devine les Vues Stream</title>
</head>
<body>
    <h1>Devine les Vues Stream 🎮</h1>
    <p>Combien de personnes ont regardé le live ? (entre 0 et 1000)</p>

    <!-- Le champ où le joueur tape son nombre -->
    <input type="number" id="saisie" min="0" max="1000">
    <!-- Le bouton pour envoyer sa réponse -->
    <button id="valider">Valider</button>

    <!-- Ici, le jeu écrira « Plus », « Moins » ou « Bravo » -->
    <p id="message"></p>

    <!-- Ici, le jeu écrira la liste de tes essais -->
    <h2>Historique</h2>
    <ul id="historique"></ul>

    <!-- On charge le JavaScript en dernier -->
    <script src="app.js"></script>
</body>
</html>
```

Repère bien les `id` (`saisie`, `valider`, `message`, `historique`) : ce sont les **noms** que JavaScript utilisera pour retrouver chaque élément.

Crée aussi un fichier **vide** `app.js` à côté de `index.html`. C'est là que tu écriras tout ton code.

## Vérifier que ça marche

Ouvre `index.html` dans ton navigateur. Tu dois voir le titre, un champ et un bouton. Rien ne se passe encore quand tu cliques : normal, il manque le JavaScript !

## 🏆 Défi

Dans `app.js`, écris cette ligne, enregistre, puis recharge la page :

```javascript
console.log("Le jeu démarre !");
```

Ouvre la console du navigateur (touche `F12`, onglet **Console**). Si tu vois le message, tout est bien relié.

➡️ Suite : [02 – Variables et saisie](./02-variables-et-input.md)
