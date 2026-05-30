/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — MONITOR SERIAL (WebUSB/WebSerial)
 * ============================================================
 * 
 * Comunicação serial com microcontroladores via navegador:
 * - API WebSerial para conexão USB
 * - Listagem de portas disponíveis
 * - Envio e recebimento de dados
 * - Terminal serial embutido
 * - Suporte a múltiplas taxas de baud
 * - Buffer de recebimento com timestamp
 * - Fallback para conexão via WebSocket
 * 
 * @integration SerialMonitor
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaSerialMonitor = {
    config: {
        baudRate: 115200,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        flowControl: 'none',
        bufferSize: 4096,
        lineEnding: '\n',
        timestampEnabled: true,
        autoConnect: false,
    },

    state: {
        port: null,
        reader: null,
        writer: null,
        connected: false,
        connecting: false,
        availablePorts: [],
        receiveBuffer: [],
        sendBuffer: [],
        bytesReceived: 0,
        bytesSent: 0,
        keepReading: false,
    },

    // ============================================================
    // LISTAR PORTAS DISPONÍVEIS
    // ============================================================
    async listPorts() {
        if (!('serial' in navigator)) {
            this._log('⚠️ API WebSerial não suportada neste navegador.');
            return [];
        }

        try {
            const ports = await navigator.serial.getPorts();
            this.state.availablePorts = ports;
            this._log(`🔍 ${ports.length} porta(s) encontrada(s)`);
            return ports;
        } catch (error) {
            this._log('❌ Erro ao listar portas:', error);
            return [];
        }
    },

    // ============================================================
    // CONECTAR
    // ============================================================
    async connect(baudRate = null) {
        if (!('serial' in navigator)) {
            IdenzaToast?.warning('WebSerial não suportada neste navegador. Use Chrome ou Edge.');
            return false;
        }

        if (this.state.connected || this.state.connecting) {
            this._log('⚠️ Já conectado ou conectando');
            return false;
        }

        this.state.connecting = true;
        if (baudRate) this.config.baudRate = baudRate;

        try {
            // Solicita porta ao usuário
            const port = await navigator.serial.requestPort();
            this.state.port = port;

            // Abre conexão
            await port.open({
                baudRate: this.config.baudRate,
                dataBits: this.config.dataBits,
                stopBits: this.config.stopBits,
                parity: this.config.parity,
                flowControl: this.config.flowControl,
            });

            this.state.connected = true;
            this.state.connecting = false;

            // Configura reader e writer
            this.state.writer = port.writable.getWriter();
            
            // Inicia leitura contínua
            this.state.keepReading = true;
            this._readLoop();

            // Atualiza estado global
            IdenzaState?.setState('connections.serial.connected', true);
            IdenzaState?.setState('connections.serial.port', port.getInfo());
            IdenzaState?.setState('connections.serial.baudRate', this.config.baudRate);

            IdenzaEvents.emit('idenza:serialConnected', {
                port: port.getInfo(),
                baudRate: this.config.baudRate,
            });

            IdenzaToast?.success(`Conectado à porta serial @ ${this.config.baudRate} baud`);

            this._log(`✅ Conectado: ${JSON.stringify(port.getInfo())} @ ${this.config.baudRate} baud`);

            return true;
        } catch (error) {
            this.state.connecting = false;
            this.state.connected = false;

            if (error.name !== 'AbortError') {
                this._log('❌ Erro ao conectar:', error);
                IdenzaToast?.error('Erro ao conectar à porta serial');
            }

            return false;
        }
    },

    // ============================================================
    // DESCONECTAR
    // ============================================================
    async disconnect() {
        this.state.keepReading = false;
        this.state.connected = false;

        try {
            if (this.state.reader) {
                await this.state.reader.cancel();
                this.state.reader.releaseLock();
                this.state.reader = null;
            }

            if (this.state.writer) {
                await this.state.writer.close();
                this.state.writer.releaseLock();
                this.state.writer = null;
            }

            if (this.state.port) {
                await this.state.port.close();
                this.state.port = null;
            }
        } catch (error) {
            this._log('⚠️ Erro ao desconectar:', error);
        }

        IdenzaState?.setState('connections.serial.connected', false);
        IdenzaEvents.emit('idenza:serialDisconnected');

        this._log('🔌 Desconectado da porta serial');
    },

    // ============================================================
    // ENVIAR DADOS
    // ============================================================
    async send(data) {
        if (!this.state.connected || !this.state.writer) {
            this._log('⚠️ Não conectado. Não foi possível enviar.');
            return false;
        }

        try {
            const text = typeof data === 'string' ? data : JSON.stringify(data);
            const encoded = new TextEncoder().encode(text + this.config.lineEnding);

            await this.state.writer.write(encoded);
            this.state.bytesSent += encoded.length;

            IdenzaEvents.emit('idenza:serialSent', { data: text });

            return true;
        } catch (error) {
            this._log('❌ Erro ao enviar:', error);
            return false;
        }
    },

    sendCommand(command) {
        return this.send(command);
    },

    // ============================================================
    // LEITURA CONTÍNUA
    // ============================================================
    async _readLoop() {
        if (!this.state.port) return;

        const textDecoder = new TextDecoder();

        while (this.state.port.readable && this.state.keepReading) {
            try {
                this.state.reader = this.state.port.readable.getReader();

                while (true) {
                    const { value, done } = await this.state.reader.read();

                    if (done) {
                        this._log('📴 Stream de leitura finalizado');
                        this.state.reader.releaseLock();
                        break;
                    }

                    if (value) {
                        const text = textDecoder.decode(value, { stream: true });
                        this.state.bytesReceived += value.length;

                        // Adiciona ao buffer
                        const lines = text.split('\n');
                        lines.forEach(line => {
                            if (line.trim()) {
                                const entry = {
                                    data: line.trim(),
                                    timestamp: Date.now(),
                                };

                                this.state.receiveBuffer.push(entry);

                                // Limita buffer
                                if (this.state.receiveBuffer.length > this.config.bufferSize) {
                                    this.state.receiveBuffer.shift();
                                }

                                // Emite evento
                                IdenzaEvents.emit('idenza:serialReceived', entry);
                            }
                        });
                    }
                }
            } catch (error) {
                if (this.state.keepReading) {
                    this._log('❌ Erro de leitura:', error);
                }
                if (this.state.reader) {
                    try {
                        this.state.reader.releaseLock();
                    } catch {}
                    this.state.reader = null;
                }
            }
        }
    },

    // ============================================================
    // BUFFER DE RECEBIMENTO
    // ============================================================
    getReceivedData(clear = false) {
        const data = [...this.state.receiveBuffer];
        if (clear) this.state.receiveBuffer = [];
        return data;
    },

    getLastReceived() {
        return this.state.receiveBuffer.length > 0 ?
            this.state.receiveBuffer[this.state.receiveBuffer.length - 1] : null;
    },

    clearBuffer() {
        this.state.receiveBuffer = [];
    },

    // ============================================================
    // ESTATÍSTICAS
    // ============================================================
    getStats() {
        return {
            connected: this.state.connected,
            bytesSent: this.state.bytesSent,
            bytesReceived: this.state.bytesReceived,
            bufferSize: this.state.receiveBuffer.length,
            port: this.state.port?.getInfo() || null,
        };
    },

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    isSupported() {
        return 'serial' in navigator;
    },

    isConnected() {
        return this.state.connected;
    },

    _log(...args) {
        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaSerial]', ...args);
        }
    },

    destroy() {
        this.disconnect();
        this.state.receiveBuffer = [];
    },
};

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    window.IdenzaSerialMonitor = IdenzaSerialMonitor;
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaSerialMonitor;
}
