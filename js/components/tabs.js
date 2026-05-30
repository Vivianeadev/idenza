/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — COMPONENTE TABS
 * ============================================================
 * 
 * Sistema de abas reutilizável com:
 * - Navegação por clique e teclado (setas)
 * - Indicador animado
 * - Conteúdo dinâmico com lazy loading
 * - Tabs aninhadas
 * - Persistência de tab ativa
 * - URLs com hash para compartilhamento
 * 
 * @component Tabs
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaTabs = {
    // ============================================================
    // CONFIGURAÇÃO
    // ============================================================
    config: {
        activeClass: 'active',
        tabBtnSelector: '.tab-btn',
        tabContentSelector: '.tab-content',
        animate: true,
        lazyLoad: false,
        persistState: true,
    },

    instances: {},

    // ============================================================
    // INICIALIZAR GRUPO DE TABS
    // ============================================================
    init(tabGroupId, options = {}) {
        const config = { ...this.config, ...options };
        const container = document.getElementById(tabGroupId);
        if (!container) return null;

        const instance = {
            id: tabGroupId,
            container,
            config,
            activeTab: null,
            tabButtons: container.querySelectorAll(config.tabBtnSelector),
            tabContents: container.querySelectorAll(config.tabContentSelector),
        };

        // Determina tab ativa inicial
        const savedTab = config.persistState ? 
            IdenzaApp?.getStorage(`tab_${tabGroupId}`) : null;
        const hashTab = window.location.hash.replace('#tab-', '');
        const defaultTab = instance.tabButtons[0]?.dataset.tab;

        instance.activeTab = savedTab || hashTab || defaultTab;

        // Inicializa
        this._bindTabEvents(instance);
        this._activateTab(instance, instance.activeTab, false);

        // Armazena instância
        this.instances[tabGroupId] = instance;

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log(`[IdenzaTabs] Grupo "${tabGroupId}" inicializado`);
        }

        return instance;
    },

    // ============================================================
    // ATIVAR TAB
    // ============================================================
    activate(tabGroupId, tabId) {
        const instance = this.instances[tabGroupId];
        if (!instance) return;
        this._activateTab(instance, tabId, true);
    },

    _activateTab(instance, tabId, animate = true) {
        if (instance.activeTab === tabId) return;
        instance.activeTab = tabId;

        // Atualiza botões
        instance.tabButtons.forEach(btn => {
            const isActive = btn.dataset.tab === tabId;
            btn.classList.toggle(instance.config.activeClass, isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Atualiza conteúdos
        instance.tabContents.forEach(content => {
            const contentId = content.id;
            const shouldShow = contentId === tabId || contentId === `tab-${tabId}`;

            if (shouldShow) {
                content.classList.add(instance.config.activeClass);
                content.setAttribute('aria-hidden', 'false');

                // Lazy loading
                if (instance.config.lazyLoad && !content.dataset.loaded) {
                    this._loadTabContent(content, instance);
                    content.dataset.loaded = 'true';
                }

                // Animação
                if (animate && instance.config.animate) {
                    content.style.animation = 'none';
                    content.offsetHeight; // Trigger reflow
                    content.style.animation = 'fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) both';
                }
            } else {
                content.classList.remove(instance.config.activeClass);
                content.setAttribute('aria-hidden', 'true');
                content.style.animation = '';
            }
        });

        // Persiste
        if (instance.config.persistState) {
            IdenzaApp?.setStorage(`tab_${instance.id}`, tabId);
        }

        // Emite evento
        IdenzaEvents.emit('idenza:tabChanged', {
            groupId: instance.id,
            tabId,
        });
    },

    // ============================================================
    // EVENTOS DAS TABS
    // ============================================================
    _bindTabEvents(instance) {
        // Clique nos botões
        instance.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                this._activateTab(instance, tabId, true);
            });
        });

        // Navegação por teclado
        instance.container.addEventListener('keydown', (e) => {
            const currentBtn = document.activeElement;
            if (!currentBtn || !currentBtn.classList.contains('tab-btn')) return;

            const buttons = Array.from(instance.tabButtons);
            const currentIndex = buttons.indexOf(currentBtn);

            let newIndex;

            switch (e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    newIndex = (currentIndex + 1) % buttons.length;
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    newIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                    break;
                case 'Home':
                    e.preventDefault();
                    newIndex = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    newIndex = buttons.length - 1;
                    break;
            }

            if (newIndex !== undefined && newIndex !== currentIndex) {
                const tabId = buttons[newIndex].dataset.tab;
                this._activateTab(instance, tabId, true);
                buttons[newIndex].focus();
            }
        });
    },

    // ============================================================
    // LAZY LOADING DE CONTEÚDO
    // ============================================================
    _loadTabContent(contentElement, instance) {
        const tabId = contentElement.id;
        const source = contentElement.dataset.source;

        if (source) {
            // Carrega conteúdo via fetch
            fetch(source)
                .then(response => response.text())
                .then(html => {
                    contentElement.innerHTML = html;
                    IdenzaEvents.emit('idenza:tabContentLoaded', {
                        groupId: instance.id,
                        tabId,
                    });
                })
                .catch(error => {
                    contentElement.innerHTML = `
                        <div class="alert alert-warning">
                            <div class="alert-icon"><i class="fas fa-exclamation-triangle"></i></div>
                            <div class="alert-content">
                                <div class="alert-title">Erro ao carregar conteúdo</div>
                                <div class="alert-message">${error.message}</div>
                            </div>
                        </div>
                    `;
                });
        }
    },

    // ============================================================
    // MÉTODOS DE INSTÂNCIA
    // ============================================================
    getActiveTab(tabGroupId) {
        return this.instances[tabGroupId]?.activeTab || null;
    },

    getTabCount(tabGroupId) {
        return this.instances[tabGroupId]?.tabButtons.length || 0;
    },

    next(tabGroupId) {
        const instance = this.instances[tabGroupId];
        if (!instance) return;

        const buttons = Array.from(instance.tabButtons);
        const currentIndex = buttons.findIndex(btn => btn.dataset.tab === instance.activeTab);
        const nextIndex = (currentIndex + 1) % buttons.length;
        this._activateTab(instance, buttons[nextIndex].dataset.tab, true);
    },

    previous(tabGroupId) {
        const instance = this.instances[tabGroupId];
        if (!instance) return;

        const buttons = Array.from(instance.tabButtons);
        const currentIndex = buttons.findIndex(btn => btn.dataset.tab === instance.activeTab);
        const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        this._activateTab(instance, buttons[prevIndex].dataset.tab, true);
    },

    // ============================================================
    // DESTRUIÇÃO
    // ============================================================
    destroy(tabGroupId) {
        if (tabGroupId) {
            delete this.instances[tabGroupId];
        } else {
            this.instances = {};
        }
    },
};

// ============================================================
// INICIALIZAÇÃO AUTOMÁTICA DE TABS EXISTENTES
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa tabs que tenham o atributo data-tabs="auto"
    document.querySelectorAll('[data-tabs="auto"]').forEach(container => {
        const tabGroupId = container.id || `tabs-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
        if (!container.id) container.id = tabGroupId;
        IdenzaTabs.init(tabGroupId);
    });

    window.IdenzaTabs = IdenzaTabs;
});

// ============================================================
// EXPORTAÇÃO
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaTabs;
}
