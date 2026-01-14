// ============================================
// CHARTS MANAGER
// ============================================

class ChartsManager {
    constructor() {
        this.charts = {};
    }

    // Initialize all charts
    initializeCharts() {
        this.createRevenueChart();
        this.createStatusChart();
        this.createCategoriesChart();
        this.createUsersChart();
        this.createSalesChart();
    }

    // Create Revenue Chart
    createRevenueChart() {
        const ctx = document.getElementById('revenueChart');
        if (!ctx) return;

        const data = dataManager.getRevenueChartData();

        this.charts.revenue = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: { size: 12 },
                            color: '#718096'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#718096' },
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    },
                    x: {
                        ticks: { color: '#718096' },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // Create Status Chart
    createStatusChart() {
        const ctx = document.getElementById('statusChart');
        if (!ctx) return;

        const data = dataManager.getStatusChartData();

        this.charts.status = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 12 },
                            color: '#718096',
                            padding: 15
                        }
                    }
                }
            }
        });
    }

    // Create Top Products Chart
    createCategoriesChart() {
        const ctx = document.getElementById('categoriesChart');
        if (!ctx) return;

        const data = dataManager.getTopProductsData();

        this.charts.categories = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: { size: 12 },
                            color: '#718096'
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        ticks: { color: '#718096' },
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    },
                    y: {
                        ticks: { color: '#718096' },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // Create Users Growth Chart
    createUsersChart() {
        const ctx = document.getElementById('usersChart');
        if (!ctx) return;

        const data = dataManager.getUsersGrowthData();

        this.charts.users = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            font: { size: 12 },
                            color: '#718096'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { color: '#718096' },
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    },
                    x: {
                        ticks: { color: '#718096' },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // Create Sales Distribution Chart
    createSalesChart() {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;

        const data = dataManager.getSalesDistributionData();

        this.charts.sales = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 12 },
                            color: '#718096',
                            padding: 15
                        }
                    }
                }
            }
        });
    }

    // Destroy a chart
    destroyChart(chartName) {
        if (this.charts[chartName]) {
            this.charts[chartName].destroy();
            delete this.charts[chartName];
        }
    }

    // Destroy all charts
    destroyAllCharts() {
        Object.keys(this.charts).forEach(chartName => {
            this.destroyChart(chartName);
        });
    }

    // Update chart data
    updateChart(chartName, newData) {
        if (this.charts[chartName]) {
            this.charts[chartName].data = newData;
            this.charts[chartName].update();
        }
    }
}

// Create global charts manager instance
const chartsManager = new ChartsManager();
