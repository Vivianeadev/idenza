/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — COMPONENTE TOAST
 * ============================================================
 * 
 * Sistema de notificações toast (snackbar) com:
 * - Múltiplos tipos: success, warning, critical, info
 * - Duração configurável
 * - Barra de progresso de expiração
 * - Ações (botões no toast)
 * - Empilhamento inteligente
 * - Posição configurável
 * - Animações de entrada e saída
 * - Agrupamento de toasts similares
 * 
 * @component Toast
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaToast = {
    // ============================================================
    // CONFIGURAÇÃO
    // ============================================================
    config: {
        position: 'bottom-right', // top-left, top-right, bottom-left, bottom-right, top-center, bottom-center
        maxToasts: 5,
        defaultDuration: 5000,
        animationDuration: 300,
        showProgress: true,
        groupSimilar: true,
        pauseOnHover: true,
    },

    elements: {
        container: null,
    },

    state: {
        toasts: [],
        idCounter: 0,
    },

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init(options = {}) {
        this.config = { ...this.config, ...options };
        this._createContainer();

        // Escuta eventos de toast
        IdenzaEvents.on('idenza:showToast', (data) => {
            this.show(data.message, data.type, data.duration, data.options);
        });

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaToast] Componente inicializado');
        }
    },

    // ============================================================
    // CRIAR CONTAINER
    // ============================================================
    _createContainer() {
        // Verifica se já existe
        let container = document.getElementById('toastContainer');
        
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-atomic', 'false');
            document.body.appendChild(container);
        }

        // Aplica posição
        container.className = `toast-container toast-${this.config.position}`;
        this.elements.container = container;
    },

    // ============================================================
    // MOSTRAR TOAST
    // ============================================================
    show(message, type = 'info', duration = null, options = {}) {
        const id = ++this.state.idCounter;
        const toastDuration = duration || this.config.defaultDuration;

        // Verifica limite de toasts
        if (this.state.toasts.length >= this.config.maxToasts) {
            this._dismissOldest();
        }

        // Verifica agrupamento de toasts similares
        if (this.config.groupSimilar) {
            const similar = this._findSimilar(message, type);
            if (similar) {
                this._updateSimilar(similar, message);
                return similar.id;
            }
        }

        // Cria elemento toast
        const toast = this._createToastElement(id, message, type, options);

        // Adiciona ao container
        this.elements.container.appendChild(toast);

        // Registra no estado
        const toastData = {
            id,
            element: toast,
            type,
            message,
            timer: null,
            progressTimer: null,
            remainingTime: toastDuration,
            createdAt: Date.now(),
        };

        this.state.toasts.push(toastData);

        // Animação de entrada
        requestAnimationFrame(() => {
            toast.classList.add('toast-enter');
        });

        // Inicia timer de auto-dismiss
        if (toastDuration > 0) {
            this._startTimer(toastData, toastDuration);
        }

        // Eventos de hover (pausar timer)
        if (this.config.pauseOnHover) {
            toast.addEventListener('mouseenter', () => this._pauseTimer(toastData));
            toast.addEventListener('mouseleave', () => this._resumeTimer(toastData));
        }

        // Botão de fechar
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.dismiss(id));
        }

        // Botões de ação
        if (options.actions) {
            this._addActions(toast, options.actions, id);
        }

        IdenzaEvents.emit('idenza:toastShown', { id, type, message });

        return id;
    },

    // ============================================================
    // ATALHOS PARA TIPOS DE TOAST
    // ============================================================
    success(message, duration, options) {
        return this.show(message, 'success', duration, options);
    },

    warning(message, duration, options) {
        return this.show(message, 'warning', duration, options);
    },

    error(message, duration, options) {
        return this.show(message, 'critical', duration, options);
    },

    info(message, duration, options) {
        return this.show(message, 'info', duration, options);
    },

    // ============================================================
    // DISMISS (FECHAR)
    // ============================================================
    dismiss(id) {
        const index = this.state.toasts.findIndex(t => t.id === id);
        if (index === -1) return;

        const toastData = this.state.toasts[index];
        
        // Limpa timers
        this._clearTimers(toastData);

        // Animação de saída
        toastData.element.classList.add('toast-exit');
        toastData.element.classList.remove('toast-enter');

        // Remove após animação
        setTimeout(() => {
            if (toastData.element.parentNode) {
                toastData.element.parentNode.removeChild(toastData.element);
            }
            this.state.toasts = this.state.toasts.filter(t => t.id !== id);
            IdenzaEvents.emit('idenza:toastDismissed', { id });
        }, this.config.animationDuration);
    },

    dismissAll() {
        [...this.state.toasts].forEach(t => this.dismiss(t.id));
    },

    // ============================================================
    // MÉTODOS PRIVADOS
    // ============================================================
    _createToastElement(id, message, type, options) {
        const icons = {
            success: 'fa-check-circle',
            warning: 'fa-exclamation-triangle',
            critical: 'fa-times-circle',
            info: 'fa-info-circle',
        };

        const titles = {
            success: 'Sucesso',
            warning: 'Atenção',
            critical: 'Erro',
            info: 'Informação',
        };

        const element = document.createElement('div');
        element.className = `toast toast-${type}`;
        element.id = `toast-${id}`;
        element.setAttribute('role', 'alert');
        element.setAttribute('aria-live', 'assertive');

        element.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${icons[type] || icons.info}"></i>
            </div>
            <div class="toast-content">
                ${options.title ? `<div class="toast-title">${options.title}</div>` : ''}
                ${!options.title ? `<div class="toast-title">${titles[type]}</div>` : ''}
                <div class="toast-message">${message}</div>
                ${options.actions ? '<div class="toast-actions"></div>' : ''}
            </div>
            <button class="toast-close" aria-label="Fechar notificação">
                <i class="fas fa-times"></i>
            </button>
            ${this.config.showProgress ? '<div class="toast-progress"><div class="toast-progress-bar"></div></div>' : ''}
        `;

        return element;
    },

    _startTimer(toastData, duration) {
        // Timer de dismiss
        toastData.timer = setTimeout(() => {
            this.dismiss(toastData.id);
        }, duration);

        // Barra de progresso
        if (this.config.showProgress) {
            const progressBar = toastData.element.querySelector('.toast-progress-bar');
            if (progressBar) {
                progressBar.style.animation = `toastProgress ${duration}ms linear forwards`;
            }
        }

        toastData.remainingTime = duration;
        toastData.startedAt = Date.now();
    },

    _pauseTimer(toastData) {
        if (toastData.timer) {
            clearTimeout(toastData.timer);
            toastData.timer = null;
            toastData.remainingTime -= (Date.now() - toastData.startedAt);

            // Pausa barra de progresso
            const progressBar = toastData.element.querySelector('.toast-progress-bar');
            if (progressBar) {
                progressBar.style.animationPlayState = 'paused';
            }
        }
    },

    _resumeTimer(toastData) {
        if (toastData.remainingTime > 0) {
            toastData.startedAt = Date.now();
            this._startTimer(toastData, toastData.remainingTime);

            // Resume barra de progresso
            const progressBar = toastData.element.querySelector('.toast-progress-bar');
            if (progressBar) {
                progressBar.style.animationPlayState = 'running';
            }
        }
    },

    _clearTimers(toastData) {
        if (toastData.timer) {
            clearTimeout(toastData.timer);
            toastData.timer = null;
        }
        if (toastData.progressTimer) {
            clearTimeout(toastData.progressTimer);
            toastData.progressTimer = null;
        }
    },

    _dismissOldest() {
        if (this.state.toasts.length > 0) {
            this.dismiss(this.state.toasts[0].id);
        }
    },

    _findSimilar(message, type) {
        return this.state.toasts.find(t => 
            t.type === type && 
            t.message === message &&
            t.element.classList.contains('toast-enter')
        );
    },

    _updateSimilar(toastData, message) {
        const messageEl = toastData.element.querySelector('.toast-message');
        if (messageEl) {
            // Adiciona contador
            const match = messageEl.textContent.match(/\((\d+)x\)$/);
            if (match) {
                const count = parseInt(match[1]) + 1;
                messageEl.textContent = message + ` (${count}x)`;
            } else {
                messageEl.textContent = message + ' (2x)';
            }
        }

        // Reseta timer
        this._clearTimers(toastData);
        this._startTimer(toastData, this.config.defaultDuration);
    },

    _addActions(toastElement, actions, toastId) {
        const actionsContainer = toastElement.querySelector('.toast-actions');
        if (!actionsContainer) return;

        actions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'toast-action-btn';
            btn.textContent = action.label;
            btn.addEventListener('click', () => {
                if (action.callback) {
                    action.callback(toastId);
                }
                if (action.dismiss !== false) {
                    this.dismiss(toastId);
                }
            });
            actionsContainer.appendChild(btn);
        });
    },

    // ============================================================
    // ATUALIZAR POSIÇÃO
    // ============================================================
    setPosition(position) {
        this.config.position = position;
        if (this.elements.container) {
            this.elements.container.className = `toast-container toast-${position}`;
        }
    },

    // ============================================================
    // DESTRUIÇÃO
    // ============================================================
    destroy() {
        this.dismissAll();
        if (this.elements.container) {
            this.elements.container.remove();
            this.elements.container = null;
        }
        this.state.toasts = [];
    },
};

// ============================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    IdenzaToast.init();
    window.IdenzaToast = IdenzaToast;
});

// ============================================================
// EXPORTAÇÃO
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaToast;
}
