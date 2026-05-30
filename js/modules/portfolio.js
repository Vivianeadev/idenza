/* ============================================================
   NEXUS ROBOTICS ACADEMY v6.0
   ARQUIVO: js/modules/portfolio.js
   DESCRIÇÃO: Gerenciador de portfólio — projetos com BOM,
              busca, filtros, visualização detalhada e exportação
   ============================================================ */

class NexusPortfolio {
  constructor(app) {
    this.app = app;
    this.projects = [];
    this.filteredProjects = [];
    this.activeProject = null;
    this.filters = {
      level: 'all',
      maxCost: Infinity,
      tag: 'all',
      search: '',
      difficulty: 'all',
    };
    this.sortBy = 'title';
    this.sortOrder = 'asc';
    this.viewMode = 'grid'; // grid | list
    this.subscribers = new Set();
  }

  /**
   * Inicializa o portfólio
   */
  init() {
    this._loadProjects();
    this._applyFilters();
    console.log(`📁 Portfólio carregado: ${this.projects.length} projetos`);
  }

  /**
   * Carrega projetos do banco de dados
   */
  _loadProjects() {
    if (typeof NEXUS_PROJECTS_DATABASE !== 'undefined') {
      const db = NEXUS_PROJECTS_DATABASE;
      this.projects = [
        ...db.beginner.map(p => ({ ...p, levelCategory: 'iniciante' })),
        ...db.intermediate.map(p => ({ ...p, levelCategory: 'intermediario' })),
        ...db.advanced.map(p => ({ ...p, levelCategory: 'avancado' })),
        ...db.specialist.map(p => ({ ...p, levelCategory: 'especialista' })),
      ];
    } else {
      // Dados mockados para desenvolvimento
      this.projects = this._getMockProjects();
    }
  }

  /**
   * Aplica filtros e ordenação
   */
  _applyFilters() {
    let result = [...this.projects];

    // Filtro por nível
    if (this.filters.level !== 'all') {
      result = result.filter(p => p.levelCategory === this.filters.level);
    }

    // Filtro por dificuldade numérica
    if (this.filters.difficulty !== 'all') {
      const diff = parseInt(this.filters.difficulty);
      result = result.filter(p => p.difficulty === diff);
    }

    // Filtro por custo máximo
    if (this.filters.maxCost < Infinity) {
      result = result.filter(p => {
        const cost = parseFloat(p.totalCost?.replace(/[$,]/g, '') || '0');
        return cost <= this.filters.maxCost;
      });
    }

    // Filtro por tag
    if (this.filters.tag !== 'all') {
      result = result.filter(p =>
        p.tags?.some(t => t.toLowerCase().includes(this.filters.tag.toLowerCase()))
      );
    }

    // Busca textual
    if (this.filters.search.trim()) {
      const query = this.filters.search.toLowerCase();
      result = result.filter(p =>
        p.title?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query) ||
        p.tags?.some(t => t.toLowerCase().includes(query)) ||
        p.category?.toLowerCase().includes(query)
      );
    }

    // Ordenação
    result.sort((a, b) => {
      let valA, valB;

      switch (this.sortBy) {
        case 'title':
          valA = a.title?.toLowerCase() || '';
          valB = b.title?.toLowerCase() || '';
          break;
        case 'cost':
          valA = parseFloat(a.totalCost?.replace(/[$,]/g, '') || '0');
          valB = parseFloat(b.totalCost?.replace(/[$,]/g, '') || '0');
          break;
        case 'difficulty':
          valA = a.difficulty || 0;
          valB = b.difficulty || 0;
          break;
        case 'duration':
          valA = a.duration || '';
          valB = b.duration || '';
          break;
        default:
          valA = a.title || '';
          valB = b.title || '';
      }

      if (valA < valB) return this.sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredProjects = result;
    this._notifySubscribers();
  }

  /**
   * Define filtro
   */
  setFilter(filterKey, value) {
    if (this.filters.hasOwnProperty(filterKey)) {
      this.filters[filterKey] = value;
      this._applyFilters();
    }
  }

  /**
   * Define múltiplos filtros de uma vez
   */
  setFilters(filtersObj) {
    Object.assign(this.filters, filtersObj);
    this._applyFilters();
  }

  /**
   * Reseta todos os filtros
   */
  resetFilters() {
    this.filters = {
      level: 'all',
      maxCost: Infinity,
      tag: 'all',
      search: '',
      difficulty: 'all',
    };
    this._applyFilters();
  }

  /**
   * Define ordenação
   */
  setSort(sortBy, sortOrder = 'asc') {
    this.sortBy = sortBy;
    this.sortOrder = sortOrder;
    this._applyFilters();
  }

  /**
   * Alterna modo de visualização
   */
  setViewMode(mode) {
    this.viewMode = mode;
    this._notifySubscribers();
  }

  /**
   * Abre detalhes de um projeto
   */
  openProject(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      this.activeProject = project;
      this._notifySubscribers();

      // Dispara evento
      this.app?.eventBus?.emit('portfolio:projectOpened', { project });

      // Navega para hash do projeto
      window.location.hash = `#/portfolio/${projectId}`;
    }
  }

  /**
   * Fecha detalhes do projeto
   */
  closeProject() {
    this.activeProject = null;
    this._notifySubscribers();
    window.location.hash = '#/portfolio';
  }

