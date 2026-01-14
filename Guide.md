Énoncé du Projet : Application de  Gestion Backoffice 

Titre du Projet : Backoffice de Gestion "MyManager"

Description Générale 1

Objectifs Principaux  1

Exemples de Thèmes de Projet        1

Spécifications Techniques        2

Contraintes        6

Suivi, Contrôle et Dépôt        6

Livrables Attendus        6

Exemples d'APIs Publiques        7

Fonctionnalités Avancées (Optionnelles)        7

Évaluation        7

Protocole d'Évaluation        8

Description Générale
Vous allez développer une application backoffice en JavaScript (VanillaJS), HTML5, et  CSS3, sans utiliser de frameworks tels que Angular ou React. L'objectif est de construire  une interface utilisateur qui permet de gérer des entités avec des fonctionnalités CRUD  (Créer, Lire, Mettre à jour, Supprimer) et d'afficher des tableaux de bord avec des  statistiques pertinentes. 

Objectifs Principaux 
1. Implémenter au moins 5 entités CRUD dans l'application (par exemple :  Utilisateurs, Produits, Commandes, Clients, Factures). 

2. Utiliser des données simulées (faux fichiers JSON ou librairies comme Faker.js)  ou consommer des APIs publiques disponibles sur Internet (recommandé).

