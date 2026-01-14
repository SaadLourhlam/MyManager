#!/usr/bin/env node

/**
 * GUIDE DE DÉMONSTRATION - Fonctionnalités Avancées JavaScript
 * 
 * Ce script peut être exécuté dans la console du navigateur (F12)
 * pour tester toutes les fonctionnalités avancées implémentées.
 */

console.clear();
console.log(`
╔════════════════════════════════════════════════════════════════╗
║  GUIDE DE TEST - Fonctionnalités Avancées JavaScript          ║
║  MyManager Backoffice Application                             ║
╚════════════════════════════════════════════════════════════════╝
`);

// ============================================
// 1. MANIPULATION DU DOM
// ============================================

console.log(`
┌────────────────────────────────────────────────────────────────┐
│ 1. MANIPULATION DU DOM (via document)                          │
└────────────────────────────────────────────────────────────────┘
`);

console.log(`
✅ Sélecteurs DOM:
   • document.querySelector('.sidebar')
   • document.querySelectorAll('.nav-item')
   • document.getElementById('pageTitle')

✅ Modification de contenu:
   • element.textContent = 'nouveau texte'
   • element.innerHTML = '<div>contenu</div>'
   • element.innerHTML += 'ajout de contenu'

✅ Manipulation de classes CSS:
   • element.classList.add('classe')
   • element.classList.remove('classe')
   • element.classList.toggle('classe')
   • element.classList.contains('classe')

✅ Création d'éléments dynamiques:
   • const div = document.createElement('div')
   • parent.appendChild(child)
   • parent.insertBefore(child, reference)
   • parent.removeChild(child)

✅ Event Listeners:
   • document.addEventListener('DOMContentLoaded', callback)
   • element.addEventListener('click', callback)
   • element.addEventListener('change', callback)

📝 Exemples dans le code:
   • ui-manager.js : setupNavigation(), showModal()
   • dashboard.js : setupSidebarToggle()
   • translations.js : setupLanguageButtons()
`);

// ============================================
// 2. CLASSES ES6+
// ============================================

console.log(`
┌────────────────────────────────────────────────────────────────┐
│ 2. CLASSES ES6+ (Programmation Orientée Objet)                │
└────────────────────────────────────────────────────────────────┘
`);

console.log(`
✅ Classe DataManager (467 lignes):
   class DataManager {
       constructor() { ... }
       loadFromStorage(key) { ... }
       saveToStorage(key, data) { ... }
       addClient(data) { ... }
       updateClient(id, data) { ... }
       deleteClient(id) { ... }
   }

✅ Classe UIManager:
   class UIManager {
       setupNavigation() { ... }
       showModal(content) { ... }
       closeModal() { ... }
       updateStatistics(stats) { ... }
   }

✅ Classe ChartsManager:
   class ChartsManager {
       initializeCharts() { ... }
       createRevenueChart() { ... }
       createStatusChart() { ... }
   }

✅ Classe AdvancedFeaturesDemo (NOUVELLE):
   class AdvancedFeaturesDemo {
       static fetchUserData(userId) { ... }
       static async fetchUserAsync(userId) { ... }
       static async fetchMultipleUsersParallel(userIds) { ... }
   }

📝 Concepts utilisés:
   • Constructor et initialization
   • Methods et properties
   • Static methods
   • Encapsulation de données
   • Héritage via composition
`);

// ============================================
// 3. PROMESSES
// ============================================

console.log(`
┌────────────────────────────────────────────────────────────────┐
│ 3. PROMESSES (Promise, .then(), .catch(), .finally())          │
└────────────────────────────────────────────────────────────────┘
`);

console.log(`
✅ Qu'est-ce qu'une Promise?
   Une Promise est un objet qui représente la complétion (ou l'échec)
   d'une opération asynchrone et sa valeur résultante.

✅ États d'une Promise:
   • Pending (en attente)
   • Fulfilled (résolue avec une valeur)
   • Rejected (rejetée avec une erreur)

✅ Syntaxe basique:
   new Promise((resolve, reject) => {
       // opération asynchrone
       if (succès) {
           resolve(valeur);
       } else {
           reject(erreur);
       }
   })

✅ Chaînage avec .then().catch().finally():
   myPromise
       .then(result => { ... })      // Si résolue
       .catch(error => { ... })      // Si rejetée
       .finally(() => { ... })       // Dans les deux cas

📝 Exemples dans le code:
   • data-manager.js : addClientAsync(), updateClientAsync()
   • advanced-features.js : fetchUserData(), getUserWithChain()

🧪 À tester dans la console:
   await AdvancedFeaturesDemo.fetchUserData(1)
   await AdvancedFeaturesDemo.getUserWithChain(2)
`);

