/* ============================================================
   NEXUS ROBOTICS ACADEMY v6.0
   ARQUIVO: js/core/state.js
   DESCRIÇÃO: Gerenciamento de estado global reativo —
              Proxy-based, persistência, undo/redo, watchers
   ============================================================ */

class NexusStateManager {
  constructor(app) {
    this.app = app;
    this.state = {};
    this.watchers = new Map();
    this.history = [];
    this.historyIndex = -1;
    this.maxHistory = 50;
    this.persistKey = 'nexus-state';
    this.debounceTimers = new Map();
  }

  /**
   * Inicializa o state manager
   */
  init() {
    // Estado inicial
    const initialState = {
      system: {
        online: navigator.onLine,
        rosConnected: false,
        mqttConnected: false,
        cpuUsage: 0,
        memoryUsage: 0,
        uptime: 0,
        lastUpdate: Date.now(),
      },
      user: {
        name: '',
        role: 'operator',
        preferences: {
          theme: 'luxury',
          language: 'pt-BR',
          sidebarCollapsed: false,
          fontSize: 'medium',
          notifications: true,
          soundAlerts: true,
        },
        progress: {
          coursesCompleted: 0,
          projectsBuilt: 0,
          certifications: [],
          totalHours: 0,
          level: 'iniciante',
          xp: 0,
          streak: 0,
        },
      },
      navigation: {
        currentRoute: 'dashboard',
        previousRoute: null,
        breadcrumbs: [],
        tabs: [],
        activeTab: null,
      },
      diagnostics: {
        nodes: [],
        sensors: [],
        errors: [],
        warnings: [],
        protectiveStop: false,
        conveyorSpeed: 0,
        gpuTemp: 0,
        lastDiagnostic: null,
      },
      products: {
        catalog: null,
        filters: {
          level: 'all',
          maxPrice: Infinity,
          category: 'all',
          search: '',
        },
        sortBy: 'name',
        sortOrder: 'asc',
        view: 'grid',
      },
      projects: {
        list: null,
        filters: {
          level: 'all',
          maxCost: Infinity,
          tag: 'all',
          search: '',
        },
        activeProject: null,
      },
      academy: {
        tracks: [],
        activeTrack: null,
        activeModule: null,
        activeLesson: null,
        completedLessons: [],
        quizResults: [],
      },
      ui: {
        sidebarOpen: false,
        modalOpen: null,
        toastQueue: [],
        theme: 'luxury',
        loading: false,
        globalSearchOpen: false,
      },
    };

    // Carrega estado persistido
    const saved = this._loadState();

    // Cria proxy reativo
    this.state = this._createReactiveProxy(
      this._deepMerge(initialState, saved),
      '',
      []
    );

    // Inicia timer de persistência automática
    setInterval(() => this._autoSave(), 5000);

    // Inicia timer de uptime
    setInterval(() => {
      this.state.system.uptime++;
      this.state.system.lastUpdate = Date.now();
    }, 1000);

    // Monitora conexão
    window.addEventListener('online', () => { this.state.system.online = true; });
    window.addEventListener('offline', () => { this.state.system.online = false; });

    // Disponibiliza globalmente
    window.nexusState = this.state;
    window.nexusStateManager = this;

    console.log('%c📊 State Manager inicializado', 'color: #2e7d32;');
  }

  /**
   * Cria proxy reativo profundo
   */
  _createReactiveProxy(target, path, watchedPaths) {
    const self = this;

    return new Proxy(target, {
      get(obj, prop) {
        const value = obj[prop];

        // Registra watchers de caminho
        const fullPath = path ? `${path}.${prop}` : prop;

        // Se for objeto/array, cria proxy aninhado
        if (value && typeof value === 'object' && !Array.isArray(value) && !value.__isProxy) {
          const nestedProxy = self._createReactiveProxy(value, fullPath, watchedPaths);
          nestedProxy.__isProxy = true;
          return nestedProxy;
        }

        return value;
      },

      set(obj, prop, newValue) {
        const oldValue = obj[prop];
        const fullPath = path ? `${path}.${prop}` : prop;

        // Não faz nada se o valor não mudou
        if (oldValue === newValue) return true;

        // Atualiza o valor
        obj[prop] = newValue;

        // Adiciona ao histórico (undo/redo)
        self._addToHistory(fullPath, oldValue, newValue);

        // Notifica watchers
        self._notifyWatchers(fullPath, newValue, oldValue);

        // Notifica watchers globais (wildcard)
        self._notifyWatchers('*', { path: fullPath, newValue, oldValue });

        return true;
      },

      deleteProperty(obj, prop) {
        const oldValue = obj[prop];
        const fullPath = path ? `${path}.${prop}` : prop;

        delete obj[prop];

        self._notifyWatchers(fullPath, undefined, oldValue);

        return true;
      },
    });
  }

  /**
   * Watch — observa mudanças em um caminho
   */
  watch(path, callback) {
    if (!this.watchers.has(path)) {
      this.watchers.set(path, new Set());
    }
    this.watchers.get(path).add(callback);

    // Retorna função para parar de observar
    return () => {
      this.watchers.get(path)?.delete(callback);
    };
  }

  /**
   * Watch com debounce
   */
  watchDebounced(path, callback, delay = 300) {
    return this.watch(path, (newValue, oldValue) => {
      const key = `${path}-debounce`;
      if (this.debounceTimers.has(key)) {
        clearTimeout(this.debounceTimers.get(key));
      }
      this.debounceTimers.set(key, setTimeout(() => {
        callback(newValue, oldValue);
      }, delay));
    });
  }

