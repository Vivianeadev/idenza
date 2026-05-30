/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — COMPONENTE SEARCH
 * ============================================================
 * 
 * Busca global com:
 * - Overlay de busca (Ctrl+K)
 * - Resultados em tempo real
 * - Navegação por teclado nos resultados
 * - Histórico de buscas recentes
 * - Sugestões automáticas
 * - Atalhos para módulos
 * - Índice de busca completo
 * 
 * @component Search
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaSearch = {
    // ============================================================
    // CONFIGURAÇÃO
    // ============================================================
    config: {
        minQueryLength: 2,
        maxResults: 15,
        debounceTime: 250,
        maxRecentSearches: 10,
    },

    elements: {
        overlay: null,
        input: null,
        results: null,
        shortcut: null,
    },

    state: {
        isOpen: false,
        query: '',
        results: [],
        selectedIndex: -1,
        recentSearches: [],
        searchIndex: [],
    },

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init() {
        this._cacheElements();
        if (!this.elements.overlay) return;

        this._buildSearchIndex();
        this._loadRecentSearches();
        this._bindEvents();

        // Atalho global Ctrl+K
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            }
        });

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaSearch] Busca global inicializada');
        }
    },

    // ============================================================
    // ABRIR / FECHAR
    // ============================================================
    open() {
        this.state.isOpen = true;
        this.state.query = '';
        this.state.results = [];
        this.state.selectedIndex = -1;

        this.elements.overlay.style.display = 'flex';
        this.elements.overlay.setAttribute('aria-hidden', 'false');
        
        setTimeout(() => {
            this.elements.overlay.style.opacity = '1';
            this.elements.input.focus();
        }, 10);

        document.body.classList.add('no-scroll');

        // Mostra buscas recentes
        this._showRecentSearches();

        IdenzaEvents.emit('idenza:searchOpened');
    },

    close() {
        this.state.isOpen = false;
        this.elements.overlay.style.opacity = '0';
        this.elements.overlay.setAttribute('aria-hidden', 'true');

        setTimeout(() => {
            this.elements.overlay.style.display = 'none';
            this.elements.input.value = '';
            this._clearResults();
        }, 300);

        document.body.classList.remove('no-scroll');

        IdenzaEvents.emit('idenza:searchClosed');
    },

    toggle() {
        if (this.state.isOpen) {
            this.close();
        } else {
            this.open();
        }
    },

    // ============================================================
    // EXECUTAR BUSCA
    // ============================================================
    search(query) {
        this.state.query = query;
        this.state.selectedIndex = -1;

        if (query.length < this.config.minQueryLength) {
            this._showRecentSearches();
            return;
        }

        const results = this._performSearch(query);
        this.state.results = results;
        this._renderResults(results);

        // Salva no histórico
        if (results.length > 0 && query.length >= 3) {
            this._addToRecentSearches(query);
        }
    },

    // ============================================================
    // NAVEGAÇÃO POR TECLADO NOS RESULTADOS
    // ============================================================
    navigateResults(direction) {
        const results = this.state.results;
        if (results.length === 0) return;

        if (direction === 'down') {
            this.state.selectedIndex = Math.min(this.state.selectedIndex + 1, results.length - 1);
        } else if (direction === 'up') {
            this.state.selectedIndex = Math.max(this.state.selectedIndex - 1, -1);
        }

        this._highlightSelected();
    },

    executeSelected() {
        if (this.state.selectedIndex >= 0 && this.state.selectedIndex < this.state.results.length) {
            this._executeResult(this.state.results[this.state.selectedIndex]);
        } else if (this.state.results.length === 1) {
            this._executeResult(this.state.results[0]);
        }
    },

    // ============================================================
    // MÉTODOS PRIVADOS
    // ============================================================
    _cacheElements() {
        this.elements.overlay = document.getElementById('searchOverlay');
        this.elements.input = document.getElementById('globalSearchInput');
        this.elements.results = document.getElementById('searchResults');
        this.elements.shortcut = document.querySelector('.search-shortcut');
    },

    _bindEvents() {
        // Fecha ao clicar no overlay
        if (this.elements.overlay) {
            this.elements.overlay.addEventListener('click', (e) => {
                if (e.target === this.elements.overlay) {
                    this.close();
                }
            });
        }

        // Input de busca
        if (this.elements.input) {
            this.elements.input.addEventListener('input', this._debounce(() => {
                this.search(this.elements.input.value.trim());
            }, this.config.debounceTime));

            this.elements.input.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'Escape':
                        e.preventDefault();
                        this.close();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        this.navigateResults('down');
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.navigateResults('up');
                        break;
                    case 'Enter':
                        e.preventDefault();
                        this.executeSelected();
                        break;
                }
            });
        }
    },

    _performSearch(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();
        const index = this.state.searchIndex;

        // Busca nos índices
        index.forEach(item => {
            let score = 0;

            // Match no título (peso maior)
            if (item.title.toLowerCase().includes(lowerQuery)) {
                score += 10;
                if (item.title.toLowerCase().startsWith(lowerQuery)) score += 5;
            }

            // Match nas keywords
            if (item.keywords) {
                item.keywords.forEach(kw => {
                    if (kw.toLowerCase().includes(lowerQuery)) score += 3;
                });
            }

            // Match na descrição
            if (item.description && item.description.toLowerCase().includes(lowerQuery)) {
                score += 2;
            }

            if (score > 0) {
                results.push({ ...item, score });
            }
        });

        // Ordena por score
        results.sort((a, b) => b.score - a.score);

        // Destaca termos
        return results.slice(0, this.config.maxResults).map(item => ({
            ...item,
            highlightedTitle: this._highlightText(item.title, lowerQuery),
            highlightedDescription: item.description ? this._highlightText(item.description, lowerQuery) : '',
        }));
    },

    _renderResults(results) {
        if (!this.elements.results) return;

        if (results.length === 0 && this.state.query.length >= this.config.minQueryLength) {
            this.elements.results.innerHTML = `
                <div class="search-empty">
                    <i class="fas fa-search"></i>
                    <p>Nenhum resultado para "<strong>${this._escapeHTML(this.state.query)}</strong>"</p>
                    <small>Tente outros termos ou navegue pelos módulos.</small>
                </div>
            `;
            return;
        }

        this.elements.results.innerHTML = results.map((result, index) => `
            <div class="search-result-item ${index === this.state.selectedIndex ? 'search-result-selected' : ''}"
                 data-index="${index}"
                 onclick="IdenzaSearch._executeResultById(${index})"
                 onmouseenter="IdenzaSearch._hoverResult(${index})">
                <div class="search-result-icon">
                    <i class="fas ${result.icon || 'fa-circle'}"></i>
                </div>
                <div class="search-result-content">
                    <div class="search-result-title">${result.highlightedTitle}</div>
                    ${result.highlightedDescription ? `
                        <div class="search-result-description">${result.highlightedDescription}</div>
                    ` : ''}
                </div>
                <div class="search-result-badge">
                    <span class="badge ${result.badgeClass || 'badge-info'}">${result.category || ''}</span>
                </div>
                <div class="search-result-shortcut">
                    <kbd>⏎</kbd>
                </div>
            </div>
        `).join('');
    },

    _showRecentSearches() {
        if (!this.elements.results) return;

        const recent = this.state.recentSearches;

        if (recent.length === 0) {
            this.elements.results.innerHTML = `
                <div class="search-hints">
                    <div class="search-hints-title">
                        <i class="fas fa-lightbulb"></i> Atalhos da Idenza Academy
                    </div>
                    <div class="search-hint-grid">
                        <div class="search-hint-item" onclick="IdenzaSearch._quickNavigate('dashboard')">
                            <i class="fas fa-tachometer-alt"></i> Dashboard
                        </div>
                        <div class="search-hint-item" onclick="IdenzaSearch._quickNavigate('academy')">
                            <i class="fas fa-graduation-cap"></i> Academy
                        </div>
                        <div class="search-hint-item" onclick="IdenzaSearch._quickNavigate('portfolio')">
                            <i class="fas fa-briefcase"></i> Portfólio
                        </div>
                        <div class="search-hint-item" onclick="IdenzaSearch._quickNavigate('products')">
                            <i class="fas fa-microchip"></i> Produtos
                        </div>
                        <div class="search-hint-item" onclick="IdenzaSearch._quickNavigate('diagnostics')">
                            <i class="fas fa-stethoscope"></i> Diagnóstico
                        </div>
                        <div class="search-hint-item" onclick="IdenzaSearch._quickNavigate('marketplace')">
                            <i class="fas fa-shopping-cart"></i> Loja Idenza
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        this.elements.results.innerHTML = `
            <div class="search-recent">
                <div class="search-recent-header">
                    <span><i class="fas fa-history"></i> Buscas recentes</span>
                    <button class="search-clear-recent" onclick="IdenzaSearch._clearRecentSearches()">
                        Limpar histórico
                    </button>
                </div>
                ${recent.map(q => `
                    <div class="search-result-item" onclick="IdenzaSearch.search('${this._escapeHTML(q)}'); IdenzaSearch.elements.input.value='${this._escapeHTML(q)}'; IdenzaSearch.elements.input.focus();">
                        <div class="search-result-icon">
                            <i class="fas fa-history"></i>
                        </div>
                        <div class="search-result-content">
                            <div class="search-result-title">${this._escapeHTML(q)}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    _clearResults() {
        if (this.elements.results) {
            this.elements.results.innerHTML = '';
        }
    },

    _highlightSelected() {
        const items = this.elements.results?.querySelectorAll('.search-result-item');
        items?.forEach((item, index) => {
            item.classList.toggle('search-result-selected', index === this.state.selectedIndex);
            if (index === this.state.selectedIndex) {
                item.scrollIntoView({ block: 'nearest' });
            }
        });
    },

    _hoverResult(index) {
        this.state.selectedIndex = index;
        this._highlightSelected();
    },

    _executeResult(result) {
        this.close();

        if (result.action === 'navigate') {
            if (IdenzaRouter && typeof IdenzaRouter.navigate === 'function') {
                IdenzaRouter.navigate(result.target);
            } else if (IdenzaApp && typeof IdenzaApp.loadModule === 'function') {
                IdenzaApp.loadModule(result.target);
            }
        } else if (result.action === 'url') {
            window.open(result.target, '_blank');
        } else if (result.action === 'callback' && typeof result.target === 'function') {
            result.target();
        }
    },

    _executeResultById(index) {
        if (index >= 0 && index < this.state.results.length) {
            this._executeResult(this.state.results[index]);
        }
    },

    _quickNavigate(module) {
        this.close();
        if (IdenzaApp && typeof IdenzaApp.loadModule === 'function') {
            IdenzaApp.loadModule(module);
        }
    },

    _highlightText(text, query) {
        if (!text || !query) return this._escapeHTML(text || '');
        
        const escaped = this._escapeHTML(text);
        const escapedQuery = this._escapeHTML(query);
        
        const regex = new RegExp(`(${escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        
        return escaped.replace(regex, '<mark class="search-highlight">$1</mark>');
    },

    _escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    _buildSearchIndex() {
        const index = [];

        // Módulos
        const modules = [
            { title: 'Dashboard de Diagnóstico', keywords: ['dashboard', 'diagnóstico', 'monitoramento', 'status', 'robô'], category: 'Módulo', icon: 'fa-tachometer-alt', badgeClass: 'badge-info', action: 'navigate', target: 'dashboard', description: 'Painel principal de monitoramento e diagnóstico de sistemas robóticos em tempo real.' },
            { title: 'Idenza Academy — Cursos', keywords: ['academy', 'cursos', 'aulas', 'aprender', 'ROS', 'IoT', 'certificação'], category: 'Módulo', icon: 'fa-graduation-cap', badgeClass: 'badge-success', action: 'navigate', target: 'academy', description: 'Plataforma de cursos de robótica, IoT e inteligência artificial com certificação.' },
            { title: 'Portfólio de Projetos', keywords: ['portfólio', 'projetos', 'construir', 'BOM', 'passo a passo'], category: 'Módulo', icon: 'fa-briefcase', badgeClass: 'badge-gold', action: 'navigate', target: 'portfolio', description: 'Coleção de projetos completos com lista de materiais e instruções detalhadas.' },
            { title: 'Catálogo de Produtos', keywords: ['produtos', 'catálogo', 'microcontroladores', 'sensores', 'robôs', 'kits'], category: 'Módulo', icon: 'fa-microchip', badgeClass: 'badge-info', action: 'navigate', target: 'products', description: 'Catálogo completo de hardware, sensores, atuadores e kits curados pela Idenza.' },
            { title: 'Guias e Tutoriais', keywords: ['guias', 'tutoriais', 'manual', 'conectar', 'configurar'], category: 'Módulo', icon: 'fa-book', badgeClass: 'badge-info', action: 'navigate', target: 'guides', description: 'Guias passo a passo para conectar Arduino, ESP32, ROS e muito mais.' },
            { title: 'Ferramenta de Diagnóstico', keywords: ['diagnóstico', 'análise', 'causa raiz', 'falha', 'logs'], category: 'Módulo', icon: 'fa-stethoscope', badgeClass: 'badge-warning', action: 'navigate', target: 'diagnostics', description: 'Ferramenta avançada de análise de falhas e diagnóstico de causa raiz.' },
            { title: 'Simulador de Falhas', keywords: ['simulador', 'falhas', 'treino', 'teste', 'simulação'], category: 'Módulo', icon: 'fa-flask', badgeClass: 'badge-info', action: 'navigate', target: 'simulator', description: 'Ambiente de simulação para treinar diagnóstico de falhas sem risco.' },
            { title: 'Loja Idenza — Kits', keywords: ['loja', 'kits', 'comprar', 'starter', 'preços'], category: 'Módulo', icon: 'fa-shopping-cart', badgeClass: 'badge-gold', action: 'navigate', target: 'marketplace', description: 'Loja oficial com kits curados para cada nível de aprendizado.' },
        ];

        index.push(...modules);

        // Produtos do catálogo (se disponível)
        if (window.IDENZA_PRODUCTS_CATALOG) {
            const catalog = window.IDENZA_PRODUCTS_CATALOG;

            Object.entries(catalog).forEach(([category, items]) => {
                if (Array.isArray(items)) {
                    items.forEach(item => {
                        if (item.name) {
                            index.push({
                                title: item.name,
                                keywords: [item.manufacturer || '', item.type || '', category],
                                category: this._formatCategory(category),
                                icon: this._getCategoryIcon(category),
                                badgeClass: 'badge-gold',
                                action: 'navigate',
                                target: 'products',
                                description: item.description || '',
                            });
                        }
                    });
                }
            });
        }

        this.state.searchIndex = index;
    },

    _formatCategory(category) {
        const names = {
            microcontrollers: 'Microcontrolador',
            sbcs: 'Computador',
            robots: 'Robô',
            kits: 'Kit Idenza',
            sensors: 'Sensor',
            actuators: 'Atuador',
            software: 'Software',
            fabrication: 'Fabricação',
        };
        return names[category] || category;
    },

    _getCategoryIcon(category) {
        const icons = {
            microcontrollers: 'fa-microchip',
            sbcs: 'fa-desktop',
            robots: 'fa-robot',
            kits: 'fa-box',
            sensors: 'fa-eye',
            actuators: 'fa-cog',
            software: 'fa-code',
            fabrication: 'fa-print',
        };
        return icons[category] || 'fa-cube';
    },

    _addToRecentSearches(query) {
        // Remove duplicata
        this.state.recentSearches = this.state.recentSearches.filter(q => q !== query);
        // Adiciona no início
        this.state.recentSearches.unshift(query);
        // Limita
        this.state.recentSearches = this.state.recentSearches.slice(0, this.config.maxRecentSearches);
        // Persiste
        this._saveRecentSearches();
    },

    _loadRecentSearches() {
        try {
            const saved = localStorage.getItem('idenza_recent_searches');
            if (saved) {
                this.state.recentSearches = JSON.parse(saved);
            }
        } catch (e) {
            this.state.recentSearches = [];
        }
    },

    _saveRecentSearches() {
        try {
            localStorage.setItem('idenza_recent_searches', JSON.stringify(this.state.recentSearches));
        } catch (e) {
            // localStorage cheio
        }
    },

    _clearRecentSearches() {
        this.state.recentSearches = [];
        localStorage.removeItem('idenza_recent_searches');
        this._showRecentSearches();
    },

    _debounce(func, wait) {
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
    // DESTRUIÇÃO
    // ============================================================
    destroy() {
        this.close();
        this.elements = {};
        this.state.results = [];
        this.state.searchIndex = [];
    },
};

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    IdenzaSearch.init();
    window.IdenzaSearch = IdenzaSearch;
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaSearch;
}
