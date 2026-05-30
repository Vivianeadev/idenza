/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — MÓDULO PORTFÓLIO
 * ============================================================
 * 
 * Vitrine de projetos com:
 * - Cards interativos com preview
 * - Filtros por nível e categoria
 * - Busca textual
 * - Modal detalhado com BOM e código
 * - Sistema de favoritos
 * - Tracking de progresso
 * 
 * @module Portfolio
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaPortfolio = {
    config: {
        projectsPerPage: 9,
        animationDelay: 100,
    },

    state: {
        projects: [],
        filteredProjects: [],
        activeFilter: 'all',
        activeLevel: 'all',
        searchQuery: '',
        currentPage: 1,
        favorites: [],
    },

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init(container) {
        this.state.projects = window.IDENZA_PROJECTS_DATABASE || [];
        this.state.filteredProjects = [...this.state.projects];
        this.state.favorites = IdenzaStorage.get('portfolio_favorites') || [];

        this._render(container);
        this._bindEvents();

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaPortfolio] Portfólio inicializado com', this.state.projects.length, 'projetos');
        }
    },

    // ============================================================
    // RENDERIZAÇÃO
    // ============================================================
    _render(container) {
        container.innerHTML = `
            <div class="portfolio-page animate-fade-in">
                <!-- Header -->
                <div class="panel panel-full">
                    <div class="panel-header">
                        <i class="fas fa-briefcase"></i>
                        <h2>📁 Portfólio de Projetos</h2>
                        <span class="badge badge-gold">${this.state.projects.length} PROJETOS</span>
                    </div>
                    <p class="tiny-hint">Projetos completos com lista de materiais, código-fonte e passo a passo detalhado.</p>
                    <span class="layman-explain">Escolha um projeto e construa do zero — como seguir uma receita de bolo tecnológica</span>
                </div>

                <!-- Filtros -->
                <div class="panel panel-full" style="margin-top:var(--space-4);">
                    <div class="filter-bar">
                        <div class="filter-group">
                            <label class="filter-label"><i class="fas fa-filter"></i> Categoria:</label>
                            <div class="filter-chips" id="categoryFilters">
                                <button class="filter-chip active" data-filter="all">Todos</button>
                                <button class="filter-chip" data-filter="iot">IoT</button>
                                <button class="filter-chip" data-filter="robotica">Robótica</button>
                                <button class="filter-chip" data-filter="robotica-ia">Robótica + IA</button>
                                <button class="filter-chip" data-filter="fabricacao">Fabricação</button>
                            </div>
                        </div>
                        <div class="filter-group">
                            <label class="filter-label"><i class="fas fa-signal"></i> Nível:</label>
                            <div class="filter-chips" id="levelFilters">
                                <button class="filter-chip active" data-level="all">Todos</button>
                                <button class="filter-chip" data-level="iniciante">🟢 Iniciante</button>
                                <button class="filter-chip" data-level="intermediario">🟡 Intermediário</button>
                                <button class="filter-chip" data-level="avancado">🔴 Avançado</button>
                            </div>
                        </div>
                        <div class="filter-search">
                            <i class="fas fa-search"></i>
                            <input type="
