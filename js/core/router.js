/* ============================================================
   NEXUS ROBOTICS ACADEMY v6.0
   ARQUIVO: js/core/router.js
   DESCRIÇÃO: Router SPA — navegação entre módulos com
              lazy loading, histórico e guardas de rota
   ============================================================ */

class NexusRouter {
  constructor(app) {
    this.app = app;
    this.routes = new Map();
    this.currentRoute = null;
    this.previousRoute = null;
    this.guards = [];
    this.loadingTemplate = `
      <div class="route-loading">
        <div class="spinner spinner-lg"></div>
        <p class="text-muted">Carregando módulo...</p>
      </div>`;
    this.errorTemplate = (msg) => `
      <div class="empty-state">
        <i class="fas fa-exclamation-triangle text-warning"></i>
        <h4>Erro ao carregar</h4>
        <p>${msg || 'Módulo não encontrado.'}</p>
        <button class="btn btn-secondary" onclick="window.nexusRouter.navigate('dashboard')">
          <i class="fas fa-home"></i> Voltar ao Dashboard
        </button>
      </div>`;
  }

  /**
   * Inicializa o router
   */
  init() {
    this._registerDefaultRoutes();
    this._listenPopState();
    this._handleInitialRoute();

    // Disponibiliza globalmente
    window.nexusRouter = this;
  }

  /**
   * Registra rotas padrão
   */
  _registerDefaultRoutes() {
    // Dashboard (rota inicial)
    this.register('dashboard', {
      title: 'Dashboard — ROS-IoT Sentinel',
      icon: 'fa-tachometer-alt',
      module: 'dashboard',
      container: '#module-content',
      lazyLoad: () => this._loadModuleHTML('modules/dashboard.html'),
      onActivate: () => this._initDashboard(),
    });

    // Academy
    this.register('academy', {
      title: 'Academy — Cursos e Trilhas',
      icon: 'fa-graduation-cap',
      module: 'academy',
      container: '#module-content',
      lazyLoad: () => this._loadModuleHTML('modules/academy.html'),
      onActivate: () => this._initAcademy(),
    });

    // Portfolio
    this.register('portfolio', {
      title: 'Portfólio — Projetos',
      icon: 'fa-briefcase',
      module: 'portfolio',
      container: '#module-content',
      lazyLoad: () => this._loadModuleHTML('modules/portfolio.html'),
      onActivate: () => this._initPortfolio(),
    });

    // Arduino Guide
    this.register('arduino', {
      title: 'Guia Arduino — Conexão & Projetos',
      icon: 'fa-plug',
      module: 'arduino',
      container: '#module-content',
      lazyLoad: () => this._loadModuleHTML('modules/arduino-guide.html'),
    });

    // ROS Guide
    this.register('ros-guide', {
      title: 'Guia ROS 2 — Do Zero ao Avançado',
      icon: 'fa-cogs',
      module: 'ros-guide',
      container: '#module-content',
      lazyLoad: () => this._loadModuleHTML('modules/ros-guide.html'),
    });

    // IoT Guide
    this.register('iot-guide', {
      title: 'Guia IoT — Sensores & Conectividade',
      icon: 'fa-microchip',
      module: 'iot-guide',
      container: '#module-content',
      lazyLoad: () => this._loadModuleHTML('modules/iot-guide.html'),
    });

    // AI Guide
    this.register('ai-guide', {
      title: 'Guia IA — Visão & Linguagem Natural',
      icon: 'fa-brain',
      module: 'ai-guide',
      container: '#module-content',
      lazyLoad: () => this._loadModuleHTML('modules/ai-guide.html'),
    });

    // Diagnostics
    this.register('diagnostics', {
      title: 'Diagnóstico — Análise de Falhas',
      icon: 'fa-stethoscope',
      module: 'diagnostics',
      container: '#module-content',
      lazyLoad: () => this._loadModuleHTML('modules/diagnostics.html'),
      onActivate: () => this._initDiagnostics(),
    });

    // Simulator
    this.register('simulator', {
      title: 'Simulador de Falhas',
      icon: 'fa-flask',
      module: 'simulator',
      container: '#module-content',
      lazyLoad: () => this._loadModuleHTML('modules/simulator.html'),
    });

    // Settings
    this.register('settings', {
      title: 'Configurações',
      icon: 'fa-cog',
      module: 'settings',
      container: '#module-content',
      lazyLoad: () => this._loadModuleHTML('modules/settings.html'),
    });

    // About
    this.register('about', {
      title: 'Sobre a Nexus Robotics',
      icon: 'fa-building',
      module: 'about',
      container: '#module-content',
      lazyLoad: () => this._loadModuleHTML('modules/about.html'),
    });
  }

