/* ============================================================
   NEXUS ROBOTICS ACADEMY v6.0
   ARQUIVO: js/modules/diagnostics.js
   DESCRIÇÃO: Motor de diagnóstico — cadeia causal, análise de
              falhas, correlação de eventos e logs em tempo real
   ============================================================ */

class NexusDiagnostics {
  constructor(app) {
    this.app = app;
    this.state = {
      nodes: [],
      sensors: [],
      logs: [],
      errors: [],
      warnings: [],
      protectiveStop: false,
      conveyorSpeed: 0,
      gpuTemp: 45.0,
      visionOnline: true,
      lastUpdate: null,
      rootCause: null,
      riskLevel: 'low',
    };

    this.subscribers = new Set();
    this.logRetention = 500; // Máximo de logs na memória
    this.updateInterval = null;
  }

  /**
   * Inicializa o módulo de diagnóstico
   */
  init() {
    this._initNodes();
    this._initSensors();
    this._startSimulation();

    // Atualiza estado global
    if (this.app?.stateManager) {
      this.app.stateManager.watch('diagnostics.*', (data) => {
        Object.assign(this.state, data);
        this._notifySubscribers();
      });
    }

    console.log('🔍 Módulo de Diagnóstico inicializado');
  }

  /**
   * Inicializa nós ROS
   */
  _initNodes() {
    this.state.nodes = [
      { name: '/ur_driver',            status: 'active',  cpu: 12, mem: 340, restartCount: 0, critical: true },
      { name: '/gripper_controller',   status: 'active',  cpu: 3,  mem: 85,  restartCount: 0, critical: false },
      { name: '/camera_depth',         status: 'active',  cpu: 18, mem: 520, restartCount: 0, critical: true },
      { name: '/vision_pipeline',      status: 'failed',  cpu: 0,  mem: 0,   restartCount: 3, critical: true,
        error: 'SIGSEGV — GPU memory allocation failed after 3 restarts' },
      { name: '/conveyor_bridge',      status: 'active',  cpu: 5,  mem: 120, restartCount: 0, critical: false },
      { name: '/safety_monitor',       status: 'active',  cpu: 2,  mem: 65,  restartCount: 0, critical: true },
      { name: '/move_group',           status: 'active',  cpu: 8,  mem: 410, restartCount: 0, critical: false },
      { name: '/data_logger',          status: 'active',  cpu: 1,  mem: 45,  restartCount: 0, critical: false },
    ];
  }

  /**
   * Inicializa sensores IoT
   */
  _initSensors() {
    this.state.sensors = [
      { id: 'IOT-CONV-001', type: 'Encoder Esteira',    status: 'active',    lastTx: '0.1s', value: '2.3 m/s', battery: 92 },
      { id: 'IOT-CONV-002', type: 'Sensor Presença',     status: 'active',    lastTx: '0.5s', value: 'OBJETO', battery: 88 },
      { id: 'IOT-CONV-003', type: 'Atuador Parada',      status: 'active',    lastTx: '0.3s', value: 'ARMADO', battery: 95 },
      { id: 'IOT-ENV-001',  type: 'Temp. GPU',           status: 'degraded',  lastTx: '12.4s', value: '47.2°C',
        packetLoss: 34, latency: '12.4s' },
      { id: 'IOT-ENV-002',  type: 'Umidade',             status: 'active',    lastTx: '0.6s', value: '58% RH', battery: 90 },
      { id: 'IOT-GATEWAY-01', type: 'Gateway MQTT',      status: 'active',    lastTx: '0.1s', value: 'OK', battery: 100 },
    ];
  }

