# Projet Web : Le Jeu du "Devine le Nombre"

Bienvenue dans ce projet d'initiation à la programmation web ! Ce document présente les objectifs, les règles et la structure du mini-jeu que vous allez créer pas à pas.

---

## 🎯 Objectifs pédagogiques

Ce projet a été conçu pour vous apprendre les bases fondamentales du **JavaScript** ainsi que son interaction avec les pages web, à travers un format ludique :

1. **Les Variables (`let`, `const`) :** Stocker des informations en mémoire (le nombre secret, le nombre d'essais, l'état du jeu).
2. **Le Hasard (`Math.random`) :** Générer de l'imprévisible pour rendre chaque partie unique.
3. **Le DOM (*Document Object Model*) :** Permettre à JavaScript de dialoguer avec le code HTML (lire les saisies, modifier l'affichage).
4. **Les Événements (`addEventListener`) :** Réagir en temps réel aux actions de l'utilisateur (clics de souris, appui sur la touche *Entrée*).
5. **Les Conditions (`if / else if / else`) :** Prendre des décisions logiques pour guider le joueur (trop grand, trop petit, gagné !).
6. **La Boucle événementielle :** Gérer l'enchaînement des tentatives jusqu'à la victoire.

---

## 📜 Les Règles du Jeu

Le jeu fonctionne selon les principes suivants :

1. Le programme choisit secrètement un nombre entier compris entre **0 et 100** (inclus).
2. Le programme invite le joueur à deviner ce nombre mystère via un champ de saisie [saisir un nombre](./screenshots/saisir_nombre.png).
3. Le joueur entre sa proposition (un nombre entier entre 0 et 100).
4. Le programme analyse la proposition :
   - Si le nombre entré est **plus grand** que le nombre mystère --> Le programme indique que le nombre mystère est **plus petit** (c'est moins) [C'est moins](./screenshots/moins.png).
   - Si le nombre entré est **plus petit** que le nombre mystère -->Le programme indique que le nombre mystère est **plus grand** (c'est plus) [C'est plus](./screenshots/plus.png).
   - Si les deux nombres sont **identiques** --> Le programme annonce que le joueur a **gagné la partie** ! [victoire](./screenshots/victoir.png)
5. Tant que la solution n'est pas trouvée, la partie continue et le compteur de tentatives augmente.

---

## 🛠️ Structure du Projet

Pour garder un code propre et structuré, votre projet sera divisé en trois fichiers distincts :
.
* `index.html` : La structure et l'interface visuelle de la page web. Le fichier est disponible ici : [./index.html].
* `style.css` : Le design, les couleurs et la mise en page (style moderne / glassmorphisme). Le fichier est disponible ici : [style.css](./style.css).
* `script.js` : Le cerveau du jeu (la logique, les conditions et les interactions). Le fichier **vide** est disponible ici : [script.js](./script.js) Mais vous pouvez utiliser [https://jsfiddle.net/](https://jsfiddle.net/) pour faire simple.

Préparez votre éditeur de code et vos fichiers, et commencez dès à présent avec la première étape !
