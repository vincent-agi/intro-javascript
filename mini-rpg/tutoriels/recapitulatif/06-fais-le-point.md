# 06 – Fais le point

Dernière fiche : à toi de mesurer ce que tu sais faire. Pas de note, pas de piège : c'est **pour toi**. Coche honnêtement, et pour chaque case vide, le lien te ramène à l'étape où tu l'as pratiqué.

## ✅ Je sais…

### Les bases

- [ ] créer une variable avec `let` ou `const`, et choisir lequel ([Bases 02](../02-variables-et-etat.md))
- [ ] écrire une fonction avec des paramètres et un `return` ([Bases 03](../03-fonctions-actions.md))
- [ ] écrire une condition avec `if` / `else if` / `else` et `&&`, `||` ([Bases 04](../04-conditions-et-fin.md))
- [ ] remplir un tableau et le parcourir avec une boucle ([Bases 05](../05-tableau-historique-boucle.md))
- [ ] modifier la page : texte, style, classes, créer et retirer des éléments ([Bases 05](../05-tableau-historique-boucle.md))
- [ ] réagir à un clic ou à une touche avec `addEventListener` ([API 05](../api/05-deplacement-collisions.md))

### La POO

- [ ] écrire une classe avec un `constructor` et des méthodes ([POO 02](../poo/02-classe-personnage.md))
- [ ] expliquer ce que veut dire `this` ([POO 02](../poo/02-classe-personnage.md))
- [ ] créer une classe enfant avec `extends` et `super` ([Magie 02](../magie/02-mage.md))
- [ ] redéfinir une méthode et expliquer le polymorphisme ([Magie 04](../magie/04-soin-et-mana.md))

### Le web et l'asynchrone

- [ ] expliquer ce qu'est une API, un client, un serveur ([API 01](../api/01-introduction.md))
- [ ] charger du JSON avec `fetch`, `async` et `await` ([API 02](../api/02-monstre-depuis-api.md))
- [ ] prévoir un plan B avec `try` / `catch` ([API 03](../api/03-monstre-aleatoire.md))
- [ ] jouer un son, une musique en boucle, et retenir un réglage avec `localStorage` ([Son](../son/01-introduction.md))

### La conception

- [ ] découper un programme en classes qui ont chacune un rôle ([API 07](../api/07-retour-code-final.md))
- [ ] ranger mon code en modules avec `import` et `export` ([Modules](../modules/01-introduction.md))
- [ ] documenter une fonction avec la JSDoc ([Modules 05](../modules/05-jsdoc.md))
- [ ] animer un élément en CSS et en JavaScript ([Animations](../animations/01-introduction.md))
- [ ] lire un message d'erreur dans la console et trouver d'où il vient ([fiche 05](./05-conception.md#déboguer--la-méthode))

> Tu as coché plus de la moitié ? Tu as déjà des bases **solides**. Tout coché ? Tu es prêt pour des projets bien plus gros.

## 🧩 Petit quiz

Réponds dans ta tête (ou sur papier), puis clique pour voir la réponse.

<details>
<summary>1. Quelle est la différence entre <code>let</code> et <code>const</code> ?</summary>

`let` crée une variable dont la valeur peut **changer** (les PV du héros). `const` crée une valeur qui ne change **jamais** (les PV maximum). Dans le doute, commence par `const`.
</details>

<details>
<summary>2. Dans <code>class Mage extends Heros</code>, à quoi sert <code>super(nom, 80, 4, 8)</code> ?</summary>

Il appelle le constructeur de la classe **parent** (`Heros`), avec les chiffres du Mage. Sans lui, le Mage n'aurait ni nom, ni PV, ni dégâts.
</details>

<details>
<summary>3. Pourquoi <code>await</code> devant <code>fetch(...)</code> ?</summary>

Parce que la réponse du serveur prend du temps. `await` **attend** qu'elle arrive avant de passer à la ligne suivante, sans bloquer la page. Et `await` ne s'utilise que dans une fonction `async`.
</details>

<details>
<summary>4. Internet est coupé pendant une rencontre. Que se passe-t-il, et grâce à quoi ?</summary>

Un **Gobelin** apparaît et la partie continue, grâce au `try` / `catch` de `chargerMonstreAleatoire` : l'erreur est rattrapée et remplacée par un monstre fait main.
</details>

<details>
<summary>5. Pourquoi <code>Combat</code> n'importe-t-il presque rien, alors qu'il utilise un héros, un monstre, un journal et des sons ?</summary>

Grâce à l'**injection** : il **reçoit** ces objets dans son constructeur au lieu d'aller les chercher. On n'importe que les noms qu'on **écrit** dans le fichier.
</details>

<details>
<summary>6. Tu veux ajouter un nouveau type de tuile, la lave, infranchissable. Combien de lignes de JavaScript dois-tu écrire ?</summary>

**Zéro.** Un symbole dans la `legende` et le type dans les `obstacles` de `map.json`, plus une couleur dans `carte.css`. C'est l'intérêt de séparer les **données** du **code**.
</details>

<details>
<summary>7. Le message <code>peutLancer is not a function</code> apparaît en jouant le Chevalier. Que veut-il dire ?</summary>

On appelle une méthode qui **n'existe pas** dans la classe de cet objet. C'était la faille corrigée dans le dossier `magie` : `peutLancer` n'existait que dans `Mage`. La solution : la mettre dans `Heros`, puisque `Combat` la demande à **tous** les héros.
</details>

<details>
<summary>8. Animation CSS ou <code>element.animate()</code> : laquelle pour faire sauter le héros à chaque pas ?</summary>

`element.animate()` (via l'outil `animer`), car l'animation **répond à une action** du joueur. Le CSS (`@keyframes`) est idéal pour ce qui tourne **tout seul** : l'eau, la respiration.
</details>

## 🌱 Avec de bonnes bases, on va loin

Regarde la liste des notions de ces fiches : variables, fonctions, conditions, boucles, objets, classes, héritage, API, asynchrone, gestion d'erreurs, modules, documentation, refactorisation, animation, accessibilité. Ce n'est pas la liste d'un « petit tuto de débutant ». C'est le **socle** sur lequel reposent les sites, les applications et les jeux que tu utilises tous les jours.

Et tu ne les as pas apprises par cœur dans un livre : tu les as **utilisées pour construire quelque chose qui marche**. C'est pour ça que tu ne les oublieras pas.

Quelques chemins possibles pour la suite, quand tu en auras envie :

| Si tu as aimé… | Tu pourrais découvrir… |
| --- | --- |
| les animations et le mouvement | l'élément `<canvas>`, pour dessiner image par image comme les vrais moteurs de jeu |
| la JSDoc et `@ts-check` | **TypeScript**, du JavaScript avec des types vérifiés partout |
| les modules et l'organisation | un outil de projet comme **Vite**, et le gestionnaire de paquets **npm** |
| PokeAPI et les serveurs | **Node.js**, pour écrire ton propre serveur et ta propre API |
| la POO | un autre langage orienté objet : **Python**, **Java** ou **C#**. Tu y retrouveras classes, héritage et polymorphisme |
| partager ton jeu | **Git** et **GitHub Pages**, pour versionner ton code et publier ton jeu en ligne |

Mais d'abord, il te reste le plus important : **ton** jeu.

➡️ Suite : [écris ton histoire](../histoire/01-introduction.md). Tu as maintenant toutes les cartes en main. Et garde ce dossier ouvert à côté : c'est ton aide-mémoire.
