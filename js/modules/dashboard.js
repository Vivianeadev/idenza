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
                <thead><tr><th>Dispositivo</th><th>Tipo</th><th>Status</th><th>Último TX</th></tr
