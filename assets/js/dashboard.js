// ============================================
// DASHBOARD INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    if (!document.body.classList.contains('dashboard-page')) return;

    // Initialize dashboard with async/await
    try {
        await initializeDashboardAsync();
    } catch (error) {
        console.error('❌ Dashboard initialization failed:', error);
        showErrorNotification('Failed to load dashboard data');
    }
});

// Async initialization with error handling
async function initializeDashboardAsync() {
    try {
        console.log('🚀 Initializing dashboard...');
        
        // Step 1: Initialize async data loading
        await dataManager.initializeDataAsync();
        
        // Step 2: Load statistics asynchronously
        console.log('📊 Loading statistics...');
        const stats = await dataManager.getStatisticsAsync();
        uiManager.updateStatistics(stats);
        
        // Step 3: Load activities asynchronously
        console.log('📋 Loading activities...');
        const activities = await dataManager.getActivitiesAsync();
        uiManager.updateActivities(activities);
        
        // Step 4: Fetch all data in parallel
        console.log('⚡ Fetching all data in parallel...');
        await dataManager.fetchAllDataAsync();
        
        // Step 5: Initialize charts
        console.log('📈 Initializing charts...');
        setTimeout(() => {
            chartsManager.initializeCharts();
        }, 100);
        
        // Step 6: Set default active page
        uiManager.navigateToPage('dashboard');
        
        // Step 7: Setup mobile sidebar toggle
        setupSidebarToggle();
        
        console.log('✅ Dashboard initialization completed successfully');
    } catch (error) {
        console.error('❌ Error during dashboard initialization:', error);
        throw error;
    }
}

// Fallback synchronous initialization for backward compatibility
function initializeDashboard() {
    // Update statistics
    const stats = dataManager.getStatistics();
    uiManager.updateStatistics(stats);

    // Update activities
    const activities = dataManager.getActivities();
    uiManager.updateActivities(activities);

    // Initialize charts
    setTimeout(() => {
        chartsManager.initializeCharts();
    }, 100);

    // Set default active page
    uiManager.navigateToPage('dashboard');

    // Setup mobile sidebar toggle
    setupSidebarToggle();
}

function setupSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const containerMain = document.querySelector('.container-main');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
            sidebarToggle.classList.toggle('active');
            containerMain.classList.toggle('sidebar-open');
        });

        // Close sidebar when clicking on a nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    sidebarToggle.classList.remove('active');
                    containerMain.classList.remove('sidebar-open');
                }
            });
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                    sidebarToggle.classList.remove('active');
                    containerMain.classList.remove('sidebar-open');
                }
            }
        });

        // Close sidebar on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('active');
                sidebarToggle.classList.remove('active');
                containerMain.classList.remove('sidebar-open');
            }
        });
    }
}

// Responsive handling
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.sidebar').classList.remove('active');
    }
});

// Smooth navigation
document.addEventListener('click', (e) => {
    const navItem = e.target.closest('.nav-item');
    if (navItem) {
        const pageId = navItem.dataset.page;
        uiManager.navigateToPage(pageId);
    }
});

// Handle modal close
document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('.modal-close');
    if (closeBtn) {
        uiManager.closeModal();
    }
});

// Keyboard shortcut - Escape to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('detailsModal');
        if (modal.classList.contains('active')) {
            uiManager.closeModal();
        }
    }
});

// ============================================
// ERROR NOTIFICATION (used by async handlers)
// ============================================

function showErrorNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; color: white; font-weight: 500;">
            <span style="font-size: 18px;">⚠️</span>
            <span>${message}</span>
            <span style="margin-left: auto; cursor: pointer; font-size: 18px;" onclick="this.parentElement.parentElement.remove();">×</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #e53e3e;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation if not already in stylesheet
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-in reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}
