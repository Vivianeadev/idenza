/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — BANCO DE PROJETOS
 * ============================================================
 * 
 * Coleção completa de projetos com:
 * - Lista de materiais (BOM) detalhada
 * - Passo a passo de construção
 * - Diagramas de conexão
 * - Código-fonte
 * - Nível de dificuldade
 * - Tempo estimado
 * - Custo total
 * 
 * @database Projects
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IDENZA_PROJECTS_DATABASE = [
    // ============================================================
    // NÍVEL INICIANTE
    // ============================================================
    {
        id: "estacao-meteorologica-iot",
        title: "Estação Meteorológica IoT com Arduino",
        slug: "estacao-meteorologica-iot",
        level: "iniciante",
        duration: "4 horas",
        cost: "$45",
        category: "iot",
        icon: "fa-cloud-sun-rain",
        tags: ["Arduino", "IoT", "Sensores", "MQTT", "Dashboard"],
        rating: 4.8,
        completions: 1247,
        description: "Construa uma estação meteorológica completa que mede temperatura, umidade, pressão atmosférica e qualidade do ar. Os dados são enviados via WiFi para um dashboard web em tempo real.",
        learningObjectives: [
            "Conectar sensores ambientais ao Arduino",
            "Programar comunicação WiFi com ESP32",
            "Enviar dados via protocolo MQTT",
            "Criar dashboard web com gráficos em tempo real",
            "Armazenar histórico de dados",
        ],
        prerequisites: ["Conhecimento básico de Arduino", "Noções de eletrônica"],
        bom: [
            { item: "Arduino Uno R4 WiFi", qty: 1, price: "$27.50", link: "arduino-uno-r4-wifi" },
            { item: "Sensor BME680 (Temp/Umidade/Pressão/VOC)", qty: 1, price: "$14.95", link: "bme680" },
            { item: "Display OLED 0.96\" I²C", qty: 1, price: "$8.00" },
            { item: "LED RGB 5mm", qty: 3, price: "$0.50" },
            { item: "Resistor 220Ω", qty: 3, price: "$0.10" },
            { item: "Breadboard 830 pontos", qty: 1, price: "$5.00" },
            { item: "Jumpers macho-macho", qty: 20, price: "$3.00" },
            { item: "Cabo USB-C", qty: 1, price: "$5.00" },
        ],
        tools: ["Computador com Arduino IDE", "Conexão WiFi 2.4GHz"],
        steps: [
            { step: 1, title: "Montagem do Circuito", description: "Conecte o BME680 ao Arduino usando I²C (SDA → A4, SCL → A5). Conecte o display OLED no mesmo barramento I²C.", image: "step1-circuit.jpg" },
            { step: 2, title: "Instalação das Bibliotecas", description: "Instale as bibliotecas Adafruit BME680, Adafruit SSD1306 e PubSubClient no Arduino IDE.", code: "arduino-libs.txt" },
            { step: 3, title: "Programação do Firmware", description: "Carregue o código que lê os sensores a cada 5 segundos e publica via MQTT.", code: "estacao-firmware.ino" },
            { step: 4, title: "Configuração do Broker MQTT", description: "Instale o Mosquitto no seu computador ou use um broker cloud gratuito.", code: "mosquitto-setup.sh" },
            { step: 5, title: "Dashboard Web", description: "Crie uma página HTML com JavaScript que assina os tópicos MQTT e exibe gráficos em tempo real usando Chart.js.", code: "dashboard.html" },
        ],
        codeFiles: {
            "estacao-firmware.ino": `#include <WiFiS3.h>
#include <PubSubClient.h>
#include <Adafruit_BME680.h>

// Configurações WiFi
const char* ssid = "SEU_WIFI";
const char* password = "SUA_SENHA";

// Configurações MQTT
const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;
const char* topic_temp = "idenza/estacao/temperatura";
const char* topic_umid = "idenza/estacao/umidade";
const char* topic_pres = "idenza/estacao/pressao";
const char* topic_voc = "idenza/estacao/voc";

WiFiClient espClient;
PubSubClient client(espClient);
Adafruit_BME680 bme;

void setup() {
    Serial.begin(115200);
    
    // WiFi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\\nWiFi conectado!");
    
    // BME680
    if (!bme.begin()) {
        Serial.println("Erro: BME680 não encontrado!");
        while (1);
    }
    
    bme.setTemperatureOversampling(BME680_OS_8X);
    bme.setHumidityOversampling(BME680_OS_2X);
    bme.setPressureOversampling(BME680_OS_4X);
    bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
    bme.setGasHeater(320, 150);
    
    // MQTT
    client.setServer(mqtt_server, mqtt_port);
}

void loop() {
    if (!client.connected()) {
        reconnectMQTT();
    }
    client.loop();
    
    if (bme.performReading()) {
        char msg[8];
        
        dtostrf(bme.temperature, 5, 2, msg);
        client.publish(topic_temp, msg);
        
        dtostrf(bme.humidity, 5, 2, msg);
        client.publish(topic_umid, msg);
        
        dtostrf(bme.pressure / 100.0, 6, 2, msg);
        client.publish(topic_pres, msg);
        
        dtostrf(bme.gas_resistance / 1000.0, 5, 2, msg);
        client.publish(topic_voc, msg);
        
        Serial.printf("Temp: %.1f°C | Umid: %.1f%% | Pres: %.1f hPa | VOC: %.1f kΩ\\n",
            bme.temperature, bme.humidity, bme.pressure/100.0, bme.gas_resistance/1000.0);
    }
    
    delay(5000);
}

void reconnectMQTT() {
    while (!client.connected()) {
        Serial.print("Conectando ao MQTT...");
        if (client.connect("IdenzaEstacao001")) {
            Serial.println("conectado!");
        } else {
            Serial.print("falha, rc=");
            Serial.print(client.state());
            delay(2000);
        }
    }
}`,
            "dashboard.html": `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Idenza Weather Station — Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script src="https://unpkg.com/mqtt/dist/mqtt.min.js"></script>
    <style>
        :root {
            --bg: #0a3147;
            --gold: #D4AF37;
            --card: rgba(255,255,255,0.05);
            --text: #e0dcd0;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Inter', sans-serif;
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            padding: 2rem;
        }
        .header {
            text-align: center;
            margin-bottom: 2rem;
            border-bottom: 2px solid var(--gold);
            padding-bottom: 1rem;
        }
        .header h1 { color: var(--gold); font-size: 2rem; }
        .metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        .metric-card {
            background: var(--card);
            border: 1px solid rgba(212,175,55,0.2);
            border-radius: 12px;
            padding: 1.5rem;
            text-align: center;
        }
        .metric-value {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--gold);
        }
        .metric-label {
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 0.5rem;
            opacity: 0.7;
        }
        .charts {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        .chart-container {
            background: var(--card);
            border: 1px solid rgba(212,175,55,0.2);
            border-radius: 12px;
            padding: 1rem;
        }
        @media (max-width: 768px) { .charts { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>🌤️ Idenza Weather Station</h1>
        <p>Monitoramento ambiental em tempo real</p>
    </div>
    
    <div class="metrics">
        <div class="metric-card">
            <div class="metric-value" id="temp">--°C</div>
            <div class="metric-label">Temperatura</div>
        </div>
        <div class="metric-card">
            <div class="metric-value" id="umid">--%</div>
            <div class="metric-label">Umidade</div>
        </div>
        <div class="metric-card">
            <div class="metric-value" id="pres">-- hPa</div>
            <div class="metric-label">Pressão</div>
        </div>
        <div class="metric-card">
            <div class="metric-value" id="voc">-- kΩ</div>
            <div class="metric-label">Qualidade do Ar (VOC)</div>
        </div>
    </div>
    
    <div class="charts">
        <div class="chart-container">
            <canvas id="tempChart"></canvas>
        </div>
        <div class="chart-container">
            <canvas id="umidChart"></canvas>
        </div>
    </div>
    
    <script>
        // Dados para gráficos
        const maxPoints = 30;
        const tempData = [];
        const umidData = [];
        const labels = [];
        
        // Inicializa gráficos
        const tempCtx = document.getElementById('tempChart').getContext('2d');
        const umidCtx = document.getElementById('umidChart').getContext('2d');
        
        const tempChart = new Chart(tempCtx, {
            type: 'line',
            data: { labels: [], datasets: [{ 
                label: 'Temperatura (°C)', 
                data: [], 
                borderColor: '#D4AF37',
                backgroundColor: 'rgba(212,175,55,0.1)',
                tension: 0.4,
                fill: true,
            }]},
            options: { 
                responsive: true,
                plugins: { legend: { labels: { color: '#e0dcd0' } } },
                scales: { 
                    x: { ticks: { color: '#888' } },
                    y: { ticks: { color: '#888' } }
                }
            }
        });
        
        const umidChart = new Chart(umidCtx, {
            type: 'line',
            data: { labels: [], datasets: [{ 
                label: 'Umidade (%)', 
                data: [], 
                borderColor: '#3498db',
                backgroundColor: 'rgba(52,152,219,0.1)',
                tension: 0.4,
                fill: true,
            }]},
            options: { 
                responsive: true,
                plugins: { legend: { labels: { color: '#e0dcd0' } } },
                scales: { 
                    x: { ticks: { color: '#888' } },
                    y: { ticks: { color: '#888' } }
                }
            }
        });
        
        function addData(chart, label, data) {
            chart.data.labels.push(label);
            chart.data.datasets[0].data.push(data);
            if (chart.data.labels.length > maxPoints) {
                chart.data.labels.shift();
                chart.data.datasets[0].data.shift();
            }
            chart.update();
        }
        
        // Conexão MQTT
        const client = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');
        
        client.on('connect', () => {
            console.log('MQTT conectado!');
            client.subscribe('idenza/estacao/#');
        });
        
        client.on('message', (topic, message) => {
            const value = parseFloat(message.toString());
            const now = new Date().toLocaleTimeString();
            
            if (topic.includes('temperatura')) {
                document.getElementById('temp').textContent = value.toFixed(1) + '°C';
                addData(tempChart, now, value);
            } else if (topic.includes('umidade')) {
                document.getElementById('umid').textContent = value.toFixed(1) + '%';
                addData(umidChart, now, value);
            } else if (topic.includes('pressao')) {
                document.getElementById('pres').textContent = value.toFixed(1) + ' hPa';
            } else if (topic.includes('voc')) {
                document.getElementById('voc').textContent = value.toFixed(1) + ' kΩ';
            }
        });
    </script>
</body>
</html>`,
        },
    },

    // ============================================================
    // NÍVEL INTERMEDIÁRIO
    // ============================================================
    {
        id: "robo-seguidor-linha",
        title: "Robô Seguidor de Linha com ROS 2",
        slug: "robo-seguidor-linha",
        level: "intermediario",
        duration: "12 horas",
        cost: "$250",
        category: "robotica",
        icon: "fa-robot",
        tags: ["ROS 2", "OpenCV", "Raspberry Pi", "Motores", "Controle PID"],
        rating: 4.9,
        completions: 856,
        description: "Construa um robô diferencial que segue linhas usando ROS 2, OpenCV e controle PID. O robô processa imagens da câmera em tempo real e ajusta a trajetória automaticamente.",
        learningObjectives: [
            "Montar chassi de robô diferencial",
            "Configurar ROS 2 no Raspberry Pi",
            "Processar imagens com OpenCV em tempo real",
            "Implementar controlador PID para navegação",
            "Calibrar sensores e atuadores",
        ],
        prerequisites: ["Python intermediário", "Linux básico", "Eletrônica básica"],
        bom: [
            { item: "Raspberry Pi 5 (8GB)", qty: 1, price: "$80", link: "raspberry-pi-5-8gb" },
            { item: "Câmera Raspberry Pi Module 3", qty: 1, price: "$25", link: "pi-camera-v3" },
            { item: "Driver de motor L298N", qty: 1, price: "$8" },
            { item: "Motores DC 12V com encoder", qty: 2, price: "$30" },
            { item: "Rodas 65mm com acoplamento", qty: 2, price: "$12" },
            { item: "Rodízio (roda boba)", qty: 1, price: "$5" },
            { item: "Chassi impresso em 3D", qty: 1, price: "$15" },
            { item: "Bateria LiPo 3S 5000mAh", qty: 1, price: "$35" },
            { item: "Power bank 5V 3A para Pi", qty: 1, price: "$20" },
            { item: "Jumpers, parafusos, standoffs", qty: 1, price: "$10" },
        ],
        tools: ["Impressora 3D (para chassi)", "Ferro de solda", "Multímetro"],
        steps: [
            { step: 1, title: "Impressão do Chassi", description: "Imprima as peças do chassi em PLA. Arquivos STL disponíveis no projeto.", image: "chassi-stl.jpg" },
            { step: 2, title: "Montagem Mecânica", description: "Fixe motores, rodas e rodízio no chassi. Monte o suporte da câmera.", image: "montagem.jpg" },
            { step: 3, title: "Instalação do ROS 2", description: "Instale o ROS 2 Humble no Raspberry Pi OS.", code: "install-ros2.sh" },
            { step: 4, title: "Conexão Elétrica", description: "Conecte motores ao L298N, L298N ao Raspberry Pi GPIO. Alimente tudo com a bateria.", image: "wiring-diagram.jpg" },
            { step: 5, title: "Nó de Controle PID", description: "Implemente o nó ROS 2 que processa a imagem da câmera e calcula o erro de trajetória.", code: "line_follower.py" },
            { step: 6, title: "Calibração e Teste", description: "Calibre o PID com a pista de teste. Ajuste os ganhos Kp, Ki, Kd.", image: "calibration.jpg" },
        ],
        codeFiles: {
            "line_follower.py": `#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image
from geometry_msgs.msg import Twist
import cv2
from cv_bridge import CvBridge
import numpy as np

class LineFollower(Node):
    def __init__(self):
        super().__init__('line_follower')
        
        # Publishers e Subscribers
        self.cmd_vel_pub = self.create_publisher(Twist, '/cmd_vel', 10)
        self.image_sub = self.create_subscription(Image, '/camera/image_raw', self.image_callback, 10)
        
        self.bridge = CvBridge()
        
        # Parâmetros PID
        self.Kp = 0.005
        self.Ki = 0.0001
        self.Kd = 0.002
        self.integral = 0
        self.last_error = 0
        
        # Velocidade base
        self.linear_speed = 0.2
        self.max_angular = 0.8
        
        self.get_logger().info('Line Follower iniciado!')
    
    def image_callback(self, msg):
        # Converte ROS Image para OpenCV
        frame = self.bridge.imgmsg_to_cv2(msg, 'bgr8')
        
        # Pré-processamento
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        _, binary = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY_INV)
        
        # ROI (Região de Interesse) — metade inferior
        h, w = binary.shape
        roi = binary[int(h*0.6):h, :]
        
        # Encontra centroide da linha
        moments = cv2.moments(roi)
        
        if moments['m00'] > 0:
            cx = int(moments['m10'] / moments['m00'])
            
            # Erro = diferença entre centro da linha e centro da imagem
            error = cx - (w / 2)
            
            # PID
            self.integral += error
            derivative = error - self.last_error
            
            angular_z = (self.Kp * error) + (self.Ki * self.integral) + (self.Kd * derivative)
            angular_z = max(-self.max_angular, min(self.max_angular, angular_z))
            
            self.last_error = error
            
            # Publica comando
            twist = Twist()
            twist.linear.x = self.linear_speed
            twist.angular.z = -angular_z  # Negativo para corrigir direção
            
            self.cmd_vel_pub.publish(twist)
            
            # Visualização (debug)
            cv2.circle(roi, (cx, roi.shape[0]//2), 5, (0, 255, 0), -1)
        else:
            # Linha não encontrada — gira para procurar
            twist = Twist()
            twist.angular.z = 0.5
            self.cmd_vel_pub.publish(twist)
        
        cv2.imshow('Line Follower Debug', roi)
        cv2.waitKey(1)

def main():
    rclpy.init()
    node = LineFollower()
    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        cv2.destroyAllWindows()
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()`,
        },
    },

    // ============================================================
    // NÍVEL AVANÇADO
    // ============================================================
    {
        id: "braco-robo-visao-ia",
        title: "Braço Robótico com Visão Inteligente e YOLOv8",
        slug: "braco-robo-visao-ia",
        level: "avancado",
        duration: "30 horas",
        cost: "$1,800",
        category: "robotica-ia",
        icon: "fa-hand-holding",
        tags: ["ROS 2", "YOLOv8", "Jetson", "Dynamixel", "MoveIt", "OpenCV"],
        rating: 5.0,
        completions: 234,
        description: "Construa um braço robótico de 5 graus de liberdade que identifica e manipula objetos usando YOLOv8 em tempo real no NVIDIA Jetson. O sistema usa ROS 2, MoveIt 2 para planejamento de trajetória, e câmera depth Intel RealSense para localização 3D dos objetos.",
        learningObjectives: [
            "Montar braço robótico com Dynamixel",
            "Configurar NVIDIA Jetson Orin Nano com ROS 2",
            "Treinar modelo YOLOv8 personalizado",
            "Integrar visão 3D (RGB-D) com planejamento de movimento",
            "Implementar pipeline completo de pick-and-place",
        ],
        prerequisites: ["Python avançado", "ROS 2 intermediário", "Linux avançado", "Eletrônica intermediária"],
        bom: [
            { item: "NVIDIA Jetson Orin Nano (8GB)", qty: 1, price: "$499", link: "jetson-orin-nano-devkit" },
            { item: "Intel RealSense D435i", qty: 1, price: "$300", link: "realsense-d435i" },
            { item: "Dynamixel XM540-W270", qty: 5, price: "$1,745", link: "dynamixel-xm540" },
            { item: "Dynamixel U2D2 (USB para TTL)", qty: 1, price: "$50" },
            { item: "Fonte 12V 20A", qty: 1, price: "$40" },
            { item: "Estrutura impressa em 3D", qty: 1, price: "$50" },
            { item: "Garra robótica impressa 3D", qty: 1, price: "$20" },
            { item: "Base giratória (bearing lazy susan)", qty: 1, price: "$15" },
        ],
        tools: ["Impressora 3D", "Chave Allen", "Multímetro", "Paquímetro"],
        steps: [
            { step: 1, title: "Montagem Mecânica", description: "Monte a estrutura do braço com os Dynamixels. Configure IDs e baud rate.", image: "assembly.jpg" },
            { step: 2, title: "Configuração do Jetson", description: "Instale JetPack 6, ROS 2 Humble, e todos os drivers.", code: "jetson-setup.sh" },
            { step: 3, title: "Calibração da Câmera", description: "Calibre a RealSense D435i para obter parâmetros intrínsecos precisos.", code: "calibrate_camera.py" },
            { step: 4, title: "Treinamento YOLOv8", description: "Capture 500+ imagens dos objetos alvo e treine um modelo YOLOv8 personalizado.", code: "train_yolo.py" },
            { step: 5, title: "Integração ROS 2", description: "Crie nós ROS 2 para visão, planejamento e controle.", code: "pick_place_node.py" },
            { step: 6, title: "Teste e Validação", description: "Execute o pipeline completo: detectar → localizar 3D → planejar trajetória → agarrar.", image: "demo.jpg" },
        ],
        codeFiles: {
            "pick_place_node.py": `#!/usr/bin/env python3
"""
Idenza Robotics Academy — Nó de Pick-and-Place com YOLOv8
Detecta objetos 3D, planeja trajetória e executa a pegada.
"""
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import Image, PointCloud2
from geometry_msgs.msg import PoseStamped
from moveit_msgs.msg import MoveItErrorCodes
from trajectory_msgs.msg import JointTrajectory
import cv2
from cv_bridge import CvBridge
from ultralytics import YOLO
import numpy as np
import tf2_ros
from tf2_geometry_msgs import do_transform_pose

class PickAndPlaceNode(Node):
    def __init__(self):
        super().__init__('pick_and_place')
        
        # YOLO
        self.model = YOLO('/home/idenza/models/objects.pt')
        self.bridge = CvBridge()
        self.target_class = 'peca_metalica'
        
        # Transform
        self.tf_buffer = tf2_ros.Buffer()
        self.tf_listener = tf2_ros.TransformListener(self.tf_buffer, self)
        
        # Subscribers
        self.rgb_sub = self.create_subscription(Image, '/camera/color/image_raw', self.rgb_callback, 10)
        self.depth_sub = self.create_subscription(Image, '/camera/depth/image_rect_raw', self.depth_callback, 10)
        
        # Publishers
        self.target_pose_pub = self.create_publisher(PoseStamped, '/target_pose', 10)
        
        # Estado
        self.current_depth = None
        self.current_rgb = None
        
        self.get_logger().info('🥇 Idenza Pick-and-Place Node iniciado!')
    
    def rgb_callback(self, msg):
        self.current_rgb = self.bridge.imgmsg_to_cv2(msg, 'bgr8')
        self.process_frame()
    
    def depth_callback(self, msg):
        self.current_depth = self.bridge.imgmsg_to_cv2(msg, '16UC1')
    
    def process_frame(self):
        if self.current_rgb is None or self.current_depth is None:
            return
        
        # YOLO detection
        results = self.model(self.current_rgb, conf=0.7, iou=0.5)
        
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0])
                class_name = self.model.names[class_id]
                
                if class_name == self.target_class:
                    # Bounding box
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    center_x = (x1 + x2) // 2
                    center_y = (y1 + y2) // 2
                    
                    # Profundidade no centro do objeto
                    depth_mm = self.current_depth[center_y, center_x]
                    depth_m = depth_mm / 1000.0
                    
                    # Converte para coordenadas 3D (simplificado)
                    fx, fy, cx, cy = 615.0, 615.0, 320.0, 240.0  # Parâmetros da câmera
                    
                    x_3d = (center_x - cx) * depth_m / fx
                    y_3d = (center_y - cy) * depth_m / fy
                    z_3d = depth_m
                    
                    # Publica pose alvo
                    pose = PoseStamped()
                    pose.header.frame_id = 'camera_link'
                    pose.header.stamp = self.get_clock().now().to_msg()
                    pose.pose.position.x = z_3d
                    pose.pose.position.y = -x_3d
                    pose.pose.position.z = -y_3d
                    pose.pose.orientation.w = 1.0
                    
                    self.target_pose_pub.publish(pose)
                    
                    self.get_logger().info(f'🎯 Objeto detectado em: x={z_3d:.2f}, y={-x_3d:.2f}, z={-y_3d:.2f}')
                    
                    # Visualização
                    cv2.rectangle(self.current_rgb, (x1, y1), (x2, y2), (0, 255, 0), 2)
                    cv2.circle(self.current_rgb, (center_x, center_y), 5, (212, 175, 55), -1)
                    cv2.putText(self.current_rgb, f'{class_name} {depth_m:.2f}m',
                                (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (212, 175, 55), 2)
                    
                    break  # Pega apenas o primeiro objeto
        
        cv2.imshow('Idenza Pick-and-Place', self.current_rgb)
        cv2.waitKey(1)

def main():
    rclpy.init()
    node = PickAndPlaceNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()`,
        },
    },
];

// ============================================================
// EXPORTAÇÃO
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IDENZA_PROJECTS_DATABASE;
}