3. Créer un tableau de bord (dashboard) qui affiche des statistiques (ex : nombre  total d'utilisateurs, commandes en attente, revenus générés, etc.). le dashbord  dois contenir minimum 5 chartes (piechart, donutchart, barchart, linechart,  scatter-plot chart, box chart, histogram, etc.). 

4. Fournir une interface responsive avec un design professionnel. 

5. Utiliser uniquement JavaScript natif, sans frameworks modernes. 

6. L'usage de bibliothèques CSS3 est autorisé(Bootstrap, Tailwind, etc.). 

7. L'usage de bibliothèques Javascript est autorisé(jQuery, RamdaJS, LodashJS, etc.). 

Exemples de Thèmes de Projet
Afin de vous orienter, voici une liste non exhaustive de thèmes que vous pouvez choisir pour votre application Backoffice. Vous êtes également libres de proposer votre propre sujet, à condition qu'il respecte les contraintes techniques (5 entités CRUD minimum).

Gestion de Bibliothèque : Livres, Auteurs, Adhérents, Emprunts, Catégories.
Gestion Hospitalière : Patients, Médecins, Rendez-vous, Prescriptions, Services.
Gestion de Stock / Inventaire : Produits, Fournisseurs, Entrepôts, Commandes d'achat, Catégories.
Administration Scolaire : Étudiants, Professeurs, Cours, Salles de classe, Notes/Examens.
Gestion de Restaurant : Plats (Menu), Commandes, Tables, Réservations, Employés.
Agence immobilière : Biens immobiliers, Agents, Clients, Visites, Contrats.
Gestion d'Événements : Événements, Participants, Conférenciers, Salles, Billetterie.
Spécifications Techniques
Fonctionnalités CRUD

Pour chaque entité, vous devez : 

• Créer : Ajouter un nouvel élément via un formulaire. 

• Lire : Afficher les données dans un tableau avec pagination. 

o Le screen doit contenir des filtres. 

o Le screen doit contenir des options de trie (Sorting). 

o Le screen doit contenir des options d'export via des fichiers CSV. • Mettre à jour : Modifier les informations d'un élément existant.

• Consulter un élément : Dans le tableau de consultation il faut avoir une option  de visualiser les détails d'un élément (un bouton "see details") dans une page  appart, cette page doit contenir plus de détails sur le l'objet en question. o Le screen doit contenir une option d'export PDF. 

• Supprimer : Supprimer un élément (après confirmation via un pop-up). 

Dashboard

Le tableau de bord doit inclure : 

1. Des indicateurs clés sous forme de cartes (exemple : nombre total de produits,  utilisateurs, etc.). 

2. Un graphique ou un diagramme (utilisez une bibliothèque comme Chart.js ou  créez votre propre graphique en SVG ou Canvas). 

3. Filtres dynamiques pour visualiser des données spécifiques (par exemple,  afficher les commandes d'un utilisateur donné). 

Données 

• Option 1 : APIs publiques (Recommandé) 

Sollicitez des APIs publiques telles que : 

o https://jsonplaceholder.typicode.com/ (Utilisateurs, Posts,  

Commentaires). 

o https://reqres.in/ (Utilisateurs). 

o https://pokeapi.co/ (Pokémon). 

o https://dummyapi.io/ (Utilisateurs, Posts). 

• Option 2 : Données simulées 

o Utilisez un fichier JSON local pour stocker des données simulées. o Ou générez des données dynamiques en utilisant des librairies comme  JSONDB, Faker.js ou Mockaroo. 

Design (CSS3) 

• Interface utilisateur avec une structure responsive (adaptée aux mobiles et aux  tablettes). 

• Utilisez Grid ou Flexbox pour organiser les éléments. 

• Stylez les formulaires et les tableaux avec des couleurs, des bordures et des  ombres modernes. 

• Implémentez une page de Login avec un User statique (admin/admin). 

• Implémentez un menu latéral pour naviguer entre les différentes entités CRUD  et le tableau de bord. 

• Implémentez une barre de navigation "navbar" contenant :

o le Logo de votre entreprise virtuelle. 

o Un bouton de déconnexion. 

o Un drop down permettant l'internationalisation des pages (Arabe,  Français et Anglais). 


Exemple 1 :
image example1.png
Exemple 2 : 
image example2.png
Exemple 3 :
image example3.png



Contraintes 
1. Aucun Framework (React, Angular, etc.) ne doit être utilisé. 

2. Vous pouvez utiliser des bibliothèques tierces comme Chart.js ou Lodash. 

3. L'utilisation d'outils/bibliothèques comme Tailwind ou Bootstrap est autorisée pour le CSS. 


Suivi, Contrôle et Dépôt
1. Mise à jour du Code (Repository)

Chaque équipe doit obligatoirement tenir un repository distant GitHub à jour.
Date limite hebdomadaire : Le repository doit être mis à jour chaque jeudi avant minuit (00h00).
L'historique des commits servira de preuve de l'avancement régulier et de la participation active de tous les membres de l'équipe.
2. Contrôle de Projet

Une session de contrôle aura lieu entre le 7 janvier et le 16 janvier.
Durant cette période, l'enseignant remplira une Fiche de Suivi de Projet pour chaque groupe. Ce document servira de preuve officielle que le projet a bien été réalisé par les membres de l'équipe et validera l'état d'avancement.
3. Déploiement (Obligatoire)

Le projet doit être déployé et accessible en ligne.
Vous pouvez utiliser des services gratuits tels que GitHub Pages, Vercel, Netlify, ou tout autre service d'hébergement statique.
L'URL de l'application déployée devra être fournie dans le fichier README.md de votre repository et lors de la soumission finale.
Livrables Attendus
Enregistrement du Groupe (Formulaire)
Vous devez impérativement soumettre la composition de votre groupe et le lien vers votre repository via le formulaire dédié [lien].
Date limite : Ce jeudi (11 Décembre 2025) avant minuit. Ce lien sera utilisé pour vérifier votre progression hebdomadaire.
Code Source (Repository Git)
Le projet doit être hébergé sur le gestionnaire de version: GitHub.
Fichier README.md : Vous devez obligatoirement utiliser le template fourni par l'enseignant. Ce fichier devra détailler les fonctionnalités, les APIs utilisées, et les instructions d'installation.
L'historique des commits doit refléter une progression régulière.
Application Déployée
Un lien fonctionnel vers la version en ligne de l'application (hébergée sur Vercel, GitHub Pages, Netlify, etc.).
Supports de Présentation
Rapport PDF : Une documentation technique et fonctionnelle du projet.
Présentation (PPT/Slides) : Le support visuel pour la soutenance orale.

Exemples d'APIs Publiques 
1. JSONPlaceholder : https://jsonplaceholder.typicode.com/ 

Entités disponibles : Utilisateurs, Posts, Commentaires. 

2. Reqres : https://reqres.in/ 

Entités disponibles : Utilisateurs. 

3. OpenWeatherMap : https://openweathermap.org/ 

Données météorologiques pour afficher les conditions météo d'une ville. 

4. DummyAPI : https://dummyapi.io/ 

Données pour utilisateurs, posts, commentaires. 

5. PokeAPI : https://pokeapi.co/ 

Entité Pokémon pour tester une API amusante. 

Fonctionnalités Avancées (Optionnelles) 
1. Recherche : Implémentez une barre de recherche pour filtrer les données dans  les tableaux.

2. Filtres : Ajoutez des filtres pour trier ou rechercher des données selon des  critères spécifiques (par exemple, afficher uniquement les commandes en  attente). 

3. Graphiques dynamiques : Affichez des graphiques basés sur les données  (exemple : évolution des ventes). 

4. Gestion des permissions : Créez des utilisateurs admin, super_admin, user,  agent, etc. avec des droits spécifiques.