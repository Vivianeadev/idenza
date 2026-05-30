/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — BANCO DE ROBÔS OPEN SOURCE
 * ============================================================
 * Cada robô tem: BOM real, código funcional, diagramas,
 * links de compra, dificuldade, tempo e pré-requisitos.
 */

const IDENZA_ROBOS_DATABASE = [
    // ============================================================
    // NÍVEL 1: FÁCIL (1-2 dias, $30-$60)
    // ============================================================
    {
        id: "otto-diy",
        nome: "Otto DIY — Robô Humanoide Bípede",
        tipo: "Humanoide",
        dificuldade: "fácil",
        custo: "$60",
        tempo: "8 horas",
        pecas: 15,
        impressao3d: true,
        imagem: "otto-diy.jpg",
        video: "https://www.youtube.com/watch?v=example",
        
        descricao: "Otto é um robô humanoide open source que Anda, dança, evita obstáculos e emite sons. Totalmente impresso em 3D e controlado por Arduino Nano. É o robô mais famoso do mundo para iniciantes em robótica.",
        
        aprendizado: [
            "Montagem de robô humanoide articulado",
            "Programação de servomotores com Arduino",
            "Calibração de marcha bípede",
            "Uso de sensor ultrassônico para evitar obstáculos",
            "Comunicação Bluetooth para controle remoto",
        ],
        
        preRequisitos: ["Nenhum — ideal para primeira montagem"],
        
        bom: [
            { item: "Arduino Nano (com cabo USB)", qtd: 1, preco: "$8", link: "https://www.arduino.cc/", funcao: "Cérebro do robô" },
            { item: "Servo MG90S (micro servo 9g)", qtd: 4, preco: "$12", link: null, funcao: "Articulações: pés e pernas" },
            { item: "Sensor Ultrassônico HC-SR04", qtd: 1, preco: "$3", link: null, funcao: "Olhos — detecta obstáculos" },
            { item: "Buzzer Piezo 5V", qtd: 1, preco: "$1", link: null, funcao: "Emite sons e melodias" },
            { item: "Módulo Bluetooth HC-05", qtd: 1, preco: "$5", link: null, funcao: "Controle remoto por celular" },
            { item: "Bateria LiPo 7.4V 500mAh", qtd: 1, preco: "$10", link: null, funcao: "Alimentação do robô" },
            { item: "Regulador de Tensão 5V", qtd: 1, preco: "$2", link: null, funcao: "Estabiliza alimentação" },
            { item: "Filamento PLA para impressão 3D", qtd: 1, preco: "$15", link: null, funcao: "Corpo do robô (200g)" },
            { item: "Parafusos M2 e M3", qtd: 20, preco: "$2", link: null, funcao: "Fixação dos servos" },
            { item: "Jumpers fêmea-fêmea", qtd: 10, preco: "$1", link: null, funcao: "Conexões elétricas" },
            { item: "Chave liga/desliga", qtd: 1, preco: "$1", link: null, funcao: "Ligar/desligar" },
        ],
        
        ferramentas: [
            "Impressora 3D (ou serviço de impressão)",
            "Chave Phillips pequena",
            "Alicate de corte",
            "Ferro de solda (opcional)",
            "Computador com Arduino IDE",
        ],
        
        arquivos3D: "https://www.thingiverse.com/thing:1568652",
        
        passos: [
            { numero: 1, titulo: "Imprimir as Peças 3D", descricao: "Baixe os arquivos STL do Otto DIY no Thingiverse. Imprima: cabeça, tronco, 2 pernas (coxa + tíbia), 2 pés. Use PLA com 20% de preenchimento. Tempo de impressão: ~4 horas.", imagem: null },
            { numero: 2, titulo: "Preparar os Servos", descricao: "Antes de montar, centralize todos os 4 servos MG90S em 90° usando o código de calibração. Isso evita que o robô se force contra os limites mecânicos.", codigo: "otto_calibrar_servos.ino" },
            { numero: 3, titulo: "Montar as Pernas", descricao: "Encaixe 2 servos em cada perna: um no quadril (rotação frontal) e um no joelho (rotação lateral). Use parafusos M2 para fixar.", imagem: null },
            { numero: 4, titulo: "Montar o Tronco", descricao: "Fixe os servos do quadril no tronco. Conecte o Arduino Nano no compartimento interno. Passe os fios pelos canais.", imagem: null },
            { numero: 5, titulo: "Instalar Sensores", descricao: "Fixe o HC-SR04 (ultrassom) na cabeça do robô — serão os 'olhos'. Conecte VCC→5V, TRIG→D9, ECHO→D10, GND→GND. Fixe o buzzer no peito.", imagem: null },
            { numero: 6, titulo: "Fazer as Ligações Elétricas", descricao: "Conecte todos os servos aos pinos: Servo Perna Esquerda Quadril→D2, Joelho→D3. Servo Perna Direita Quadril→D4, Joelho→D5. HC-SR04→D9/D10. Buzzer→D8. Bluetooth→D0/D1.", codigo: "otto_wiring.txt" },
            { numero: 7, titulo: "Carregar o Firmware", descricao: "Baixe o código OttoDIY no GitHub. Abra na Arduino IDE, selecione a placa 'Arduino Nano', processador 'ATmega328P (Old Bootloader)' e faça o upload.", codigo: "otto_firmware.ino" },
            { numero: 8, titulo: "Calibrar a Marcha", descricao: "O Otto tem parâmetros de marcha ajustáveis. No código, modifique os ângulos TRIM dos servos para que o robô fique em pé sem cair. Teste os movimentos: andar, virar, dançar.", imagem: null },
            { numero: 9, titulo: "Conectar o App", descricao: "Baixe o app 'Otto DIY' no celular. Conecte via Bluetooth ao módulo HC-05. Agora você controla o robô remotamente!", imagem: null },
        ],
        
        codigoFonte: {
            "otto_calibrar_servos.ino": `// Idenza Robotics Academy — Calibração Otto DIY
#include <Servo.h>

Servo servo_pe_esq, servo_pe_dir, servo_joelho_esq, servo_joelho_dir;

void setup() {
  servo_pe_esq.attach(2);   // Perna esquerda — quadril
  servo_joelho_esq.attach(3); // Perna esquerda — joelho
  servo_pe_dir.attach(4);    // Perna direita — quadril
  servo_joelho_dir.attach(5); // Perna direita — joelho
  
  // Centraliza todos em 90°
  servo_pe_esq.write(90);
  servo_joelho_esq.write(90);
  servo_pe_dir.write(90);
  servo_joelho_dir.write(90);
  
  Serial.begin(9600);
  Serial.println("Todos os servos centralizados em 90°");
  Serial.println("Monte as pernas nesta posição!");
}

void loop() {
  // Mantém os servos em 90°
}`,
            "otto_wiring.txt": `LIGAÇÕES ELÉTRICAS — OTTO DIY
===============================
ARDUINO NANO:
D2  → Servo Perna Esquerda (Quadril)
D3  → Servo Perna Esquerda (Joelho)
D4  → Servo Perna Direita (Quadril)
D5  → Servo Perna Direita (Joelho)
D8  → Buzzer (+), GND → Buzzer (-)
D9  → HC-SR04 TRIG
D10 → HC-SR04 ECHO
D0  → HC-05 TX
D1  → HC-05 RX
5V  → VCC de todos os sensores
GND → GND de todos os componentes

BATERIA LiPo 7.4V:
+ → Regulador 5V → Arduino 5V
- → Arduino GND`,
        },
        
        dicas: [
            "Imprima as peças com 20% de preenchimento — mais leve, o robô anda melhor",
            "Se o robô cair para frente, aumente o ângulo TRIM do servo do quadril",
            "A bateria 7.4V 500mAh dura ~30 minutos de uso contínuo",
            "Comece com a marcha lenta (500ms por passo) e aumente gradualmente",
        ],
        
        comunidade: "https://www.ottodiy.com/",
        github: "https://github.com/OttoDIY/",
    },

    // ============================================================
    // NÍVEL 2: MÉDIO (2-5 dias, $50-$150)
    // ============================================================
    {
        id: "esp32-cam-rover",
        nome: "ESP32-CAM Rover — Robô Explorador com Câmera WiFi",
        tipo: "Rover com Visão",
        dificuldade: "médio",
        custo: "$70",
        tempo: "10 horas",
        pecas: 14,
        impressao3d: true,
        imagem: "esp32-rover.jpg",
        
        descricao: "Um robô sobre rodas controlado por WiFi que transmite vídeo em tempo real da câmera ESP32-CAM para o celular ou computador. Você pilota o robô vendo o que ele vê, como um drone terrestre. Ideal para explorar ambientes e aprender visão embarcada.",
        
        aprendizado: [
            "Streaming de vídeo com ESP32-CAM",
            "Controle de motores DC com ponte H",
            "Servidor web embutido no ESP32",
            "Comunicação WiFi em tempo real",
            "Design de chassi para robô diferencial",
        ],
        
        preRequisitos: ["Arduino básico", "Noções de WiFi"],
        
        bom: [
            { item: "ESP32-CAM (com câmera OV2640 2MP)", qtd: 1, preco: "$12", funcao: "Cérebro + câmera + WiFi" },
            { item: "Programador FTDI USB-TTL", qtd: 1, preco: "$5", funcao: "Gravar código no ESP32-CAM" },
            { item: "Driver Motor L298N", qtd: 1, preco: "$6", funcao: "Controlar 2 motores DC" },
            { item: "Motores DC 3-6V com caixa de redução", qtd: 2, preco: "$8", funcao: "Rodas de tração" },
            { item: "Rodas 65mm com acoplamento", qtd: 2, preco: "$6", funcao: "Rodas do robô" },
            { item: "Roda boba (rodízio) 360°", qtd: 1, preco: "$3", funcao: "Ponto de apoio dianteiro" },
            { item: "Bateria LiPo 7.4V 1000mAh", qtd: 1, preco: "$12", funcao: "Alimentação" },
            { item: "Regulador de tensão LM2596", qtd: 1, preco: "$3", funcao: "Reduzir 7.4V para 5V" },
            { item: "Chassi impresso 3D", qtd: 1, preco: "$5", funcao: "Estrutura" },
            { item: "LED branco 5mm", qtd: 2, preco: "$1", funcao: "Iluminação noturna" },
            { item: "Jumpers e parafusos", qtd: 20, preco: "$3", funcao: "Conexões" },
        ],
        
        ferramentas: [
            "Impressora 3D",
            "Chave de fenda",
            "Ferro de solda",
            "Computador com Arduino IDE",
        ],
        
        passos: [
            { numero: 1, titulo: "Imprimir o Chassi", descricao: "Baixe os arquivos STL do chassi. Imprima: base principal, suporte da ESP32-CAM, suporte da bateria. Use PLA.", imagem: null },
            { numero: 2, titulo: "Montar Motores e Rodas", descricao: "Fixe os 2 motores DC na base com parafusos M3. Acople as rodas. Fixe o rodízio na frente. O robô deve rolar livremente.", imagem: null },
            { numero: 3, titulo: "Conectar Driver L298N", descricao: "L298N: IN1→D12, IN2→D13 (Motor A), IN3→D14, IN4→D15 (Motor B). Alimentação 7.4V no terminal +12V. Saída 5V do L298N → Alimenta ESP32-CAM.", imagem: null },
            { numero: 4, titulo: "Programar ESP32-CAM", descricao: "Conecte o FTDI ao ESP32-CAM: TX→RX, RX→TX, GND→GND, 5V→5V, GPIO0→GND (modo programação). Faça upload do código.", codigo: "esp32_rover.ino" },
            { numero: 5, titulo: "Instalar Câmera e LEDs", descricao: "A câmera já vem conectada. Adicione 2 LEDs brancos nos pinos D4 e D16 para visão noturna. Fixe no suporte impresso.", imagem: null },
            { numero: 6, titulo: "Testar o Streaming", descricao: "Ligue o robô. Conecte o celular ao WiFi 'IdenzaRover'. Abra o navegador em 192.168.4.1. Você verá o vídeo ao vivo e os controles!", imagem: null },
            { numero: 7, titulo: "Pilotar e Explorar", descricao: "Use os botões na página web para: frente, ré, esquerda, direita. A câmera transmite a 15 FPS. Alcance WiFi: ~30m em área aberta.", imagem: null },
        ],
        
        codigoFonte: {
            "esp32_rover.ino": `// Idenza Robotics Academy — ESP32-CAM Rover WiFi
#include "esp_camera.h"
#include <WiFi.h>
#include <WebServer.h>

// Configuração WiFi
const char* ssid = "IdenzaRover";
const char* password = "12345678";

WebServer server(80);

// Pinos dos motores
#define MOTOR_A_IN1 12
#define MOTOR_A_IN2 13
#define MOTOR_B_IN1 14
#define MOTOR_B_IN2 15

// Pinos dos LEDs
#define LED_FRONTAL 4
#define LED_TRASEIRO 16

// Configuração da câmera OV2640
camera_config_t config;

void setup() {
  Serial.begin(115200);
  
  // Configurar motores
  pinMode(MOTOR_A_IN1, OUTPUT);
  pinMode(MOTOR_A_IN2, OUTPUT);
  pinMode(MOTOR_B_IN1, OUTPUT);
  pinMode(MOTOR_B_IN2, OUTPUT);
  pinMode(LED_FRONTAL, OUTPUT);
  pinMode(LED_TRASEIRO, OUTPUT);
  
  parar();
  
  // Configurar câmera
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = 5;
  config.pin_d1 = 18;
  config.pin_d2 = 19;
  config.pin_d3 = 21;
  config.pin_d4 = 36;
  config.pin_d5 = 39;
  config.pin_d6 = 34;
  config.pin_d7 = 35;
  config.pin_xclk = 0;
  config.pin_pclk = 22;
  config.pin_vsync = 25;
  config.pin_href = 23;
  config.pin_sccb_sda = 26;
  config.pin_sccb_scl = 27;
  config.pin_pwdn = 32;
  config.pin_reset = -1;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.frame_size = FRAMESIZE_SVGA; // 800x600
  config.jpeg_quality = 10;
  config.fb_count = 1;
  
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Erro na câmera: 0x%x", err);
    return;
  }
  
  // WiFi Access Point
  WiFi.softAP(ssid, password);
  Serial.print("WiFi criado. IP: ");
  Serial.println(WiFi.softAPIP());
  
  // Rotas do servidor
  server.on("/", HTTP_GET, handleRoot);
  server.on("/stream", HTTP_GET, handleStream);
  server.on("/frente", HTTP_GET, frente);
  server.on("/re", HTTP_GET, re);
  server.on("/esquerda", HTTP_GET, esquerda);
  server.on("/direita", HTTP_GET, direita);
  server.on("/parar", HTTP_GET, parar);
  server.on("/led/on", HTTP_GET, ledOn);
  server.on("/led/off", HTTP_GET, ledOff);
  
  server.begin();
  Serial.println("Servidor iniciado!");
}

void loop() {
  server.handleClient();
}

// Página web com controles
void handleRoot() {
  String html = R"rawliteral(
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Idenza Rover</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#1a1a1a; color:#fff; font-family:Arial; text-align:center; }
    h1 { color:#D4AF37; padding:15px; font-size:1.3rem; }
    img { width:100%; max-width:640px; border-radius:10px; }
    .controls { display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; 
                max-width:320px; margin:20px auto; }
    button { padding:15px; border:none; border-radius:12px; font-size:1.2rem; 
             cursor:pointer; background:#333; color:#fff; }
    button:active { background:#D4AF37; }
    .frente { grid-column:2; background:#2e7d32; }
    .esquerda { grid-column:1; }
    .parar { grid-column:2; background:#c62828; }
    .direita { grid-column:3; }
    .re { grid-column:2; }
  </style>
</head>
<body>
  <h1>🤖 Idenza Rover</h1>
  <img src="/stream" alt="Video ao vivo">
  <div class="controls">
    <button class="esquerda" onclick="fetch('/esquerda')">⬅️</button>
    <button class="frente" onclick="fetch('/frente')">⬆️</button>
    <button class="direita" onclick="fetch('/direita')">➡️</button>
    <button class="re" onclick="fetch('/re')">⬇️</button>
    <button class="parar" onclick="fetch('/parar')">🛑</button>
  </div>
  <div style="margin:10px;">
    <button onclick="fetch('/led/on')" style="background:#B8860B;">💡 Luz ON</button>
    <button onclick="fetch('/led/off')" style="background:#333;">💡 Luz OFF</button>
  </div>
</body>
</html>
  )rawliteral";
  server.send(200, "text/html", html);
}

void handleStream() {
  camera_fb_t *fb = esp_camera_fb_get();
  if (!fb) {
    server.send(500, "text/plain", "Erro na câmera");
    return;
  }
  server.send_P(200, "image/jpeg", (const char*)fb->buf, fb->len);
  esp_camera_fb_return(fb);
}

void frente()  { digitalWrite(MOTOR_A_IN1,1); digitalWrite(MOTOR_A_IN2,0); digitalWrite(MOTOR_B_IN1,1); digitalWrite(MOTOR_B_IN2,0); server.send(200); }
void re()      { digitalWrite(MOTOR_A_IN1,0); digitalWrite(MOTOR_A_IN2,1); digitalWrite(MOTOR_B_IN1,0); digitalWrite(MOTOR_B_IN2,1); server.send(200); }
void esquerda(){ digitalWrite(MOTOR_A_IN1,0); digitalWrite(MOTOR_A_IN2,1); digitalWrite(MOTOR_B_IN1,1); digitalWrite(MOTOR_B_IN2,0); server.send(200); }
void direita() { digitalWrite(MOTOR_A_IN1,1); digitalWrite(MOTOR_A_IN2,0); digitalWrite(MOTOR_B_IN1,0); digitalWrite(MOTOR_B_IN2,1); server.send(200); }
void parar()   { digitalWrite(MOTOR_A_IN1,0); digitalWrite(MOTOR_A_IN2,0); digitalWrite(MOTOR_B_IN1,0); digitalWrite(MOTOR_B_IN2,0); server.send(200); }
void ledOn()   { digitalWrite(LED_FRONTAL,1); digitalWrite(LED_TRASEIRO,1); server.send(200); }
void ledOff()  { digitalWrite(LED_FRONTAL,0); digitalWrite(LED_TRASEIRO,0); server.send(200); }`,
        },
        
        dicas: [
            "Se o vídeo travar, reduza a resolução para FRAMESIZE_VGA (640x480)",
            "A bateria 1000mAh dura ~40 minutos com streaming contínuo",
            "Adicione um servo no suporte da câmera para olhar para cima e para baixo (pan/tilt)",
            "Para alcance maior, substitua o Access Point por conexão ao seu WiFi doméstico",
        ],
    },
];

// Exportação
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IDENZA_ROBOS_DATABASE;
}
