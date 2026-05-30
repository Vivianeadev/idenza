/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — MÓDULO DASHBOARD
 * ============================================================
 * 
 * Dashboard principal de diagnóstico e monitoramento.
 * Exibe:
 * - Estado do sistema robótico
 * - Nós ROS ativos/falhos
 * - Telemetria IoT
 * - Stream de eventos em tempo real
 * - Análise de causa raiz
 * - Plano de ação
 * 
 * @module Dashboard
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaDashboard = {
    config: {
        refreshInterval: 5000, // ms
        autoRefresh: true,
    },

    state: {
        intervalId: null,
        isLoaded: false,
    },

    // ============================================================
    // INICIALIZAÇÃO DO MÓDULO
    // ============================================================
    init(container) {
        this._render(container);
        this._bindEvents();
        this._startAutoRefresh();
        this.state.isLoaded = true;

        IdenzaEvents.emit('idenza:dashboardLoaded');

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaDashboard] Dashboard inicializado');
        }
    },

    // ============================================================
    // RENDERIZAÇÃO
    // ============================================================
    _render(container) {
        container.innerHTML = `
            <div class="dashboard-grid grid-dashboard gap-6">
                
                <!-- System State Summary -->
                <div class="panel panel-full animate-fade-in">
                    <div class="panel-header">
                        <i class="fas fa-heartbeat"></i>
                        <h2>[1] System State Summary</h2>
                        <span class="badge badge-critical" id="systemBadge">CRITICAL</span>
                    </div>
                    <p class="tiny-hint">Resumo em tempo real da integridade operacional do sistema — nós ROS, sensores IoT e condições de contorno.</p>
                    <span class="layman-explain">Visão geral da saúde do robô — como um check-up médico</span>
                    
                    <div class="grid-metrics" id="systemMetrics">
                        <div class="state-card">
                            <div class="value critical" id="failedNodesCount">1</div>
                            <div class="label">Node Falho</div>
                            <p class="tiny-hint">vision_pipeline offline</p>
                            <span class="layman-explain">Programa de visão parou</span>
                        </div>
                        <div class="state-card">
                            <div class="value warning" id="degradedSensorsCount">1</div>
                            <div class="label">Sensor Degradado</div>
                            <p class="tiny-hint">IOT-ENV-001 perda 34%</p>
                            <span class="layman-explain">Sensor de temperatura com falha</span>
                        </div>
                        <div class="state-card">
                            <div class="value critical" id="conveyorSpeed">2.3 m/s</div>
                            <div class="label">Velocidade Esteira</div>
                            <p class="tiny-hint">limite 1.5 m/s excedido</p>
                            <span class="layman-explain">Esteira rápida demais</span>
                        </div>
                        <div class="state-card">
                            <div class="value" id="gpuTemperature">47.2°C</div>
                            <div class="label">Temperatura GPU</div>
                            <p class="tiny-hint">alerta >45°C</p>
                            <span class="layman-explain">Computador de bordo quente</span>
                        </div>
                    </div>

                    <div class="alert alert-critical" id="protectiveStopBanner" style="margin-top:var(--space-4);">
                        <div class="alert-icon"><i class="fas fa-shield-haltered"></i></div>
                        <div class="alert-content">
                            <div class="alert-title">🛑 Protective Stop Ativo</div>
                            <div class="alert-message">UR10e parado por segurança. Safety monitor detectou sobrevelocidade da esteira + ausência de detecção visual de objetos.</div>
                        </div>
                    </div>
                </div>

                <!-- ROS Nodes Table -->
                <div class="panel animate-fade-in animate-delay-100">
                    <div class="panel-header">
                        <i class="fas fa-cubes"></i>
                        <h2>ROS Nodes</h2>
                        <span class="badge badge-warning" id="rosNodesBadge">1 FALHO</span>
                    </div>
                    <div class="table-container" id="rosNodesTable"></div>
                </div>

                <!-- IoT Telemetry Table -->
                <div class="panel animate-fade-in animate-delay-200">
                    <div class="panel-header">
                        <i class="fas fa-microchip"></i>
                        <h2>IoT Telemetry</h2>
                        <span class="badge badge-warning" id="iotBadge">1 DEGRADADO</span>
                    </div>
                    <div class="table-container" id="iotTelemetryTable"></div>
                </div>

                <!-- Event Stream -->
                <div class="panel panel-full animate-fade-in animate-delay-300">
                    <div class="panel-header">
                        <i class="fas fa-terminal"></i>
                        <h2>Event Stream — Últimos 15 minutos</h2>
                        <span class="badge badge-critical" id="eventBadge">5 ERROS</span>
                    </div>
                    <div id="eventStream" class="event-stream"></div>
                </div>

                <!-- Root Cause Analysis -->
                <div class="panel panel-full animate-fade-in animate-delay-400">
                    <div class="panel-header">
                        <i class="fas fa-search"></i>
                        <h2>[2] Root Cause Analysis</h2>
                        <span class="badge badge-warning">TÉRMICA</span>
                    </div>
                    <div id="rootCauseAnalysis"></div>
                </div>

                <!-- Didactic Explanation -->
                <div class="panel panel-full animate-fade-in animate-delay-500">
                    <div class="panel-header">
                        <i class="fas fa-chalkboard-teacher"></i>
                        <h2>[3] System Explanation — Didática</h2>
                        <span class="badge badge-info">HUMANO</span>
                    </div>
                    <div class="didatic-grid" id="didaticExplanation"></div>
                </div>

                <!-- Action Plan -->
                <div class="panel panel-full animate-fade-in animate-delay-600">
                    <div class="panel-header">
                        <i class="fas fa-list-ol"></i>
                        <h2>[4] Recommended Action Plan</h2>
                        <span class="badge badge-critical">EXECUTAR EM ORDEM</span>
                    </div>
                    <div id="actionPlan"></div>
                </div>

                <!-- Risk Level -->
                <div class="panel panel-full animate-fade-in animate-delay-700">
                    <div class="panel-header">
                        <i class="fas fa-shield-haltered"></i>
                        <h2>[5] Risk Level</h2>
                        <span class="badge badge-critical">ALTO</span>
                    </div>
                    <div id="riskLevel"></div>
                </div>

            </div>
        `;

        // Renderiza subcomponentes
        this._renderROSNodeTable();
        this._renderIoTTelemetryTable();
        this._renderEventStream();
        this._renderRootCauseAnalysis();
        this._renderDidactic();
        this._renderActionPlan();
        this._renderRiskLevel();
    },

    // ============================================================
    // SUBCOMPONENTES
    // ============================================================
    _renderROSNodeTable() {
        const container = document.getElementById('rosNodesTable');
        if (!container) return;

        const nodes = [
            { name: '/ur_driver', status: 'active', cpu: '12%', mem: '340MB' },
            { name: '/gripper_controller', status: 'active', cpu: '3%', mem: '85MB' },
            { name: '/camera_depth', status: 'active', cpu: '18%', mem: '520MB' },
            { name: '/vision_pipeline', status: 'failed', cpu: '0%', mem: '0MB' },
            { name: '/conveyor_bridge', status: 'active', cpu: '5%', mem: '120MB' },
            { name: '/safety_monitor', status: 'active', cpu: '2%', mem: '65MB' },
            { name: '/move_group', status: 'active', cpu: '8%', mem: '410MB' },
            { name: '/data_logger', status: 'active', cpu: '1%', mem: '45MB' },
        ];

        container.innerHTML = `
            <table class="table">
                <thead><tr><th>Node</th><th>Status</th><th>CPU</th><th>MEM</th></tr></thead>
                <tbody>
                    ${nodes.map(node => `
                        <tr class="${node.status === 'failed' ? 'tr-critical' : ''}">
                            <td><code>${node.name}</code></td>
                            <td>
                                <span class="status-dot-sm ${node.status === 'active' ? 'status-dot-active' : 'status-dot-failed'}"></span>
                                <strong style="color:${node.status === 'failed' ? 'var(--color-critical)' : 'inherit'}">
                                    ${node.status === 'active' ? 'ATIVO' : 'FALHOU'}
                                </strong>
                            </td>
                            <td>${node.cpu}</td>
                            <td>${node.mem}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    _renderIoTTelemetryTable() {
        const container = document.getElementById('iotTelemetryTable');
        if (!container) return;

        const devices = [
            { id: 'IOT-CONV-001', type: 'Encoder Esteira', status: 'active', latency: '0.1s' },
            { id: 'IOT-CONV-002', type: 'Sensor Presença', status: 'active', latency: '0.5s' },
            { id: 'IOT-CONV-003', type: 'Atuador Parada', status: 'active', latency: '0.3s' },
            { id: 'IOT-ENV-001', type: 'Temp. GPU', status: 'degraded', latency: '12.4s ⚠️' },
            { id: 'IOT-ENV-002', type: 'Umidade', status: 'active', latency: '0.6s' },
            { id: 'IOT-GATEWAY-01', type: 'Gateway MQTT', status: 'active', latency: '0.1s' },
        ];

        container.innerHTML = `
            <table class="table">
                <thead><tr><th>Dispositivo</th><th>Tipo</th><th>Status</th><th>Último TX</th></tr></thead>
                <tbody>
                    ${devices.map(dev => `
                        <tr class="${dev.status === 'degraded' ? 'tr-warning' : ''}">
                            <td><code>${dev.id}</code></td>
                            <td>${dev.type}</td>
                            <td>
                                <span class="status-dot-sm ${dev.status === 'active' ? 'status-dot-active' : 'status-dot-warning'}"></span>
                                <strong>${dev.status === 'active' ? 'ATIVO' : 'DEGRAD.'}</strong>
                            </td>
                            <td>${dev.latency}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    },

    _renderEventStream() {
        const container = document.getElementById('eventStream');
        if (!container) return;

        const events = [
            { time: '14:30:01', level: 'info', message: 'System health: ALL NODES OK' },
            { time: '14:30:25', level: 'info', message: 'Cycle #47 completed' },
            { time: '14:31:48', level: 'warn', message: 'USB buffer overflow. Frames: 12' },
            { time: '14:32:02', level: 'warn', message: 'USB buffer overflow. Frames: 28' },
            { time: '14:32:17', level: 'error', message: 'SIGSEGV at 0x7f8b2c004000' },
            { time: '14:32:19', level: 'error', message: 'Restart #1: GPU memory fail' },
            { time: '14:32:23', level: 'error', message: 'Restart #2: GPU memory fail' },
            { time: '14:32:27', level: 'error', message: 'Restart #3: GPU memory fail' },
            { time: '14:32:35', level: 'warn', message: 'Conveyor speed: 2.3 m/s (limit: 1.5)' },
            { time: '14:33:10', level: 'error', message: 'PROTECTIVE STOP ACTIVATED' },
        ];

        container.innerHTML = events.map(evt => `
            <div class="log-entry log-${evt.level}">
                <span class="timestamp">${evt.time}</span>
                <span class="level">${evt.level.toUpperCase()}</span>
                <span class="message">${evt.message}</span>
            </div>
        `).join('');
    },

    _renderRootCauseAnalysis() {
        const container = document.getElementById('rootCauseAnalysis');
        if (!container) return;

        container.innerHTML = `
            <div class="analysis-section">
                <h3><i class="fas fa-exclamation-triangle"></i> Causa Raiz Principal</h3>
                <div class="cause-chain">
                    <div class="cause-step"><span class="step-label">🌡️ GATILHO</span> IOT-ENV-001: 47.2°C</div>
                    <div class="cause-step"><span class="arrow">⬇</span></div>
                    <div class="cause-step"><span class="step-label">🔥 EFEITO 1</span> GPU superaquece</div>
                    <div class="cause-step"><span class="arrow">⬇</span></div>
                    <div class="cause-step"><span class="step-label">📹 EFEITO 2</span> Câmera perde dados (USB buffer overflow)</div>
                    <div class="cause-step"><span class="arrow">⬇</span></div>
                    <div class="cause-step"><span class="step-label">💥 EFEITO 3</span> /vision_pipeline SIGSEGV — 3 restarts falham</div>
                    <div class="cause-step"><span class="arrow">⬇</span></div>
                    <div class="cause-step"><span class="step-label">🚫 EFEITO 4</span> Robô perde detecção visual de objetos</div>
                    <div class="cause-step"><span class="arrow">⬇</span></div>
                    <div class="cause-step"><span class="step-label">🛑 RESULTADO</span> Safety monitor ativa protective stop</div>
                </div>
            </div>
            <div class="dependency-flow" style="margin-top:var(--space-4);">
                <div class="dep-node root">🌡️ Sensor térmico falhou</div><div class="dep-arrow">⬇</div>
                <div class="dep-node root">GPU superaqueceu (47.2°C)</div><div class="dep-arrow">⬇</div>
                <div class="dep-node" style="background:rgba(230,81,0,0.08);border-color:var(--color-warning);color:var(--color-warning);">Câmera perdeu dados</div><div class="dep-arrow">⬇</div>
                <div class="dep-node failed">Visão do robô quebrou</div><div class="dep-arrow">⬇</div>
                <div class="dep-row"><div class="dep-node failed">Robô ficou cego</div><div style="color:var(--gold-primary);">+</div><div class="dep-node root">Esteira 2.3 m/s</div></div><div class="dep-arrow">⬇</div>
                <div class="dep-node failed">🛑 Parada Protetiva</div>
            </div>
        `;
    },

    _renderDidactic() {
        const container = document.getElementById('didaticExplanation');
        if (!container) return;

        container.innerHTML = `
            <span class="layman-explain" style="display:block;margin-bottom:var(--space-4);">Pense no robô como uma pessoa trabalhando numa linha de montagem</span>
            <div class="didatic-grid">
                <div class="sense-card failed">
                    <i class="fas fa-eye"></i>
                    <h4>👁️ VISÃO</h4>
                    <p class="status-text" style="color:var(--color-critical);">❌ CEGO</p>
                    <p class="tiny-hint">Câmera "queimou" por superaquecimento</p>
                </div>
                <div class="sense-card warning-sense">
                    <i class="fas fa-ear-listen"></i>
                    <h4>👂 AUDIÇÃO</h4>
                    <p class="status-text" style="color:var(--color-warning);">⚠️ ATORDOADO</p>
                    <p class="tiny-hint">Esteira turbo — como som muito alto</p>
                </div>
                <div class="sense-card ok-sense">
                    <i class="fas fa-hand-paper"></i>
                    <h4>✋ TATO</h4>
                    <p class="status-text" style="color:var(--color-success);">✅ FUNCIONAL</p>
                    <p class="tiny-hint">Gripper OK — a mão do robô ainda funciona</p>
                </div>
            </div>
        `;
    },

    _renderActionPlan() {
        const container = document.getElementById('actionPlan');
        if (!container) return;

        const actions = [
            { priority: 'critical', num: 1, title: '🛑 Parar Esteira', desc: 'Serviço /conveyor/stop.', cmd: 'rosservice call /conveyor/stop', hint: 'confirmar 0.0 m/s', explain: 'Desligue a esteira primeiro — é o mais urgente' },
            { priority: 'high', num: 2, title: '🌡️ Verificar Aquecimento', desc: 'Inspecione ventoinhas e fluxo de ar.', hint: 'superfície >60°C indica problema', explain: 'Veja se os coolers estão girando e se há poeira' },
            { priority: 'high', num: 3, title: '⏳ Esperar Esfriar', desc: '5–10 minutos com ventilação forçada.', hint: 'Monitore IOT-ENV-001 até <40°C', explain: 'Deixe o computador descansar até esfriar' },
            { priority: 'medium', num: 4, title: '🔧 Examinar Esteira', desc: 'Verifique o controlador do motor.', hint: 'não religar ainda', explain: 'Descubra por que a esteira estava tão rápida' },
        ];

        container.innerHTML = actions.map(a => `
            <div class="action-step priority-${a.priority}">
                <div class="action-number">${a.num}</div>
                <div class="action-content">
                    <h4>${a.title}</h4>
                    <p>${a.desc}</p>
                    ${a.cmd ? `<span class="action-cmd">${a.cmd}</span>` : ''}
                    <p class="tiny-hint">${a.hint}</p>
                    <span class="layman-explain">${a.explain}</span>
                </div>
            </div>
        `).join('');
    },

    _renderRiskLevel() {
        const container = document.getElementById('riskLevel');
        if (!container) return;

        container.innerHTML = `
            <div class="risk-banner critical-risk">
                <div class="risk-icon"><i class="fas fa-radiation"></i></div>
                <div class="risk-text">
                    <h3>🔴 NÍVEL ALTO</h3>
                    <p>Protective stop ativo. GPU com risco de dano permanente se religado sem resfriamento.</p>
                </div>
            </div>
            <span class="layman-explain">Situação perigosa — o computador pode queimar de vez se não esfriar</span>
        `;
    },

    // ============================================================
    // EVENTOS
    // ============================================================
    _bindEvents() {
        // Escuta atualizações de diagnóstico
        IdenzaEvents.on('idenza:sensorData', (data) => {
            this._updateSensorData(data);
        });

        IdenzaEvents.on('idenza:robotStatusChanged', (data) => {
            this._updateSystemStatus(data.status);
        });
    },

    _updateSensorData(data) {
        if (data.sensorId === 'IOT-ENV-001') {
            const tempEl = document.getElementById('gpuTemperature');
            if (tempEl) tempEl.textContent = `${data.data.temperature.toFixed(1)}°C`;
        }
        if (data.sensorId === 'IOT-CONV-001') {
            const speedEl = document.getElementById('conveyorSpeed');
            if (speedEl) speedEl.textContent = `${data.data.speed.toFixed(1)} m/s`;
        }
    },

    _updateSystemStatus(status) {
        const badge = document.getElementById('systemBadge');
        if (!badge) return;

        badge.className = 'badge';
        switch (status) {
            case 'operational':
                badge.classList.add('badge-success');
                badge.textContent = 'OPERACIONAL';
                break;
            case 'degraded':
                badge.classList.add('badge-warning');
                badge.textContent = 'DEGRADADO';
                break;
            case 'critical':
            case 'stopped':
                badge.classList.add('badge-critical');
                badge.textContent = 'CRÍTICO';
                break;
        }
    },

    // ============================================================
    // AUTO REFRESH
    // ============================================================
    _startAutoRefresh() {
        if (!this.config.autoRefresh) return;

        this.state.intervalId = setInterval(() => {
            this._simulateDataUpdate();
        }, this.config.refreshInterval);
    },

    _stopAutoRefresh() {
        if (this.state.intervalId) {
            clearInterval(this.state.intervalId);
            this.state.intervalId = null;
        }
    },

    _simulateDataUpdate() {
        // Simula pequenas variações nos dados
        const temp = 47.2 + (Math.random() - 0.5) * 0.3;
        const tempEl = document.getElementById('gpuTemperature');
        if (tempEl) tempEl.textContent = `${temp.toFixed(1)}°C`;
    },

    // ============================================================
    // DESTRUIÇÃO
    // ============================================================
    destroy() {
        this._stopAutoRefresh();
        this.state.isLoaded = false;
    },
};

// ============================================================
// REGISTRO NO SISTEMA DE MÓDULOS
// ============================================================
if (typeof IdenzaModules === 'undefined') {
    window.IdenzaModules = {};
}
IdenzaModules.initDashboard = (container) => IdenzaDashboard.init(container);
