/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — ROS 2 BRIDGE (WEBSOCKET)
 * ============================================================
 * 
 * Conexão com ROS 2 via rosbridge_suite:
 * - Conexão WebSocket
 * - Subscribe/Publish em tópicos
 * - Chamadas de serviço
 * - Monitoramento de nós
 * - Reconexão automática
 * - Eventos para integração com UI
 * 
 * @integration ROSBridge
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaROSBridge = {
    config: {
        url: 'ws://localhost:9090',
        reconnectInterval: 3000,
        maxReconnectAttempts: 10,
        debug: false,
    },

    state: {
        socket: null,
        connected: false,
        connecting: false,
        reconnectAttempts: 0,
        subscriptions: {},
        publishers: {},
        nodes: [],
        topics: [],
        services: [],
    },

    // ============================================================
    // CONEXÃO
    // ============================================================
    connect(url = null) {
        if (this.state.connected || this.state.connecting) return;

        if (url) this.config.url = url;
        this.state.connecting = true;

        this._log(`Conectando a ${this.config.url}...`);

        try {
            this.state.socket = new WebSocket(this.config.url);

            this.state.socket.onopen = () => {
                this.state.connected = true;
                this.state.connecting = false;
                this.state.reconnectAttempts = 0;

                this._log('✅ Conectado ao ROS 2');

                // Atualiza status
                IdenzaApp?.updateROSStatus('connected');
                IdenzaState?.setState('connections.ros.connected', true);
                IdenzaState?.setState('connections.ros.url', this.config.url);
                IdenzaEvents.rosConnected(this.config.url);

                // Reconecta subscriptions
                this._resubscribeAll();
            };

            this.state.socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this._handleMessage(data);
            };

            this.state.socket.onclose = (event) => {
                this.state.connected = false;
                this.state.connecting = false;

                this._log(`🔌 Desconectado (código: ${event.code})`);

                IdenzaApp?.updateROSStatus('disconnected');
                IdenzaState?.setState('connections.ros.connected', false);
                IdenzaEvents.rosDisconnected(event.reason || 'Conexão fechada');

                // Reconexão automática
                if (this.state.reconnectAttempts < this.config.maxReconnectAttempts) {
                    this.state.reconnectAttempts++;
                    this._log(`🔄 Tentativa de reconexão ${this.state.reconnectAttempts}/${this.config.maxReconnectAttempts}...`);
                    setTimeout(() => this.connect(url), this.config.reconnectInterval);
                }
            };

            this.state.socket.onerror = (error) => {
                this._log('❌ Erro na conexão WebSocket', error);
            };

        } catch (error) {
            this.state.connecting = false;
            this._log('❌ Falha ao criar WebSocket', error);
        }
    },

    disconnect() {
        this.state.reconnectAttempts = this.config.maxReconnectAttempts; // Para não reconectar
        if (this.state.socket) {
            this.state.socket.close();
            this.state.socket = null;
        }
        this.state.connected = false;
        this.state.connecting = false;
        this._log('🔌 Desconectado manualmente');
    },

    // ============================================================
    // SUBSCRIBE
    // ============================================================
    subscribe(topic, type = 'std_msgs/msg/String', callback = null) {
        if (!this.state.connected) {
            this._log(`⚠️ Não conectado. Agendando subscription para "${topic}"`);
            this.state.subscriptions[topic] = { type, callback };
            return null;
        }

        const id = `sub_${topic.replace(/\//g, '_')}_${Date.now()}`;

        const msg = {
            op: 'subscribe',
            id,
            topic,
            type,
        };

        this.state.socket.send(JSON.stringify(msg));
        this.state.subscriptions[topic] = { type, callback, id };

        this._log(`📥 Subscribed: ${topic} [${type}]`);

        if (callback) {
            IdenzaEvents.on(`ros_msg_${topic}`, callback);
        }

        return id;
    },

    unsubscribe(topic) {
        if (!this.state.connected) {
            delete this.state.subscriptions[topic];
            return;
        }

        const sub = this.state.subscriptions[topic];
        if (sub && sub.id) {
            const msg = {
                op: 'unsubscribe',
                id: sub.id,
                topic,
            };
            this.state.socket.send(JSON.stringify(msg));
        }

        delete this.state.subscriptions[topic];
        IdenzaEvents.off(`ros_msg_${topic}`);
        this._log(`📥 Unsubscribed: ${topic}`);
    },

    // ============================================================
    // PUBLISH
    // ============================================================
    publish(topic, message, type = 'std_msgs/msg/String') {
        if (!this.state.connected) {
            this._log(`⚠️ Não conectado. Não foi possível publicar em "${topic}"`);
            return false;
        }

        const msg = {
            op: 'publish',
            topic,
            msg: message,
        };

        this.state.socket.send(JSON.stringify(msg));

        IdenzaState?.setState('connections.ros.lastMessage', { topic, message, timestamp: Date.now() });
        IdenzaEvents.rosMessageReceived(topic, message);

        return true;
    },

    // ============================================================
    // SERVICE CALL
    // ============================================================
    callService(service, args = {}) {
        if (!this.state.connected) {
            this._log(`⚠️ Não conectado. Não foi possível chamar serviço "${service}"`);
            return Promise.reject('Not connected');
        }

        return new Promise((resolve, reject) => {
            const id = `call_${service.replace(/\//g, '_')}_${Date.now()}`;
            const timeout = setTimeout(() => reject('Service call timeout'), 5000);

            // Listener temporário para resposta
            const responseHandler = (data) => {
                if (data.id === id) {
                    clearTimeout(timeout);
                    this.state.socket.removeEventListener('message', responseHandler);
                    resolve(data.values);
                }
            };

            this.state.socket.addEventListener('message', (event) => {
                const data = JSON.parse(event.data);
                responseHandler(data);
            });

            const msg = {
                op: 'call_service',
                id,
                service,
                args,
            };

            this.state.socket.send(JSON.stringify(msg));
        });
    },

    // ============================================================
    // MANIPULAÇÃO DE MENSAGENS
    // ============================================================
    _handleMessage(data) {
        if (data.op === 'publish') {
            // Mensagem de tópico
            const topic = data.topic;
            const msg = data.msg;

            IdenzaEvents.emit(`ros_msg_${topic}`, msg);
            IdenzaEvents.rosMessageReceived(topic, msg);

            // Atualiza estado
            if (topic === '/diagnostics') {
                IdenzaState?.setState('diagnostic.sensorData', {
                    ...IdenzaState.get('diagnostic.sensorData'),
                    [msg.sensor_id || topic]: msg,
                });
            }
        } else if (data.op === 'service_response') {
            // Resposta de serviço
            this._log(`📞 Service response: ${data.service}`, data.values);
        } else if (data.op === 'status') {
            // Status do sistema
            this._log(`📊 Status: ${data.level} — ${data.msg}`);
        }
    },

    // ============================================================
    // RECONEXÃO DE SUBSCRIPTIONS
    // ============================================================
    _resubscribeAll() {
        Object.entries(this.state.subscriptions).forEach(([topic, sub]) => {
            this.subscribe(topic, sub.type, sub.callback);
        });
        this._log(`🔄 ${Object.keys(this.state.subscriptions).length} subscriptions reconectadas`);
    },

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    isConnected() {
        return this.state.connected;
    },

    getNodes() {
        return this.state.nodes;
    },

    getTopics() {
        return this.state.topics;
    },

    _log(...args) {
        if (this.config.debug || (IdenzaApp && IdenzaApp.config.debug)) {
            console.log('[IdenzaROSBridge]', ...args);
        }
    },

    destroy() {
        this.disconnect();
        this.state.subscriptions = {};
    },
};

// ============================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    window.IdenzaROSBridge = IdenzaROSBridge;
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaROSBridge;
}
