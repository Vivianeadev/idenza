/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — GERENCIADOR DE ESTADO
 * ============================================================
 * 
 * Sistema reativo de gerenciamento de estado global.
 * Implementa um pattern similar a Redux/Zustand simplificado.
 * 
 * Features:
 * - Estado centralizado e imutável
 * - Sistema de subscribers (observers)
 * - Middleware para logging e debug
 * - Persistência seletiva em localStorage
 * - Undo/Redo (histórico de estados)
 * 
 * @namespace IdenzaState
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaState = {
    // ============================================================
    // ESTADO INICIAL
    // ============================================================
    _state: {
        // Sistema
        app: {
            name: 'Idenza Robotics Academy',
            version: '6.0.0',
            isLoaded: false,
            isInitialized: false,
            currentModule: 'dashboard',
            currentTheme: 'luxury',
            language: 'pt-BR',
            sidebarOpen: false,
            menuOpen: false,
            searchOpen: false,
            modalOpen: false,
            modalData: null,
        },

        // Conexões
        connections: {
            ros: {
                connected: false,
                url: 'ws://localhost:9090',
                nodes: [],
                topics: [],
                lastMessage: null,
                latency: 0,
            },
            mqtt: {
                connected: false,
                url: 'ws://localhost:9001',
                broker: 'localhost',
                subscriptions: [],
                lastMessage: null,
                latency: 0,
            },
            serial: {
                connected: false,
                port: null,
                baudRate: 115200,
            },
        },

        // Sistema robótico (dados de diagnóstico)
        diagnostic: {
            robotStatus: 'unknown', // operational, degraded, critical, stopped
            robotType: null,
            robotName: null,
            activeNodes: [],
            failedNodes: [],
            sensorData: {},
            conveyorSpeed: 0,
            gpuTemperature: 0,
            activeAlerts: [],
            protectiveStopActive: false,
            lastUpdate: null,
        },

        // Academy
        academy: {
            currentCourse: null,
            currentLesson: null,
            completedLessons: [],
            completedCourses: [],
            certificates: [],
            progress: {}, // { courseId: percentage }
            bookmarks: [],
            notes: {},
        },

        // Portfólio
        portfolio: {
            activeProjects: [],
            completedProjects: [],
            favoriteProjects: [],
            currentProject: null,
        },

        // Usuário (local)
        user: {
            name: '',
            email: '',
            role: 'guest', // guest, student, engineer, instructor, admin
            preferences: {
                animationsEnabled: true,
                particlesEnabled: true,
                soundEnabled: false,
                autoConnect: false,
                fontSize: 'normal', // small, normal, large
            },
        },

        // UI
        ui: {
            toasts: [],
            activeTab: null,
            scrollPosition: 0,
            searchQuery: '',
            searchResults: [],
            isLoading: false,
            loadingMessage: '',
        },

        // Métricas e Analytics (local)
        metrics: {
            sessionStart: null,
            modulesVisited: [],
            timeSpent: {},
            errorsEncountered: 0,
        },
    },

    // ============================================================
    // HISTÓRICO (UNDO/REDO)
    // ============================================================
    _history: {
        past: [],
        future: [],
        maxHistory: 50,
    },

    // ============================================================
    // SUBSCRIBERS
    // ============================================================
    _subscribers: {},
    _subscriberId: 0,

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init() {
        // Carrega estado persistido
        this._loadPersistedState();
        
        // Marca hora de início da sessão
        this._state.metrics.sessionStart = Date.now();
        
        this._state.app.isInitialized = true;
        
        if (window.IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaState] Estado inicializado', this._state);
        }
    },

    // ============================================================
    // LEITURA DE ESTADO (GETTERS)
    // ============================================================
    getState(path = null) {
        if (!path) return this._deepClone(this._state);
        return this._deepClone(this._getNestedValue(this._state, path));
    },

    get(path) {
        return this._deepClone(this._getNestedValue(this._state, path));
    },

    // ============================================================
    // ESCRITA DE ESTADO (SETTERS)
    // ============================================================
    setState(path, value) {
        // Salva no histórico antes de alterar
        this._saveToHistory();

        // Atualiza o estado
        if (typeof path === 'string') {
            this._setNestedValue(this._state, path, value);
        } else if (typeof path === 'object') {
            // Atualização em lote (merge profundo)
            this._deepMerge(this._state, path);
        }

        // Limpa futuro (nova ação invalida redo)
        this._history.future = [];

        // Notifica subscribers
        this._notifySubscribers(path, value);

        // Persiste se necessário
        this._persistState();

        if (window.IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaState] Estado atualizado:', path, value);
        }
    },

    // Atalho para múltiplas atualizações
    batch(updates) {
        this._saveToHistory();
        
        Object.entries(updates).forEach(([path, value]) => {
            this._setNestedValue(this._state, path, value);
            this._notifySubscribers(path, value);
        });

        this._history.future = [];
        this._persistState();
    },

    // ============================================================
    // UNDO / REDO
    // ============================================================
    undo() {
        if (this._history.past.length === 0) return false;

        const current = this._deepClone(this._state);
        this._history.future.push(current);
        const previous = this._history.past.pop();
        this._state = previous;

        this._notifySubscribers('*', this._state);
        this._persistState();
        return true;
    },

    redo() {
        if (this._history.future.length === 0) return false;

        const current = this._deepClone(this._state);
        this._history.past.push(current);
        const next = this._history.future.pop();
        this._state = next;

        this._notifySubscribers('*', this._state);
        this._persistState();
        return true;
    },

    canUndo() {
        return this._history.past.length > 0;
    },

    canRedo() {
        return this._history.future.length > 0;
    },

    // ============================================================
    // SUBSCRIBERS (SISTEMA REATIVO)
    // ============================================================
    subscribe(path, callback) {
        const id = ++this._subscriberId;
        
        if (!this._subscribers[path]) {
            this._subscribers[path] = [];
        }
        
        this._subscribers[path].push({ id, callback });

        // Retorna função de unsubscribe
        return () => {
            this._subscribers[path] = this._subscribers[path].filter(sub => sub.id !== id);
        };
    },

    subscribeToAll(callback) {
        return this.subscribe('*', callback);
    },

    // ============================================================
    // PERSISTÊNCIA
    // ============================================================
    _persistState() {
        try {
            const toPersist = {
                app: {
                    currentTheme: this._state.app.currentTheme,
                    language: this._state.app.language,
                },
                user: this._state.user,
                academy: this._state.academy,
                portfolio: this._state.portfolio,
            };
            localStorage.setItem('idenza_state', JSON.stringify(toPersist));
        } catch (e) {
            // localStorage cheio ou indisponível
        }
    },

    _loadPersistedState() {
        try {
            const saved = localStorage.getItem('idenza_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                this._deepMerge(this._state, parsed);
            }
        } catch (e) {
            // Dados corrompidos, usa estado inicial
        }
    },

    // ============================================================
    // RESET
    // ============================================================
    reset(path = null) {
        if (path) {
            // Reseta apenas um caminho específico
            const initialState = this._getInitialState(path);
            this.setState(path, initialState);
        } else {
            // Reset completo
            this._saveToHistory();
            this._state = this._getInitialState();
            this._history.future = [];
            this._notifySubscribers('*', this._state);
            this._persistState();
        }
    },

    // ============================================================
    // DIAGNÓSTICO (MÉTODOS ESPECÍFICOS)
    // ============================================================
    updateRobotStatus(status) {
        this.setState('diagnostic.robotStatus', status);
        this.setState('diagnostic.lastUpdate', new Date().toISOString());
    },

    addAlert(alert) {
        const alerts = this.get('diagnostic.activeAlerts') || [];
        alerts.push({
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...alert,
        });
        this.setState('diagnostic.activeAlerts', alerts);
    },

    clearAlert(alertId) {
        const alerts = this.get('diagnostic.activeAlerts') || [];
        this.setState('diagnostic.activeAlerts', alerts.filter(a => a.id !== alertId));
    },

    // ============================================================
    // ACADEMY (MÉTODOS ESPECÍFICOS)
    // ============================================================
    completeLesson(courseId, lessonId) {
        const completed = this.get('academy.completedLessons') || [];
        if (!completed.includes(`${courseId}:${lessonId}`)) {
            completed.push(`${courseId}:${lessonId}`);
            this.setState('academy.completedLessons', completed);
            
            // Atualiza progresso do curso
            this._updateCourseProgress(courseId);
        }
    },

    addBookmark(courseId, lessonId, title) {
        const bookmarks = this.get('academy.bookmarks') || [];
        if (!bookmarks.find(b => b.courseId === courseId && b.lessonId === lessonId)) {
            bookmarks.push({ courseId, lessonId, title, timestamp: Date.now() });
            this.setState('academy.bookmarks', bookmarks);
        }
    },

    saveNote(courseId, lessonId, note) {
        const notes = this.get('academy.notes') || {};
        const key = `${courseId}:${lessonId}`;
        notes[key] = {
            text: note,
            timestamp: Date.now(),
        };
        this.setState('academy.notes', notes);
    },

    // ============================================================
    // MÉTRICAS
    // ============================================================
    trackModuleVisit(moduleName) {
        const visited = this.get('metrics.modulesVisited') || [];
        visited.push({
            module: moduleName,
            timestamp: Date.now(),
        });
        this.setState('metrics.modulesVisited', visited);
    },

    trackTime(moduleName, seconds) {
        const timeSpent = this.get('metrics.timeSpent') || {};
        timeSpent[moduleName] = (timeSpent[moduleName] || 0) + seconds;
        this.setState('metrics.timeSpent', timeSpent);
    },

    // ============================================================
    // MÉTODOS PRIVADOS
    // ============================================================
    _notifySubscribers(path, value) {
        // Notifica subscribers do caminho específico
        Object.entries(this._subscribers).forEach(([subPath, subs]) => {
            if (subPath === '*' || subPath === path || path.startsWith(subPath)) {
                subs.forEach(sub => {
                    try {
                        sub.callback(value, this._state);
                    } catch (e) {
                        console.error('[IdenzaState] Erro em subscriber:', e);
                    }
                });
            }
        });
    },

    _saveToHistory() {
        const snapshot = this._deepClone(this._state);
        this._history.past.push(snapshot);
        
        // Limita tamanho do histórico
        if (this._history.past.length > this._history.maxHistory) {
            this._history.past.shift();
        }
    },

    _getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    },

    _setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            return current[key];
        }, obj);
        target[lastKey] = value;
    },

    _deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj);
        if (obj instanceof Array) return obj.map(item => this._deepClone(item));
        
        const cloned = {};
        Object.keys(obj).forEach(key => {
            cloned[key] = this._deepClone(obj[key]);
        });
        return cloned;
    },

    _deepMerge(target, source) {
        Object.keys(source).forEach(key => {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                if (!target[key]) target[key] = {};
                this._deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        });
        return target;
    },

    _getInitialState(path = null) {
        const initialState = {
            app: {
                name: 'Idenza Robotics Academy',
                version: '6.0.0',
                isLoaded: false,
                isInitialized: true,
                currentModule: 'dashboard',
                currentTheme: 'luxury',
                language: 'pt-BR',
                sidebarOpen: false,
                menuOpen: false,
                searchOpen: false,
                modalOpen: false,
                modalData: null,
            },
            connections: {
                ros: { connected: false, url: 'ws://localhost:9090', nodes: [], topics: [], lastMessage: null, latency: 0 },
                mqtt: { connected: false, url: 'ws://localhost:9001', broker: 'localhost', subscriptions: [], lastMessage: null, latency: 0 },
                serial: { connected: false, port: null, baudRate: 115200 },
            },
            diagnostic: {
                robotStatus: 'unknown', robotType: null, robotName: null,
                activeNodes: [], failedNodes: [], sensorData: {},
                conveyorSpeed: 0, gpuTemperature: 0, activeAlerts: [],
                protectiveStopActive: false, lastUpdate: null,
            },
            academy: {
                currentCourse: null, currentLesson: null,
                completedLessons: [], completedCourses: [], certificates: [],
                progress: {}, bookmarks: [], notes: {},
            },
            portfolio: {
                activeProjects: [], completedProjects: [], favoriteProjects: [], currentProject: null,
            },
            user: {
                name: '', email: '', role: 'guest',
                preferences: { animationsEnabled: true, particlesEnabled: true, soundEnabled: false, autoConnect: false, fontSize: 'normal' },
            },
            ui: {
                toasts: [], activeTab: null, scrollPosition: 0,
                searchQuery: '', searchResults: [], isLoading: false, loadingMessage: '',
            },
            metrics: {
                sessionStart: Date.now(), modulesVisited: [], timeSpent: {}, errorsEncountered: 0,
            },
        };

        if (path) {
            return this._deepClone(this._getNestedValue(initialState, path));
        }
        return this._deepClone(initialState);
    },

    _updateCourseProgress(courseId) {
        // Calcula progresso baseado nas lições completadas
        const allLessons = this._getTotalLessonsForCourse(courseId);
        const completedLessons = this.get('academy.completedLessons') || [];
        const courseCompleted = completedLessons.filter(l => l.startsWith(`${courseId}:`)).length;
        const progress = allLessons > 0 ? Math.round((courseCompleted / allLessons) * 100) : 0;
        
        const currentProgress = this.get('academy.progress') || {};
        currentProgress[courseId] = progress;
        this.setState('academy.progress', currentProgress);

        // Verifica se completou o curso
        if (progress >= 100) {
            const completedCourses = this.get('academy.completedCourses') || [];
            if (!completedCourses.includes(courseId)) {
                completedCourses.push(courseId);
                this.setState('academy.completedCourses', completedCourses);
            }
        }
    },

    _getTotalLessonsForCourse(courseId) {
        // Placeholder — será preenchido quando courses-curriculum.js estiver pronto
        const courseLessons = {
            'trilha-iot': 12,
            'trilha-ros': 15,
            'trilha-ai': 10,
            'trilha-fabricacao': 8,
            'trilha-frotas': 6,
        };
        return courseLessons[courseId] || 10;
    },
};

// ============================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    IdenzaState.init();
    window.IdenzaState = IdenzaState;
});

// ============================================================
// EXPORTAÇÃO
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaState;
}
