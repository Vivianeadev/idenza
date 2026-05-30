/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — UTILITÁRIOS DE ARMAZENAMENTO
 * ============================================================
 * 
 * Gerenciamento de armazenamento local:
 * - localStorage com namespace Idenza
 * - sessionStorage para dados de sessão
 * - IndexedDB para dados maiores (logs, cache)
 * - Cookies (compliance)
 * - Expiração automática
 * - Quota management
 * 
 * @namespace IdenzaStorage
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaStorage = {
    // ============================================================
    // CONFIGURAÇÃO
    // ============================================================
    config: {
        prefix: 'idenza_',
        defaultTTL: 30 * 24 * 60 * 60 * 1000, // 30 dias
        dbName: 'IdenzaAcademy',
        dbVersion: 1,
    },

    // ============================================================
    // LOCAL STORAGE
    // ============================================================
    set(key, value, ttl = null) {
        try {
            const prefixedKey = this.config.prefix + key;
            const data = {
                value,
                timestamp: Date.now(),
                ttl: ttl || this.config.defaultTTL,
            };
            localStorage.setItem(prefixedKey, JSON.stringify(data));
            return true;
        } catch (e) {
            console.warn('[IdenzaStorage] localStorage cheio ou indisponível:', e);
            return false;
        }
    },

    get(key, defaultValue = null) {
        try {
            const prefixedKey = this.config.prefix + key;
            const raw = localStorage.getItem(prefixedKey);

            if (!raw) return defaultValue;

            const data = JSON.parse(raw);

            // Verifica expiração
            if (data.ttl && data.timestamp) {
                const age = Date.now() - data.timestamp;
                if (age > data.ttl) {
                    this.remove(key);
                    return defaultValue;
                }
            }

            return data.value !== undefined ? data.value : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(this.config.prefix + key);
            return true;
        } catch (e) {
            return false;
        }
    },

    has(key) {
        return this.get(key, '__NOT_FOUND__') !== '__NOT_FOUND__';
    },

    getAll(prefix = '') {
        const results = {};
        const fullPrefix = this.config.prefix + prefix;

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(fullPrefix)) {
                const shortKey = key.replace(this.config.prefix, '');
                results[shortKey] = this.get(shortKey);
            }
        }

        return results;
    },

    clear(prefix = '') {
        const fullPrefix = this.config.prefix + prefix;
        const keysToRemove = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(fullPrefix)) {
                keysToRemove.push(key);
            }
        }

        keysToRemove.forEach(key => localStorage.removeItem(key));
        return keysToRemove.length;
    },

    clearAll() {
        return this.clear();
    },

    getSize() {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(this.config.prefix)) {
                total += localStorage.getItem(key).length * 2; // UTF-16
            }
        }
        return total;
    },

    // ============================================================
    // SESSION STORAGE
    // ============================================================
    setSession(key, value) {
        try {
            sessionStorage.setItem(this.config.prefix + key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    },

    getSession(key, defaultValue = null) {
        try {
            const raw = sessionStorage.getItem(this.config.prefix + key);
            return raw ? JSON.parse(raw) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },

    removeSession(key) {
        sessionStorage.removeItem(this.config.prefix + key);
    },

    clearSession() {
        const keysToRemove = [];
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key && key.startsWith(this.config.prefix)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => sessionStorage.removeItem(key));
    },

    // ============================================================
    // INDEXEDDB (PARA DADOS GRANDES: LOGS, CACHE)
    // ============================================================
    _db: null,

    async _getDB() {
        if (this._db) return this._db;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.config.dbName, this.config.dbVersion);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;

                // Store para logs
                if (!db.objectStoreNames.contains('logs')) {
                    db.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
                }

                // Store para cache
                if (!db.objectStoreNames.contains('cache')) {
                    const cacheStore = db.createObjectStore('cache', { keyPath: 'key' });
                    cacheStore.createIndex('timestamp', 'timestamp', { unique: false });
                }

                // Store para métricas
                if (!db.objectStoreNames.contains('metrics')) {
                    const metricsStore = db.createObjectStore('metrics', { keyPath: 'id', autoIncrement: true });
                    metricsStore.createIndex('type', 'type', { unique: false });
                    metricsStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };

            request.onsuccess = (e) => {
                this._db = e.target.result;
                resolve(this._db);
            };

            request.onerror = (e) => {
                console.error('[IdenzaStorage] Erro ao abrir IndexedDB:', e);
                reject(e);
            };
        });
    },

    async setDB(storeName, data) {
        try {
            const db = await this._getDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);

                if (Array.isArray(data)) {
                    data.forEach(item => store.put(item));
                } else {
                    store.put(data);
                }

                tx.oncomplete = () => resolve(true);
                tx.onerror = (e) => reject(e);
            });
        } catch (e) {
            console.error('[IdenzaStorage] Erro ao escrever no IndexedDB:', e);
            return false;
        }
    },

    async getDB(storeName, key) {
        try {
            const db = await this._getDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(storeName, 'readonly');
                const store = tx.objectStore(storeName);
                const request = key ? store.get(key) : store.getAll();

                request.onsuccess = () => resolve(request.result);
                request.onerror = (e) => reject(e);
            });
        } catch (e) {
            console.error('[IdenzaStorage] Erro ao ler do IndexedDB:', e);
            return null;
        }
    },

    async removeDB(storeName, key) {
        try {
            const db = await this._getDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(storeName, 'readwrite');
                const store = tx.objectStore(storeName);
                const request = key ? store.delete(key) : store.clear();

                request.onsuccess = () => resolve(true);
                request.onerror = (e) => reject(e);
            });
        } catch (e) {
            console.error('[IdenzaStorage] Erro ao remover do IndexedDB:', e);
            return false;
        }
    },

    // ============================================================
    // COOKIES
    // ============================================================
    setCookie(name, value, days = 365) {
        const prefixedName = this.config.prefix + name;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${prefixedName}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
    },

    getCookie(name) {
        const prefixedName = this.config.prefix + name + '=';
        const cookies = document.cookie.split(';');
        
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(prefixedName)) {
                return decodeURIComponent(cookie.substring(prefixedName.length));
            }
        }
        return null;
    },

    removeCookie(name) {
        this.setCookie(name, '', -1);
    },

    // ============================================================
    // QUOTA E DIAGNÓSTICO
    // ============================================================
    getQuota() {
        return {
            localStorage: this.getSize(),
            sessionStorage: JSON.stringify(sessionStorage).length * 2,
            cookies: document.cookie.length,
        };
    },

    isQuotaExceeded() {
        try {
            const testKey = this.config.prefix + 'quota_test';
            localStorage.setItem(testKey, 'x');
            localStorage.removeItem(testKey);
            return false;
        } catch (e) {
            return true;
        }
    },

    // ============================================================
    // MIGRAÇÃO E MANUTENÇÃO
    // ============================================================
    cleanExpired() {
        let cleaned = 0;
        const allData = this.getAll();

        Object.keys(allData).forEach(key => {
            // Re-get para verificar expiração
            const value = this.get(key, '__EXPIRED__');
            if (value === '__EXPIRED__') cleaned++;
        });

        return cleaned;
    },
};

// ============================================================
// EXPORTAÇÃO
// ============================================================
window.IdenzaStorage = IdenzaStorage;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaStorage;
}
