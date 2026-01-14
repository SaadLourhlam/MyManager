// ============================================
// TRANSLATIONS MANAGER
// ============================================

const translations = {
    fr: {
        // Login Page
        loginTitle: 'MyManager',
        loginSubtitle: 'Gestion Backoffice Professionnelle',
        usernameLabel: 'Identifiant',
        passwordLabel: 'Mot de passe',
        rememberLabel: 'Se souvenir de moi',
        loginBtn: 'Se connecter',
        demoText: 'Démo: Utilisateur: admin | Mot de passe: admin',
        
        // Error Messages
        invalidCredentials: 'Identifiant ou mot de passe incorrect',
        requiredField: 'Ce champ est obligatoire',
        
        // Dashboard
        pageTitle: 'Tableau de Bord',
        dashboardTitle: 'Tableau de Bord',
        dashboardDesc: 'Bienvenue sur votre tableau de bord',
        
        // Stats
        totalClientsLabel: 'Clients Totaux',
        totalProduitsLabel: 'Produits',
        totalCommandesLabel: 'Commandes',
        totalRevenueLabel: 'Revenu Total',
        totalUsersLabel: 'Utilisateurs Actifs',
        
        // Charts
        revenueChartTitle: 'Revenu par Mois',
        statusChartTitle: 'Statut des Commandes',
        categoriesChartTitle: 'Top Produits',
        usersChartTitle: 'Croissance Utilisateurs',
        salesChartTitle: 'Distribution des Ventes',
        
        // Activities
        recentActivitiesTitle: 'Activités Récentes',
        
        // Navbar
        brandName: 'MyManager',
        myProfileText: 'Mon Profil',
        settingsText: 'Paramètres',
        logoutText: 'Déconnexion',
        
        // Sidebar
        menuTitle: 'Menu',
        dashboardNav: 'Tableau de Bord',
        clientsNav: 'Clients',
        produitsNav: 'Produits',
        commandesNav: 'Commandes',
        utilisateursNav: 'Utilisateurs',
        facturesNav: 'Factures',
        versionText: 'v1.0.0'
    },
    en: {
        // Login Page
        loginTitle: 'MyManager',
        loginSubtitle: 'Professional Backoffice Management',
        usernameLabel: 'Username',
        passwordLabel: 'Password',
        rememberLabel: 'Remember me',
        loginBtn: 'Sign in',
        demoText: 'Demo: User: admin | Password: admin',
        
        // Error Messages
        invalidCredentials: 'Invalid username or password',
        requiredField: 'This field is required',
        
        // Dashboard
        pageTitle: 'Dashboard',
        dashboardTitle: 'Dashboard',
        dashboardDesc: 'Welcome to your dashboard',
        
        // Stats
        totalClientsLabel: 'Total Clients',
        totalProduitsLabel: 'Products',
        totalCommandesLabel: 'Orders',
        totalRevenueLabel: 'Total Revenue',
        totalUsersLabel: 'Active Users',
        
        // Charts
        revenueChartTitle: 'Revenue by Month',
        statusChartTitle: 'Order Status',
        categoriesChartTitle: 'Top Products',
        usersChartTitle: 'User Growth',
        salesChartTitle: 'Sales Distribution',
        
        // Activities
        recentActivitiesTitle: 'Recent Activities',
        
        // Navbar
        brandName: 'MyManager',
        myProfileText: 'My Profile',
        settingsText: 'Settings',
        logoutText: 'Logout',
        
        // Sidebar
        menuTitle: 'Menu',
        dashboardNav: 'Dashboard',
        clientsNav: 'Clients',
        produitsNav: 'Products',
        commandesNav: 'Orders',
        utilisateursNav: 'Users',
        facturesNav: 'Invoices',
        versionText: 'v1.0.0'
    },
    ar: {
        // Login Page
        loginTitle: 'MyManager',
        loginSubtitle: 'إدارة مكتب الظهر الاحترافية',
        usernameLabel: 'اسم المستخدم',
        passwordLabel: 'كلمة المرور',
        rememberLabel: 'تذكرني',
        loginBtn: 'تسجيل الدخول',
        demoText: 'عرض توضيحي: المستخدم: admin | كلمة المرور: admin',
        
        // Error Messages
        invalidCredentials: 'اسم المستخدم أو كلمة المرور غير صحيحة',
        requiredField: 'هذا الحقل مطلوب',
        
        // Dashboard
        pageTitle: 'لوحة التحكم',
        dashboardTitle: 'لوحة التحكم',
        dashboardDesc: 'أهلا بك في لوحة التحكم الخاصة بك',
        
        // Stats
        totalClientsLabel: 'إجمالي العملاء',
        totalProduitsLabel: 'المنتجات',
        totalCommandesLabel: 'الطلبات',
        totalRevenueLabel: 'إجمالي الإيرادات',
        totalUsersLabel: 'المستخدمون النشطون',
        
        // Charts
        revenueChartTitle: 'الإيرادات حسب الشهر',
        statusChartTitle: 'حالة الطلبات',
        categoriesChartTitle: 'أفضل المنتجات',
        usersChartTitle: 'نمو المستخدمين',
        salesChartTitle: 'توزيع المبيعات',
        
        // Activities
        recentActivitiesTitle: 'الأنشطة الأخيرة',
        
        // Navbar
        brandName: 'MyManager',
        myProfileText: 'ملفي الشخصي',
        settingsText: 'الإعدادات',
        logoutText: 'تسجيل الخروج',
        
        // Sidebar
        menuTitle: 'القائمة',
        dashboardNav: 'لوحة التحكم',
        clientsNav: 'العملاء',
        produitsNav: 'المنتجات',
        commandesNav: 'الطلبات',
        utilisateursNav: 'المستخدمون',
        facturesNav: 'الفواتير',
        versionText: 'v1.0.0'
    }
};

// Current language
let currentLanguage = localStorage.getItem('language') || 'fr';

// Set document language
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    // Set HTML lang attribute
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // Update all translatable elements
    updateTranslations();
}

// Update all translations on page
function updateTranslations() {
    const t = translations[currentLanguage];
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[id]').forEach(element => {
        const key = element.id;
        if (t[key]) {
            if (element.tagName === 'INPUT' && element.type === 'text') {
                element.placeholder = t[key];
            } else if (element.tagName === 'INPUT' && element.type === 'password') {
                element.placeholder = t[key];
            } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                element.textContent = t[key];
            } else {
                element.textContent = t[key];
            }
        }
    });
}

// Language switcher setup
function setupLanguageSwitchers() {
    // Login page language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            setLanguage(btn.dataset.lang);
        });
    });
    
    // Navbar language buttons
    document.querySelectorAll('.lang-menu button').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
            document.getElementById('currentLang').textContent = btn.dataset.lang.toUpperCase();
            document.querySelector('.lang-menu').classList.remove('active');
        });
    });
}

// Get translation by key
function t(key) {
    return translations[currentLanguage][key] || key;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLanguage);
    setupLanguageSwitchers();
    
    // Set active language button on login page
    const activeLangBtn = document.querySelector(`.lang-btn[data-lang="${currentLanguage}"]`);
    if (activeLangBtn) {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        activeLangBtn.classList.add('active');
    }
});
