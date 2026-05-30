    // ============================================================
    // ROBÔ 5: MINI QUADRÚPEDE 8 SERVOS (CACHORRO-ROBÔ)
    // ============================================================
    {
        id: "mini-quadrupede",
        nome: "Mini Quadrúpede",
        tipo: "Robô Cachorro de 4 Patas",
        dificuldade: "médio",
        custo: "$90",
        tempo: "15 horas",
        pecas: 18,
        impressao3d: true,
        arquivos3D: "https://www.thingiverse.com/thing:quadrupede-mini",
        comunidade: null,
        github: null,
        video: null,

        descricao: "Um robô de 4 patas com 8 servos (2 por pata) que caminha como um cachorro. Controlado por Arduino Mega, ele pode andar para frente, virar, deitar e levantar. A marcha quadrúpede é um clássico da robótica e ensina coordenação de múltiplos servos e equilíbrio dinâmico.",

        aprendizado: [
            "Montagem de robô quadrúpede articulado com 8 servos",
            "Programação de marcha quadrúpede (trot gait)",
            "Controle simultâneo de 8 servos com Arduino Mega",
            "Cinemática inversa simples para posicionamento das patas",
            "Uso de sensor ultrassônico para desviar de obstáculos",
            "Alimentação de alta corrente para múltiplos servos",
        ],
        preRequisitos: ["Arduino intermediário", "Experiência com servos"],

        bom: [
            { item: "Arduino Mega 2560", qtd: 1, preco: "$12.00", funcao: "Cérebro — muitos pinos para 8 servos", link: null },
            { item: "Servo MG996R (alta torque, 10kg·cm)", qtd: 8, preco: "$6.00", funcao: "2 por pata: ombro (frente/trás) + joelho (cima/baixo)", link: null },
            { item: "Driver PCA9685 (16 canais PWM I²C)", qtd: 1, preco: "$5.00", funcao: "Controla até 16 servos por I²C — evita flicker", link: null },
            { item: "Sensor Ultrassônico HC-SR04", qtd: 1, preco: "$3.00", funcao: "Olhos — detecta obstáculos frontais", link: null },
            { item: "Bateria LiPo 7.4V 2200mAh", qtd: 1, preco: "$18.00", funcao: "Alimentação (~20 min de marcha contínua)", link: null },
            { item: "Regulador Step-Down 5V 5A", qtd: 1, preco: "$5.00", funcao: "Alimentação estável para 8 servos", link: null },
            { item: "Filamento PLA", qtd: 1, preco: "$18.00", funcao: "Corpo, 4 patas (coxa + tíbia), cabeça (~300g)", link: null },
            { item: "Parafusos M3 e standoffs", qtd: 30, preco: "$3.00", funcao: "Fixação estrutural", link: null },
            { item: "Jumpers e capacitores 100μF", qtd: 10, preco: "$2.00", funcao: "Conexões + filtro de ruído nos servos", link: null },
        ],
        ferramentas: [
            "Impressora 3D (volume mínimo 200x200x200mm)",
            "Chave Allen M3",
            "Ferro de solda",
            "Multímetro (para verificar tensão)",
            "Computador com Arduino IDE",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Imprimir Todas as Peças 3D",
                descricao: "Imprima: corpo principal (base retangular), 4 patas superiores (coxa), 4 patas inferiores (tíbia), cabeça, suporte do sensor. Use PLA com 30% de preenchimento — as patas precisam ser resistentes. Tempo total: ~8 horas de impressão.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Montar as Articulações das Patas",
                descricao: "Cada pata tem 2 servos: ombro (fixo ao corpo, move frente/trás) e joelho (entre coxa e tíbia, move cima/baixo). Monte as 4 patas primeiro, depois fixe-as no corpo. Use parafusos M3. Certifique-se de que todas as juntas se movem livremente.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Instalar o PCA9685",
                descricao: "O PCA9685 é um driver PWM I²C que controla até 16 servos. Conecte ao Arduino Mega: SDA→pino 20, SCL→pino 21, VCC→5V, GND→GND. Conecte os 8 servos aos canais 0-7 do PCA9685. Alimente o PCA9685 com a bateria via regulador 5V 5A.",
                imagem: null,
                codigo: "diagrama_quadrupede.txt"
            },
            {
                numero: 4,
                titulo: "Instalar Sensor Ultrassônico",
                descricao: "Fixe o HC-SR04 na 'cabeça' do robô (parte frontal). Conecte VCC→5V, TRIG→pino 22, ECHO→pino 23, GND→GND. O robô usará este sensor para detectar obstáculos à frente.",
                imagem: null
            },
            {
                numero: 5,
                titulo: "Fazer Alimentação Elétrica",
                descricao: "A bateria 7.4V alimenta o regulador step-down. O regulador fornece 5V 5A para o PCA9685 (que alimenta os servos). O Arduino Mega pode ser alimentado pela porta USB durante testes ou pela mesma bateria com outro regulador. Use capacitores de 100μF entre VCC e GND de cada grupo de servos para filtrar ruído.",
                imagem: null
            },
            {
                numero: 6,
                titulo: "Calibrar Posição Inicial dos Servos",
                descricao: "Antes de andar, todos os servos precisam estar na posição 'em pé'. Carregue o código de calibração. Ajuste cada servo para a posição neutra. O robô deve ficar com as 4 patas no chão e o corpo nivelado.",
                codigo: "calibrar_quadrupede.ino"
            },
            {
                numero: 7,
                titulo: "Carregar Firmware da Marcha",
                descricao: "Carregue o código principal. O robô executará a marcha 'trot': patas diagonalmente opostas se movem juntas (pata 1+3 sobem enquanto 2+4 descem). Isso mantém equilíbrio dinâmico.",
                codigo: "quadrupede_marcha.ino"
            },
            {
                numero: 8,
                titulo: "Ajustar Parâmetros da Marcha",
                descricao: "Teste o robô em superfície plana. Ajuste: altura do passo (STEP_HEIGHT), comprimento do passo (STEP_LENGTH), velocidade (STEP_DELAY). Valores iniciais: altura 30°, comprimento 20°, delay 100ms.",
                imagem: null
            },
        ],

        codigoFonte: {
            "diagrama_quadrupede.txt": `LIGACOES QUADRUPEDE 8 SERVOS
================================

PCA9685 (Driver PWM):
SDA -> Arduino Mega pino 20
SCL -> Arduino Mega pino 21
VCC -> 5V do Regulador
GND -> GND comum

SERVOS (todos no PCA9685):
Canal 0 -> Pata 1 Ombro (frente direita)
Canal 1 -> Pata 1 Joelho
Canal 2 -> Pata 2 Ombro (frente esquerda)
Canal 3 -> Pata 2 Joelho
Canal 4 -> Pata 3 Ombro (traseira direita)
Canal 5 -> Pata 3 Joelho
Canal 6 -> Pata 4 Ombro (traseira esquerda)
Canal 7 -> Pata 4 Joelho

HC-SR04:
VCC -> 5V Arduino
TRIG -> Arduino pino 22
ECHO -> Arduino pino 23
GND -> GND

ALIMENTACAO:
Bateria 7.4V -> Regulador 5V 5A -> PCA9685 VCC
Bateria 7.4V -> Regulador 5V 1A -> Arduino Mega 5V
TODOS os GNDs conectados juntos`,

            "calibrar_quadrupede.ino": `// Idenza Academy — Calibracao Quadrupede
// Posiciona todos os servos em 90 graus
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

void setup() {
  Serial.begin(9600);
  pwm.begin();
  pwm.setPWMFreq(60);  // 60Hz para servos analogicos
  
  // Centraliza todos os 8 servos
  for (int i = 0; i < 8; i++) {
    pwm.setPWM(i, 0, 307);  // ~1500us = 90 graus
  }
  
  Serial.println("Todos os servos em 90 graus");
  Serial.println("Monte as patas nesta posicao");
}

void loop() {}`,

            "quadrupede_marcha.ino": `// Idenza Academy — Marcha Quadrupede (Trot Gait)
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

// Estrutura de cada perna
struct Perna {
  int canal_ombro;
  int canal_joelho;
  int angulo_ombro_base;
  int angulo_joelho_base;
};

Perna pernas[4] = {
  {0, 1, 90, 90},  // Pata 1: frente direita
  {2, 3, 90, 90},  // Pata 2: frente esquerda
  {4, 5, 90, 90},  // Pata 3: traseira direita
  {6, 7, 90, 90},  // Pata 4: traseira esquerda
};

// Parametros da marcha
const int STEP_HEIGHT = 30;   // Angulo de elevacao da pata
const int STEP_LENGTH = 20;   // Angulo de deslocamento
const int STEP_DELAY = 100;   // ms entre passos

// Pinos sensor
#define TRIG 22
#define ECHO 23

void setup() {
  Serial.begin(9600);
  pwm.begin();
  pwm.setPWMFreq(60);
  
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  
  posicaoInicial();
  delay(1000);
}

void loop() {
  float dist = medirDistancia();
  
  if (dist > 20) {
    andarFrente(1);  // Anda 1 ciclo
  } else {
    // Obstaculo: gira
    virarDireita(2);
  }
}

void posicaoInicial() {
  for (int i = 0; i < 4; i++) {
    moverServo(pernas[i].canal_ombro, pernas[i].angulo_ombro_base);
    moverServo(pernas[i].canal_joelho, pernas[i].angulo_joelho_base);
  }
}

void andarFrente(int ciclos) {
  for (int c = 0; c < ciclos; c++) {
    // Fase 1: Patas 1 e 3 sobem, 2 e 4 no chao
    moverServo(pernas[0].canal_joelho, pernas[0].angulo_joelho_base + STEP_HEIGHT);
    moverServo(pernas[2].canal_joelho, pernas[2].angulo_joelho_base + STEP_HEIGHT);
    moverServo(pernas[1].canal_ombro, pernas[1].angulo_ombro_base + STEP_LENGTH);
    moverServo(pernas[3].canal_ombro, pernas[3].angulo_ombro_base + STEP_LENGTH);
    delay(STEP_DELAY);
    
    // Fase 2: Patas 1 e 3 descem, 2 e 4 sobem
    moverServo(pernas[0].canal_joelho, pernas[0].angulo_joelho_base);
    moverServo(pernas[2].canal_joelho, pernas[2].angulo_joelho_base);
    moverServo(pernas[1].canal_joelho, pernas[1].angulo_joelho_base + STEP_HEIGHT);
    moverServo(pernas[3].canal_joelho, pernas[3].angulo_joelho_base + STEP_HEIGHT);
    moverServo(pernas[0].canal_ombro, pernas[0].angulo_ombro_base + STEP_LENGTH);
    moverServo(pernas[2].canal_ombro, pernas[2].angulo_ombro_base + STEP_LENGTH);
    delay(STEP_DELAY);
    
    // Retorna a posicao inicial
    posicaoInicial();
    delay(STEP_DELAY);
  }
}

void virarDireita(int ciclos) {
  for (int c = 0; c < ciclos; c++) {
    moverServo(pernas[0].canal_ombro, pernas[0].angulo_ombro_base + STEP_LENGTH);
    moverServo(pernas[1].canal_ombro, pernas[1].angulo_ombro_base - STEP_LENGTH);
    moverServo(pernas[2].canal_ombro, pernas[2].angulo_ombro_base + STEP_LENGTH);
    moverServo(pernas[3].canal_ombro, pernas[3].angulo_ombro_base - STEP_LENGTH);
    delay(STEP_DELAY * 2);
    posicaoInicial();
  }
}

void moverServo(int canal, int angulo) {
  angulo = constrain(angulo, 0, 180);
  int pulso = map(angulo, 0, 180, 102, 512);  // 500us-2500us
  pwm.setPWM(canal, 0, pulso);
}

float medirDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long duracao = pulseIn(ECHO, HIGH, 30000);
  return duracao * 0.034 / 2;
}`,
        },

        dicas: [
            "Se o robô tombar para o lado: verifique se as patas opostas estão sincronizadas",
            "Servos MG996R podem consumir 2A cada em stall — fonte de 5A é mínima",
            "Comece com STEP_DELAY=200ms (bem lento) e reduza conforme pega prática",
            "Adicione borrachinhas nos pés para melhor tração em pisos lisos",
            "O PCA9685 resolve o problema de flicker nos servos — use-o sempre para múltiplos servos",
        ],
    },

    // ============================================================
    // ROBÔ 6: BRAÇO COM VISÃO (OPENCV + ARDUINO)
    // ============================================================
    {
        id: "braco-visao-opencv",
        nome: "Braço Robótico com Visão Computacional",
        tipo: "Braço Articulado + Câmera + OpenCV",
        dificuldade: "médio",
        custo: "$150",
        tempo: "20 horas",
        pecas: 20,
        impressao3d: true,
        arquivos3D: "https://www.thingiverse.com/thing:braco-visao",
        comunidade: null,
        github: null,
        video: null,

        descricao: "Um braço robótico de 4 eixos que usa uma câmera USB e OpenCV no computador para identificar objetos por cor, calcular sua posição e fazer pick-and-place automático. O computador processa a imagem e envia comandos para o Arduino controlar os servos. Este projeto integra visão computacional com robótica física.",

        aprendizado: [
            "Integração Python + OpenCV + Arduino via Serial",
            "Detecção de objetos por cor (HSV) e cálculo de posição",
            "Cinemática inversa simples para braço 4 eixos",
            "Comunicação Serial entre PC e Arduino em tempo real",
            "Pipeline completo: ver → processar → agarrar → mover → soltar",
        ],
        preRequisitos: ["Python básico", "Arduino básico", "OpenCV básico"],

        bom: [
            { item: "Arduino Uno R3", qtd: 1, preco: "$10.00", funcao: "Controle dos servos", link: null },
            { item: "Servo MG996R", qtd: 3, preco: "$8.00", funcao: "Base, ombro, cotovelo (força)", link: null },
            { item: "Servo SG90", qtd: 1, preco: "$2.00", funcao: "Garra (leve)", link: null },
            { item: "Câmera USB (webcam simples)", qtd: 1, preco: "$15.00", funcao: "Visão do robô", link: null },
            { item: "Fonte 5V 5A", qtd: 1, preco: "$10.00", funcao: "Alimentação dos servos", link: null },
            { item: "Filamento PLA", qtd: 1, preco: "$15.00", funcao: "Peças estruturais", link: null },
            { item: "Objetos coloridos (bolinhas)", qtd: 10, preco: "$5.00", funcao: "Alvos para pick-and-place", link: null },
            { item: "Parafusos, jumpers, base", qtd: 30, preco: "$5.00", funcao: "Fixação e conexões", link: null },
        ],
        ferramentas: [
            "Impressora 3D",
            "Computador com Python 3 + OpenCV",
            "Arduino IDE",
            "Chave de fenda",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Montar o Braço Físico",
                descricao: "Imprima e monte o braço de 4 eixos conforme o robô #2 (Mini Braço Robótico). Adicione a câmera USB fixada acima da área de trabalho, apontando para baixo, com visão clara da mesa.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Instalar OpenCV no Computador",
                descricao: "Instale Python 3 e OpenCV: 'pip install opencv-python numpy pyserial'. Conecte a webcam USB ao computador. Teste se a câmera funciona: execute 'python -c \"import cv2; print(cv2.VideoCapture(0).read())\"'.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Carregar Firmware no Arduino",
                descricao: "Carregue o código que recebe comandos via Serial e move os servos. Formato do comando: 'BASE,OMBRO,COTOVELO,GARRA\\n' (ex: '90,120,60,45\\n').",
                codigo: "braco_serial.ino"
            },
            {
                numero: 4,
                titulo: "Calibrar Cores no OpenCV",
                descricao: "Execute o script de calibração. Use os trackbars para ajustar os valores HSV da cor do objeto que você quer detectar (ex: bolinha vermelha). Anote os valores min e max de H, S, V.",
                codigo: "calibrar_cor.py"
            },
            {
                numero: 5,
                titulo: "Executar Pick-and-Place Automático",
                descricao: "Execute o script principal. Coloque objetos coloridos na mesa. O sistema: 1) Detecta o objeto por cor, 2) Calcula posição (x,y), 3) Converte para ângulos do braço, 4) Envia comando via Serial, 5) Braço pega e move o objeto.",
                codigo: "pick_place_visao.py"
            },
        ],

        codigoFonte: {
            "braco_serial.ino": `// Idenza Academy — Braco com Visao (Firmware Arduino)
// Recebe comandos via Serial: "BASE,OMBRO,COTOVELO,GARRA"

#include <Servo.h>

Servo base, ombro, cotovelo, garra;

void setup() {
  Serial.begin(115200);
  base.attach(9);
  ombro.attach(10);
  cotovelo.attach(11);
  garra.attach(6);
  
  base.write(90);
  ombro.write(90);
  cotovelo.write(90);
  garra.write(90);
  
  Serial.println("Braco pronto! Aguardando comandos...");
}

void loop() {
  if (Serial.available() > 0) {
    String comando = Serial.readStringUntil('\\n');
    
    // Formato: "BASE,OMBRO,COTOVELO,GARRA"
    int ang_base = comando.substring(0, comando.indexOf(',')).toInt();
    comando = comando.substring(comando.indexOf(',') + 1);
    int ang_ombro = comando.substring(0, comando.indexOf(',')).toInt();
    comando = comando.substring(comando.indexOf(',') + 1);
    int ang_cotovelo = comando.substring(0, comando.indexOf(',')).toInt();
    comando = comando.substring(comando.indexOf(',') + 1);
    int ang_garra = comando.toInt();
    
    base.write(constrain(ang_base, 0, 180));
    ombro.write(constrain(ang_ombro, 0, 180));
    cotovelo.write(constrain(ang_cotovelo, 0, 180));
    garra.write(constrain(ang_garra, 45, 135));
    
    Serial.println("OK");
  }
}`,

            "calibrar_cor.py": `# Idenza Academy — Calibracao de Cor HSV
import cv2
import numpy as np

def nada(x):
    pass

cv2.namedWindow("Calibracao HSV")
cv2.createTrackbar("H Min", "Calibracao HSV", 0, 179, nada)
cv2.createTrackbar("H Max", "Calibracao HSV", 179, 179, nada)
cv2.createTrackbar("S Min", "Calibracao HSV", 0, 255, nada)
cv2.createTrackbar("S Max", "Calibracao HSV", 255, 255, nada)
cv2.createTrackbar("V Min", "Calibracao HSV", 0, 255, nada)
cv2.createTrackbar("V Max", "Calibracao HSV", 255, 255, nada)

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    h_min = cv2.getTrackbarPos("H Min", "Calibracao HSV")
    h_max = cv2.getTrackbarPos("H Max", "Calibracao HSV")
    s_min = cv2.getTrackbarPos("S Min", "Calibracao HSV")
    s_max = cv2.getTrackbarPos("S Max", "Calibracao HSV")
    v_min = cv2.getTrackbarPos("V Min", "Calibracao HSV")
    v_max = cv2.getTrackbarPos("V Max", "Calibracao HSV")
    
    lower = np.array([h_min, s_min, v_min])
    upper = np.array([h_max, s_max, v_max])
    
    mask = cv2.inRange(hsv, lower, upper)
    resultado = cv2.bitwise_and(frame, frame, mask=mask)
    
    cv2.imshow("Original", frame)
    cv2.imshow("Mascara", mask)
    cv2.imshow("Resultado", resultado)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
print(f"Valores HSV: lower=({h_min},{s_min},{v_min}) upper=({h_max},{s_max},{v_max})")`,

            "pick_place_visao.py": `# Idenza Academy — Pick-and-Place com Visao
import cv2
import numpy as np
import serial
import time

# Conectar ao Arduino
arduino = serial.Serial('COM3', 115200, timeout=1)  # Ajuste a porta
time.sleep(2)

# Valores HSV calibrados (exemplo: vermelho)
LOWER = np.array([0, 120, 70])
UPPER = np.array([10, 255, 255])

cap = cv2.VideoCapture(0)

def enviar_comando(base, ombro, cotovelo, garra):
    cmd = f"{base},{ombro},{cotovelo},{garra}\\n"
    arduino.write(cmd.encode())
    time.sleep(0.5)
    print(f"Enviado: {cmd.strip()}")

def pick_and_place(x, y):
    # Posicao de repouso
    enviar_comando(90, 90, 90, 90)
    time.sleep(1)
    
    # Abrir garra, descer, pegar
    enviar_comando(90, 120, 60, 120)
    time.sleep(1)
    enviar_comando(90, 120, 60, 60)  # Fecha garra
    time.sleep(0.5)
    
    # Levantar, girar, soltar
    enviar_comando(90, 60, 120, 60)
    time.sleep(1)
    enviar_comando(30, 60, 120, 60)
    time.sleep(1)
    enviar_comando(30, 60, 120, 120)  # Abre garra
    time.sleep(0.5)
    
    # Voltar
    enviar_comando(90, 90, 90, 90)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, LOWER, UPPER)
    
    # Encontrar contornos do objeto
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if area > 500:  # Filtra ruido
            M = cv2.moments(cnt)
            if M["m00"] > 0:
                cx = int(M["m10"] / M["m00"])
                cy = int(M["m01"] / M["m00"])
                
                cv2.circle(frame, (cx, cy), 7, (0, 255, 0), -1)
                cv2.putText(frame, f"({cx},{cy})", (cx+10, cy),
                           cv2.FONT_HERSHEY_SIMPLEX, 0.6, (212, 175, 55), 2)
                
                # So pega o primeiro objeto encontrado
                print(f"Objeto detectado em ({cx},{cy})")
                pick_and_place(cx, cy)
                break
    
    cv2.imshow("Pick-and-Place Idenza", frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
arduino.close()`,
        },

        dicas: [
            "A iluminação afeta MUITO a detecção de cor — use luz branca uniforme",
            "Calibre os valores HSV com o objeto na mesma posição que será usado",
            "Comece com objetos de cor bem distinta: vermelho, azul, verde puros",
            "A comunicação Serial pode travar — sempre feche a porta com arduino.close()",
        ],
    },

    // ============================================================
    // ROBÔ 7: TURTLEBOT 3 DIY (ROS 2 + SLAM)
    // ============================================================
    {
        id: "turtlebot3-diy",
        nome: "TurtleBot 3 DIY",
        tipo: "Robô Diferencial com ROS 2 e SLAM",
        dificuldade: "avançado",
        custo: "$400",
        tempo: "30 horas",
        pecas: 25,
        impressao3d: true,
        arquivos3D: "https://www.thingiverse.com/thing:turtlebot3-plates",
        comunidade: "https://emanual.robotis.com/docs/en/platform/turtlebot3/overview/",
        github: "https://github.com/ROBOTIS-GIT/turtlebot3",
        video: null,

        descricao: "Construa seu próprio TurtleBot 3 — o robô oficial de ensino de ROS 2 usado em universidades do mundo todo. Equipado com Raspberry Pi 5, LiDAR 360°, câmera e ROS 2 Jazzy, este robô faz SLAM (mapeamento) e navegação autônoma. Você aprenderá ROS 2 na prática, do zero ao deploy.",

        aprendizado: [
            "Instalação e configuração completa do ROS 2 Jazzy",
            "Integração de sensores: LiDAR, câmera, IMU, encoders",
            "SLAM com slam_toolbox — mapeamento de ambientes",
            "Navegação autônoma com Nav2",
            "Criação de pacotes ROS 2 personalizados",
            "Visualização com RViz2 e Foxglove",
        ],
        preRequisitos: ["Linux Ubuntu 24.04", "Python intermediário", "Terminal Linux"],

        bom: [
            { item: "Raspberry Pi 5 (8GB)", qtd: 1, preco: "$80.00", funcao: "Computador de bordo — roda ROS 2", link: null },
            { item: "OpenCR 1.0 (placa controladora)", qtd: 1, preco: "$120.00", funcao: "Controle de motores + IMU + sensores (ou use Arduino Mega + shield)", link: null },
            { item: "LiDAR 360° RPLidar A1M8", qtd: 1, preco: "$100.00", funcao: "Mapeamento e localização", link: null },
            { item: "Câmera Raspberry Pi Module 3", qtd: 1, preco: "$25.00", funcao: "Visão computacional", link: null },
            { item: "Motores Dynamixel XL430-W250", qtd: 2, preco: "$50.00", funcao: "Motores inteligentes com feedback", link: null },
            { item: "Rodas 65mm", qtd: 2, preco: "$12.00", funcao: "Rodas de tração", link: null },
            { item: "Rodízios (roda boba)", qtd: 2, preco: "$6.00", funcao: "Apoio", link: null },
            { item: "Bateria LiPo 11.1V 3000mAh", qtd: 1, preco: "$30.00", funcao: "Alimentação (~2h de operação)", link: null },
            { item: "Placas acrílicas (chassi)", qtd: 3, preco: "$15.00", funcao: "Estrutura em camadas", link: null },
            { item: "Standoffs e parafusos", qtd: 20, preco: "$5.00", funcao: "Fixação", link: null },
            { item: "Cartão SD 64GB", qtd: 1, preco: "$10.00", funcao: "Sistema operacional", link: null },
        ],
        ferramentas: [
            "Computador com Ubuntu 24.04 (para development)",
            "Monitor, teclado, mouse (para setup inicial do Pi)",
            "Chave de fenda",
            "Cabo Ethernet (para conexão inicial)",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Montar o Hardware",
                descricao: "Monte as 3 camadas do chassi com standoffs. Camada 1 (base): motores, rodas, rodízios. Camada 2: OpenCR, bateria. Camada 3: Raspberry Pi 5, LiDAR, câmera.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Instalar Ubuntu + ROS 2 no Raspberry Pi",
                descricao: "Grave Ubuntu 24.04 Server no cartão SD. Instale ROS 2 Jazzy seguindo o guia oficial. Instale os pacotes: ros-jazzy-desktop, ros-jazzy-slam-toolbox, ros-jazzy-navigation2, ros-jazzy-turtlebot3-msgs.",
                codigo: "instalar_ros2.sh"
            },
            {
                numero: 3,
                titulo: "Configurar o OpenCR",
                descricao: "Carregue o firmware TurtleBot3 no OpenCR via USB. Configure os IDs dos motores Dynamixel. Teste os motores com 'ros2 run turtlebot3_bringup turtlebot3_robot.launch.py'.",
                imagem: null
            },
            {
                numero: 4,
                titulo: "Testar Sensores",
                descricao: "Verifique se o LiDAR publica em /scan, a câmera em /camera/image_raw, e a odometria em /odom. Use 'ros2 topic list' e 'ros2 topic echo' para verificar.",
                imagem: null
            },
            {
                numero: 5,
                titulo: "Executar SLAM",
                descricao: "Lance o SLAM: 'ros2 launch turtlebot3_cartographer cartographer.launch.py'. Pilote o robô lentamente pelo ambiente com o teclado. O mapa será construído em tempo real. Salve o mapa com 'ros2 run nav2_map_server map_saver_cli -f meu_mapa'.",
                imagem: null
            },
            {
                numero: 6,
                titulo: "Navegação Autônoma",
                descricao: "Com o mapa salvo, lance a navegação: 'ros2 launch turtlebot3_navigation2 navigation2.launch.py map:=meu_mapa.yaml'. No RViz2, clique '2D Pose Estimate' para localizar o robô, depois 'Nav2 Goal' para enviar um destino. O robô planejará a rota e navegará sozinho.",
                imagem: null
            },
        ],

        codigoFonte: {
            "instalar_ros2.sh": `#!/bin/bash
# Idenza Academy — Instalacao ROS 2 Jazzy no Ubuntu 24.04

sudo apt update && sudo apt upgrade -y

# Locale
sudo apt install -y locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# Adicionar repositorio ROS 2
sudo apt install -y software-properties-common
sudo add-apt-repository universe -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Instalar ROS 2 Jazzy
sudo apt update
sudo apt install -y ros-jazzy-desktop python3-colcon-common-extensions

# Configurar ambiente
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
source ~/.bashrc

# Pacotes TurtleBot3
sudo apt install -y ros-jazzy-turtlebot3-msgs ros-jazzy-turtlebot3 ros-jazzy-slam-toolbox ros-jazzy-navigation2 ros-jazzy-nav2-bringup ros-jazzy-cartographer

# Workspace
mkdir -p ~/turtlebot3_ws/src
cd ~/turtlebot3_ws/src
git clone -b jazzy https://github.com/ROBOTIS-GIT/turtlebot3.git
cd ~/turtlebot3_ws
colcon build --symlink-install
echo "source ~/turtlebot3_ws/install/setup.bash" >> ~/.bashrc
source ~/.bashrc

# Configurar modelo
echo "export TURTLEBOT3_MODEL=burger" >> ~/.bashrc

echo "ROS 2 Jazzy + TurtleBot3 instalado com sucesso!"`,
        },

        dicas: [
            "Use 'colcon build --symlink-install' para evitar rebuilds constantes",
            "Sempre faça 'source install/setup.bash' após buildar",
            "O LiDAR deve estar em superfície plana para SLAM preciso",
            "Bateria fraca causa odometria imprecisa — mantenha acima de 11V",
            "Use Foxglove (foxglove.dev) para visualizar dados remotamente no navegador",
        ],
    },
];

// Exportação
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IDENZA_ROBOS_DATABASE;
}
