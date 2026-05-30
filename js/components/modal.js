/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — COMPONENTE MODAL
 * ============================================================
 * 
 * Sistema de modais reutilizáveis com:
 * - Múltiplos tamanhos (sm, md, lg, xl, full)
 * - Fechamento por overlay, botão X ou tecla ESC
 * - Animação de entrada/saída
 * - Foco aprisionado (acessibilidade)
 * - Conteúdo dinâmico via HTML string ou callback
 * - Callbacks de open/close
 * - Empilhamento de modais
 * 
 * @component Modal
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaModal = {
    // ============================================================
    // CONFIGURAÇÃO
    // ============================================================
    config: {
        closeOnOverlay: true,
        closeOnEscape: true,
        animationDuration: 300,
        defaultSize: 'md',
    },

    elements: {
        overlay: null,
        container: null,
        closeBtn: null,
        content: null,
        title: null,
    },

    state: {
        isOpen: false,
        stack: [],
        currentConfig: null,
        previousFocus: null,
    },

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init() {
        this._cacheElements();
        if (!this.elements.overlay) return;

        this._bindEvents();
        this._initAccessibility();

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaModal] Componente inicializado');
        }
    },

    // ============================================================
    // CACHE DE ELEMENTOS
    // ============================================================
    _cacheElements() {
        this.elements.overlay = document.getElementById('modalOverlay');
        this.elements.container = document.getElementById('modalContainer');
        this.elements.closeBtn = document.getElementById('modalClose');
        this.elements.content = document.getElementById('modalContent');
        this.elements.title = document.getElementById('modalTitle');
    },

    // ============================================================
    // EVENTOS
    // ============================================================
    _bindEvents() {
        // Fechar pelo botão X
        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener('click', () => this.close());
        }

        // Fechar pelo overlay
        if (this.elements.overlay) {
            this.elements.overlay.addEventListener('click', (e) => {
                if (e.target === this.elements.overlay && this.config.closeOnOverlay) {
                    this.close();
                }
            });
        }

        // Fechar por tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isOpen && this.config.closeOnEscape) {
                // Só fecha se for o modal do topo da stack
                if (this.state.stack.length > 0) {
                    this.close();
                }
            }
        });

        // Aprisionar foco
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.state.isOpen) {
                this._trapFocus(e);
            }
        });
    },

    // ============================================================
    // ABRIR MODAL
    // ============================================================
    open(options = {}) {
        const config = {
            title: options.title || 'Idenza Robotics Academy',
            content: options.content || '',
            size: options.size || this.config.defaultSize,
            closeOnOverlay: options.closeOnOverlay ?? this.config.closeOnOverlay,
            closeOnEscape: options.closeOnEscape ?? this.config.closeOnEscape,
            onOpen: options.onOpen || null,
            onClose: options.onClose || null,
            className: options.className || '',
            render: options.render || null,
            data: options.data || {},
        };

        // Salva foco atual para restaurar depois
        this.state.previousFocus = document.activeElement;

        // Se já tem modal aberto, empilha
        if (this.state.isOpen) {
            this.state.stack.push(this.state.currentConfig);
        }

        this.state.currentConfig = config;
        this.state.isOpen = true;

        // Atualiza conteúdo
        this._updateContent(config);

        // Atualiza tamanho
        this._updateSize(config.size, config.className);

        // Mostra overlay
        this.elements.overlay.setAttribute('aria-hidden', 'false');
        this.elements.overlay.classList.add('open');

        // Previne scroll do body
        document.body.classList.add('no-scroll');

        // Callback
        if (config.onOpen) {
            config.onOpen(config.data);
        }

        // Foco no modal
        setTimeout(() => {
            this.elements.container?.focus();
        }, 100);

        IdenzaEvents.emit('idenza:modalOpened', { config });
    },

    // ============================================================
    // FECHAR MODAL
    // ============================================================
    close(result = null) {
        if (!this.state.isOpen) return;

        const config = this.state.currentConfig;

        // Callback onClose
        if (config && config.onClose) {
            config.onClose(result);
        }

        // Esconde overlay
        this.elements.overlay.classList.remove('open');
        this.elements.overlay.setAttribute('aria-hidden', 'true');

        // Restaura scroll
        document.body.classList.remove('no-scroll');

        // Restaura foco
        if (this.state.previousFocus) {
            this.state.previousFocus.focus();
        }

        // Restaura modal anterior da stack ou fecha
        if (this.state.stack.length > 0) {
            const previousConfig = this.state.stack.pop();
            setTimeout(() => {
                this._updateContent(previousConfig);
                this._updateSize(previousConfig.size, previousConfig.className);
                this.elements.overlay.classList.add('open');
                this.elements.overlay.setAttribute('aria-hidden', 'false');
                this.state.currentConfig = previousConfig;
            }, this.config.animationDuration);
        } else {
            this.state.isOpen = false;
            this.state.currentConfig = null;
            // Limpa conteúdo após animação
            setTimeout(() => {
                if (!this.state.isOpen && this.elements.content) {
                    this.elements.content.innerHTML = '';
                }
            }, this.config.animationDuration);
        }

        IdenzaEvents.emit('idenza:modalClosed', { result });
    },

    // ============================================================
    // FECHAR TODOS OS MODAIS
    // ============================================================
    closeAll() {
        this.state.stack = [];
        this.close();
    },

    // ============================================================
    // ATUALIZAR CONTEÚDO
    // ============================================================
    _updateContent(config) {
        // Título
        if (this.elements.title) {
            this.elements.title.textContent = config.title;
        }

        // Conteúdo
        if (this.elements.content) {
            if (typeof config.render === 'function') {
                // Render function recebe o container e os dados
                this.elements.content.innerHTML = '';
                config.render(this.elements.content, config.data);
            } else if (typeof config.content === 'string') {
                this.elements.content.innerHTML = config.content;
            } else if (config.content instanceof HTMLElement) {
                this.elements.content.innerHTML = '';
                this.elements.content.appendChild(config.content);
            }
        }
    },

    // ============================================================
    // ATUALIZAR TAMANHO
    // ============================================================
    _updateSize(size, className = '') {
        if (this.elements.container) {
            // Remove classes de tamanho anteriores
            this.elements.container.classList.remove(
                'modal-sm', 'modal-md', 'modal-lg', 'modal-xl', 'modal-full'
            );

            // Adiciona classe de tamanho
            const sizeClass = `modal-${size}`;
            if (['sm', 'md', 'lg', 'xl', 'full'].includes(size)) {
                this.elements.container.classList.add(sizeClass);
            }

            // Classes adicionais
            if (className) {
                const classes = className.split(' ');
                classes.forEach(cls => {
                    if (cls) this.elements.container.classList.add(cls);
                });
            }
        }
    },

    // ============================================================
    // CONTEÚDO PRÉ-DEFINIDO
    // ============================================================

    // Modal de confirmação
    confirm(title, message, onConfirm, onCancel) {
        this.open({
            title: title || 'Confirmar',
            size: 'sm',
            content: `
                <div class="modal-confirm">
                    <p style="margin-bottom: var(--space-5); font-size: var(--text-base);">${message}</p>
                    <div class="btn-group" style="justify-content: flex-end;">
                        <button class="btn btn-outline" id="modalCancelBtn">Cancelar</button>
                        <button class="btn btn-gold" id="modalConfirmBtn">Confirmar</button>
                    </div>
                </div>
            `,
            onOpen: () => {
                document.getElementById('modalCancelBtn')?.addEventListener('click', () => {
                    this.close(false);
                    if (onCancel) onCancel();
                });
                document.getElementById('modalConfirmBtn')?.addEventListener('click', () => {
                    this.close(true);
                    if (onConfirm) onConfirm();
                });
            },
        });
    },

    // Modal de alerta
    alert(title, message, type = 'info') {
        const icons = {
            info: 'fa-info-circle',
            success: 'fa-check-circle',
            warning: 'fa-exclamation-triangle',
            critical: 'fa-times-circle',
        };

        this.open({
            title: title || 'Atenção',
            size: 'sm',
            content: `
                <div class="modal-alert" style="text-align: center;">
                    <i class="fas ${icons[type] || icons.info}" 
                       style="font-size: 3rem; color: var(--color-${type}); margin-bottom: var(--space-4);"></i>
                    <p style="font-size: var(--text-base); margin-bottom: var(--space-5);">${message}</p>
                    <button class="btn btn-gold" id="modalOkBtn">OK</button>
                </div>
            `,
            onOpen: () => {
                document.getElementById('modalOkBtn')?.addEventListener('click', () => this.close());
                document.getElementById('modalOkBtn')?.focus();
            },
        });
    },

    // Modal de loading
    loading(message = 'Carregando...') {
        this.open({
            title: '',
            size: 'sm',
            closeOnOverlay: false,
            closeOnEscape: false,
            content: `
                <div style="text-align: center; padding: var(--space-6);">
                    <i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--gold-primary); margin-bottom: var(--space-3);"></i>
                    <p>${message}</p>
                </div>
            `,
        });
    },

    // ============================================================
    // ACESSIBILIDADE
    // ============================================================
    _initAccessibility() {
        if (this.elements.overlay) {
            this.elements.overlay.setAttribute('aria-hidden', 'true');
        }
        if (this.elements.container) {
            this.elements.container.setAttribute('tabindex', '-1');
        }
    },

    _trapFocus(e) {
        if (!this.elements.container) return;

        const focusableElements = this.elements.container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            // Shift+Tab
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    },

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    isOpen() {
        return this.state.isOpen;
    },

    getCurrentConfig() {
        return this.state.currentConfig;
    },

    getStackSize() {
        return this.state.stack.length;
    },

    // ============================================================
    // DESTRUIÇÃO
    // ============================================================
    destroy() {
        this.closeAll();
        this.elements = {};
        this.state = {
            isOpen: false,
            stack: [],
            currentConfig: null,
            previousFocus: null,
        };
    },
};

// ============================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    IdenzaModal.init();
    window.IdenzaModal = IdenzaModal;
});

// ============================================================
// EXPORTAÇÃO
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaModal;
}