  /**
   * Registra uma nova rota
   */
  register(path, config) {
    this.routes.set(path, {
      path,
      title: config.title || path,
      icon: config.icon || 'fa-circle',
      module: config.module || path,
      container: config.container || '#module-content',
      lazyLoad: config.lazyLoad || null,
      onActivate: config.onActivate || null,
      onDeactivate: config.onDeactivate || null,
      guard: config.guard || null,
      data: config.data || {},
    });
  }

  /**
   * Navega para uma rota
   */
  async navigate(path, params = {}) {
    const route = this.routes.get(path);
    if (!route) {
      console.error(`Rota não encontrada: ${path}`);
      this.navigate('dashboard');
      return;
    }

    // Guarda de rota
    if (route.guard && !route.guard()) {
      this.app.showToast('Acesso negado a este módulo', 'warning', 'fa-lock');
      return;
    }

    // Guardas globais
    for (const guard of this.guards) {
      if (!guard(route)) return;
    }

    // Desativa rota anterior
    if (this.currentRoute?.onDeactivate) {
      this.currentRoute.onDeactivate();
    }

    // Salva histórico
    this.previousRoute = this.currentRoute;

    // Mostra loading
    const container = document.querySelector(route.container);
    if (container) {
      container.innerHTML = this.loadingTemplate;
    }

    // Carrega módulo (lazy)
    try {
      if (route.lazyLoad) {
        const html = await route.lazyLoad();
        if (container) {
          container.innerHTML = html;
        }
      }
    } catch (error) {
      console.error(`Erro ao carregar módulo ${path}:`, error);
      if (container) {
        container.innerHTML = this.errorTemplate(error.message);
      }
    }

    // Atualiza estado
    this.currentRoute = route;
    document.title = `${route.title} | Nexus Robotics Academy v6.0`;

    // Atualiza URL
    const url = new URL(window.location);
    url.hash = `#/${path}`;
    if (params && Object.keys(params).length > 0) {
      url.search = new URLSearchParams(params).toString();
    }
    window.history.pushState({ route: path, params }, route.title, url);

    // Ativa callbacks
    if (route.onActivate) {
      setTimeout(() => route.onActivate(), 100);
    }

    // Atualiza navegação ativa
    this._updateActiveNav(path);

    // Dispara evento
    this.app.eventBus.emit('route:changed', {
      path,
      route,
      previous: this.previousRoute?.path,
    });

    // Scroll para o topo
    document.querySelector('#module-content')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  /**
   * Escuta mudanças no histórico do navegador
   */
  _listenPopState() {
    window.addEventListener('popstate', (event) => {
      if (event.state?.route) {
        this.navigate(event.state.route, event.state.params || {});
      }
    });
  }

  /**
   * Trata a rota inicial (hash ou padrão)
   */
  _handleInitialRoute() {
    const hash = window.location.hash;
    if (hash.startsWith('#/')) {
      const routeName = hash.slice(2).split('?')[0];
      if (this.routes.has(routeName)) {
        this.navigate(routeName);
        return;
      }
    }
    // Rota padrão
    this.navigate('dashboard');
  }

  /**
   * Atualiza link ativo na navegação
   */
  _updateActiveNav(path) {
    document.querySelectorAll('.nav-link, .sidebar-item').forEach(link => {
      link.classList.remove('active');
    });

    // Sidebar
    const sidebarLink = document.querySelector(`.sidebar-item[data-route="${path}"]`);
    sidebarLink?.classList.add('active');

    // Navbar
    const navLink = document.querySelector(`.nav-link[data-route="${path}"]`);
    navLink?.classList.add('active');

    // Tabs (se houver)
    const tabBtn = document.querySelector(`.tab-btn[data-route="${path}"]`);
    tabBtn?.classList.add('active');
  }

  /**
   * Adiciona guarda global
   */
  addGuard(guardFn) {
    this.guards.push(guardFn);
  }

  /**
   * Carrega HTML de módulo (simulação para desenvolvimento)
   */
  async _loadModuleHTML(modulePath) {
    // Tenta carregar via fetch
    try {
      const response = await fetch(modulePath);
      if (response.ok) {
        return await response.text();
      }
    } catch (e) {
      console.warn(`Fetch falhou para ${modulePath}, usando conteúdo embutido.`);
    }

    // Fallback: conteúdo embutido
    return this._getEmbeddedContent(modulePath);
  }

  /**
   * Conteúdo embutido para desenvolvimento (fallback)
   */
  _getEmbeddedContent(modulePath) {
    const embedded = {
      'modules/dashboard.html': `
        <div class="dashboard-grid">
          <div class="card dashboard-full">
            <div class="card-header">
              <i class="fas fa-heartbeat"></i>
              <h3>System State Summary</h3>
              <span class="badge badge-warning">SIMULAÇÃO</span>
            </div>
            <p class="text-muted">Dashboard carregado com sucesso via Router SPA.</p>
            <p class="text-tiny">Módulo: dashboard | Rota: #/dashboard</p>
          </div>
        </div>`,
      'modules/academy.html': `
        <div class="dashboard-grid">
          <div class="card dashboard-full">
            <div class="card-header">
              <i class="fas fa-graduation-cap"></i>
              <h3>Robotics Academy</h3>
              <span class="badge badge-success">5 TRILHAS</span>
            </div>
            <p class="text-muted">Academy carregada com sucesso via Router SPA.</p>
            <p class="text-tiny">Módulo: academy | Rota: #/academy</p>
          </div>
        </div>`,
      'modules/portfolio.html': `
        <div class="dashboard-grid">
          <div class="card dashboard-full">
            <div class="card-header">
              <i class="fas fa-briefcase"></i>
              <h3>Portfólio de Projetos</h3>
              <span class="badge badge-info">200+ PROJETOS</span>
            </div>
            <p class="text-muted">Portfólio carregado com sucesso via Router SPA.</p>
            <p class="text-tiny">Módulo: portfolio | Rota: #/portfolio</p>
          </div>
        </div>`,
    };

    return embedded[modulePath] || `
      <div class="empty-state">
        <i class="fas fa-cube"></i>
        <h4>Módulo: ${modulePath}</h4>
        <p>Conteúdo será carregado aqui. Conecte ao backend para dados reais.</p>
      </div>`;
  }

  /**
   * Inicializadores de módulos
   */
  _initDashboard() {
    if (typeof NEXUS_PRODUCTS_CATALOG !== 'undefined') {
      console.log('Dashboard: catálogo de produtos disponível');
    }
  }

  _initAcademy() {
    if (typeof NEXUS_COURSES_CURRICULUM !== 'undefined') {
      console.log('Academy:', NEXUS_COURSES_CURRICULUM.getTotalLessons(), 'aulas disponíveis');
    }
  }

  _initPortfolio() {
    if (typeof NEXUS_PROJECTS_DATABASE !== 'undefined') {
      console.log('Portfólio:', NEXUS_PROJECTS_DATABASE.getTotalCount().total, 'projetos disponíveis');
    }
  }

  _initDiagnostics() {
    console.log('Diagnóstico: sistema de análise de falhas ativo');
  }

  /**
   * Retorna informações da rota atual
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * Lista todas as rotas registradas
   */
  listRoutes() {
    return Array.from(this.routes.entries()).map(([path, config]) => ({
      path,
      title: config.title,
      icon: config.icon,
      module: config.module,
    }));
  }
}

// Exportação
export default NexusRouter;

/* ============================================================
   FIM DO ARQUIVO: js/core/router.js
   PRÓXIMO: js/core/state.js
   ============================================================ */