// ============================================
// 4. ASYNC/AWAIT
// ============================================

console.log(`
┌────────────────────────────────────────────────────────────────┐
│ 4. ASYNC/AWAIT (Programmation Asynchrone Moderne)              │
└────────────────────────────────────────────────────────────────┘
`);

console.log(`
✅ Qu'est-ce que async/await?
   • async : Déclare une fonction comme asynchrone
   • await : Attend la résolution d'une Promise
   • Syntaxe plus lisible que .then().catch()

✅ Syntaxe basique:
   async function maFonction() {
       try {
           const result = await maPromise();
           console.log(result);
       } catch (error) {
           console.error(error);
       } finally {
           // Nettoyage
       }
   }

✅ Avantages:
   • Code qui ressemble à du code synchrone
   • Plus facile à comprendre et maintenir
   • Gestion d'erreurs avec try/catch
   • Utilisation dans les boucles

📝 Exemples dans le code:
   • data-manager.js : initializeDataAsync(), getStatisticsAsync()
   • dashboard.js : initializeDashboardAsync()
   • advanced-features.js : fetchUserAsync()

🧪 À tester dans la console:
   await AdvancedFeaturesDemo.fetchUserAsync(1)
   await dataManager.initializeDataAsync()
   await dataManager.getStatisticsAsync()
`);

// ============================================
// 5. PROMISE COMBINATORS
// ============================================

console.log(`
┌────────────────────────────────────────────────────────────────┐
│ 5. PROMISE COMBINATORS (all, race, allSettled, any)            │
└────────────────────────────────────────────────────────────────┘
`);

console.log(`
✅ Promise.all() - Attendre TOUTES les promesses
   Syntax: await Promise.all([promise1, promise2, ...])
   
   Comportement:
   • Retourne tableau des résultats si TOUTES résolues
   • Rejette si UNE est rejetée
   • Résultats dans le même ordre que les promesses
   
   Cas d'usage: Charger plusieurs ressources en parallèle
   
   const [users, posts, comments] = await Promise.all([
       fetchUsers(),
       fetchPosts(),
       fetchComments()
   ]);

✅ Promise.race() - PREMIÈRE promesse résolue
   Syntax: await Promise.race([promise1, promise2, ...])
   
   Comportement:
   • Retourne le résultat de la PREMIÈRE promesse résolue
   • Rejette si la première est rejetée
   
   Cas d'usage: Timeout, fallback strategy
   
   const winner = await Promise.race([
       fetchFromServer(),
       timeoutAfter(5000)
   ]);

✅ Promise.allSettled() - Attendre TOUTES (résolues OU rejetées)
   Syntax: await Promise.allSettled([promise1, promise2, ...])
   
   Comportement:
   • Attends ALL les promesses
   • Retourne array avec {status, value/reason}
   • Ne rejette JAMAIS
   
   Cas d'usage: Batch operations, ne pas échouer sur une erreur
   
   const results = await Promise.allSettled([
       fetchUser(1),
       fetchUser(2),
       fetchUser(3)  // Peut échouer
   ]);

✅ Promise.any() - UNE promesse résolue (n'importe laquelle)
   Syntax: await Promise.any([promise1, promise2, ...])
   
   Comportement:
   • Retourne PREMIÈRE promesse RÉSOLUE
   • Rejette seulement si AUCUNE n'est résolue
   
   Cas d'usage: Multiple API endpoints, utiliser le premier succès

📝 Exemples dans le code:
   • data-manager.js : fetchAllDataAsync()
   • advanced-features.js : demonstratePromiseAll()
   • advanced-features.js : demonstratePromiseRace()
   • advanced-features.js : demonstratePromiseAllSettled()

🧪 À tester dans la console:
   await AdvancedFeaturesDemo.fetchMultipleUsersParallel([1, 2, 3])
   await AdvancedFeaturesDemo.demonstratePromiseAll()
   await AdvancedFeaturesDemo.demonstratePromiseRace()
   await AdvancedFeaturesDemo.demonstratePromiseAllSettled()
   await dataManager.fetchAllDataAsync()
`);

// ============================================
// 6. PATTERNS AVANCÉS
// ============================================

console.log(`
┌────────────────────────────────────────────────────────────────┐
│ 6. PATTERNS AVANCÉS                                            │
└────────────────────────────────────────────────────────────────┘
`);

