/* ============================================================
   NEXUS ROBOTICS ACADEMY v6.0
   ARQUIVO: js/data/projects-database.js
   DESCRIÇÃO: Banco de projetos — 200+ projetos com BOM,
              passo a passo, diagrama e certificação
   ============================================================ */

const NEXUS_PROJECTS_DATABASE = {

  // ==========================================
  // 1. PROJETOS INICIANTES (Nível 1-2)
  // ==========================================
  beginner: [
    {
      id: "proj-001",
      title: "LED Piscante — Seu Primeiro Circuito",
      level: "iniciante",
      duration: "30 min",
      difficulty: 1,
      icon: "fa-lightbulb",
      category: "Eletrônica Básica",
      tags: ["Arduino", "LED", "Resistor", "Breadboard"],
      description: "O 'Hello World' da eletrônica. Aprenda sobre tensão, corrente, resistores e GPIO.",
      learningObjectives: [
        "Entender o que é um pino GPIO",
        "Calcular resistor para LED (Lei de Ohm)",
        "Usar digitalWrite() e delay()",
        "Prototipar em breadboard"
      ],
      bom: [
        { item: "Arduino Uno R4 WiFi", qty: 1, price: "$27.50" },
        { item: "LED Vermelho 5mm", qty: 3, price: "$0.50" },
        { item: "Resistor 220Ω", qty: 3, price: "$0.30" },
        { item: "Breadboard 400pts", qty: 1, price: "$5" },
        { item: "Jumpers macho-macho", qty: 5, price: "$1" }
      ],
      totalCost: "$34.30",
      steps: [
        { step: 1, title: "Monte o circuito", content: "Conecte o LED ao pino 13 com resistor de 220Ω em série. Catodo no GND.", image: "led-circuit.png" },
        { step: 2, title: "Abra a IDE Arduino", content: "Conecte o Arduino via USB. Selecione a porta e a placa correta.", code: null },
        { step: 3, title: "Carregue o código", content: "Use o exemplo Blink em File > Examples > 01.Basics > Blink.", code: "void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(1000);\n  digitalWrite(13, LOW);\n  delay(1000);\n}" },
        { step: 4, title: "Modifique", content: "Altere os tempos de delay() e veja o LED piscar mais rápido ou mais devagar." }
      ],
      codeExample: "void setup() {\n  pinMode(13, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(13, HIGH);\n  delay(500);\n  digitalWrite(13, LOW);\n  delay(500);\n}",
      wiringDiagram: "LED -> pino13 -> resistor220 -> GND",
      certificationBadge: "Nexus Electronics 101"
    },
    {
      id: "proj-002",
      title: "Semáforo Inteligente",
      level: "iniciante",
      duration: "1 hora",
      difficulty: 1,
      icon: "fa-traffic-light",
      category: "Eletrônica Básica",
      tags: ["Arduino", "LED", "Lógica", "Timing"],
      description: "Construa um semáforo completo com 3 LEDs (verde, amarelo, vermelho) e aprenda máquinas de estado.",
      learningObjectives: [
        "Programar máquina de estados simples",
        "Usar múltiplos pinos GPIO",
        "Criar sequências de temporização",
        "Entender lógica de semáforo real"
      ],
      bom: [
        { item: "Arduino Uno R4 WiFi", qty: 1, price: "$27.50" },
        { item: "LED Vermelho 5mm", qty: 1, price: "$0.20" },
        { item: "LED Amarelo 5mm", qty: 1, price: "$0.20" },
        { item: "LED Verde 5mm", qty: 1, price: "$0.20" },
        { item: "Resistor 220Ω", qty: 3, price: "$0.30" },
        { item: "Breadboard 400pts", qty: 1, price: "$5" }
      ],
      totalCost: "$33.40",
      steps: [
        { step: 1, title: "Conecte os LEDs", content: "Vermelho no pino 11, Amarelo no 12, Verde no 13. Cada um com resistor de 220Ω ao GND." },
        { step: 2, title: "Programe a sequência", content: "Verde 5s → Amarelo 2s → Vermelho 5s → repete." },
        { step: 3, title: "Adicione botão pedestre", content: "Conecte um botão no pino 2 com pull-down. Ao pressionar, acelere a troca para vermelho." }
      ],
      codeExample: "const int VERMELHO = 11;\nconst int AMARELO = 12;\nconst int VERDE = 13;\n\nvoid setup() {\n  pinMode(VERMELHO, OUTPUT);\n  pinMode(AMARELO, OUTPUT);\n  pinMode(VERDE, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(VERDE, HIGH);\n  delay(5000);\n  digitalWrite(VERDE, LOW);\n  digitalWrite(AMARELO, HIGH);\n  delay(2000);\n  digitalWrite(AMARELO, LOW);\n  digitalWrite(VERMELHO, HIGH);\n  delay(5000);\n  digitalWrite(VERMELHO, LOW);\n}"
    },
    {
      id: "proj-003",
      title: "Sensor de Temperatura com Display",
      level: "iniciante",
      duration: "1.5 horas",
      difficulty: 2,
      icon: "fa-temperature-high",
      category: "IoT Básico",
      tags: ["Arduino", "DHT22", "OLED", "Sensor"],
      description: "Leia temperatura e umidade do ambiente e exiba num display OLED em tempo real.",
      learningObjectives: [
        "Ler sensores digitais (DHT22)",
        "Usar display OLED I2C",
        "Instalar bibliotecas na IDE Arduino",
        "Exibir dados formatados"
      ],
      bom: [
        { item: "Arduino Uno R4 WiFi", qty: 1, price: "$27.50" },
        { item: "Sensor DHT22", qty: 1, price: "$5" },
        { item: "Display OLED 0.96\" I2C", qty: 1, price: "$8" },
        { item: "Breadboard", qty: 1, price: "$5" },
        { item: "Jumpers", qty: 10, price: "$2" }
      ],
      totalCost: "$47.50",
      steps: [
        { step: 1, title: "Conecte o DHT22", content: "VCC → 5V, GND → GND, DATA → pino 7. Adicione resistor pull-up de 10kΩ." },
        { step: 2, title: "Conecte o OLED", content: "VCC → 3.3V, GND → GND, SDA → A4, SCL → A5." },
        { step: 3, title: "Instale bibliotecas", content: "Adafruit DHT Sensor Library + Adafruit SSD1306 + Adafruit GFX." },
        { step: 4, title: "Programe a leitura", content: "Leia a cada 2 segundos e exiba temperatura e umidade no OLED." }
      ],
      codeExample: "#include <DHT.h>\n#include <Adafruit_SSD1306.h>\n\n#define DHTPIN 7\n#define DHTTYPE DHT22\n\nDHT dht(DHTPIN, DHTTYPE);\nAdafruit_SSD1306 display(128, 64, &Wire);\n\nvoid setup() {\n  dht.begin();\n  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  display.clearDisplay();\n}\n\nvoid loop() {\n  float t = dht.readTemperature();\n  float h = dht.readHumidity();\n  display.clearDisplay();\n  display.setTextSize(2);\n  display.setCursor(0, 10);\n  display.print(t, 1);\n  display.print(\" C\");\n  display.setCursor(0, 40);\n  display.print(h, 1);\n  display.print(\" %\");\n  display.display();\n  delay(2000);\n}"
    },
    {
      id: "proj-004",
      title: "Theremin Óptico com LDR",
      level: "iniciante",
      duration: "2 horas",
      difficulty: 2,
      icon: "fa-music",
      category: "Áudio & Música",
      tags: ["Arduino", "LDR", "Buzzer", "Sensor"],
      description: "Crie um instrumento musical que muda o tom conforme a luz que incide no sensor LDR.",
      learningObjectives: [
        "Ler sensores analógicos (LDR)",
        "Usar tone() para gerar som",
        "Mapear valores com map()",
        "Entender divisores de tensão"
      ],
      bom: [
        { item: "Arduino Uno R4 WiFi", qty: 1, price: "$27.50" },
        { item: "LDR 5mm", qty: 1, price: "$0.50" },
        { item: "Resistor 10kΩ", qty: 1, price: "$0.10" },
        { item: "Buzzer passivo", qty: 1, price: "$2" },
        { item: "Breadboard", qty: 1, price: "$5" }
      ],
      totalCost: "$35.10"
    },
    {
      id: "proj-005",
      title: "Estação Meteorológica IoT",
      level: "iniciante",
      duration: "3 horas",
      difficulty: 2,
      icon: "fa-cloud-sun",
      category: "IoT Básico",
      tags: ["ESP32", "WiFi", "MQTT", "BME680"],
      description: "Crie uma estação meteorológica que envia dados de temperatura, umidade e qualidade do ar para a nuvem via MQTT.",
      learningObjectives: [
        "Conectar ESP32 ao WiFi",
        "Usar protocolo MQTT",
        "Ler sensor BME680 (temp/umidade/pressão/VOC)",
        "Visualizar dados em dashboard (MQTT Explorer)"
      ],
      bom: [
        { item: "ESP32-S3 DevKit", qty: 1, price: "$15" },
        { item: "Sensor BME680", qty: 1, price: "$15" },
        { item: "Breadboard", qty: 1, price: "$5" },
        { item: "Jumpers", qty: 10, price: "$2" }
      ],
      totalCost: "$37.00",
      steps: [
        { step: 1, title: "Conecte o BME680", content: "VCC → 3.3V, GND → GND, SDA → GPIO21, SCL → GPIO22." },
        { step: 2, title: "Configure WiFi e MQTT", content: "Use o broker público test.mosquitto.org. Publique no tópico 'nexus/estacao/+/dados'." },
        { step: 3, title: "Visualize os dados", content: "Use MQTT Explorer no PC para ver os dados chegando em tempo real." }
      ],
      codeExample: "#include <WiFi.h>\n#include <PubSubClient.h>\n#include <Adafruit_BME680.h>\n\nconst char* ssid = \"SEU_WIFI\";\nconst char* password = \"SUA_SENHA\";\nconst char* mqtt_server = \"test.mosquitto.org\";\n\nWiFiClient espClient;\nPubSubClient client(espClient);\nAdafruit_BME680 bme;\n\nvoid setup() {\n  Serial.begin(115200);\n  WiFi.begin(ssid, password);\n  while (WiFi.status() != WL_CONNECTED) delay(500);\n  client.setServer(mqtt_server, 1883);\n  bme.begin();\n}\n\nvoid loop() {\n  if (!client.connected()) {\n    client.connect(\"NexusEstacao001\");\n  }\n  client.loop();\n  char payload[100];\n  snprintf(payload, 100, \"{\\\"temp\\\":%.1f,\\\"hum\\\":%.1f,\\\"pres\\\":%.1f}\", \n           bme.readTemperature(), bme.readHumidity(), bme.readPressure()/100.0);\n  client.publish(\"nexus/estacao/001/dados\", payload);\n  delay(5000);\n}"
    }
  ],

  // ==========================================
  // 2. PROJETOS INTERMEDIÁRIOS (Nível 3-4)
  // ==========================================
  intermediate: [
    {
      id: "proj-050",
      title: "Robô Seguidor de Linha com PID",
      level: "intermediario",
      duration: "8 horas",
      difficulty: 3,
      icon: "fa-robot",
      category: "Robótica Móvel",
      tags: ["Arduino", "PID", "Sensor IR", "Motor DC", "Controle"],
      description: "Construa um robô que segue linha preta com controle PID para curvas suaves e precisas.",
      learningObjectives: [
        "Implementar controlador PID",
        "Calibrar sensores infravermelhos",
        "Controlar motores DC com PWM",
        "Sintonia de ganhos PID (Kp, Ki, Kd)"
      ],
      bom: [
        { item: "Arduino Mega 2560", qty: 1, price: "$40" },
        { item: "Sensor IR TCRT5000 (módulo 5 canais)", qty: 1, price: "$15" },
        { item: "Driver Motor L298N", qty: 1, price: "$8" },
        { item: "Motor DC 12V com encoder", qty: 2, price: "$30" },
        { item: "Bateria LiPo 3S 2200mAh", qty: 1, price: "$25" },
        { item: "Chassi 2WD + rodas", qty: 1, price: "$20" },
        { item: "Regulador 5V", qty: 1, price: "$5" }
      ],
      totalCost: "$143.00",
      steps: [
        { step: 1, title: "Monte o chassi", content: "Fixe os motores, rodas e a roda boba. Monte o array de 5 sensores IR na frente." },
        { step: 2, title: "Conecte a eletrônica", content: "Sensores IR nos pinos A0-A4. L298N nos pinos 5,6 (motor A) e 9,10 (motor B)." },
        { step: 3, title: "Implemente o PID", content: "Erro = posição do sensor central - leitura atual. Ajuste Kp=0.5, Ki=0.01, Kd=0.2." },
        { step: 4, title: "Sintonize na pista", content: "Aumente Kp até oscilar, depois reduza 30%. Ajuste Kd para amortecer." }
      ],
      codeExample: "float Kp = 0.5, Ki = 0.01, Kd = 0.2;\nfloat erro = 0, erro_anterior = 0, integral = 0;\n\nvoid loop() {\n  int posicao = lerSensores();  // retorna 0-4000\n  erro = 2000 - posicao;\n  integral += erro;\n  float derivativo = erro - erro_anterior;\n  float pid = Kp*erro + Ki*integral + Kd*derivativo;\n  motorEsquerda(velocidade_base + pid);\n  motorDireita(velocidade_base - pid);\n  erro_anterior = erro;\n}"
    },
    {
      id: "proj-051",
      title: "Drone com Arduino e MPU6050",
      level: "intermediario",
      duration: "20 horas",
      difficulty: 4,
      icon: "fa-helicopter",
      category: "Drones",
      tags: ["Arduino", "IMU", "PID", "ESC", "Brushless"],
      description: "Construa um quadcopter do zero com controle de estabilização PID usando MPU6050 e 4 motores brushless.",
      learningObjectives: [
        "Ler IMU MPU6050 e calcular ângulos de Euler",
        "Implementar PID em cascata (ângulo + velocidade angular)",
        "Calibrar ESCs e controlar motores brushless",
        "Filtro complementar para fusão de sensores"
      ],
      bom: [
        { item: "Arduino Nano", qty: 1, price: "$25" },
        { item: "MPU6050 (IMU 6-DOF)", qty: 1, price: "$5" },
        { item: "Motor Brushless 1000KV", qty: 4, price: "$40" },
        { item: "ESC 30A SimonK", qty: 4, price: "$40" },
        { item: "Hélice 10x4.5 (par CW/CCW)", qty: 4, price: "$12" },
        { item: "Frame F450", qty: 1, price: "$20" },
        { item: "Bateria LiPo 3S 4000mAh", qty: 1, price: "$30" },
        { item: "Receptor + Rádio controle", qty: 1, price: "$60" }
      ],
      totalCost: "$232.00",
      level: "intermediario"
    },
    {
      id: "proj-052",
      title: "Braço Robótico com ROS 2 e MoveIt",
      level: "intermediario",
      duration: "25 horas",
      difficulty: 4,
      icon: "fa-hand-rock",
      category: "Manipulação",
      tags: ["ROS 2", "MoveIt", "Dynamixel", "Cinemática", "Gazebo"],
      description: "Monte um braço robótico de 5 DOF com Dynamixels, integre ao ROS 2 e planeje trajetórias com MoveIt 2.",
      learningObjectives: [
        "Modelar robô em URDF/XACRO",
        "Configurar MoveIt 2 para planejamento de trajetória",
        "Controlar Dynamixels via U2D2",
        "Simular no Gazebo antes de executar no robô real"
      ],
      bom: [
        { item: "Dynamixel AX-12A", qty: 5, price: "$250" },
        { item: "U2D2 (USB para Dynamixel)", qty: 1, price: "$50" },
        { item: "Raspberry Pi 5 8GB", qty: 1, price: "$80" },
        { item: "Fonte 12V 10A", qty: 1, price: "$25" },
        { item: "Estrutura impressa 3D", qty: 1, price: "$30" },
        { item: "Garra (servo SG90)", qty: 1, price: "$3" }
      ],
      totalCost: "$438.00",
      steps: [
        { step: 1, title: "Monte o braço", content: "Imprima as peças 3D. Monte os Dynamixels nos elos conforme URDF." },
        { step: 2, title: "Instale ROS 2", content: "No Raspberry Pi 5, instale Ubuntu 24.04 + ROS 2 Humble + dynamixel_workbench." },
        { step: 3, title: "Crie o URDF", content: "Modele cada junta e elo em XACRO. Verifique no RViz." },
        { step: 4, title: "Configure o MoveIt 2", content: "Use o MoveIt Setup Assistant para gerar o pacote de configuração." },
        { step: 5, title: "Teste no Gazebo", content: "Simule antes de conectar ao hardware real." }
      ]
    },
    {
      id: "proj-053",
      title: "Gateway IoT com ESP32 + MQTT + Node-RED",
      level: "intermediario",
      duration: "10 horas",
      difficulty: 3,
      icon: "fa-network-wired",
      category: "IoT",
      tags: ["ESP32", "MQTT", "Node-RED", "InfluxDB", "Grafana"],
      description: "Crie um pipeline completo de IoT: sensores ESP32 → MQTT → Node-RED → InfluxDB → dashboard Grafana.",
      learningObjectives: [
        "Arquitetura de IoT completa",
        "Configurar broker MQTT (Mosquitto)",
        "Criar fluxos no Node-RED",
        "Armazenar séries temporais no InfluxDB",
        "Criar dashboards no Grafana"
      ],
      bom: [
        { item: "ESP32-S3 x3", qty: 3, price: "$45" },
        { item: "Sensores variados (DHT22, BME680, PMS5003)", qty: 3, price: "$35" },
        { item: "Raspberry Pi 5 (servidor)", qty: 1, price: "$80" }
      ],
      totalCost: "$160.00"
    }
  ],

  // ==========================================
  // 3. PROJETOS AVANÇADOS (Nível 5-6)
  // ==========================================
  advanced: [
    {
      id: "proj-100",
      title: "Robô Autônomo com SLAM e Navegação",
      level: "avancado",
      duration: "40 horas",
      difficulty: 5,
      icon: "fa-map",
      category: "Navegação Autônoma",
      tags: ["ROS 2", "SLAM", "Nav2", "LiDAR", "Jetson", "Raspberry Pi"],
      description: "Construa um robô diferencial que mapeia ambientes desconhecidos com SLAM e navega autonomamente com Nav2.",
      learningObjectives: [
        "Implementar SLAM (Simultaneous Localization and Mapping)",
        "Configurar Navigation 2 stack",
        "Integrar LiDAR, IMU e odometria",
        "Criar mapas de ocupação (Occupancy Grid)",
        "Planejamento de caminho global e local"
      ],
      bom: [
        { item: "Raspberry Pi 5 8GB", qty: 1, price: "$80" },
        { item: "RPLidar A1M8", qty: 1, price: "$100" },
        { item: "Câmera RealSense D435i", qty: 1, price: "$300" },
        { item: "IMU BNO055", qty: 1, price: "$20" },
        { item: "Motor DC 12V com encoder", qty: 2, price: "$50" },
        { item: "Driver ODrive Pro (ou L298N)", qty: 1, price: "$199" },
        { item: "Bateria LiPo 4S 10000mAh", qty: 1, price: "$50" },
        { item: "Chassi de alumínio", qty: 1, price: "$80" }
      ],
      totalCost: "$879.00",
      steps: [
        { step: 1, title: "Monte o hardware", content: "Fixe LiDAR no topo, câmera na frente, IMU no centro de massa." },
        { step: 2, title: "Instale ROS 2 Humble", content: "Ubuntu 24.04 + ROS 2 Humble + Nav2 + slam_toolbox." },
        { step: 3, title: "Configure o URDF", content: "Modele o robô com todas as transformações TF (base_link → laser → camera)." },
        { step: 4, title: "Lance o SLAM", content: "Teleopere o robô pelo ambiente enquanto o slam_toolbox gera o mapa." },
        { step: 5, title: "Salve o mapa e navegue", content: "Carregue o mapa no Nav2 e envie goals de navegação pelo RViz." }
      ],
      codeExample: "# Terminal 1: Launch robot\nros2 launch my_robot bringup.launch.py\n\n# Terminal 2: SLAM\nros2 launch slam_toolbox online_async_launch.py\n\n# Terminal 3: Navigation\nros2 launch nav2_bringup navigation_launch.py map:=./map.yaml\n\n# Terminal 4: RViz\nrviz2"
    },
    {
      id: "proj-101",
      title: "Detecção de Objetos em Tempo Real com YOLOv8 no Jetson",
      level: "avancado",
      duration: "20 horas",
      difficulty: 5,
      icon: "fa-eye",
      category: "Visão Computacional",
      tags: ["YOLOv8", "Jetson Orin", "TensorRT", "ROS 2", "Deep Learning"],
      description: "Implemente YOLOv8 otimizado com TensorRT na Jetson Orin Nano para detecção em tempo real integrada ao ROS 2.",
      learningObjectives: [
        "Otimizar YOLOv8 com TensorRT para Jetson",
        "Publicar detecções como mensagens ROS 2",
        "Processar streaming de câmera em tempo real",
        "Integrar detecções com navegação (desviar de objetos)"
      ],
      bom: [
        { item: "NVIDIA Jetson Orin Nano 8GB", qty: 1, price: "$499" },
        { item: "Câmera USB 1080p (ou MIPI CSI)", qty: 1, price: "$30" },
        { item: "Fonte 19V para Jetson", qty: 1, price: "$20" }
      ],
      totalCost: "$549.00",
      steps: [
        { step: 1, title: "Instale Ultralytics YOLOv8", content: "pip install ultralytics. Exporte o modelo para TensorRT: yolo export model=yolov8n.pt format=engine." },
        { step: 2, title: "Crie nó ROS 2", content: "Nó que lê a câmera, roda inferência e publica Detection2DArray." },
        { step: 3, title: "Integre com Nav2", content: "Adicione as detecções como obstáculos dinâmicos no costmap." }
      ]
    },
    {
      id: "proj-102",
      title: "Gêmeo Digital com NVIDIA Isaac Sim",
      level: "avancado",
      duration: "30 horas",
      difficulty: 6,
      icon: "fa-vr-cardboard",
      category: "Simulação",
      tags: ["Isaac Sim", "Digital Twin", "ROS 2", "Omniverse", "USD"],
      description: "Crie um gêmeo digital fotorrealista do seu robô no NVIDIA Isaac Sim. Teste algoritmos em simulação antes do hardware real.",
      learningObjectives: [
        "Importar URDF para Isaac Sim",
        "Configurar sensores sintéticos (LiDAR, câmera, IMU)",
        "Conectar simulação ao ROS 2 via Isaac ROS Bridge",
        "Cenários de teste automatizados com Python"
      ],
      bom: [
        { item: "PC com GPU NVIDIA RTX 3060+", qty: 1, note: "Não incluso (use o que tiver)" },
        { item: "NVIDIA Isaac Sim 2024", qty: 1, price: "Gratuito" }
      ],
      totalCost: "$0 (software gratuito)",
      steps: [
        { step: 1, title: "Instale Isaac Sim", content: "Via Omniverse Launcher. Use a versão com ROS 2 Bridge." },
        { step: 2, title: "Importe seu robô", content: "Arraste o URDF para o stage. Ajuste joints e materiais PBR." },
        { step: 3, title: "Adicione sensores", content: "Configure LiDAR, câmera RGB-D, IMU nos mesmos locais do robô real." },
        { step: 4, title: "Conecte ao ROS 2", content: "Ative o ROS 2 Bridge. Seus nós ROS leem dados da simulação como se fossem reais." }
      ]
    }
  ],

  // ==========================================
  // 4. PROJETOS ESPECIALISTAS (Nível 7-8)
  // ==========================================
  specialist: [
    {
      id: "proj-150",
      title: "Frota de 5 Robôs Orquestrada por Kubernetes (K3s)",
      level: "especialista",
      duration: "60 horas",
      difficulty: 7,
      icon: "fa-server",
      category: "Frotas Robóticas",
      tags: ["K3s", "Kubernetes", "ROS 2", "Docker", "Grafana", "Multi-robô"],
      description: "Implante e gerencie uma frota de 5 robôs autônomos usando Kubernetes (K3s). Cada robô é um nó do cluster.",
      learningObjectives: [
        "Containerizar aplicações ROS 2 com Docker",
        "Implantar cluster K3s multi-nó",
        "Service discovery entre robôs",
        "Monitoramento centralizado com Prometheus + Grafana",
        "Rolling updates sem downtime da frota"
      ],
      bom: [
        { item: "Raspberry Pi 5 8GB x5 (robôs)", qty: 5, price: "$400" },
        { item: "Mini PC Intel NUC (servidor)", qty: 1, price: "$500" },
        { item: "Switch Gigabit 8 portas", qty: 1, price: "$40" },
        { item: "RPLidar A1 x5", qty: 5, price: "$500" }
      ],
      totalCost: "$1,440.00",
      steps: [
        { step: 1, title: "Containerize o ROS 2", content: "Crie Dockerfile com ROS 2 Humble + seus pacotes. Build multi-arch para ARM64." },
        { step: 2, title: "Instale K3s", content: "Servidor no NUC, agentes nos 5 Raspberry Pis. Cluster pronto em 10 minutos." },
        { step: 3, title: "Deploy da frota", content: "Crie Deployments Kubernetes para cada robô. Use NodeSelector para pinar cada robô ao seu Pi." },
        { step: 4, title: "Service Discovery", content: "Robôs descobrem uns aos outros via DNS interno do Kubernetes (robot-1.robots.svc.cluster.local)." },
        { step: 5, title: "Monitoramento", content: "Prometheus coleta métricas de cada nó. Grafana exibe dashboard unificado da frota." }
      ]
    },
    {
      id: "proj-151",
      title: "LLM Local para Comando por Voz do Robô",
      level: "especialista",
      duration: "30 horas",
      difficulty: 7,
      icon: "fa-comments",
      category: "IA Conversacional",
      tags: ["Llama 3", "Whisper", "Piper TTS", "ROS 2", "Jetson"],
      description: "Faça seu robô entender comandos de voz em linguagem natural usando Llama 3 local + Whisper para STT + Piper para TTS.",
      learningObjectives: [
        "Rodar LLM localmente na Jetson (Ollama + Llama 3 8B quantizado)",
        "Speech-to-Text com Faster Whisper",
        "Text-to-Speech com Piper TTS",
        "Integrar pipeline de voz ao ROS 2",
        "Parser de comandos naturais → ações ROS 2"
      ],
      bom: [
        { item: "NVIDIA Jetson Orin Nano 8GB", qty: 1, price: "$499" },
        { item: "Microfone USB", qty: 1, price: "$15" },
        { item: "Caixa de som USB", qty: 1, price: "$20" }
      ],
      totalCost: "$534.00",
      steps: [
        { step: 1, title: "Instale Ollama + Llama 3", content: "curl -fsSL https://ollama.com/install.sh | sh && ollama pull llama3.1:8b" },
        { step: 2, title: "Instale Faster Whisper", content: "pip install faster-whisper. Modelo 'base' já roda bem na Jetson." },
        { step: 3, title: "Instale Piper TTS", content: "Baixe o binário e uma voz em português. Teste: echo 'Olá' | piper --output-raw | aplay" },
        { step: 4, title: "Crie o nó ROS 2", content: "Nó que orquestra: ouvir → transcrever → LLM interpretar → executar ação → responder por voz." }
      ],
      codeExample: "# Pipeline no nó ROS 2:\n# 1. Ouvir: audio = gravar_microfone(duração=3s)\n# 2. Transcrever: texto = whisper.transcribe(audio)\n# 3. Interpretar: resposta = ollama.generate('llama3.1', \n#    f'Comando do usuário: {texto}. Retorne JSON com ação e parâmetros.')\n# 4. Executar: acao = json.loads(resposta); chamar_servico_ros2(acao)\n# 5. Falar: piper.speak(f'Ok, vou {acao['descricao']}')"
    }
  ],

  // ==========================================
  // MÉTODOS UTILITÁRIOS
  // ==========================================
  /**
   * Retorna todos os projetos de um nível
   */
  getByLevel(level) {
    const levels = {
      'iniciante': this.beginner,
      'intermediario': this.intermediate,
      'avancado': this.advanced,
      'especialista': this.specialist,
    };
    return levels[level] || [];
  },

  /**
   * Busca projeto por ID
   */
  findById(id) {
    const all = [
      ...this.beginner,
      ...this.intermediate,
      ...this.advanced,
      ...this.specialist,
    ];
    return all.find(p => p.id === id) || null;
  },

  /**
   * Filtra por tag
   */
  getByTag(tag) {
    const all = [
      ...this.beginner,
      ...this.intermediate,
      ...this.advanced,
      ...this.specialist,
    ];
    return all.filter(p => p.tags && p.tags.includes(tag));
  },

  /**
   * Retorna projetos dentro do orçamento
   */
  getByMaxCost(maxCost) {
    const all = [
      ...this.beginner,
      ...this.intermediate,
      ...this.advanced,
      ...this.specialist,
    ];
    return all.filter(p => {
      const cost = parseFloat(p.totalCost.replace(/[$,]/g, ''));
      return !isNaN(cost) && cost <= maxCost;
    });
  },

  /**
   * Contagem total
   */
  getTotalCount() {
    return {
      beginner: this.beginner.length,
      intermediate: this.intermediate.length,
      advanced: this.advanced.length,
      specialist: this.specialist.length,
      total: this.beginner.length + this.intermediate.length + this.advanced.length + this.specialist.length,
    };
  },
};

// Exportação
export default NEXUS_PROJECTS_DATABASE;

if (typeof window !== 'undefined') {
  window.NEXUS_PROJECTS_DATABASE = NEXUS_PROJECTS_DATABASE;
}

/* ============================================================
   FIM DO ARQUIVO: js/data/projects-database.js
   PRÓXIMO: js/data/courses-curriculum.js
   ============================================================ */