  /**
   * Inicia simulação de dados (modo offline)
   */
  _startSimulation() {
    // Logs iniciais
    const initialLogs = [
      { timestamp: '14:30:01', level: 'INFO',  message: 'System health: ALL NODES OK', source: 'system' },
      { timestamp: '14:30:25', level: 'INFO',  message: 'Cycle #47 completed — 12 peças processadas', source: '/ur_driver' },
      { timestamp: '14:31:48', level: 'WARN',  message: 'USB buffer overflow — 12 frames perdidos', source: '/camera_depth' },
      { timestamp: '14:32:02', level: 'WARN',  message: 'USB buffer overflow — 28 frames perdidos', source: '/camera_depth' },
      { timestamp: '14:32:17', level: 'ERROR', message: 'SIGSEGV at 0x7f8b2c004000 — segmentation fault', source: '/vision_pipeline' },
      { timestamp: '14:32:19', level: 'ERROR', message: 'Restart #1 falhou: GPU memory allocation error', source: '/vision_pipeline' },
      { timestamp: '14:32:23', level: 'ERROR', message: 'Restart #2 falhou: GPU memory exhausted', source: '/vision_pipeline' },
      { timestamp: '14:32:27', level: 'ERROR', message: 'Restart #3 falhou: GPU memory critical', source: '/vision_pipeline' },
      { timestamp: '14:32:35', level: 'WARN',  message: 'Conveyor speed anomaly: 2.3 m/s (limite: 1.5 m/s)', source: '/conveyor_bridge' },
      { timestamp: '14:33:10', level: 'ERROR', message: 'PROTECTIVE STOP ENGAGED — Safety monitor triggered', source: '/safety_monitor' },
    ];

    this.state.logs = [...initialLogs];
    this.state.errors = initialLogs.filter(l => l.level === 'ERROR');
    this.state.warnings = initialLogs.filter(l => l.level === 'WARN');
    this.state.protectiveStop = true;
    this.state.conveyorSpeed = 2.3;
    this.state.gpuTemp = 47.2;
    this.state.visionOnline = false;
    this.state.lastUpdate = new Date().toISOString();

    // Análise de causa raiz
    this._analyzeRootCause();

    // Atualiza a cada 3 segundos (simula novos dados)
    this.updateInterval = setInterval(() => {
      this._simulateNewData();
    }, 3000);

    this._notifySubscribers();
  }

  /**
   * Simula novos dados chegando
   */
  _simulateNewData() {
    // Simula flutuação de temperatura
    const tempDelta = (Math.random() - 0.4) * 0.5;
    this.state.gpuTemp = Math.max(44, Math.min(48, this.state.gpuTemp + tempDelta));

    // Adiciona log periódico
    const now = new Date();
    const timestamp = now.toTimeString().slice(0, 8);

    if (Math.random() > 0.7) {
      this.addLog({
        timestamp,
        level: 'INFO',
        message: `GPU temperature: ${this.state.gpuTemp.toFixed(1)}°C`,
        source: '/safety_monitor',
      });
    }

    this.state.lastUpdate = now.toISOString();
    this._notifySubscribers();
  }

  /**
   * Análise de causa raiz
   */
  _analyzeRootCause() {
    const chain = [
      {
        step: 1,
        trigger: 'Sensor IOT-ENV-001 reportou 47.2°C (degradado, 34% perda de pacotes)',
        effect: 'GPU operando acima do limite térmico recomendado (45°C)',
        type: 'trigger',
      },
      {
        step: 2,
        trigger: 'GPU superaquecida (>45°C)',
        effect: 'Memory allocation errors nos buffers de frame da câmera',
        type: 'cascade',
      },
      {
        step: 3,
        trigger: 'USB buffer overflow — perda de 28 frames',
        effect: 'Pipeline de visão recebe dados corrompidos',
        type: 'cascade',
      },
      {
        step: 4,
        trigger: 'Dados corrompidos causam segmentation fault (SIGSEGV)',
        effect: 'Node /vision_pipeline crash',
        type: 'failure',
      },
      {
        step: 5,
        trigger: '3 tentativas de restart falham (GPU ainda quente)',
        effect: 'Sistema de visão offline permanentemente',
        type: 'failure',
      },
      {
        step: 6,
        trigger: 'Sem visão + esteira em sobrevelocidade (2.3 m/s)',
        effect: 'Safety monitor detecta condição insegura',
        type: 'cascade',
      },
      {
        step: 7,
        trigger: 'Condição insegura confirmada',
        effect: 'PROTECTIVE STOP — UR10e parado, esteira parada',
        type: 'result',
      },
    ];

    this.state.rootCause = {
      primary: 'Superaquecimento da GPU (47.2°C) — Sistema de refrigeração insuficiente',
      secondary: [
        'Sensor IOT-ENV-001 com perda de 34% dos pacotes — possível interferência WiFi',
        'Esteira operando 53% acima do limite (2.3 m/s vs 1.5 m/s) — controlador com drift',
      ],
      chain,
      recommendations: [
        { priority: 'critical', action: 'Parar esteira imediatamente', command: 'rosservice call /conveyor/stop' },
        { priority: 'high', action: 'Verificar ventoinhas e fluxo de ar da GPU', command: 'sensors | grep fan' },
        { priority: 'high', action: 'Aguardar GPU resfriar abaixo de 40°C (est. 8 min)', command: null },
        { priority: 'medium', action: 'Investigar controlador da esteira — recalibrar PID', command: null },
        { priority: 'medium', action: 'Reposicionar sensor IOT-ENV-001 ou trocar canal WiFi', command: null },
        { priority: 'low', action: 'Após resfriamento, restart do /vision_pipeline', command: 'ros2 lifecycle set /vision_pipeline configure' },
      ],
      riskLevel: 'high',
    };

    this.state.riskLevel = 'high';
  }