  /**
   * Notifica watchers de um caminho
   */
  _notifyWatchers(path, newValue, oldValue) {
    // Watchers exatos
    this.watchers.get(path)?.forEach(cb => {
      try { cb(newValue, oldValue); } catch (e) { console.error(`Watcher ${path}:`, e); }
    });

    // Watchers de caminho parcial (ex: 'user' dispara para 'user.name')
    for (const [watchPath, callbacks] of this.watchers) {
      if (watchPath !== path && path.startsWith(watchPath + '.')) {
        callbacks.forEach(cb => {
          try { cb(newValue, oldValue); } catch (e) { console.error(`Watcher ${watchPath}:`, e); }
        });
      }
    }

    // Emite no event bus
    this.app?.eventBus?.emit(`state:${path}`, { newValue, oldValue });
  }

  /**
   * Adiciona ao histórico para undo/redo
   */
  _addToHistory(path, oldValue, newValue) {
    // Evita histórico para campos de alta frequência
    const skipPaths = ['system.lastUpdate', 'system.cpuUsage', 'system.memoryUsage'];
    if (skipPaths.some(p => path.includes(p))) return;

    // Remove histórico futuro se estiver no meio da pilha
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }

    this.history.push({
      path,
      oldValue: JSON.parse(JSON.stringify(oldValue)),
      newValue: JSON.parse(JSON.stringify(newValue)),
      timestamp: Date.now(),
    });

    // Limita o tamanho do histórico
    if (this.history.length > this.maxHistory) {
      this.history.shift();
    }

    this.historyIndex = this.history.length - 1;
  }

  /**
   * Undo — desfaz última alteração
   */
  undo() {
    if (this.historyIndex < 0) {
      this.app?.showToast('Nada para desfazer', 'info', 'fa-undo');
      return;
    }

    const entry = this.history[this.historyIndex];
    this._setNestedValue(this.state, entry.path, entry.oldValue);
    this.historyIndex--;

    this.app?.showToast('Desfeito', 'info', 'fa-undo');
    this.app?.eventBus?.emit('state:undo', entry);
  }

  /**
   * Redo — refaz alteração desfeita
   */
  redo() {
    if (this.historyIndex >= this.history.length - 1) {
      this.app?.showToast('Nada para refazer', 'info', 'fa-redo');
      return;
    }

    this.historyIndex++;
    const entry = this.history[this.historyIndex];
    this._setNestedValue(this.state, entry.path, entry.newValue);

    this.app?.showToast('Refeito', 'info', 'fa-redo');
    this.app?.eventBus?.emit('state:redo', entry);
  }

  /**
   * Define valor em caminho aninhado (ex: 'user.preferences.theme')
   */
  _setNestedValue(obj, path, value) {
    const parts = path.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }

  /**
   * Obtém valor em caminho aninhado
   */
  getNestedValue(path) {
    const parts = path.split('.');
    let current = this.state;
    for (const part of parts) {
      if (current === undefined || current === null) return undefined;
      current = current[part];
    }
    return current;
  }

  /**
   * Persiste estado no localStorage
   */
  _autoSave() {
    const toSave = {
      user: this.state.user,
      ui: { theme: this.state.ui.theme },
    };
    try {
      localStorage.setItem(this.persistKey, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Falha ao persistir estado:', e);
    }
  }

  /**
   * Carrega estado do localStorage
   */
  _loadState() {
    try {
      const saved = localStorage.getItem(this.persistKey);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      console.warn('Falha ao carregar estado:', e);
      return {};
    }
  }

  /**
   * Deep merge de objetos
   */
  _deepMerge(target, source) {
    const output = { ...target };
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        output[key] = this._deepMerge(target[key] || {}, source[key]);
      } else {
        output[key] = source[key];
      }
    }
    return output;
  }

  /**
   * Reseta o estado para valores iniciais
   */
  resetState(path = null) {
    if (path) {
      const initial = {
        'user.preferences': { theme: 'luxury', language: 'pt-BR', sidebarCollapsed: false, fontSize: 'medium', notifications: true, soundAlerts: true },
        'diagnostics': { nodes: [], sensors: [], errors: [], warnings: [], protectiveStop: false, conveyorSpeed: 0, gpuTemp: 0, lastDiagnostic: null },
        'ui': { sidebarOpen: false, modalOpen: null, toastQueue: [], theme: 'luxury', loading: false, globalSearchOpen: false },
      };
      if (initial[path]) {
        this._setNestedValue(this.state, path, initial[path]);
      }
    } else {
      // Full reset — recarrega a página
      localStorage.removeItem(this.persistKey);
      window.location.reload();
    }
  }

  /**
   * Exporta estado completo (para debug)
   */
  exportState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  /**
   * Importa estado (para restore)
   */
  importState(jsonState) {
    try {
      const parsed = typeof jsonState === 'string' ? JSON.parse(jsonState) : jsonState;
      Object.assign(this.state, parsed);
      this.app?.showToast('Estado importado com sucesso', 'success', 'fa-check-circle');
      return true;
    } catch (e) {
      console.error('Erro ao importar estado:', e);
      return false;
    }
  }
}

// Exportação
export default NexusStateManager;

/* ============================================================
   FIM DO ARQUIVO: js/core/state.js
   PRÓXIMO: js/modules/diagnostics.js
   ============================================================ */
