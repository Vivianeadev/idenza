/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — APLICAÇÃO PRINCIPAL
 * ============================================================
 * 
 * Inicializador central do ecossistema Idenza Robotics Academy.
 * Gerencia:
 * - Inicialização do sistema
 * - Gerenciamento de temas
 * - Carregamento de módulos
 * - Partículas de fundo
 * - Loading screen
 * - Configuração global
 * 
 * @namespace IdenzaApp
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaApp = {
    // ============================================================
    // CONFIGURAÇÃO PADRÃO
    // ============================================================
    config: {
        appName: 'Idenza Robotics Academy',
        appVersion: '6.0.0',
        buildDate: '2026',
        defaultModule: 'dashboard',
        defaultTheme: 'luxury',
        rosBridgeUrl: 'ws://localhost:9090',
        mqttBrokerUrl: 'ws://localhost:9001',
        language: 'pt-BR',
        animationsEnabled: true,
        particlesEnabled: true,
        debug: false,
    },

    // ============================================================
    // ESTADO GLOBAL
    // ============================================================
    state: {
        currentModule: null,
        currentTheme: null,
        isMenuOpen: false,
        isSidebarOpen: false,
        isModalOpen: false,
        isSearchOpen: false,
        isLoaded: false,
        rosConnected: false,
        mqttConnected: false,
        systemStatus: 'initializing',
    },

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init(userConfig = {}) {
        // Merge de configurações
        this.config = { ...this.config, ...userConfig };
        this.state.currentTheme = this.config.defaultTheme;
        this.state.currentModule = this.config.defaultModule;

        this.log('🚀 Inicializando Idenza Robotics Academy v' + this.config.appVersion);
        this.log('📦 Configuração:', this.config);

        // Sequência de inicialização
        this.initTheme();
        this.initParticles();
        this.initNavigation();
        this.initSearch();
        this.initSidebar();
        this.initKeyboardShortcuts();
        this.loadModule(this.state.currentModule);
        this.updateSystemStatus('operational');
        this.hideLoadingScreen();

        this.state.isLoaded = true;
        this.log('✅ Idenza Robotics Academy inicializada com sucesso');
        this.emitEvent('idenza:ready', { config: this.config, state: this.state });
    },

    // ============================================================
    // TEMA
    // ============================================================
    initTheme() {
        const savedTheme = this.getStorage('idenza_theme') || this.config.defaultTheme;
        this.setTheme(savedTheme);

        // Event listeners nos botões de tema
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                this.setTheme(theme);
                this.setStorage('idenza_theme', theme);
            });
        });

        this.log('🎨 Tema inicializado:', savedTheme);
    },

    setTheme(theme) {
        // Atualiza data-theme no html
        document.documentElement.setAttribute('data-theme', theme);
        this.state.currentTheme = theme;

        // Atualiza botões de tema
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });

        // Atualiza stylesheet de tema (se existir)
        const themeStylesheet = document.getElementById('theme-stylesheet');
        if (themeStylesheet) {
            themeStylesheet.href = `css/themes/theme-${theme}.css`;
        }

        this.emitEvent('idenza:themeChanged', { theme });
    },

    getCurrentTheme() {
        return this.state.currentTheme;
    },

    // ============================================================
    // PARTÍCULAS DE FUNDO (LUXURY)
    // ============================================================
    initParticles() {
        if (!this.config.particlesEnabled) return;

        const container = document.getElementById('particlesContainer');
        if (!container) return;

        // Verifica preferência de movimento reduzido
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            container.innerHTML = '';
            return;
        }

        // Gera partículas
        const particleCount = 8;
        let particlesHTML = '';

        for (let i = 0; i < particleCount; i++) {
            const size = this.randomBetween(40, 150);
            const left = this.randomBetween(0, 90);
            const duration = this.randomBetween(16, 25);
            const delay = this.randomBetween(0, 15);
            const type = i % 3 === 0 ? 'floatLuxurySlow' : 'floatLuxury';

            particlesHTML += `
                <div class="luxury-particle" 
                     style="
                        width: ${size}px;
                        height: ${size}px;
                        left: ${left}%;
                        animation: ${type} ${duration}s infinite linear;
                        animation-delay: -${delay}s;
                     "
                     aria-hidden="true">
                </div>
            `;
        }

        container.innerHTML = particlesHTML;
        this.log('✨ Partículas de fundo geradas:', particleCount);
    },

    // ============================================================
    // NAVEGAÇÃO
    // ============================================================
    initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        // Toggle menu mobile
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                this.state.isMenuOpen = !this.state.isMenuOpen;
                hamburger.classList.toggle('active', this.state.isMenuOpen);
                navMenu.classList.toggle('open', this.state.isMenuOpen);
                hamburger.setAttribute('aria-expanded', this.state.isMenuOpen);
            });
        }

        // Links de navegação
        document.querySelectorAll('.nav-link[data-module]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const module = link.dataset.module;
                this.loadModule(module);
                this.closeMenu();
            });
        });

        // Fecha menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.state.isMenuOpen && 
                !e.target.closest('.nav-menu') && 
                !e.target.closest('.hamburger')) {
                this.closeMenu();
            }
        });

        // Fecha menu com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isMenuOpen) {
                this.closeMenu();
            }
        });

        this.log('🧭 Navegação inicializada');
    },

    closeMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            this.state.isMenuOpen = false;
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    },

    // ============================================================
    // CARREGAMENTO DE MÓDULOS
    // ============================================================
    loadModule(moduleName) {
        if (this.state.currentModule === moduleName && this.state.isLoaded) {
            return; // Já está no módulo
        }

        this.log('📦 Carregando módulo:', moduleName);
        this.state.currentModule = moduleName;

        // Atualiza navegação ativa
        document.querySelectorAll('.nav-link[data-module]').forEach(link => {
            link.classList.toggle('active', link.dataset.module === moduleName);
        });

        // Atualiza URL (hash)
        window.location.hash = moduleName;

        // Container do módulo
        const container = document.getElementById('moduleContainer');
        if (!container) return;

        // Loading
        container.innerHTML = `
            <div class="module-loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Carregando módulo: <strong>${this.getModuleName(moduleName)}</strong></p>
                <p class="loading-subtext">Idenza Robotics Academy</p>
            </div>
        `;

        // Simula carregamento (em produção, seria fetch do HTML parcial ou inicialização do módulo JS)
        setTimeout(() => {
            this.renderModule(moduleName, container);
        }, 400);
    },

    getModuleName(moduleId) {
        const names = {
            'dashboard': 'Dashboard de Diagnóstico',
            'academy': 'Idenza Academy — Cursos',
            'portfolio': 'Portfólio de Projetos',
            'products': 'Catálogo de Produtos',
            'guides': 'Guias e Tutoriais',
            'diagnostics': 'Ferramenta de Diagnóstico',
            'simulator': 'Simulador de Falhas',
            'marketplace': 'Loja Idenza — Kits',
        };
        return names[moduleId] || moduleId;
    },

    renderModule(moduleName, container) {
        // Tenta chamar o inicializador do módulo específico
        const moduleInitName = `init${moduleName.charAt(0).toUpperCase() + moduleName.slice(1)}`;
        
        if (typeof IdenzaModules !== 'undefined' && typeof IdenzaModules[moduleInitName] === 'function') {
            IdenzaModules[moduleInitName](container);
        } else {
            // Fallback: renderiza placeholder
            container.innerHTML = `
                <div class="panel panel-full animate-fade-in">
                    <div class="panel-header">
                        <i class="fas fa-cube"></i>
                        <h2>${this.getModuleName(moduleName)}</h2>
                        <span class="badge badge-info">IDENZA</span>
                    </div>
                    <div class="empty-state">
                        <i class="fas fa-tools"></i>
                        <h3>Módulo em Construção</h3>
                        <p>O módulo <strong>${this.getModuleName(moduleName)}</strong> está sendo preparado pela equipe Idenza Robotics.</p>
                        <p class="text-muted" style="font-size: var(--text-xs);">Volte em breve para novidades.</p>
                    </div>
                </div>
            `;
        }

        this.emitEvent('idenza:moduleLoaded', { module: moduleName });
    },

    // ============================================================
    // BUSCA GLOBAL
    // ============================================================
    initSearch() {
        const searchOverlay = document.getElementById('searchOverlay');
        const searchInput = document.getElementById('globalSearchInput');

        if (!searchOverlay || !searchInput) return;

        // Abrir busca
        const openSearch = () => {
            this.state.isSearchOpen = true;
            searchOverlay.setAttribute('aria-hidden', 'false');
            searchOverlay.style.display = 'flex';
            setTimeout(() => {
                searchOverlay.style.opacity = '1';
                searchInput.focus();
            }, 10);
            document.body.classList.add('no-scroll');
        };

        // Fechar busca
        const closeSearch = () => {
            this.state.isSearchOpen = false;
            searchOverlay.setAttribute('aria-hidden', 'true');
            searchOverlay.style.opacity = '0';
            setTimeout(() => {
                searchOverlay.style.display = 'none';
            }, 300);
            document.body.classList.remove('no-scroll');
            searchInput.value = '';
            document.getElementById('searchResults').innerHTML = '';
        };

        // Eventos
        searchOverlay.addEventListener('click', (e) => {
            if (e.target === searchOverlay) closeSearch();
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeSearch();
        });

        searchInput.addEventListener('input', this.debounce(() => {
            const query = searchInput.value.trim();
            this.performSearch(query);
        }, 300));

        // Expõe funções globalmente
        window.openIdenzaSearch = openSearch;
        window.closeIdenzaSearch = closeSearch;

        this.log('🔍 Busca global inicializada');
    },

    performSearch(query) {
        const resultsContainer = document.getElementById('searchResults');
        if (!resultsContainer) return;

        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }

        // Busca nos catálogos
        let results = [];
        const catalog = window.IDENZA_PRODUCTS_CATALOG;

        if (catalog) {
            // Busca em todas as categorias
            const categories = ['microcontrollers', 'sbcs', 'robots', 'kits'];
            
            categories.forEach(cat => {
                if (catalog[cat]) {
                    catalog[cat].forEach(item => {
                        if (item.name.toLowerCase().includes(query.toLowerCase()) ||
                            item.description?.toLowerCase().includes(query.toLowerCase()) ||
                            item.manufacturer?.toLowerCase().includes(query.toLowerCase())) {
                            results.push({
                                ...item,
                                category: cat,
                            });
                        }
                    });
                }
            });
        }

        // Renderiza resultados
        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="empty-state" style="padding: var(--space-6);">
                    <i class="fas fa-search"></i>
                    <p>Nenhum resultado para "${query}"</p>
                    <p class="text-muted">Tente outro termo de busca.</p>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = results.slice(0, 10).map(item => `
                <div class="search-result-item" onclick="IdenzaApp.loadModule('products')">
                    <i class="fas fa-microchip"></i>
                    <div>
                        <strong>${item.name}</strong>
                        <small>${item.manufacturer} — ${item.price}</small>
                    </div>
                    <span class="badge badge-gold">${item.category}</span>
                </div>
            `).join('');
        }
    },

    // ============================================================
    // SIDEBAR
    // ============================================================
    initSidebar() {
        // Links de acesso rápido
        document.querySelectorAll('.sidebar-menu a[data-action]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const action = link.dataset.action;
                this.handleSidebarAction(action);
            });
        });

        this.log('📋 Sidebar inicializada');
    },

    handleSidebarAction(action) {
        switch (action) {
            case 'quick-connect-ros':
                this.connectROS();
                break;
            case 'quick-connect-mqtt':
                this.connectMQTT();
                break;
            case 'quick-terminal':
                this.loadModule('terminal');
                break;
            case 'quick-export':
                this.exportReport();
                break;
            default:
                this.log('⚠️ Ação desconhecida:', action);
        }
    },

    // ============================================================
    // INTEGRAÇÕES (STUBS)
    // ============================================================
    connectROS() {
        this.showToast('Conectando ao ROS...', 'info');
        // Será implementado quando ros-bridge.js estiver pronto
        setTimeout(() => {
            this.state.rosConnected = true;
            this.updateROSStatus('connected');
            this.showToast('ROS conectado com sucesso!', 'success');
        }, 1500);
    },

    connectMQTT() {
        this.showToast('Conectando ao broker MQTT...', 'info');
        // Será implementado quando mqtt-client.js estiver pronto
        setTimeout(() => {
            this.state.mqttConnected = true;
            this.updateMQTTStatus('connected');
            this.showToast('MQTT conectado com sucesso!', 'success');
        }, 1200);
    },

    exportReport() {
        this.showToast('Gerando relatório PDF...', 'info');
        setTimeout(() => {
            this.showToast('Relatório exportado com sucesso!', 'success');
        }, 2000);
    },

    // ============================================================
    // ATUALIZAÇÃO DE STATUS
    // ============================================================
    updateSystemStatus(status) {
        this.state.systemStatus = status;
        const dot = document.getElementById('systemStatusDot');
        const label = document.getElementById('systemStatusLabel');

        if (dot && label) {
            dot.className = 'status-dot';
            switch (status) {
                case 'operational':
                    dot.classList.add('status-dot-active');
                    label.textContent = 'Idenza: Operacional';
                    break;
                case 'degraded':
                    dot.classList.add('status-dot-warning');
                    label.textContent = 'Idenza: Degradado';
                    break;
                case 'critical':
                    dot.classList.add('status-dot-critical');
                    label.textContent = 'Idenza: Crítico';
                    break;
                default:
                    dot.classList.add('status-dot-inactive');
                    label.textContent = 'Idenza: ' + status;
            }
        }
    },

    updateROSStatus(status) {
        const dot = document.getElementById('rosStatusDot');
        const label = document.getElementById('rosStatusLabel');
        if (dot && label) {
            dot.className = 'status-dot';
            if (status === 'connected') {
                dot.classList.add('status-dot-ros');
                label.textContent = 'ROS: Conectado';
            } else {
                dot.classList.add('status-dot-inactive');
                label.textContent = 'ROS: Desconectado';
            }
        }
    },

    updateMQTTStatus(status) {
        const dot = document.getElementById('mqttStatusDot');
        const label = document.getElementById('mqttStatusLabel');
        if (dot && label) {
            dot.className = 'status-dot';
            if (status === 'connected') {
                dot.classList.add('status-dot-active');
                label.textContent = 'MQTT: Conectado';
            } else {
                dot.classList.add('status-dot-inactive');
                label.textContent = 'MQTT: Desconectado';
            }
        }
    },

    // ============================================================
    // LOADING SCREEN
    // ============================================================
    hideLoadingScreen() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        }
    },

    showLoadingScreen(message = 'Carregando...') {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.querySelector('.loading-text').textContent = message;
            overlay.style.display = 'flex';
            overlay.classList.remove('hidden');
        }
    },

    // ============================================================
    // TOASTS (NOTIFICAÇÕES)
    // ============================================================
    showToast(message, type = 'info', duration = 4000) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const icons = {
            success: 'fa-check-circle',
            warning: 'fa-exclamation-triangle',
            critical: 'fa-times-circle',
            info: 'fa-info-circle',
        };

        const toast = document.createElement('div');
        toast.className = `toast toast-${type} animate-slide-in-right`;
        toast.innerHTML = `
            <div class="toast-icon"><i class="fas ${icons[type] || icons.info}"></i></div>
            <div class="toast-content">
                <div class="toast-title">${type === 'critical' ? 'Erro' : type === 'warning' ? 'Atenção' : type === 'success' ? 'Sucesso' : 'Informação'}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        container.appendChild(toast);

        // Auto-remove
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    // ============================================================
    // TECLAS DE ATALHO
    // ============================================================
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+K = Busca global
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (typeof window.openIdenzaSearch === 'function') {
                    window.openIdenzaSearch();
                }
            }

            // Ctrl+Shift+T = Trocar tema
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                const themes = ['luxury', 'dark', 'high-contrast'];
                const currentIndex = themes.indexOf(this.state.currentTheme);
                const nextTheme = themes[(currentIndex + 1) % themes.length];
                this.setTheme(nextTheme);
                this.setStorage('idenza_theme', nextTheme);
                this.showToast(`Tema alterado para: ${nextTheme}`, 'info', 2000);
            }

            // Ctrl+Shift+D = Dashboard
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.loadModule('dashboard');
            }
        });

        this.log('⌨️ Atalhos de teclado inicializados');
    },

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    log(...args) {
        if (this.config.debug) {
            console.log('[Idenza]', ...args);
        }
    },

    emitEvent(name, detail = {}) {
        const event = new CustomEvent(name, { detail });
        document.dispatchEvent(event);
        this.log('📡 Evento emitido:', name, detail);
    },

    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // ============================================================
    // STORAGE (LOCALSTORAGE)
    // ============================================================
    setStorage(key, value) {
        try {
            localStorage.setItem(`idenza_${key}`, JSON.stringify(value));
        } catch (e) {
            this.log('⚠️ Erro ao salvar em localStorage:', e);
        }
    },

    getStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(`idenza_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },

    removeStorage(key) {
        localStorage.removeItem(`idenza_${key}`);
    },

    // ============================================================
    // DESTRUIÇÃO (LIMPEZA)
    // ============================================================
    destroy() {
        this.log('🛑 Encerrando Idenza Robotics Academy...');
        this.state.isLoaded = false;
        this.emitEvent('idenza:destroy');
        // Limpa partículas
        const container = document.getElementById('particlesContainer');
        if (container) container.innerHTML = '';
        // Limpa observers, timers, etc.
    },
};

// ============================================================
// INICIALIZAÇÃO AUTOMÁTICA AO CARREGAR A PÁGINA
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Expõe a aplicação globalmente
    window.IdenzaApp = IdenzaApp;
    
    // Inicializa com configurações padrão
    IdenzaApp.init({
        debug: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    });
});

// ============================================================
// EXPORTAÇÃO PARA MÓDULOS (SE USAR BUNDLER)
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaApp;
}
