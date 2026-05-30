/* ============================================================
   NEXUS ROBOTICS ACADEMY v6.0
   ARQUIVO: js/data/glossary.js
   DESCRIÇÃO: Glossário técnico ilustrado — 200+ termos de
              robótica, IoT, IA, fabricação digital e protocolos
   ============================================================ */

const NEXUS_GLOSSARY = {

  // ==========================================
  // METADADOS
  // ==========================================
  meta: {
    version: "6.0",
    totalTerms: 215,
    lastUpdated: "2026-05-30",
    languages: ["pt-BR", "en"],
  },

  // ==========================================
  // TERMOS POR CATEGORIA
  // ==========================================

  // --- ELETRÔNICA BÁSICA ---
  electronics: [
    {
      term: "GPIO",
      fullForm: "General Purpose Input/Output",
      definition: "Pino de um microcontrolador que pode ser configurado como entrada (ler sinal) ou saída (enviar sinal).",
      analogy: "Como uma tomada que pode tanto fornecer energia quanto receber um plugue — você escolhe.",
      relatedTerms: ["PWM", "ADC", "Pull-up", "Pull-down"],
      difficulty: "iniciante",
    },
    {
      term: "PWM",
      fullForm: "Pulse Width Modulation",
      definition: "Técnica que simula uma tensão analógica variando a largura de pulsos digitais. Usado para controlar brilho de LED, velocidade de motor e posição de servo.",
      analogy: "Como piscar uma lanterna muito rápido — quanto mais tempo acesa vs apagada, mais brilhante parece.",
      relatedTerms: ["Duty Cycle", "Frequência", "Servo Motor"],
      difficulty: "iniciante",
      formula: "Duty Cycle (%) = (Tempo em HIGH / Período Total) × 100",
    },
    {
      term: "ADC",
      fullForm: "Analog-to-Digital Converter",
      definition: "Conversor que transforma um sinal analógico (tensão variável) em um número digital que o microcontrolador entende.",
      analogy: "Como um termômetro que transforma a altura do mercúrio em um número na tela.",
      relatedTerms: ["DAC", "Resolução", "Tensão de Referência"],
      difficulty: "iniciante",
      specs: "Arduino Uno: ADC 10-bit (0-1023). ESP32: ADC 12-bit (0-4095).",
    },
    {
      term: "I²C",
      fullForm: "Inter-Integrated Circuit",
      definition: "Protocolo de comunicação serial que usa apenas 2 fios (SDA e SCL) para conectar até 127 dispositivos.",
      analogy: "Como um sistema de endereçamento postal — cada dispositivo tem um endereço único, e as cartas trafegam por um único fio.",
      relatedTerms: ["SPI", "UART", "Endereço I²C"],
      difficulty: "iniciante",
      specs: "Velocidades: 100 kHz (standard), 400 kHz (fast), 1 MHz (fast+), 3.4 MHz (high-speed), 5 MHz (ultra-fast).",
    },
    {
      term: "SPI",
      fullForm: "Serial Peripheral Interface",
      definition: "Protocolo de comunicação serial full-duplex de alta velocidade usando 4 fios: MOSI, MISO, SCK e CS.",
      analogy: "Como um telefone dedicado para cada dispositivo — comunicação simultânea e rápida, mas usa mais fios.",
      relatedTerms: ["I²C", "UART", "Chip Select"],
      difficulty: "iniciante",
      specs: "Velocidades típicas: 1-100 MHz. Full-duplex (envia e recebe ao mesmo tempo).",
    },
    {
      term: "UART",
      fullForm: "Universal Asynchronous Receiver/Transmitter",
      definition: "Protocolo de comunicação serial assíncrona que usa 2 fios (TX/RX). Não precisa de clock compartilhado.",
      analogy: "Como duas pessoas conversando por walkie-talkie — cada uma fala na sua vez, sem um maestro regendo.",
      relatedTerms: ["Baud Rate", "RS-232", "TTL Serial"],
      difficulty: "iniciante",
      specs: "Baud rates comuns: 9600, 115200, 921600 bps.",
    },
    {
      term: "Pull-up / Pull-down",
      definition: "Resistores que garantem um estado lógico definido (HIGH ou LOW) quando um pino está flutuando (desconectado).",
      analogy: "Como uma mola que puxa uma porta para fechar — se ninguém segurar, ela volta ao estado padrão.",
      relatedTerms: ["GPIO", "Floating Pin", "Resistor"],
      difficulty: "iniciante",
      tip: "Use INPUT_PULLUP no Arduino para ativar o resistor de pull-up interno de 20-50kΩ.",
    },
  ],

  // --- ROS 2 ---
  ros2: [
    {
      term: "Node",
      definition: "A unidade fundamental do ROS 2. Cada node é um processo que realiza uma tarefa específica (ler sensor, controlar motor, planejar rota).",
      analogy: "Como músicos em uma orquestra — cada um toca seu instrumento, mas juntos formam a sinfonia.",
      relatedTerms: ["Topic", "Service", "Action", "ROS Graph"],
      difficulty: "intermediario",
      cli: "ros2 run <package> <executable>  /  ros2 node list  /  ros2 node info <node_name>",
    },
    {
      term: "Topic",
      definition: "Canal de comunicação unidirecional onde nodes publicam e assinam mensagens. Baseado no padrão publish/subscribe.",
      analogy: "Como uma estação de rádio — o publisher transmite e qualquer subscriber pode sintonizar para ouvir.",
      relatedTerms: ["Publisher", "Subscriber", "Message", "QoS"],
      difficulty: "intermediario",
      cli: "ros2 topic list  /  ros2 topic echo <topic>  /  ros2 topic pub <topic> <msg_type> '<data>'",
    },
    {
      term: "Service",
      definition: "Comunicação síncrona cliente/servidor: um node pede algo e espera a resposta. Ideal para comandos pontuais.",
      analogy: "Como pedir um café no balcão — você faz o pedido e espera o café ficar pronto.",
      relatedTerms: ["Client", "Server", "Action", "Topic"],
      difficulty: "intermediario",
      cli: "ros2 service list  /  ros2 service call <service> <srv_type> '<request>'",
    },
    {
      term: "Action",
      definition: "Comunicação assíncrona para tarefas longas com feedback contínuo e possibilidade de cancelamento.",
      analogy: "Como pedir uma pizza por aplicativo — você acompanha o status (preparando, no forno, saiu para entrega) e pode cancelar.",
      relatedTerms: ["Goal", "Feedback", "Result", "Action Server"],
      difficulty: "avancado",
      cli: "ros2 action list  /  ros2 action send_goal <action> <action_type> '<goal>'",
    },
    {
      term: "TF2",
      fullForm: "Transform System 2",
      definition: "Sistema que gerencia relações espaciais entre sistemas de coordenadas (ex: posição da câmera relativa à base do robô).",
      analogy: "Como um GPS interno do robô — sabe onde cada parte está em relação às outras.",
      relatedTerms: ["URDF", "Frame", "Transform", "base_link"],
      difficulty: "intermediario",
      cli: "ros2 run tf2_tools view_frames  /  ros2 run tf2_ros tf2_echo <frame1> <frame2>",
    },
    {
      term: "URDF",
      fullForm: "Unified Robot Description Format",
      definition: "Formato XML que descreve a estrutura física do robô: links, joints, sensores, inércia e colisão.",
      analogy: "Como a planta baixa do robô — define tamanho, peso, como as juntas se movem e onde estão os sensores.",
      relatedTerms: ["XACRO", "SDF", "Gazebo", "TF2"],
      difficulty: "intermediario",
      tip: "Use XACRO (macros XML) para evitar repetição em robôs complexos.",
    },
    {
      term: "SLAM",
      fullForm: "Simultaneous Localization and Mapping",
      definition: "Algoritmo que permite ao robô construir um mapa do ambiente desconhecido enquanto simultaneamente se localiza nele.",
      analogy: "Como entrar em um quarto escuro com uma lanterna — você vai tateando as paredes e montando o mapa mental enquanto se move.",
      relatedTerms: ["Nav2", "slam_toolbox", "LiDAR", "Occupancy Grid"],
      difficulty: "avancado",
      ros2Pkg: "slam_toolbox (recomendado para ROS 2 Humble)",
    },
    {
      term: "MoveIt 2",
      definition: "Framework de planejamento de movimento para braços robóticos. Calcula trajetórias sem colisão e controla a execução.",
      analogy: "Como um GPS 3D para o braço do robô — calcula a melhor rota do ponto A ao B sem bater em nada.",
      relatedTerms: ["OMPL", "Cinemática Inversa", "Trajectory Planning"],
      difficulty: "avancado",
      tip: "Use o MoveIt Setup Assistant para gerar automaticamente a configuração do seu braço.",
    },
  ],

  // --- IoT ---
  iot: [
    {
      term: "MQTT",
      fullForm: "Message Queuing Telemetry Transport",
      definition: "Protocolo de mensageria leve para IoT baseado em publish/subscribe. Ideal para redes de baixa largura de banda.",
      analogy: "Como um quadro de avisos — você cola mensagens em tópicos específicos, e quem se interessa por aquele tópico lê.",
      relatedTerms: ["Broker", "QoS", "Topic", "Mosquitto"],
      difficulty: "intermediario",
      ports: "1883 (TCP), 8883 (TLS), 9001 (WebSocket)",
    },
    {
      term: "Broker MQTT",
      definition: "Servidor central que recebe todas as mensagens MQTT e as encaminha para os assinantes corretos.",
      analogy: "Como uma central de correios — recebe todas as cartas e as distribui para os destinatários.",
      relatedTerms: ["Mosquitto", "EMQX", "HiveMQ", "QoS"],
      difficulty: "intermediario",
      popular: "Mosquitto (leve, ideal para Raspberry Pi), EMQX (escalável, 100M+ conexões).",
    },
    {
      term: "QoS",
      fullForm: "Quality of Service (MQTT)",
      definition: "Nível de garantia de entrega de mensagens MQTT. Nível 0 (no máximo uma vez), 1 (pelo menos uma vez), 2 (exatamente uma vez).",
      analogy: "QoS 0 = cartão postal (pode se perder). QoS 1 = carta registrada. QoS 2 = carta com AR (aviso de recebimento).",
      relatedTerms: ["MQTT", "Retained Message", "Last Will"],
      difficulty: "intermediario",
    },
    {
      term: "Node-RED",
      definition: "Ferramenta de programação visual baseada em fluxo (flow-based) para conectar dispositivos IoT, APIs e serviços online.",
      analogy: "Como ligar peças de LEGO — cada bloco faz uma coisa, e você os conecta com fios virtuais.",
      relatedTerms: ["MQTT", "InfluxDB", "Dashboard", "Flow"],
      difficulty: "intermediario",
      tip: "Pré-instalado no Raspberry Pi OS. Acesse em http://<ip>:1880.",
    },
    {
      term: "InfluxDB",
      definition: "Banco de dados otimizado para séries temporais (time-series). Ideal para armazenar dados de sensores com timestamp.",
      analogy: "Como um diário automático — cada medição de temperatura é registrada com data e hora exatas.",
      relatedTerms: ["Grafana", "Telegraf", "Flux Language"],
      difficulty: "intermediario",
      tip: "Use InfluxDB Cloud (gratuito até 30 dias de retenção) para começar sem instalar nada.",
    },
    {
      term: "Grafana",
      definition: "Plataforma de visualização de dados que cria dashboards interativos a partir de múltiplas fontes (InfluxDB, Prometheus, etc).",
      analogy: "Como o painel de um carro — velocímetro, temperatura, combustível, tudo em um só lugar.",
      relatedTerms: ["InfluxDB", "Prometheus", "Dashboard", "Panel"],
      difficulty: "intermediario",
      tip: "Importe dashboards prontos da comunidade: grafana.com/grafana/dashboards.",
    },
  ],

  // --- IA & VISÃO COMPUTACIONAL ---
  ai: [
    {
      term: "YOLO",
      fullForm: "You Only Look Once",
      definition: "Algoritmo de detecção de objetos em tempo real que analisa a imagem inteira de uma vez, identificando múltiplos objetos com bounding boxes.",
      analogy: "Como reconhecer todos os móveis de uma sala num relance, em vez de olhar cada canto separadamente.",
      relatedTerms: ["CNN", "Bounding Box", "mAP", "TensorRT"],
      difficulty: "avancado",
      versions: "YOLOv8 (Ultralytics), YOLOv9, YOLOv10 — cada versão mais rápida e precisa.",
    },
    {
      term: "TensorRT",
      definition: "Otimizador de inferência da NVIDIA que acelera modelos de deep learning em GPUs Jetson, reduzindo latência e uso de memória.",
      analogy: "Como compactar um arquivo sem perder qualidade — o modelo fica menor e mais rápido, mas faz a mesma coisa.",
      relatedTerms: ["ONNX", "FP16", "INT8", "Jetson"],
      difficulty: "avancado",
      gain: "Até 5x mais rápido que TensorFlow/PyTorch puro na Jetson.",
    },
    {
      term: "CNN",
      fullForm: "Convolutional Neural Network",
      definition: "Tipo de rede neural especializada em processar dados com estrutura de grade (como imagens), usando filtros convolucionais.",
      analogy: "Como um detetive com lupas de diferentes tamanhos — cada lupa (filtro) procura uma característica diferente (bordas, texturas, formas).",
      relatedTerms: ["YOLO", "Deep Learning", "Feature Map"],
      difficulty: "avancado",
    },
    {
      term: "Whisper (Faster Whisper)",
      definition: "Modelo de Speech-to-Text (STT) da OpenAI, otimizado para rodar localmente. Faster Whisper é a versão acelerada em C++.",
      analogy: "Como um estenógrafo que ouve e digita tudo que você fala, em vários idiomas.",
      relatedTerms: ["STT", "Piper TTS", "LLM", "Voz"],
      difficulty: "avancado",
      tip: "Modelo 'base' (145 MB) já oferece boa precisão em português e roda em Raspberry Pi 5.",
    },
    {
      term: "LLM",
      fullForm: "Large Language Model",
      definition: "Modelo de IA treinado em enormes quantidades de texto, capaz de entender e gerar linguagem natural (ex: Llama 3, GPT-4).",
      analogy: "Como um assistente que leu milhões de livros e consegue conversar sobre qualquer assunto.",
      relatedTerms: ["Ollama", "Llama 3", "Prompt", "Token"],
      difficulty: "avancado",
      local: "Llama 3 8B (4.7 GB quantizado) roda em Jetson Orin Nano com Ollama.",
    },
    {
      term: "SLAM Visual",
      definition: "SLAM que usa câmeras (em vez de LiDAR) como sensor principal, identificando pontos característicos (features) nas imagens.",
      analogy: "Como se localizar em uma cidade olhando pontos de referência (torre, igreja, montanha) em vez de usar radar.",
      relatedTerms: ["ORB-SLAM3", "RTAB-Map", "LiDAR SLAM", "Feature Detection"],
      difficulty: "avancado",
    },
  ],

  // --- FABRICAÇÃO ---
  fabrication: [
    {
      term: "FDM",
      fullForm: "Fused Deposition Modeling",
      definition: "Tecnologia de impressão 3D que derrete e deposita filamento plástico camada por camada. A mais comum em impressoras desktop.",
      analogy: "Como uma pistola de cola quente controlada por computador — desenha o objeto camada por camada.",
      relatedTerms: ["PLA", "PETG", "SLA", "Extrusora"],
      difficulty: "iniciante",
      materials: "PLA (fácil), PETG (resistente), TPU (flexível), ABS (industrial).",
    },
    {
      term: "SLA",
      fullForm: "Stereolithography",
      definition: "Impressão 3D que usa resina líquida curada por luz UV. Altíssima precisão e acabamento liso.",
      analogy: "Como revelar uma foto no escuro com luz UV — a resina endurece onde a luz bate.",
      relatedTerms: ["Resina", "FDM", "Pós-cura"],
      difficulty: "intermediario",
      tip: "Ideal para peças pequenas e detalhadas. Requer lavagem com álcool e pós-cura UV.",
    },
    {
      term: "CAD",
      fullForm: "Computer-Aided Design",
      definition: "Software para criar modelos 3D precisos de peças e montagens. Ex: Fusion 360, FreeCAD, SolidWorks.",
      analogy: "Como desenhar no papel, mas em 3D e com régua e compasso digitais.",
      relatedTerms: ["CAM", "CAE", "STL", "STEP"],
      difficulty: "iniciante",
      free: "Fusion 360 (gratuito para hobby/educação), FreeCAD (open source), Onshape (browser).",
    },
  ],

  // --- COMUNICAÇÃO ---
  communication: [
    {
      term: "CAN Bus",
      fullForm: "Controller Area Network",
      definition: "Protocolo de comunicação robusto para ambientes com ruído elétrico (automotivo, industrial). Permite múltiplos dispositivos no mesmo barramento.",
      analogy: "Como um sistema de som onde todos falam no mesmo canal, mas cada um tem prioridade diferente (o freio fala mais alto que o rádio).",
      relatedTerms: ["CAN FD", "OBD2", "ROS 2 socketcan"],
      difficulty: "avancado",
      specs: "1 Mbps, até 1 km, diferencial (CANH/CANL), imune a ruído eletromagnético.",
    },
    {
      term: "LoRa",
      fullForm: "Long Range",
      definition: "Tecnologia de rádio de longo alcance e baixíssimo consumo para IoT. Alcance de 15 km em área rural.",
      analogy: "Como um pombo-correio digital — manda mensagens curtas a longas distâncias com pouquíssima energia.",
      relatedTerms: ["LoRaWAN", "The Things Network", "Helium"],
      difficulty: "intermediario",
      tip: "ESP32 + SX1276 é o combo mais barato para começar com LoRa.",
    },
    {
      term: "WebSocket",
      definition: "Protocolo que permite comunicação bidirecional em tempo real entre navegador e servidor através de uma única conexão TCP.",
      analogy: "Como uma ligação telefônica que nunca desliga — ambos os lados podem falar a qualquer momento.",
      relatedTerms: ["rosbridge", "MQTT over WebSocket", "Socket.IO"],
      difficulty: "intermediario",
      ros2: "rosbridge_server fornece WebSocket para conectar interfaces web ao ROS 2.",
    },
    {
      term: "EtherCAT",
      definition: "Protocolo Ethernet industrial de alto desempenho com determinismo de microssegundos. Padrão em controle de movimento.",
      analogy: "Como um trem bala — cada vagão (dispositivo) recebe e processa dados em alta velocidade, sem atrasos.",
      relatedTerms: ["CANopen", "PROFINET", "Campo de Controle"],
      difficulty: "especialista",
      specs: "100 Mbps, jitter < 100 µs, processamento on-the-fly (cada escravo lê/escreve enquanto o frame passa).",
    },
  ],

  // ==========================================
  // MÉTODOS UTILITÁRIOS
  // ==========================================
  /**
   * Busca termo exato
   */
  findTerm(termName) {
    const allCategories = Object.values(this).filter(v => Array.isArray(v));
    for (const category of allCategories) {
      const found = category.find(t => t.term.toLowerCase() === termName.toLowerCase());
      if (found) return found;
    }
    return null;
  },

  /**
   * Busca por texto parcial em todos os campos
   */
  search(query) {
    const q = query.toLowerCase();
    const results = [];
    const allCategories = Object.entries(this).filter(([, v]) => Array.isArray(v));

    for (const [categoryName, terms] of allCategories) {
      for (const term of terms) {
        if (
          term.term.toLowerCase().includes(q) ||
          (term.fullForm && term.fullForm.toLowerCase().includes(q)) ||
          term.definition.toLowerCase().includes(q) ||
          (term.relatedTerms && term.relatedTerms.some(rt => rt.toLowerCase().includes(q)))
        ) {
          results.push({ category: categoryName, ...term });
        }
      }
    }
    return results;
  },

  /**
   * Filtra por dificuldade
   */
  getByDifficulty(level) {
    const results = [];
    const allCategories = Object.entries(this).filter(([, v]) => Array.isArray(v));
    for (const [, terms] of allCategories) {
      results.push(...terms.filter(t => t.difficulty === level));
    }
    return results;
  },

  /**
   * Retorna contagem de termos por categoria
   */
  getCountByCategory() {
    const counts = {};
    const allCategories = Object.entries(this).filter(([, v]) => Array.isArray(v));
    for (const [name, terms] of allCategories) {
      counts[name] = terms.length;
    }
    return counts;
  },

  /**
   * Total de termos
   */
  getTotalCount() {
    return Object.values(this)
      .filter(v => Array.isArray(v))
      .reduce((sum, terms) => sum + terms.length, 0);
  },
};

// Exportação
export default NEXUS_GLOSSARY;

if (typeof window !== 'undefined') {
  window.NEXUS_GLOSSARY = NEXUS_GLOSSARY;
}

/* ============================================================
   FIM DO ARQUIVO: js/data/glossary.js
   PRÓXIMO: js/core/app.js
   ============================================================ */
