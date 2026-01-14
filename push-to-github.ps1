#!/usr/bin/env pwsh
# Script pour pousser MyManager vers GitHub
# Usage: .\push-to-github.ps1

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  MyManager - Push to GitHub                                  ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

# Définir le chemin du projet
$projectPath = "c:\Users\21265\Desktop\Application de  Gestion Backoffice"

# Vérifier si le projet existe
if (!(Test-Path $projectPath)) {
    Write-Host "❌ Le chemin du projet n'existe pas: $projectPath" -ForegroundColor Red
    exit 1
}

# Accéder au répertoire du projet
cd $projectPath

Write-Host "📁 Répertoire du projet: $projectPath`n" -ForegroundColor Green

# ÉTAPE 1: Vérifier Git
Write-Host "📋 ÉTAPE 1: Vérification de Git..." -ForegroundColor Yellow

if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git n'est pas installé!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Git est installé`n" -ForegroundColor Green

# ÉTAPE 2: Initialiser Git si nécessaire
Write-Host "📋 ÉTAPE 2: Initialisation du repository Git..." -ForegroundColor Yellow

if (!(Test-Path ".git")) {
    Write-Host "🔧 Initialisation d'un nouveau repository..." -ForegroundColor Cyan
    git init
    
    # Configurer Git
    git config user.name "MyManager Developer"
    git config user.email "developer@mymanager.com"
    
    Write-Host "✅ Repository Git initialisé`n" -ForegroundColor Green
} else {
    Write-Host "✅ Repository Git existe déjà`n" -ForegroundColor Green
}

# ÉTAPE 3: Ajouter les fichiers
Write-Host "📋 ÉTAPE 3: Ajout des fichiers..." -ForegroundColor Yellow

git add .
$filesAdded = git diff --cached --name-only | Measure-Object -Line
Write-Host "✅ $($filesAdded.Lines) fichiers ajoutés`n" -ForegroundColor Green

# ÉTAPE 4: Status Git
Write-Host "📋 ÉTAPE 4: Statut Git..." -ForegroundColor Yellow
git status --short | Write-Host -ForegroundColor Cyan
Write-Host ""

# ÉTAPE 5: Créer le commit
Write-Host "📋 ÉTAPE 5: Création du commit..." -ForegroundColor Yellow

$commitMessage = "Initial commit: MyManager Backoffice - Validation complète des fonctionnalités avancées JavaScript (DOM, Classes ES6+, Promises, Async/Await, CRUD asynchrone)"

git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit créé avec succès`n" -ForegroundColor Green
} else {
    Write-Host "⚠️  Aucun nouveau fichier à commiter (peut être normal)`n" -ForegroundColor Yellow
}

# ÉTAPE 6: Demander l'URL GitHub
Write-Host "📋 ÉTAPE 6: Configuration du remote GitHub..." -ForegroundColor Yellow
Write-Host "`nVeuillez entrer l'URL de votre repository GitHub:" -ForegroundColor Cyan
Write-Host "Exemple: https://github.com/VotreUsername/mymanager.git`n"

$githubUrl = Read-Host "URL du repository GitHub"

if ([string]::IsNullOrWhiteSpace($githubUrl)) {
    Write-Host "`n❌ URL GitHub requise!" -ForegroundColor Red
    exit 1
}

# Ajouter le remote
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "🔄 Changement du remote existant..." -ForegroundColor Cyan
    git remote set-url origin $githubUrl
} else {
    Write-Host "🔄 Ajout du remote..." -ForegroundColor Cyan
    git remote add origin $githubUrl
}

Write-Host "✅ Remote GitHub configuré`n" -ForegroundColor Green

# ÉTAPE 7: Configurer la branche
Write-Host "📋 ÉTAPE 7: Configuration de la branche..." -ForegroundColor Yellow

$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Host "Branche actuelle: $currentBranch" -ForegroundColor Cyan

if ($currentBranch -ne "main") {
    Write-Host "🔄 Changement du nom de branche en 'main'..." -ForegroundColor Cyan
    git branch -M main
    Write-Host "✅ Branche renommée en 'main'`n" -ForegroundColor Green
} else {
    Write-Host "✅ Branche 'main' déjà configurée`n" -ForegroundColor Green
}

# ÉTAPE 8: Push vers GitHub
Write-Host "📋 ÉTAPE 8: Push vers GitHub..." -ForegroundColor Yellow
Write-Host "⏳ Authentification GitHub requise...`n" -ForegroundColor Cyan

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Push vers GitHub réussi!`n" -ForegroundColor Green
    Write-Host "🎉 Votre projet est maintenant sur GitHub!" -ForegroundColor Green
    Write-Host "`nRepository URL: $githubUrl" -ForegroundColor Cyan
    Write-Host "Branche: main`n" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Erreur lors du push. Vérifiez votre authentification GitHub." -ForegroundColor Red
    Write-Host "Conseil: Utilisez un Personal Access Token pour l'authentification`n" -ForegroundColor Yellow
    exit 1
}

# ÉTAPE 9: Vérifier le résultat
Write-Host "📋 ÉTAPE 9: Vérification du résultat..." -ForegroundColor Yellow
Write-Host "`nInformations du repository:`n" -ForegroundColor Cyan

git remote -v | Write-Host -ForegroundColor Cyan
Write-Host ""
git log --oneline -n 3 | Write-Host -ForegroundColor Cyan

Write-Host "`n╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  ✅ PUSH VERS GITHUB COMPLÉTÉ AVEC SUCCÈS                    ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green

Write-Host "Prochaines étapes:" -ForegroundColor Yellow
Write-Host "1. Visitez votre repository sur GitHub: $githubUrl" -ForegroundColor Cyan
Write-Host "2. Vérifiez que tous les fichiers sont présents" -ForegroundColor Cyan
Write-Host "3. Configurez les settings du repository si nécessaire" -ForegroundColor Cyan
Write-Host "4. Invitez les collaborateurs`n" -ForegroundColor Cyan