  /**
   * Busca projeto por ID
   */
  getProjectById(id) {
    return this.projects.find(p => p.id === id) || null;
  }

  /**
   * Retorna projetos relacionados
   */
  getRelatedProjects(project, limit = 3) {
    if (!project) return [];
    return this.projects
      .filter(p =>
        p.id !== project.id &&
        (p.levelCategory === project.levelCategory ||
         p.tags?.some(t => project.tags?.includes(t)))
      )
      .slice(0, limit);
  }

  /**
   * Obtém todas as tags únicas
   */
  getAllTags() {
    const tagSet = new Set();
    this.projects.forEach(p => {
      p.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }

  /**
   * Obtém contagem por nível
   */
  getCountByLevel() {
    return {
      iniciante: this.projects.filter(p => p.levelCategory === 'iniciante').length,
      intermediario: this.projects.filter(p => p.levelCategory === 'intermediario').length,
      avancado: this.projects.filter(p => p.levelCategory === 'avancado').length,
      especialista: this.projects.filter(p => p.levelCategory === 'especialista').length,
      total: this.projects.length,
    };
  }

  /**
   * Obtém estatísticas
   */
  getStats() {
    const costs = this.projects
      .map(p => parseFloat(p.totalCost?.replace(/[$,]/g, '') || '0'))
      .filter(c => c > 0);

    return {
      totalProjects: this.projects.length,
      avgCost: costs.length > 0 ? costs.reduce((a, b) => a + b, 0) / costs.length : 0,
      minCost: costs.length > 0 ? Math.min(...costs) : 0,
      maxCost: costs.length > 0 ? Math.max(...costs) : 0,
      avgDifficulty: this.projects.reduce((sum, p) => sum + (p.difficulty || 0), 0) / this.projects.length,
      mostUsedTags: this._getMostUsedTags(5),
    };
  }

  /**
   * Tags mais usadas
   */
  _getMostUsedTags(limit = 5) {
    const tagCount = {};
    this.projects.forEach(p => {
      p.tags?.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([tag, count]) => ({ tag, count }));
  }

  /**
   * Exporta projeto como JSON
   */
  exportProject(projectId) {
    const project = this.getProjectById(projectId);
    if (!project) return null;

    const exportData = {
      exportDate: new Date().toISOString(),
      nexusVersion: '6.0',
      project,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus-project-${project.id}.json`;
    a.click();
    URL.revokeObjectURL(url);

    return exportData;
  }

  /**
   * Exporta BOM como CSV
   */
  exportBOMAsCSV(projectId) {
    const project = this.getProjectById(projectId);
    if (!project?.bom) return;

    const headers = ['Item', 'Quantidade', 'Preço Unitário'];
    const rows = project.bom.map(item => [item.item, item.qty, item.price]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexus-bom-${project.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Inscreve para atualizações
   */
  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.getState());
    return () => this.subscribers.delete(callback);
  }

  /**
   * Notifica assinantes
   */
  _notifySubscribers() {
    const state = this.getState();
    this.subscribers.forEach(cb => {
      try { cb(state); } catch (e) { console.error('Subscriber error:', e); }
    });
  }

  /**
   * Retorna estado atual
   */
  getState() {
    return {
      projects: this.filteredProjects,
      totalProjects: this.projects.length,
      filteredCount: this.filteredProjects.length,
      activeProject: this.activeProject,
      filters: { ...this.filters },
      sortBy: this.sortBy,
      sortOrder: this.sortOrder,
      viewMode: this.viewMode,
      stats: this.getStats(),
      counts: this.getCountByLevel(),
      allTags: this.getAllTags(),
      relatedProjects: this.activeProject ? this.getRelatedProjects(this.activeProject) : [],
    };
  }

  /**
   * Projetos mockados (fallback)
   */
  _getMockProjects() {
    return [
      {
        id: "proj-mock-001",
        title: "LED Piscante — Seu Primeiro Circuito",
        level: "iniciante",
        levelCategory: "iniciante",
        duration: "30 min",
        difficulty: 1,
        icon: "fa-lightbulb",
        category: "Eletrônica Básica",
        tags: ["Arduino", "LED", "Resistor"],
        description: "O 'Hello World' da eletrônica.",
        bom: [
          { item: "Arduino Uno R4 WiFi", qty: 1, price: "$27.50" },
          { item: "LED Vermelho 5mm", qty: 3, price: "$0.50" },
        ],
        totalCost: "$28.00",
      },
      {
        id: "proj-mock-002",
        title: "Robô Seguidor de Linha com PID",
        level: "intermediario",
        levelCategory: "intermediario",
        duration: "8 horas",
        difficulty: 3,
        icon: "fa-robot",
        category: "Robótica Móvel",
        tags: ["Arduino", "PID", "Sensor IR"],
        description: "Robô que segue linha com controle PID.",
        bom: [
          { item: "Arduino Mega", qty: 1, price: "$40" },
          { item: "Sensor IR 5ch", qty: 1, price: "$15" },
        ],
        totalCost: "$55.00",
      },
    ];
  }

  /**
   * Destrói o módulo
   */
  destroy() {
    this.subscribers.clear();
    this.activeProject = null;
  }
}

// Exportação
export default NexusPortfolio;

/* ============================================================
   FIM DO ARQUIVO: js/modules/portfolio.js
   PRÓXIMO: js/modules/academy.js
   ============================================================ */
