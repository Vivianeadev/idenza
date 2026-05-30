/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — CATÁLOGO COMPLETO DE ROBÔS
 * ============================================================
 * 12 robôs open source que qualquer pessoa pode construir.
 * Cada entrada contém: descrição, aprendizado, lista de
 * compras real, ferramentas, passo a passo detalhado,
 * código-fonte funcional e dicas de troubleshooting.
 * @version 1.0.0
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
        video: "https://www.youtube.com/watch?v=example",

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
5V  -> VCC do Buzzer
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
#include <Oscillator.h>  // Biblioteca Otto (baixar do GitHub oficial)

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
];

// Exportação
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IDENZA_ROBOS_DATABASE;
}
