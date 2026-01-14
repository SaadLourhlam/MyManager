// ============================================
// UI MANAGER
// ============================================

class UIManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.setupNavigationListeners();
    }

    setupNavigationListeners() {
        if (!document.body.classList.contains('dashboard-page')) return;

        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                const pageId = item.dataset.page;
                this.navigateToPage(pageId);
            });
        });

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });

            // Close sidebar when clicking on a nav item (mobile)
            navItems.forEach(item => {
                item.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('active');
                    }
                });
            });
        }
    }

    navigateToPage(pageId) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        // Remove active class from all pages
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.remove('active');
        });

        // Add active class to clicked nav item
        const navItem = document.querySelector(`.nav-item[data-page="${pageId}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }

        // Show the page
        const page = document.getElementById(`${pageId}-page`);
        if (page) {
            page.classList.add('active');
            
            // Update page title
            let title = pageId.charAt(0).toUpperCase() + pageId.slice(1);
            document.getElementById('pageTitle').textContent = t(pageId + 'Nav') || title;
        }

        this.currentPage = pageId;
    }

    // Show modal with details
    showModal(title, content) {
        const modal = document.getElementById('detailsModal');
        const modalBody = document.getElementById('modalBody');

        let html = `<h2>${title}</h2>`;
        
        if (typeof content === 'object') {
            for (const [key, value] of Object.entries(content)) {
                if (key !== 'id' && value) {
                    const label = key.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + key.slice(1);
                    html += `
                        <div class="detail-item">
                            <span class="detail-label">${label}</span>
                            <span class="detail-value">${value}</span>
                        </div>
                    `;
                }
            }
        } else {
            html += `<p>${content}</p>`;
        }

        modalBody.innerHTML = html;
        modal.classList.add('active');

        // Close button
        const closeBtn = document.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.onclick = () => this.closeModal();
        }

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        const modal = document.getElementById('detailsModal');
        modal.classList.remove('active');
    }

    // Update statistics cards
    updateStatistics(stats) {
        document.getElementById('totalClients').textContent = stats.totalClients;
        document.getElementById('totalProduits').textContent = stats.totalProduits;
        document.getElementById('totalCommandes').textContent = stats.totalCommandes;
        document.getElementById('totalRevenue').textContent = stats.totalRevenue.toFixed(2) + ' €';
        document.getElementById('totalUsers').textContent = stats.totalUsers;
    }

    // Update activities list
    updateActivities(activities) {
        const list = document.getElementById('activitiesList');
        list.innerHTML = '';

        activities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            item.innerHTML = `
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-content">
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            `;
            list.appendChild(item);
        });
    }

    // Show notification
    showNotification(message, type = 'success', duration = 3000) {
        const container = document.createElement('div');
        container.className = `alert alert-${type}`;
        container.textContent = message;
        
        document.body.insertBefore(container, document.body.firstChild);

        setTimeout(() => {
            container.remove();
        }, duration);
    }
}

// Create global UI manager instance
const uiManager = new UIManager();

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('dashboard-page')) {
        uiManager.setupNavigationListeners();
    }
});
