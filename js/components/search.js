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
                        <i class="fas fa-lightbulb"></i> Atalhos da Idenza
