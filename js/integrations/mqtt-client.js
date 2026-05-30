/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — CLIENTE MQTT
 * ============================================================
 * 
 * Cliente MQTT para comunicação com dispositivos IoT:
 * - Conexão com broker MQTT via WebSocket
 * - Subscribe/Publish em tópicos
 * - Reconexão automática com backoff exponencial
 * - Fila de mensagens offline
 * - Suporte a QoS 0, 1, 2
 * - Last Will Testament (LWT)
 * - Integração com o state manager
 * 
 * @integration MQTTClient
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaMQTTClient = {
    config: {
        brokerUrl: 'ws://localhost:9001',
        clientId: 'idenza_academy_' + Math.random().toString(36).substr(2, 9),
        username: '',
        password: '',
        keepAlive: 60,
        cleanSession: true,
        reconnectInterval: 2000,
        maxReconnectInterval: 30000,
        reconnectBackoff: 1.5,
        maxReconnectAttempts: 0, // 0 = infinito
        debug: false,
    },

    state: {
        client: null,
        connected: false,
        connecting: false,
        reconnectAttempts: 0,
        subscriptions: {},
        pendingMessages: [],
        messageHistory: [],
        maxHistorySize: 200,
        latency: 0,
        lastPing: null,
    },

    // ============================================================
    // CONEXÃO
    // ============================================================
    connect(options = {}) {
        if (this.state.connected || this.state.connecting) return;

        this.config = { ...this.config, ...options };
        this.state.connecting = true;

        this._log(`🔌 Conectando ao broker MQTT: ${this.config.brokerUrl}`);

        try {
            // Verifica se a biblioteca MQTT.js está disponível
            if (typeof mqtt === 'undefined') {
                this._log('⚠️ Biblioteca MQTT.js não encontrada. Carregando...');
                this._loadMQTTLibrary().then(() => this._doConnect());
                return;
            }

            this._doConnect();
        } catch (error) {
            this.state.connecting = false;
            this._log('❌ Erro ao conectar ao MQTT:', error);
        }
    },

    _doConnect() {
        const options = {
            clientId: this.config.clientId,
            username: this.config.username || undefined,
            password: this.config.password || undefined,
            keepalive: this.config.keepAlive,
            clean: this.config.cleanSession,
            reconnectPeriod: 0, // Gerenciamos manualmente
            will: this.config.will || undefined,
        };

        this.state.client = mqtt.connect(this.config.brokerUrl, options);

        this.state.client.on('connect', () => {
            this.state.connected = true;
            this.state.connecting = false;
            this.state.reconnectAttempts = 0;

            this._log('✅ Conectado ao broker MQTT');

            // Atualiza status global
            IdenzaApp?.updateMQTTStatus('connected');
            IdenzaState?.setState('connections.mqtt.connected', true);
            IdenzaState?.setState('connections.mqtt.broker', this.config.brokerUrl);
            IdenzaEvents.mqttConnected(this.config.brokerUrl);

            // Reconecta subscriptions
            this._resubscribeAll();

            // Envia mensagens pendentes
            this._flushPendingMessages();
        });

        this.state.client.on('reconnect', () => {
            this._log('🔄 Tentando reconectar...');
        });

        this.state.client.on('close', () => {
            this.state.connected = false;
            this._log('🔌 Desconectado do broker MQTT');

            IdenzaApp?.updateMQTTStatus('disconnected');
            IdenzaState?.setState('connections.mqtt.connected', false);
            IdenzaEvents.emit('idenza:mqttDisconnected', { reason: 'Conexão fechada' });

            this._scheduleReconnect();
        });

        this.state.client.on('error', (error) => {
            this._log('❌ Erro MQTT:', error.message);
            IdenzaEvents.emit('idenza:error', { context: 'mqtt', error: error.message });
        });

        this.state.client.on('message', (topic, message) => {
            this._handleMessage(topic, message);
        });

        this.state.client.on('offline', () => {
            this._log('📴 Cliente offline');
        });

        // Ping de latência
        this._startLatencyPing();
    },

    disconnect() {
        this.config.maxReconnectAttempts = -1; // Cancela reconexões
        if (this.state.client) {
            this.state.client.end(true);
            this.state.client = null;
        }
        this.state.connected = false;
        this.state.connecting = false;
        this._log('🔌 Desconectado manualmente');
    },

    // ============================================================
    // RECONEXÃO COM BACKOFF
    // ============================================================
    _scheduleReconnect() {
        if (this.config.maxReconnectAttempts < 0) return;
        if (this.config.maxReconnectAttempts > 0 && 
            this.state.reconnectAttempts >= this.config.maxReconnectAttempts) {
            this._log('❌ Número máximo de tentativas de reconexão atingido');
            return;
        }

        this.state.reconnectAttempts++;
        const delay = Math.min(
            this.config.reconnectInterval * Math.pow(this.config.reconnectBackoff, this.state.reconnectAttempts),
            this.config.maxReconnectInterval
        );

        this._log(`🔄 Reconexão em ${delay}ms (tentativa ${this.state.reconnectAttempts})`);

        setTimeout(() => {
            if (!this.state.connected && !this.state.connecting) {
                this._doConnect();
            }
        }, delay);
    },

    // ============================================================
    // SUBSCRIBE
    // ============================================================
    subscribe(topic, qos = 0, callback = null) {
        if (!this.state.connected) {
            this._log(`⚠️ Offline. Agendando subscription: ${topic}`);
            this.state.subscriptions[topic] = { qos, callback };
            return null;
        }

        this.state.client.subscribe(topic, { qos }, (err) => {
            if (err) {
                this._log(`❌ Erro ao subscrever em ${topic}:`, err);
            } else {
                this._log(`📥 Subscribed: ${topic} (QoS: ${qos})`);
                this.state.subscriptions[topic] = { qos, callback };
            }
        });

        return topic;
    },

    unsubscribe(topic) {
        if (!this.state.connected) {
            delete this.state.subscriptions[topic];
            return;
        }

        this.state.client.unsubscribe(topic);
        delete this.state.subscriptions[topic];
        this._log(`📥 Unsubscribed: ${topic}`);
    },

    // ============================================================
    // PUBLISH
    // ============================================================
    publish(topic, message, qos = 0, retain = false) {
        const payload = typeof message === 'object' ? JSON.stringify(message) : String(message);

        if (!this.state.connected) {
            this._log(`⚠️ Offline. Enfileirando mensagem para ${topic}`);
            this.state.pendingMessages.push({ topic, payload, qos, retain, timestamp: Date.now() });
            return false;
        }

        this.state.client.publish(topic, payload, { qos, retain }, (err) => {
            if (err) {
                this._log(`❌ Erro ao publicar em ${topic}:`, err);
            }
        });

        // Registra no histórico
        this._addToHistory({ topic, payload, direction: 'out', timestamp: Date.now() });

        IdenzaState?.setState('connections.mqtt.lastMessage', { topic, message: payload, timestamp: Date.now() });
        IdenzaEvents.mqttMessageReceived(topic, payload);

        return true;
    },

    // ============================================================
    // MANIPULAÇÃO DE MENSAGENS
    // ============================================================
    _handleMessage(topic, message) {
        let parsed;
        try {
            parsed = JSON.parse(message.toString());
        } catch {
            parsed = message.toString();
        }

        // Registra no histórico
        this._addToHistory({ topic, payload: parsed, direction: 'in', timestamp: Date.now() });

        // Atualiza estado se for tópico de sensor
        if (topic.startsWith('idenza/sensor/') || topic.startsWith('idenza/estacao/')) {
            const sensorData = IdenzaState?.get('diagnostic.sensorData') || {};
            sensorData[topic] = {
                value: parsed,
                timestamp: Date.now(),
            };
            IdenzaState?.setState('diagnostic.sensorData', sensorData);
            IdenzaEvents.sensorDataUpdated(topic, parsed);
        }

        // Executa callback registrado
        const sub = this.state.subscriptions[topic];
        if (sub?.callback) {
            sub.callback(topic, parsed);
        }

        // Evento genérico
        IdenzaEvents.emit(`mqtt_msg_${topic.replace(/\//g, '_')}`, parsed);
        IdenzaEvents.mqttMessageReceived(topic, parsed);

        this._log(`📩 Mensagem recebida [${topic}]:`, typeof parsed === 'string' ? parsed.substring(0, 100) : parsed);
    },

    // ============================================================
    // FILA DE MENSAGENS OFFLINE
    // ============================================================
    _flushPendingMessages() {
        const pending = [...this.state.pendingMessages];
        this.state.pendingMessages = [];

        this._log(`📤 Enviando ${pending.length} mensagens pendentes...`);

        pending.forEach(msg => {
            this.publish(msg.topic, msg.payload, msg.qos, msg.retain);
        });
    },

    // ============================================================
    // HISTÓRICO DE MENSAGENS
    // ============================================================
    _addToHistory(entry) {
        this.state.messageHistory.push(entry);
        if (this.state.messageHistory.length > this.state.maxHistorySize) {
            this.state.messageHistory.shift();
        }
    },

    getHistory(topic = null) {
        if (topic) {
            return this.state.messageHistory.filter(m => m.topic === topic);
        }
        return [...this.state.messageHistory];
    },

    clearHistory() {
        this.state.messageHistory = [];
    },

    // ============================================================
    // LATÊNCIA
    // ============================================================
    _startLatencyPing() {
        this.state.lastPing = Date.now();

        setInterval(() => {
            if (this.state.connected) {
                const start = Date.now();
                this.state.lastPing = start;

                // Publica um ping
                this.state.client.publish('idenza/ping', String(start), { qos: 0 });
            }
        }, 10000);

        // Escuta resposta
        IdenzaEvents.on('mqtt_msg_idenza_pong', () => {
            const latency = Date.now() - this.state.lastPing;
            this.state.latency = latency;
            IdenzaState?.setState('connections.mqtt.latency', latency);
        });
    },

    // ============================================================
    // LAST WILL TESTAMENT
    // ============================================================
    setWill(topic, message) {
        this.config.will = { topic, payload: String(message), qos: 1, retain: true };
    },

    // ============================================================
    // RECONEXÃO DE SUBSCRIPTIONS
    // ============================================================
    _resubscribeAll() {
        const subs = Object.entries(this.state.subscriptions);
        if (subs.length === 0) return;

        this._log(`🔄 Reconectando ${subs.length} subscriptions...`);

        subs.forEach(([topic, sub]) => {
            this.subscribe(topic, sub.qos, sub.callback);
        });
    },

    // ============================================================
    // CARREGAMENTO DA BIBLIOTECA MQTT.JS
    // ============================================================
    _loadMQTTLibrary() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/mqtt@5/dist/mqtt.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    isConnected() {
        return this.state.connected;
    },

    getSubscriptions() {
        return Object.keys(this.state.subscriptions);
    },

    getPendingCount() {
        return this.state.pendingMessages.length;
    },

    _log(...args) {
        if (this.config.debug || (IdenzaApp && IdenzaApp.config.debug)) {
            console.log('[IdenzaMQTT]', ...args);
        }
    },

    destroy() {
        this.disconnect();
        this.state.subscriptions = {};
        this.state.pendingMessages = [];
        this.state.messageHistory = [];
    },
};

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    window.IdenzaMQTTClient = IdenzaMQTTClient;
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaMQTTClient;
}
