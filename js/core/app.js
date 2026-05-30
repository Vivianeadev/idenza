/* ============================================================
   NEXUS ROBOTICS ACADEMY v6.0
   ARQUIVO: js/core/app.js
   DESCRIÇÃO: Inicializador do sistema — temas, Service Worker,
              bootstrap, eventos globais e ciclo de vida
   ============================================================ */

class NexusApp {
  constructor() {
    this.version = '6.0.0';
    this.buildDate = '2026-05-30';
    this.state = {
      theme: 'luxury',        // luxury | dark | high-contrast | print
      sidebarOpen: false,
      currentModule: 'dashboard',
      user: null,
      loading: false,
      toastQueue: [],
    };

    this.modules = new Map();
    this.eventBus = new NexusEventBus();
    this.router = null;
    this.stateManager = null;

    // Singleton
    if (NexusApp.instance) return NexusApp.instance;
    NexusApp.instance = this;
  }

  /**
   * Inicializa o sistema completo
   */
  async init() {
    console.log(`%c🚀 Nexus Robotics Academy v${this.version} %ciniciando...`,
      'color: #D4AF37; font-size: 1.2em; font-weight: bold;',
      'color: #aaa;');

    this._showBootSequence();
    this._loadSavedTheme();
    this._initCoreModules();
    this._registerGlobalEvents();
    this._initServiceWorker();
    this._startLuxuryParticles();
    this._initKeyboardShortcuts();
    this._checkSystemStatus();

    console.log(`%c✅ Sistema pronto em ${performance.now().toFixed(0)}ms`,
      'color: #2e7d32; font-weight: bold;');
  }

  /**
   * Sequência de boot visual
   */
  _showBootSequence() {
    const bootOverlay = document.createElement('div');
    bootOverlay.className = 'boot-overlay';
    bootOverlay.innerHTML = `
      <div class="boot-logo">
        <i class="fas fa-robot"></i>
        <span>NEXUS ROBOTICS</span>
      </div>
      <div class="boot-progress">
        <div class="boot-bar"></div>
      </div>
    `;
    document.body.appendChild(bootOverlay);

    setTimeout(() => {
      bootOverlay.classList.add('fade-out');
      setTimeout(() => bootOverlay.remove(), 500);
    }, 1200);
  }

  /**
   * Carrega tema salvo ou usa padrão
   */
  _loadSavedTheme() {
    const saved = localStorage.getItem('nexus-theme') || 'luxury';
    this.setTheme(saved);
  }

