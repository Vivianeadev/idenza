/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — GLOSSÁRIO TÉCNICO
 * ============================================================
 * 
 * Dicionário de termos técnicos usados na plataforma:
 * - Termo, definição, categoria
 * - Explicação leiga (layman)
 * - Ver também (links relacionados)
 * - Tags para busca
 * 
 * @database Glossary
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IDENZA_GLOSSARY = [
    // ============================================================
    // ROBÓTICA
    // ============================================================
    {
        term: 'ROS (Robot Operating System)',
        category: 'Robótica',
        definition: 'Middleware open source para robótica que fornece serviços como abstração de hardware, controle de dispositivos de baixo nível, implementação de funcionalidades comuns, passagem de mensagens entre processos e gerenciamento de pacotes.',
        layman: 'É como o Windows ou Linux, mas feito especialmente para robôs. Ele ajuda todos os "órgãos" do robô (câmera, motores, sensores) a conversarem entre si.',
        related: ['ROS 2', 'Node', 'Topic', 'Gazebo', 'MoveIt'],
        tags: ['ros', 'middleware', 'open source'],
    },
    {
        term: 'Node',
        category: 'Robótica',
        definition: 'Um processo executável no ROS que realiza alguma computação. Cada nó é responsável por uma tarefa específica, como controlar motores, processar imagens ou planejar trajetórias.',
        layman: 'Imagine que cada "funcionário" do robô é um Node. Um cuida da visão, outro dos motores, outro da segurança. Cada um faz seu trabalho e se comunica com os outros.',
        related: ['ROS', 'Topic', 'Publisher', 'Subscriber'],
        tags: ['ros', 'node', 'arquitetura'],
    },
    {
        term: 'Topic',
        category: 'Robótica',
        definition: 'Canal de comunicação unidirecional no ROS onde nós publicam e assinam mensagens. É o mecanismo primário de troca de dados entre nós.',
        layman: 'É como um grupo de WhatsApp. Um nó "posta" uma mensagem no tópico, e todos os outros nós que "assinam" aquele tópico recebem a mensagem.',
        related: ['ROS', 'Node', 'Publisher', 'Subscriber', 'Message'],
        tags: ['ros', 'comunicação', 'topic'],
    },
    {
        term: 'SLAM (Simultaneous Localization and Mapping)',
        category: 'Robótica',
        definition: 'Problema computacional de construir ou atualizar um mapa de um ambiente desconhecido enquanto simultaneamente rastreia a localização do robô dentro dele.',
        layman: 'O robô entra em um lugar que nunca viu antes, desenha o mapa na memória enquanto explora, e ao mesmo tempo sabe exatamente onde está nesse mapa.',
        related: ['Lidar', 'Odometria', 'Cartographer', 'RTAB-Map'],
        tags: ['slam', 'navegação', 'mapeamento'],
    },
    {
        term: 'MoveIt',
        category: 'Robótica',
        definition: 'Framework de planejamento de movimento para ROS que permite planejar, executar e monitorar trajetórias de braços robóticos, evitando colisões e respeitando limites das juntas.',
        layman: 'É o "cérebro do movimento" do braço robótico. Você diz "pegue aquela peça" e ele calcula o caminho mais seguro e eficiente para a mão do robô chegar lá sem bater em nada.',
        related: ['ROS', 'Cinemática', 'Planejamento de Trajetória', 'RRT'],
        tags: ['moveit', 'manipulação', 'planejamento'],
    },
    {
        term: 'Protective Stop',
        category: 'Robótica',
        definition: 'Parada de emergência controlada em robôs colaborativos, ativada automaticamente quando o sistema de segurança detecta uma condição anormal, como velocidade excessiva, perda de comunicação ou violação de zona de segurança.',
        layman: 'É o freio de emergência inteligente do robô. Se algo estranho acontece (esteira muito rápida, câmera parou de funcionar), o robô para sozinho antes que algo pior aconteça.',
        related: ['Safety Monitor', 'ISO 13849', 'Cobot'],
        tags: ['segurança', 'parada', 'cobot'],
    },

    // ============================================================
    // IOT
    // ============================================================
    {
        term: 'MQTT (Message Queuing Telemetry Transport)',
        category: 'IoT',
        definition: 'Protocolo de mensagens leve e eficiente para dispositivos IoT, baseado no modelo publish/subscribe. Ideal para redes com baixa largura de banda, alta latência ou recursos limitados.',
        layman: 'É o "correio" dos sensores. Cada sensor publica seus dados num endereço (tópico), e quem quiser receber assina aquele endereço. Rápido, leve e não gasta muita bateria.',
        related: ['Broker', 'QoS', 'ESP32', 'Topic'],
        tags: ['mqtt', 'protocolo', 'iot', 'mensageria'],
    },
    {
        term: 'ESP32',
        category: 'IoT',
        definition: 'Microcontrolador de baixo custo e baixo consumo da Espressif Systems, com WiFi e Bluetooth integrados. Amplamente usado em projetos IoT, automação e robótica educacional.',
        layman: 'É um mini-computador que custa menos de R$50 e já vem com WiFi. Perfeito para colocar inteligência em qualquer objeto: uma lâmpada, um sensor de temperatura, uma fechadura.',
        related: ['Arduino', 'Microcontrolador', 'WiFi', 'Bluetooth'],
        tags: ['esp32', 'microcontrolador', 'wifi', 'iot'],
    },
    {
        term: 'LoRa (Long Range)',
        category: 'IoT',
        definition: 'Tecnologia de modulação de rádio de longo alcance e baixo consumo de energia, capaz de transmitir pequenas quantidades de dados por vários quilômetros.',
        layman: 'É o "rádio de longo alcance" dos sensores. Com uma antena pequena, você manda dados por 10 km gastando quase nada de bateria. Perfeito para sensor no meio da plantação.',
        related: ['LoRaWAN', 'The Things Network', 'Helium'],
        tags: ['lora', 'longo alcance', 'radio', 'baixo consumo'],
    },
    {
        term: 'Broker MQTT',
        category: 'IoT',
        definition: 'Servidor central que recebe todas as mensagens dos clientes MQTT, filtra-as e as distribui para os clientes assinantes de cada tópico.',
        layman: 'É a "central de distribuição" dos Correios. Todos os sensores mandam seus dados para lá, e o broker entrega cada mensagem para quem se inscreveu para receber.',
        related: ['MQTT', 'Mosquitto', 'EMQX', 'HiveMQ'],
        tags: ['mqtt', 'broker', 'servidor'],
    },

    // ============================================================
    // INTELIGÊNCIA ARTIFICIAL
    // ============================================================
    {
        term: 'YOLO (You Only Look Once)',
        category: 'Inteligência Artificial',
        definition: 'Algoritmo de detecção de objetos em tempo real que processa a imagem inteira em uma única passada pela rede neural, identificando múltiplos objetos simultaneamente com bounding boxes e classes.',
        layman: 'É o "olho turbo" do robô. Em uma fração de segundo, ele olha a imagem e já diz: "tem uma peça azul aqui, uma vermelha ali, e uma pessoa do lado". Rápido como piscar.',
        related: ['OpenCV', 'Deep Learning', 'Jetson', 'Visão Computacional'],
        tags: ['yolo', 'detecção', 'deep learning', 'visão'],
    },
    {
        term: 'Jetson (NVIDIA)',
        category: 'Inteligência Artificial',
        definition: 'Plataforma de computação embarcada da NVIDIA para IA na borda, equipada com GPU integrada e otimizada para rodar redes neurais com baixo consumo de energia.',
        layman: 'É um "supercomputador de bolso" feito para robôs. Cabe na palma da mão e consegue rodar IA avançada (como reconhecer objetos) gastando pouca energia.',
        related: ['CUDA', 'TensorRT', 'YOLO', 'Deep Learning'],
        tags: ['jetson', 'nvidia', 'gpu', 'edge computing'],
    },
    {
        term: 'Edge Computing',
        category: 'Inteligência Artificial',
        definition: 'Paradigma de computação distribuída que processa dados próximo à fonte de geração (no "edge" da rede), reduzindo latência e tráfego para a nuvem.',
        layman: 'Em vez de mandar todos os dados do robô para a nuvem processar (o que demoraria segundos), o processamento acontece dentro do próprio robô, instantaneamente.',
        related: ['Jetson', 'TinyML', 'IoT', 'Latência'],
        tags: ['edge', 'computação', 'borda', 'latência'],
    },

    // ============================================================
    // HARDWARE
    // ============================================================
    {
        term: 'GPIO (General Purpose Input/Output)',
        category: 'Hardware',
        definition: 'Pinos programáveis em microcontroladores e SBCs que podem ser configurados como entrada (ler sensores) ou saída (controlar LEDs, motores).',
        layman: 'São as "perninhas" do computador onde você conecta coisas: um LED, um botão, um motor. Cada perninha pode ser configurada para "sentir" (entrada) ou "agir" (saída).',
        related: ['Raspberry Pi', 'Arduino', 'PWM', 'I²C'],
        tags: ['gpio', 'pinos', 'entrada', 'saída'],
    },
    {
        term: 'I²C (Inter-Integrated Circuit)',
        category: 'Hardware',
        definition: 'Protocolo de comunicação serial síncrono que permite conectar múltiplos dispositivos usando apenas 2 fios (SDA e SCL), com endereçamento de 7 bits.',
        layman: 'É um "fio mágico" de 2 vias onde você pendura vários sensores, cada um com seu endereço. O microcontrolador pergunta "sensor número 42, qual a temperatura?" e ele responde.',
        related: ['SPI', 'UART', 'SDA', 'SCL'],
        tags: ['i2c', 'protocolo', '2 fios', 'sensores'],
    },
    {
        term: 'PWM (Pulse Width Modulation)',
        category: 'Hardware',
        definition: 'Técnica de modulação que controla a potência entregue a um dispositivo variando a largura do pulso digital. Usado para controle de velocidade de motores, brilho de LEDs e posição de servos.',
        layman: 'É como um interruptor que liga e desliga milhares de vezes por segundo. Se fica mais tempo ligado, o LED brilha mais. Se fica mais tempo desligado, o motor gira mais devagar.',
        related: ['GPIO', 'Servo', 'Motor DC', 'Duty Cycle'],
        tags: ['pwm', 'modulação', 'controle', 'potência'],
    },
];

// ============================================================
// MÉTODOS DE CONSULTA
// ============================================================
const IdenzaGlossary = {
    getAll() {
        return IDENZA_GLOSSARY;
    },

    getByCategory(category) {
        return IDENZA_GLOSSARY.filter(item => item.category === category);
    },

    getByTag(tag) {
        return IDENZA_GLOSSARY.filter(item => item.tags.includes(tag.toLowerCase()));
    },

    search(query) {
        const q = query.toLowerCase();
        return IDENZA_GLOSSARY.filter(item =>
            item.term.toLowerCase().includes(q) ||
            item.definition.toLowerCase().includes(q) ||
            item.layman.toLowerCase().includes(q) ||
            item.tags.some(t => t.includes(q))
        );
    },

    getTerm(term) {
        return IDENZA_GLOSSARY.find(item =>
            item.term.toLowerCase() === term.toLowerCase()
        );
    },

    getCategories() {
        return [...new Set(IDENZA_GLOSSARY.map(item => item.category))];
    },
};

// ============================================================
// EXPORTAÇÃO
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { IDENZA_GLOSSARY, IdenzaGlossary };
}
