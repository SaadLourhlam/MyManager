// ============================================
// ADVANCED JAVASCRIPT FEATURES DEMO
// ============================================

/**
 * This file demonstrates:
 * 1. Promises and Promise chains
 * 2. Async/Await patterns
 * 3. Error handling with try/catch/finally
 * 4. Promise.all(), Promise.race(), Promise.any()
 * 5. DOM Manipulation with async operations
 */

class AdvancedFeaturesDemo {
    // ============================================
    // 1. BASIC PROMISES
    // ============================================

    /**
     * Promise Example 1: Simple API call simulation
     * Demonstrates: Promise constructor, resolve/reject
     */
    static fetchUserData(userId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (userId > 0) {
                    resolve({
                        id: userId,
                        name: `User ${userId}`,
                        email: `user${userId}@example.com`,
                        timestamp: new Date().toISOString()
                    });
                } else {
                    reject(new Error('Invalid user ID'));
                }
            }, 1000);
        });
    }

    /**
     * Promise Example 2: Promise chain with .then().catch().finally()
     */
    static getUserWithChain(userId) {
        return this.fetchUserData(userId)
            .then(user => {
                console.log('✅ User fetched:', user);
                return { ...user, processed: true };
            })
            .catch(error => {
                console.error('❌ Error fetching user:', error.message);
                return { error: error.message };
            })
            .finally(() => {
                console.log('🔔 Promise chain completed');
            });
    }

    /**
     * Promise Example 3: Nested Promise chains
     */
    static fetchUserAndPosts(userId) {
        return this.fetchUserData(userId)
            .then(user => {
                console.log('📍 User fetched, now fetching posts...');
                return this.fetchUserPosts(userId)
                    .then(posts => ({ user, posts }));
            })
            .catch(error => {
                console.error('❌ Error in chain:', error);
                throw error;
            });
    }

    static fetchUserPosts(userId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, title: 'First Post', userId },
                    { id: 2, title: 'Second Post', userId }
                ]);
            }, 800);
        });
    }

    // ============================================
    // 2. ASYNC/AWAIT PATTERNS
    // ============================================

    /**
     * Async/Await Example 1: Simple async function
     * Demonstrates: async/await, try/catch
     */
    static async fetchUserAsync(userId) {
        try {
            console.log('🔄 Fetching user...');
            const user = await this.fetchUserData(userId);
            console.log('✅ User loaded:', user);
            return user;
        } catch (error) {
            console.error('❌ Error:', error.message);
            return null;
        }
    }

    /**
     * Async/Await Example 2: Multiple sequential async calls
     */
    static async fetchUserAndPostsAsync(userId) {
        try {
            console.log('🔄 Fetching user...');
            const user = await this.fetchUserData(userId);
            
            console.log('🔄 Fetching posts...');
            const posts = await this.fetchUserPosts(userId);
            
            console.log('✅ All data fetched');
            return { user, posts };
        } catch (error) {
            console.error('❌ Error:', error.message);
            throw error;
        } finally {
            console.log('🔔 Async operation completed');
        }
    }

    /**
     * Async/Await Example 3: Parallel async calls with Promise.all()
     */
    static async fetchMultipleUsersParallel(userIds) {
        try {
            console.log('⚡ Fetching multiple users in parallel...');
            const promises = userIds.map(id => this.fetchUserData(id));
            const users = await Promise.all(promises);
            console.log('✅ All users fetched:', users.length);
            return users;
        } catch (error) {
            console.error('❌ Error fetching users:', error.message);
            return [];
        }
    }

    /**
     * Async/Await Example 4: Sequential async operations with loop
     */
    static async fetchUsersSequential(userIds) {
        const users = [];
        
        try {
            for (const id of userIds) {
                console.log(`🔄 Fetching user ${id}...`);
                const user = await this.fetchUserData(id);
                users.push(user);
            }
            console.log('✅ All users fetched sequentially');
            return users;
        } catch (error) {
            console.error('❌ Error:', error.message);
            return users;
        }
    }

    // ============================================
    // 3. PROMISE COMBINATORS
    // ============================================

    /**
     * Promise.all() - Wait for all promises
     * Returns on first rejection
     */
    static async demonstratePromiseAll() {
        try {
            console.log('🔔 Promise.all() - Waiting for all...');
            const results = await Promise.all([
                this.fetchUserData(1),
                this.fetchUserData(2),
                this.fetchUserData(3)
            ]);
            console.log('✅ All promises resolved:', results.length);
            return results;
        } catch (error) {
            console.error('❌ Promise.all failed:', error.message);
            return [];
        }
    }

    /**
     * Promise.race() - Return first resolved promise
     */
    static async demonstratePromiseRace() {
        try {
            console.log('🔔 Promise.race() - Waiting for first...');
            const result = await Promise.race([
                this.fetchUserData(1),
                this.fetchUserData(2)
            ]);
            console.log('✅ First promise resolved:', result.id);
            return result;
        } catch (error) {
            console.error('❌ Promise.race failed:', error.message);
            return null;
        }
    }

    /**
     * Promise.allSettled() - Wait for all to settle (resolve or reject)
     */
    static async demonstratePromiseAllSettled() {
        try {
            console.log('🔔 Promise.allSettled() - Waiting for all to settle...');
            const results = await Promise.allSettled([
                this.fetchUserData(1),
                this.fetchUserData(-1), // This will reject
                this.fetchUserData(3)
            ]);
            
            const fulfilled = results.filter(r => r.status === 'fulfilled').length;
            const rejected = results.filter(r => r.status === 'rejected').length;
            
            console.log(`✅ Results - Fulfilled: ${fulfilled}, Rejected: ${rejected}`);
            return results;
        } catch (error) {
            console.error('❌ Promise.allSettled failed:', error.message);
            return [];
        }
    }

    // ============================================
    // 4. ADVANCED ASYNC PATTERNS
    // ============================================

    /**
     * Async function with timeout
     */
    static async fetchWithTimeout(userId, timeoutMs = 5000) {
        return Promise.race([
            this.fetchUserData(userId),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
            )
        ]);
    }

    /**
     * Async function with retry logic
     */
    static async fetchUserWithRetry(userId, maxRetries = 3) {
        for (let i = 0; i < maxRetries; i++) {
            try {
                console.log(`🔄 Attempt ${i + 1}/${maxRetries}...`);
                const user = await this.fetchUserData(userId);
                console.log('✅ Success on attempt', i + 1);
                return user;
            } catch (error) {
                if (i === maxRetries - 1) {
                    console.error('❌ All attempts failed');
                    throw error;
                }
                console.warn(`⚠️ Attempt ${i + 1} failed, retrying...`);
                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    /**
     * Async generator function
     */
    static async *fetchUsersGenerator(userIds) {
        for (const id of userIds) {
            try {
                const user = await this.fetchUserData(id);
                yield user;
            } catch (error) {
                console.error(`❌ Error fetching user ${id}:`, error.message);
            }
        }
    }

    // ============================================
    // 5. DOM MANIPULATION WITH ASYNC
    // ============================================

    /**
     * Async function that updates DOM
     */
    static async updateDOMWithUserData(elementId, userId) {
        const element = document.getElementById(elementId);
        
        try {
            // Show loading state
            element.innerHTML = '<p style="color: #666;">⏳ Loading...</p>';
            
            // Fetch data asynchronously
            const user = await this.fetchUserData(userId);
            
            // Update DOM
            element.innerHTML = `
                <div style="padding: 15px; background: #f7fafc; border-radius: 8px;">
                    <h3 style="margin: 0 0 10px 0; color: #2d3748;">👤 ${user.name}</h3>
                    <p style="margin: 5px 0; color: #718096;">📧 ${user.email}</p>
                    <p style="margin: 5px 0; color: #a0aec0; font-size: 12px;">
                        ⏰ ${new Date(user.timestamp).toLocaleString()}
                    </p>
                </div>
            `;
            
            console.log('✅ DOM updated successfully');
        } catch (error) {
            element.innerHTML = `
                <div style="padding: 15px; background: #fed7d7; border-radius: 8px; color: #c53030;">
                    <strong>❌ Error:</strong> ${error.message}
                </div>
            `;
            console.error('❌ Error updating DOM:', error);
        }
    }

    /**
     * Async function with DOM manipulation chain
     */
    static async updateMultipleElements(elementIds, userIds) {
        try {
            const promises = elementIds.map((id, index) =>
                this.updateDOMWithUserData(id, userIds[index] || 1)
            );
            
            await Promise.all(promises);
            console.log('✅ All elements updated');
        } catch (error) {
            console.error('❌ Error updating multiple elements:', error);
        }
    }
}

// ============================================
// TESTING & DEMO EXECUTION
// ============================================

/**
 * Run all demo functions with controlled timing
 */
function runAdvancedFeaturesDemo() {
    console.clear();
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('   ADVANCED JAVASCRIPT FEATURES DEMONSTRATION');
    console.log('═══════════════════════════════════════════════════════════════\n');

    // Run demos sequentially with delays
    (async () => {
        try {
            // 1. Basic Promises
            console.log('\n--- 1. BASIC PROMISES ---\n');
            await AdvancedFeaturesDemo.getUserWithChain(1);
            
            await new Promise(r => setTimeout(r, 2000));
            
            // 2. Async/Await
            console.log('\n--- 2. ASYNC/AWAIT ---\n');
            await AdvancedFeaturesDemo.fetchUserAsync(2);
            
            await new Promise(r => setTimeout(r, 2000));
            
            // 3. Multiple Sequential Calls
            console.log('\n--- 3. SEQUENTIAL ASYNC CALLS ---\n');
            await AdvancedFeaturesDemo.fetchUserAndPostsAsync(3);
            
            await new Promise(r => setTimeout(r, 2000));
            
            // 4. Parallel Calls with Promise.all()
            console.log('\n--- 4. PARALLEL CALLS (Promise.all) ---\n');
            await AdvancedFeaturesDemo.fetchMultipleUsersParallel([1, 2, 3]);
            
            await new Promise(r => setTimeout(r, 2000));
            
            // 5. Promise.race()
            console.log('\n--- 5. PROMISE.RACE() ---\n');
            await AdvancedFeaturesDemo.demonstratePromiseRace();
            
            await new Promise(r => setTimeout(r, 2000));
            
            // 6. Promise.allSettled()
            console.log('\n--- 6. PROMISE.ALLSETTLED() ---\n');
            await AdvancedFeaturesDemo.demonstratePromiseAllSettled();
            
            await new Promise(r => setTimeout(r, 2000));
            
            // 7. Retry Logic
            console.log('\n--- 7. ASYNC WITH RETRY LOGIC ---\n');
            await AdvancedFeaturesDemo.fetchUserWithRetry(1, 2);
            
            console.log('\n═══════════════════════════════════════════════════════════════');
            console.log('   DEMONSTRATION COMPLETED');
            console.log('═══════════════════════════════════════════════════════════════\n');
            
        } catch (error) {
            console.error('❌ Demo execution failed:', error);
        }
    })();
}

// Export for global access
window.AdvancedFeaturesDemo = AdvancedFeaturesDemo;
window.runAdvancedFeaturesDemo = runAdvancedFeaturesDemo;
