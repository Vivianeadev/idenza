/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — MÓDULO CATÁLOGO DE PRODUTOS
 * ============================================================
 * 
 * Catálogo interativo de hardware, sensores e kits:
 * - Grid de produtos com cards expansivos
 * - Filtros por categoria e nível
 * - Comparação lado a lado
 * - Modal detalhado com especificações
 * - Links para projetos relacionados
 * - Sistema de wishlist
 * 
 * @module Products
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaProducts = {
    config: {
        itemsPerPage: 12,
    },

    state: {
        catalog: null,
        activeCategory: 'all',
        activeLevel: 'all',
        searchQuery: '',
        currentPage: 1,
        compareList: [],
        wishlist: [],
        viewMode: 'grid', // grid | list
    },

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init(container) {
        this.state.catalog = window.IDENZA_PRODUCTS_CATALOG || {};
        this.state.compareList = IdenzaStorage.get('products_compare') || [];
        this.state.wishlist = IdenzaStorage.get('products_wishlist') || [];

        this._render(container);
        this._bindEvents();

        if (IdenzaApp && IdenzaApp.config.debug) {
            const total = this._getAllProducts().length;
            console.log(`[IdenzaProducts] Catálogo inicializado com ${total} produtos`);
        }
    },

    // ============================================================
    // RENDERIZAÇÃO PRINCIPAL
    // ============================================================
    _render(container) {
        const totalProducts = this._getAllProducts().length;

        container.innerHTML = `
            <div class="products-page animate-fade-in">
                <!-- Header -->
                <div class="panel panel-full">
                    <div class="panel-header">
                        <i class="fas fa-microchip"></i>
                        <h2>📦 Catálogo de Produtos Idenza</h2>
                        <span class="badge badge-gold">${totalProducts} PRODUTOS</span>
                    </div>
                    <p class="tiny-hint">Hardware, sensores, atuadores e kits curados pela equipe Idenza Robotics. Cada produto tem projetos vinculados para você aprender na prática.</p>
                </div>

                <!-- Barra de Filtros e Busca -->
                <div class="panel" style="margin-top:var(--space-4);">
                    <div class="filter-bar">
                        <div class="filter-group">
                            <label class="filter-label"><i class="fas fa-tag"></i> Categoria:</label>
                            <div class="filter-chips" id="productCategoryFilters">
                                <button class="filter-chip active" data-category="all">Todos</button>
                                <button class="filter-chip" data-category="microcontrollers">Microcontroladores</button>
                                <button class="filter-chip" data-category="sbcs">Computadores (SBC)</button>
                                <button class="filter-chip" data-category="robots">Robôs</button>
                                <button class="filter-chip" data-category="sensors">Sensores</button>
                                <button class="filter-chip" data-category="actuators">Atuadores</button>
                                <button class="filter-chip" data-category="kits">Kits Idenza</button>
                            </div>
                        </div>
                        <div class="filter-group">
                            <label class="filter-label"><i class="fas fa-signal"></i> Nível:</label>
                            <div class="filter-chips" id="productLevelFilters">
                                <button class="filter-chip active" data-level="all">Todos</button>
                                <button class="filter-chip" data-level="iniciante">Iniciante</button>
                                <button class="filter-chip" data-level="intermediario">Intermediário</button>
                                <button class="filter-chip" data-level="avancado">Avançado</button>
                            </div>
                        </div>
                        <div class="filter-actions">
                            <div class="filter-search">
                                <i class="fas fa-search"></i>
                                <input type="text" class="filter-search-input" id="productSearch" placeholder="Buscar produto...">
                            </div>
                            <button class="btn btn-sm btn-outline" id="toggleViewMode" title="Alternar visualização">
                                <i class="fas fa-th-large"></i>
                            </button>
                            ${this.state.compareList.length > 0 ? `
                                <button class="btn btn-sm btn-gold" id="showCompareBtn" title="Comparar produtos">
                                    <i class="fas fa-balance-scale"></i> Comparar (${this.state.compareList.length})
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <!-- Grid de Produtos -->
                <div class="grid-products" id="productsGrid" style="margin-top:var(--space-4);">
                    ${this._renderProductCards()}
                </div>

                <!-- Paginação -->
                <div id="productsPagination" class="pagination-container"></div>
            </div>
        `;

        this._updatePagination();
    },

    // ============================================================
    // CARDS DE PRODUTO
    // ============================================================
    _renderProductCards() {
        const products = this._getFilteredProducts();
        const start = (this.state.currentPage - 1) * this.config.itemsPerPage;
        const end = start + this.config.itemsPerPage;
        const pageProducts = products.slice(start, end);

        if (pageProducts.length === 0) {
            return `
                <div class="panel panel-full empty-state">
                    <i class="fas fa-box-open"></i>
                    <h3>Nenhum produto encontrado</h3>
                    <p>Tente ajustar os filtros ou limpar a busca.</p>
                </div>
            `;
        }

        if (this.state.viewMode === 'list') {
            return this._renderProductList(pageProducts);
        }

        return pageProducts.map((product, index) => {
            const isCompared = this.state.compareList.includes(product.id);
            const isWishlisted = this.state.wishlist.includes(product.id);

            return `
                <div class="card card-product card-accent-top animate-fade-in-up" 
                     style="animation-delay:${index * 60}ms"
                     data-product-id="${product.id}">
                    
                    <div class="card-header-actions">
                        <button class="btn-icon-only wishlist-btn ${isWishlisted ? 'active' : ''}" 
                                data-wishlist="${product.id}" title="Lista de desejos">
                            <i class="fas fa-bookmark"></i>
                        </button>
                        <button class="btn-icon-only compare-btn ${isCompared ? 'active' : ''}" 
                                data-compare="${product.id}" title="Comparar">
                            <i class="fas fa-balance-scale"></i>
                        </button>
                    </div>

                    <div class="card-icon">
                        <i class="fas ${this._getProductIcon(product)}"></i>
                    </div>

                    <h4 class="card-title">${product.name}</h4>
                    <p class="card-text">${product.description ? product.description.substring(0, 80) + '...' : product.manufacturer || ''}</p>

                    <div class="project-meta">
                        ${product.level ? `<span class="tag tag-${product.level}">${this._levelLabel(product.level)}</span>` : ''}
                        ${product.chip ? `<span class="tag">${product.chip.split(' ')[0]}</span>` : ''}
                        ${product.projects ? `<span class="tag"><i class="fas fa-project-diagram"></i> ${product.projects} projetos</span>` : ''}
                    </div>

                    ${product.features ? `
                        <div class="product-features">
                            ${product.features.slice(0, 3).map(f => `<span class="feature-chip">${f}</span>`).join('')}
                        </div>
                    ` : ''}

                    <div class="card-price">${product.price}</div>

                    <div class="card-footer">
                        <button class="btn btn-sm btn-outline" onclick="IdenzaProducts.viewDetails('${product.id}')">
                            <i class="fas fa-info-circle"></i> Detalhes
                        </button>
                        <button class="btn btn-sm btn-gold add-to-cart-btn" data-product="${product.id}">
                            <i class="fas fa-cart-plus"></i> ${product.category === 'kits' ? 'Comprar Kit' : 'Adicionar'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    _renderProductList(pageProducts) {
        return `
            <div class="product-list">
                ${pageProducts.map((product, index) => `
                    <div class="product-list-item animate-fade-in-up" style="animation-delay:${index * 30}ms">
                        <div class="product-list-icon">
                            <i class="fas ${this._getProductIcon(product)}"></i>
                        </div>
                        <div class="product-list-info">
                            <h4>${product.name}</h4>
                            <p>${product.description?.substring(0, 120) || product.manufacturer}</p>
                            <div class="project-meta">
                                ${product.level ? `<span class="tag tag-${product.level}">${this._levelLabel(product.level)}</span>` : ''}
                                ${product.projects ? `<span class="tag">${product.projects} projetos</span>` : ''}
                            </div>
                        </div>
                        <div class="product-list-price">${product.price}</div>
                        <div class="product-list-actions">
                            <button class="btn btn-sm btn-outline" onclick="IdenzaProducts.viewDetails('${product.id}')">Detalhes</button>
                            <button class="btn btn-sm btn-gold">Adicionar</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    },

    // ============================================================
    // MODAL DE DETALHES
    // ============================================================
    viewDetails(productId) {
        const product = this._findProduct(productId);
        if (!product) return;

        const isCompared = this.state.compareList.includes(productId);
        const isWishlisted = this.state.wishlist.includes(productId);

        IdenzaModal.open({
            title: product.name,
            size: 'lg',
            content: `
                <div class="product-detail">
                    <div class="product-detail-header">
                        <span class="badge badge-gold">${product.manufacturer || 'Idenza'}</span>
                        ${product.level ? `<span class="badge badge-${product.level === 'iniciante' ? 'success' : product.level === 'intermediario' ? 'warning' : 'critical'}">${this._levelLabel(product.level)}</span>` : ''}
                        <span class="product-detail-price">${product.price}</span>
                    </div>

                    <p style="margin:var(--space-4) 0;">${product.description || 'Produto do catálogo Idenza Robotics Academy.'}</p>

                    ${product.features ? `
                        <h4>✨ Destaques</h4>
                        <div class="product-features-list">
                            ${product.features.map(f => `<div class="feature-chip"><i class="fas fa-check-circle"></i> ${f}</div>`).join('')}
                        </div>
                    ` : ''}

                    <h4>📋 Especificações Técnicas</h4>
                    <div class="table-container">
                        <table class="table table-striped">
                            <tbody>
                                ${product.chip ? `<tr><td><strong>Chip</strong></td><td>${product.chip}</td></tr>` : ''}
                                ${product.clock ? `<tr><td><strong>Clock</strong></td><td>${product.clock}</td></tr>` : ''}
                                ${product.ram ? `<tr><td><strong>RAM</strong></td><td>${product.ram}</td></tr>` : ''}
                                ${product.flash ? `<tr><td><strong>Flash</strong></td><td>${product.flash}</td></tr>` : ''}
                                ${product.gpio ? `<tr><td><strong>GPIO</strong></td><td>${product.gpio}</td></tr>` : ''}
                                ${product.voltage ? `<tr><td><strong>Tensão</strong></td><td>${product.voltage}</td></tr>` : ''}
                                ${product.connectivity ? `<tr><td><strong>Conectividade</strong></td><td>${Array.isArray(product.connectivity) ? product.connectivity.join(', ') : product.connectivity}</td></tr>` : ''}
                                ${product.torque ? `<tr><td><strong>Torque</strong></td><td>${product.torque}</td></tr>` : ''}
                                ${product.payload ? `<tr><td><strong>Carga útil</strong></td><td>${product.payload}</td></tr>` : ''}
                                ${product.range ? `<tr><td><strong>Alcance</strong></td><td>${product.range}</td></tr>` : ''}
                                ${product.precision ? `<tr><td><strong>Precisão</strong></td><td>${product.precision}</td></tr>` : ''}
                            </tbody>
                        </table>
                    </div>

                    ${product.bom ? `
                        <h4>📦 Inclui na Embalagem</h4>
                        <ul class="list-styled">
                            ${product.bom.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    ` : ''}

                    ${product.datasheet ? `
                        <a href="${product.datasheet}" target="_blank" class="btn btn-outline" style="margin-top:var(--space-3);">
                            <i class="fas fa-file-pdf"></i> Datasheet Completo
                        </a>
                    ` : ''}

                    <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);justify-content:flex-end;">
                        <button class="btn btn-outline" onclick="IdenzaProducts.toggleWishlist('${productId}'); IdenzaModal.close();">
                            <i class="fas fa-bookmark"></i> ${isWishlisted ? 'Remover da Lista' : 'Adicionar à Lista'}
                        </button>
                        <button class="btn btn-outline" onclick="IdenzaProducts.toggleCompare('${productId}'); IdenzaModal.close();">
                            <i class="fas fa-balance-scale"></i> ${isCompared ? 'Remover da Comparação' : 'Comparar'}
                        </button>
                        <button class="btn btn-gold">
                            <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            `,
        });
    },

    // ============================================================
    // COMPARAÇÃO
    // ============================================================
    toggleCompare(productId) {
        const index = this.state.compareList.indexOf(productId);
        if (index > -1) {
            this.state.compareList.splice(index, 1);
            IdenzaToast?.info('Produto removido da comparação');
        } else {
            if (this.state.compareList.length >= 4) {
                IdenzaToast?.warning('Máximo de 4 produtos para comparação');
                return;
            }
            this.state.compareList.push(productId);
            IdenzaToast?.success('Produto adicionado à comparação');
        }

        IdenzaStorage.set('products_compare', this.state.compareList);
        this._refreshGrid();
    },

    showCompare() {
        if (this.state.compareList.length < 2) {
            IdenzaToast?.warning('Selecione pelo menos 2 produtos para comparar');
            return;
        }

        const products = this.state.compareList.map(id => this._findProduct(id)).filter(Boolean);

        const specs = ['chip', 'clock', 'ram', 'flash', 'connectivity', 'price', 'level'];

        IdenzaModal.open({
            title: 'Comparação de Produtos',
            size: 'xl',
            content: `
                <div class="compare-table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Especificação</th>
                                ${products.map(p => `<th>${p.name}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${specs.map(spec => `
                                <tr>
                                    <td><strong>${this._specLabel(spec)}</strong></td>
                                    ${products.map(p => {
                                        let value = p[spec];
                                        if (Array.isArray(value)) value = value.join(', ');
                                        return `<td>${value || '—'}</td>`;
                                    }).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `,
        });
    },

    // ============================================================
    // WISHLIST
    // ============================================================
    toggleWishlist(productId) {
        const index = this.state.wishlist.indexOf(productId);
        if (index > -1) {
            this.state.wishlist.splice(index, 1);
        } else {
            this.state.wishlist.push(productId);
        }

        IdenzaStorage.set('products_wishlist', this.state.wishlist);
        this._refreshGrid();
    },

    // ============================================================
    // FILTROS E BUSCA
    // ============================================================
    filterByCategory(category) {
        this.state.activeCategory = category;
        this.state.currentPage = 1;
        this._refreshGrid();
    },

    filterByLevel(level) {
        this.state.activeLevel = level;
        this.state.currentPage = 1;
        this._refreshGrid();
    },

    search(query) {
        this.state.searchQuery = query;
        this.state.currentPage = 1;
        this._refreshGrid();
    },

    // ============================================================
    // PAGINAÇÃO
    // ============================================================
    goToPage(page) {
        const products = this._getFilteredProducts();
        const totalPages = Math.ceil(products.length / this.config.itemsPerPage);
        if (page < 1 || page > totalPages) return;

        this.state.currentPage = page;
        const grid = document.getElementById('productsGrid');
        if (grid) {
            grid.innerHTML = this._renderProductCards();
        }
        this._updatePagination();
        grid?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    _updatePagination() {
        const container = document.getElementById('productsPagination');
        if (!container) return;

        const products = this._getFilteredProducts();
        const totalPages = Math.ceil(products.length / this.config.itemsPerPage);

        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        let html = `<div class="pagination-info" style="text-align:center;margin-bottom:var(--space-3);">${products.length} produtos encontrados</div>`;
        html += '<div class="pagination">';

        html += `<button class="page-btn" ${this.state.currentPage === 1 ? 'disabled' : ''} 
                  onclick="IdenzaProducts.goToPage(${this.state.currentPage - 1})">
                  <i class="fas fa-chevron-left"></i></button>`;

        const maxVisible = 5;
        let startPage = Math.max(1, this.state.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            html += `<button class="page-btn ${i === this.state.currentPage ? 'active' : ''}" 
                      onclick="IdenzaProducts.goToPage(${i})">${i}</button>`;
        }

        html += `<button class="page-btn" ${this.state.currentPage >= totalPages ? 'disabled' : ''} 
                  onclick="IdenzaProducts.goToPage(${this.state.currentPage + 1})">
                  <i class="fas fa-chevron-right"></i></button>`;
        html += '</div>';

        container.innerHTML = html;
    },

    // ============================================================
    // EVENTOS
    // ============================================================
    _bindEvents() {
        // Filtros de categoria
        IdenzaDOM.delegate(document, 'click', '#productCategoryFilters .filter-chip', (e, el) => {
            document.querySelectorAll('#productCategoryFilters .filter-chip').forEach(c => c.classList.remove('active'));
            el.classList.add('active');
            this.filterByCategory(el.dataset.category);
        });

        // Filtros de nível
        IdenzaDOM.delegate(document, 'click', '#productLevelFilters .filter-chip', (e, el) => {
            document.querySelectorAll('#productLevelFilters .filter-chip').forEach(c => c.classList.remove('active'));
            el.classList.add('active');
            this.filterByLevel(el.dataset.level);
        });

        // Busca
        const searchInput = document.getElementById('productSearch');
        if (searchInput) {
            searchInput.addEventListener('input', IdenzaApp.debounce(() => {
                this.search(searchInput.value);
            }, 300));
        }

        // Toggle modo de visualização
        const toggleBtn = document.getElementById('toggleViewMode');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.state.viewMode = this.state.viewMode === 'grid' ? 'list' : 'grid';
                toggleBtn.innerHTML = this.state.viewMode === 'grid' ? 
                    '<i class="fas fa-th-large"></i>' : '<i class="fas fa-list"></i>';
                this._refreshGrid();
            });
        }

        // Comparação
        const compareBtn = document.getElementById('showCompareBtn');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => this.showCompare());
        }

        // Wishlist e Compare nos cards
        IdenzaDOM.delegate(document, 'click', '.wishlist-btn', (e, el) => {
            e.stopPropagation();
            this.toggleWishlist(el.dataset.wishlist);
        });

        IdenzaDOM.delegate(document, 'click', '.compare-btn', (e, el) => {
            e.stopPropagation();
            this.toggleCompare(el.dataset.compare);
        });

        // Adicionar ao carrinho
        IdenzaDOM.delegate(document, 'click', '.add-to-cart-btn', (e, el) => {
            e.stopPropagation();
            const product = this._findProduct(el.dataset.product);
            IdenzaToast?.success(`${product?.name || 'Produto'} adicionado ao carrinho!`);
        });
    },

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    _getAllProducts() {
        const all = [];
        const catalog = this.state.catalog;

        ['microcontrollers', 'sbcs', 'robots', 'kits'].forEach(cat => {
            if (catalog[cat]) {
                catalog[cat].forEach(item => {
                    all.push({ ...item, category: cat });
                });
            }
        });

        // Sensores (estão em subcategorias)
        if (catalog.sensors) {
            Object.values(catalog.sensors).forEach(sensorArray => {
                if (Array.isArray(sensorArray)) {
                    sensorArray.forEach(item => {
                        all.push({ ...item, category: 'sensors' });
                    });
                }
            });
        }

        // Atuadores
        if (catalog.actuators) {
            catalog.actuators.forEach(item => {
                all.push({ ...item, category: 'actuators' });
            });
        }

        return all;
    },

    _getFilteredProducts() {
        let products = this._getAllProducts();

        if (this.state.activeCategory !== 'all') {
            products = products.filter(p => p.category === this.state.activeCategory);
        }

        if (this.state.activeLevel !== 'all') {
            products = products.filter(p => p.level === this.state.activeLevel);
        }

        if (this.state.searchQuery) {
            const q = this.state.searchQuery.toLowerCase();
            products = products.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.manufacturer?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q) ||
                p.chip?.toLowerCase().includes(q)
            );
        }

        return products;
    },

    _findProduct(productId) {
        return this._getAllProducts().find(p => p.id === productId) || null;
    },

    _refreshGrid() {
        const grid = document.getElementById('productsGrid');
        if (grid) {
            grid.innerHTML = this._renderProductCards();
        }
        this._updatePagination();
    },

    _getProductIcon(product) {
        const icons = {
            microcontrollers: 'fa-microchip',
            sbcs: 'fa-desktop',
            robots: 'fa-robot',
            sensors: 'fa-eye',
            actuators: 'fa-cog',
            kits: 'fa-box-open',
        };
        return icons[product.category] || 'fa-cube';
    },

    _levelLabel(level) {
        const labels = {
            iniciante: 'Iniciante',
            'iniciante-absoluto': 'Iniciante Absoluto',
            intermediario: 'Intermediário',
            avancado: 'Avançado',
            especialista: 'Especialista',
            profissional: 'Profissional',
        };
        return labels[level] || level;
    },

    _specLabel(spec) {
        const labels = {
            chip: 'Chip',
            clock: 'Clock',
            ram: 'RAM',
            flash: 'Flash',
            connectivity: 'Conectividade',
            price: 'Preço',
            level: 'Nível',
        };
        return labels[spec] || spec;
    },
};

// ============================================================
// REGISTRO NO SISTEMA DE MÓDULOS
// ============================================================
if (typeof IdenzaModules === 'undefined') {
    window.IdenzaModules = {};
}
IdenzaModules.initProducts = (container) => IdenzaProducts.init(container);