  /**
   * Define o tema ativo
   */
  setTheme(themeName) {
    const validThemes = ['luxury', 'dark', 'high-contrast', 'print'];
    if (!validThemes.includes(themeName)) themeName = 'luxury';

    // Remove temas anteriores
    document.documentElement.classList.remove(
      'theme-luxury', 'theme-dark', 'theme-high-contrast', 'theme-print'
    );

    // Aplica novo tema
    document.documentElement.classList.add(`theme-${themeName}`);
    this.state.theme = themeName;
    localStorage.setItem('nexus-theme', themeName);

    // Dispara evento
    this.eventBus.emit('theme:changed', { theme: themeName });

    // Atualiza ícone do theme switcher se existir
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      const icons = {
        'luxury': 'fa-sun',
        'dark': 'fa-moon',
        'high-contrast': 'fa-adjust',
        'print': 'fa-print',
      };
      themeIcon.className = `fas ${icons[themeName] || 'fa-sun'}`;
    }
  }

  /**
   * Inicializa módulos core
   */
  _initCoreModules() {
    // State Manager
    if (typeof NexusStateManager !== 'undefined') {
      this.stateManager = new NexusStateManager(this);
      this.stateManager.init();
    }

    // Router
    if (typeof NexusRouter !== 'undefined') {
      this.router = new NexusRouter(this);
      this.router.init();
    }

    // Registra módulos de UI
    this._initUIModules();
  }

  /**
   * Inicializa componentes de UI
   */
  _initUIModules() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        document.querySelector('.main-content')?.classList.toggle('collapsed');
        this.eventBus.emit('sidebar:toggled', {
          collapsed: sidebar.classList.contains('collapsed')
        });
      });
    }

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        mobileOverlay?.classList.toggle('active');
        document.body.classList.toggle('has-scroll-locked');
      });

      mobileOverlay?.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        mobileOverlay.classList.remove('active');
        document.body.classList.remove('has-scroll-locked');
      });
    }

    // Theme switcher
    const themeBtns = document.querySelectorAll('[data-theme]');
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.setTheme(btn.dataset.theme);
      });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }
    }, { passive: true });

    // Close modals on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  }

  /**
   * Eventos globais
   */
  _registerGlobalEvents() {
    // Resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.eventBus.emit('window:resized', {
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 250);
    }, { passive: true });

    // Online/Offline
    window.addEventListener('online', () => {
      this.showToast('Conexão restaurada', 'success', 'fa-wifi');
    });
    window.addEventListener('offline', () => {
      this.showToast('Modo offline ativado', 'warning', 'fa-wifi');
    });

    // Erros não capturados
    window.addEventListener('error', (e) => {
      console.error('Erro global:', e.error);
      this.showToast('Ocorreu um erro inesperado', 'critical', 'fa-exclamation-circle');
    });

    // Promessas não tratadas
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Promise rejeitada:', e.reason);
    });
  }

  /**
   * Service Worker para PWA
   */
  _initServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('📦 SW registrado:', reg.scope))
        .catch(err => console.warn('SW falhou:', err));
    }
  }

  /**
   * Partículas de luxo no fundo
   */
  _startLuxuryParticles() {
    const container = document.querySelector('.luxury-particles');
    if (!container) return;

    // Garante que existem pelo menos 8 partículas
    const currentCount = container.querySelectorAll('.luxury-particle').length;
    for (let i = currentCount; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'luxury-particle';
      particle.style.setProperty('--duration', `${15 + Math.random() * 15}s`);
      particle.style.setProperty('--delay', `-${Math.random() * 15}s`);
      particle.style.left = `${Math.random() * 90}%`;
      particle.style.width = particle.style.height = `${40 + Math.random() * 120}px`;
      container.appendChild(particle);
    }
  }

  /**
   * Atalhos de teclado
   */
  _initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl+K = busca global
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openGlobalSearch();
      }

      // Ctrl+B = toggle sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        document.getElementById('sidebar-toggle')?.click();
      }

      // Ctrl+Shift+T = alterna tema
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        const themes = ['luxury', 'dark', 'high-contrast'];
        const currentIndex = themes.indexOf(this.state.theme);
        const next = themes[(currentIndex + 1) % themes.length];
        this.setTheme(next);
      }
    });
  }

  /**
   * Verifica status do sistema
   */
  _checkSystemStatus() {
    // Simula verificação de conexão com ROS
    const rosConnected = Math.random() > 0.3;
    const mqttConnected = Math.random() > 0.2;

    this.eventBus.emit('system:status', {
      ros: rosConnected,
      mqtt: mqttConnected,
      memory: performance.memory?.usedJSHeapSize || 0,
      online: navigator.onLine,
    });

    if (!rosConnected) {
      setTimeout(() => {
        this.showToast('ROS Master não detectado — modo simulação', 'warning', 'fa-exclamation-triangle');
      }, 2000);
    }
  }

  /**
   * Abre busca global (Ctrl+K)
   */
  openGlobalSearch() {
    // Remove busca existente
    document.querySelector('.global-search-overlay')?.remove();

    const overlay = document.createElement('div');
    overlay.className = 'global-search-overlay';
    overlay.innerHTML = `
      <div class="global-search-modal">
        <div class="global-search-input-wrapper">
          <i class="fas fa-search"></i>
          <input type="text" class="global-search-input" placeholder="Buscar produtos, projetos, cursos..." autofocus>
          <kbd>ESC</kbd>
        </div>
        <div class="global-search-results"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    const input = overlay.querySelector('.global-search-input');
    const results = overlay.querySelector('.global-search-results');

    input.addEventListener('input', () => {
      const query = input.value.trim();
      if (query.length < 2) {
        results.innerHTML = '<p class="search-hint">Digite pelo menos 2 caracteres...</p>';
        return;
      }

      // Busca nos catálogos
      const found = this._searchAll(query);
      results.innerHTML = found.length > 0
        ? found.slice(0, 10).map(item => `
            <div class="search-result-item" data-id="${item.id}">
              <i class="fas ${item.icon || 'fa-cube'}"></i>
              <div>
                <strong>${item.name || item.title}</strong>
                <small>${item.category || item.type || ''}</small>
              </div>
              <span class="search-result-badge">${item.level || item.difficulty || ''}</span>
            </div>
          `).join('')
        : '<p class="search-hint">Nenhum resultado encontrado.</p>';
    });

    // Fecha no ESC ou clique fora
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
    document.addEventListener('keydown', function closeOnEsc(e) {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', closeOnEsc);
      }
    });
  }

  /**
   * Busca em todos os catálogos
   */
  _searchAll(query) {
    const results = [];

    if (typeof NEXUS_PRODUCTS_CATALOG !== 'undefined') {
      const allProducts = [
        ...NEXUS_PRODUCTS_CATALOG.microcontrollers,
        ...NEXUS_PRODUCTS_CATALOG.sbcs,
        ...NEXUS_PRODUCTS_CATALOG.robots,
        ...NEXUS_PRODUCTS_CATALOG.actuators,
        ...NEXUS_PRODUCTS_CATALOG.kits,
      ];
      results.push(...allProducts.filter(p =>
        p.name?.toLowerCase().includes(query.toLowerCase())
      ).map(p => ({ ...p, icon: 'fa-microchip', category: p.manufacturer })));
    }

    if (typeof NEXUS_PROJECTS_DATABASE !== 'undefined') {
      const allProjects = [
        ...NEXUS_PROJECTS_DATABASE.beginner,
        ...NEXUS_PROJECTS_DATABASE.intermediate,
        ...NEXUS_PROJECTS_DATABASE.advanced,
        ...NEXUS_PROJECTS_DATABASE.specialist,
      ];
      results.push(...allProjects.filter(p =>
        p.title?.toLowerCase().includes(query.toLowerCase())
      ).map(p => ({ ...p, icon: p.icon, category: p.category })));
    }

    return results;
  }

  /**
   * Sistema de Toast
   */
  showToast(message, type = 'info', icon = 'fa-info-circle') {
    const container = document.querySelector('.toast-container') || this._createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="fas ${icon}"></i>
      <div class="toast-body">
        <div class="toast-title">${type.toUpperCase()}</div>
        <div class="toast-message">${message}</div>
      </div>
      <span class="toast-close">&times;</span>
    `;

    // Fechar no clique
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    });

    container.appendChild(toast);

    // Auto-remover após 5 segundos
    setTimeout(() => {
      if (toast.parentNode) {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
      }
    }, 5000);
  }

  _createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
  }

  /**
   * Fecha todos os modais
   */
  closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.remove('active');
    });
    document.querySelectorAll('.overlay.active').forEach(overlay => {
      overlay.classList.remove('active');
    });
  }

  /**
   * Registra um módulo
   */
  registerModule(name, moduleInstance) {
    this.modules.set(name, moduleInstance);
  }

  /**
   * Obtém um módulo
   */
  getModule(name) {
    return this.modules.get(name);
  }
}

// ==========================================
// EVENT BUS (Padrão Observer)
// ==========================================
class NexusEventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.off(event, callback); // Retorna unsubscribe
  }

  off(event, callback) {
    this.listeners.get(event)?.delete(callback);
  }

  emit(event, data) {
    this.listeners.get(event)?.forEach(cb => {
      try { cb(data); } catch (e) { console.error(`Erro no evento ${event}:`, e); }
    });
  }

  once(event, callback) {
    const wrapper = (data) => {
      callback(data);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }
}

// ==========================================
// INICIALIZAÇÃO AUTOMÁTICA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  window.nexusApp = new NexusApp();
  window.nexusApp.init();

  // Disponibiliza globalmente
  window.NexusEventBus = NexusEventBus;
});

// Exportação
export { NexusApp, NexusEventBus };

/* ============================================================
   FIM DO ARQUIVO: js/core/app.js
   PRÓXIMO: js/core/router.js
   ============================================================ */