console.log(`
✅ Async avec Timeout (Promise.race):
   static async fetchWithTimeout(userId, timeoutMs = 5000) {
       return Promise.race([
           this.fetchUserData(userId),
           new Promise((_, reject) =>
               setTimeout(() => reject(new Error('Timeout')), timeoutMs)
           )
       ]);
   }

✅ Async avec Retry Logic:
   static async fetchUserWithRetry(userId, maxRetries = 3) {
       for (let i = 0; i < maxRetries; i++) {
           try {
               return await this.fetchUserData(userId);
           } catch (error) {
               if (i === maxRetries - 1) throw error;
               await new Promise(r => setTimeout(r, 1000));
           }
       }
   }

✅ Async Generators:
   static async *fetchUsersGenerator(userIds) {
       for (const id of userIds) {
           const user = await this.fetchUserData(id);
           yield user;
       }
   }

✅ DOM Manipulation avec Async:
   static async updateDOMWithUserData(elementId, userId) {
       const element = document.getElementById(elementId);
       try {
           element.innerHTML = '⏳ Loading...';
           const user = await this.fetchUserData(userId);
           element.innerHTML = \`<div>\\${user.name}</div>\`;
       } catch (error) {
           element.innerHTML = \`<div style="color: red">❌ \\${error.message}</div>\`;
       }
   }

🧪 À tester dans la console:
   await AdvancedFeaturesDemo.fetchWithTimeout(1)
   await AdvancedFeaturesDemo.fetchUserWithRetry(1)
`);

// ============================================
// 7. CRUD ASYNCHRONE
// ============================================

console.log(`
┌────────────────────────────────────────────────────────────────┐
│ 7. CRUD ASYNCHRONE (Create, Read, Update, Delete)              │
└────────────────────────────────────────────────────────────────┘
`);

console.log(`
✅ CREATE (Ajouter):
   await dataManager.addClientAsync({
       name: 'Jean Dupont',
       email: 'jean@example.com',
       phone: '+33612345678',
       city: 'Paris',
       status: 'Actif'
   })

✅ READ (Lire):
   const stats = await dataManager.getStatisticsAsync()
   const activities = await dataManager.getActivitiesAsync()

✅ UPDATE (Modifier):
   await dataManager.updateClientAsync(1, {
       name: 'Jean Martin',
       status: 'Inactif'
   })

✅ DELETE (Supprimer):
   await dataManager.deleteClientAsync(1)

📝 Fichier: data-manager.js
   • addClientAsync()
   • updateClientAsync()
   • deleteClientAsync()

🧪 Tester les opérations CRUD:
   // Créer
   const newClient = await dataManager.addClientAsync({
       name: 'Test User',
       email: 'test@example.com'
   })
   
   // Lire
   console.log(dataManager.clients)
   
   // Mettre à jour
   await dataManager.updateClientAsync(newClient.id, {
       name: 'Updated Name'
   })
   
   // Supprimer
   await dataManager.deleteClientAsync(newClient.id)
`);

// ============================================
// 8. GESTION D'ERREURS
// ============================================

console.log(`
┌────────────────────────────────────────────────────────────────┐
│ 8. GESTION D'ERREURS (try/catch/finally)                       │
└────────────────────────────────────────────────────────────────┘
`);

console.log(`
✅ Structure try/catch/finally:
   try {
       // Code susceptible de lever une erreur
       const result = await someAsyncOperation();
   } catch (error) {
       // Gérer l'erreur
       console.error('Erreur:', error.message);
   } finally {
       // Toujours exécuté (nettoyage)
       console.log('Opération terminée');
   }

✅ Types d'erreurs gérées:
   • Erreurs réseau (API failure)
   • Erreurs de données (validation)
   • Erreurs de timeout (délai dépassé)
   • Erreurs utilisateur (données invalides)

✅ Chaîner les erreurs:
   .catch(error => {
       if (error instanceof TypeError) {
           // Erreur de type
       } else if (error instanceof RangeError) {
           // Erreur de plage
       } else {
           // Autre erreur
       }
   })

📝 Exemples dans le code:
   • Tous les fichiers async/await avec try/catch
   • dashboard.js : initializeDashboardAsync()
   • data-manager.js : Toutes les méthodes async

🧪 Provoquer une erreur:
   await AdvancedFeaturesDemo.fetchUserData(-1)  // Rejeté
   await AdvancedFeaturesDemo.fetchUserData(0)   // Rejeté
`);

// ============================================
// 9. COMMANDES DE TEST
// ============================================

console.log(`
┌────────────────────────────────────────────────────────────────┐
│ 9. COMMANDES DE TEST À EXÉCUTER                               │
└────────────────────────────────────────────────────────────────┘
`);

