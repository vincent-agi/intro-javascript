# 01 – Introduction : donner vie au jeu

Ton Mini RPG marche, il est bien rangé… mais il est **figé**. Le héros glisse d'une case à l'autre comme un pion, l'eau est une couleur unie, un coup de 30 points de dégâts ne fait… rien, à part changer un chiffre.

Dans un vrai petit RPG, tout **bouge** :

- 🌊 l'eau scintille, le héros **respire** même quand on ne touche à rien ;
- 🧙 il **saute** à chaque pas, **regarde** dans la direction où il va, **tremble** quand il se cogne ;
- 👹 le monstre **surgit** en rebondissant, puis **flotte** sur place ;
- 💥 un coup fait **trembler** la cible, et un **« -24 »** rouge s'envole au-dessus d'elle ;
- ❤️ la barre de vie passe du vert à l'orange, puis au **rouge qui clignote** ;
- 🏆 le vaincu **pâlit et s'affaisse**, le vainqueur **saute de joie**.

C'est ce qu'on appelle le **game feel** : de petites animations qui rendent chaque action **visible** et **agréable**. Sans elles, le joueur lit des chiffres ; avec elles, il **sent** le jeu.

## Trois outils, c'est tout

| Outil | Où ? | Pour quoi ? | Exemple dans ce dossier |
| --- | --- | --- | --- |
| `transition` | CSS | passer **en douceur** d'un état à un autre | la barre de vie qui change de couleur |
| `@keyframes` + `animation` | CSS | une animation **qui tourne toute seule** (en boucle, ou à l'apparition) | l'eau, la respiration, le monstre qui surgit |
| `element.animate(...)` | JavaScript | une animation **déclenchée par une action** du joueur | le saut à chaque pas, la secousse d'un coup |

> 💡 La règle simple : si l'animation tourne **toute seule**, écris-la en **CSS**. Si elle répond à **un événement** (une touche, un coup), lance-la en **JavaScript**.

Tu as déjà croisé les deux : le clignotement de la rencontre (`@keyframes clignote`, dossier `api`) et l'éclat du monstre quand un sort le frappe (`animate`, dossier `magie`). On va généraliser.

## Le plan

| Étape | Ce que tu ajoutes | Ce que tu pratiques |
| --- | --- | --- |
| 02 | L'eau scintille, le héros respire | `@keyframes`, `animation`, `infinite`, `alternate` |
| 03 | Le héros saute, regarde où il va, tremble aux chocs | `element.animate`, une fonction `animer` réutilisable |
| 04 | L'écran de combat glisse, le monstre surgit, les boutons arrivent en cascade | animation à l'apparition, `animation-delay` |
| 05 | Les coups font trembler, les dégâts s'envolent | créer, animer puis supprimer un élément |
| 06 | Barres de vie colorées, vainqueur et vaincu | `transition`, `classList.toggle` |
| 07 | Respecter les joueurs sensibles au mouvement, code final | `prefers-reduced-motion` |

## Point de départ

Copie le projet final du dossier [`modules`](../modules/06-bilan-code-final.md) (avec `js/` et ton dossier `sons/`). Lance ton serveur local, comme d'habitude.

Toutes les animations CSS iront dans un **nouveau fichier**, `animations.css`. Tu as appris dans le dossier `modules` qu'un fichier = un sujet : c'est pareil pour le CSS.

> 🆘 **Bloqué à une étape ?** Le dossier [`etapes/`](./etapes/) contient le projet complet à la fin des étapes 02 à 06. Le projet final (étape 07) est dans ce dossier-ci. Copie ton dossier `sons/` à côté pour l'essayer.

## Vérifier

Fais une partie et **observe** : note tout ce qui te semble « mort » ou trop brusque. À la fin de ce dossier, relis ta liste.

## 🏆 Défi

Lance un vieux jeu (ou une vidéo d'un jeu rétro) et repère **trois** petites animations qui rendent le jeu vivant. Comment les reproduirais-tu avec les trois outils ci-dessus ?

➡️ Suite : [02 – Un monde qui respire](./02-monde-qui-respire.md)
