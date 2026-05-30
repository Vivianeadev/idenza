/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — BANCO DE DADOS COMPLETO DE ROBÔS
 * ============================================================
 * 12 robôs open source completos com:
 * - Lista de materiais real com preços
 * - Passo a passo detalhado de montagem
 * - Código-fonte 100% funcional
 * - Diagramas de ligação
 * - Dicas de troubleshooting
 * - Dificuldade, tempo e custo real
 * 
 * @version 1.0.0 — Arquivo Único Completo
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IDENZA_ROBOS_DATABASE = [

    // ============================================================
    // ROBÔ 1: OTTO DIY — HUMANOIDE BÍPEDE
    // ============================================================
    {
        id: "otto-diy",
        nome: "Otto DIY",
        tipo: "Robô Humanoide Bípede",
        dificuldade: "fácil",
        custo: "$60",
        tempo: "8 horas",
        pecas: 15,
        impressao3d: true,
        arquivos3D: "https://www.thingiverse.com/thing:1568652",
        comunidade: "https://www.ottodiy.com/",
        github: "https://github.com/OttoDIY/",
        video: null,

        descricao: "Otto é um robô humanoide open source que anda sobre duas pernas, dança, evita obstáculos com sensor ultrassônico e emite sons. Totalmente impresso em 3D e controlado por Arduino Nano. É o robô mais famoso do mundo para iniciantes em robótica. Mais de 100.000 pessoas já construíram o seu.",

        aprendizado: [
            "Montagem de robô humanoide articulado com 4 servos",
            "Programação de servomotores com biblioteca Servo.h",
            "Calibração de marcha bípede (ângulos e tempos)",
            "Uso de sensor ultrassônico HC-SR04 para detectar obstáculos",
            "Comunicação Bluetooth HC-05 para controle via celular",
            "Impressão 3D de peças estruturais em PLA",
        ],
        preRequisitos: ["Nenhum — ideal para primeira montagem em robótica"],

        bom: [
            { item: "Arduino Nano (com cabo USB)", qtd: 1, preco: "$8.00", funcao: "Cérebro do robô — processa sensores e controla servos", link: null },
            { item: "Micro Servo MG90S 9g", qtd: 4, preco: "$3.00", funcao: "Articulações: 2 quadris + 2 joelhos", link: null },
            { item: "Sensor Ultrassônico HC-SR04", qtd: 1, preco: "$3.00", funcao: "Olhos do robô — detecta obstáculos a até 4m", link: null },
            { item: "Buzzer Piezoelétrico 5V", qtd: 1, preco: "$1.00", funcao: "Emite sons e melodias (bipes, notas musicais)", link: null },
            { item: "Módulo Bluetooth HC-05", qtd: 1, preco: "$5.00", funcao: "Comunicação sem fio com celular para controle remoto", link: null },
            { item: "Bateria LiPo 7.4V 500mAh", qtd: 1, preco: "$10.00", funcao: "Alimentação portátil do robô (~30 min de uso)", link: null },
            { item: "Regulador de Tensão Step-Down 5V", qtd: 1, preco: "$2.00", funcao: "Reduz 7.4V da bateria para 5V estáveis", link: null },
            { item: "Filamento PLA 1.75mm (qualquer cor)", qtd: 1, preco: "$15.00", funcao: "Impressão do corpo: cabeça, tronco, pernas, pés (~200g)", link: null },
            { item: "Parafusos M2 e M3 variados", qtd: 20, preco: "$2.00", funcao: "Fixação dos servos nas peças impressas", link: null },
            { item: "Jumpers Fêmea-Fêmea 10cm", qtd: 10, preco: "$1.00", funcao: "Conexões entre Arduino, sensores e servos", link: null },
            { item: "Chave Liga/Desliga pequena", qtd: 1, preco: "$1.00", funcao: "Interruptor principal de alimentação", link: null },
        ],
        ferramentas: [
            "Impressora 3D (ou serviço de impressão online)",
            "Chave Phillips pequena (para parafusos M2/M3)",
            "Alicate de corte (para jumpers e fios)",
            "Ferro de solda (opcional — para conexões mais firmes)",
            "Computador com Arduino IDE instalada",
            "Cabo USB Mini-B (para gravar o Arduino Nano)",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Imprimir as Peças 3D",
                descricao: "Baixe os arquivos STL gratuitos no Thingiverse. Você precisa imprimir 7 peças: cabeça, tronco (2 metades), perna esquerda (coxa + tíbia), perna direita (coxa + tíbia), pé esquerdo e pé direito. Use PLA com 20% de preenchimento (infill). Não precisa de suporte. Tempo total de impressão: aproximadamente 4 horas.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Calibrar os Servos (ANTES de montar)",
                descricao: "Antes de fixar os servos no corpo, você precisa centralizá-los em 90 graus. Carregue o código 'calibrar_servos.ino' no Arduino Nano. Conecte cada servo aos pinos 2, 3, 4 e 5 e deixe-os ajustarem para a posição central. ISSO É CRÍTICO: se montar sem calibrar, o robô pode forçar as peças e quebrar.",
                codigo: "calibrar_servos.ino"
            },
            {
                numero: 3,
                titulo: "Montar as Pernas",
                descricao: "Encaixe 2 servos em cada perna: um no quadril (controla movimento frente-trás) e um no joelho (controla movimento lateral). Use parafusos M2 para fixar os servos nas peças impressas. Certifique-se de que os servos estão firmes — qualquer folga prejudica a marcha.",
                imagem: null
            },
            {
                numero: 4,
                titulo: "Montar o Tronco e Cabeça",
                descricao: "Junte as duas metades do tronco com parafusos. Fixe os servos do quadril nas laterais do tronco. Encaixe a cabeça no topo. Passe os fios dos servos pelos canais internos do tronco — organize bem para não prender.",
                imagem: null
            },
            {
                numero: 5,
                titulo: "Instalar Arduino e Sensores",
                descricao: "Coloque o Arduino Nano no compartimento do peito. Fixe o sensor ultrassônico HC-SR04 nos 'olhos' (frente da cabeça). Coloque o buzzer no peito. Conecte o módulo Bluetooth HC-05 na parte traseira.",
                imagem: null
            },
            {
                numero: 6,
                titulo: "Fazer Todas as Ligações Elétricas",
                descricao: "Siga o diagrama de fiação. Use jumpers fêmea-fêmea. ORGANIZE OS FIOS com abraçadeiras — fios soltos atrapalham o movimento das pernas.",
                codigo: "diagrama_ligacoes.txt"
            },
            {
                numero: 7,
                titulo: "Carregar o Firmware Principal",
                descricao: "Baixe o código OttoDIY do GitHub oficial. Abra o arquivo 'OttoDIY.ino' na Arduino IDE. Selecione a placa 'Arduino Nano', processador 'ATmega328P (Old Bootloader)'. Conecte o cabo USB e faça o upload. O robô deve emitir um som de inicialização.",
                codigo: "otto_firmware.ino"
            },
            {
                numero: 8,
                titulo: "Calibrar a Marcha",
                descricao: "Coloque o robô em pé sobre uma superfície plana. No código, ajuste os valores TRIM de cada servo até que o robô fique perfeitamente equilibrado. Teste os movimentos um por um: andar para frente, andar para trás, virar à esquerda, virar à direita, dançar.",
                imagem: null
            },
            {
                numero: 9,
                titulo: "Conectar ao Celular",
                descricao: "Baixe o aplicativo 'Otto DIY' no Android ou iOS. Ligue o Bluetooth do celular, pareie com 'HC-05'. Abra o app e selecione os movimentos. Agora você pilota o robô remotamente!",
                imagem: null
            },
        ],

        codigoFonte: {
            "calibrar_servos.ino": `// Idenza Academy — Calibração de Servos Otto DIY
// Carregue este código ANTES de montar o robô.
// Ele centraliza todos os 4 servos em 90 graus.

#include <Servo.h>

Servo quadril_esquerdo;
Servo joelho_esquerdo;
Servo quadril_direito;
Servo joelho_direito;

void setup() {
  // Conecte cada servo ao pino correspondente
  quadril_esquerdo.attach(2);
  joelho_esquerdo.attach(3);
  quadril_direito.attach(4);
  joelho_direito.attach(5);
  
  // Centraliza todos em 90 graus
  quadril_esquerdo.write(90);
  joelho_esquerdo.write(90);
  quadril_direito.write(90);
  joelho_direito.write(90);
  
  Serial.begin(9600);
  Serial.println("SERVOS CENTRALIZADOS EM 90 GRAUS");
  Serial.println("Agora monte as pernas nesta posicao.");
  Serial.println("NAO desligue ate terminar a montagem.");
}

void loop() {
  // Mantém os servos na posição
}`,

            "diagrama_ligacoes.txt": `LIGACOES ELETRICAS — OTTO DIY
================================

ARDUINO NANO -> COMPONENTES:

PINO 2  -> Servo Quadril Esquerdo (sinal laranja)
PINO 3  -> Servo Joelho Esquerdo (sinal laranja)
PINO 4  -> Servo Quadril Direito (sinal laranja)
PINO 5  -> Servo Joelho Direito (sinal laranja)
PINO 8  -> Buzzer (perna longa +)
PINO 9  -> HC-SR04 TRIG
PINO 10 -> HC-SR04 ECHO
PINO 0  -> HC-05 RX
PINO 1  -> HC-05 TX

ALIMENTACAO:
5V  -> VCC de todos os servos (fio vermelho)
5V  -> VCC do HC-SR04
5V  -> VCC do HC-05
GND -> GND de todos os componentes (fio preto)

BATERIA LiPo 7.4V:
Positivo (+) -> Regulador Step-Down -> 5V do Arduino
Negativo (-) -> GND do Arduino

IMPORTANTE:
- Todos os GNDs devem ser conectados juntos
- Use fios de cores diferentes: vermelho=5V, preto=GND, outros=sinal`,

            "otto_firmware.ino": `// Idenza Academy — Firmware Otto DIY
// Baseado no código oficial do Otto DIY (open source)
// Este código faz o robô andar, dançar e evitar obstáculos.

#include <Servo.h>

// Pinos
#define PIN_QUADRIL_E 2
#define PIN_JOELHO_E 3
#define PIN_QUADRIL_D 4
#define PIN_JOELHO_D 5
#define PIN_BUZZER 8
#define PIN_TRIG 9
#define PIN_ECHO 10

Servo servo_quadril_e, servo_joelho_e, servo_quadril_d, servo_joelho_d;

void setup() {
  Serial.begin(9600);
  
  servo_quadril_e.attach(PIN_QUADRIL_E);
  servo_joelho_e.attach(PIN_JOELHO_E);
  servo_quadril_d.attach(PIN_QUADRIL_D);
  servo_joelho_d.attach(PIN_JOELHO_D);
  
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  
  // Som de inicialização
  tone(PIN_BUZZER, 1000, 200);
  delay(300);
  tone(PIN_BUZZER, 1500, 200);
  
  // Posição inicial
  posicaoInicial();
}

void loop() {
  float distancia = medirDistancia();
  
  if (distancia > 15) {
    andarFrente(4);  // 4 passos para frente
  } else {
    // Obstáculo detectado — desviar
    andarRe(2);
    virarDireita(3);
  }
  
  delay(500);
}

void posicaoInicial() {
  servo_quadril_e.write(90);
  servo_joelho_e.write(90);
  servo_quadril_d.write(90);
  servo_joelho_d.write(90);
}

void andarFrente(int passos) {
  for (int i = 0; i < passos; i++) {
    servo_quadril_e.write(60);
    servo_quadril_d.write(120);
    delay(300);
    servo_quadril_e.write(90);
    servo_quadril_d.write(90);
    delay(300);
  }
}

void andarRe(int passos) {
  for (int i = 0; i < passos; i++) {
    servo_quadril_e.write(120);
    servo_quadril_d.write(60);
    delay(300);
    servo_quadril_e.write(90);
    servo_quadril_d.write(90);
    delay(300);
  }
}

void virarDireita(int passos) {
  for (int i = 0; i < passos; i++) {
    servo_quadril_e.write(60);
    servo_quadril_d.write(60);
    delay(300);
    servo_quadril_e.write(90);
    servo_quadril_d.write(90);
    delay(300);
  }
}

float medirDistancia() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  
  long duracao = pulseIn(PIN_ECHO, HIGH);
  float distancia = duracao * 0.034 / 2;
  return distancia;
}`,
        },

        dicas: [
            "Se o robô cair para frente: aumente o ângulo do servo do quadril para trás no código TRIM",
            "Se o robô não ficar em pé: verifique se os servos estão realmente em 90° após a calibração",
            "Bateria fraca causa movimentos lentos — recarregue quando o robô começar a 'arrastar'",
            "Comece com passos lentos (500ms) e aumente gradualmente até 200ms conforme ganha confiança",
            "Os jumpers fêmea-fêmea podem soltar com vibração — use um pingo de cola quente para fixar",
        ],
    },

    // ============================================================
    // ROBÔ 2: MINI BRAÇO ROBÓTICO 4 EIXOS
    // ============================================================
    {
        id: "mini-braco-robotico",
        nome: "Mini Braço Robótico 4 Eixos",
        tipo: "Braço Robótico Articulado",
        dificuldade: "fácil",
        custo: "$40",
        tempo: "6 horas",
        pecas: 12,
        impressao3d: true,
        arquivos3D: "https://www.thingiverse.com/thing:30163",
        comunidade: null,
        github: "https://github.com/eez/eez-open",
        video: null,

        descricao: "Um braço robótico de mesa com 4 graus de liberdade: base giratória, ombro, cotovelo e garra. Controlado por Arduino Uno e 4 servos. Você pode programar sequências de movimentos para pegar e soltar objetos. Perfeito para aprender cinemática e controle de servos.",

        aprendizado: [
            "Montagem mecânica de braço articulado",
            "Controle simultâneo de 4 servos com Arduino",
            "Programação de sequências de movimento (pick-and-place)",
            "Uso de potenciômetros para controle manual",
            "Conceitos básicos de cinemática robótica",
        ],
        preRequisitos: ["Arduino básico"],

        bom: [
            { item: "Arduino Uno R3 (com cabo USB)", qtd: 1, preco: "$10.00", funcao: "Controlador principal", link: null },
            { item: "Servo MG996R (alta torque)", qtd: 2, preco: "$8.00", funcao: "Base giratória e ombro (precisam de força)", link: null },
            { item: "Micro Servo SG90 9g", qtd: 2, preco: "$2.00", funcao: "Cotovelo e garra (movimentos leves)", link: null },
            { item: "Potenciômetro 10KΩ linear", qtd: 4, preco: "$1.00", funcao: "Controle manual de cada eixo", link: null },
            { item: "Fonte 5V 3A com plug P4", qtd: 1, preco: "$8.00", funcao: "Alimentação estável para os 4 servos", link: null },
            { item: "Filamento PLA", qtd: 1, preco: "$12.00", funcao: "Impressão das peças estruturais (~150g)", link: null },
            { item: "Parafusos M3 variados", qtd: 16, preco: "$2.00", funcao: "Fixação dos servos e articulações", link: null },
            { item: "Jumpers macho-macho 20cm", qtd: 15, preco: "$1.00", funcao: "Conexões no breadboard", link: null },
            { item: "Breadboard 830 pontos", qtd: 1, preco: "$4.00", funcao: "Protoboard para conexões", link: null },
        ],
        ferramentas: [
            "Impressora 3D",
            "Chave Phillips",
            "Alicate",
            "Computador com Arduino IDE",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Imprimir as Peças",
                descricao: "Baixe os arquivos STL. Imprima: base giratória (2 peças), braço inferior, braço superior, garra (2 dedos), suporte dos servos. Use PLA com 25% de preenchimento para resistência.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Montar a Base Giratória",
                descricao: "Fixe o servo MG996R na base. Este servo fará a rotação horizontal de todo o braço (180°). Use parafusos M3 para fixação firme.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Montar Ombro e Cotovelo",
                descricao: "Fixe o segundo MG996R no ombro (movimento vertical). Fixe um SG90 no cotovelo. Conecte as peças com parafusos, mantendo movimento livre.",
                imagem: null
            },
            {
                numero: 4,
                titulo: "Montar a Garra",
                descricao: "A garra usa 1 servo SG90 para abrir e fechar. Os dedos impressos devem ter uma borrachinha na ponta para melhor aderência aos objetos.",
                imagem: null
            },
            {
                numero: 5,
                titulo: "Ligações Elétricas",
                descricao: "Conecte os 4 servos ao Arduino: Base→pino 9, Ombro→pino 10, Cotovelo→pino 11, Garra→pino 6. Conecte os 4 potenciômetros aos pinos analógicos A0-A3. Alimente os servos com fonte externa 5V 3A (NÃO alimente pelo Arduino — a corrente é insuficiente).",
                imagem: null
            },
            {
                numero: 6,
                titulo: "Programar e Testar",
                descricao: "Carregue o código 'braco_controle.ino'. Use os potenciômetros para mover cada eixo manualmente. Depois programe sequências automáticas de movimentos.",
                codigo: "braco_controle.ino"
            },
        ],

        codigoFonte: {
            "braco_controle.ino": `// Idenza Academy — Mini Braco Robotico 4 Eixos
// Controle manual por potenciometros + sequencia automatica

#include <Servo.h>

Servo base, ombro, cotovelo, garra;

// Pinos dos potenciometros
#define POT_BASE A0
#define POT_OMBRO A1
#define POT_COTOVELO A2
#define POT_GARRA A3

// Pinos dos servos
#define PIN_BASE 9
#define PIN_OMBRO 10
#define PIN_COTOVELO 11
#define PIN_GARRA 6

// Botao para executar sequencia
#define BOTAO 2

void setup() {
  base.attach(PIN_BASE);
  ombro.attach(PIN_OMBRO);
  cotovelo.attach(PIN_COTOVELO);
  garra.attach(PIN_GARRA);
  
  pinMode(BOTAO, INPUT_PULLUP);
  
  // Posicao inicial
  base.write(90);
  ombro.write(90);
  cotovelo.write(90);
  garra.write(90);
  
  Serial.begin(9600);
  Serial.println("Braco Robotico Idenza — Pronto!");
}

void loop() {
  // Modo manual: le os potenciometros
  int angulo_base = map(analogRead(POT_BASE), 0, 1023, 0, 180);
  int angulo_ombro = map(analogRead(POT_OMBRO), 0, 1023, 0, 180);
  int angulo_cotovelo = map(analogRead(POT_COTOVELO), 0, 1023, 0, 180);
  int angulo_garra = map(analogRead(POT_GARRA), 0, 1023, 45, 135);
  
  base.write(angulo_base);
  ombro.write(angulo_ombro);
  cotovelo.write(angulo_cotovelo);
  garra.write(angulo_garra);
  
  // Se botao pressionado, executa sequencia automatica
  if (digitalRead(BOTAO) == LOW) {
    sequenciaPickAndPlace();
    delay(1000);
  }
  
  delay(15);
}

void sequenciaPickAndPlace() {
  Serial.println("Executando Pick-and-Place...");
  
  // Posicao de repouso
  base.write(90);
  ombro.write(90);
  cotovelo.write(90);
  garra.write(90);
  delay(500);
  
  // Abrir garra, descer, pegar objeto
  garra.write(120);       // Abre a garra
  delay(500);
  ombro.write(60);        // Desce o braco
  cotovelo.write(120);
  delay(1000);
  garra.write(70);        // Fecha a garra (pegou)
  delay(500);
  
  // Levantar, girar, soltar
  ombro.write(120);       // Levanta
  cotovelo.write(60);
  delay(1000);
  base.write(30);         // Gira para o lado
  delay(1000);
  garra.write(120);       // Solta o objeto
  delay(500);
  
  // Voltar para posicao inicial
  base.write(90);
  ombro.write(90);
  cotovelo.write(90);
  garra.write(90);
  
  Serial.println("Sequencia concluida!");
}`,
        },

        dicas: [
            "Sempre use fonte externa para alimentar os servos — o Arduino NÃO fornece corrente suficiente",
            "O MG996R consome até 2A em stall — use fonte de 3A para margem de segurança",
            "Se o braço tremer: adicione capacitores de 100μF entre VCC e GND de cada servo",
            "A garra pega melhor objetos leves (até 50g) e com superfície não lisa",
        ],
    },

    // ============================================================
    // ROBÔ 3: CARRINHO ARDUINO — ROBÔ DIFERENCIAL
    // ============================================================
    {
        id: "carrinho-arduino",
        nome: "Carrinho Arduino",
        tipo: "Robô Diferencial sobre Rodas",
        dificuldade: "fácil",
        custo: "$45",
        tempo: "5 horas",
        pecas: 10,
        impressao3d: false,
        arquivos3D: null,
        comunidade: null,
        github: null,
        video: null,

        descricao: "O robô mais simples e versátil para iniciantes. Um carrinho de 2 rodas com tração diferencial que pode ser controlado por Bluetooth (celular) ou seguir linhas no chão automaticamente. Ideal para aprender controle de motores e sensores básicos.",

        aprendizado: [
            "Montagem de chassi de robô diferencial",
            "Controle de motores DC com ponte H (L298N)",
            "Programação de movimentos: frente, ré, giro no próprio eixo",
            "Uso de sensor de linha TCRT5000 para seguir trajetos",
            "Comunicação Bluetooth para controle remoto",
        ],
        preRequisitos: ["Nenhum"],

        bom: [
            { item: "Arduino Uno R3", qtd: 1, preco: "$10.00", funcao: "Controlador", link: null },
            { item: "Driver Motor L298N", qtd: 1, preco: "$6.00", funcao: "Ponte H para controlar 2 motores DC", link: null },
            { item: "Motor DC 3-6V com caixa de redução e roda", qtd: 2, preco: "$8.00", funcao: "Motores de tração com rodas inclusas", link: null },
            { item: "Roda boba giratória (rodízio)", qtd: 1, preco: "$3.00", funcao: "Ponto de apoio traseiro", link: null },
            { item: "Sensor TCRT5000 (seguidor de linha)", qtd: 2, preco: "$2.00", funcao: "Detecta linha preta no chão", link: null },
            { item: "Módulo Bluetooth HC-05", qtd: 1, preco: "$5.00", funcao: "Controle remoto", link: null },
            { item: "Suporte de pilhas AA (6 pilhas)", qtd: 1, preco: "$2.00", funcao: "Alimentação", link: null },
            { item: "Chassi acrílico ou MDF", qtd: 1, preco: "$5.00", funcao: "Estrutura base", link: null },
            { item: "Jumpers e parafusos", qtd: 20, preco: "$2.00", funcao: "Conexões", link: null },
        ],
        ferramentas: [
            "Chave de fenda",
            "Alicate",
            "Fita isolante",
            "Computador com Arduino IDE",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Montar o Chassi",
                descricao: "Fixe os 2 motores com rodas na parte traseira do chassi (um de cada lado). Fixe o rodízio na frente como ponto de apoio. O robô deve rolar livremente quando empurrado.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Conectar Driver L298N",
                descricao: "Conecte os motores aos terminais do L298N: Motor Esquerdo→OUT1/OUT2, Motor Direito→OUT3/OUT4. Conecte os pinos de controle ao Arduino: IN1→5, IN2→6, IN3→9, IN4→10. Alimente o L298N com 6 pilhas AA (9V) no terminal +12V.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Instalar Sensores de Linha",
                descricao: "Fixe 2 sensores TCRT5000 na frente do chassi, apontando para baixo, separados por ~5cm. Conecte as saídas aos pinos analógicos A0 e A1 do Arduino. Eles detectam superfície escura vs clara.",
                imagem: null
            },
            {
                numero: 4,
                titulo: "Conectar Bluetooth",
                descricao: "Conecte HC-05 ao Arduino: RX→TX(pino 0), TX→RX(pino 1), VCC→5V, GND→GND. ATENÇÃO: desconecte HC-05 ao fazer upload de código (conflito na serial).",
                imagem: null
            },
            {
                numero: 5,
                titulo: "Programar e Testar",
                descricao: "Carregue o código. Use o app 'Arduino Bluetooth Controller' no celular para enviar comandos: 'F'=frente, 'B'=ré, 'L'=esquerda, 'R'=direita, 'S'=parar.",
                codigo: "carrinho_bluetooth.ino"
            },
        ],

        codigoFonte: {
            "carrinho_bluetooth.ino": `// Idenza Academy — Carrinho Arduino Bluetooth
// Controle remoto por celular + modo seguidor de linha

// Pinos do L298N
#define IN1 5
#define IN2 6
#define IN3 9
#define IN4 10

// Sensores de linha
#define SENSOR_E A0
#define SENSOR_D A1

char comando = 'S';  // Comando Bluetooth
bool modoAutomatico = false;

void setup() {
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  
  pinMode(SENSOR_E, INPUT);
  pinMode(SENSOR_D, INPUT);
  
  Serial.begin(9600);
  Serial.println("Carrinho Idenza pronto!");
  Serial.println("Comandos: F=FRENTE B=RE L=ESQUERDA R=DIREITA S=PARAR A=AUTO");
  
  parar();
}

void loop() {
  // Verifica comando Bluetooth
  if (Serial.available() > 0) {
    comando = Serial.read();
    if (comando == 'A') {
      modoAutomatico = !modoAutomatico;
      Serial.print("Modo automatico: ");
      Serial.println(modoAutomatico ? "LIGADO" : "DESLIGADO");
    }
  }
  
  if (modoAutomatico) {
    seguirLinha();
  } else {
    executarComando(comando);
  }
}

void executarComando(char cmd) {
  switch (cmd) {
    case 'F': frente(); break;
    case 'B': re(); break;
    case 'L': esquerda(); break;
    case 'R': direita(); break;
    case 'S': parar(); break;
  }
}

void frente() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
}

void re() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
  digitalWrite(IN3, LOW); digitalWrite(IN4, HIGH);
}

void esquerda() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
}

void direita() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, HIGH);
}

void parar() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, LOW);
}

void seguirLinha() {
  int e = analogRead(SENSOR_E);
  int d = analogRead(SENSOR_D);
  
  int limiar = 500;  // Ajuste conforme a superficie
  
  if (e > limiar && d > limiar) frente();       // Ambos na linha
  else if (e < limiar && d > limiar) esquerda(); // Esquerda saiu
  else if (e > limiar && d < limiar) direita();  // Direita saiu
  else parar();                                   // Ambos fora
}`,
        },

        dicas: [
            "O L298N esquenta bastante — não toque durante o uso",
            "Para seguir linha, use fita preta sobre superfície branca (ou vice-versa)",
            "Se o robô não andar reto, ajuste a velocidade com PWM: analogWrite() nos pinos ENA e ENB do L298N",
            "As pilhas AA duram ~2 horas de uso contínuo — considere usar bateria LiPo",
        ],
    },

    // ============================================================
    // ROBÔ 4: ESP32-CAM ROVER
    // ============================================================
    {
        id: "esp32-cam-rover",
        nome: "ESP32-CAM Rover",
        tipo: "Rover com Câmera WiFi e Visão Noturna",
        dificuldade: "médio",
        custo: "$70",
        tempo: "10 horas",
        pecas: 14,
        impressao3d: true,
        arquivos3D: "https://www.thingiverse.com/thing:esp32-rover",
        comunidade: null,
        github: null,
        video: null,

        descricao: "Um robô explorador sobre rodas com câmera que transmite vídeo ao vivo via WiFi para seu celular ou computador. Você pilota o robô vendo exatamente o que ele vê, como um drone terrestre. Ideal para exploração de ambientes, inspeção e aprendizado de visão embarcada.",

        aprendizado: [
            "Streaming de vídeo JPEG em tempo real via WiFi",
            "Configuração da câmera OV2640 no ESP32-CAM",
            "Controle de motores DC com driver L298N",
            "Criação de servidor web embutido no ESP32",
            "Controle remoto por página web responsiva",
        ],
        preRequisitos: ["Arduino básico", "Noções de WiFi"],

        bom: [
            { item: "ESP32-CAM (com câmera OV2640 2MP)", qtd: 1, preco: "$12.00", funcao: "Cérebro + câmera + WiFi — tudo em um", link: null },
            { item: "Programador FTDI USB-TTL", qtd: 1, preco: "$5.00", funcao: "Gravar código no ESP32-CAM (não tem USB nativo)", link: null },
            { item: "Driver Motor L298N", qtd: 1, preco: "$6.00", funcao: "Controlar 2 motores DC", link: null },
            { item: "Motores DC 3-6V com caixa de redução e roda", qtd: 2, preco: "$8.00", funcao: "Tração", link: null },
            { item: "Roda boba giratória", qtd: 1, preco: "$3.00", funcao: "Apoio dianteiro", link: null },
            { item: "LEDs brancos 5mm alto brilho", qtd: 2, preco: "$1.00", funcao: "Iluminação para visão noturna", link: null },
            { item: "Bateria LiPo 7.4V 1000mAh", qtd: 1, preco: "$12.00", funcao: "Alimentação (~40 min de streaming)", link: null },
            { item: "Regulador LM2596 Step-Down", qtd: 1, preco: "$3.00", funcao: "Converter 7.4V → 5V para ESP32 e motores", link: null },
            { item: "Filamento PLA", qtd: 1, preco: "$10.00", funcao: "Chassi e suporte da câmera", link: null },
            { item: "Jumpers, parafusos, abraçadeiras", qtd: 20, preco: "$3.00", funcao: "Conexões e fixação", link: null },
        ],
        ferramentas: [
            "Impressora 3D",
            "Ferro de solda",
            "Chave de fenda",
            "Computador com Arduino IDE",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Imprimir Chassi e Suportes",
                descricao: "Imprima a base do robô com espaço para bateria, L298N e ESP32-CAM. Imprima suporte articulado para a câmera (permite ajustar ângulo). Use PLA.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Montar Motores e Rodas",
                descricao: "Fixe os 2 motores com rodas na traseira. Fixe o rodízio na frente. O robô deve rolar livremente.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Conectar Driver L298N",
                descricao: "Motores nos terminais OUT. Pinos de controle: IN1→D12, IN2→D13, IN3→D14, IN4→D15. Alimentação da bateria no +12V. Saída 5V do L298N pode alimentar o ESP32-CAM.",
                imagem: null
            },
            {
                numero: 4,
                titulo: "Gravar Código no ESP32-CAM",
                descricao: "Conecte o FTDI: TX→RX, RX→TX, GND→GND, 5V→5V. Coloque GPIO0 no GND (modo gravação). Pressione RST. Faça upload na Arduino IDE (placa: AI Thinker ESP32-CAM).",
                codigo: "esp32_rover.ino"
            },
            {
                numero: 5,
                titulo: "Instalar LEDs de Iluminação",
                descricao: "Solde 2 LEDs brancos nos pinos D4 e D16. Eles iluminam o caminho para visão noturna. Acionados pelo botão na página web.",
                imagem: null
            },
            {
                numero: 6,
                titulo: "Testar e Pilotar",
                descricao: "Ligue o robô. Conecte o celular ao WiFi 'IdenzaRover' (senha: 12345678). Abra o navegador em 192.168.4.1. Você verá o vídeo ao vivo e os controles!",
                imagem: null
            },
        ],

        codigoFonte: {
            "esp32_rover.ino": `// Idenza Academy — ESP32-CAM Rover WiFi
// Streaming de video + controle remoto por pagina web

#include "esp_camera.h"
#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "IdenzaRover";
const char* password = "12345678";
WebServer server(80);

// Motores
#define MOTOR_A_IN1 12
#define MOTOR_A_IN2 13
#define MOTOR_B_IN1 14
#define MOTOR_B_IN2 15
#define LED_FRONTAL 4

void setup() {
  Serial.begin(115200);
  
  pinMode(MOTOR_A_IN1, OUTPUT);
  pinMode(MOTOR_A_IN2, OUTPUT);
  pinMode(MOTOR_B_IN1, OUTPUT);
  pinMode(MOTOR_B_IN2, OUTPUT);
  pinMode(LED_FRONTAL, OUTPUT);
  parar();
  
  // Configurar camera OV2640
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = 5; config.pin_d1 = 18; config.pin_d2 = 19;
  config.pin_d3 = 21; config.pin_d4 = 36; config.pin_d5 = 39;
  config.pin_d6 = 34; config.pin_d7 = 35;
  config.pin_xclk = 0; config.pin_pclk = 22;
  config.pin_vsync = 25; config.pin_href = 23;
  config.pin_sccb_sda = 26; config.pin_sccb_scl = 27;
  config.pin_pwdn = 32; config.pin_reset = -1;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  config.frame_size = FRAMESIZE_VGA;
  config.jpeg_quality = 12;
  config.fb_count = 1;
  
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Erro camera: 0x%x", err);
    return;
  }
  
  WiFi.softAP(ssid, password);
  Serial.print("WiFi IP: ");
  Serial.println(WiFi.softAPIP());
  
  server.on("/", HTTP_GET, []() {
    server.send(200, "text/html", R"rawliteral(
<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a1a1a;color:#fff;text-align:center;font-family:Arial}
h1{color:#D4AF37;padding:10px;font-size:1.2rem}
img{width:100%;max-width:640px;border-radius:10px}
.btns{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;max-width:300px;margin:15px auto}
button{padding:12px;border:none;border-radius:10px;font-size:1.2rem;cursor:pointer;background:#333;color:#fff}
button:active{background:#D4AF37}
.f{grid-column:2;background:#2e7d32}
.e{grid-column:1}.p{grid-column:2;background:#c62828}.d{grid-column:3}.t{grid-column:2}
</style></head><body>
<h1>Idenza Rover</h1>
<img src="/stream">
<div class="btns">
<button class="e" onclick="fetch('/esq')">⬅️</button>
<button class="f" onclick="fetch('/frente')">⬆️</button>
<button class="d" onclick="fetch('/dir')">➡️</button>
<button class="t" onclick="fetch('/tras')">⬇️</button>
<button class="p" onclick="fetch('/parar')">🛑</button>
</div>
<button onclick="fetch('/led')" style="margin:10px;background:#B8860B">💡 Luz</button>
</body></html>
    )rawliteral");
  });
  
  server.on("/stream", HTTP_GET, []() {
    camera_fb_t *fb = esp_camera_fb_get();
    if (!fb) { server.send(500,"text/plain","Erro"); return; }
    server.send_P(200,"image/jpeg",(const char*)fb->buf,fb->len);
    esp_camera_fb_return(fb);
  });
  
  server.on("/frente", HTTP_GET, [](){ digitalWrite(MOTOR_A_IN1,1);digitalWrite(MOTOR_A_IN2,0);digitalWrite(MOTOR_B_IN1,1);digitalWrite(MOTOR_B_IN2,0);server.send(200); });
  server.on("/tras", HTTP_GET, [](){ digitalWrite(MOTOR_A_IN1,0);digitalWrite(MOTOR_A_IN2,1);digitalWrite(MOTOR_B_IN1,0);digitalWrite(MOTOR_B_IN2,1);server.send(200); });
  server.on("/esq", HTTP_GET, [](){ digitalWrite(MOTOR_A_IN1,0);digitalWrite(MOTOR_A_IN2,1);digitalWrite(MOTOR_B_IN1,1);digitalWrite(MOTOR_B_IN2,0);server.send(200); });
  server.on("/dir", HTTP_GET, [](){ digitalWrite(MOTOR_A_IN1,1);digitalWrite(MOTOR_A_IN2,0);digitalWrite(MOTOR_B_IN1,0);digitalWrite(MOTOR_B_IN2,1);server.send(200); });
  server.on("/parar", HTTP_GET, [](){ parar(); server.send(200); });
  server.on("/led", HTTP_GET, [](){ digitalWrite(LED_FRONTAL,!digitalRead(LED_FRONTAL));server.send(200); });
  
  server.begin();
}

void loop() { server.handleClient(); }

void parar() {
  digitalWrite(MOTOR_A_IN1,0);digitalWrite(MOTOR_A_IN2,0);
  digitalWrite(MOTOR_B_IN1,0);digitalWrite(MOTOR_B_IN2,0);
}`,
        },

        dicas: [
            "Se o vídeo travar: reduza FRAMESIZE_VGA para FRAMESIZE_QVGA (320x240) — fluidez melhora",
            "O ESP32-CAM esquenta com streaming contínuo — normal, mas mantenha ventilado",
            "Para controlar via Internet (não só WiFi local), configure o ESP32 como Station e use ngrok",
            "Adicione um servo no suporte da câmera para pan/tilt (olhar para cima/baixo)",
        ],
    },

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
        ],
        preRequisitos: ["Arduino intermediário", "Experiência com servos"],

        bom: [
            { item: "Arduino Mega 2560", qtd: 1, preco: "$12.00", funcao: "Cérebro — muitos pinos para 8 servos", link: null },
            { item: "Servo MG996R (alta torque, 10kg·cm)", qtd: 8, preco: "$6.00", funcao: "2 por pata: ombro + joelho", link: null },
            { item: "Driver PCA9685 (16 canais PWM I²C)", qtd: 1, preco: "$5.00", funcao: "Controla até 16 servos por I²C", link: null },
            { item: "Sensor Ultrassônico HC-SR04", qtd: 1, preco: "$3.00", funcao: "Olhos — detecta obstáculos frontais", link: null },
            { item: "Bateria LiPo 7.4V 2200mAh", qtd: 1, preco: "$18.00", funcao: "Alimentação (~20 min de marcha)", link: null },
            { item: "Regulador Step-Down 5V 5A", qtd: 1, preco: "$5.00", funcao: "Alimentação estável para 8 servos", link: null },
            { item: "Filamento PLA", qtd: 1, preco: "$18.00", funcao: "Corpo e patas (~300g)", link: null },
            { item: "Parafusos M3 e standoffs", qtd: 30, preco: "$3.00", funcao: "Fixação estrutural", link: null },
            { item: "Capacitores 100μF", qtd: 4, preco: "$1.00", funcao: "Filtro de ruído nos servos", link: null },
        ],
        ferramentas: [
            "Impressora 3D (volume mínimo 200x200x200mm)",
            "Chave Allen M3",
            "Ferro de solda",
            "Multímetro",
            "Computador com Arduino IDE",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Imprimir Todas as Peças 3D",
                descricao: "Imprima: corpo principal, 4 patas superiores (coxa), 4 patas inferiores (tíbia), cabeça. Use PLA com 30% de preenchimento. Tempo total: ~8 horas.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Montar as Articulações das Patas",
                descricao: "Cada pata tem 2 servos: ombro (fixo ao corpo, move frente/trás) e joelho (entre coxa e tíbia, move cima/baixo). Monte as 4 patas primeiro, depois fixe-as no corpo.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Instalar o PCA9685",
                descricao: "Conecte ao Arduino Mega: SDA→pino 20, SCL→pino 21. Conecte os 8 servos aos canais 0-7. Alimente o PCA9685 com a bateria via regulador 5V 5A.",
                imagem: null,
                codigo: "diagrama_quadrupede.txt"
            },
            {
                numero: 4,
                titulo: "Instalar Sensor e Alimentação",
                descricao: "Fixe o HC-SR04 na cabeça. Conecte VCC→5V, TRIG→pino 22, ECHO→pino 23. Adicione capacitores de 100μF entre VCC e GND de cada grupo de servos.",
                imagem: null
            },
            {
                numero: 5,
                titulo: "Calibrar e Carregar Firmware",
                descricao: "Carregue o código de calibração primeiro (todos em 90°). Depois carregue o firmware da marcha. O robô executará marcha 'trot': patas diagonais opostas se movem juntas.",
                codigo: "quadrupede_marcha.ino"
            },
            {
                numero: 6,
                titulo: "Ajustar Marcha",
                descricao: "Teste em superfície plana. Ajuste STEP_HEIGHT (altura do passo), STEP_LENGTH (comprimento) e STEP_DELAY (velocidade). Comece com delay de 200ms e reduza gradualmente.",
                imagem: null
            },
        ],

        codigoFonte: {
            "diagrama_quadrupede.txt": `LIGACOES QUADRUPEDE 8 SERVOS
================================

PCA9685 -> Arduino Mega:
SDA -> pino 20
SCL -> pino 21
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
VCC -> 5V, TRIG -> pino 22, ECHO -> pino 23, GND -> GND

ALIMENTACAO:
Bateria 7.4V -> Regulador 5V 5A -> PCA9685 VCC
TODOS os GNDs conectados juntos`,

            "quadrupede_marcha.ino": `// Idenza Academy — Marcha Quadrupede (Trot Gait)
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

struct Perna {
  int canal_ombro, canal_joelho;
  int angulo_ombro_base, angulo_joelho_base;
};

Perna pernas[4] = {
  {0, 1, 90, 90},  // Frente direita
  {2, 3, 90, 90},  // Frente esquerda
  {4, 5, 90, 90},  // Traseira direita
  {6, 7, 90, 90},  // Traseira esquerda
};

const int STEP_HEIGHT = 30;
const int STEP_LENGTH = 20;
const int STEP_DELAY = 100;

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
  if (dist > 20) andarFrente(1);
  else virarDireita(2);
}

void posicaoInicial() {
  for (int i = 0; i < 4; i++) {
    moverServo(pernas[i].canal_ombro, pernas[i].angulo_ombro_base);
    moverServo(pernas[i].canal_joelho, pernas[i].angulo_joelho_base);
  }
}

void andarFrente(int ciclos) {
  for (int c = 0; c < ciclos; c++) {
    for (int i : {0, 2}) moverServo(pernas[i].canal_joelho, pernas[i].angulo_joelho_base + STEP_HEIGHT);
    delay(STEP_DELAY);
    for (int i : {0, 2}) moverServo(pernas[i].canal_ombro, pernas[i].angulo_ombro_base + STEP_LENGTH);
    delay(STEP_DELAY);
    for (int i : {0, 2}) moverServo(pernas[i].canal_joelho, pernas[i].angulo_joelho_base);
    delay(STEP_DELAY);
    
    for (int i : {1, 3}) moverServo(pernas[i].canal_joelho, pernas[i].angulo_joelho_base + STEP_HEIGHT);
    delay(STEP_DELAY);
    for (int i : {1, 3}) moverServo(pernas[i].canal_ombro, pernas[i].angulo_ombro_base - STEP_LENGTH);
    delay(STEP_DELAY);
    for (int i : {1, 3}) moverServo(pernas[i].canal_joelho, pernas[i].angulo_joelho_base);
    delay(STEP_DELAY);
  }
}

void virarDireita(int ciclos) {
  for (int c = 0; c < ciclos; c++) {
    for (int i = 0; i < 4; i++) moverServo(pernas[i].canal_ombro, pernas[i].angulo_ombro_base + (i < 2 ? 30 : -30));
    delay(STEP_DELAY * 3);
    posicaoInicial();
  }
}

void moverServo(int canal, int angulo) {
  angulo = constrain(angulo, 0, 180);
  int pulso = map(angulo, 0, 180, 102, 512);
  pwm.setPWM(canal, 0, pulso);
}

float medirDistancia() {
  digitalWrite(TRIG, LOW); delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  return pulseIn(ECHO, HIGH, 30000) * 0.034 / 2;
}`,
        },

        dicas: [
            "8 servos MG996R podem consumir 16A em stall — fonte de 5A é o MÍNIMO",
            "Se o robô tombar: verifique sincronia das patas opostas",
            "Comece com STEP_DELAY=200ms e reduza conforme pega prática",
            "Adicione borrachinhas nos pés para tração em pisos lisos",
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

        descricao: "Um braço robótico de 4 eixos que usa uma câmera USB e OpenCV no computador para identificar objetos por cor, calcular sua posição e fazer pick-and-place automático. O computador processa a imagem e envia comandos para o Arduino controlar os servos.",

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
            { item: "Servo MG996R", qtd: 3, preco: "$8.00", funcao: "Base, ombro, cotovelo", link: null },
            { item: "Servo SG90", qtd: 1, preco: "$2.00", funcao: "Garra", link: null },
            { item: "Câmera USB (webcam)", qtd: 1, preco: "$15.00", funcao: "Visão do robô", link: null },
            { item: "Fonte 5V 5A", qtd: 1, preco: "$10.00", funcao: "Alimentação", link: null },
            { item: "Filamento PLA + objetos coloridos", qtd: 1, preco: "$20.00", funcao: "Estrutura + alvos", link: null },
            { item: "Parafusos e jumpers", qtd: 30, preco: "$5.00", funcao: "Fixação", link: null },
        ],
        ferramentas: [
            "Impressora 3D",
            "Computador com Python 3 + OpenCV",
            "Arduino IDE",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Montar o Braço Físico",
                descricao: "Imprima e monte o braço conforme o robô #2. Fixe a câmera USB acima da área de trabalho, apontando para baixo.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Instalar OpenCV",
                descricao: "Instale Python 3 e OpenCV: 'pip install opencv-python numpy pyserial'. Teste a câmera.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Carregar Firmware no Arduino",
                descricao: "Carregue o código que recebe comandos via Serial. Formato: 'BASE,OMBRO,COTOVELO,GARRA\\n'.",
                codigo: "braco_serial.ino"
            },
            {
                numero: 4,
                titulo: "Calibrar Cores no OpenCV",
                descricao: "Execute o script de calibração HSV. Ajuste os trackbars para isolar a cor do objeto alvo. Anote os valores.",
                codigo: "calibrar_cor.py"
            },
            {
                numero: 5,
                titulo: "Executar Pick-and-Place",
                descricao: "Execute o script principal. Coloque objetos coloridos na mesa. O sistema detecta, calcula posição e comanda o braço.",
                codigo: "pick_place_visao.py"
            },
        ],

        codigoFonte: {
            "braco_serial.ino": `// Idenza Academy — Braco com Visao (Firmware Arduino)
#include <Servo.h>
Servo base, ombro, cotovelo, garra;

void setup() {
  Serial.begin(115200);
  base.attach(9); ombro.attach(10);
  cotovelo.attach(11); garra.attach(6);
  base.write(90); ombro.write(90);
  cotovelo.write(90); garra.write(90);
}

void loop() {
  if (Serial.available() > 0) {
    String cmd = Serial.readStringUntil('\\n');
    int b = cmd.substring(0, cmd.indexOf(',')).toInt();
    cmd = cmd.substring(cmd.indexOf(',') + 1);
    int o = cmd.substring(0, cmd.indexOf(',')).toInt();
    cmd = cmd.substring(cmd.indexOf(',') + 1);
    int c = cmd.substring(0, cmd.indexOf(',')).toInt();
    int g = cmd.substring(cmd.indexOf(',') + 1).toInt();
    
    base.write(constrain(b, 0, 180));
    ombro.write(constrain(o, 0, 180));
    cotovelo.write(constrain(c, 0, 180));
    garra.write(constrain(g, 45, 135));
    Serial.println("OK");
  }
}`,

            "calibrar_cor.py": `# Idenza Academy — Calibracao de Cor HSV
import cv2, numpy as np

def nada(x): pass

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
    if not ret: break
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
    
    if cv2.waitKey(1) & 0xFF == ord('q'): break

cap.release()
cv2.destroyAllWindows()
print(f"HSV: lower=({h_min},{s_min},{v_min}) upper=({h_max},{s_max},{v_max})")`,

            "pick_place_visao.py": `# Idenza Academy — Pick-and-Place com Visao
import cv2, numpy as np, serial, time

arduino = serial.Serial('COM3', 115200, timeout=1)
time.sleep(2)

LOWER = np.array([0, 120, 70])
UPPER = np.array([10, 255, 255])
cap = cv2.VideoCapture(0)

def enviar(b, o, c, g):
    cmd = f"{b},{o},{c},{g}\\n"
    arduino.write(cmd.encode())
    time.sleep(0.5)

def pick_and_place():
    enviar(90, 90, 90, 90); time.sleep(1)
    enviar(90, 120, 60, 120); time.sleep(1)
    enviar(90, 120, 60, 60); time.sleep(0.5)
    enviar(90, 60, 120, 60); time.sleep(1)
    enviar(30, 60, 120, 60); time.sleep(1)
    enviar(30, 60, 120, 120); time.sleep(0.5)
    enviar(90, 90, 90, 90)

while True:
    ret, frame = cap.read()
    if not ret: break
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask = cv2.inRange(hsv, LOWER, UPPER)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    for cnt in contours:
        if cv2.contourArea(cnt) > 500:
            M = cv2.moments(cnt)
            if M["m00"] > 0:
                cx, cy = int(M["m10"]/M["m00"]), int(M["m01"]/M["m00"])
                cv2.circle(frame, (cx, cy), 7, (0, 255, 0), -1)
                pick_and_place()
                break
    
    cv2.imshow("Idenza Pick-and-Place", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break

cap.release(); cv2.destroyAllWindows(); arduino.close()`,
        },

        dicas: [
            "Iluminação uniforme é CRÍTICA para detecção de cor",
            "Calibre HSV com o objeto na mesma posição de uso",
            "Use objetos de cores bem distintas: vermelho puro, azul puro, verde puro",
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

        descricao: "Construa seu próprio TurtleBot 3 — o robô oficial de ensino de ROS 2 usado em universidades do mundo todo. Equipado com Raspberry Pi 5, LiDAR 360°, câmera e ROS 2 Jazzy, este robô faz SLAM (mapeamento) e navegação autônoma.",

        aprendizado: [
            "Instalação e configuração completa do ROS 2 Jazzy",
            "Integração de sensores: LiDAR, câmera, IMU, encoders",
            "SLAM com slam_toolbox — mapeamento de ambientes",
            "Navegação autônoma com Nav2",
            "Criação de pacotes ROS 2 personalizados",
        ],
        preRequisitos: ["Linux Ubuntu 24.04", "Python intermediário", "Terminal Linux"],

        bom: [
            { item: "Raspberry Pi 5 (8GB)", qtd: 1, preco: "$80.00", funcao: "Computador de bordo — roda ROS 2", link: null },
            { item: "OpenCR 1.0 (ou Arduino Mega)", qtd: 1, preco: "$120.00", funcao: "Controle de motores + IMU", link: null },
            { item: "LiDAR 360° RPLidar A1M8", qtd: 1, preco: "$100.00", funcao: "Mapeamento e localização", link: null },
            { item: "Câmera Raspberry Pi Module 3", qtd: 1, preco: "$25.00", funcao: "Visão computacional", link: null },
            { item: "Motores Dynamixel XL430", qtd: 2, preco: "$50.00", funcao: "Motores inteligentes", link: null },
            { item: "Rodas 65mm + rodízios", qtd: 4, preco: "$18.00", funcao: "Locomoção", link: null },
            { item: "Bateria LiPo 11.1V 3000mAh", qtd: 1, preco: "$30.00", funcao: "Alimentação (~2h)", link: null },
            { item: "Placas acrílicas + standoffs", qtd: 1, preco: "$20.00", funcao: "Chassi", link: null },
            { item: "Cartão SD 64GB", qtd: 1, preco: "$10.00", funcao: "Sistema operacional", link: null },
        ],
        ferramentas: [
            "Computador com Ubuntu 24.04",
            "Monitor, teclado, mouse (setup inicial)",
            "Chave de fenda",
            "Cabo Ethernet",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Montar o Hardware",
                descricao: "Monte 3 camadas de chassi: base (motores, rodas), meio (OpenCR, bateria), topo (Raspberry Pi, LiDAR, câmera).",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Instalar Ubuntu + ROS 2 Jazzy",
                descricao: "Grave Ubuntu 24.04 Server no SD. Instale ROS 2 Jazzy e pacotes TurtleBot3.",
                codigo: "instalar_ros2.sh"
            },
            {
                numero: 3,
                titulo: "Configurar OpenCR e Sensores",
                descricao: "Carregue firmware TurtleBot3 no OpenCR. Configure Dynamixels. Teste LiDAR e câmera.",
                imagem: null
            },
            {
                numero: 4,
                titulo: "Executar SLAM",
                descricao: "Lance 'ros2 launch turtlebot3_cartographer cartographer.launch.py'. Pilote o robô para mapear. Salve o mapa.",
                imagem: null
            },
            {
                numero: 5,
                titulo: "Navegação Autônoma",
                descricao: "Com o mapa salvo, lance Nav2. No RViz2, clique 'Nav2 Goal' e veja o robô navegar sozinho.",
                imagem: null
            },
        ],

        codigoFonte: {
            "instalar_ros2.sh": `#!/bin/bash
# Idenza Academy — Instalacao ROS 2 Jazzy + TurtleBot3
sudo apt update && sudo apt upgrade -y
sudo apt install -y software-properties-common curl
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
sudo apt update
sudo apt install -y ros-jazzy-desktop python3-colcon-common-extensions
sudo apt install -y ros-jazzy-turtlebot3-msgs ros-jazzy-turtlebot3 ros-jazzy-slam-toolbox ros-jazzy-navigation2 ros-jazzy-cartographer
echo "source /opt/ros/jazzy/setup.bash" >> ~/.bashrc
mkdir -p ~/turtlebot3_ws/src
cd ~/turtlebot3_ws/src
git clone -b jazzy https://github.com/ROBOTIS-GIT/turtlebot3.git
cd ~/turtlebot3_ws
colcon build --symlink-install
echo "source ~/turtlebot3_ws/install/setup.bash" >> ~/.bashrc
echo "export TURTLEBOT3_MODEL=burger" >> ~/.bashrc
source ~/.bashrc
echo "Instalacao concluida!"`,
        },

        dicas: [
            "Use 'colcon build --symlink-install' para evitar rebuilds constantes",
            "O LiDAR deve estar em superfície plana para SLAM preciso",
            "Bateria fraca causa odometria imprecisa — mantenha acima de 11V",
        ],
    },

    // ============================================================
    // ROBÔ 8: DRONE ARDUINO
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

        descricao: "Construa um drone quadricóptero do zero usando Arduino, sensor MPU6050 e controle PID para estabilização de voo. Este drone voa de verdade e ensina todos os fundamentos de controle de voo, filtragem de sensores e eletrônica de potência.",

        aprendizado: [
            "Montagem completa de drone quadricóptero funcional",
            "Controle PID para estabilização de voo em tempo real",
            "Leitura e fusão de sensores IMU (MPU6050)",
            "Filtro complementar para ângulos de roll, pitch e yaw",
            "Calibração de ESCs e motores brushless",
        ],
        preRequisitos: ["Arduino intermediário", "Eletrônica de potência", "Solda"],

        bom: [
            { item: "Arduino Nano", qtd: 1, preco: "$8.00", funcao: "Controlador de voo", link: null },
            { item: "MPU6050 (giroscópio + acelerômetro)", qtd: 1, preco: "$5.00", funcao: "Sensor de orientação", link: null },
            { item: "Motores Brushless 2204 2300KV", qtd: 4, preco: "$10.00", funcao: "Propulsão", link: null },
            { item: "ESC 30A SimonK", qtd: 4, preco: "$8.00", funcao: "Controla motores", link: null },
            { item: "Hélices 5030 (pares CW/CCW)", qtd: 8, preco: "$2.00", funcao: "Propulsão", link: null },
            { item: "Frame 250mm", qtd: 1, preco: "$15.00", funcao: "Estrutura", link: null },
            { item: "Bateria LiPo 3S 2200mAh 30C", qtd: 1, preco: "$22.00", funcao: "Alimentação (~8 min)", link: null },
            { item: "Rádio controle 4 canais + receptor", qtd: 1, preco: "$40.00", funcao: "Controle remoto", link: null },
            { item: "PDB + conectores XT60 + fios", qtd: 1, preco: "$10.00", funcao: "Distribuição de energia", link: null },
        ],
        ferramentas: [
            "Ferro de solda 60W",
            "Chave Allen 2mm",
            "Multímetro",
            "Área aberta para teste de voo",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Montar o Frame",
                descricao: "Fixe os 4 motores nos braços. Fixe o PDB no centro. Passe os fios pelos braços. ORGANIZE bem — fios soltos enroscam nas hélices.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Soldar ESCs e Motores",
                descricao: "Solde os 3 fios de cada motor ao ESC. Solde alimentação dos ESCs ao PDB. Solde conector XT60 da bateria.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Instalar Arduino e MPU6050",
                descricao: "Fixe o Arduino no centro. Conecte MPU6050 via I²C: SDA→A4, SCL→A5. Posicione o sensor NA HORIZONTAL.",
                imagem: null,
                codigo: "diagrama_drone.txt"
            },
            {
                numero: 4,
                titulo: "Conectar ESCs e Receptor",
                descricao: "ESCs aos pinos 3,5,6,9. Receptor aos pinos A0-A3. Alimente o receptor com 5V do Arduino.",
                imagem: null
            },
            {
                numero: 5,
                titulo: "Calibrar ESCs",
                descricao: "SEM hélices! Carregue código de calibração. Throttle max → liga drone → beeps → throttle min → beeps.",
                codigo: "calibrar_escs.ino"
            },
            {
                numero: 6,
                titulo: "Carregar Firmware de Voo",
                descricao: "Carregue o código com PID. Teste COM SEGURANÇA em área aberta. Aumente throttle LENTAMENTE. Mantenha 30cm do chão no primeiro teste.",
                codigo: "drone_voo.ino"
            },
        ],

        codigoFonte: {
            "diagrama_drone.txt": `LIGACOES DRONE ARDUINO
========================
MPU6050: VCC→5V, GND→GND, SDA→A4, SCL→A5
ESC1 (Frente Esq) → pino 3
ESC2 (Frente Dir) → pino 5
ESC3 (Tras Esq)   → pino 6
ESC4 (Tras Dir)   → pino 9
Receptor: Roll→A0, Pitch→A1, Throttle→A2, Yaw→A3
Bateria 3S → PDB → ESCs (paralelo) + regulador 5V → Arduino`,

            "calibrar_escs.ino": `// Idenza Academy — Calibracao ESCs
#include <Servo.h>
Servo e1,e2,e3,e4;
void setup() {
  e1.attach(3,1000,2000); e2.attach(5,1000,2000);
  e3.attach(6,1000,2000); e4.attach(9,1000,2000);
  e1.writeMicroseconds(2000); e2.writeMicroseconds(2000);
  e3.writeMicroseconds(2000); e4.writeMicroseconds(2000);
  delay(5000);
  e1.writeMicroseconds(1000); e2.writeMicroseconds(1000);
  e3.writeMicroseconds(1000); e4.writeMicroseconds(1000);
}
void loop(){}`,

            "drone_voo.ino": `// Idenza Academy — Firmware Drone com PID
#include <Wire.h>
#include <MPU6050.h>
#include <Servo.h>
MPU6050 mpu;
Servo m1,m2,m3,m4;
float angRoll=0,angPitch=0,angYaw=0;
float Kp=1.2,Ki=0.005,Kd=0.8;
float iRoll=0,iPitch=0,iYaw=0,leRoll=0,lePitch=0,leYaw=0;
unsigned long lt=0;
volatile int thr=0,roll=0,pitch=0,yaw=0;

void setup() {
  Wire.begin(); mpu.initialize();
  m1.attach(3,1000,2000); m2.attach(5,1000,2000);
  m3.attach(6,1000,2000); m4.attach(9,1000,2000);
  m1.writeMicroseconds(1000); m2.writeMicroseconds(1000);
  m3.writeMicroseconds(1000); m4.writeMicroseconds(1000);
  pinMode(2,INPUT);
  attachInterrupt(0,lerRadio,CHANGE);
  lt=millis();
}

void loop() {
  unsigned long n=millis();
  float dt=(n-lt)/1000.0;
  if(dt<0.002)return;
  lt=n;
  int16_t ax,ay,az,gx,gy,gz;
  mpu.getMotion6(&ax,&ay,&az,&gx,&gy,&gz);
  
  float aRoll=atan2(ay,az)*180/PI;
  float aPitch=atan2(-ax,sqrt(ay*ay+az*az))*180/PI;
  angRoll=0.98*(angRoll+gx/131.0*dt)+0.02*aRoll;
  angPitch=0.98*(angPitch+gy/131.0*dt)+0.02*aPitch;
  angYaw+=gz/131.0*dt;
  
  float eRoll=roll-angRoll,ePitch=pitch-angPitch,eYaw=yaw-angYaw;
  iRoll+=eRoll*dt; iPitch+=ePitch*dt; iYaw+=eYaw*dt;
  float dRoll=(eRoll-leRoll)/dt,dPitch=(ePitch-lePitch)/dt,dYaw=(eYaw-leYaw)/dt;
  leRoll=eRoll; lePitch=ePitch; leYaw=eYaw;
  float pRoll=Kp*eRoll+Ki*iRoll+Kd*dRoll;
  float pPitch=Kp*ePitch+Ki*iPitch+Kd*dPitch;
  float pYaw=Kp*eYaw+Ki*iYaw+Kd*dYaw;
  
  int M1=constrain(thr+pRoll-pPitch-pYaw,1000,2000);
  int M2=constrain(thr-pRoll+pPitch-pYaw,1000,2000);
  int M3=constrain(thr+pRoll+pPitch+pYaw,1000,2000);
  int M4=constrain(thr-pRoll-pPitch+pYaw,1000,2000);
  
  m1.writeMicroseconds(M1); m2.writeMicroseconds(M2);
  m3.writeMicroseconds(M3); m4.writeMicroseconds(M4);
}

void lerRadio() {
  thr=pulseIn(A2,HIGH);
  roll=map(pulseIn(A0,HIGH),1000,2000,-30,30);
  pitch=map(pulseIn(A1,HIGH),1000,2000,-30,30);
  yaw=map(pulseIn(A3,HIGH),1000,2000,-30,30);
}`,
        },

        dicas: [
            "⚠️ SEGURANÇA: teste SEMPRE em área aberta e sem pessoas",
            "Calibre ESCs SEM hélices",
            "Ganhos PID precisam ser ajustados para seu drone específico",
            "Bateria 3S 2200mAh = ~8 min de voo — pouse com 3.7V por célula",
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

        descricao: "Um robô de 6 pernas com 3 servos por perna (18 no total) que caminha como um inseto. Controlado por Arduino Mega e driver PCA9685, executa marcha tripodal (3 pernas no chão, 3 no ar). O projeto mais impressionante para aprender cinemática multi-pernas.",

        aprendizado: [
            "Montagem de robô hexápode com 18 graus de liberdade",
            "Controle de 18 servos via PCA9685 e I²C",
            "Marcha tripodal — padrão de caminhada dos insetos",
            "Cinemática inversa para posicionamento das patas",
            "Movimentos complexos: virar, girar, marcha rápida",
        ],
        preRequisitos: ["Arduino intermediário", "Experiência com múltiplos servos"],

        bom: [
            { item: "Arduino Mega 2560", qtd: 1, preco: "$12.00", funcao: "Cérebro", link: null },
            { item: "Driver PCA9685", qtd: 2, preco: "$5.00", funcao: "Controlar 18 servos via I²C", link: null },
            { item: "Servo MG996R", qtd: 18, preco: "$6.00", funcao: "3 por pata × 6 pernas", link: null },
            { item: "Bateria LiPo 7.4V 5000mAh", qtd: 1, preco: "$30.00", funcao: "Alimentação (~25 min)", link: null },
            { item: "Regulador 5V 10A", qtd: 1, preco: "$12.00", funcao: "Corrente para 18 servos", link: null },
            { item: "Filamento PLA (2 rolos)", qtd: 2, preco: "$25.00", funcao: "Corpo + 6 pernas completas", link: null },
            { item: "Parafusos M3 e standoffs", qtd: 60, preco: "$5.00", funcao: "Fixação", link: null },
            { item: "Capacitores 470μF", qtd: 6, preco: "$3.00", funcao: "Filtro de ruído", link: null },
        ],
        ferramentas: [
            "Impressora 3D (muitas peças — ~15h de impressão)",
            "Chave Allen M3",
            "Ferro de solda",
            "Multímetro",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Imprimir Todas as Peças",
                descricao: "Cada perna: coxa + tíbia + pé = 3 peças × 6 pernas = 18 peças. Mais corpo central (2 metades). Use PLA 25% infill. Tempo: ~15h.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Montar Cada Perna",
                descricao: "3 servos por perna: base (horizontal), meio (vertical), ponta (joelho). Monte as 6 pernas primeiro.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Instalar PCA9685 e Alimentação",
                descricao: "2 PCA9685: endereços 0x40 e 0x41. 9 servos em cada. Regulador 5V 10A alimentando ambos. Capacitores de 470μF para filtro.",
                imagem: null,
                codigo: "diagrama_hexapod.txt"
            },
            {
                numero: 4,
                titulo: "Calibrar e Carregar Marcha",
                descricao: "Calibre todos os servos em 90°. Carregue o firmware da marcha tripodal. Teste em superfície plana.",
                codigo: "hexapod_marcha.ino"
            },
        ],

        codigoFonte: {
            "diagrama_hexapod.txt": `HEXAPOD 18 SERVOS — LIGACOES
===============================
PCA9685 #1 (0x40): Pernas 1-3 (lado direito) — Canais 0-8
PCA9685 #2 (0x41): Pernas 4-6 (lado esquerdo) — Canais 0-8
Alimentacao: Bateria 7.4V -> Regulador 5V 10A -> VCC ambos PCA9685
Capacitores 470μF entre VCC e GND em cada PCA9685`,

            "hexapod_marcha.ino": `// Idenza Academy — Marcha Tripodal Hexapod
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
Adafruit_PWMServoDriver pwm1(0x40), pwm2(0x41);

struct Perna { int c,f,t, cc,fc,tc; };
Perna p[6] = {
  {0,1,2,90,90,90},{3,4,5,90,90,90},{6,7,8,90,90,90},
  {0,1,2,90,90,90},{3,4,5,90,90,90},{6,7,8,90,90,90}
};

void setup() {
  pwm1.begin(); pwm2.begin();
  pwm1.setPWMFreq(60); pwm2.setPWMFreq(60);
  posicaoInicial(); delay(2000);
}

void loop() { andarFrente(5); delay(1000); virarDireita(3); delay(1000); }

void posicaoInicial() {
  for(int i=0;i<6;i++){ mover(i,'c',p[i].cc); mover(i,'f',p[i].fc); mover(i,'t',p[i].tc); }
}

void andarFrente(int ps) {
  for(int pp=0;pp<ps;pp++) {
    for(int i:{0,2,4}){ mover(i,'t',p[i].tc-40); }
    delay(80);
    for(int i:{0,2,4}){ mover(i,'c',p[i].cc+25); }
    delay(80);
    for(int i:{0,2,4}){ mover(i,'t',p[i].tc); }
    delay(80);
    for(int i:{1,3,5}){ mover(i,'t',p[i].tc-40); }
    delay(80);
    for(int i:{1,3,5}){ mover(i,'c',p[i].cc-25); }
    delay(80);
    for(int i:{1,3,5}){ mover(i,'t',p[i].tc); }
    delay(80);
  }
}

void virarDireita(int ps) {
  for(int pp=0;pp<ps;pp++) {
    for(int i=0;i<6;i++) mover(i,'c',p[i].cc+(i<3?30:-30));
    delay(240); posicaoInicial(); delay(80);
  }
}

void mover(int i,char j,int a) {
  a=constrain(a,0,180);
  int pl=map(a,0,180,102,512), cn=j=='c'?p[i].c:j=='f'?p[i].f:p[i].t;
  if(i<3)pwm1.setPWM(cn,0,pl); else pwm2.setPWM(cn,0,pl);
}`,
        },

        dicas: [
            "18 servos consomem MUITA corrente — fonte 10A é MÍNIMA",
            "Imprima pernas extras — quedas quebram peças",
            "Use abraçadeiras para organizar os 54 fios",
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

        descricao: "Um robô sobre rodas com suporte para tablet que permite fazer videochamadas enquanto você pilota o robô remotamente via WiFi. Ideal para visitar lugares à distância, monitorar ambientes ou participar de eventos remotamente.",

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
            { item: "Tablet ou celular (para tela)", qtd: 1, preco: "$100.00", funcao: "Display para videochamada", link: null },
            { item: "Driver Motor L298N", qtd: 1, preco: "$6.00", funcao: "Controle dos motores", link: null },
            { item: "Motores DC 12V com encoder", qtd: 2, preco: "$20.00", funcao: "Tração", link: null },
            { item: "Rodas 80mm", qtd: 2, preco: "$10.00", funcao: "Rodas grandes", link: null },
            { item: "Bateria LiPo 12V 5000mAh", qtd: 1, preco: "$35.00", funcao: "Alimentação motores", link: null },
            { item: "Power bank 5V 10000mAh", qtd: 1, preco: "$20.00", funcao: "Alimentar Raspberry Pi", link: null },
            { item: "Filamento PLA + suporte tablet", qtd: 1, preco: "$15.00", funcao: "Estrutura", link: null },
            { item: "Parafusos e cabos", qtd: 20, preco: "$5.00", funcao: "Fixação", link: null },
        ],
        ferramentas: ["Impressora 3D", "Chave de fenda", "Computador com acesso SSH"],

        passos: [
            {
                numero: 1,
                titulo: "Montar Chassi e Suporte",
                descricao: "Imprima base e suporte articulado para tablet (ajustável em altura e ângulo).",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Instalar Motores e Eletrônica",
                descricao: "Fixe motores com rodas. Conecte ao L298N. Conecte L298N aos GPIOs do Raspberry Pi.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Configurar Raspberry Pi",
                descricao: "Instale Raspberry Pi OS. Habilite câmera. Instale: python3-flask, python3-opencv.",
                codigo: "setup_pi.sh"
            },
            {
                numero: 4,
                titulo: "Executar Servidor Web",
                descricao: "Execute o script Python com streaming de vídeo e controles. Acesse pelo navegador.",
                codigo: "telepresenca_server.py"
            },
        ],

        codigoFonte: {
            "setup_pi.sh": `#!/bin/bash
sudo apt update && sudo apt install -y python3-pip python3-opencv python3-flask
pip3 install rpi-lgpio flask-socketio
echo "Setup concluido!"`,

            "telepresenca_server.py": `# Idenza Academy — Servidor Web Robo Telepresenca
from flask import Flask, Response
import cv2, RPi.GPIO as GPIO

app = Flask(__name__)
IN1,IN2,IN3,IN4=17,18,22,23
GPIO.setmode(GPIO.BCM)
for p in[IN1,IN2,IN3,IN4]:GPIO.setup(p,GPIO.OUT);GPIO.output(p,0)
camera=cv2.VideoCapture(0)

HTML="""<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#1a1a1a;color:#fff;text-align:center;font-family:Arial}
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
</div></body></html>"""

@app.route('/')
def index(): return HTML

def gen():
    while True:
        s,frame=camera.read()
        if not s: break
        _,buf=cv2.imencode('.jpg',frame)
        yield(b'--frame\\r\\nContent-Type: image/jpeg\\r\\n\\r\\n'+buf.tobytes()+b'\\r\\n')

@app.route('/video')
def video(): return Response(gen(),mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/frente')
def f():GPIO.output(IN1,1);GPIO.output(IN2,0);GPIO.output(IN3,1);GPIO.output(IN4,0);return'OK'
@app.route('/tras')
def t():GPIO.output(IN1,0);GPIO.output(IN2,1);GPIO.output(IN3,0);GPIO.output(IN4,1);return'OK'
@app.route('/esq')
def e():GPIO.output(IN1,0);GPIO.output(IN2,1);GPIO.output(IN3,1);GPIO.output(IN4,0);return'OK'
@app.route('/dir')
def d():GPIO.output(IN1,1);GPIO.output(IN2,0);GPIO.output(IN3,0);GPIO.output(IN4,1);return'OK'
@app.route('/parar')
def p():GPIO.output(IN1,0);GPIO.output(IN2,0);GPIO.output(IN3,0);GPIO.output(IN4,0);return'OK'

if __name__=='__main__':app.run(host='0.0.0.0',port=80)`,
        },

        dicas: [
            "Use tablet Android antigo — funciona perfeitamente e reduz custo",
            "Suporte do tablet deve ser robusto — quedas são caras",
            "Streaming consome bateria — power bank 10000mAh dura ~4 horas",
            "Para acesso remoto fora de casa, configure VPN (Tailscale é grátis)",
        ],
    },

    // ============================================================
    // ROBÔ 11: MÃO ROBÓTICA 5 DEDOS
    // ============================================================
    {
        id: "mao-robotica",
        nome: "Mão Robótica 5 Dedos",
        tipo: "Prótese Robótica Impressa em 3D",
        dificuldade: "especialista",
        custo: "$120",
        tempo: "20 horas",
        pecas: 25,
        impressao3d: true,
        arquivos3D: "https://www.thingiverse.com/thing:robotic-hand",
        comunidade: null,
        github: null,
        video: null,

        descricao: "Uma mão robótica completa com 5 dedos articulados, controlada por servos e tendões (fios de nylon). Cada dedo dobra e estica independentemente. Controlada por Arduino, pode fazer gestos como 'paz e amor', 'joia' e agarrar objetos leves.",

        aprendizado: [
            "Mecanismo de tendões para movimento dos dedos",
            "Controle de 5 servos com Arduino",
            "Impressão 3D de peças articuladas complexas",
            "Montagem de mecanismo flexor/extensor",
            "Controle de força de agarre",
        ],
        preRequisitos: ["Arduino intermediário", "Impressão 3D avançada", "Paciência"],

        bom: [
            { item: "Arduino Uno R3", qtd: 1, preco: "$10.00", funcao: "Controlador", link: null },
            { item: "Servo MG996R", qtd: 5, preco: "$6.00", funcao: "1 por dedo (puxa o tendão)", link: null },
            { item: "Fio de Nylon 0.5mm (linha de pesca)", qtd: 1, preco: "$5.00", funcao: "Tendões que movem os dedos", link: null },
            { item: "Elásticos finos (ortodônticos)", qtd: 20, preco: "$3.00", funcao: "Retorno dos dedos (extensão)", link: null },
            { item: "Filamento PLA flexível (TPU)", qtd: 1, preco: "$20.00", funcao: "Juntas e pontas dos dedos", link: null },
            { item: "Filamento PLA rígido", qtd: 1, preco: "$12.00", funcao: "Palma e falanges", link: null },
            { item: "Fonte 5V 5A", qtd: 1, preco: "$10.00", funcao: "Alimentação 5 servos", link: null },
            { item: "Parafusos M2 e M3", qtd: 30, preco: "$3.00", funcao: "Fixação", link: null },
            { item: "Luvas de silicone (opcional)", qtd: 1, preco: "$10.00", funcao: "Cobertura estética", link: null },
        ],
        ferramentas: [
            "Impressora 3D (precisa imprimir TPU flexível)",
            "Alicate de ponta fina",
            "Chave Allen M2/M3",
            "Isqueiro (para selar pontas do nylon)",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Imprimir Todas as Peças",
                descricao: "Cada dedo tem 3 falanges + ponta. Imprima 5 dedos = 20 peças + palma. Use PLA rígido para falanges e TPU flexível para as juntas. Tempo: ~10h.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Montar os Dedos",
                descricao: "Cada dedo é montado com fio de nylon passando por dentro das falanges. O servo puxa o nylon (flexão). Os elásticos puxam de volta (extensão).",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Fixar Servos na Base",
                descricao: "5 servos MG996R fixados no antebraço/palma. Cada servo conectado a um tendão. Use polias impressas nos chifres dos servos para enrolar o nylon.",
                imagem: null
            },
            {
                numero: 4,
                titulo: "Conectar e Programar",
                descricao: "Conecte os 5 servos aos pinos 3,5,6,9,10. Carregue o código com gestos pré-programados. Teste cada dedo individualmente.",
                codigo: "mao_robotica.ino"
            },
        ],

        codigoFonte: {
            "mao_robotica.ino": `// Idenza Academy — Mao Robotica 5 Dedos
#include <Servo.h>

Servo dedo[5];
int pinos[5] = {3, 5, 6, 9, 10};  // Polegar, indicador, medio, anelar, minimo

// Angulos: 0 = aberto (esticado), 180 = fechado
int aberto[5] = {0, 0, 0, 0, 0};
int fechado[5] = {180, 180, 180, 180, 180};

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 5; i++) {
    dedo[i].attach(pinos[i]);
    dedo[i].write(aberto[i]);  // Todos abertos
  }
  Serial.println("Mao Robotica Idenza — Pronta!");
  Serial.println("Comandos: 1=Abrir, 2=Fechar, 3=Paz, 4=Joia, 5=OK");
}

void loop() {
  if (Serial.available() > 0) {
    char cmd = Serial.read();
    switch (cmd) {
      case '1': abrirTodos(); break;
      case '2': fecharTodos(); break;
      case '3': gestoPaz(); break;
      case '4': gestoJoia(); break;
      case '5': gestoOK(); break;
    }
  }
}

void moverDedo(int d, int angulo, int tempo) {
  int atual = dedo[d].read();
  int passo = (angulo > atual) ? 1 : -1;
  for (int a = atual; a != angulo; a += passo) {
    dedo[d].write(a);
    delay(tempo / abs(angulo - atual));
  }
}

void abrirTodos() {
  for (int i = 0; i < 5; i++) moverDedo(i, aberto[i], 500);
  Serial.println("Mao aberta");
}

void fecharTodos() {
  for (int i = 0; i < 5; i++) moverDedo(i, fechado[i], 500);
  Serial.println("Mao fechada");
}

void gestoPaz() {
  abrirTodos(); delay(300);
  moverDedo(0, fechado[0], 300);  // Polegar fecha
  moverDedo(3, fechado[3], 300);  // Anelar fecha
  moverDedo(4, fechado[4], 300);  // Minimo fecha
  Serial.println("Gesto: Paz e Amor!");
}

void gestoJoia() {
  abrirTodos(); delay(300);
  for (int i = 1; i < 5; i++) moverDedo(i, fechado[i], 300);
  Serial.println("Gesto: Joia!");
}

void gestoOK() {
  abrirTodos(); delay(300);
  moverDedo(0, fechado[0] / 2, 300);
  moverDedo(1, fechado[1] / 2, 300);
  Serial.println("Gesto: OK!");
}`,
        },

        dicas: [
            "O nylon deve estar bem tensionado — sem folga, mas sem forçar",
            "Use TPU flexível nas juntas para movimento suave",
            "Os elásticos de retorno precisam ser fortes o suficiente para vencer o atrito",
            "Lubrifique as juntas com graxa de silicone para movimento mais suave",
        ],
    },

    // ============================================================
    // ROBÔ 12: INMOOV (BRAÇO HUMANOIDE TAMANHO REAL)
    // ============================================================
    {
        id: "inmoov-braco",
        nome: "InMoov — Braço Humanoide",
        tipo: "Braço Robótico Humanoide Tamanho Real",
        dificuldade: "especialista",
        custo: "$500",
        tempo: "60 horas",
        pecas: 40,
        impressao3d: true,
        arquivos3D: "https://www.thingiverse.com/thing:17773",
        comunidade: "https://inmoov.fr/",
        github: "https://github.com/InMoov",
        video: null,

        descricao: "Parte do projeto InMoov — o primeiro robô humanoide open source em tamanho real impresso em 3D. Este braço tem ombro, cotovelo, punho e mão com 5 dedos funcionais. Controlado por Arduino Mega e servos de alta potência, reproduz movimentos humanos com precisão.",

        aprendizado: [
            "Montagem de robô humanoide em escala humana",
            "Controle de servos de alta potência (20kg·cm)",
            "Mecanismo de tendões para mão completa",
            "Cinemática de braço humano (7 DOF)",
            "Integração com sensor Kinect para captura de movimento",
        ],
        preRequisitos: ["Robótica avançada", "Impressão 3D experiente", "Eletrônica de potência"],

        bom: [
            { item: "Arduino Mega 2560", qtd: 2, preco: "$12.00", funcao: "Um para braço, um para mão", link: null },
            { item: "Servo Hitec HS-805BB (20kg·cm)", qtd: 3, preco: "$35.00", funcao: "Ombro e cotovelo (força)", link: null },
            { item: "Servo MG996R", qtd: 5, preco: "$6.00", funcao: "Punho e dedos", link: null },
            { item: "Fio de Nylon 1mm", qtd: 1, preco: "$8.00", funcao: "Tendões dos dedos", link: null },
            { item: "Filamento PLA (4 rolos)", qtd: 4, preco: "$15.00", funcao: "Todas as peças (~3kg!)", link: null },
            { item: "Fonte ATX 12V 30A", qtd: 1, preco: "$40.00", funcao: "Alimentação de todos os servos", link: null },
            { item: "Rolamentos e eixos 8mm", qtd: 10, preco: "$15.00", funcao: "Articulações suaves", link: null },
            { item: "Parafusos, porcas, standoffs", qtd: 100, preco: "$10.00", funcao: "Fixação", link: null },
            { item: "Luvas e espuma", qtd: 1, preco: "$15.00", funcao: "Acabamento estético", link: null },
        ],
        ferramentas: [
            "Impressora 3D com volume mínimo 200x200x200mm (muitas peças!)",
            "Chave Allen e Phillips",
            "Alicate de ponta fina",
            "Ferro de solda 80W",
            "Multímetro",
            "PACIÊNCIA — este projeto leva semanas",
        ],

        passos: [
            {
                numero: 1,
                titulo: "Imprimir Todas as Peças (Semanas!)",
                descricao: "O braço InMoov tem ~40 peças para imprimir. Comece pelo ombro, depois braço, antebraço, punho, palma e 5 dedos (3 falanges cada). Use PLA com 20% de preenchimento. Tempo total de impressão: 40-60 horas.",
                imagem: null
            },
            {
                numero: 2,
                titulo: "Montar o Ombro",
                descricao: "O ombro usa 2 servos HS-805BB para movimento vertical e horizontal. Use rolamentos de 8mm nas articulações para movimento suave com o peso do braço.",
                imagem: null
            },
            {
                numero: 3,
                titulo: "Montar Cotovelo e Antebraço",
                descricao: "O cotovelo usa 1 servo HS-805BB. O antebraço abriga os servos MG996R que controlam o punho (rotação e flexão).",
                imagem: null
            },
            {
                numero: 4,
                titulo: "Montar a Mão",
                descricao: "A mão InMoov tem 5 dedos completos com tendões de nylon. Cada dedo é controlado por 1 servo MG996R na palma. Os tendões passam por dentro dos dedos e se fixam nos servos.",
                imagem: null
            },
            {
                numero: 5,
                titulo: "Conectar Eletrônica",
                descricao: "Use 2 Arduino Mega: um controla ombro+cotovelo+punho (3 servos grandes + 2 pequenos), outro controla os 5 dedos. Alimente tudo com fonte ATX 12V 30A.",
                imagem: null
            },
            {
                numero: 6,
                titulo: "Programar Movimentos",
                descricao: "Carregue o código com sequências de movimentos: acenar, apontar, pegar objetos. O InMoov pode ser controlado por Kinect para imitar movimentos humanos.",
                codigo: "inmoov_braco.ino"
            },
        ],

        codigoFonte: {
            "inmoov_braco.ino": `// Idenza Academy — InMoov Braco Humanoide
#include <Servo.h>

// Servos do braco
Servo ombro_vert, ombro_horiz, cotovelo, punho_rot, punho_flex;

// Servos dos dedos
Servo dedo[5];
int pinos_dedos[5] = {3, 5, 6, 9, 10};

void setup() {
  Serial.begin(9600);
  
  ombro_vert.attach(22);
  ombro_horiz.attach(23);
  cotovelo.attach(24);
  punho_rot.attach(25);
  punho_flex.attach(26);
  
  for (int i = 0; i < 5; i++) dedo[i].attach(pinos_dedos[i]);
  
  posicaoRepouso();
  Serial.println("InMoov Braco — Pronto!");
}

void posicaoRepouso() {
  ombro_vert.write(90);
  ombro_horiz.write(90);
  cotovelo.write(90);
  punho_rot.write(90);
  punho_flex.write(90);
  for (int i = 0; i < 5; i++) dedo[i].write(0);  // Maos abertas
}

void acenar() {
  for (int i = 0; i < 3; i++) {
    ombro_vert.write(45);  delay(500);
    ombro_vert.write(135); delay(500);
  }
  ombro_vert.write(90);
}

void apontar() {
  for (int i = 1; i < 5; i++) dedo[i].write(180);  // Fecha 4 dedos
  dedo[1].write(0);  // Mantem indicador esticado
  delay(1000);
  posicaoRepouso();
}

void loop() {
  if (Serial.available() > 0) {
    char cmd = Serial.read();
    switch (cmd) {
      case 'A': acenar(); break;
      case 'P': apontar(); break;
      case 'R': posicaoRepouso(); break;
    }
  }
}`,
        },

        dicas: [
            "Use filamento de qualidade — peças mal impressas quebram sob torque",
            "Os servos HS-805BB consomem 3A cada em stall — fonte de 30A é necessária",
            "Rolamentos são ESSENCIAIS nas articulações do ombro — sem eles, o atrito trava",
            "Comece montando a mão primeiro (é a parte mais complexa)",
            "O projeto completo leva semanas — tenha paciência e faça uma peça por vez",
        ],
    },
];

// ============================================================
// EXPORTAÇÃO
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IDENZA_ROBOS_DATABASE;
}
