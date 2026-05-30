/* ============================================================
   NEXUS ROBOTICS ACADEMY v6.0
   ARQUIVO: js/data/courses-curriculum.js
   DESCRIÇÃO: Grade curricular completa — 5 trilhas, 30+ cursos,
              150+ aulas, quizzes e certificações
   ============================================================ */

const NEXUS_COURSES_CURRICULUM = {

  // ==========================================
  // METADADOS DA ACADEMY
  // ==========================================
  academy: {
    name: "Nexus Robotics Academy",
    version: "6.0",
    totalHours: 480,
    totalCourses: 32,
    totalTracks: 5,
    languages: ["pt-BR", "en", "es"],
    certificationLevels: ["Fundamentals", "Associate", "Professional", "Architect"],
  },

  // ==========================================
  // 1. TRILHA: IoT & SENSORES
  // ==========================================
  tracks: [
    {
      id: "track-iot",
      name: "IoT & Sensores Inteligentes",
      icon: "fa-microchip",
      color: "#2e7d32",
      level: "Fundamentals → Associate",
      totalHours: 80,
      description: "Do LED piscante à rede de sensores com MQTT, InfluxDB e Grafana. Aprenda a capturar, transmitir e visualizar dados do mundo físico.",
      prerequisites: ["Nenhum — comece do zero"],
      careers: ["Engenheiro de IoT", "Desenvolvedor de Sensores", "Técnico de Automação"],
      modules: [
        {
          id: "iot-mod-01",
          name: "Eletrônica Básica para IoT",
          hours: 10,
          lessons: [
            { id: "iot-01-01", title: "Tensão, Corrente e Resistência — Lei de Ohm na prática", duration: "45min", type: "video", hasQuiz: true },
            { id: "iot-01-02", title: "GPIO, PWM e ADC — Como o Arduino lê e escreve no mundo", duration: "60min", type: "hands-on", hasQuiz: true },
            { id: "iot-01-03", title: "Sensores Analógicos vs Digitais — LDR, potenciômetro, botão", duration: "50min", type: "hands-on", hasQuiz: true },
            { id: "iot-01-04", title: "Protocolos de Comunicação: I²C, SPI, UART explicados", duration: "70min", type: "video", hasQuiz: true },
            { id: "iot-01-05", title: "Projeto: Estação Meteorológica com Display OLED", duration: "90min", type: "project", hasQuiz: false },
          ],
        },
        {
          id: "iot-mod-02",
          name: "Conectividade WiFi & MQTT",
          hours: 15,
          lessons: [
            { id: "iot-02-01", title: "ESP32: O Microcontrolador que Fala com a Internet", duration: "50min", type: "video", hasQuiz: true },
            { id: "iot-02-02", title: "WiFi Manager — Conecte sem hardcodar SSID e senha", duration: "40min", type: "hands-on", hasQuiz: false },
            { id: "iot-02-03", title: "MQTT: O Protocolo da IoT — Publish, Subscribe e Tópicos", duration: "60min", type: "video", hasQuiz: true },
            { id: "iot-02-04", title: "Broker MQTT Local com Mosquitto — Instale e Configure", duration: "45min", type: "hands-on", hasQuiz: false },
            { id: "iot-02-05", title: "QoS, Last Will e Retained Messages — MQTT Avançado", duration: "50min", type: "video", hasQuiz: true },
            { id: "iot-02-06", title: "Projeto: Rede de 3 Sensores de Temperatura Publicando via MQTT", duration: "120min", type: "project", hasQuiz: false },
          ],
        },
        {
          id: "iot-mod-03",
          name: "Dashboards & Armazenamento",
          hours: 12,
          lessons: [
            { id: "iot-03-01", title: "Node-RED: Programação Visual para IoT", duration: "60min", type: "video", hasQuiz: true },
            { id: "iot-03-02", title: "InfluxDB: Banco de Dados para Séries Temporais", duration: "50min", type: "hands-on", hasQuiz: true },
            { id: "iot-03-03", title: "Grafana: Dashboards Profissionais em Minutos", duration: "70min", type: "hands-on", hasQuiz: false },
            { id: "iot-03-04", title: "Projeto: Dashboard de Monitoramento Ambiental em Tempo Real", duration: "120min", type: "project", hasQuiz: false },
          ],
        },
      ],
      certification: {
        name: "Nexus IoT Fundamentals",
        examDuration: "90 minutos",
        passingScore: "70%",
        badge: "iot-fundamentals-badge.png",
      },
    },

    // ==========================================
    // 2. TRILHA: ROS 2 & ROBÓTICA
    // ==========================================
    {
      id: "track-ros",
      name: "ROS 2 & Robótica Autônoma",
      icon: "fa-robot",
      color: "#1a4b6d",
      level: "Associate → Professional",
      totalHours: 160,
      description: "Domine o Robot Operating System 2. De nodes e topics até SLAM, navegação autônoma e manipulação com MoveIt 2.",
      prerequisites: ["Linux básico (terminal, arquivos)", "Python intermediário"],
      careers: ["Engenheiro de Robótica", "Desenvolvedor ROS", "Pesquisador em Robótica"],
      modules: [
        {
          id: "ros-mod-01",
          name: "Fundamentos do ROS 2",
          hours: 20,
          lessons: [
            { id: "ros-01-01", title: "O que é ROS 2? História, Arquitetura e Filosofia", duration: "45min", type: "video", hasQuiz: true },
            { id: "ros-01-02", title: "Instalação do ROS 2 Humble no Ubuntu 24.04", duration: "40min", type: "hands-on", hasQuiz: false },
            { id: "ros-01-03", title: "Workspace, Packages e Colcon Build", duration: "50min", type: "hands-on", hasQuiz: true },
            { id: "ros-01-04", title: "Nodes: As Unidades Fundamentais do ROS 2", duration: "60min", type: "video", hasQuiz: true },
            { id: "ros-01-05", title: "Topics: Comunicação Publicador/Assinante", duration: "70min", type: "hands-on", hasQuiz: true },
            { id: "ros-01-06", title: "Services: Comunicação Cliente/Servidor", duration: "50min", type: "hands-on", hasQuiz: true },
            { id: "ros-01-07", title: "Actions: Para Tarefas de Longa Duração", duration: "40min", type: "video", hasQuiz: true },
            { id: "ros-01-08", title: "Launch Files: Orquestrando Múltiplos Nodes", duration: "50min", type: "hands-on", hasQuiz: false },
            { id: "ros-01-09", title: "Projeto: Robô Simples que Publica Dados de Sensores", duration: "120min", type: "project", hasQuiz: false },
          ],
        },
        {
          id: "ros-mod-02",
          name: "Simulação com Gazebo",
          hours: 15,
          lessons: [
            { id: "ros-02-01", title: "Gazebo Harmonic: O Simulador 3D do ROS 2", duration: "50min", type: "video", hasQuiz: true },
            { id: "ros-02-02", title: "URDF e XACRO: Modelando seu Robô", duration: "90min", type: "hands-on", hasQuiz: true },
            { id: "ros-02-03", title: "Plugins do Gazebo: Sensores, Motores e Física", duration: "60min", type: "hands-on", hasQuiz: false },
            { id: "ros-02-04", title: "Projeto: Robô Diferencial Funcional no Gazebo", duration: "150min", type: "project", hasQuiz: false },
          ],
        },
        {
          id: "ros-mod-03",
          name: "Navegação Autônoma (Nav2)",
          hours: 30,
          lessons: [
            { id: "ros-03-01", title: "TF2: O Sistema de Transformadas do ROS 2", duration: "60min", type: "video", hasQuiz: true },
            { id: "ros-03-02", title: "Odometria: Como o Robô Sabe Onde Está", duration: "50min", type: "hands-on", hasQuiz: true },
            { id: "ros-03-03", title: "SLAM com slam_toolbox: Mapeie Ambientes Desconhecidos", duration: "90min", type: "hands-on", hasQuiz: true },
            { id: "ros-03-04", title: "Navigation 2 Stack: Arquitetura Completa", duration: "70min", type: "video", hasQuiz: true },
            { id: "ros-03-05", title: "Planejamento Global e Local (NavFn + DWB)", duration: "60min", type: "video", hasQuiz: true },
            { id: "ros-03-06", title: "Costmaps e Sensores: Como o Robô Desvia de Obstáculos", duration: "50min", type: "hands-on", hasQuiz: false },
            { id: "ros-03-07", title: "Projeto: Robô que Mapeia e Navega Autonomamente", duration: "180min", type: "project", hasQuiz: false },
          ],
        },
        {
          id: "ros-mod-04",
          name: "Manipulação com MoveIt 2",
          hours: 20,
          lessons: [
            { id: "ros-04-01", title: "Cinemática de Braços Robóticos: DH, IK, FK", duration: "70min", type: "video", hasQuiz: true },
            { id: "ros-04-02", title: "MoveIt 2 Setup Assistant: Gere seu Pacote em Minutos", duration: "60min", type: "hands-on", hasQuiz: true },
            { id: "ros-04-03", title: "Planejamento de Trajetória: OMPL, STOMP, CHOMP", duration: "50min", type: "video", hasQuiz: true },
            { id: "ros-04-04", title: "Percepção 3D: PointClouds e Octomaps", duration: "60min", type: "hands-on", hasQuiz: true },
            { id: "ros-04-05", title: "Projeto: Pick-and-Place com Braço Robótico Real", duration: "180min", type: "project", hasQuiz: false },
          ],
        },
      ],
      certification: {
        name: "Nexus ROS Associate",
        examDuration: "120 minutos",
        passingScore: "75%",
        badge: "ros-associate-badge.png",
      },
    },

    // ==========================================
    // 3. TRILHA: IA & VISÃO COMPUTACIONAL
    // ==========================================
    {
      id: "track-ai",
      name: "Inteligência Artificial para Robótica",
      icon: "fa-brain",
      color: "#e65100",
      level: "Professional → Architect",
      totalHours: 120,
      description: "Leve IA de verdade para seus robôs. YOLOv8, detecção de objetos, segmentação, LLMs locais e aprendizado por reforço.",
      prerequisites: ["Python avançado", "ROS 2 básico", "Linux"],
      careers: ["Engenheiro de IA para Robótica", "Cientista de Dados em Robótica", "Pesquisador de ML"],
      modules: [
        {
          id: "ai-mod-01",
          name: "Deep Learning para Visão Computacional",
          hours: 30,
          lessons: [
            { id: "ai-01-01", title: "Redes Neurais Convolucionais (CNNs) Explicadas", duration: "90min", type: "video", hasQuiz: true },
            { id: "ai-01-02", title: "YOLOv8: Detecção de Objetos em Tempo Real", duration: "80min", type: "hands-on", hasQuiz: true },
            { id: "ai-01-03", title: "Treinando YOLOv8 com Seu Próprio Dataset", duration: "120min", type: "hands-on", hasQuiz: false },
            { id: "ai-01-04", title: "Otimização com TensorRT para Jetson", duration: "90min", type: "hands-on", hasQuiz: true },
            { id: "ai-01-05", title: "Segmentação de Imagens (YOLOv8-seg, SAM)", duration: "60min", type: "video", hasQuiz: true },
            { id: "ai-01-06", title: "Projeto: Robô que Identifica e Classifica Peças numa Esteira", duration: "180min", type: "project", hasQuiz: false },
          ],
        },
        {
          id: "ai-mod-02",
          name: "LLMs & Voz para Robôs",
          hours: 25,
          lessons: [
            { id: "ai-02-01", title: "Ollama: Rodando LLMs Localmente", duration: "50min", type: "hands-on", hasQuiz: true },
            { id: "ai-02-02", title: "Speech-to-Text com Faster Whisper", duration: "45min", type: "hands-on", hasQuiz: false },
            { id: "ai-02-03", title: "Text-to-Speech com Piper TTS", duration: "30min", type: "hands-on", hasQuiz: false },
            { id: "ai-02-04", title: "Criando um Assistente de Voz para seu Robô", duration: "90min", type: "hands-on", hasQuiz: true },
            { id: "ai-02-05", title: "Projeto: Robô que Entende Comandos de Voz Naturais", duration: "150min", type: "project", hasQuiz: false },
          ],
        },
      ],
      certification: {
        name: "Nexus AI Robotics Professional",
        examDuration: "180 minutos",
        passingScore: "75%",
        badge: "ai-professional-badge.png",
      },
    },

    // ==========================================
    // 4. TRILHA: FABRICAÇÃO DIGITAL
    // ==========================================
    {
      id: "track-fab",
      name: "Fabricação Digital & Prototipagem",
      icon: "fa-print",
      color: "#B8860B",
      level: "Associate",
      totalHours: 60,
      description: "Impressão 3D, corte a laser, CNC e design CAD/3D. Do modelo no Fusion 360 à peça física funcionando.",
      prerequisites: ["Nenhum"],
      careers: ["Designer de Produto", "Prototipista", "Especialista em Manufatura Aditiva"],
      modules: [
        {
          id: "fab-mod-01",
          name: "Design 3D para Robótica",
          hours: 20,
          lessons: [
            { id: "fab-01-01", title: "Fusion 360: Do Zero ao Primeiro Modelo 3D", duration: "90min", type: "hands-on", hasQuiz: false },
            { id: "fab-01-02", title: "Modelagem Paramétrica: Crie Peças que se Adaptam", duration: "60min", type: "hands-on", hasQuiz: true },
            { id: "fab-01-03", title: "Design para Impressão 3D: Tolerâncias, Suportes, Orientação", duration: "50min", type: "video", hasQuiz: true },
            { id: "fab-01-04", title: "Projeto: Modele um Chassi de Robô Completo", duration: "120min", type: "project", hasQuiz: false },
          ],
        },
        {
          id: "fab-mod-02",
          name: "Impressão 3D & Corte a Laser",
          hours: 15,
          lessons: [
            { id: "fab-02-01", title: "Fatiamento com Cura/PrusaSlicer: Configurações Perfeitas", duration: "60min", type: "hands-on", hasQuiz: true },
            { id: "fab-02-02", title: "Materiais: PLA, PETG, TPU — Quando Usar Cada Um", duration: "40min", type: "video", hasQuiz: true },
            { id: "fab-02-03", title: "Corte a Laser: Madeira, Acrílico e Gravação", duration: "50min", type: "hands-on", hasQuiz: false },
          ],
        },
      ],
      certification: {
        name: "Nexus Digital Fabrication Associate",
        examDuration: "60 minutos",
        passingScore: "70%",
        badge: "fab-associate-badge.png",
      },
    },

    // ==========================================
    // 5. TRILHA: FROTAS & INFRAESTRUTURA
    // ==========================================
    {
      id: "track-fleets",
      name: "Frotas Robóticas & Infraestrutura",
      icon: "fa-server",
      color: "#c62828",
      level: "Architect",
      totalHours: 60,
      description: "Escale de 1 para 100 robôs. Kubernetes (K3s), Docker, CI/CD, monitoramento e orquestração de frotas.",
      prerequisites: ["ROS 2 Professional", "Linux avançado", "Redes"],
      careers: ["Arquiteto de Frotas Robóticas", "DevOps para Robótica", "Engenheiro de Infraestrutura"],
      modules: [
        {
          id: "fleet-mod-01",
          name: "Containerização com Docker",
          hours: 15,
          lessons: [
            { id: "fleet-01-01", title: "Docker para Roboticistas: Conceitos e Dockerfile", duration: "60min", type: "video", hasQuiz: true },
            { id: "fleet-01-02", title: "Docker Compose: Orquestre Múltiplos Containers ROS 2", duration: "50min", type: "hands-on", hasQuiz: true },
            { id: "fleet-01-03", title: "Imagens Multi-Arch (amd64 + arm64) para Robôs", duration: "40min", type: "hands-on", hasQuiz: false },
          ],
        },
        {
          id: "fleet-mod-02",
          name: "Kubernetes para Robótica (K3s)",
          hours: 25,
          lessons: [
            { id: "fleet-02-01", title: "K3s: Kubernetes Leve para Edge Computing", duration: "60min", type: "video", hasQuiz: true },
            { id: "fleet-02-02", title: "Deploy de ROS 2 em Cluster K3s", duration: "90min", type: "hands-on", hasQuiz: true },
            { id: "fleet-02-03", title: "Service Discovery: Como Robôs se Encontram no Cluster", duration: "50min", type: "video", hasQuiz: true },
            { id: "fleet-02-04", title: "Monitoramento com Prometheus + Grafana", duration: "70min", type: "hands-on", hasQuiz: false },
            { id: "fleet-02-05", title: "Projeto: Frota de 5 Robôs Gerenciada por K3s", duration: "240min", type: "project", hasQuiz: false },
          ],
        },
      ],
      certification: {
        name: "Nexus Robotics Architect",
        examDuration: "240 minutos",
        passingScore: "80%",
        badge: "architect-badge.png",
      },
    },
  ],

  // ==========================================
  // CURSOS EXTRACURRICULARES (WORKSHOPS)
  // ==========================================
  workshops: [
    {
      id: "ws-001",
      title: "Fim de Semana do Robô — Construa um Carrinho Autônomo em 2 Dias",
      duration: "16 horas (sábado + domingo)",
      level: "intermediario",
      price: "$199",
      includes: ["Kit completo de peças", "Almoço incluso", "Certificado digital"],
      nextDate: "Consultar calendário",
    },
    {
      id: "ws-002",
      title: "Workshop de Solda — Do Zero ao Primeiro Circuito",
      duration: "4 horas",
      level: "iniciante",
      price: "$49",
      includes: ["Kit de solda básico", "Placa de prática", "Componentes"],
    },
    {
      id: "ws-003",
      title: "Hackathon Nexus — 48h para Criar o Robô do Futuro",
      duration: "48 horas (sexta a domingo)",
      level: "avancado",
      price: "Gratuito (inscrição)",
      includes: ["Acesso a equipamentos do laboratório", "Mentoria de especialistas", "Premiação de $2,000"],
    },
  ],

  // ==========================================
  // MÉTODOS UTILITÁRIOS
  // ==========================================
  /**
   * Busca trilha por ID
   */
  getTrackById(trackId) {
    return this.tracks.find(t => t.id === trackId) || null;
  },

  /**
   * Retorna todas as aulas de uma trilha
   */
  getAllLessonsFromTrack(trackId) {
    const track = this.getTrackById(trackId);
    if (!track) return [];
    return track.modules.flatMap(m => m.lessons);
  },

  /**
   * Busca aula por ID
   */
  findLessonById(lessonId) {
    for (const track of this.tracks) {
      for (const mod of track.modules) {
        const lesson = mod.lessons.find(l => l.id === lessonId);
        if (lesson) return { track, module: mod, lesson };
      }
    }
    return null;
  },

  /**
   * Progresso estimado por trilha
   */
  getTrackProgress(trackId, completedLessons = []) {
    const track = this.getTrackById(trackId);
    if (!track) return 0;
    const total = this.getAllLessonsFromTrack(trackId).length;
    const completed = completedLessons.filter(id =>
      this.getAllLessonsFromTrack(trackId).some(l => l.id === id)
    ).length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  },

  /**
   * Total de horas da academia
   */
  getTotalHours() {
    return this.tracks.reduce((sum, track) => sum + track.totalHours, 0);
  },

  /**
   * Total de aulas
   */
  getTotalLessons() {
    return this.tracks.reduce((sum, track) => {
      return sum + track.modules.reduce((s, m) => s + m.lessons.length, 0);
    }, 0);
  },
};

// Exportação
export default NEXUS_COURSES_CURRICULUM;

if (typeof window !== 'undefined') {
  window.NEXUS_COURSES_CURRICULUM = NEXUS_COURSES_CURRICULUM;
}

/* ============================================================
   FIM DO ARQUIVO: js/data/courses-curriculum.js
   PRÓXIMO: js/data/glossary.js
   ============================================================ */
