/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — COMPONENTE NAVBAR
 * ============================================================
 * 
 * Gerencia a barra de navegação principal:
 * - Links de navegação com estado ativo
 * - Menu mobile (hamburger)
 * - Indicadores de status do sistema
 * - Dropdowns e submenus
 * - Scroll spy (destaca link conforme rolagem)
 * 
 * @component Navbar
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaNavbar = {
    // ============================================================
    // CONFIGURAÇÃO
    // ============================================================
    config: {
        scrollThreshold: 100,
        activeLinkClass: 'active',
        scrolledClass: 'scrolled',
        openClass: 'open',
    },

    elements: {
        header: null,
        hamburger: null,
        navMenu: null,
        navLinks: null,
        statusIndicators: null,
    },

    state: {
        isOpen: false,
        isScrolled: false,
        activeLink: null,
    },

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init() {
        this._cacheElements();
        if (!this.elements.header) return;

        this._bindEvents();
        this._initScrollSpy();
        this._updateActiveLink();
        this._updateStatusIndicators();

        // Escuta mudanças de módulo
        IdenzaEvents.on('idenza:moduleLoaded', (data) => {
            this.setActiveLink(data.module);
        });

        // Escuta mudanças de status
        IdenzaEvents.on('idenza:robotStatusChanged', (data) => {
            this._updateStatusIndicators(data.status);
        });

        // Escuta conexões
        IdenzaEvents.on('idenza:rosConnected', () => {
            this._updateConnectionIndicator('ros', true);
        });

        IdenzaEvents.on('idenza:rosDisconnected', () => {
            this._updateConnectionIndicator('ros', false);
        });

        IdenzaEvents.on('idenza:mqttConnected', () => {
            this._updateConnectionIndicator('mqtt', true);
        });

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaNavbar] Componente inicializado');
        }
    },

    // ============================================================
    // CACHE DE ELEMENTOS DOM
    // ============================================================
    _cacheElements() {
        this.elements.header = document.getElementById('mainHeader');
        this.elements.hamburger = document.getElementById('hamburger');
        this.elements.navMenu = document.getElementById('navMenu');
        this.elements.navLinks = document.querySelectorAll('.nav-link[data-module]');
        this.elements.statusIndicators = {
            system: document.getElementById('systemStatusDot'),
            systemLabel: document.getElementById('systemStatusLabel'),
            ros: document.getElementById('rosStatusDot'),
            rosLabel: document.getElementById('rosStatusLabel'),
            mqtt: document.getElementById('mqttStatusDot'),
            mqttLabel: document.getElementById('mqttStatusLabel'),
        };
    },

    // ============================================================
    // EVENTOS
    // ============================================================
    _bindEvents() {
        // Toggle menu mobile
        if (this.elements.hamburger) {
            this.elements.hamburger.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Links de navegação
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const module = link.dataset.module;
                if (module) {
                    e.preventDefault();
                    this.navigateTo(module);
                }
            });
        });

        // Fecha menu ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.state.isOpen) {
                this.closeMenu();
            }
        });

        // Scroll spy
        window.addEventListener('scroll', () => {
            this._onScroll();
        });

        // Fecha menu com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isOpen) {
                this.closeMenu();
            }
        });

        // Fecha menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.state.isOpen &&
                !e.target.closest('.nav-menu') &&
                !e.target.closest('.hamburger')) {
                this.closeMenu();
            }
        });
    },

    // ============================================================
    // MENU MOBILE
    // ============================================================
    toggleMenu() {
        if (this.state.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    },

    openMenu() {
        this.state.isOpen = true;
        this.elements.hamburger?.classList.add('active');
        this.elements.navMenu?.classList.add(this.config.openClass);
        this.elements.hamburger?.setAttribute('aria-expanded', 'true');
        document.body.classList.add('no-scroll');
        IdenzaEvents.emit('idenza:menuOpened');
    },

    closeMenu() {
        this.state.isOpen = false;
        this.elements.hamburger?.classList.remove('active');
        this.elements.navMenu?.classList.remove(this.config.openClass);
        this.elements.hamburger?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
        IdenzaEvents.emit('idenza:menuClosed');
    },

    // ============================================================
    // NAVEGAÇÃO
    // ============================================================
    navigateTo(module) {
        this.closeMenu();
        this.setActiveLink(module);

        if (IdenzaApp && typeof IdenzaApp.loadModule === 'function') {
            IdenzaApp.loadModule(module);
        } else if (IdenzaRouter && typeof IdenzaRouter.navigate === 'function') {
            IdenzaRouter.navigate(module);
        }
    },

    setActiveLink(module) {
        this.state.activeLink = module;

        this.elements.navLinks.forEach(link => {
            const isActive = link.dataset.module === module;
            link.classList.toggle(this.config.activeLinkClass, isActive);

            // Atualiza aria-current para acessibilidade
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        IdenzaEvents.emit('idenza:navLinkChanged', { module });
    },

    // ============================================================
    // SCROLL SPY
    // ============================================================
    _initScrollSpy() {
        this.state.isScrolled = window.scrollY > this.config.scrollThreshold;
        this._updateHeaderScrollState();
    },

    _onScroll() {
        const isScrolled = window.scrollY > this.config.scrollThreshold;

        if (isScrolled !== this.state.isScrolled) {
            this.state.isScrolled = isScrolled;
            this._updateHeaderScrollState();
        }
    },

    _updateHeaderScrollState() {
        if (this.state.isScrolled) {
            this.elements.header?.classList.add(this.config.scrolledClass);
        } else {
            this.elements.header?.classList.remove(this.config.scrolledClass);
        }
    },

    // ============================================================
    // ATUALIZAR LINK ATIVO (BASEADO NA ROTA ATUAL)
    // ============================================================
    _updateActiveLink() {
        const hash = window.location.hash.replace('#', '') || 'dashboard';
        const module = hash.split('/')[0];
        this.setActiveLink(module);
    },

    // ============================================================
    // INDICADORES DE STATUS
    // ============================================================
    _updateStatusIndicators(robotStatus = null) {
        const indicators = this.elements.statusIndicators;

        // Status do sistema
        if (indicators.system && indicators.systemLabel) {
            const status = robotStatus || IdenzaState?.get('diagnostic.robotStatus') || 'operational';
            indicators.system.className = 'status-dot';

            switch (status) {
                case 'operational':
                    indicators.system.classList.add('status-dot-active');
                    indicators.systemLabel.textContent = 'Idenza: Operacional';
                    break;
                case 'degraded':
                    indicators.system.classList.add('status-dot-warning');
                    indicators.systemLabel.textContent = 'Idenza: Degradado';
                    break;
                case 'critical':
                case 'stopped':
                    indicators.system.classList.add('status-dot-critical');
                    indicators.systemLabel.textContent = 'Idenza: Crítico';
                    break;
                default:
                    indicators.system.classList.add('status-dot-inactive');
                    indicators.systemLabel.textContent = 'Idenza: ' + status;
            }
        }

        // Status ROS
        if (indicators.ros && indicators.rosLabel) {
            const rosConnected = IdenzaState?.get('connections.ros.connected') || false;
            indicators.ros.className = 'status-dot';
            if (rosConnected) {
                indicators.ros.classList.add('status-dot-ros');
                indicators.rosLabel.textContent = 'ROS: Conectado';
            } else {
                indicators.ros.classList.add('status-dot-inactive');
                indicators.rosLabel.textContent = 'ROS: Desconectado';
            }
        }

        // Status MQTT
        if (indicators.mqtt && indicators.mqttLabel) {
            const mqttConnected = IdenzaState?.get('connections.mqtt.connected') || false;
            indicators.mqtt.className = 'status-dot';
            if (mqttConnected) {
                indicators.mqtt.classList.add('status-dot-active');
                indicators.mqttLabel.textContent = 'MQTT: Conectado';
            } else {
                indicators.mqtt.classList.add('status-dot-inactive');
                indicators.mqttLabel.textContent = 'MQTT: Desconectado';
            }
        }
    },

    _updateConnectionIndicator(type, connected) {
        const indicators = this.elements.statusIndicators;

        if (type === 'ros' && indicators.ros && indicators.rosLabel) {
            indicators.ros.className = 'status-dot';
            if (connected) {
                indicators.ros.classList.add('status-dot-ros');
                indicators.rosLabel.textContent = 'ROS: Conectado';
            } else {
                indicators.ros.classList.add('status-dot-inactive');
                indicators.rosLabel.textContent = 'ROS: Desconectado';
            }
        }

        if (type === 'mqtt' && indicators.mqtt && indicators.mqttLabel) {
            indicators.mqtt.className = 'status-dot';
            if (connected) {
                indicators.mqtt.classList.add('status-dot-active');
                indicators.mqttLabel.textContent = 'MQTT: Conectado';
            } else {
                indicators.mqtt.classList.add('status-dot-inactive');
                indicators.mqttLabel.textContent = 'MQTT: Desconectado';
            }
        }
    },

    // ============================================================
    // ESCONDER / MOSTRAR HEADER
    // ============================================================
    hide() {
        if (this.elements.header) {
            this.elements.header.style.transform = 'translateY(-100%)';
        }
    },

    show() {
        if (this.elements.header) {
            this.elements.header.style.transform = 'translateY(0)';
        }
    },

    // ============================================================
    // DESTRUIÇÃO
    // ============================================================
    destroy() {
        this.closeMenu();
        this.elements = {};
        this.state = {
            isOpen: false,
            isScrolled: false,
            activeLink: null,
        };
    },
};

// ============================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    IdenzaNavbar.init();
    window.IdenzaNavbar = IdenzaNavbar;
});

// ============================================================
// EXPORTAÇÃO
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaNavbar;
}
