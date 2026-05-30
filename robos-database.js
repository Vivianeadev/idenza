    // ============================================================
    // ROBÔ 8: DRONE ARDUINO QUADRICÓPTERO
    // ============================================================
    {
        id: "drone-arduino",
        nome: "Drone Arduino",
        tipo: "Quadricóptero com Arduino e MPU6050",
        dificuldade: "avançado",
        custo: "$200",
        tempo: "25 horas",
        pecas: 30,
        impressao3d: true,
        arquivos3D: "https://www.thingiverse.com/thing:drone-frame",
        comunidade: "https://ardupilot.org/",
        github: "https://github.com/ArduPilot/ardupilot",
        video: null,

        descricao: "Construa um drone quadricóptero do zero usando Arduino, sensor MPU6050 (giroscópio + acelerômetro) e controle PID para estabilização de voo. Este drone voa de verdade e ensina todos os fundamentos de controle de voo, filtragem de sensores e eletrônica de potência. Use em áreas abertas com segurança.",

        aprendizado: [
            "Montagem completa de um drone quadricóptero funcional",
            "Controle PID para estabilização de voo em tempo real",
            "Leitura e fusão de sensores IMU (MPU6050)",
            "Filtro complementar para ângulos de roll, pitch e yaw",
            "Comunicação com rádio controle (PWM)",
            "Calibração de ESCs e motores brushless",
        ],
        preRequisitos: ["Arduino intermediário", "Eletrônica de potência", "Solda"],

        bom: [
            { item: "Arduino Nano (ou Arduino Uno)", qtd: 1, preco: "$8.00", funcao: "Controlador de voo", link: null },
            { item: "MPU6050 (giroscópio + acelerômetro 6 eixos)", qtd: 1, preco: "$5.00", funcao: "Sensor de orientação do drone", link: null },
            { item: "Motores Brushless 2204 2300KV", qtd: 4, preco: "$10.00", funcao: "Motores de propulsão", link: null },
            { item: "ESC 30A SimonK (controlador de velocidade)", qtd: 4, preco: "$8.00", funcao: "Controla cada motor brushless", link: null },
            { item: "Hélices 5030 (5 polegadas)", qtd: 8, preco: "$2.00", funcao: "Hélices de propulsão (pares CW e CCW)", link: null },
            { item: "Frame (chassi) de drone 250mm", qtd: 1, preco: "$15.00", funcao: "Estrutura do drone", link: null },
            { item: "Bateria LiPo 3S 2200mAh 30C", qtd: 1, preco: "$22.00", funcao: "Alimentação (~8 min de voo)", link: null },
            { item: "Receptor e Transmissor (rádio controle 4 canais)", qtd: 1, preco: "$40.00", funcao: "Controle remoto do drone", link: null },
            { item: "Power Distribution Board (PDB)", qtd: 1, preco: "$5.00", funcao: "Distribuir energia da bateria para ESCs", link: null },
            { item: "Buzzer 5V (alarme de bateria fraca)", qtd: 1, preco: "$1.00", funcao: "Alerta de bateria baixa", link: null },
            { item: "Fios, conectores XT60, termoretrátil", qtd: 20, preco: "$5.00", funcao: "Conexões elétricas", link: null },
        ],
        ferramentas: [
            "Ferro de solda (60W mínimo)",
            "Chave Allen 2mm",
            "Alicate",
            "Multímetro",
            "Computador com Arduino IDE",
            "Área aberta para teste de voo (SEM vento)",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Montar o Frame (Chassi)",
                descricao: "Monte o frame de 250mm conforme o manual. Fixe os 4 motores nos braços com parafusos. Fixe o PDB no centro do frame. Passe os fios dos motores pelos braços até o PDB. ORGANIZE OS FIOS — fios soltos podem enroscar nas hélices.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Soldar ESCs e Motores",
                descricao: "Solde os 3 fios de cada motor aos 3 pads do ESC correspondente. Solde os fios de alimentação de cada ESC ao PDB (vermelho=+, preto=-). Solde o conector XT60 da bateria ao PDB. ATENÇÃO: fios de alimentação grossos precisam de solda firme.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Instalar o Arduino e MPU6050",
                descricao: "Fixe o Arduino Nano no centro do frame (use fita dupla face ou suporte impresso 3D). Conecte o MPU6050 via I²C: VCC→5V, GND→GND, SDA→A4, SCL→A5. Posicione o MPU6050 na horizontal — a orientação é CRÍTICA para o voo.",
                imagem: null,
                codigo: "diagrama_drone.txt"
            },
            {
                numero: 4,
                titulo: "Conectar os ESCs ao Arduino",
                descricao: "Cada ESC tem um fio de sinal (branco/amarelo). Conecte: ESC Motor 1 (frente esq.) → pino 3, ESC Motor 2 (frente dir.) → pino 5, ESC Motor 3 (traseiro esq.) → pino 6, ESC Motor 4 (traseiro dir.) → pino 9.",
                imagem: null
            },
            {
                numero: 5,
                titulo: "Conectar o Receptor do Rádio",
                descricao: "O receptor tem canais: Throttle, Roll, Pitch, Yaw. Conecte cada canal a um pino do Arduino: Throttle→A0, Roll→A1, Pitch→A2, Yaw→A3. Alimente o receptor com 5V do Arduino.",
                imagem: null
            },
            {
                numero: 6,
                titulo: "Calibrar os ESCs",
                descricao: "Antes de voar, você PRECISA calibrar os 4 ESCs para que todos respondam igualmente. Carregue o código de calibração. Siga a sequência: 1) Throttle no máximo, 2) Ligue o drone, 3) Aguarde beeps, 4) Throttle no mínimo, 5) Aguarde beeps de confirmação.",
                codigo: "calibrar_escs.ino"
            },
            {
                numero: 7,
                titulo: "Carregar o Firmware de Voo",
                descricao: "Carregue o código principal com controle PID. Este código lê o MPU6050, calcula os ângulos com filtro complementar, aplica PID e envia sinais para os motores.",
                codigo: "drone_voo.ino"
            },
            {
                numero: 8,
                titulo: "Teste de Voo (COM SEGURANÇA)",
                descricao: "⚠️ USE EM ÁREA ABERTA, SEM PESSOAS PRÓXIMAS. Coloque o drone no chão. Ligue o rádio. Ligue o drone. AUMENTE O THROTTLE LENTAMENTE. O drone deve começar a pairar. Se pender para um lado, ajuste os trims no rádio. NÃO tente voar alto no primeiro teste — mantenha a 30cm do chão.",
                imagem: null
            },
        ],

        codigoFonte: {
            "diagrama_drone.txt": `LIGACOES ELETRICAS — DRONE ARDUINO
=====================================

MPU6050 (sensor de orientacao):
VCC  -> Arduino 5V
GND  -> Arduino GND
SDA  -> Arduino A4
SCL  -> Arduino A5

ESCs (controladores dos motores):
ESC1 (Motor Frente Esquerdo)  Sinal -> Arduino pino 3
ESC2 (Motor Frente Direito)   Sinal -> Arduino pino 5
ESC3 (Motor Traseiro Esquerdo) Sinal -> Arduino pino 6
ESC4 (Motor Traseiro Direito)  Sinal -> Arduino pino 9

RECEPTOR (Radio Controle):
Canal 1 (Roll)    -> Arduino A0
Canal 2 (Pitch)   -> Arduino A1
Canal 3 (Throttle)-> Arduino A2
Canal 4 (Yaw)     -> Arduino A3

ALIMENTACAO:
Bateria 3S (11.1V) -> PDB -> ESCs (todos em paralelo)
PDB 5V (regulador) -> Arduino 5V (NAO alimente pela USB durante voo)`,

            "calibrar_escs.ino": `// Idenza Academy — Calibracao de ESCs
#include <Servo.h>

Servo esc1, esc2, esc3, esc4;

void setup() {
  Serial.begin(9600);
  
  esc1.attach(3, 1000, 2000);
  esc2.attach(5, 1000, 2000);
  esc3.attach(6, 1000, 2000);
  esc4.attach(9, 1000, 2000);
  
  Serial.println("CALIBRACAO DE ESCs");
  Serial.println("1. Coloque o throttle do radio no MAXIMO");
  Serial.println("2. Ligue o drone (bateria)");
  Serial.println("3. Aguarde os beeps de calibracao");
  Serial.println("4. Coloque o throttle no MINIMO");
  Serial.println("5. Aguarde os beeps de confirmacao");
  
  // Envia sinal maximo
  esc1.writeMicroseconds(2000);
  esc2.writeMicroseconds(2000);
  esc3.writeMicroseconds(2000);
  esc4.writeMicroseconds(2000);
  
  delay(5000);  // Aguarda usuario ligar e ouvir beeps
  
  // Envia sinal minimo
  esc1.writeMicroseconds(1000);
  esc2.writeMicroseconds(1000);
  esc3.writeMicroseconds(1000);
  esc4.writeMicroseconds(1000);
  
  Serial.println("Calibracao concluida! Desligue o drone.");
}

void loop() {}`,

            "drone_voo.ino": `// Idenza Academy — Firmware de Voo Drone Arduino
// Controle PID para estabilizacao de quadricoptero

#include <Wire.h>
#include <MPU6050.h>
#include <Servo.h>

MPU6050 mpu;
Servo motor1, motor2, motor3, motor4;

// Leituras do radio (0-1000)
volatile int throttle = 0, roll = 0, pitch = 0, yaw = 0;

// Angulos atuais (filtro complementar)
float angRoll = 0, angPitch = 0, angYaw = 0;

// PID — Ganhos (AJUSTAVEIS)
float Kp = 1.2, Ki = 0.005, Kd = 0.8;
float erroRoll = 0, erroPitch = 0, erroYaw = 0;
float integralRoll = 0, integralPitch = 0, integralYaw = 0;
float lastErrorRoll = 0, lastErrorPitch = 0, lastErrorYaw = 0;

unsigned long lastTime = 0;

void setup() {
  Serial.begin(115200);
  Wire.begin();
  mpu.initialize();
  
  motor1.attach(3, 1000, 2000);
  motor2.attach(5, 1000, 2000);
  motor3.attach(6, 1000, 2000);
  motor4.attach(9, 1000, 2000);
  
  // Inicializa motores parados
  motor1.writeMicroseconds(1000);
  motor2.writeMicroseconds(1000);
  motor3.writeMicroseconds(1000);
  motor4.writeMicroseconds(1000);
  
  // Configura interrupcoes para leitura do radio
  pinMode(2, INPUT);  // Interrupcao para throttle
  attachInterrupt(digitalPinToInterrupt(2), lerRadio, CHANGE);
  
  lastTime = millis();
}

void loop() {
  unsigned long now = millis();
  float dt = (now - lastTime) / 1000.0;
  if (dt < 0.002) return;  // 500Hz max
  lastTime = now;
  
  // Ler MPU6050
  int16_t ax, ay, az, gx, gy, gz;
  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);
  
  // Calcular angulos com filtro complementar
  float accRoll = atan2(ay, az) * 180 / PI;
  float accPitch = atan2(-ax, sqrt(ay*ay + az*az)) * 180 / PI;
  float gyroRoll = gx / 131.0;
  float gyroPitch = gy / 131.0;
  float gyroYaw = gz / 131.0;
  
  angRoll = 0.98 * (angRoll + gyroRoll * dt) + 0.02 * accRoll;
  angPitch = 0.98 * (angPitch + gyroPitch * dt) + 0.02 * accPitch;
  angYaw += gyroYaw * dt;
  
  // PID Roll
  erroRoll = roll - angRoll;
  integralRoll += erroRoll * dt;
  float derivRoll = (erroRoll - lastErrorRoll) / dt;
  float pidRoll = Kp * erroRoll + Ki * integralRoll + Kd * derivRoll;
  lastErrorRoll = erroRoll;
  
  // PID Pitch
  erroPitch = pitch - angPitch;
  integralPitch += erroPitch * dt;
  float derivPitch = (erroPitch - lastErrorPitch) / dt;
  float pidPitch = Kp * erroPitch + Ki * integralPitch + Kd * derivPitch;
  lastErrorPitch = erroPitch;
  
  // PID Yaw
  erroYaw = yaw - angYaw;
  integralYaw += erroYaw * dt;
  float derivYaw = (erroYaw - lastErrorYaw) / dt;
  float pidYaw = Kp * erroYaw + Ki * integralYaw + Kd * derivYaw;
  lastErrorYaw = erroYaw;
  
  // Calcular saidas dos motores
  int m1 = throttle + pidRoll - pidPitch - pidYaw;  // Frente Esq
  int m2 = throttle - pidRoll + pidPitch - pidYaw;  // Frente Dir
  int m3 = throttle + pidRoll + pidPitch + pidYaw;  // Tras Esq
  int m4 = throttle - pidRoll - pidPitch + pidYaw;  // Tras Dir
  
  m1 = constrain(m1, 1000, 2000);
  m2 = constrain(m2, 1000, 2000);
  m3 = constrain(m3, 1000, 2000);
  m4 = constrain(m4, 1000, 2000);
  
  motor1.writeMicroseconds(m1);
  motor2.writeMicroseconds(m2);
  motor3.writeMicroseconds(m3);
  motor4.writeMicroseconds(m4);
}

void lerRadio() {
  throttle = pulseIn(A2, HIGH);
  roll = map(pulseIn(A0, HIGH), 1000, 2000, -30, 30);
  pitch = map(pulseIn(A1, HIGH), 1000, 2000, -30, 30);
  yaw = map(pulseIn(A3, HIGH), 1000, 2000, -30, 30);
}`,
        },

        dicas: [
            "⚠️ SEGURANÇA PRIMEIRO: sempre teste em área aberta, sem pessoas, com hélices bem fixadas",
            "Calibre os ESCs SEM as hélices instaladas — motores podem disparar inesperadamente",
            "Os ganhos PID (Kp, Ki, Kd) PRECISAM ser ajustados para seu drone específico — comece com Kp baixo",
            "Bateria 3S 2200mAh dá ~8 minutos de voo — pouse com 3.7V por célula (11.1V total)",
            "Se o drone oscilar: reduza Kp. Se demorar para responder: aumente Kp.",
            "NUNCA voe perto de pessoas, animais ou janelas — hélices machucam",
        ],
    },

    // ============================================================
    // ROBÔ 9: HEXAPOD 18 SERVOS
    // ============================================================
    {
        id: "hexapod",
        nome: "Hexapod",
        tipo: "Robô de 6 Pernas com 18 Servos",
        dificuldade: "avançado",
        custo: "$180",
        tempo: "30 horas",
        pecas: 35,
        impressao3d: true,
        arquivos3D: "https://www.thingiverse.com/thing:hexapod-18dof",
        comunidade: null,
        github: "https://github.com/vorpalhex/hexapod",
        video: null,

        descricao: "Um robô de 6 pernas com 3 servos por perna (18 no total) que caminha como um inseto. Controlado por Arduino Mega e driver PCA9685, este robô executa marcha tripodal (3 pernas no chão, 3 no ar) e pode virar, andar para trás e até dançar. O projeto mais impressionante para aprender cinemática multi-pernas.",

        aprendizado: [
            "Montagem de robô hexápode com 18 graus de liberdade",
            "Controle de 18 servos via PCA9685 e I²C",
            "Marcha tripodal — o padrão de caminhada dos insetos",
            "Cinemática inversa para posicionamento das patas",
            "Movimentos complexos: virar, girar no lugar, marcha rápida",
        ],
        preRequisitos: ["Arduino intermediário", "Experiência com múltiplos servos", "Paciência"],

        bom: [
            { item: "Arduino Mega 2560", qtd: 1, preco: "$12.00", funcao: "Cérebro com muitos pinos", link: null },
            { item: "Driver PCA9685 (16 canais)", qtd: 2, preco: "$5.00", funcao: "Controlar 18 servos via I²C", link: null },
            { item: "Servo MG996R", qtd: 18, preco: "$6.00", funcao: "3 por pata × 6 pernas", link: null },
            { item: "Bateria LiPo 7.4V 5000mAh", qtd: 1, preco: "$30.00", funcao: "Alimentação (~25 min)", link: null },
            { item: "Regulador 5V 10A", qtd: 1, preco: "$12.00", funcao: "Corrente para 18 servos", link: null },
            { item: "Filamento PLA", qtd: 2, preco: "$25.00", funcao: "Corpo, 6 pernas (coxa + tíbia + pé)", link: null },
            { item: "Parafusos M3 e standoffs", qtd: 60, preco: "$5.00", funcao: "Fixação", link: null },
            { item: "Capacitores 470μF", qtd: 6, preco: "$3.00", funcao: "Filtro de ruído nos servos", link: null },
        ],
        ferramentas: [
            "Impressora 3D (muitas peças!)",
            "Chave Allen M3",
            "Ferro de solda",
            "Multímetro",
            "Computador com Arduino IDE",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Imprimir Todas as Peças",
                descricao: "Cada perna tem 3 segmentos: coxa, tíbia e pé. Imprima 6 conjuntos = 18 peças. Mais o corpo central (2 metades). Use PLA com 25% de preenchimento. Tempo total de impressão: ~15 horas.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Montar Cada Perna",
                descricao: "Cada perna tem 3 servos: 1 na base (junta ao corpo, move horizontalmente), 1 no meio (coxa, move verticalmente), 1 na ponta (joelho/tíbia). Monte as 6 pernas primeiro, depois fixe-as no corpo. Use parafusos M3.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Instalar os PCA9685",
                descricao: "Use 2 PCA9685 para controlar 18 servos. Endereço do primeiro: 0x40, segundo: 0x41 (solde o jumper A0). Conecte ao Arduino: SDA→20, SCL→21. Cada PCA9685 controla 9 servos (3 pernas).",
                imagem: null,
                codigo: "diagrama_hexapod.txt"
            },
            {
                numero: 4,
                titulo: "Alimentação",
                descricao: "Bateria 7.4V → Regulador 5V 10A → PCA9685 (VCC). Use fios GROSSOS (18 AWG) para a alimentação principal. Adicione capacitores de 470μF entre VCC e GND em cada PCA9685 para filtrar ruído dos 18 servos.",
                imagem: null
            },
            {
                numero: 5,
                titulo: "Calibrar Posição Inicial",
                descricao: "Carregue o código de calibração. Todos os 18 servos devem estar em posição neutra (90°). Ajuste mecanicamente os chifres dos servos para que as pernas fiquem simétricas.",
                codigo: "calibrar_hexapod.ino"
            },
            {
                numero: 6,
                titulo: "Carregar Firmware da Marcha",
                descricao: "Carregue o código da marcha tripodal. O robô move 3 pernas de cada vez (alternando), mantendo equilíbrio estável. Teste em superfície plana.",
                codigo: "hexapod_marcha.ino"
            },
        ],

        codigoFonte: {
            "diagrama_hexapod.txt": `LIGACOES HEXAPOD 18 SERVOS
=============================
PCA9685 #1 (Endereco 0x40) — Pernas 1,2,3 (lado direito):
Canal 0: Perna 1 — Coxa (base)
Canal 1: Perna 1 — Femur (meio)
Canal 2: Perna 1 — Tibia (ponta)
Canal 3: Perna 2 — Coxa
Canal 4: Perna 2 — Femur
Canal 5: Perna 2 — Tibia
Canal 6: Perna 3 — Coxa
Canal 7: Perna 3 — Femur
Canal 8: Perna 3 — Tibia

PCA9685 #2 (Endereco 0x41) — Pernas 4,5,6 (lado esquerdo):
Canal 0: Perna 4 — Coxa
Canal 1: Perna 4 — Femur
Canal 2: Perna 4 — Tibia
Canal 3: Perna 5 — Coxa
Canal 4: Perna 5 — Femur
Canal 5: Perna 5 — Tibia
Canal 6: Perna 6 — Coxa
Canal 7: Perna 6 — Femur
Canal 8: Perna 6 — Tibia

ALIMENTACAO:
Bateria 7.4V -> Regulador 5V 10A -> PCA9685 #1 e #2 (VCC em paralelo)
TODOS os GNDs conectados juntos (bateria, Arduino, PCA9685)`,

            "hexapod_marcha.ino": `// Idenza Academy — Marcha Tripodal Hexapod 18 Servos
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm1 = Adafruit_PWMServoDriver(0x40);
Adafruit_PWMServoDriver pwm2 = Adafruit_PWMServoDriver(0x41);

// Estrutura de cada perna: coxa, femur, tibia
struct Perna {
  int coxa, femur, tibia;
  int coxa_centro, femur_centro, tibia_centro;
};

Perna pernas[6] = {
  {0, 1, 2, 90, 90, 90},   // Perna 1 (pwm1)
  {3, 4, 5, 90, 90, 90},   // Perna 2 (pwm1)
  {6, 7, 8, 90, 90, 90},   // Perna 3 (pwm1)
  {0, 1, 2, 90, 90, 90},   // Perna 4 (pwm2)
  {3, 4, 5, 90, 90, 90},   // Perna 5 (pwm2)
  {6, 7, 8, 90, 90, 90},   // Perna 6 (pwm2)
};

const int STEP_HEIGHT = 40;
const int STEP_LENGTH = 25;
const int STEP_DELAY = 80;

void setup() {
  pwm1.begin();
  pwm2.begin();
  pwm1.setPWMFreq(60);
  pwm2.setPWMFreq(60);
  posicaoInicial();
  delay(2000);
}

void loop() {
  andarFrente(5);
  delay(1000);
  virarDireita(3);
  delay(1000);
}

void posicaoInicial() {
  for (int i = 0; i < 6; i++) {
    moverServo(i, 'c', pernas[i].coxa_centro);
    moverServo(i, 'f', pernas[i].femur_centro);
    moverServo(i, 't', pernas[i].tibia_centro);
  }
}

void andarFrente(int passos) {
  for (int p = 0; p < passos; p++) {
    // Grupo A (pernas 0,2,4): levantam e avancam
    for (int i : {0, 2, 4}) {
      moverServo(i, 't', pernas[i].tibia_centro - STEP_HEIGHT);
    }
    delay(STEP_DELAY);
    for (int i : {0, 2, 4}) {
      moverServo(i, 'c', pernas[i].coxa_centro + STEP_LENGTH);
    }
    delay(STEP_DELAY);
    for (int i : {0, 2, 4}) {
      moverServo(i, 't', pernas[i].tibia_centro);
    }
    delay(STEP_DELAY);
    
    // Grupo B (pernas 1,3,5): levantam e avancam
    for (int i : {1, 3, 5}) {
      moverServo(i, 't', pernas[i].tibia_centro - STEP_HEIGHT);
    }
    delay(STEP_DELAY);
    for (int i : {1, 3, 5}) {
      moverServo(i, 'c', pernas[i].coxa_centro - STEP_LENGTH);
    }
    delay(STEP_DELAY);
    for (int i : {1, 3, 5}) {
      moverServo(i, 't', pernas[i].tibia_centro);
    }
    delay(STEP_DELAY);
  }
}

void virarDireita(int passos) {
  for (int p = 0; p < passos; p++) {
    for (int i = 0; i < 6; i++) {
      moverServo(i, 'c', pernas[i].coxa_centro + (i < 3 ? 30 : -30));
    }
    delay(STEP_DELAY * 3);
    posicaoInicial();
    delay(STEP_DELAY);
  }
}

void moverServo(int perna, char junta, int angulo) {
  angulo = constrain(angulo, 0, 180);
  int pulso = map(angulo, 0, 180, 102, 512);
  int canal;
  
  if (junta == 'c') canal = pernas[perna].coxa;
  else if (junta == 'f') canal = pernas[perna].femur;
  else canal = pernas[perna].tibia;
  
  if (perna < 3) pwm1.setPWM(canal, 0, pulso);
  else pwm2.setPWM(canal, 0, pulso);
}`,
        },

        dicas: [
            "18 servos consomem MUITA corrente — fonte de 10A é o MÍNIMO",
            "Se o robô não ficar em pé: verifique a posição inicial de cada servo",
            "A marcha tripodal é a mais estável — 3 pernas sempre no chão",
            "Imprima pernas extras — MG996R pode quebrar peças em quedas",
            "Use abraçadeiras para organizar os 54 fios (18 servos × 3 fios)",
        ],
    },

    // ============================================================
    // ROBÔ 10: ROBÔ DE TELEPRESENÇA
    // ============================================================
    {
        id: "telepresenca",
        nome: "Robô de Telepresença",
        tipo: "Robô Móvel com Tablet e Videochamada",
        dificuldade: "avançado",
        custo: "$350",
        tempo: "25 horas",
        pecas: 20,
        impressao3d: true,
        arquivos3D: "https://www.thingiverse.com/thing:telepresence-robot",
        comunidade: null,
        github: null,
        video: null,

        descricao: "Um robô sobre rodas com suporte para tablet ou celular que permite fazer videochamadas enquanto você pilota o robô remotamente. Ideal para visitar lugares à distância, monitorar ambientes ou participar de eventos remotamente. Usa Raspberry Pi, câmera e controle via WiFi.",

        aprendizado: [
            "Montagem de robô com streaming de vídeo em tempo real",
            "Configuração de servidor WebRTC no Raspberry Pi",
            "Controle remoto via página web (joystick virtual)",
            "Integração de câmera USB com streaming",
            "Uso de ponte H para controle de motores DC",
        ],
        preRequisitos: ["Linux básico", "Rede WiFi", "Python básico"],

        bom: [
            { item: "Raspberry Pi 5 (4GB)", qtd: 1, preco: "$60.00", funcao: "Computador de bordo", link: null },
            { item: "Câmera USB HD 1080p", qtd: 1, preco: "$25.00", funcao: "Câmera frontal", link: null },
            { item: "Tablet ou celular (para videochamada)", qtd: 1, preco: "$100.00", funcao: "Tela para comunicação", link: null },
            { item: "Driver Motor L298N", qtd: 1, preco: "$6.00", funcao: "Controle dos motores", link: null },
            { item: "Motores DC 12V com encoder", qtd: 2, preco: "$20.00", funcao: "Tração", link: null },
            { item: "Rodas 80mm", qtd: 2, preco: "$10.00", funcao: "Rodas grandes para deslocamento suave", link: null },
            { item: "Bateria LiPo 12V 5000mAh", qtd: 1, preco: "$35.00", funcao: "Alimentação", link: null },
            { item: "Power bank 5V 10000mAh (para Pi)", qtd: 1, preco: "$20.00", funcao: "Alimentar Raspberry Pi", link: null },
            { item: "Filamento PLA + suporte tablet", qtd: 1, preco: "$15.00", funcao: "Estrutura", link: null },
            { item: "Parafusos e cabos", qtd: 20, preco: "$5.00", funcao: "Fixação", link: null },
        ],
        ferramentas: [
            "Impressora 3D",
            "Chave de fenda",
            "Computador com acesso SSH",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Montar Chassi e Suporte do Tablet",
                descricao: "Imprima a base com espaço para Raspberry Pi, bateria e driver L298N. Imprima o suporte articulado para tablet (ajustável em altura e ângulo).",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Instalar Motores e Eletrônica",
                descricao: "Fixe os motores com rodas na base. Conecte ao L298N. Conecte o L298N aos GPIOs do Raspberry Pi. Fixe a câmera USB na parte superior do suporte.",
                imagem: null,
                codigo: "gpio_motores.txt"
            },
            {
                numero: 3,
                titulo: "Configurar o Raspberry Pi",
                descricao: "Instale o Raspberry Pi OS. Habilite câmera e I²C via raspi-config. Instale os pacotes: python3-flask, python3-opencv, python3-rpi.gpio.",
                codigo: "setup_pi.sh"
            },
            {
                numero: 4,
                titulo: "Executar Servidor Web",
                descricao: "Execute o script Python que cria um servidor web com streaming de vídeo e controles. Acesse de qualquer navegador na mesma rede WiFi.",
                codigo: "telepresenca_server.py"
            },
            {
                numero: 5,
                titulo: "Testar Pilotagem Remota",
                descricao: "Conecte o celular/tablet ao WiFi do robô. Abra o navegador no IP do Raspberry Pi. Use o joystick virtual para pilotar o robô enquanto vê o vídeo ao vivo!",
                imagem: null
            },
        ],

        codigoFonte: {
            "setup_pi.sh": `#!/bin/bash
sudo apt update
sudo apt install -y python3-pip python3-opencv python3-flask
pip3 install rpi-lgpio flask-socketio
echo "dtoverlay=dwc2" | sudo tee -a /boot/config.txt
sudo systemctl enable ssh
echo "Setup concluido! Reinicie o Raspberry Pi."`,

            "telepresenca_server.py": `# Idenza Academy — Servidor Web Robo de Telepresenca
from flask import Flask, render_template_string, Response
import cv2
import RPi.GPIO as GPIO
import time

app = Flask(__name__)

# Pinos dos motores
IN1, IN2 = 17, 18
IN3, IN4 = 22, 23

GPIO.setmode(GPIO.BCM)
for pin in [IN1, IN2, IN3, IN4]:
    GPIO.setup(pin, GPIO.OUT)
    GPIO.output(pin, 0)

camera = cv2.VideoCapture(0)

HTML = """
<!DOCTYPE html>
<html><head>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a1a1a;color:#fff;font-family:Arial;text-align:center}
h1{color:#D4AF37;padding:10px;font-size:1.2rem}
img{width:100%;max-width:640px;border-radius:10px}
.btns{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;max-width:300px;margin:15px auto}
button{padding:15px;border:none;border-radius:10px;font-size:1.2rem;cursor:pointer;background:#333;color:#fff}
button:active{background:#D4AF37}
</style></head><body>
<h1>Idenza Telepresenca</h1>
<img src="/video">
<div class="btns">
<button onclick="fetch('/esq')">⬅️</button>
<button onclick="fetch('/frente')">⬆️</button>
<button onclick="fetch('/dir')">➡️</button>
<button onclick="fetch('/tras')">⬇️</button>
<button onclick="fetch('/parar')" style="background:#c62828">🛑</button>
</div>
</body></html>"""

@app.route('/')
def index():
    return HTML

def gen_frames():
    while True:
        success, frame = camera.read()
        if not success: break
        _, buffer = cv2.imencode('.jpg', frame)
        yield (b'--frame\\r\\nContent-Type: image/jpeg\\r\\n\\r\\n' + buffer.tobytes() + b'\\r\\n')

@app.route('/video')
def video():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/frente')
def frente():
    GPIO.output(IN1,1);GPIO.output(IN2,0);GPIO.output(IN3,1);GPIO.output(IN4,0)
    return 'OK'

@app.route('/tras')
def tras():
    GPIO.output(IN1,0);GPIO.output(IN2,1);GPIO.output(IN3,0);GPIO.output(IN4,1)
    return 'OK'

@app.route('/esq')
def esq():
    GPIO.output(IN1,0);GPIO.output(IN2,1);GPIO.output(IN3,1);GPIO.output(IN4,0)
    return 'OK'

@app.route('/dir')
def dir():
    GPIO.output(IN1,1);GPIO.output(IN2,0);GPIO.output(IN3,0);GPIO.output(IN4,1)
    return 'OK'

@app.route('/parar')
def parar():
    for p in [IN1,IN2,IN3,IN4]: GPIO.output(p,0)
    return 'OK'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)`,
        },

        dicas: [
            "Use um tablet Android antigo — funciona perfeitamente e reduz custo",
            "O suporte do tablet deve ser robusto — quedas são caras",
            "Streaming de vídeo consome bateria — power bank de 10000mAh dura ~4 horas",
            "Para acesso remoto fora de casa, configure VPN (Tailscale é gratuito e fácil)",
        ],
    },
];

// Exportação
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IDENZA_ROBOS_DATABASE;
}
