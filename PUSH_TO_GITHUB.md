# 📤 GUIDE DE PUSH VERS GITHUB
# MyManager Backoffice Application

## ✅ ÉTAPE 1: Initialiser le Repository Git

```powershell
cd "c:\Users\21265\Desktop\Application de  Gestion Backoffice"
git init
git config user.name "SaadLourhlam"
git config user.email "saadlourhlam@gmail.com"
```

## ✅ ÉTAPE 2: Créer un fichier .gitignore

```powershell
# Le fichier .gitignore est déjà créé, sinon:
# Exclure les dossiers et fichiers inutiles
```

## ✅ ÉTAPE 3: Ajouter tous les fichiers

```powershell
git add .
```

## ✅ ÉTAPE 4: Créer le commit initial

```powershell
git commit -m "Initial commit: MyManager Backoffice application - Validation complète des fonctionnalités avancées JavaScript"
```

## ✅ ÉTAPE 5: Ajouter le remote GitHub

**Option A: Si le repository GitHub existe déjà:**
```powershell
git remote add origin https://github.com/SaadLourhlam/mymanager.git
```

**Option B: Créer le repository sur GitHub d'abord:**
1. Aller sur https://github.com/new
2. Créer un nouveau repository appelé "mymanager"
3. Puis exécuter l'option A

## ✅ ÉTAPE 6: Pousser vers GitHub

```powershell
# Renommer la branche master en main (si nécessaire)
git branch -M main

# Pousser le code
git push -u origin main
```

## 🔐 AUTHENTIFICATION GitHub

Si vous avez un Personal Access Token (PAT):
```
Username: VotreUsername
Password: VotrePersonalAccessToken
```

Ou utiliser SSH si configuré.

## 📝 Fichiers à Inclure

✅ Tous les fichiers HTML (dashboard.html, login.html, pages/)
✅ Tous les fichiers CSS (assets/css/)
✅ Tous les fichiers JavaScript (assets/js/)
✅ Documentation (*.md files)
✅ .gitignore
✅ README.md

## 🚀 Vérifier le Push

```powershell
git log --oneline -n 5
git remote -v
```

Votre repository devrait maintenant être visible sur GitHub!
