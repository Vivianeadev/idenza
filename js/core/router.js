/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — ROUTER SPA
 * ============================================================
 * 
 * Roteador simples para Single Page Application.
 * Gerencia navegação entre módulos sem recarregar a página.
 * 
 * Features:
 * - Navegação baseada em hash (#)
 * - Histórico do navegador (pushState)
 * - Guardas de rota (auth, permissões)
 * - Parâmetros de rota
 * - Transições animadas entre módulos
 * 
 * @namespace IdenzaRouter
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaRouter = {
    // ============================================================
    // CONFIGURAÇÃO
    // ============================================================
    _routes: {},
    _guards: {},
    _currentRoute: null,
    _previousRoute: null,
    _transitioning: false,

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init() {
        // Escuta mudanças de hash
        window.addEventListener('hashchange', () => {
            this._handleRouteChange();
        });

        // Escuta popstate (navegação do browser)
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.route) {
                this.navigate(e.state.route, false);
            }
        });

        // Carrega rota inicial
        this._handleRouteChange();

        if (window.IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaRouter] Roteador inicializado');
        }
    },

    // ============================================================
    // REGISTRAR ROTAS
    // ============================================================
    register(routes) {
        Object.entries(routes).forEach(([path, config]) => {
            this._routes[path] = {
                module: config.module || path,
                title: config.title || path,
                guard: config.guard || null,
                params: config.params || {},
                animate: config.animate !== false,
                onEnter: config.onEnter || null,
                onLeave: config.onLeave || null,
            };
        });

        if (window.IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaRouter] Rotas registradas:', Object.keys(this._routes));
        }
    },

    // ============================================================
    // REGISTRAR GUARDAS
    // ============================================================
    registerGuard(name, guardFn) {
        this._guards[name] = guardFn;
    },

    // ============================================================
    // NAVEGAR
    // ============================================================
    navigate(route, addToHistory = true) {
        if (this._transitioning) {
            if (window.IdenzaApp && IdenzaApp.config.debug) {
                console.warn('[IdenzaRouter] Navegação bloqueada: transição em andamento');
            }
            return;
        }

        // Resolve a rota
        const resolvedRoute = this._resolveRoute(route);

        if (!resolvedRoute) {
            console.warn(`[IdenzaRouter] Rota não encontrada: ${route}`);
            // Fallback para dashboard
            this.navigate('dashboard');
            return;
        }

        // Verifica guarda
        if (resolvedRoute.guard) {
            const guardFn = this._guards[resolvedRoute.guard];
            if (guardFn && !guardFn(resolvedRoute)) {
                console.warn(`[IdenzaRouter] Acesso negado pela guarda "${resolvedRoute.guard}"`);
                IdenzaEvents.emit('idenza:accessDenied', { route: resolvedRoute });
                return;
            }
        }

        // Executa onLeave da rota atual
        if (this._currentRoute && this._currentRoute.onLeave) {
            this._currentRoute.onLeave(this._currentRoute);
        }

        // Atualiza histórico
        this._previousRoute = this._currentRoute;
        this._currentRoute = resolvedRoute;

        // Adiciona ao histórico do navegador
        if (addToHistory) {
            const url = `#${route}`;
            history.pushState({ route }, resolvedRoute.title, url);
        }

        // Atualiza título da página
        document.title = `${resolvedRoute.title} | Idenza Robotics Academy`;

        // Executa transição
        this._transitionTo(resolvedRoute);

        // Emite evento
        IdenzaEvents.navigationChanged(resolvedRoute.module);
    },

    // ============================================================
    // VOLTAR
    // ============================================================
    back() {
        if (this._previousRoute) {
            this.navigate(this._previousRoute.module, false);
        } else {
            history.back();
        }
    },

    // ============================================================
    // ROTA ATUAL
    // ============================================================
    getCurrentRoute() {
        return this._currentRoute;
    },

    getPreviousRoute() {
        return this._previousRoute;
    },

    // ============================================================
    // MÉTODOS PRIVADOS
    // ============================================================
    _handleRouteChange() {
        const hash = window.location.hash.replace('#', '') || 'dashboard';
        this.navigate(hash, false);
    },

    _resolveRoute(route) {
        // Rota exata
        if (this._routes[route]) {
            return { ...this._routes[route], path: route };
        }

        // Rota com parâmetros (ex: academy/trilha-ros)
        const parts = route.split('/');
        const baseRoute = parts[0];

        if (this._routes[baseRoute]) {
            const resolved = { ...this._routes[baseRoute], path: route };
            // Extrai parâmetros
            if (parts.length > 1) {
                resolved.params = {
                    ...resolved.params,
                    subPath: parts.slice(1).join('/'),
                    segments: parts.slice(1),
                };
            }
            return resolved;
        }

        return null;
    },

    _transitionTo(route) {
        this._transitioning = true;

        // Animação de saída do módulo atual
        const container = document.getElementById('moduleContainer');
        if (container && route.animate) {
            container.style.opacity = '0';
            container.style.transform = 'translateY(10px)';
        }

        // Carrega novo módulo
        setTimeout(() => {
            if (window.IdenzaApp && typeof IdenzaApp.loadModule === 'function') {
                IdenzaApp.loadModule(route.module);
            }

            // Executa onEnter
            if (route.onEnter) {
                route.onEnter(route);
            }

            // Restaura animação
            if (container && route.animate) {
                setTimeout(() => {
                    container.style.opacity = '1';
                    container.style.transform = 'translateY(0)';
                }, 50);
            }

            this._transitioning = false;
        }, route.animate ? 200 : 0);
    },
};

// ============================================================
// ROTAS PADRÃO DA IDENZA ROBOTICS ACADEMY
// ============================================================
const IDENZA_ROUTES = {
    'dashboard': {
        module: 'dashboard',
        title: 'Dashboard',
    },
    'academy': {
        module: 'academy',
        title: 'Academy',
    },
    'academy/:courseId': {
        module: 'academy',
        title: 'Curso',
    },
    'academy/:courseId/:lessonId': {
        module: 'academy',
        title: 'Aula',
    },
    'portfolio': {
        module: 'portfolio',
        title: 'Portfólio',
    },
    'portfolio/:projectId': {
        module: 'portfolio',
        title: 'Projeto',
    },
    'products': {
        module: 'products',
        title: 'Catálogo de Produtos',
    },
    'guides': {
        module: 'guides',
        title: 'Guias',
    },
    'diagnostics': {
        module: 'diagnostics',
        title: 'Diagnóstico',
    },
    'simulator': {
        module: 'simulator',
        title: 'Simulador',
    },
    'marketplace': {
        module: 'marketplace',
        title: 'Loja Idenza',
    },
    'settings': {
        module: 'settings',
        title: 'Configurações',
    },
    'terminal': {
        module: 'terminal',
        title: 'Terminal SSH',
    },
};

// ============================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    IdenzaRouter.register(IDENZA_ROUTES);
    IdenzaRouter.init();
    window.IdenzaRouter = IdenzaRouter;
});

// ============================================================
// EXPORTAÇÃO
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IdenzaRouter, IDENZA_ROUTES };
}
