/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — INTERNACIONALIZAÇÃO (i18n)
 * ============================================================
 * 
 * Sistema de tradução e localização com:
 * - Suporte a pt-BR, en, es
 * - Traduções organizadas por módulo
 * - Interpolação de variáveis
 * - Pluralização
 * - Formatação de data/hora localizada
 * - Detecção automática de idioma
 * - Troca dinâmica sem reload
 * 
 * @namespace IdenzaI18n
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaI18n = {
    // ============================================================
    // CONFIGURAÇÃO
    // ============================================================
    config: {
        defaultLocale: 'pt-BR',
        fallbackLocale: 'en',
        supportedLocales: ['pt-BR', 'en', 'es'],
        storageKey: 'idenza_locale',
    },

    state: {
        currentLocale: null,
        translations: {},
        loaded: false,
    },

    // ============================================================
    // DICIONÁRIO DE TRADUÇÕES
    // ============================================================
    _dictionary: {
        'pt-BR': {
            // Geral
            app: {
                name: 'Idenza Robotics Academy',
                tagline: 'Academy & Diagnostic Engine',
                loading: 'Carregando...',
                error: 'Erro',
                success: 'Sucesso',
                warning: 'Atenção',
                info: 'Informação',
                confirm: 'Confirmar',
                cancel: 'Cancelar',
                save: 'Salvar',
                delete: 'Excluir',
                edit: 'Editar',
                close: 'Fechar',
                back: 'Voltar',
                next: 'Próximo',
                previous: 'Anterior',
                search: 'Buscar',
                filter: 'Filtrar',
                export: 'Exportar',
                import: 'Importar',
                refresh: 'Atualizar',
                settings: 'Configurações',
                help: 'Ajuda',
                about: 'Sobre',
                version: 'Versão',
                build: 'Build',
            },

            // Navegação
            nav: {
                dashboard: 'Dashboard',
                academy: 'Academy',
                portfolio: 'Portfólio',
                products: 'Produtos',
                guides: 'Guias',
                diagnostics: 'Diagnóstico',
                simulator: 'Simulador',
                marketplace: 'Loja Idenza',
                settings: 'Configurações',
                terminal: 'Terminal',
            },

            // Dashboard
            dashboard: {
                title: 'Dashboard de Diagnóstico',
                systemStatus: 'Status do Sistema',
                rosNodes: 'Nós ROS',
                iotTelemetry: 'Telemetria IoT',
                eventStream: 'Stream de Eventos',
                rootCauseAnalysis: 'Análise de Causa Raiz',
                actionPlan: 'Plano de Ação',
                riskLevel: 'Nível de Risco',
                operational: 'Operacional',
                degraded: 'Degradado',
                critical: 'Crítico',
                stopped: 'Parado',
                protectiveStop: 'Parada Protetiva Ativa',
                conveyorSpeed: 'Velocidade da Esteira',
                gpuTemperature: 'Temperatura da GPU',
                activeNodes: 'Nós Ativos',
                failedNodes: 'Nós com Falha',
                cpu: 'CPU',
                memory: 'Memória',
                status: 'Status',
                active: 'ATIVO',
                failed: 'FALHOU',
                offline: 'OFFLINE',
                degradedStatus: 'DEGRADADO',
            },

            // Academy
            academy: {
                title: 'Idenza Academy',
                subtitle: 'Cursos e Trilhas de Aprendizado',
                myCourses: 'Meus Cursos',
                allCourses: 'Todos os Cursos',
                inProgress: 'Em Andamento',
                completed: 'Concluído',
                notStarted: 'Não Iniciado',
                startCourse: 'Iniciar Curso',
                continueCourse: 'Continuar',
                lessonCompleted: 'Aula concluída!',
                courseCompleted: 'Curso concluído!',
                certificateEarned: 'Certificado conquistado!',
                downloadCertificate: 'Baixar Certificado',
                prerequisites: 'Pré-requisitos',
                duration: 'Duração',
                level: 'Nível',
                lessons: 'aulas',
                projects: 'projetos',
                beginner: 'Iniciante',
                intermediate: 'Intermediário',
                advanced: 'Avançado',
                expert: 'Especialista',
                professional: 'Profissional',
            },

            // Portfólio
            portfolio: {
                title: 'Portfólio de Projetos',
                subtitle: 'Projetos completos com BOM e passo a passo',
                myProjects: 'Meus Projetos',
                allProjects: 'Todos os Projetos',
                startProject: 'Iniciar Projeto',
                bom: 'Lista de Materiais',
                steps: 'Passo a Passo',
                diagram: 'Diagrama',
                code: 'Código',
                difficulty: 'Dificuldade',
                estimatedTime: 'Tempo Estimado',
                cost: 'Custo Estimado',
                tools: 'Ferramentas Necessárias',
            },

            // Produtos
            products: {
                title: 'Catálogo de Produtos',
                subtitle: 'Hardware, sensores e kits curados pela Idenza',
                microcontrollers: 'Microcontroladores',
                sbcs: 'Computadores de Placa Única',
                robots: 'Robôs e Plataformas',
                sensors: 'Sensores',
                actuators: 'Atuadores e Motores',
                software: 'Software e Frameworks',
                fabrication: 'Ferramentas de Fabricação',
                kits: 'Kits Idenza',
                specifications: 'Especificações',
                price: 'Preço',
                manufacturer: 'Fabricante',
                addToCompare: 'Comparar',
                buyNow: 'Comprar',
                learnMore: 'Saiba Mais',
            },

            // Conexões
            connections: {
                ros: 'ROS',
                mqtt: 'MQTT',
                serial: 'Serial',
                connected: 'Conectado',
                disconnected: 'Desconectado',
                connecting: 'Conectando...',
                error: 'Erro de Conexão',
                latency: 'Latência',
                nodes: 'Nós',
                topics: 'Tópicos',
                services: 'Serviços',
            },

            // Diagnóstico
            diagnostics: {
                title: 'Ferramenta de Diagnóstico',
                subtitle: 'Análise avançada de falhas e causa raiz',
                runDiagnostic: 'Executar Diagnóstico',
                results: 'Resultados',
                noIssues: 'Nenhum problema detectado',
                issuesFound: 'problemas encontrados',
                severity: 'Severidade',
                recommendation: 'Recomendação',
                affectedComponents: 'Componentes Afetados',
                repairTime: 'Tempo Estimado de Reparo',
            },

            // Simulador
            simulator: {
                title: 'Simulador de Falhas',
                subtitle: 'Treine diagnóstico sem riscos',
                scenario: 'Cenário',
                selectScenario: 'Selecionar Cenário',
                startSimulation: 'Iniciar Simulação',
                stopSimulation: 'Parar Simulação',
                score: 'Pontuação',
                timeElapsed: 'Tempo Decorrido',
                hintsUsed: 'Dicas Usadas',
                accuracy: 'Precisão do Diagnóstico',
                replay: 'Repetir',
                nextScenario: 'Próximo Cenário',
            },

            // Marketplace
            marketplace: {
                title: 'Loja Idenza',
                subtitle: 'Kits curados para cada nível',
                addToCart: 'Adicionar ao Carrinho',
                cart: 'Carrinho',
                checkout: 'Finalizar Compra',
                total: 'Total',
                freeShipping: 'Frete Grátis',
                inStock: 'Em Estoque',
                outOfStock: 'Fora de Estoque',
            },

            // Erros e Validação
            errors: {
                required: 'Campo obrigatório',
                invalidEmail: 'E-mail inválido',
                minLength: 'Mínimo de {min} caracteres',
                maxLength: 'Máximo de {max} caracteres',
                networkError: 'Erro de rede. Verifique sua conexão.',
                serverError: 'Erro no servidor. Tente novamente.',
                notFound: 'Não encontrado',
                unauthorized: 'Acesso não autorizado',
                forbidden: 'Acesso proibido',
            },

            // Unidades
            units: {
                celsius: '°C',
                fahrenheit: '°F',
                metersPerSecond: 'm/s',
                rpm: 'RPM',
                newtonMeter: 'N·m',
                kilogram: 'kg',
                gram: 'g',
                millimeter: 'mm',
                centimeter: 'cm',
                meter: 'm',
                kilometer: 'km',
                hertz: 'Hz',
                megahertz: 'MHz',
                gigahertz: 'GHz',
                volt: 'V',
                ampere: 'A',
                watt: 'W',
                hour: 'h',
                minute: 'min',
                second: 's',
            },
        },

        'en': {
            app: {
                name: 'Idenza Robotics Academy',
                tagline: 'Academy & Diagnostic Engine',
                loading: 'Loading...',
                error: 'Error',
                success: 'Success',
                warning: 'Warning',
                info: 'Information',
                confirm: 'Confirm',
                cancel: 'Cancel',
                save: 'Save',
                delete: 'Delete',
                edit: 'Edit',
                close: 'Close',
                back: 'Back',
                next: 'Next',
                previous: 'Previous',
                search: 'Search',
                filter: 'Filter',
                export: 'Export',
                import: 'Import',
                refresh: 'Refresh',
                settings: 'Settings',
                help: 'Help',
                about: 'About',
                version: 'Version',
                build: 'Build',
            },
            nav: {
                dashboard: 'Dashboard',
                academy: 'Academy',
                portfolio: 'Portfolio',
                products: 'Products',
                guides: 'Guides',
                diagnostics: 'Diagnostics',
                simulator: 'Simulator',
                marketplace: 'Idenza Store',
                settings: 'Settings',
                terminal: 'Terminal',
            },
            dashboard: {
                title: 'Diagnostic Dashboard',
                systemStatus: 'System Status',
                rosNodes: 'ROS Nodes',
                iotTelemetry: 'IoT Telemetry',
                eventStream: 'Event Stream',
                rootCauseAnalysis: 'Root Cause Analysis',
                actionPlan: 'Action Plan',
                riskLevel: 'Risk Level',
                operational: 'Operational',
                degraded: 'Degraded',
                critical: 'Critical',
                stopped: 'Stopped',
                protectiveStop: 'Protective Stop Active',
                conveyorSpeed: 'Conveyor Speed',
                gpuTemperature: 'GPU Temperature',
                activeNodes: 'Active Nodes',
                failedNodes: 'Failed Nodes',
                cpu: 'CPU',
                memory: 'Memory',
                status: 'Status',
                active: 'ACTIVE',
                failed: 'FAILED',
                offline: 'OFFLINE',
                degradedStatus: 'DEGRADED',
            },
            academy: {
                title: 'Idenza Academy',
                subtitle: 'Courses and Learning Paths',
                myCourses: 'My Courses',
                allCourses: 'All Courses',
                inProgress: 'In Progress',
                completed: 'Completed',
                notStarted: 'Not Started',
                startCourse: 'Start Course',
                continueCourse: 'Continue',
                lessonCompleted: 'Lesson completed!',
                courseCompleted: 'Course completed!',
                certificateEarned: 'Certificate earned!',
                downloadCertificate: 'Download Certificate',
                prerequisites: 'Prerequisites',
                duration: 'Duration',
                level: 'Level',
                lessons: 'lessons',
                projects: 'projects',
                beginner: 'Beginner',
                intermediate: 'Intermediate',
                advanced: 'Advanced',
                expert: 'Expert',
                professional: 'Professional',
            },
            portfolio: {
                title: 'Project Portfolio',
                subtitle: 'Complete projects with BOM and step-by-step',
                myProjects: 'My Projects',
                allProjects: 'All Projects',
                startProject: 'Start Project',
                bom: 'Bill of Materials',
                steps: 'Step by Step',
                diagram: 'Diagram',
                code: 'Code',
                difficulty: 'Difficulty',
                estimatedTime: 'Estimated Time',
                cost: 'Estimated Cost',
                tools: 'Required Tools',
            },
            products: {
                title: 'Product Catalog',
                subtitle: 'Hardware, sensors and kits curated by Idenza',
                microcontrollers: 'Microcontrollers',
                sbcs: 'Single Board Computers',
                robots: 'Robots & Platforms',
                sensors: 'Sensors',
                actuators: 'Actuators & Motors',
                software: 'Software & Frameworks',
                fabrication: 'Fabrication Tools',
                kits: 'Idenza Kits',
                specifications: 'Specifications',
                price: 'Price',
                manufacturer: 'Manufacturer',
                addToCompare: 'Compare',
                buyNow: 'Buy Now',
                learnMore: 'Learn More',
            },
            connections: {
                ros: 'ROS',
                mqtt: 'MQTT',
                serial: 'Serial',
                connected: 'Connected',
                disconnected: 'Disconnected',
                connecting: 'Connecting...',
                error: 'Connection Error',
                latency: 'Latency',
                nodes: 'Nodes',
                topics: 'Topics',
                services: 'Services',
            },
            diagnostics: {
                title: 'Diagnostics Tool',
                subtitle: 'Advanced failure analysis and root cause',
                runDiagnostic: 'Run Diagnostic',
                results: 'Results',
                noIssues: 'No issues detected',
                issuesFound: 'issues found',
                severity: 'Severity',
                recommendation: 'Recommendation',
                affectedComponents: 'Affected Components',
                repairTime: 'Estimated Repair Time',
            },
            simulator: {
                title: 'Failure Simulator',
                subtitle: 'Train diagnostics without risks',
                scenario: 'Scenario',
                selectScenario: 'Select Scenario',
                startSimulation: 'Start Simulation',
                stopSimulation: 'Stop Simulation',
                score: 'Score',
                timeElapsed: 'Time Elapsed',
                hintsUsed: 'Hints Used',
                accuracy: 'Diagnostic Accuracy',
                replay: 'Replay',
                nextScenario: 'Next Scenario',
            },
            marketplace: {
                title: 'Idenza Store',
                subtitle: 'Curated kits for every level',
                addToCart: 'Add to Cart',
                cart: 'Cart',
                checkout: 'Checkout',
                total: 'Total',
                freeShipping: 'Free Shipping',
                inStock: 'In Stock',
                outOfStock: 'Out of Stock',
            },
            errors: {
                required: 'Required field',
                invalidEmail: 'Invalid email',
                minLength: 'Minimum {min} characters',
                maxLength: 'Maximum {max} characters',
                networkError: 'Network error. Check your connection.',
                serverError: 'Server error. Please try again.',
                notFound: 'Not found',
                unauthorized: 'Unauthorized',
                forbidden: 'Forbidden',
            },
            units: {
                celsius: '°C',
                fahrenheit: '°F',
                metersPerSecond: 'm/s',
                rpm: 'RPM',
                newtonMeter: 'N·m',
                kilogram: 'kg',
                gram: 'g',
                millimeter: 'mm',
                centimeter: 'cm',
                meter: 'm',
                kilometer: 'km',
                hertz: 'Hz',
                megahertz: 'MHz',
                gigahertz: 'GHz',
                volt: 'V',
                ampere: 'A',
                watt: 'W',
                hour: 'h',
                minute: 'min',
                second: 's',
            },
        },

        'es': {
            app: {
                name: 'Idenza Robotics Academy',
                tagline: 'Academy & Diagnostic Engine',
                loading: 'Cargando...',
                error: 'Error',
                success: 'Éxito',
                warning: 'Atención',
                info: 'Información',
                confirm: 'Confirmar',
                cancel: 'Cancelar',
                save: 'Guardar',
                delete: 'Eliminar',
                edit: 'Editar',
                close: 'Cerrar',
                back: 'Volver',
                next: 'Siguiente',
                previous: 'Anterior',
                search: 'Buscar',
                filter: 'Filtrar',
                export: 'Exportar',
                import: 'Importar',
                refresh: 'Actualizar',
                settings: 'Configuración',
                help: 'Ayuda',
                about: 'Acerca de',
                version: 'Versión',
                build: 'Build',
            },
            nav: {
                dashboard: 'Dashboard',
                academy: 'Academia',
                portfolio: 'Portafolio',
                products: 'Productos',
                guides: 'Guías',
                diagnostics: 'Diagnóstico',
                simulator: 'Simulador',
                marketplace: 'Tienda Idenza',
                settings: 'Configuración',
                terminal: 'Terminal',
            },
            dashboard: {
                title: 'Panel de Diagnóstico',
                systemStatus: 'Estado del Sistema',
                operational: 'Operativo',
                degraded: 'Degradado',
                critical: 'Crítico',
                stopped: 'Detenido',
                active: 'ACTIVO',
                failed: 'FALLÓ',
                offline: 'DESCONECTADO',
            },
            academy: {
                title: 'Academia Idenza',
                beginner: 'Principiante',
                intermediate: 'Intermedio',
                advanced: 'Avanzado',
                expert: 'Experto',
                professional: 'Profesional',
            },
            errors: {
                required: 'Campo obligatorio',
                invalidEmail: 'Email inválido',
                networkError: 'Error de red. Verifique su conexión.',
                serverError: 'Error del servidor. Intente nuevamente.',
            },
        },
    },

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init(locale = null) {
        // Detecta idioma
        const detected = locale || 
                        IdenzaStorage.get(this.config.storageKey) || 
                        navigator.language || 
                        this.config.defaultLocale;

        // Encontra o melhor match
        const bestLocale = this._resolveLocale(detected);
        this.setLocale(bestLocale);
        this.state.loaded = true;

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log(`[IdenzaI18n] Localização inicializada: ${bestLocale}`);
        }
    },

    // ============================================================
    // OBTER TRADUÇÃO
    // ============================================================
    t(key, params = {}) {
        const keys = key.split('.');
        let value = this.state.translations;

        // Navega no objeto de traduções
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                // Fallback para en
                value = this._getFallbackTranslation(key);
                break;
            }
        }

        if (typeof value !== 'string') {
            return key; // Retorna a chave se não encontrou
        }

        // Interpolação de variáveis {var}
        return value.replace(/\{(\w+)\}/g, (match, varName) => {
            return params[varName] !== undefined ? params[varName] : match;
        });
    },

    // Atalho
    translate(key, params = {}) {
        return this.t(key, params);
    },

    // ============================================================
    // TROCAR IDIOMA
    // ============================================================
    setLocale(locale) {
        const resolved = this._resolveLocale(locale);
        this.state.currentLocale = resolved;
        this.state.translations = this._dictionary[resolved] || this._dictionary[this.config.fallbackLocale];

        // Atualiza atributo lang no HTML
        document.documentElement.lang = resolved;

        // Persiste
        IdenzaStorage.set(this.config.storageKey, resolved);

        // Emite evento
        IdenzaEvents.emit('idenza:localeChanged', { locale: resolved });

        // Atualiza textos na interface
        this._updateUI();
    },

    getLocale() {
        return this.state.currentLocale;
    },

    getAvailableLocales() {
        return [...this.config.supportedLocales];
    },

    // ============================================================
    // FORMATAÇÃO LOCALIZADA
    // ============================================================
    formatDate(date, options = {}) {
        const d = date instanceof Date ? date : new Date(date);
        return d.toLocaleDateString(this.state.currentLocale, options);
    },

    formatTime(date, options = {}) {
        const d = date instanceof Date ? date : new Date(date);
        return d.toLocaleTimeString(this.state.currentLocale, options);
    },

    formatNumber(number, decimals = 0) {
        return Number(number).toLocaleString(this.state.currentLocale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
    },

    formatCurrency(value, currency = 'BRL') {
        return Number(value).toLocaleString(this.state.currentLocale, {
            style: 'currency',
            currency,
        });
    },

    // ============================================================
    // PLURALIZAÇÃO
    // ============================================================
    pluralize(count, singularKey, pluralKey = null, params = {}) {
        const key = count === 1 ? singularKey : (pluralKey || singularKey + '_plural');
        return this.t(key, { count, ...params });
    },

    // ============================================================
    // MÉTODOS PRIVADOS
    // ============================================================
    _resolveLocale(locale) {
        if (!locale) return this.config.defaultLocale;

        // Match exato
        if (this.config.supportedLocales.includes(locale)) {
            return locale;
        }

        // Match parcial (pt-BR -> pt)
        const short = locale.split('-')[0];
        const partial = this.config.supportedLocales.find(l => l.startsWith(short));
        if (partial) return partial;

        return this.config.fallbackLocale;
    },

    _getFallbackTranslation(key) {
        const fallback = this._dictionary[this.config.fallbackLocale];
        if (!fallback) return key;

        const keys = key.split('.');
        let value = fallback;

        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                return key;
            }
        }

        return typeof value === 'string' ? value : key;
    },

    _updateUI() {
        // Atualiza elementos com atributo data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            el.textContent = this.t(key);
        });

        // Atualiza placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            el.placeholder = this.t(key);
        });

        // Atualiza títulos
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            el.title = this.t(key);
        });

        // Atualiza aria-labels
        document.querySelectorAll('[data-i18n-aria]').forEach(el => {
            const key = el.dataset.i18nAria;
            el.setAttribute('aria-label', this.t(key));
        });
    },

    // ============================================================
    // EXTENSÃO: ADICIONAR TRADUÇÕES
    // ============================================================
    extend(locale, moduleName, translations) {
        if (!this._dictionary[locale]) {
            this._dictionary[locale] = {};
        }
        this._dictionary[locale][moduleName] = {
            ...this._dictionary[locale][moduleName],
            ...translations,
        };

        // Recarrega se for o idioma atual
        if (locale === this.state.currentLocale) {
            this.state.translations = this._dictionary[locale];
        }
    },
};

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    IdenzaI18n.init();
    window.IdenzaI18n = IdenzaI18n;
    // Atalho global
    window.__ = (key, params) => IdenzaI18n.t(key, params);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaI18n;
}
