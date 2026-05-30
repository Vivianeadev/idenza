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
                            <input type="text" class="filter-search-input" id="portfolioSearch" placeholder="Buscar projetos...">
                        </div>
                    </div>
                </div>

                <!-- Grid de Projetos -->
                <div class="grid-portfolio" id="portfolioGrid" style="margin-top:var(--space-4);">
                    ${this._renderProjectCards()}
                </div>

                <!-- Paginação -->
                <div id="portfolioPagination" class="pagination-container"></div>
            </div>
        `;

        this._updatePagination();
    },

    _renderProjectCards() {
        const start = (this.state.currentPage - 1) * this.config.projectsPerPage;
        const end = start + this.config.projectsPerPage;
        const pageProjects = this.state.filteredProjects.slice(start, end);

        if (pageProjects.length === 0) {
            return `
                <div class="panel panel-full empty-state">
                    <i class="fas fa-folder-open"></i>
                    <h3>Nenhum projeto encontrado</h3>
                    <p>Tente ajustar os filtros ou buscar por outro termo.</p>
                </div>
            `;
        }

        return pageProjects.map((project, index) => {
            const isFavorite = this.state.favorites.includes(project.id);
            
            return `
                <div class="card card-accent-top animate-fade-in-up project-card" 
                     style="animation-delay:${index * this.config.animationDelay}ms"
                     data-project-id="${project.id}">
                    <div class="card-icon">
                        <i class="fas ${project.icon || 'fa-cube'}"></i>
                    </div>
                    <div class="card-header-actions">
                        <button class="btn-icon-only favorite-btn ${isFavorite ? 'active' : ''}" 
                                data-favorite="${project.id}"
                                title="${isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    <h4 class="card-title">${project.title}</h4>
                    <p class="card-text">${project.description.substring(0, 120)}...</p>
                    
                    <div class="project-meta">
                        <span class="tag tag-${project.level}">${this._levelLabel(project.level)}</span>
                        <span class="tag"><i class="fas fa-clock"></i> ${project.duration}</span>
                        <span class="tag"><i class="fas fa-dollar-sign"></i> ${project.cost}</span>
                    </div>
                    
                    <div class="project-stats">
                        <span title="Avaliação"><i class="fas fa-star" style="color:var(--gold-primary);"></i> ${project.rating}</span>
                        <span title="Concluído por"><i class="fas fa-users"></i> ${project.completions}</span>
                    </div>

                    <div class="card-footer">
                        <span class="tiny-hint">${project.tags.slice(0, 3).join(' · ')}</span>
                        <button class="btn btn-sm btn-gold" data-action="view-project" data-project="${project.id}">
                            Ver Projeto <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    _updatePagination() {
        const totalPages = Math.ceil(this.state.filteredProjects.length / this.config.projectsPerPage);
        const container = document.getElementById('portfolioPagination');
        if (!container || totalPages <= 1) {
            if (container) container.innerHTML = '';
            return;
        }

        let html = '<div class="pagination">';
        
        html += `<button class="page-btn" ${this.state.currentPage === 1 ? 'disabled' : ''} 
                  onclick="IdenzaPortfolio.goToPage(${this.state.currentPage - 1})">
                  <i class="fas fa-chevron-left"></i></button>`;

        for (let i = 1; i <= totalPages; i++) {
            html += `<button class="page-btn ${i === this.state.currentPage ? 'active' : ''}" 
                      onclick="IdenzaPortfolio.goToPage(${i})">${i}</button>`;
        }

        html += `<button class="page-btn" ${this.state.currentPage === totalPages ? 'disabled' : ''} 
                  onclick="IdenzaPortfolio.goToPage(${this.state.currentPage + 1})">
                  <i class="fas fa-chevron-right"></i></button>`;
        
        html += '</div>';
        container.innerHTML = html;
    },

    // ============================================================
    // NAVEGAÇÃO E FILTROS
    // ============================================================
    goToPage(page) {
        const totalPages = Math.ceil(this.state.filteredProjects.length / this.config.projectsPerPage);
        if (page < 1 || page > totalPages) return;

        this.state.currentPage = page;
        const grid = document.getElementById('portfolioGrid');
        if (grid) {
            grid.innerHTML = this._renderProjectCards();
        }
        this._updatePagination();
        grid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    filterByCategory(category) {
        this.state.activeFilter = category;
        this._applyFilters();
    },

    filterByLevel(level) {
        this.state.activeLevel = level;
        this._applyFilters();
    },

    search(query) {
        this.state.searchQuery = query;
        this._applyFilters();
    },

    _applyFilters() {
        let filtered = [...this.state.projects];

        if (this.state.activeFilter !== 'all') {
            filtered = filtered.filter(p => p.category === this.state.activeFilter);
        }

        if (this.state.activeLevel !== 'all') {
            filtered = filtered.filter(p => p.level === this.state.activeLevel);
        }

        if (this.state.searchQuery) {
            const q = this.state.searchQuery.toLowerCase();
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q))
            );
        }

        this.state.filteredProjects = filtered;
        this.state.currentPage = 1;

        const grid = document.getElementById('portfolioGrid');
        if (grid) {
            grid.innerHTML = this._renderProjectCards();
        }
        this._updatePagination();
    },

    // ============================================================
    // VISUALIZAÇÃO DE PROJETO (MODAL)
    // ============================================================
    viewProject(projectId) {
        const project = this.state.projects.find(p => p.id === projectId);
        if (!project) return;

        IdenzaModal.open({
            title: project.title,
            size: 'xl',
            content: this._renderProjectDetail(project),
            onOpen: () => {
                this._bindDetailEvents(project);
                IdenzaTabs?.init('projectDetailTabs');
            },
        });
    },

    _renderProjectDetail(project) {
        const isFavorite = this.state.favorites.includes(project.id);

        return `
            <div class="project-detail">
                <div class="project-detail-header">
                    <span class="badge badge-${this._levelBadge(project.level)}">${this._levelLabel(project.level)}</span>
                    <span class="badge badge-info"><i class="fas fa-clock"></i> ${project.duration}</span>
                    <span class="badge badge-gold"><i class="fas fa-dollar-sign"></i> ${project.cost}</span>
                    <span style="margin-left:auto;"><i class="fas fa-star" style="color:var(--gold-primary);"></i> ${project.rating} (${project.completions} alunos)</span>
                </div>

                <p style="margin:var(--space-4) 0;">${project.description}</p>

                <div class="tab-nav" id="projectDetailTabs">
                    <button class="tab-btn active" data-tab="tab-overview">📋 Visão Geral</button>
                    <button class="tab-btn" data-tab="tab-bom">📦 Lista de Materiais</button>
                    <button class="tab-btn" data-tab="tab-steps">🔧 Passo a Passo</button>
                    <button class="tab-btn" data-tab="tab-code">💻 Código</button>
                </div>

                <div class="tab-content active" id="tab-overview">
                    <h4>🎯 O que você vai aprender</h4>
                    <ul class="list-styled">
                        ${project.learningObjectives.map(obj => `<li>${obj}</li>`).join('')}
                    </ul>
                    ${project.prerequisites ? `
                        <h4>📝 Pré-requisitos</h4>
                        <ul class="list-styled">
                            ${project.prerequisites.map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>

                <div class="tab-content" id="tab-bom">
                    <h4>📦 Bill of Materials (BOM)</h4>
                    <div class="table-container">
                        <table class="table bom-table">
                            <thead><tr><th>Item</th><th>Qtd</th><th>Preço Unit.</th><th>Subtotal</th></tr></thead>
                            <tbody>
                                ${project.bom.map(item => `
                                    <tr>
                                        <td>${item.link ? `<a href="#" onclick="IdenzaApp.loadModule('products')" class="link-gold">${item.item}</a>` : item.item}</td>
                                        <td>${item.qty}</td>
                                        <td>${item.price}</td>
                                        <td>${this._calcSubtotal(item)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    <p style="margin-top:var(--space-3);"><strong>Total Estimado:</strong> ${project.cost}</p>
                </div>

                <div class="tab-content" id="tab-steps">
                    <h4>🔧 Passo a Passo</h4>
                    ${project.steps.map(s => `
                        <div class="guide-step">
                            <div class="guide-num">${s.step}</div>
                            <div class="guide-content">
                                <h5>${s.title}</h5>
                                <p>${s.description}</p>
                                ${s.code ? `<span class="action-cmd" style="cursor:pointer;" onclick="document.querySelector('[data-tab=\\'tab-code\\']').click()">📄 Ver código: ${s.code}</span>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="tab-content" id="tab-code">
                    <h4>💻 Código-Fonte</h4>
                    ${project.codeFiles ? Object.entries(project.codeFiles).map(([filename, code]) => `
                        <h5 style="margin-top:var(--space-4);"><i class="fas fa-file-code"></i> ${filename}</h5>
                        <div class="code-block" data-language="${this._detectLanguage(filename)}" data-copy-button="true">
                            <pre><code>${this._escapeHTML(code)}</code></pre>
                        </div>
                    `).join('') : '<p>Nenhum código disponível para este projeto.</p>'}
                </div>

                <div style="margin-top:var(--space-6);text-align:right;">
                    <button class="btn btn-outline" onclick="IdenzaModal.close()">Fechar</button>
                    <button class="btn btn-gold" onclick="IdenzaPortfolio.startProject('${project.id}')">
                        🚀 Iniciar Projeto
                    </button>
                </div>
            </div>
        `;
    },

    // ============================================================
    // FAVORITOS
    // ============================================================
    toggleFavorite(projectId) {
        const index = this.state.favorites.indexOf(projectId);
        if (index > -1) {
            this.state.favorites.splice(index, 1);
        } else {
            this.state.favorites.push(projectId);
        }

        IdenzaStorage.set('portfolio_favorites', this.state.favorites);
        this._refreshGrid();
    },

    // ============================================================
    // INICIAR PROJETO
    // ============================================================
    startProject(projectId) {
        IdenzaModal.close();
        IdenzaToast?.success('Projeto adicionado aos seus projetos ativos!');
        IdenzaState.setState('portfolio.activeProjects', [
            ...IdenzaState.get('portfolio.activeProjects') || [],
            { projectId, startedAt: Date.now(), progress: 0 },
        ]);
    },

    // ============================================================
    // EVENTOS
    // ============================================================
    _bindEvents() {
        // Filtros de categoria
        IdenzaDOM.delegate(document, 'click', '#categoryFilters .filter-chip', (e, el) => {
            document.querySelectorAll('#categoryFilters .filter-chip').forEach(c => c.classList.remove('active'));
            el.classList.add('active');
            this.filterByCategory(el.dataset.filter);
        });

        // Filtros de nível
        IdenzaDOM.delegate(document, 'click', '#levelFilters .filter-chip', (e, el) => {
            document.querySelectorAll('#levelFilters .filter-chip').forEach(c => c.classList.remove('active'));
            el.classList.add('active');
            this.filterByLevel(el.dataset.level);
        });

        // Busca
        const searchInput = document.getElementById('portfolioSearch');
        if (searchInput) {
            searchInput.addEventListener('input', IdenzaApp.debounce(() => {
                this.search(searchInput.value);
            }, 300));
        }

        // Cards de projeto
        IdenzaDOM.delegate(document, 'click', '[data-action="view-project"]', (e, el) => {
            this.viewProject(el.dataset.project);
        });

        // Favoritos
        IdenzaDOM.delegate(document, 'click', '.favorite-btn', (e, el) => {
            e.stopPropagation();
            this.toggleFavorite(el.dataset.favorite);
        });
    },

    _bindDetailEvents(project) {
        // Código: syntax highlighting
        setTimeout(() => {
            IdenzaCodeViewer?.init('#projectDetailTabs .code-block');
        }, 100);
    },

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    _refreshGrid() {
        const grid = document.getElementById('portfolioGrid');
        if (grid) grid.innerHTML = this._renderProjectCards();
    },

    _levelLabel(level) {
        const labels = { iniciante: '🟢 Iniciante', intermediario: '🟡 Intermediário', avancado: '🔴 Avançado', profissional: '⚫ Profissional' };
        return labels[level] || level;
    },

    _levelBadge(level) {
        const badges = { iniciante: 'success', intermediario: 'warning', avancado: 'critical', profissional: 'info' };
        return badges[level] || 'info';
    },

    _calcSubtotal(item) {
        const price = parseFloat(item.price.replace('$', ''));
        return isNaN(price) ? '—' : `$${(price * item.qty).toFixed(2)}`;
    },

    _detectLanguage(filename) {
        if (filename.endsWith('.py')) return 'python';
        if (filename.endsWith('.cpp') || filename.endsWith('.h')) return 'cpp';
        if (filename.endsWith('.ino')) return 'cpp';
        if (filename.endsWith('.sh')) return 'bash';
        if (filename.endsWith('.yaml') || filename.endsWith('.yml')) return 'yaml';
        if (filename.endsWith('.json')) return 'json';
        if (filename.endsWith('.js')) return 'javascript';
        return 'plaintext';
    },

    _escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
};

// ============================================================
// REGISTRO NO SISTEMA DE MÓDULOS
// ============================================================
if (typeof IdenzaModules === 'undefined') {
    window.IdenzaModules = {};
}
IdenzaModules.initPortfolio = (container) => IdenzaPortfolio.init(container);
