/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — MÓDULO SIMULADOR DE FALHAS
 * ============================================================
 * 
 * Ambiente de treinamento para diagnóstico:
 * - Cenários de falha interativos
 * - Sistema de pontuação e ranking
 * - Dicas progressivas
 * - Timer e pressão temporal
 * - Feedback detalhado pós-cenário
 * - Modo livre e modo desafio
 * 
 * @module Simulator
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaSimulator = {
    config: {
        maxHints: 3,
        hintPenalty: 10,
        timeBonus: 5,
        perfectScore: 100,
    },

    state: {
        scenarios: [],
        activeScenario: null,
        currentStep: 0,
        score: 0,
        hintsUsed: 0,
        timeElapsed: 0,
        timerInterval: null,
        isRunning: false,
        isCompleted: false,
        bestScores: {},
    },

    // ============================================================
    // CENÁRIOS DE SIMULAÇÃO
    // ============================================================
    _scenariosData: [
        {
            id: 'sim-thermal-runaway',
            title: 'Thermal Runaway — Superaquecimento em Cadeia',
            difficulty: 'intermediario',
            duration: '10 min',
            description: 'O robô UR10e está operando normalmente quando, repentinamente, entra em protective stop. A GPU está superaquecendo e o pipeline de visão falhou.',
            robotType: 'UR10e + Jetson Orin',
            initialConditions: {
                temperature: 42.0,
                conveyorSpeed: 1.2,
                visionStatus: 'active',
                rosNodes: 8,
                failedNodes: 0,
            },
            events: [
                { time: 30, type: 'warning', message: 'GPU temperature: 45.2°C (threshold: 45°C)', sensor: 'IOT-ENV-001' },
                { time: 60, type: 'warning', message: 'USB buffer overflow detected. Frames lost: 8', sensor: 'camera_depth' },
                { time: 90, type: 'warning', message: 'USB buffer overflow. Frames lost: 22', sensor: 'camera_depth' },
                { time: 120, type: 'error', message: 'SIGSEGV at /vision_pipeline. Restart attempt #1', node: 'vision_pipeline' },
                { time: 125, type: 'error', message: 'Restart #1 failed: GPU memory allocation error', node: 'vision_pipeline' },
                { time: 130, type: 'error', message: 'Restart #2 failed: GPU memory allocation error', node: 'vision_pipeline' },
                { time: 135, type: 'error', message: 'Restart #3 failed. Node /vision_pipeline offline', node: 'vision_pipeline' },
                { time: 140, type: 'warning', message: 'Conveyor speed increasing: 2.3 m/s (limit: 1.5)', sensor: 'IOT-CONV-001' },
                { time: 150, type: 'critical', message: 'PROTECTIVE STOP ACTIVATED', node: 'safety_monitor' },
            ],
            correctDiagnosis: 'superaquecimento_gpu',
            possibleDiagnoses: [
                { id: 'superaquecimento_gpu', label: 'Superaquecimento da GPU', isCorrect: true, description: 'A GPU superaqueceu (>45°C), causando falhas no pipeline de visão e protective stop.' },
                { id: 'falha_camera', label: 'Falha física da câmera', isCorrect: false, description: 'A câmera quebrou fisicamente.' },
                { id: 'falha_rede', label: 'Falha na rede WiFi', isCorrect: false, description: 'Problemas de conectividade de rede.' },
                { id: 'falha_motor', label: 'Falha no motor da esteira', isCorrect: false, description: 'O motor da esteira quebrou.' },
            ],
            hints: [
                'Verifique a temperatura da GPU — IOT-ENV-001 mostra valores acima do normal.',
                'Os logs mostram "USB buffer overflow" antes das falhas do vision_pipeline.',
                'O protective stop foi ativado pelo safety_monitor, não pelo operador.',
            ],
        },
        {
            id: 'sim-sensor-drift',
            title: 'Sensor Drift — Dados Incorretos Silenciosos',
            difficulty: 'avancado',
            duration: '15 min',
            description: 'O robô está operando mas a qualidade das peças está caindo. O sensor de temperatura está reportando valores incorretos (drift), causando falsos alertas.',
            robotType: 'UR5e + Esteira',
            initialConditions: {
                temperature: 38.0,
                conveyorSpeed: 1.0,
                visionStatus: 'active',
                rosNodes: 6,
                failedNodes: 0,
            },
            events: [
                { time: 20, type: 'info', message: 'Temperature reading: 38.5°C', sensor: 'IOT-ENV-001' },
                { time: 50, type: 'info', message: 'Temperature reading: 41.0°C', sensor: 'IOT-ENV-001' },
                { time: 80, type: 'warning', message: 'Temperature reading: 44.8°C (near threshold)', sensor: 'IOT-ENV-001' },
                { time: 100, type: 'info', message: 'Actual GPU temp (manual): 39.0°C — Sensor discrepancy detected', sensor: 'IOT-ENV-001' },
                { time: 120, type: 'warning', message: 'False temperature alert triggered. Production slowed.', node: 'safety_monitor' },
            ],
            correctDiagnosis: 'drift_sensor',
            possibleDiagnoses: [
                { id: 'drift_sensor', label: 'Drift no sensor de temperatura', isCorrect: true, description: 'O sensor IOT-ENV-001 está com drift, reportando valores 5-6°C acima do real.' },
                { id: 'superaquecimento_real', label: 'Superaquecimento real da GPU', isCorrect: false, description: 'A GPU está realmente superaquecendo.' },
                { id: 'falha_software', label: 'Bug no software de monitoramento', isCorrect: false, description: 'O software está com bug de leitura.' },
            ],
            hints: [
                'Compare a leitura do sensor com uma medição manual (termômetro infravermelho).',
                'O sensor IOT-ENV-001 tem 18 meses de uso — calibração pode estar vencida.',
                'A temperatura ambiente não justifica os valores reportados.',
            ],
        },
        {
            id: 'sim-network-partition',
            title: 'Network Partition — Sistema Dividido',
            difficulty: 'especialista',
            duration: '20 min',
            description: 'Parte dos sensores IoT parou de responder. O gateway MQTT está recebendo dados de apenas metade dos dispositivos. O ROS ainda está funcional.',
            robotType: 'Fábrica com 20 sensores IoT',
            initialConditions: {
                sensorsOnline: 20,
                sensorsOffline: 0,
                mqttConnected: true,
                rosConnected: true,
            },
            events: [
                { time: 10, type: 'warning', message: 'Sensor IOT-ENV-005: latency increased to 5s', sensor: 'IOT-ENV-005' },
                { time: 30, type: 'warning', message: 'Sensors IOT-ENV-006 through IOT-ENV-010: latency > 8s', sensor: 'multiple' },
                { time: 60, type: 'error', message: 'Sensors IOT-ENV-006 through IOT-ENV-010: OFFLINE', sensor: 'multiple' },
                { time: 90, type: 'info', message: 'Gateway MQTT: half of sensors unreachable', sensor: 'gateway' },
                { time: 120, type: 'critical', message: 'Production line B: insufficient sensor coverage. Manual inspection required.', sensor: 'system' },
            ],
            correctDiagnosis: 'particao_rede',
            possibleDiagnoses: [
                { id: 'particao_rede', label: 'Partição de rede (switch com defeito)', isCorrect: true, description: 'Um switch de rede entre os sensores 6-10 e o gateway falhou, criando uma partição.' },
                { id: 'falha_sensores', label: 'Falha em massa dos sensores', isCorrect: false, description: '5 sensores queimaram simultaneamente.' },
                { id: 'falha_gateway', label: 'Falha no gateway MQTT', isCorrect: false, description: 'O gateway central parou de funcionar.' },
                { id: 'ataque_hacker', label: 'Ataque cibernético', isCorrect: false, description: 'Alguém invadiu a rede e derrubou os sensores.' },
            ],
            hints: [
                'Os sensores offline são consecutivos (6-10) — isso sugere um ponto comum de falha.',
                'Verifique a topologia da rede: há um switch entre o gateway e os sensores 6-10?',
                'O gateway MQTT está online e recebendo dados dos sensores 1-5 normalmente.',
            ],
        },
    ],

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init(container) {
        this.state.scenarios = this._scenariosData;
        this.state.bestScores = IdenzaStorage.get('simulator_best_scores') || {};

        this._render(container);
        this._bindEvents();

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaSimulator] Simulador inicializado com', this.state.scenarios.length, 'cenários');
        }
    },

    // ============================================================
    // RENDERIZAÇÃO
    // ============================================================
    _render(container) {
        container.innerHTML = `
            <div class="simulator-page animate-fade-in">
                <div class="panel panel-full">
                    <div class="panel-header">
                        <i class="fas fa-flask"></i>
                        <h2>🧪 Simulador de Falhas — Idenza Academy</h2>
                        <span class="badge badge-warning">${this.state.scenarios.length} CENÁRIOS</span>
                    </div>
                    <p class="tiny-hint">Treine suas habilidades de diagnóstico em um ambiente seguro. Cada cenário simula uma falha real com eventos em tempo real. Quanto mais rápido e preciso, maior sua pontuação.</p>
                    <span class="layman-explain">Como um simulador de voo para pilotos — mas para engenheiros de robótica</span>
                </div>

                <!-- Grid de Cenários -->
                <div class="grid-cards" style="margin-top:var(--space-4);" id="scenarioGrid">
                    ${this.state.scenarios.map((scenario, index) => {
                        const bestScore = this.state.bestScores[scenario.id];
                        return `
                            <div class="card card-accent-top animate-fade-in-up" style="animation-delay:${index * 100}ms">
                                <div class="card-icon">
                                    <i class="fas fa-flask"></i>
                                </div>
                                <div class="card-header-actions">
                                    <span class="badge badge-${scenario.difficulty === 'especialista' ? 'critical' : scenario.difficulty === 'avancado' ? 'warning' : 'info'}">${scenario.difficulty}</span>
                                </div>
                                <h4 class="card-title">${scenario.title}</h4>
                                <p class="card-text">${scenario.description.substring(0, 100)}...</p>
                                <div class="project-meta">
                                    <span class="tag"><i class="fas fa-clock"></i> ${scenario.duration}</span>
                                    <span class="tag"><i class="fas fa-robot"></i> ${scenario.robotType}</span>
                                </div>
                                ${bestScore !== undefined ? `
                                    <div class="best-score">
                                        <span class="tiny-hint">🏆 Melhor pontuação: <strong style="color:var(--gold-primary);">${bestScore}%</strong></span>
                                    </div>
                                ` : ''}
                                <div class="card-footer">
                                    <button class="btn btn-sm btn-gold" onclick="IdenzaSimulator.startSimulation('${scenario.id}')">
                                        <i class="fas fa-play"></i> Iniciar Simulação
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    },

    // ============================================================
    // INICIAR SIMULAÇÃO
    // ============================================================
    startSimulation(scenarioId) {
        const scenario = this.state.scenarios.find(s => s.id === scenarioId);
        if (!scenario) return;

        // Reseta estado
        this.state.activeScenario = scenario;
        this.state.currentStep = 0;
        this.state.score = this.config.perfectScore;
        this.state.hintsUsed = 0;
        this.state.timeElapsed = 0;
        this.state.isRunning = true;
        this.state.isCompleted = false;

        IdenzaModal.open({
            title: `Simulador: ${scenario.title}`,
            size: 'xl',
            closeOnOverlay: false,
            closeOnEscape: false,
            onClose: () => this._stopSimulation(),
            content: this._renderSimulationUI(scenario),
            onOpen: () => {
                this._startTimer();
                this._runEventSequence(scenario);
            },
        });
    },

    _renderSimulationUI(scenario) {
        return `
            <div class="simulation-container">
                <!-- Barra Superior -->
                <div class="simulation-header">
                    <div class="sim-stat">
                        <i class="fas fa-clock"></i>
                        <span>Timer: <strong id="simTimer">00:00</strong></span>
                    </div>
                    <div class="sim-stat">
                        <i class="fas fa-star"></i>
                        <span>Score: <strong id="simScore">${this.config.perfectScore}</strong></span>
                    </div>
                    <div class="sim-stat">
                        <i class="fas fa-lightbulb"></i>
                        <span>Dicas: <strong id="simHints">${this.state.hintsUsed}/${this.config.maxHints}</strong></span>
                    </div>
                </div>

                <div class="simulation-body">
                    <!-- Console de Eventos -->
                    <div class="sim-console" id="simConsole">
                        <div class="sim-console-header">
                            <i class="fas fa-terminal"></i> Event Stream — Tempo Real
                        </div>
                        <div class="sim-console-output" id="simConsoleOutput">
                            <div class="log-entry log-info">
                                <span class="timestamp">00:00</span>
                                <span class="level">INFO</span>
                                <span class="message">Simulação iniciada. ${scenario.robotType} operacional.</span>
                            </div>
                        </div>
                    </div>

                    <!-- Painel de Diagnóstico -->
                    <div class="sim-diagnosis-panel" id="simDiagnosisPanel">
                        <h4><i class="fas fa-stethoscope"></i> Seu Diagnóstico</h4>
                        <p class="tiny-hint">Analise os eventos e selecione a causa raiz quando estiver pronto.</p>
                        
                        <div class="diagnosis-options" id="diagnosisOptions">
                            ${scenario.possibleDiagnoses.map((d, i) => `
                                <label class="diagnosis-option" id="diagOption${i}">
                                    <input type="radio" name="diagnosis" value="${d.id}" ${this.state.isCompleted ? 'disabled' : ''}>
                                    <div class="diagnosis-option-content">
                                        <strong>${d.label}</strong>
                                        <p>${d.description}</p>
                                    </div>
                                </label>
                            `).join('')}
                        </div>

                        <div class="sim-actions">
                            <button class="btn btn-sm btn-outline" id="simHintBtn" ${this.state.hintsUsed >= this.config.maxHints ? 'disabled' : ''}>
                                <i class="fas fa-lightbulb"></i> Usar Dica (${this.config.maxHints - this.state.hintsUsed} restantes)
                            </button>
                            <button class="btn btn-sm btn-gold" id="simSubmitBtn">
                                <i class="fas fa-check"></i> Submeter Diagnóstico
                            </button>
                        </div>

                        <div id="simFeedback" style="margin-top:var(--space-3);display:none;"></div>
                    </div>
                </div>
            </div>
        `;
    },

    // ============================================================
    // EXECUÇÃO DOS EVENTOS
    // ============================================================
    _runEventSequence(scenario) {
        if (!this.state.isRunning) return;

        let eventIndex = 0;
        const startTime = Date.now();

        const processNextEvent = () => {
            if (!this.state.isRunning || eventIndex >= scenario.events.length) return;

            const event = scenario.events[eventIndex];
            const elapsed = Math.floor((Date.now() - startTime) / 1000);

            // Agenda evento para o tempo correto
            const delay = Math.max(0, (event.time - elapsed) * 1000);

            setTimeout(() => {
                if (!this.state.isRunning) return;
                this._addConsoleEvent(event);
                eventIndex++;
                processNextEvent();
            }, delay > 10000 ? 10000 : delay); // Acelera eventos para não demorar demais
        };

        processNextEvent();
    },

    _addConsoleEvent(event) {
        const output = document.getElementById('simConsoleOutput');
        if (!output) return;

        const time = String(event.time).padStart(2, '0');
        const levelClass = `log-${event.type === 'critical' ? 'error' : event.type === 'warning' ? 'warn' : 'info'}`;

        const entry = document.createElement('div');
        entry.className = `log-entry ${levelClass} animate-fade-in`;
        entry.innerHTML = `
            <span class="timestamp">00:${time}</span>
            <span class="level">${event.type.toUpperCase()}</span>
            <span class="message">${event.message}</span>
        `;

        output.appendChild(entry);
        output.scrollTop = output.scrollHeight;

        // Vibração visual para eventos críticos
        if (event.type === 'critical') {
            output.style.animation = 'shake 0.3s ease';
            setTimeout(() => output.style.animation = '', 300);
        }
    },

    // ============================================================
    // AÇÕES DO USUÁRIO
    // ============================================================
    useHint() {
        if (!this.state.activeScenario || this.state.hintsUsed >= this.config.maxHints || this.state.isCompleted) return;

        const scenario = this.state.activeScenario;
        const hint = scenario.hints[this.state.hintsUsed];

        if (hint) {
            this.state.hintsUsed++;
            this.state.score -= this.config.hintPenalty;

            // Atualiza UI
            const hintsEl = document.getElementById('simHints');
            const scoreEl = document.getElementById('simScore');
            if (hintsEl) hintsEl.textContent = `${this.state.hintsUsed}/${this.config.maxHints}`;
            if (scoreEl) scoreEl.textContent = this.state.score;

            // Mostra dica no console
            const output = document.getElementById('simConsoleOutput');
            if (output) {
                const entry = document.createElement('div');
                entry.className = 'log-entry log-info';
                entry.innerHTML = `
                    <span class="timestamp">💡 DICA</span>
                    <span class="message" style="color:var(--gold-primary);">${hint}</span>
                `;
                output.appendChild(entry);
                output.scrollTop = output.scrollHeight;
            }

            // Desabilita botão se acabaram as dicas
            const hintBtn = document.getElementById('simHintBtn');
            if (hintBtn && this.state.hintsUsed >= this.config.maxHints) {
                hintBtn.disabled = true;
                hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Sem dicas restantes';
            }
        }
    },

    submitDiagnosis() {
        if (!this.state.activeScenario || this.state.isCompleted) return;

        const selected = document.querySelector('input[name="diagnosis"]:checked');
        if (!selected) {
            IdenzaToast?.warning('Selecione um diagnóstico antes de submeter.');
            return;
        }

        this.state.isRunning = false;
        this.state.isCompleted = true;
        this._stopTimer();

        const scenario = this.state.activeScenario;
        const diagnosisId = selected.value;
        const isCorrect = scenario.possibleDiagnoses.find(d => d.id === diagnosisId)?.isCorrect || false;

        // Bônus de tempo (quanto mais rápido, mais pontos)
        const timeBonus = Math.max(0, this.config.timeBonus - Math.floor(this.state.timeElapsed / 60));
        if (isCorrect) {
            this.state.score += timeBonus;
        } else {
            this.state.score = Math.floor(this.state.score * 0.5); // Penalidade de 50%
        }

        // Atualiza melhor score
        if (isCorrect) {
            const currentBest = this.state.bestScores[scenario.id] || 0;
            if (this.state.score > currentBest) {
                this.state.bestScores[scenario.id] = this.state.score;
                IdenzaStorage.set('simulator_best_scores', this.state.bestScores);
            }
        }

        // Mostra feedback
        const feedbackDiv = document.getElementById('simFeedback');
        if (feedbackDiv) {
            feedbackDiv.style.display = 'block';
            feedbackDiv.innerHTML = isCorrect ? `
                <div class="alert alert-success">
                    <div class="alert-icon"><i class="fas fa-trophy"></i></div>
                    <div class="alert-content">
                        <div class="alert-title">🎉 Diagnóstico Correto!</div>
                        <div class="alert-message">
                            <p>Você identificou a causa raiz corretamente.</p>
                            <p><strong>Score Final:</strong> ${this.state.score}%</p>
                            <p><strong>Tempo:</strong> ${this._formatTime(this.state.timeElapsed)}</p>
                            <p><strong>Dicas usadas:</strong> ${this.state.hintsUsed}</p>
                            ${timeBonus > 0 ? `<p><strong>Bônus de tempo:</strong> +${timeBonus} pontos</p>` : ''}
                        </div>
                    </div>
                </div>
            ` : `
                <div class="alert alert-critical">
                    <div class="alert-icon"><i class="fas fa-times-circle"></i></div>
                    <div class="alert-content">
                        <div class="alert-title">❌ Diagnóstico Incorreto</div>
                        <div class="alert-message">
                            <p>A causa raiz correta era: <strong>${scenario.possibleDiagnoses.find(d => d.isCorrect)?.label}</strong></p>
                            <p>${scenario.possibleDiagnoses.find(d => d.isCorrect)?.description}</p>
                            <p><strong>Score Final:</strong> ${this.state.score}%</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // Desabilita opções
        document.querySelectorAll('input[name="diagnosis"]').forEach(input => input.disabled = true);
        const submitBtn = document.getElementById('simSubmitBtn');
        if (submitBtn) submitBtn.disabled = true;
    },

    // ============================================================
    // TIMER
    // ============================================================
    _startTimer() {
        this.state.timeElapsed = 0;
        this.state.timerInterval = setInterval(() => {
            this.state.timeElapsed++;
            const timerEl = document.getElementById('simTimer');
            if (timerEl) {
                timerEl.textContent = this._formatTime(this.state.timeElapsed);
            }
        }, 1000);
    },

    _stopTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    },

    _stopSimulation() {
        this.state.isRunning = false;
        this._stopTimer();
    },

    // ============================================================
    // EVENTOS
    // ============================================================
    _bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#simHintBtn')) {
                this.useHint();
            }
            if (e.target.closest('#simSubmitBtn')) {
                this.submitDiagnosis();
            }
        });
    },

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    _formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    },

    destroy() {
        this._stopSimulation();
    },
};

// ============================================================
// REGISTRO NO SISTEMA DE MÓDULOS
// ============================================================
if (typeof IdenzaModules === 'undefined') {
    window.IdenzaModules = {};
}
IdenzaModules.initSimulator = (container) => IdenzaSimulator.init(container);