  /**
   * Adiciona um log
   */
  addLog(logEntry) {
    const entry = {
      timestamp: logEntry.timestamp || new Date().toTimeString().slice(0, 8),
      level: logEntry.level || 'INFO',
      message: logEntry.message,
      source: logEntry.source || 'unknown',
    };

    this.state.logs.unshift(entry);

    if (entry.level === 'ERROR') {
      this.state.errors.unshift(entry);
    } else if (entry.level === 'WARN') {
      this.state.warnings.unshift(entry);
    }

    // Limita retenção de logs
    if (this.state.logs.length > this.logRetention) {
      this.state.logs.length = this.logRetention;
    }
    if (this.state.errors.length > 100) this.state.errors.length = 100;
    if (this.state.warnings.length > 100) this.state.warnings.length = 100;

    // Se for erro crítico, reanalisa
    if (entry.level === 'ERROR') {
      this._analyzeRootCause();
    }

    this._notifySubscribers();
  }

  /**
   * Reinicia um node (simulado)
   */
  restartNode(nodeName) {
    const node = this.state.nodes.find(n => n.name === nodeName);
    if (!node) return false;

    if (node.name === '/vision_pipeline' && this.state.gpuTemp > 42) {
      this.addLog({
        level: 'WARN',
        message: `Cannot restart ${nodeName}: GPU temperature still high (${this.state.gpuTemp.toFixed(1)}°C)`,
        source: '/safety_monitor',
      });
      return false;
    }

    node.status = 'active';
    node.cpu = 5 + Math.random() * 15;
    node.mem = 200 + Math.random() * 400;
    node.restartCount++;

    this.addLog({
      level: 'INFO',
      message: `Node ${nodeName} restarted successfully (attempt #${node.restartCount})`,
      source: '/system',
    });

    if (node.name === '/vision_pipeline') {
      this.state.visionOnline = true;
    }

    this._notifySubscribers();
    return true;
  }

  /**
   * Para a esteira (simulado)
   */
  stopConveyor() {
    this.state.conveyorSpeed = 0;
    this.addLog({
      level: 'INFO',
      message: 'Conveyor stopped — speed: 0.0 m/s',
      source: '/conveyor_bridge',
    });
    this._notifySubscribers();
  }

  /**
   * Inscreve para receber atualizações
   */
  subscribe(callback) {
    this.subscribers.add(callback);
    // Envia estado atual imediatamente
    callback(this.getState());
    return () => this.subscribers.delete(callback);
  }

  /**
   * Notifica todos os assinantes
   */
  _notifySubscribers() {
    const state = this.getState();
    this.subscribers.forEach(cb => {
      try { cb(state); } catch (e) { console.error('Subscriber error:', e); }
    });
  }

  /**
   * Retorna snapshot do estado
   */
  getState() {
    return {
      nodes: [...this.state.nodes],
      sensors: [...this.state.sensors],
      logs: [...this.state.logs].slice(0, 50),
      errors: [...this.state.errors],
      warnings: [...this.state.warnings],
      protectiveStop: this.state.protectiveStop,
      conveyorSpeed: this.state.conveyorSpeed,
      gpuTemp: this.state.gpuTemp,
      visionOnline: this.state.visionOnline,
      lastUpdate: this.state.lastUpdate,
      rootCause: this.state.rootCause ? { ...this.state.rootCause } : null,
      riskLevel: this.state.riskLevel,
      summary: this.getSummary(),
    };
  }

  /**
   * Resumo executivo
   */
  getSummary() {
    const failedNodes = this.state.nodes.filter(n => n.status === 'failed').length;
    const degradedSensors = this.state.sensors.filter(s => s.status === 'degraded').length;
    const totalErrors = this.state.errors.length;
    const totalWarnings = this.state.warnings.length;

    return {
      failedNodes,
      degradedSensors,
      totalErrors,
      totalWarnings,
      protectiveStop: this.state.protectiveStop,
      conveyorSpeed: this.state.conveyorSpeed,
      gpuTemp: this.state.gpuTemp,
      riskLevel: this.state.riskLevel,
      statusText: failedNodes > 0 ? 'CRÍTICO' : degradedSensors > 0 ? 'DEGRADADO' : 'NOMINAL',
    };
  }

  /**
   * Destrói o módulo
   */
  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    this.subscribers.clear();
  }
}

// Exportação
export default NexusDiagnostics;

/* ============================================================
   FIM DO ARQUIVO: js/modules/diagnostics.js
   PRÓXIMO: js/modules/portfolio.js
   ============================================================ */
