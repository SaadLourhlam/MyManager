// ============================================
// DATA MANAGER - Mock Data & API Integration
// ============================================

class DataManager {
    constructor() {
        // Try to load from localStorage first, otherwise generate initial data
        this.clients = this.loadFromStorage('clients') || this.generateClients();
        this.produits = this.loadFromStorage('produits') || this.generateProduits();
        this.commandes = this.loadFromStorage('commandes') || this.generateCommandes();
        this.utilisateurs = this.loadFromStorage('utilisateurs') || this.generateUtilisateurs();
        this.factures = this.loadFromStorage('factures') || this.generateFactures();
        
        // Flag to track data initialization status
        this.isInitialized = false;
    }

    // ============================================
    // ASYNC/AWAIT - API Simulation Methods
    // ============================================

    // Simulates async API call with Promise
    simulateApiDelay(ms = 800) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), ms);
        });
    }

    // Async method to initialize all data (simulates server call)
    async initializeDataAsync() {
        try {
            console.log('📡 Starting async data initialization...');
            
            // Simulate loading from API endpoints
            await this.simulateApiDelay(500);
            console.log('✅ Clients loaded from API');
            
            await this.simulateApiDelay(400);
            console.log('✅ Products loaded from API');
            
            await this.simulateApiDelay(300);
            console.log('✅ Orders loaded from API');
            
            await this.simulateApiDelay(350);
            console.log('✅ Users loaded from API');
            
            await this.simulateApiDelay(250);
            console.log('✅ Invoices loaded from API');
            
            this.isInitialized = true;
            console.log('🎉 All data successfully initialized');
            return { success: true, message: 'Data initialization complete' };
        } catch (error) {
            console.error('❌ Error during async initialization:', error);
            throw new Error('Failed to initialize data: ' + error.message);
        }
    }

    // Async method to fetch statistics
    async getStatisticsAsync() {
        try {
            await this.simulateApiDelay(600);
            return this.getStatistics();
        } catch (error) {
            console.error('❌ Error fetching statistics:', error);
            throw error;
        }
    }

    // Async method to fetch activities
    async getActivitiesAsync() {
        try {
            await this.simulateApiDelay(500);
            return this.getActivities();
        } catch (error) {
            console.error('❌ Error fetching activities:', error);
            throw error;
        }
    }

    // Async CRUD - Add client with Promise chain
    async addClientAsync(clientData) {
        return new Promise((resolve, reject) => {
            try {
                const newClient = {
                    id: Math.max(...this.clients.map(c => c.id), 0) + 1,
                    ...clientData,
                    createdAt: new Date().toLocaleDateString()
                };
                
                this.clients.push(newClient);
                this.saveToStorage('clients', this.clients);
                
                // Simulate API delay
                setTimeout(() => {
                    console.log('✅ Client added successfully via async operation');
                    resolve(newClient);
                }, 400);
            } catch (error) {
                reject(new Error('Failed to add client: ' + error.message));
            }
        });
    }

    // Async CRUD - Update client
    async updateClientAsync(id, updatedData) {
        return new Promise((resolve, reject) => {
            try {
                const client = this.clients.find(c => c.id === id);
                if (!client) {
                    reject(new Error(`Client with id ${id} not found`));
                    return;
                }
                
                Object.assign(client, updatedData);
                this.saveToStorage('clients', this.clients);
                
                setTimeout(() => {
                    console.log('✅ Client updated successfully via async operation');
                    resolve(client);
                }, 400);
            } catch (error) {
                reject(new Error('Failed to update client: ' + error.message));
            }
        });
    }

    // Async CRUD - Delete client
    async deleteClientAsync(id) {
        return new Promise((resolve, reject) => {
            try {
                const index = this.clients.findIndex(c => c.id === id);
                if (index === -1) {
                    reject(new Error(`Client with id ${id} not found`));
                    return;
                }
                
                const deletedClient = this.clients.splice(index, 1)[0];
                this.saveToStorage('clients', this.clients);
                
                setTimeout(() => {
                    console.log('✅ Client deleted successfully via async operation');
                    resolve(deletedClient);
                }, 400);
            } catch (error) {
                reject(new Error('Failed to delete client: ' + error.message));
            }
        });
    }

    // Async method - Fetch all data with Promise.all()
    async fetchAllDataAsync() {
        try {
            console.log('📊 Fetching all data in parallel using Promise.all()...');
            
            const results = await Promise.all([
                this.simulateApiDelay(400).then(() => ({ type: 'clients', count: this.clients.length })),
                this.simulateApiDelay(400).then(() => ({ type: 'produits', count: this.produits.length })),
                this.simulateApiDelay(400).then(() => ({ type: 'commandes', count: this.commandes.length })),
                this.simulateApiDelay(400).then(() => ({ type: 'utilisateurs', count: this.utilisateurs.length })),
                this.simulateApiDelay(400).then(() => ({ type: 'factures', count: this.factures.length }))
            ]);
            
            console.log('✅ All data fetched in parallel:', results);
            return results;
        } catch (error) {
            console.error('❌ Error fetching data in parallel:', error);
            throw error;
        }
    }

    // ============================================
    // STORAGE METHODS
    // ============================================

    loadFromStorage(key) {
        try {
            const data = localStorage.getItem(`mymanager_${key}`);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error(`Error loading ${key} from storage:`, e);
            return null;
        }
    }

    saveToStorage(key, data) {
        try {
            localStorage.setItem(`mymanager_${key}`, JSON.stringify(data));
        } catch (e) {
            console.error(`Error saving ${key} to storage:`, e);
        }
    }

    // ============================================
    // CLIENTS DATA
    // ============================================

    generateClients() {
        return [
            { id: 1, name: 'Industrial Group LTD', email: 'contact@industrialgroup.com', phone: '+33 1 23 45 67 89', city: 'Paris', status: 'actif', createdAt: '2023-10-15' },
            { id: 2, name: 'Mary Roseberg', email: 'mary@company.com', phone: '+33 2 34 56 78 90', city: 'Lyon', status: 'actif', createdAt: '2023-10-10' },
            { id: 3, name: 'Green Corporation LTD', email: 'info@greencorp.com', phone: '+33 3 45 67 89 01', city: 'Marseille', status: 'actif', createdAt: '2023-10-01' },
            { id: 4, name: 'Vienna LTD', email: 'contact@vienna.at', phone: '+43 1 234 567 89', city: 'Vienna', status: 'inactif', createdAt: '2023-09-20' },
            { id: 5, name: 'Jane Brice', email: 'jane.brice@email.com', phone: '+44 20 7946 0958', city: 'London', status: 'actif', createdAt: '2023-09-15' },
            { id: 6, name: 'Nicole Marcus', email: 'nicole.m@company.com', phone: '+33 4 56 78 90 12', city: 'Toulouse', status: 'actif', createdAt: '2023-09-10' },
            { id: 7, name: 'Mathias Perez', email: 'mathias.perez@mail.com', phone: '+33 5 67 89 01 23', city: 'Bordeaux', status: 'en attente', createdAt: '2023-08-25' },
            { id: 8, name: 'Ather Malakoshi', email: 'ather@company.com', phone: '+966 11 234 5678', city: 'Riyadh', status: 'actif', createdAt: '2023-08-20' },
            { id: 9, name: 'Sophie Laurent', email: 'sophie.laurent@tech.fr', phone: '+33 6 12 34 56 78', city: 'Nice', status: 'actif', createdAt: '2023-08-15' },
            { id: 10, name: 'Tech Solutions Inc', email: 'hello@techsolutions.com', phone: '+1 415 555 0123', city: 'San Francisco', status: 'actif', createdAt: '2023-08-10' },
            { id: 11, name: 'David Chen', email: 'david.chen@innovations.com', phone: '+86 10 1234 5678', city: 'Beijing', status: 'actif', createdAt: '2023-08-05' },
            { id: 12, name: 'European Trade Partners', email: 'info@europartners.eu', phone: '+49 30 1234 5678', city: 'Berlin', status: 'en attente', createdAt: '2023-07-28' },
            { id: 13, name: 'Amelia Wilson', email: 'amelia.w@consulting.com', phone: '+61 2 9876 5432', city: 'Sydney', status: 'actif', createdAt: '2023-07-20' },
            { id: 14, name: 'Global Logistics LLC', email: 'contact@globallog.com', phone: '+34 91 123 4567', city: 'Madrid', status: 'actif', createdAt: '2023-07-15' },
            { id: 15, name: 'Marco Rossi', email: 'marco.rossi@design.it', phone: '+39 06 1234 5678', city: 'Rome', status: 'inactif', createdAt: '2023-07-10' },
            { id: 16, name: 'Saad Lourhlam', email: 'saad.lourhlam@mymanager.ma', phone: '212 65231458', city: 'Casablanca', status: 'actif', createdAt: '2024-07-10' }
        ];
    }

    // ============================================
    // PRODUITS DATA
    // ============================================

    generateProduits() {
        return [
            { id: 1, name: 'Laptop Pro', category: 'Électronique', price: 1299.99, stock: 45, description: 'Ordinateur portable haute performance', createdAt: '2023-09-01' },
            { id: 2, name: 'Souris Wireless', category: 'Accessoires', price: 29.99, stock: 200, description: 'Souris sans fil ergonomique', createdAt: '2023-09-05' },
            { id: 3, name: 'Clavier Mécanique', category: 'Accessoires', price: 149.99, stock: 75, description: 'Clavier mécanique RGB', createdAt: '2023-09-10' },
            { id: 4, name: 'Moniteur 4K', category: 'Électronique', price: 599.99, stock: 30, description: 'Écran 4K 27 pouces', createdAt: '2023-09-15' },
            { id: 5, name: 'Casque Audio', category: 'Accessoires', price: 199.99, stock: 120, description: 'Casque Bluetooth de qualité studio', createdAt: '2023-09-20' },
            { id: 6, name: 'USB-C Hub', category: 'Accessoires', price: 79.99, stock: 85, description: 'Hub USB-C multifonction', createdAt: '2023-10-01' },
            { id: 7, name: 'Webcam HD', category: 'Électronique', price: 89.99, stock: 60, description: 'Webcam 1080p avec microphone', createdAt: '2023-10-05' },
            { id: 8, name: 'Support Laptop', category: 'Accessoires', price: 39.99, stock: 150, description: 'Support ergonomique pour ordinateur portable', createdAt: '2023-10-10' },
            { id: 9, name: 'SSD 1TB', category: 'Électronique', price: 99.99, stock: 55, description: 'Disque dur SSD ultra rapide 1TB', createdAt: '2023-10-12' },
            { id: 10, name: 'Batterie Externe', category: 'Accessoires', price: 49.99, stock: 180, description: 'Power bank 20000mAh', createdAt: '2023-10-14' },
            { id: 11, name: 'Tablette Android', category: 'Électronique', price: 399.99, stock: 25, description: 'Tablette 10 pouces Android 12', createdAt: '2023-10-16' },
            { id: 12, name: 'Câble HDMI Pro', category: 'Accessoires', price: 19.99, stock: 300, description: 'Câble HDMI 2.1 haute qualité 3m', createdAt: '2023-10-18' },
            { id: 13, name: 'Écouteurs Wireless', category: 'Accessoires', price: 89.99, stock: 95, description: 'Écouteurs sans fil avec ANC', createdAt: '2023-10-20' },
            { id: 14, name: 'Routeur WiFi 6', category: 'Électronique', price: 179.99, stock: 40, description: 'Routeur WiFi 6 haute vitesse', createdAt: '2023-10-22' },
            { id: 15, name: 'Souris Gaming', category: 'Accessoires', price: 59.99, stock: 110, description: 'Souris gaming RGB avec 8 boutons', createdAt: '2023-10-24' }
        ];
    }

    // ============================================
    // COMMANDES DATA
    // ============================================

    generateCommandes() {
        return [
            { id: 1001, clientId: 1, client: 'Industrial Group LTD', totalAmount: 2599.98, total: 2599.98, status: 'en cours', date: '2023-10-20', items: [{ productId: 1, quantity: 2, price: 1299.99 }] },
            { id: 1002, clientId: 2, client: 'Mary Roseberg', totalAmount: 329.97, total: 329.97, status: 'livrée', date: '2023-10-18', items: [{ productId: 2, quantity: 5, price: 29.99 }, { productId: 3, quantity: 2, price: 149.99 }] },
            { id: 1003, clientId: 3, client: 'Green Corporation LTD', totalAmount: 1279.96, total: 1279.96, status: 'en attente', date: '2023-10-15', items: [{ productId: 4, quantity: 2, price: 599.99 }] },
            { id: 1004, clientId: 4, client: 'Vienna LTD', totalAmount: 599.97, total: 599.97, status: 'annulée', date: '2023-10-10', items: [{ productId: 5, quantity: 3, price: 199.99 }] },
            { id: 1005, clientId: 5, client: 'Jane Brice', totalAmount: 479.96, total: 479.96, status: 'en cours', date: '2023-10-08', items: [{ productId: 6, quantity: 4, price: 79.99 }, { productId: 7, quantity: 2, price: 89.99 }] },
            { id: 1006, clientId: 6, client: 'Nicole Marcus', totalAmount: 1899.90, total: 1899.90, status: 'livrée', date: '2023-10-05', items: [{ productId: 1, quantity: 1, price: 1299.99 }, { productId: 2, quantity: 5, price: 29.99 }, { productId: 8, quantity: 6, price: 39.99 }] },
            { id: 1007, clientId: 7, client: 'Mathias Perez', totalAmount: 849.95, total: 849.95, status: 'en attente', date: '2023-10-01', items: [{ productId: 4, quantity: 1, price: 599.99 }, { productId: 8, quantity: 5, price: 39.99 }] },
            { id: 1008, clientId: 8, client: 'Ather Malakoshi', totalAmount: 369.96, total: 369.96, status: 'livrée', date: '2023-09-28', items: [{ productId: 3, quantity: 2, price: 149.99 }, { productId: 7, quantity: 1, price: 89.99 }] },
            { id: 1009, clientId: 9, client: 'Sophie Laurent', totalAmount: 999.99, total: 999.99, status: 'livrée', date: '2023-09-25', items: [{ productId: 9, quantity: 1, price: 99.99 }, { productId: 10, quantity: 1, price: 49.99 }] },
            { id: 1010, clientId: 10, client: 'Tech Solutions Inc', totalAmount: 2799.97, total: 2799.97, status: 'en cours', date: '2023-09-20', items: [{ productId: 11, quantity: 1, price: 399.99 }, { productId: 14, quantity: 1, price: 179.99 }] },
            { id: 1011, clientId: 11, client: 'David Chen', totalAmount: 459.97, total: 459.97, status: 'livrée', date: '2023-09-18', items: [{ productId: 12, quantity: 5, price: 19.99 }, { productId: 13, quantity: 2, price: 89.99 }] },
            { id: 1012, clientId: 12, client: 'European Trade Partners', totalAmount: 1299.98, total: 1299.98, status: 'en attente', date: '2023-09-15', items: [{ productId: 1, quantity: 1, price: 1299.99 }] },
            { id: 1013, clientId: 13, client: 'Amelia Wilson', totalAmount: 749.95, total: 749.95, status: 'livrée', date: '2023-09-12', items: [{ productId: 15, quantity: 1, price: 59.99 }, { productId: 5, quantity: 1, price: 199.99 }] },
            { id: 1014, clientId: 14, client: 'Global Logistics LLC', totalAmount: 1349.97, total: 1349.97, status: 'en cours', date: '2023-09-10', items: [{ productId: 4, quantity: 2, price: 599.99 }] },
            { id: 1015, clientId: 15, client: 'Marco Rossi', totalAmount: 179.98, total: 179.98, status: 'annulée', date: '2023-09-05', items: [{ productId: 6, quantity: 2, price: 79.99 }] }
        ];
    }

    // ============================================
    // UTILISATEURS DATA
    // ============================================

    generateUtilisateurs() {
        return [
            { id: 1, name: 'Administrator', email: 'admin@mymanager.com', username: 'admin', role: 'admin', department: 'IT', status: 'actif', createdAt: '2023-01-15' },
            { id: 2, name: 'Jean Dupont', email: 'jean.dupont@company.com', username: 'jdupont', role: 'manager', department: 'Sales', status: 'actif', createdAt: '2023-02-20' },
            { id: 3, name: 'Marie Martin', email: 'marie.martin@company.com', username: 'mmartin', role: 'user', department: 'Marketing', status: 'actif', createdAt: '2023-03-10' },
            { id: 4, name: 'Pierre Leclerc', email: 'pierre.leclerc@company.com', username: 'pleclerc', role: 'manager', department: 'Operations', status: 'inactif', createdAt: '2023-04-05' },
            { id: 5, name: 'Sophie Bernard', email: 'sophie.bernard@company.com', username: 'sbernard', role: 'user', department: 'HR', status: 'actif', createdAt: '2023-05-15' },
            { id: 6, name: 'Luc Rousseau', email: 'luc.rousseau@company.com', username: 'lrousseau', role: 'agent', department: 'Support', status: 'actif', createdAt: '2023-06-20' },
            { id: 7, name: 'Anne Petit', email: 'anne.petit@company.com', username: 'apetit', role: 'user', department: 'Finance', status: 'actif', createdAt: '2023-07-10' },
            { id: 8, name: 'Marc Gaston', email: 'marc.gaston@company.com', username: 'mgaston', role: 'manager', department: 'Sales', status: 'actif', createdAt: '2023-08-15' },
            { id: 9, name: 'Isabelle Gérard', email: 'isabelle.gerard@company.com', username: 'igerard', role: 'user', department: 'Marketing', status: 'actif', createdAt: '2023-08-20' },
            { id: 10, name: 'Thomas Blanc', email: 'thomas.blanc@company.com', username: 'tblanc', role: 'manager', department: 'IT', status: 'actif', createdAt: '2023-08-25' },
            { id: 11, name: 'Claire Rousseau', email: 'claire.rousseau@company.com', username: 'crousseau', role: 'agent', department: 'Support', status: 'actif', createdAt: '2023-09-01' },
            { id: 12, name: 'Vincent Moreau', email: 'vincent.moreau@company.com', username: 'vmoreau', role: 'user', department: 'Sales', status: 'inactif', createdAt: '2023-09-05' },
            { id: 13, name: 'Natalie Lefevre', email: 'natalie.lefevre@company.com', username: 'nlefevre', role: 'admin', department: 'IT', status: 'actif', createdAt: '2023-09-10' },
            { id: 14, name: 'Laurent Dupuis', email: 'laurent.dupuis@company.com', username: 'ldupuis', role: 'manager', department: 'Operations', status: 'actif', createdAt: '2023-09-15' },
            { id: 15, name: 'Émilie Gautier', email: 'emilie.gautier@company.com', username: 'egautier', role: 'user', department: 'HR', status: 'actif', createdAt: '2023-09-20' }
        ];
    }

    // ============================================
    // FACTURES DATA
    // ============================================

    generateFactures() {
        return [
            { id: 'FAC-2023-001', commandeId: 1001, clientId: 1, client: 'Industrial Group LTD', amount: 2599.98, status: 'payée', date: '2023-10-20', dueDate: '2023-11-20', description: 'Invoice for order 1001' },
            { id: 'FAC-2023-002', commandeId: 1002, clientId: 2, client: 'Mary Roseberg', amount: 329.97, status: 'payée', date: '2023-10-18', dueDate: '2023-11-18', description: 'Invoice for order 1002' },
            { id: 'FAC-2023-003', commandeId: 1003, clientId: 3, client: 'Green Corporation LTD', amount: 1279.96, status: 'en attente', date: '2023-10-15', dueDate: '2023-11-15', description: 'Invoice for order 1003' },
            { id: 'FAC-2023-004', commandeId: 1004, clientId: 4, client: 'Vienna LTD', amount: 599.97, status: 'annulée', date: '2023-10-10', dueDate: '2023-11-10', description: 'Invoice for order 1004' },
            { id: 'FAC-2023-005', commandeId: 1005, clientId: 5, client: 'Jane Brice', amount: 479.96, status: 'en attente', date: '2023-10-08', dueDate: '2023-11-08', description: 'Invoice for order 1005' },
            { id: 'FAC-2023-006', commandeId: 1006, clientId: 6, client: 'Nicole Marcus', amount: 1899.90, status: 'payée', date: '2023-10-05', dueDate: '2023-11-05', description: 'Invoice for order 1006' },
            { id: 'FAC-2023-007', commandeId: 1007, clientId: 7, client: 'Mathias Perez', amount: 849.95, status: 'en attente', date: '2023-10-01', dueDate: '2023-11-01', description: 'Invoice for order 1007' },
            { id: 'FAC-2023-008', commandeId: 1008, clientId: 8, client: 'Ather Malakoshi', amount: 369.96, status: 'payée', date: '2023-09-28', dueDate: '2023-10-28', description: 'Invoice for order 1008' },
            { id: 'FAC-2023-009', commandeId: 1009, clientId: 9, client: 'Sophie Laurent', amount: 999.99, status: 'payée', date: '2023-09-25', dueDate: '2023-10-25', description: 'Invoice for order 1009' },
            { id: 'FAC-2023-010', commandeId: 1010, clientId: 10, client: 'Tech Solutions Inc', amount: 2799.97, status: 'en attente', date: '2023-09-20', dueDate: '2023-10-20', description: 'Invoice for order 1010' },
            { id: 'FAC-2023-011', commandeId: 1011, clientId: 11, client: 'David Chen', amount: 459.97, status: 'payée', date: '2023-09-18', dueDate: '2023-10-18', description: 'Invoice for order 1011' },
            { id: 'FAC-2023-012', commandeId: 1012, clientId: 12, client: 'European Trade Partners', amount: 1299.98, status: 'en attente', date: '2023-09-15', dueDate: '2023-10-15', description: 'Invoice for order 1012' },
            { id: 'FAC-2023-013', commandeId: 1013, clientId: 13, client: 'Amelia Wilson', amount: 749.95, status: 'payée', date: '2023-09-12', dueDate: '2023-10-12', description: 'Invoice for order 1013' },
            { id: 'FAC-2023-014', commandeId: 1014, clientId: 14, client: 'Global Logistics LLC', amount: 1349.97, status: 'en attente', date: '2023-09-10', dueDate: '2023-10-10', description: 'Invoice for order 1014' },
            { id: 'FAC-2023-015', commandeId: 1015, clientId: 15, client: 'Marco Rossi', amount: 179.98, status: 'annulée', date: '2023-09-05', dueDate: '2023-10-05', description: 'Invoice for order 1015' }
        ];
    }

    // ============================================
    // DATA RETRIEVAL METHODS
    // ============================================

    getStatistics() {
        return {
            totalClients: this.clients.length,
            totalProduits: this.produits.length,
            totalCommandes: this.commandes.length,
            totalUsers: this.utilisateurs.length,
            totalRevenue: this.commandes.reduce((sum, cmd) => sum + cmd.totalAmount, 0),
            ordersInProgress: this.commandes.filter(cmd => cmd.status === 'en cours').length,
            ordersDelivered: this.commandes.filter(cmd => cmd.status === 'livrée').length,
            ordersCompleted: this.commandes.filter(cmd => cmd.status === 'en attente').length
        };
    }

    getActivities() {
        const activities = [];
        this.commandes.slice(-5).reverse().forEach(cmd => {
            const client = this.clients.find(c => c.id === cmd.clientId);
            activities.push({
                type: 'commande',
                icon: '📋',
                text: `Nouvelle commande de ${client.name}`,
                time: cmd.date
            });
        });
        this.factures.slice(-3).reverse().forEach(fac => {
            const client = this.clients.find(c => c.id === fac.clientId);
            activities.push({
                type: 'facture',
                icon: '💰',
                text: `Facture créée pour ${client.name}`,
                time: fac.date
            });
        });
        return activities.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);
    }

    getRevenueChartData() {
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
        const revenues = [4500, 5200, 4800, 6100, 5900, 7200, 6800, 7500, 8100, 8900, 9200, 10100];
        return {
            labels: months,
            datasets: [{
                label: 'Revenu',
                data: revenues,
                borderColor: '#7B2CBF',
                backgroundColor: 'rgba(123, 44, 191, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        };
    }

    getStatusChartData() {
        const statuses = this.commandes.reduce((acc, cmd) => {
            const status = cmd.status;
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});
        const colors = {
            'en cours': '#4A90E2',
            'livrée': '#00FF88',
            'en attente': '#FFB800',
            'annulée': '#FF6B6B'
        };
        return {
            labels: Object.keys(statuses).map(s => s.charAt(0).toUpperCase() + s.slice(1)),
            datasets: [{
                data: Object.values(statuses),
                backgroundColor: Object.keys(statuses).map(s => colors[s]),
                borderColor: '#FFF',
                borderWidth: 2
            }]
        };
    }

    getTopProductsData() {
        const productSales = {};
        this.commandes.forEach(cmd => {
            cmd.items.forEach(item => {
                const product = this.produits.find(p => p.id === item.productId);
                if (product) {
                    if (!productSales[product.name]) {
                        productSales[product.name] = 0;
                    }
                    productSales[product.name] += item.quantity;
                }
            });
        });
        const sorted = Object.entries(productSales).sort((a, b) => b[1] - a[1]).slice(0, 5);
        return {
            labels: sorted.map(item => item[0]),
            datasets: [{
                label: 'Quantités vendues',
                data: sorted.map(item => item[1]),
                backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'],
                borderColor: '#FFF',
                borderWidth: 2
            }]
        };
    }

    getUsersGrowthData() {
        return {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct'],
            datasets: [{
                label: 'Utilisateurs actifs',
                data: [2, 3, 4, 5, 6, 7, 7, 8, 8, 8],
                borderColor: '#43e97b',
                backgroundColor: 'rgba(67, 233, 123, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#43e97b'
            }]
        };
    }

    getSalesDistributionData() {
        const categories = {};
        this.commandes.forEach(cmd => {
            cmd.items.forEach(item => {
                const product = this.produits.find(p => p.id === item.productId);
                if (product) {
                    if (!categories[product.category]) {
                        categories[product.category] = 0;
                    }
                    categories[product.category] += item.quantity * product.price;
                }
            });
        });
        return {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: ['rgba(123, 44, 191, 0.8)', 'rgba(240, 147, 251, 0.8)', 'rgba(79, 172, 254, 0.8)', 'rgba(67, 233, 123, 0.8)'],
                borderColor: '#FFF',
                borderWidth: 2
            }]
        };
    }

    // ============================================
    // DATA CREATION & PERSISTENCE METHODS
    // ============================================

    addClient(clientData) {
        const newClient = {
            id: Math.max(...this.clients.map(c => c.id), 0) + 1,
            name: clientData.name,
            email: clientData.email,
            phone: clientData.phone || '',
            city: clientData.city || '',
            status: clientData.status || 'actif',
            createdAt: new Date().toISOString().split('T')[0],
            dateAdded: new Date().toISOString().split('T')[0]
        };
        this.clients.push(newClient);
        this.saveToStorage('clients', this.clients);
        return newClient;
    }

    addProduit(productData) {
        const newProduct = {
            id: Math.max(...this.produits.map(p => p.id), 0) + 1,
            name: productData.name,
            category: productData.category,
            price: parseFloat(productData.price),
            stock: parseInt(productData.stock),
            description: productData.description || '',
            createdAt: new Date().toISOString().split('T')[0],
            dateAdded: new Date().toISOString().split('T')[0]
        };
        this.produits.push(newProduct);
        this.saveToStorage('produits', this.produits);
        return newProduct;
    }

    addCommande(orderData) {
        const newOrder = {
            id: Math.max(...this.commandes.map(o => o.id), 0) + 1,
            clientId: orderData.clientId || 1,
            client: orderData.client,
            totalAmount: parseFloat(orderData.totalAmount) || 0,
            total: parseFloat(orderData.total) || parseFloat(orderData.totalAmount) || 0,
            status: orderData.status || 'en cours',
            date: orderData.date || new Date().toISOString().split('T')[0],
            items: orderData.items || []
        };
        this.commandes.push(newOrder);
        this.saveToStorage('commandes', this.commandes);
        return newOrder;
    }

    addUtilisateur(userData) {
        const newUser = {
            id: Math.max(...this.utilisateurs.map(u => u.id), 0) + 1,
            name: userData.name,
            email: userData.email,
            username: userData.username || userData.name.toLowerCase().replace(/\s+/g, '.'),
            role: userData.role || 'user',
            department: userData.department || '',
            status: userData.status || 'actif',
            createdAt: new Date().toISOString().split('T')[0],
            dateAdded: new Date().toISOString().split('T')[0]
        };
        this.utilisateurs.push(newUser);
        this.saveToStorage('utilisateurs', this.utilisateurs);
        return newUser;
    }

    addFacture(invoiceData) {
        const newInvoice = {
            id: `FAC-${new Date().getFullYear()}-${String(this.factures.length + 1).padStart(3, '0')}`,
            client: invoiceData.client,
            amount: parseFloat(invoiceData.amount),
            status: invoiceData.status || 'en attente',
            date: invoiceData.date || new Date().toISOString().split('T')[0],
            dueDate: invoiceData.dueDate,
            description: invoiceData.description || '',
            clientId: invoiceData.clientId || 1
        };
        this.factures.push(newInvoice);
        this.saveToStorage('factures', this.factures);
        return newInvoice;
    }

    updateClient(id, clientData) {
        const index = this.clients.findIndex(c => c.id === id);
        if (index !== -1) {
            this.clients[index] = { ...this.clients[index], ...clientData };
            this.saveToStorage('clients', this.clients);
            return this.clients[index];
        }
        return null;
    }

    updateProduit(id, productData) {
        const index = this.produits.findIndex(p => p.id === id);
        if (index !== -1) {
            this.produits[index] = { ...this.produits[index], ...productData };
            this.saveToStorage('produits', this.produits);
            return this.produits[index];
        }
        return null;
    }

    updateCommande(id, orderData) {
        const index = this.commandes.findIndex(o => o.id === id);
        if (index !== -1) {
            this.commandes[index] = { ...this.commandes[index], ...orderData };
            this.saveToStorage('commandes', this.commandes);
            return this.commandes[index];
        }
        return null;
    }

    updateUtilisateur(id, userData) {
        const index = this.utilisateurs.findIndex(u => u.id === id);
        if (index !== -1) {
            this.utilisateurs[index] = { ...this.utilisateurs[index], ...userData };
            this.saveToStorage('utilisateurs', this.utilisateurs);
            return this.utilisateurs[index];
        }
        return null;
    }

    updateFacture(id, invoiceData) {
        const index = this.factures.findIndex(f => f.id === id);
        if (index !== -1) {
            this.factures[index] = { ...this.factures[index], ...invoiceData };
            this.saveToStorage('factures', this.factures);
            return this.factures[index];
        }
        return null;
    }

    deleteClient(id) {
        this.clients = this.clients.filter(c => c.id !== id);
        this.saveToStorage('clients', this.clients);
    }

    deleteProduit(id) {
        this.produits = this.produits.filter(p => p.id !== id);
        this.saveToStorage('produits', this.produits);
    }

    deleteCommande(id) {
        this.commandes = this.commandes.filter(o => o.id !== id);
        this.saveToStorage('commandes', this.commandes);
    }

    deleteUtilisateur(id) {
        this.utilisateurs = this.utilisateurs.filter(u => u.id !== id);
        this.saveToStorage('utilisateurs', this.utilisateurs);
    }

    deleteFacture(id) {
        this.factures = this.factures.filter(f => f.id !== id);
        this.saveToStorage('factures', this.factures);
    }
}

// Create global data manager instance
const dataManager = new DataManager();