console.log(`
🧪 Démonstration complète:
   runAdvancedFeaturesDemo()

🧪 Tests individuels - Promesses:
   await AdvancedFeaturesDemo.fetchUserData(1)
   await AdvancedFeaturesDemo.getUserWithChain(2)
   await AdvancedFeaturesDemo.fetchUserAndPosts(1)

🧪 Tests individuels - Async/Await:
   await AdvancedFeaturesDemo.fetchUserAsync(1)
   await AdvancedFeaturesDemo.fetchUserAndPostsAsync(2)

🧪 Tests individuels - Promise Combinators:
   await AdvancedFeaturesDemo.fetchMultipleUsersParallel([1, 2, 3])
   await AdvancedFeaturesDemo.demonstratePromiseAll()
   await AdvancedFeaturesDemo.demonstratePromiseRace()
   await AdvancedFeaturesDemo.demonstratePromiseAllSettled()

🧪 Tests individuels - Patterns avancés:
   await AdvancedFeaturesDemo.fetchWithTimeout(1)
   await AdvancedFeaturesDemo.fetchUserWithRetry(1)

🧪 Tests d'initialisation Dashboard:
   await dataManager.initializeDataAsync()
   await dataManager.getStatisticsAsync()
   await dataManager.fetchAllDataAsync()

🧪 Tests CRUD Asynchrone:
   const newClient = await dataManager.addClientAsync({
       name: 'Test',
       email: 'test@example.com'
   })
   await dataManager.updateClientAsync(newClient.id, { name: 'Updated' })
   await dataManager.deleteClientAsync(newClient.id)

🧪 Tests DOM + Async:
   AdvancedFeaturesDemo.updateDOMWithUserData('myElement', 1)
`);

// ============================================
// 10. RÉSUMÉ DES FICHIERS
// ============================================

console.log(`
┌────────────────────────────────────────────────────────────────┐
│ 10. FICHIERS IMPLÉMENTANT LES FONCTIONNALITÉS                  │
└────────────────────────────────────────────────────────────────┘
`);

console.log(`
📄 assets/js/data-manager.js
   • Classes ES6: DataManager class
   • Promesses: addClientAsync, updateClientAsync, deleteClientAsync
   • Async/Await: initializeDataAsync, getStatisticsAsync, getActivitiesAsync
   • Promise.all(): fetchAllDataAsync
   • CRUD complet avec localStorage

📄 assets/js/dashboard.js
   • Async/Await: initializeDashboardAsync()
   • DOM manipulation: setupSidebarToggle()
   • Event listeners: DOMContentLoaded, click, resize
   • Gestion d'erreurs: try/catch

📄 assets/js/advanced-features.js (NOUVEAU)
   • Classe AdvancedFeaturesDemo avec 18+ méthodes
   • Tous les patterns de Promises
   • Tous les patterns d'Async/Await
   • Promise.all(), Promise.race(), Promise.allSettled()
   • Retry logic, Timeout, Async generators
   • DOM manipulation avec async
   • Code de démonstration

📄 assets/js/ui-manager.js
   • Classe UIManager
   • DOM manipulation: querySelector, addEventListener, classList
   • Création d'éléments: createElement, appendChild
   • Modification de contenu: textContent, innerHTML

📄 assets/js/charts.js
   • Classe ChartsManager
   • Initialisation de graphiques
   • Rendu dynamique de données

📄 assets/js/auth.js
   • Gestion de l'authentification
   • Sessions utilisateur

📄 assets/js/translations.js
   • Système i18n (FR/EN/AR)
   • DOM manipulation pour les langues
   • Event listeners pour le changement de langue
`);

// ============================================
// 11. RESSOURCES ADDITIONNELLES
// ============================================

console.log(`
┌────────────────────────────────────────────────────────────────┐
│ 11. RESSOURCES ADDITIONNELLES                                  │
└────────────────────────────────────────────────────────────────┘
`);

console.log(`
📚 Documentation créée:
   • DOCUMENTATION_FONCTIONNALITES_AVANCEES.md (ce document)

📖 Liens utiles:
   • MDN Web Docs - Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
   • MDN Web Docs - async/await: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
   • JavaScript.info - Promises: https://javascript.info/promise-basics
   • JavaScript.info - async/await: https://javascript.info/async-await

📋 Vérifier les logs:
   • Ouvrir F12 (Dev Tools)
   • Onglet "Console"
   • Observer les messages avec emojis
   • Vérifier l'ordre d'exécution
`);

console.log(`
╔════════════════════════════════════════════════════════════════╗
║  Fin du guide de démonstration                                ║
║  Consultez la documentation pour plus de détails             ║
╚════════════════════════════════════════════════════════════════╝
`);
