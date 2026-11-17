# 05 – Concevoir un programme

Savoir écrire du code, c'est une chose. Savoir **l'organiser** pour qu'il reste clair, facile à modifier et agréable à reprendre, c'est ce qui distingue un développeur. Voici les principes de conception que tu as appliqués, souvent sans le savoir.

## Une classe = un rôle

**En une phrase** : chaque classe (et chaque fichier) s'occupe d'**un seul sujet**.

| Classe | Son seul rôle |
| --- | --- |
| `Personnage`, `Heros`, `Mage`, `Monstre` | les combattants |
| `Sort`, `SortDeSoin` | la magie |
| `Journal` | les messages du combat |
| `Carte` | les tuiles et les collisions |
| `Exploration` | le héros sur la carte |
| `Combat` | le déroulement d'un combat |
| `Sons` | les bruitages et la musique |
| `main.js` (`demarrerJeu`) | créer les objets et les relier |

Quand tu cherches « où sont les sorts ? », la réponse est évidente : dans `sorts.js`.

📍 Vu dans : [API 07 – le tableau des rôles](../api/07-retour-code-final.md), [Modules 04](../modules/04-tout-ranger.md)

## Séparer les données du code

**En une phrase** : ce qui **décrit** le jeu (la carte, la liste des sons) vit dans des **données**, pas dans des `if`.

```json
"legende": { "#": "arbre", "~": "eau", ".": "chemin", "H": "herbe" },
"obstacles": ["arbre", "eau"]
```

Pour ajouter un pont, un nouveau son ou un personnage qui parle, tu modifies `map.json` ou `FICHIERS_SONS`… et **aucune** ligne de logique. Le code devient un **moteur**, les données sont le **contenu**.

📍 Vu dans : [API 04 – La carte](../api/04-carte.md), [Son 02](../son/02-premier-son.md)

## L'injection : donner ses outils à un objet

**En une phrase** : au lieu qu'un objet aille chercher ses outils (une variable globale), on les lui **donne** dans son constructeur.

```javascript
const sons = new Sons(FICHIERS_SONS);
const combat = new Combat(heros, journal, sons);     // Combat reçoit le héros, le journal et les sons
const exploration = new Exploration(carte, sons, heros.emoji);
```

Résultat : au moment de ranger le code en modules, `Combat`, `Carte`, `Exploration` et `Journal` n'avaient **besoin d'importer personne**. L'injection rend les classes indépendantes.

📍 Vu dans : [Son 02](../son/02-premier-son.md), [Modules 04](../modules/04-tout-ranger.md)

## Les fonctions de rappel : prévenir sans se mélanger

**En une phrase** : un objet **prévient** l'extérieur en appelant une fonction qu'on lui a fournie, sans savoir ce qu'elle fait.

```javascript
// Exploration sonne quand un monstre surgit...
this.surRencontre = () => {};
// ...et demarrerJeu décide ce qui se passe
exploration.surRencontre = async () => { /* charger un monstre, montrer le combat */ };
```

`Exploration` ne connaît pas `Combat`, et `Combat` ne connaît pas `Exploration`. C'est `main.js`, le chef d'orchestre, qui les relie.

📍 Vu dans : [API 06 – Rencontres](../api/06-rencontres.md), [API 07](../api/07-retour-code-final.md)

## Les modules : un fichier = un sujet

**En une phrase** : chaque fichier **choisit** ce qu'il partage (`export`) ; les autres l'utilisent (`import`).

```javascript
import { Heros, Mage } from "./personnages.js";
import { Combat } from "./combat.js";
```

Les `import` en haut de `main.js` forment la **table des matières** du jeu. Rien n'est global, rien n'est partagé sans le dire.

📍 Vu dans : [Modules 02 à 04](../modules/02-premier-module.md)

## Documenter : la JSDoc

**En une phrase** : des commentaires `/** ... */` que l'éditeur sait lire : descriptions au survol, autocomplétion, et erreurs signalées avant de jouer (avec `@ts-check`).

```javascript
/**
 * @param {number} cout - le mana dépensé pour le lancer
 */
```

Un code documenté s'adresse à **ton camarade**… et à **toi dans trois mois**.

📍 Vu dans : [Modules 05 – JSDoc](../modules/05-jsdoc.md)

## Refactoriser : améliorer sans rien casser

**En une phrase** : réorganiser le code **sans changer ce que voit le joueur**, par petites étapes testées.

Tu l'as fait plusieurs fois : passer en POO, rendre `Combat` réutilisable, découper `app.js` en 10 modules, créer l'outil `animer`, déplacer `peutLancer` dans `Heros`. Chaque fois, le jeu marchait **avant**, **pendant** et **après**.

📍 Vu dans : [POO](../poo/01-introduction.md), [Modules](../modules/01-introduction.md)

## Un outil, partout

**En une phrase** : quand un même geste revient souvent, on en fait **une fonction**, et on ne l'écrit qu'**une fois**.

`nombreAuHasard`, `chargerJson`, `attendre`, `animer`… L'outil `animer` l'a prouvé : pour respecter `prefers-reduced-motion` dans **tout** le jeu, il a suffi de modifier **une** fonction.

📍 Vu dans : [Animations 03](../animations/03-heros-marche.md), [Animations 07](../animations/07-mouvement-reduit-code-final.md)

## Penser au joueur

**En une phrase** : un bon jeu **informe** le joueur, réagit à ses actions, et respecte tout le monde.

- **retour visuel et sonore** : chaque action se voit et s'entend (sons, chiffres qui s'envolent, secousses) ;
- **messages clairs** : « Son(s) introuvable(s) : soin » plutôt qu'un silence mystérieux ;
- **robustesse** : le Gobelin du plan B, les sons manquants ignorés ;
- **accessibilité** : moins d'animations pour ceux qui le demandent ;
- **respect des auteurs** : licences vérifiées, crédits dans `CREDITS.md`.

📍 Vu dans : [Son](../son/01-introduction.md), [Animations](../animations/01-introduction.md)

## Déboguer : la méthode

Tu as croisé des dizaines d'erreurs. La méthode pour s'en sortir est toujours la même :

1. **lire** le message de la console (`F12`) : il donne souvent le fichier et la ligne ;
2. regarder l'onglet **Réseau** : un `404` = un fichier mal nommé ou mal rangé ;
3. **reproduire** le problème, puis **réduire** : quelles sont les 10 dernières lignes modifiées ?
4. **comparer** avec une version qui marche (les dossiers `etapes/` étaient là pour ça) ;
5. ne coder **jamais plus de 10 lignes** sans tester.

| Message | Il veut souvent dire… |
| --- | --- |
| `X is not defined` | une faute de frappe, ou un `import` qui manque |
| `X is not a function` | la méthode n'existe pas dans cette classe (ou faute de nom) |
| `Cannot read properties of undefined` | une valeur n'existe pas encore (un élément HTML, une case hors de la carte…) |
| `Failed to fetch` / `404` | le serveur local n'est pas lancé, ou le fichier est introuvable |

## 🧠 Prendre du recul

Aucun de ces principes n'est propre au JavaScript, ni aux jeux. On les retrouve dans les applications de banque, les sites de vente, les logiciels de la NASA. Tu ne les as pas appris par cœur : tu les as **rencontrés**, parce que ton jeu en avait besoin. C'est la meilleure façon de les comprendre.

➡️ Suite : [06 – Fais le point](./06-fais-le-point.md)
