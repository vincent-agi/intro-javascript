# 01 – Le chemin parcouru

Pose ton clavier deux minutes et regarde derrière toi.

Au tout début, tu as écrit `let pvJoueur = 100;` et deux boutons. Aujourd'hui, ton Mini RPG a une carte, un héros qui marche et respire, des monstres téléchargés sur Internet, deux héros jouables, de la magie, des sons, de la musique, des animations… et un code rangé en modules et documenté.

Ce dossier ne t'apprend **rien de nouveau**. Il **rassemble** tout ce que tu as appris, en petites fiches, pour que tu puisses :

- **prendre du recul** : comprendre comment les notions s'emboîtent ;
- **réviser** : chaque fiche rappelle l'idée en une phrase, avec un exemple tiré de **ton** jeu ;
- **mesurer ton travail** : il est énorme, et tu vas le voir en chiffres.

## Ton jeu, en chiffres

| Étape du parcours | Ce que le jeu savait faire | Fichiers JS | Lignes de JS | Classes |
| --- | --- | --- | --- | --- |
| [Les bases](../01-introduction.md) | un combat contre un monstre, deux boutons | 1 | 118 | 0 |
| [POO](../poo/01-introduction.md) | le même combat, organisé en objets | 1 | 174 | 5 |
| [API et carte](../api/01-introduction.md) | une carte, des déplacements, des Pokémon venus d'Internet | 1 | 399 | 7 |
| [Sons](../son/01-introduction.md) | bruitages, musiques, bouton muet | 1 | 552 | 8 |
| [Magie](../magie/01-introduction.md) | un Mage, du mana, des sorts, le choix du héros | 1 | 692 | 11 |
| [Modules](../modules/01-introduction.md) | le même jeu, rangé en fichiers et documenté | 10 | 906 | 11 |
| [Animations](../animations/01-introduction.md) | un jeu qui bouge : sauts, secousses, chiffres qui s'envolent | 10 | 1 019 | 11 |

En plus de ces **1 000 lignes de JavaScript**, il y a environ 180 lignes de CSS, un fichier `map.json` qui décrit le monde, et 11 fichiers de sons et de musiques. Tu as suivi **42 étapes** de tutoriel, et chacune s'est terminée par un jeu **qui marche**.

> 💡 1 000 lignes, c'est beaucoup… mais tu ne les as jamais écrites d'un coup. Tu les as ajoutées **10 lignes à la fois**, en testant à chaque fois. C'est exactement comme ça que travaillent les développeurs professionnels.

## Avant / après : la même idée, deux époques

Au début, afficher la vie ressemblait à ça (fichier `app.js` des bases) :

```javascript
// Met à jour les PV et les barres de vie
function afficherVie() {
    textePvJoueur.textContent = pvJoueur;
    textePvMonstre.textContent = pvMonstre;
    barreJoueur.style.width = (pvJoueur / PV_MAX_JOUEUR) * 100 + "%";
    barreMonstre.style.width = (pvMonstre / PV_MAX_MONSTRE) * 100 + "%";
}
```

À la fin, la même méthode vit dans la classe `Combat` (fichier `js/combat.js`), et elle fait bien plus : elle marche pour **n'importe quel** héros et **n'importe quel** monstre, gère le mana du Mage, colore les barres et met à jour les sorts :

```javascript
afficherVie() {
    this.textePvJoueur.textContent = this.heros.pv;
    this.textePvMonstre.textContent = this.monstre.pv;
    this.barreJoueur.style.width = (this.heros.pv / this.heros.pvMax) * 100 + "%";
    this.barreMonstre.style.width = (this.monstre.pv / this.monstre.pvMax) * 100 + "%";
    this.colorerBarre(this.barreJoueur, this.heros.pv / this.heros.pvMax);
    this.colorerBarre(this.barreMonstre, this.monstre.pv / this.monstre.pvMax);
    // ... le mana, puis les boutons de sorts
}
```

Regarde bien : les **4 premières lignes** sont presque identiques. Les bases du début sont **toujours là**, au cœur du jeu final. Tout ce que tu as appris ensuite s'est **construit dessus**.

## Le plan de ce dossier

| Fiche | Ce qu'elle rassemble |
| --- | --- |
| [02 – Les bases du langage](./02-bases.md) | variables, conditions, fonctions, tableaux, boucles, objets, page web, événements |
| [03 – La programmation orientée objet](./03-poo.md) | classes, objets, héritage, polymorphisme, `static` |
| [04 – Le web et l'asynchrone](./04-web-asynchrone.md) | client et serveur, API, JSON, `fetch`, `async` / `await`, erreurs, sons, minuteurs, `localStorage` |
| [05 – Concevoir un programme](./05-conception.md) | une classe = un rôle, données et code, injection, modules, JSDoc, refactorisation, animations, déboguer |
| [06 – Fais le point](./06-fais-le-point.md) | une checklist « je sais faire », un petit quiz, et la suite |

Chaque fiche se lit en 5 à 10 minutes. Chaque notion a un lien vers l'étape où tu l'as **pratiquée** : en cas de doute, retourne voir !

## 🏆 Défi

Ouvre côte à côte le `app.js` des bases et le dossier `js/` de ton jeu final. Cherche **trois** lignes que tu as écrites au tout début et qui existent encore, presque pareilles, dans ton jeu final.

➡️ Suite : [02 – Les bases du langage](./02-bases.md)
