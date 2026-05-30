/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — COMPONENTE TABLE
 * ============================================================
 * 
 * Sistema de tabelas dinâmicas com:
 * - Ordenação por colunas (clique no header)
 * - Filtro por texto (busca local)
 * - Paginação configurável
 * - Seleção de linhas (simples e múltipla)
 * - Exportação CSV
 * - Colunas redimensionáveis
 * - Dados via array ou API fetch
 * - Templates de célula customizáveis
 * 
 * @component Table
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaTable = {
    // ============================================================
    // CONFIGURAÇÃO PADRÃO
    // ============================================================
    defaultConfig: {
        pageSize: 10,
        sortable: true,
        filterable: true,
        selectable: false,
        multiSelect: false,
        exportable: true,
        resizable: false,
        striped: true,
        hover: true,
        bordered: true,
        compact: false,
        loadingMessage: 'Carregando dados...',
        emptyMessage: 'Nenhum registro encontrado.',
        errorMessage: 'Erro ao carregar dados.',
        noDataMessage: 'Nenhum dado disponível.',
    },

    instances: {},

    // ============================================================
    // CRIAR TABELA
    // ============================================================
    create(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`[IdenzaTable] Container #${containerId} não encontrado`);
            return null;
        }

        const config = { ...this.defaultConfig, ...options };
        const instance = {
            id: containerId,
            container,
            config,
            columns: options.columns || [],
            data: options.data || [],
            filteredData: [],
            currentPage: 1,
            sortColumn: null,
            sortDirection: 'asc',
            selectedRows: new Set(),
            filterQuery: '',
            totalPages: 1,
            isLoading: false,
        };

        // Inicializa
        instance.filteredData = [...instance.data];
        instance.totalPages = Math.ceil(instance.filteredData.length / config.pageSize) || 1;

        // Renderiza estrutura base
        this._renderBase(instance);
        
        // Carrega dados
        if (typeof options.source === 'string') {
            this._fetchData(instance, options.source);
        } else if (options.data && options.data.length > 0) {
            this._renderData(instance);
        }

        // Eventos
        this._bindEvents(instance);

        // Armazena
        this.instances[containerId] = instance;

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log(`[IdenzaTable] Tabela "${containerId}" criada`);
        }

        return instance;
    },

    // ============================================================
    // ATUALIZAR DADOS
    // ============================================================
    updateData(tableId, newData) {
        const instance = this.instances[tableId];
        if (!instance) return;

        instance.data = newData;
        instance.filteredData = [...newData];
        instance.currentPage = 1;
        instance.selectedRows.clear();
        instance.sortColumn = null;
        instance.sortDirection = 'asc';
        instance.filterQuery = '';
        instance.totalPages = Math.ceil(instance.filteredData.length / instance.config.pageSize) || 1;

        this._renderData(instance);
    },

    // ============================================================
    // ATUALIZAR COLUNAS
    // ============================================================
    updateColumns(tableId, newColumns) {
        const instance = this.instances[tableId];
        if (!instance) return;

        instance.config.columns = newColumns;
        instance.columns = newColumns;
        this._renderBase(instance);
        this._renderData(instance);
    },

    // ============================================================
    // ORDENAÇÃO
    // ============================================================
    sort(tableId, columnKey) {
        const instance = this.instances[tableId];
        if (!instance || !instance.config.sortable) return;

        // Alterna direção se mesma coluna
        if (instance.sortColumn === columnKey) {
            instance.sortDirection = instance.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            instance.sortColumn = columnKey;
            instance.sortDirection = 'asc';
        }

        // Ordena
        const column = instance.columns.find(c => c.key === columnKey);
        if (column) {
            instance.filteredData.sort((a, b) => {
                let valA = this._getCellValue(a, columnKey);
                let valB = this._getCellValue(b, columnKey);

                // Detecta tipo
                if (typeof valA === 'number' && typeof valB === 'number') {
                    return instance.sortDirection === 'asc' ? valA - valB : valB - valA;
                }
                
                valA = String(valA || '').toLowerCase();
                valB = String(valB || '').toLowerCase();
                
                if (instance.sortDirection === 'asc') {
                    return valA.localeCompare(valB, 'pt-BR');
                }
                return valB.localeCompare(valA, 'pt-BR');
            });
        }

        instance.currentPage = 1;
        this._renderData(instance);
        this._updateSortIndicators(instance);
    },

    // ============================================================
    // FILTRO
    // ============================================================
    filter(tableId, query) {
        const instance = this.instances[tableId];
        if (!instance || !instance.config.filterable) return;

        instance.filterQuery = query;

        if (!query || query.trim() === '') {
            instance.filteredData = [...instance.data];
        } else {
            const searchTerm = query.toLowerCase().trim();
            instance.filteredData = instance.data.filter(row => {
                return instance.columns.some(col => {
                    const value = this._getCellValue(row, col.key);
                    return String(value || '').toLowerCase().includes(searchTerm);
                });
            });
        }

        instance.currentPage = 1;
        instance.totalPages = Math.ceil(instance.filteredData.length / instance.config.pageSize) || 1;
        this._renderData(instance);
    },

    // ============================================================
    // PAGINAÇÃO
    // ============================================================
    goToPage(tableId, page) {
        const instance = this.instances[tableId];
        if (!instance) return;

        if (page < 1) page = 1;
        if (page > instance.totalPages) page = instance.totalPages;

        instance.currentPage = page;
        this._renderData(instance);
    },

    nextPage(tableId) {
        const instance = this.instances[tableId];
        if (!instance) return;
        this.goToPage(tableId, instance.currentPage + 1);
    },

    prevPage(tableId) {
        const instance = this.instances[tableId];
        if (!instance) return;
        this.goToPage(tableId, instance.currentPage - 1);
    },

    // ============================================================
    // SELEÇÃO
    // ============================================================
    selectRow(tableId, rowIndex, toggle = true) {
        const instance = this.instances[tableId];
        if (!instance || !instance.config.selectable) return;

        const actualIndex = this._getActualIndex(instance, rowIndex);

        if (instance.config.multiSelect) {
            if (toggle && instance.selectedRows.has(actualIndex)) {
                instance.selectedRows.delete(actualIndex);
            } else {
                instance.selectedRows.add(actualIndex);
            }
        } else {
            instance.selectedRows.clear();
            instance.selectedRows.add(actualIndex);
        }

        this._renderData(instance);
        this._emitSelectionEvent(instance);
    },

    selectAll(tableId) {
        const instance = this.instances[tableId];
        if (!instance || !instance.config.multiSelect) return;

        const pageData = this._getPageData(instance);
        pageData.forEach((_, idx) => {
            instance.selectedRows.add(this._getActualIndex(instance, idx));
        });

        this._renderData(instance);
        this._emitSelectionEvent(instance);
    },

    clearSelection(tableId) {
        const instance = this.instances[tableId];
        if (!instance) return;

        instance.selectedRows.clear();
        this._renderData(instance);
        this._emitSelectionEvent(instance);
    },

    getSelectedRows(tableId) {
        const instance = this.instances[tableId];
        if (!instance) return [];

        return Array.from(instance.selectedRows).map(index => instance.filteredData[index]);
    },

    // ============================================================
    // EXPORTAÇÃO
    // ============================================================
    exportCSV(tableId, filename = 'idenza-table-export.csv') {
        const instance = this.instances[tableId];
        if (!instance) return;

        const data = instance.filteredData;
        if (data.length === 0) {
            IdenzaToast?.warning('Nenhum dado para exportar');
            return;
        }

        // Cabeçalho
        const headers = instance.columns.map(col => col.label || col.key);
        
        // Linhas
        const rows = data.map(row => {
            return instance.columns.map(col => {
                let value = this._getCellValue(row, col.key);
                // Escapa valores com vírgula
                if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                    value = `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',');
        });

        const csv = [headers.join(','), ...rows].join('\n');
        
        // Download
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);

        IdenzaToast?.success(`Exportado: ${data.length} registros`);
        IdenzaEvents.emit('idenza:tableExported', { tableId, recordCount: data.length, format: 'csv' });
    },

    // ============================================================
    // MÉTODOS PRIVADOS — RENDERIZAÇÃO
    // ============================================================
    _renderBase(instance) {
        const html = `
            <div class="table-toolbar" id="toolbar-${instance.id}">
                ${instance.config.filterable ? `
                    <div class="table-search">
                        <i class="fas fa-search"></i>
                        <input type="text" 
                               class="table-search-input" 
                               placeholder="Filtrar dados..." 
                               id="filter-${instance.id}"
                               value="${instance.filterQuery}">
                        ${instance.filterQuery ? `
                            <button class="table-search-clear" id="clearFilter-${instance.id}">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                    </div>
                ` : ''}
                <div class="table-actions">
                    ${instance.config.selectable && instance.config.multiSelect ? `
                        <span class="table-selection-count" id="selectionCount-${instance.id}" style="display:none;">
                            ${instance.selectedRows.size} selecionado(s)
                        </span>
                    ` : ''}
                    ${instance.config.exportable ? `
                        <button class="btn btn-sm btn-outline" id="exportBtn-${instance.id}" title="Exportar CSV">
                            <i class="fas fa-download"></i> Exportar
                        </button>
                    ` : ''}
                </div>
            </div>
            <div class="table-container" id="tableContainer-${instance.id}">
                <table class="table ${instance.config.striped ? 'table-striped' : ''} ${instance.config.hover ? 'tr-hover' : ''} ${instance.config.compact ? 'table-compact' : ''}">
                    <thead id="thead-${instance.id}"></thead>
                    <tbody id="tbody-${instance.id}"></tbody>
                </table>
            </div>
            <div class="table-pagination" id="pagination-${instance.id}">
                <div class="pagination-info">
                    Mostrando <span id="showingStart-${instance.id}">0</span>-<span id="showingEnd-${instance.id}">0</span> 
                    de <span id="totalRecords-${instance.id}">0</span> registros
                </div>
                <div class="pagination-controls" id="paginationControls-${instance.id}"></div>
            </div>
            <div class="table-loading" id="loading-${instance.id}" style="display:none;">
                <i class="fas fa-spinner fa-spin"></i> ${instance.config.loadingMessage}
            </div>
            <div class="table-empty" id="empty-${instance.id}" style="display:none;">
                <i class="fas fa-inbox"></i>
                <p>${instance.config.emptyMessage}</p>
            </div>
        `;

        instance.container.innerHTML = html;
    },

    _renderData(instance) {
        const thead = document.getElementById(`thead-${instance.id}`);
        const tbody = document.getElementById(`tbody-${instance.id}`);
        const emptyState = document.getElementById(`empty-${instance.id}`);

        if (!thead || !tbody) return;

        // Mostra/esconde estado vazio
        if (instance.filteredData.length === 0) {
            thead.innerHTML = '';
            tbody.innerHTML = '';
            if (emptyState) emptyState.style.display = 'flex';
            this._renderPagination(instance, false);
            return;
        }

        if (emptyState) emptyState.style.display = 'none';

        // Header
        thead.innerHTML = `
            <tr>
                ${instance.config.selectable ? `
                    <th style="width:40px;">
                        ${instance.config.multiSelect ? `
                            <input type="checkbox" class="table-select-all" id="selectAll-${instance.id}">
                        ` : ''}
                    </th>
                ` : ''}
                ${instance.columns.map(col => `
                    <th class="${instance.config.sortable && col.sortable !== false ? 'table-sortable' : ''}" 
                        data-sort="${col.key}"
                        style="${col.width ? `width:${col.width}` : ''}">
                        ${col.label || col.key}
                        ${instance.config.sortable && col.sortable !== false ? `
                            <span class="sort-indicator">
                                <i class="fas fa-sort"></i>
                                <i class="fas fa-sort-up" style="display:none;"></i>
                                <i class="fas fa-sort-down" style="display:none;"></i>
                            </span>
                        ` : ''}
                    </th>
                `).join('')}
            </tr>
        `;

        // Body
        const pageData = this._getPageData(instance);
        
        tbody.innerHTML = pageData.map((row, pageIndex) => {
            const actualIndex = this._getActualIndex(instance, pageIndex);
            const isSelected = instance.selectedRows.has(actualIndex);
            
            return `
                <tr class="${isSelected ? 'table-row-selected' : ''}" 
                    data-index="${actualIndex}"
                    onclick="${instance.config.selectable ? `IdenzaTable.selectRow('${instance.id}', ${pageIndex})` : ''}">
                    ${instance.config.selectable ? `
                        <td>
                            <input type="checkbox" 
                                   class="table-row-checkbox" 
                                   ${isSelected ? 'checked' : ''}
                                   onclick="event.stopPropagation(); IdenzaTable.selectRow('${instance.id}', ${pageIndex})">
                        </td>
                    ` : ''}
                    ${instance.columns.map(col => {
                        const value = this._getCellValue(row, col.key);
                        return `<td>${col.render ? col.render(value, row) : value}</td>`;
                    }).join('')}
                </tr>
            `;
        }).join('');

        // Atualiza paginação
        this._renderPagination(instance, true);
        
        // Atualiza indicadores de ordenação
        this._updateSortIndicators(instance);

        // Atualiza contagem de seleção
        this._updateSelectionCount(instance);

        // Atualiza checkbox "selecionar todos"
        this._updateSelectAllCheckbox(instance);
    },

    _renderPagination(instance, show) {
        const container = document.getElementById(`pagination-${instance.id}`);
        const controls = document.getElementById(`paginationControls-${instance.id}`);
        const showingStart = document.getElementById(`showingStart-${instance.id}`);
        const showingEnd = document.getElementById(`showingEnd-${instance.id}`);
        const totalRecords = document.getElementById(`totalRecords-${instance.id}`);

        if (!container || !controls) return;

        if (!show) {
            container.style.display = 'none';
            return;
        }

        container.style.display = 'flex';

        // Informação de registros
        const start = (instance.currentPage - 1) * instance.config.pageSize + 1;
        const end = Math.min(start + instance.config.pageSize - 1, instance.filteredData.length);

        if (showingStart) showingStart.textContent = start;
        if (showingEnd) showingEnd.textContent = end;
        if (totalRecords) totalRecords.textContent = instance.filteredData.length;

        // Controles de paginação
        let pagHTML = '';

        pagHTML += `
            <button class="page-btn" onclick="IdenzaTable.goToPage('${instance.id}', 1)" 
                    ${instance.currentPage <= 1 ? 'disabled' : ''} title="Primeira">
                <i class="fas fa-angle-double-left"></i>
            </button>
            <button class="page-btn" onclick="IdenzaTable.prevPage('${instance.id}')" 
                    ${instance.currentPage <= 1 ? 'disabled' : ''} title="Anterior">
                <i class="fas fa-angle-left"></i>
            </button>
        `;

        // Números de página
        const maxVisible = 5;
        let startPage = Math.max(1, instance.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(instance.totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        if (startPage > 1) {
            pagHTML += `<span class="page-ellipsis">...</span>`;
        }

        for (let i = startPage; i <= endPage; i++) {
            pagHTML += `
                <button class="page-btn ${i === instance.currentPage ? 'active' : ''}" 
                        onclick="IdenzaTable.goToPage('${instance.id}', ${i})">
                    ${i}
                </button>
            `;
        }

        if (endPage < instance.totalPages) {
            pagHTML += `<span class="page-ellipsis">...</span>`;
        }

        pagHTML += `
            <button class="page-btn" onclick="IdenzaTable.nextPage('${instance.id}')" 
                    ${instance.currentPage >= instance.totalPages ? 'disabled' : ''} title="Próxima">
                <i class="fas fa-angle-right"></i>
            </button>
            <button class="page-btn" onclick="IdenzaTable.goToPage('${instance.id}', ${instance.totalPages})" 
                    ${instance.currentPage >= instance.totalPages ? 'disabled' : ''} title="Última">
                <i class="fas fa-angle-double-right"></i>
            </button>
        `;

        controls.innerHTML = pagHTML;
    },

    _updateSortIndicators(instance) {
        const thead = document.getElementById(`thead-${instance.id}`);
        if (!thead) return;

        thead.querySelectorAll('.sort-indicator').forEach(indicator => {
            const allIcons = indicator.querySelectorAll('i');
            allIcons.forEach(icon => icon.style.display = 'none');
            
            // Mostra ícone padrão
            if (allIcons[0]) allIcons[0].style.display = 'inline';
        });

        // Destaca coluna ordenada
        if (instance.sortColumn) {
            const sortHeader = thead.querySelector(`[data-sort="${instance.sortColumn}"]`);
            if (sortHeader) {
                const indicator = sortHeader.querySelector('.sort-indicator');
                if (indicator) {
                    const icons = indicator.querySelectorAll('i');
                    icons.forEach(icon => icon.style.display = 'none');
                    
                    if (instance.sortDirection === 'asc' && icons[1]) {
                        icons[1].style.display = 'inline';
                        icons[1].style.color = 'var(--gold-primary)';
                    } else if (instance.sortDirection === 'desc' && icons[2]) {
                        icons[2].style.display = 'inline';
                        icons[2].style.color = 'var(--gold-primary)';
                    }
                }
            }
        }
    },

    _updateSelectionCount(instance) {
        const countEl = document.getElementById(`selectionCount-${instance.id}`);
        if (countEl) {
            if (instance.selectedRows.size > 0) {
                countEl.style.display = 'inline';
                countEl.textContent = `${instance.selectedRows.size} selecionado(s)`;
            } else {
                countEl.style.display = 'none';
            }
        }
    },

    _updateSelectAllCheckbox(instance) {
        const selectAll = document.getElementById(`selectAll-${instance.id}`);
        if (!selectAll) return;

        const pageData = this._getPageData(instance);
        const allSelected = pageData.every((_, idx) => 
            instance.selectedRows.has(this._getActualIndex(instance, idx))
        );
        
        selectAll.checked = allSelected && pageData.length > 0;
    },

    // ============================================================
    // EVENTOS
    // ============================================================
    _bindEvents(instance) {
        // Ordenação por clique no header
        const thead = document.getElementById(`thead-${instance.id}`);
        if (thead) {
            thead.addEventListener('click', (e) => {
                const th = e.target.closest('th.table-sortable');
                if (th && instance.config.sortable) {
                    const columnKey = th.dataset.sort;
                    if (columnKey) {
                        this.sort(instance.id, columnKey);
                    }
                }
            });
        }

        // Filtro
        const filterInput = document.getElementById(`filter-${instance.id}`);
        if (filterInput) {
            filterInput.addEventListener('input', () => {
                this.filter(instance.id, filterInput.value);
            });
        }

        // Limpar filtro
        const clearFilter = document.getElementById(`clearFilter-${instance.id}`);
        if (clearFilter) {
            clearFilter.addEventListener('click', () => {
                this.filter(instance.id, '');
                if (filterInput) filterInput.value = '';
            });
        }

        // Selecionar todos
        const selectAll = document.getElementById(`selectAll-${instance.id}`);
        if (selectAll) {
            selectAll.addEventListener('click', (e) => {
                e.stopPropagation();
                if (selectAll.checked) {
                    this.selectAll(instance.id);
                } else {
                    this.clearSelection(instance.id);
                }
            });
        }

        // Exportar
        const exportBtn = document.getElementById(`exportBtn-${instance.id}`);
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportCSV(instance.id);
            });
        }
    },

    _fetchData(instance, source) {
        instance.isLoading = true;
        const loading = document.getElementById(`loading-${instance.id}`);
        if (loading) loading.style.display = 'flex';

        fetch(source)
            .then(response => {
                if (!response.ok) throw new Error('Erro na requisição');
                return response.json();
            })
            .then(data => {
                instance.data = data;
                instance.filteredData = [...data];
                instance.totalPages = Math.ceil(instance.filteredData.length / instance.config.pageSize) || 1;
                this._renderData(instance);
            })
            .catch(error => {
                console.error(`[IdenzaTable] Erro ao carregar dados:`, error);
                const tbody = document.getElementById(`tbody-${instance.id}`);
                if (tbody) {
                    tbody.innerHTML = `
                        <tr>
                            <td colspan="${instance.columns.length + (instance.config.selectable ? 1 : 0)}" 
                                style="text-align:center;color:var(--color-critical);padding:var(--space-8);">
                                <i class="fas fa-exclamation-triangle"></i> ${instance.config.errorMessage}
                            </td>
                        </tr>
                    `;
                }
            })
            .finally(() => {
                instance.isLoading = false;
                if (loading) loading.style.display = 'none';
            });
    },

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    _getCellValue(row, key) {
        return key.split('.').reduce((obj, k) => obj?.[k], row);
    },

    _getPageData(instance) {
        const start = (instance.currentPage - 1) * instance.config.pageSize;
        const end = start + instance.config.pageSize;
        return instance.filteredData.slice(start, end);
    },

    _getActualIndex(instance, pageIndex) {
        return (instance.currentPage - 1) * instance.config.pageSize + pageIndex;
    },

    _emitSelectionEvent(instance) {
        const selectedData = this.getSelectedRows(instance.id);
        IdenzaEvents.emit('idenza:tableSelectionChanged', {
            tableId: instance.id,
            selectedRows: selectedData,
            count: selectedData.length,
        });
    },

    // ============================================================
    // DESTRUIÇÃO
    // ============================================================
    destroy(tableId) {
        if (tableId) {
            const instance = this.instances[tableId];
            if (instance) {
                instance.container.innerHTML = '';
            }
            delete this.instances[tableId];
        } else {
            Object.keys(this.instances).forEach(id => {
                this.instances[id].container.innerHTML = '';
                delete this.instances[id];
            });
        }
    },
};

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    window.IdenzaTable = IdenzaTable;
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaTable;
}
