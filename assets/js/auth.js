// ============================================
// AUTHENTICATION MANAGER
// ============================================

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.checkAuth();
    }

    // Check if user is authenticated
    checkAuth() {
        const token = sessionStorage.getItem('authToken');
        const user = sessionStorage.getItem('currentUser');
        
        if (token && user) {
            this.currentUser = JSON.parse(user);
        } else if (document.body.classList.contains('dashboard-page')) {
            // Redirect to login if on dashboard but not authenticated
            this.logout();
        }
    }

    // Login user
    login(username, password) {
        // Demo credentials
        if (username === 'admin' && password === 'admin') {
            const user = {
                id: 1,
                username: 'admin',
                email: 'admin@mymanager.com',
                name: 'Administrator',
                role: 'admin',
                avatar: 'A'
            };
            
            // Store in session storage
            sessionStorage.setItem('authToken', 'demo-token-' + Date.now());
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            
            this.currentUser = user;
            return { success: true, message: 'Login successful' };
        }
        
        return { success: false, message: translations[currentLanguage].invalidCredentials };
    }

    // Logout user
    logout() {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('currentUser');
        this.currentUser = null;
        window.location.href = 'index.html';
    }

    // Get current user
    getUser() {
        return this.currentUser;
    }

    // Update user avatar
    updateUserAvatar() {
        const avatarElements = document.querySelectorAll('.user-avatar');
        if (this.currentUser) {
            avatarElements.forEach(el => {
                el.textContent = this.currentUser.avatar;
            });
        }
    }

    // Update user name in navbar
    updateUserName() {
        const userNameElements = document.querySelectorAll('#userName');
        if (this.currentUser) {
            userNameElements.forEach(el => {
                el.textContent = this.currentUser.name;
            });
        }
    }
}

// Create global auth instance
const auth = new AuthManager();

// ============================================
// LOGIN PAGE LOGIC
// ============================================

if (document.body.classList.contains('login-page')) {
    document.addEventListener('DOMContentLoaded', () => {
        const loginForm = document.getElementById('loginForm');
        const errorAlert = document.getElementById('loginError');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // Clear previous errors
            errorAlert.style.display = 'none';
            errorAlert.textContent = '';

            // Validate fields
            if (!username || !password) {
                errorAlert.textContent = t('requiredField');
                errorAlert.style.display = 'block';
                return;
            }

            // Attempt login
            const result = auth.login(username, password);

            if (result.success) {
                // Show success message
                errorAlert.style.background = '#EFE';
                errorAlert.style.borderLeftColor = '#00FF88';
                errorAlert.style.color = '#00AA00';
                errorAlert.textContent = 'Connexion réussie. Redirection...';
                errorAlert.style.display = 'block';

                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                // Show error message
                errorAlert.textContent = result.message;
                errorAlert.style.display = 'block';
            }
        });
    });
}

// ============================================
// DASHBOARD PAGE LOGIC
// ============================================

if (document.body.classList.contains('dashboard-page')) {
    document.addEventListener('DOMContentLoaded', () => {
        // Update user info
        auth.updateUserAvatar();
        auth.updateUserName();

        // Logout handler
        const logoutLink = document.getElementById('logoutLink');
        if (logoutLink) {
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                auth.logout();
            });
        }

        // Language toggle
        const langToggle = document.querySelector('.lang-toggle');
        const langMenu = document.querySelector('.lang-menu');

        if (langToggle && langMenu) {
            langToggle.addEventListener('click', () => {
                langMenu.classList.toggle('active');
            });

            langMenu.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', () => {
                    const lang = btn.dataset.lang;
                    setLanguage(lang);
                    document.getElementById('currentLang').textContent = lang.toUpperCase();
                    langMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.language-dropdown')) {
                    langMenu.classList.remove('active');
                }
            });
        }

        // User menu toggle
        const userMenuToggle = document.querySelector('.user-menu-toggle');
        const userMenu = document.querySelector('.user-menu');

        if (userMenuToggle && userMenu) {
            userMenuToggle.addEventListener('click', () => {
                userMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.user-dropdown')) {
                    userMenu.classList.remove('active');
                }
            });
        }
    });
}
