/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — GRADE CURRICULAR COMPLETA
 * ============================================================
 * 
 * Definição completa de todas as trilhas de aprendizado:
 * - Cursos com aulas detalhadas
 * - Pré-requisitos e habilidades adquiridas
 * - Projetos integradores
 * - Certificações
 * - Carga horária e nível
 * 
 * @database Courses
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IDENZA_COURSES_CURRICULUM = {
    tracks: [
        {
            id: 'trilha-iot',
            name: 'IoT — Internet das Coisas',
            slug: 'trilha-iot',
            icon: 'fa-network-wired',
            description: 'Do primeiro LED piscando até redes mesh de 100 sensores. Domine o mundo da Internet das Coisas com projetos práticos e progressivos.',
            level: 'iniciante',
            totalHours: 40,
            lessonsCount: 12,
            projectsCount: 5,
            certification: 'Idenza IoT Fundamentals',
            prerequisites: ['Nenhum — este é o ponto de partida!'],
            skillsGained: [
                'Programação de microcontroladores (Arduino, ESP32)',
                'Comunicação WiFi e Bluetooth',
                'Protocolo MQTT',
                'Dashboards web em tempo real',
                'Armazenamento em nuvem (InfluxDB)',
                'Redes mesh (ESP-NOW, Zigbee)',
                'LoRa e LoRaWAN',
                'Segurança em dispositivos IoT',
            ],
            lessons: [
                { number: 1, title: 'Introdução à IoT e Microcontroladores', type: 'video', duration: '2h', description: 'O que é IoT, história, aplicações. Visão geral das plataformas: Arduino, ESP32, Raspberry Pi.' },
                { number: 2, title: 'Primeiros Passos com Arduino e Sensores', type: 'hands-on', duration: '3h', description: 'Instalação da IDE, primeiro sketch, leitura de sensores digitais e analógicos, display OLED.' },
                { number: 3, title: 'Comunicação WiFi com ESP32', type: 'hands-on', duration: '3h', description: 'Conexão WiFi, servidor web embutido, controle de LEDs via navegador.' },
                { number: 4, title: 'Protocolo MQTT na Prática', type: 'hands-on', duration: '4h', description: 'Brokers MQTT, publish/subscribe, tópicos, QoS, MQTT Explorer, integração com Node-RED.' },
                { number: 5, title: 'Criando Dashboards com Node-RED', type: 'hands-on', duration: '3h', description: 'Programação visual, fluxos, dashboard com gauges e gráficos, integração MQTT.' },
                { number: 6, title: 'Armazenamento em Nuvem (InfluxDB)', type: 'video', duration: '3h', description: 'Timeseries database, escrita e leitura via MQTT, Grafana para visualização.' },
                { number: 7, title: 'Redes Mesh com ESP-NOW e Zigbee', type: 'hands-on', duration: '4h', description: 'ESP-NOW: comunicação peer-to-peer. Zigbee: redes mesh com coordenação.' },
                { number: 8, title: 'LoRa e LoRaWAN — Longo Alcance', type: 'hands-on', duration: '4h', description: 'Módulos LoRa, comunicação ponto a ponto, The Things Network, Helium.' },
                { number: 9, title: 'Segurança em Dispositivos IoT', type: 'video', duration: '3h', description: 'Criptografia, autenticação, TLS/SSL, OTA updates, boas práticas.' },
                { number: 10, title: 'Projeto Integrador 1: Estação Meteorológica', type: 'project', duration: '4h', description: 'Construção completa: sensores → MQTT → InfluxDB → Grafana dashboard.' },
                { number: 11, title: 'Projeto Integrador 2: Rede de Sensores Agrícolas', type: 'project', duration: '4h', description: '10 sensores LoRa + gateway + dashboard para agricultura de precisão.' },
                { number: 12, title: 'Certificação e Projeto Final', type: 'exam', duration: '3h', description: 'Prova teórica e apresentação do projeto final personalizado.' },
            ],
        },
        {
            id: 'trilha-ros',
            name: 'ROS 2 — Robot Operating System',
            slug: 'trilha-ros',
            icon: 'fa-cogs',
            description: 'Aprenda o sistema operacional mais usado na robótica mundial. Do básico de nodes e tópicos até navegação autônoma com SLAM e manipulação com MoveIt.',
            level: 'intermediario',
            totalHours: 60,
            lessonsCount: 15,
            projectsCount: 4,
            certification: 'Idenza ROS Associate',
            prerequisites: ['Python intermediário', 'Linux básico (terminal)'],
            skillsGained: [
                'Arquitetura ROS 2 (nodes, topics, services, actions)',
                'Simulação com Gazebo',
                'Integração de sensores (câmeras, lidar, IMU)',
                'Visão computacional com OpenCV + ROS 2',
                'SLAM — Mapeamento e Localização Simultâneos',
                'Navegação autônoma com Nav2',
                'Manipulação robótica com MoveIt 2',
                'Debugging e diagnóstico de sistemas robóticos',
            ],
            lessons: [
                { number: 1, title: 'O que é ROS 2 e por que usar', type: 'video', duration: '2h', description: 'História do ROS, diferenças ROS 1 vs ROS 2, arquitetura DDS, casos de uso reais.' },
                { number: 2, title: 'Instalação e Configuração do ROS 2 Humble', type: 'hands-on', duration: '2h', description: 'Instalação no Ubuntu, configuração do ambiente, primeiros comandos.' },
                { number: 3, title: 'Nodes, Topics e Messages', type: 'hands-on', duration: '4h', description: 'Criação de nodes Python e C++, publisher/subscriber, mensagens customizadas.' },
                { number: 4, title: 'Services e Actions', type: 'hands-on', duration: '3h', description: 'Comunicação síncrona (services) e assíncrona (actions). Casos de uso.' },
                { number: 5, title: 'Launch Files e Parâmetros', type: 'hands-on', duration: '3h', description: 'Launch em Python e YAML, namespaces, remapping, parâmetros dinâmicos.' },
                { number: 6, title: 'Simulação com Gazebo', type: 'hands-on', duration: '4h', description: 'Gazebo Harmonic, spawn de robôs, mundos customizados, plugins.' },
                { number: 7, title: 'Sensores: Câmeras, Lidar e IMU no ROS 2', type: 'hands-on', duration: '4h', description: 'Drivers de câmera, nuvem de pontos, fusão sensorial com robot_localization.' },
                { number: 8, title: 'Visão Computacional com OpenCV + ROS 2', type: 'hands-on', duration: '4h', description: 'Bridge CV, processamento de imagem, detecção de objetos, calibração.' },
                { number: 9, title: 'SLAM — Mapeamento e Localização Simultâneos', type: 'hands-on', duration: '5h', description: 'Cartographer, SLAM Toolbox, RTAB-Map. Mapeamento indoor e outdoor.' },
                { number: 10, title: 'Navegação Autônoma com Nav2', type: 'hands-on', duration: '5h', description: 'Navigation stack, costmaps, planners, controllers, behaviors trees.' },
                { number: 11, title: 'Manipulação com MoveIt 2', type: 'hands-on', duration: '5h', description: 'Cinemática, planejamento de trajetória, colisão, grasping.' },
                { number: 12, title: 'Projeto: Robô Seguidor de Linha', type: 'project', duration: '5h', description: 'Construção de robô diferencial com visão e controle PID.' },
                { number: 13, title: 'Projeto: Carrinho Autônomo com SLAM', type: 'project', duration: '5h', description: 'Robô que mapeia ambiente e navega autonomamente.' },
                { number: 14, title: 'Debugging e Ferramentas de Diagnóstico', type: 'video', duration: '3h', description: 'rqt, ros2doctor, ros2 bag, logging, tracing.' },
                { number: 15, title: 'Certificação ROS 2 e Projeto Final', type: 'exam', duration: '4h', description: 'Prova teórica + projeto prático de navegação autônoma.' },
            ],
        },
    ],

    // ============================================================
    // MÉTODOS DE CONSULTA
    // ============================================================
    getTrack(trackId) {
        return this.tracks.find(t => t.id === trackId || t.slug === trackId) || null;
    },

    getLesson(trackId, lessonNumber) {
        const track = this.getTrack(trackId);
        return track?.lessons.find(l => l.number === lessonNumber) || null;
    },

    getAllLessons(trackId) {
        const track = this.getTrack(trackId);
        return track?.lessons || [];
    },

    getTotalLessons() {
        return this.tracks.reduce((sum, track) => sum + track.lessonsCount, 0);
    },
};

// ============================================================
// EXPORTAÇÃO
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IDENZA_COURSES_CURRICULUM;
}
