/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — API MOCK / DADOS DE SIMULAÇÃO
 * ============================================================
 * 
 * Dados simulados para desenvolvimento e demonstração:
 * - Dados de diagnóstico em tempo real
 * - Telemetria de sensores IoT
 * - Logs de eventos do sistema
 * - Status de nós ROS
 * - Usuários de exemplo
 * - Respostas de API simuladas
 * 
 * @database ApiMock
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IDENZA_API_MOCK = {
    // ============================================================
    // DIAGNÓSTICO EM TEMPO REAL
    // ============================================================
    diagnosticData: {
        robotStatus: 'critical',
        robotName: 'UR10e-Cell-03',
        robotType: 'Universal Robots UR10e',
        firmwareVersion: '5.17.1',
        uptime: '127h 43m',
        lastMaintenance: '2026-05-15',
        protectiveStopActive: true,
        stopReason: 'Sobrevelocidade da esteira + perda de detecção visual',
        conveyorSpeed: 2.3,
        conveyorLimit: 1.5,
        gpuTemperature: 47.2,
        gpuTemperatureLimit: 45.0,
        ambientTemperature: 26.8,
        humidity: 54.3,
        cycleCount: 47218,
        partsProcessed: 46892,
        rejectRate: 0.7,
    },

    // ============================================================
    // NÓS ROS (ESTADO ATUAL)
    // ============================================================
    rosNodes: [
        { name: '/ur_driver', package: 'ur_robot_driver', status: 'active', cpu: 12.4, mem: 340, pid: 2841, uptime: '127h', restartCount: 0 },
        { name: '/gripper_controller', package: 'robotiq_85', status: 'active', cpu: 3.1, mem: 85, pid: 2912, uptime: '127h', restartCount: 0 },
        { name: '/camera_depth', package: 'realsense2_camera', status: 'active', cpu: 18.7, mem: 520, pid: 2890, uptime: '127h', restartCount: 0 },
        { name: '/vision_pipeline', package: 'idenza_vision', status: 'failed', cpu: 0, mem: 0, pid: null, uptime: '0s', restartCount: 3, lastError: 'SIGSEGV: GPU memory allocation failed' },
        { name: '/conveyor_bridge', package: 'idenza_conveyor', status: 'active', cpu: 5.2, mem: 120, pid: 2956, uptime: '127h', restartCount: 0 },
        { name: '/safety_monitor', package: 'idenza_safety', status: 'active', cpu: 2.0, mem: 65, pid: 2801, uptime: '127h', restartCount: 0, alerts: ['PROTECTIVE_STOP_ACTIVE'] },
        { name: '/move_group', package: 'moveit_ros', status: 'active', cpu: 8.9, mem: 410, pid: 3001, uptime: '127h', restartCount: 0 },
        { name: '/data_logger', package: 'idenza_logger', status: 'active', cpu: 1.3, mem: 45, pid: 3102, uptime: '127h', restartCount: 0 },
    ],

    // ============================================================
    // DISPOSITIVOS IOT
    // ============================================================
    iotDevices: [
        { id: 'IOT-CONV-001', type: 'Encoder Esteira', protocol: 'MQTT', status: 'active', batteryLevel: 92, signalStrength: -48, lastSeen: Date.now() - 100, data: { speed: 2.3, unit: 'm/s' } },
        { id: 'IOT-CONV-002', type: 'Sensor Presença', protocol: 'MQTT', status: 'active', batteryLevel: 88, signalStrength: -55, lastSeen: Date.now() - 500, data: { objectsDetected: 3 } },
        { id: 'IOT-CONV-003', type: 'Atuador Parada', protocol: 'MQTT', status: 'active', batteryLevel: 95, signalStrength: -42, lastSeen: Date.now() - 300, data: { state: 'engaged' } },
        { id: 'IOT-ENV-001', type: 'Temp. GPU', protocol: 'MQTT', status: 'degraded', batteryLevel: 45, signalStrength: -78, lastSeen: Date.now() - 12400, data: { temperature: 47.2, unit: 'celsius' }, packetLoss: 34, latency: 12.4 },
        { id: 'IOT-ENV-002', type: 'Umidade', protocol: 'MQTT', status: 'active', batteryLevel: 90, signalStrength: -50, lastSeen: Date.now() - 600, data: { humidity: 54.3, unit: 'percent' } },
        { id: 'IOT-GATEWAY-01', type: 'Gateway MQTT', protocol: 'MQTT', status: 'active', lastSeen: Date.now() - 100, data: { connectedDevices: 5, messagesPerSecond: 48 } },
    ],

    // ============================================================
    // EVENTOS DO SISTEMA (LOGS)
    // ============================================================
    systemEvents: [
        { id: 1, timestamp: '2026-05-30T14:30:01.000Z', level: 'info', source: 'system_monitor', message: 'System health check: ALL NODES OK' },
        { id: 2, timestamp: '2026-05-30T14:30:25.000Z', level: 'info', source: 'cycle_manager', message: 'Cycle #47 completed successfully. Parts: 8/8' },
        { id: 3, timestamp: '2026-05-30T14:31:48.000Z', level: 'warn', source: 'camera_depth', message: 'USB buffer overflow detected. Frames lost: 12' },
        { id: 4, timestamp: '2026-05-30T14:32:02.000Z', level: 'warn', source: 'camera_depth', message: 'USB buffer overflow. Frames lost: 28' },
        { id: 5, timestamp: '2026-05-30T14:32:17.000Z', level: 'error', source: 'vision_pipeline', message: 'SIGSEGV at 0x7f8b2c004000. Segmentation fault.' },
        { id: 6, timestamp: '2026-05-30T14:32:19.000Z', level: 'error', source: 'node_manager', message: 'Restart attempt #1 for /vision_pipeline failed: GPU memory allocation error' },
        { id: 7, timestamp: '2026-05-30T14:32:23.000Z', level: 'error', source: 'node_manager', message: 'Restart attempt #2 for /vision_pipeline failed: GPU memory allocation error' },
        { id: 8, timestamp: '2026-05-30T14:32:27.000Z', level: 'error', source: 'node_manager', message: 'Restart attempt #3 for /vision_pipeline failed. Marking as FAILED.' },
        { id: 9, timestamp: '2026-05-30T14:32:35.000Z', level: 'warn', source: 'conveyor_bridge', message: 'Conveyor speed: 2.3 m/s (limit: 1.5 m/s). Overspeed detected.' },
        { id: 10, timestamp: '2026-05-30T14:33:10.000Z', level: 'critical', source: 'safety_monitor', message: 'PROTECTIVE STOP ACTIVATED. Reason: overspeed + vision loss.' },
    ],

    // ============================================================
    // PERFIL DE USUÁRIO (DEMO)
    // ============================================================
    userProfile: {
        name: 'Eng. Roberto Silva',
        email: 'roberto.silva@idenzarobotics.com',
        role: 'engineer',
        avatar: null,
        company: 'Idenza Robotics Intelligence S.A.',
        department: 'Engenharia de Robótica',
        joinedAt: '2026-01-15',
        certifications: [
            { id: 'cert-001', name: 'Idenza IoT Fundamentals', date: '2026-02-20', score: 94 },
            { id: 'cert-002', name: 'Idenza ROS Associate', date: '2026-04-10', score: 88 },
        ],
        preferences: {
            theme: 'luxury',
            language: 'pt-BR',
            notifications: true,
            autoConnect: false,
        },
    },

    // ============================================================
    // RESPOSTAS DE API SIMULADAS
    // ============================================================
    apiResponses: {
        '/api/diagnostic/current': {
            success: true,
            data: null, // Referência circular — usar getDiagnosticData()
            timestamp: new Date().toISOString(),
        },
        '/api/ros/nodes': {
            success: true,
            data: null, // Referência — usar getNodes()
            count: 8,
        },
        '/api/iot/devices': {
            success: true,
            data: null, // Referência — usar getDevices()
            count: 6,
        },
        '/api/system/events': {
            success: true,
            data: null, // Referência — usar getEvents()
            count: 10,
            pagination: { page: 1, totalPages: 1, perPage: 50 },
        },
        '/api/user/profile': {
            success: true,
            data: null, // Referência — usar getUserProfile()
        },
    },

    // ============================================================
    // MÉTODOS DE ACESSO AOS DADOS
    // ============================================================
    getDiagnosticData() {
        return { ...this.diagnosticData, timestamp: new Date().toISOString() };
    },

    getNodes(filter = null) {
        let nodes = [...this.rosNodes];
        if (filter === 'active') nodes = nodes.filter(n => n.status === 'active');
        if (filter === 'failed') nodes = nodes.filter(n => n.status === 'failed');
        return nodes;
    },

    getDevices(filter = null) {
        let devices = [...this.iotDevices];
        if (filter === 'active') devices = devices.filter(d => d.status === 'active');
        if (filter === 'degraded') devices = devices.filter(d => d.status === 'degraded');
        return devices;
    },

    getEvents(limit = 50, level = null) {
        let events = [...this.systemEvents];
        if (level) events = events.filter(e => e.level === level);
        return events.slice(-limit);
    },

    getUserProfile() {
        return { ...this.userProfile };
    },

    // ============================================================
    // SIMULAÇÃO DE ATUALIZAÇÃO EM TEMPO REAL
    // ============================================================
    simulateRealtimeUpdate() {
        // Variação aleatória de temperatura
        this.diagnosticData.gpuTemperature += (Math.random() - 0.5) * 0.4;
        this.diagnosticData.gpuTemperature = Math.round(this.diagnosticData.gpuTemperature * 10) / 10;

        // Atualiza timestamp do último evento
        this.iotDevices.forEach(device => {
            if (device.status === 'active') {
                device.lastSeen = Date.now() - Math.floor(Math.random() * 500);
            }
        });

        // Gera novo evento aleatório ocasionalmente
        if (Math.random() < 0.3) {
            const newEvent = {
                id: this.systemEvents.length + 1,
                timestamp: new Date().toISOString(),
                level: Math.random() < 0.1 ? 'warn' : 'info',
                source: ['system_monitor', 'data_logger', 'conveyor_bridge'][Math.floor(Math.random() * 3)],
                message: `Routine check #${Math.floor(Math.random() * 1000)} completed.`,
            };
            this.systemEvents.push(newEvent);
            if (this.systemEvents.length > 100) this.systemEvents.shift();
        }

        return {
            diagnostic: this.getDiagnosticData(),
            devices: this.getDevices(),
            timestamp: Date.now(),
        };
    },
};

// ============================================================
// EXPORTAÇÃO
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IDENZA_API_MOCK;
}
