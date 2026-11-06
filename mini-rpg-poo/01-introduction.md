# 01 – Introduction : pourquoi passer à la POO ?

Tu connais déjà les variables, les fonctions, les tableaux et les boucles. Avec elles, tu peux faire un petit RPG. Mais imagine qu'on ajoute un deuxième monstre, puis un mage, puis un archer… Le code se remplit de variables comme `pvJoueur`, `pvMonstre`, `pvMonstre2`… et devient vite difficile à lire.

La **Programmation Orientée Objet** (POO) règle ce problème : au lieu de variables éparpillées, on crée des **objets** qui contiennent leurs propres données **et** leurs propres actions.

## L'analogie du moule et des gâteaux 🎂

- Une **classe** est un **moule à gâteaux** : elle décrit la forme, mais ce n'est pas un gâteau.
- Un **objet** (on dit aussi une **instance**) est un **gâteau** fabriqué avec ce moule.
- Avec un seul moule, tu fabriques autant de gâteaux que tu veux. Chacun a son propre glaçage, mais tous ont la même forme.

Pour notre jeu :

| Cuisine | Programmation | Exemple |
| --- | --- | --- |
| Le moule | La classe | `Combattant` |
| Un gâteau | Un objet | `Aragorn`, `Merlin` |
| Les ingrédients | Les **propriétés** (données) | `nom`, `pv`, `attaque` |
| Les gestes de recette | Les **méthodes** (actions) | `attaquer()`, `recevoirDegats()` |

## Ce que tu vas construire

Un combat entre un **Guerrier** et un **Mage**, joué dans la console. Chacun est un objet créé à partir d'une classe.

| Étape | Notion |
| --- | --- |
| 02 | La **classe** et son **constructeur** |
| 03 | Les **méthodes** : faire interagir les objets |
| 04 | L'**héritage** : `extends` et `super` |
| 05 | Le code final et le lancement du combat |

## Structure du projet

Crée un dossier de travail avec un seul fichier :

```
mini-rpg-poo/
└── app.js
```

Tu l'exécuteras avec Node.js (`node app.js`) ou en le copiant dans la console du navigateur (`F12`, onglet **Console**).

## Premier aperçu

Voici à quoi ressemblera l'utilisation de ton code à la fin (ne le recopie pas encore) :

```javascript
const aragorn = new Guerrier("Aragorn"); // on fabrique un gâteau
const merlin = new Mage("Merlin");       // un autre, avec un autre moule
aragorn.attaquer(merlin);                // Aragorn frappe Merlin
```

Lis cette dernière ligne à voix haute : on comprend l'action sans effort. C'est tout l'intérêt de la POO.

## 🏆 Défi

Sans écrire de code, trouve **trois autres moules** (classes) possibles dans un jeu vidéo, et pour chacun **deux propriétés** et **deux méthodes**. Exemple : `Potion` → propriétés `nom`, `soin` ; méthodes `boire()`, `jeter()`.

➡️ Suite : [02 – Notre première classe](./02-notre-premiere-classe.md)
