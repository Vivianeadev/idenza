/* ============================================================
   NEXUS ROBOTICS ACADEMY v6.0
   ARQUIVO: js/data/products-catalog.js
   DESCRIÇÃO: Catálogo completo de produtos — 100+ itens
              organizados em 9 categorias com BOM e specs
   ============================================================ */

const NEXUS_PRODUCTS_CATALOG = {

  // ==========================================
  // 1. MICROCONTROLADORES (10 produtos)
  // ==========================================
  microcontrollers: [
    {
      id: "arduino-uno-r4",
      name: "Arduino Uno R4 WiFi",
      manufacturer: "Arduino",
      chip: "Renesas RA4M1 (ARM Cortex-M4)",
      clock: "48 MHz",
      ram: "32 KB SRAM + 256 KB Flash",
      connectivity: ["WiFi", "Bluetooth 5", "LED Matrix 12x8"],
      gpio: 14,
      voltage: "5V",
      interfaces: ["UART", "I2C", "SPI", "CAN"],
      price: "$27.50",
      level: "iniciante",
      projects: 45,
      image: "arduino-uno-r4.jpg",
      datasheet: "https://docs.arduino.cc/hardware/uno-r4-wifi",
      bom: ["Placa Uno R4", "Cabo USB-C", "Breadboard 830pts", "Jumpers macho-macho x20"],
      description: "Porta de entrada para o mundo Arduino. WiFi integrado, matriz de LEDs e compatibilidade com todos os shields Uno."
    },
    {
      id: "arduino-mega-2560",
      name: "Arduino Mega 2560 R3",
      manufacturer: "Arduino",
      chip: "ATmega2560",
      clock: "16 MHz",
      ram: "8 KB SRAM + 256 KB Flash",
      connectivity: ["Serial 4x", "I2C", "SPI"],
      gpio: 54,
      voltage: "5V",
      interfaces: ["UART x4", "I2C", "SPI"],
      price: "$40",
      level: "iniciante",
      projects: 60,
      image: "arduino-mega.jpg",
      datasheet: "https://docs.arduino.cc/hardware/mega-2560",
      bom: ["Placa Mega 2560", "Cabo USB-B", "Fonte 9V 1A"],
      description: "O cérebro para projetos grandes. 54 GPIOs, 4 portas serial — ideal para robôs complexos e impressoras 3D."
    },
    {
      id: "arduino-nano-33-ble",
      name: "Arduino Nano 33 BLE Sense Rev2",
      manufacturer: "Arduino",
      chip: "nRF52840 (ARM Cortex-M4F)",
      clock: "64 MHz",
      ram: "256 KB SRAM + 1 MB Flash",
      connectivity: ["Bluetooth 5", "BLE Long Range", "NFC"],
      gpio: 14,
      voltage: "3.3V",
      sensors: ["IMU 9-axis", "Microfone", "Temp", "Umidade", "Pressão", "Proximidade", "Cor"],
      price: "$42",
      level: "intermediario",
      projects: 35,
      features: ["TinyML onboard", "Edge Impulse ready"],
      description: "Pequeno mas poderoso. Todos os sensores que você precisa para IA na borda em uma placa minúscula."
    },
    {
      id: "esp32-s3",
      name: "ESP32-S3 DevKit",
      manufacturer: "Espressif",
      chip: "Xtensa LX7 dual-core",
      clock: "240 MHz",
      ram: "512 KB SRAM + 8 MB PSRAM + 16 MB Flash",
      connectivity: ["WiFi 6", "Bluetooth 5 LE", "USB OTG"],
      gpio: 45,
      voltage: "3.3V",
      interfaces: ["UART x3", "I2C x2", "SPI x4", "I2S", "DVP Camera"],
      price: "$15",
      level: "intermediario",
      projects: 80,
      features: ["Acelerador IA vetorial", "Reconhecimento de voz on-device"],
      description: "O campeão custo-benefício. WiFi 6, aceleração de IA e câmera — tudo por $15."
    },
    {
      id: "esp32-c6",
      name: "ESP32-C6 DevKit",
      manufacturer: "Espressif",
      chip: "RISC-V 32-bit",
      clock: "160 MHz",
      ram: "512 KB SRAM + 8 MB Flash",
      connectivity: ["WiFi 6", "Bluetooth 5.4", "Zigbee 3.0", "Thread", "Matter"],
      gpio: 30,
      voltage: "3.3V",
      price: "$8",
      level: "avancado",
      projects: 35,
      description: "O primeiro RISC-V com Matter. Conecta qualquer coisa a qualquer ecossistema smart home."
    },
    {
      id: "raspberry-pi-pico-2",
      name: "Raspberry Pi Pico 2 W",
      manufacturer: "Raspberry Pi Foundation",
      chip: "RP2350 (dual ARM Cortex-M33 + dual RISC-V Hazard3)",
      clock: "150 MHz",
      ram: "520 KB SRAM + 4 MB Flash",
      connectivity: ["WiFi", "Bluetooth 5.2"],
      gpio: 26,
      voltage: "3.3V",
      interfaces: ["PIO programável x2", "UART x2", "I2C x2", "SPI x2"],
      price: "$7",
      level: "iniciante",
      projects: 40,
      description: "O microcontrolador mais versátil. PIOs programáveis fazem mágica com qualquer protocolo."
    },
    {
      id: "stm32f411",
      name: "STM32F411 Black Pill",
      manufacturer: "STMicroelectronics",
      chip: "ARM Cortex-M4F com FPU + DSP",
      clock: "100 MHz",
      ram: "128 KB SRAM + 512 KB Flash",
      connectivity: ["SPI", "I2C", "UART", "CAN", "USB OTG"],
      gpio: 25,
      voltage: "3.3V",
      price: "$12",
      level: "intermediario",
      projects: 30,
      description: "Performance ARM com DSP. Ideal para controle de motores e processamento de sinal em tempo real."
    },
    {
      id: "teensy-4-1",
      name: "Teensy 4.1",
      manufacturer: "PJRC",
      chip: "ARM Cortex-M7",
      clock: "600 MHz",
      ram: "1 MB SRAM + 8 MB Flash",
      connectivity: ["Ethernet", "USB Host", "CAN FD", "SD Card"],
      gpio: 55,
      voltage: "3.3V",
      price: "$32",
      level: "avancado",
      projects: 25,
      features: ["Sintetizador MIDI", "Processamento de áudio em tempo real"],
      description: "Fera do processamento. 600 MHz em um microcontrolador — áudio, MIDI, Ethernet, tudo em tempo real."
    },
    {
      id: "nrf52840",
      name: "Adafruit Feather nRF52840 Express",
      manufacturer: "Adafruit",
      chip: "ARM Cortex-M4F",
      clock: "64 MHz",
      ram: "256 KB SRAM + 1 MB Flash",
      connectivity: ["Bluetooth 5 Long Range", "Thread", "Zigbee", "NFC", "USB"],
      gpio: 21,
      voltage: "3.3V",
      price: "$25",
      level: "intermediario",
      projects: 30,
      description: "Conectividade total em formato Feather. Bluetooth Long Range (200m+) + Thread + Zigbee."
    },
    {
      id: "seeed-xiao-esp32s3",
      name: "Seeed Studio XIAO ESP32S3 Sense",
      manufacturer: "Seeed Studio",
      chip: "ESP32-S3",
      clock: "240 MHz",
      ram: "8 MB PSRAM + 8 MB Flash",
      connectivity: ["WiFi", "BLE 5"],
      gpio: 11,
      voltage: "3.3V",
      size: "21 x 17.5 mm",
      sensors: ["Câmera 2MP", "Microfone digital PDM"],
      price: "$15",
      level: "intermediario",
      projects: 20,
      description: "Visão computacional em 21mm. Do tamanho de uma unha, com câmera e microfone onboard."
    }
  ],

  // ==========================================
  // 2. COMPUTADORES DE PLACA ÚNICA / SBCs (8 produtos)
  // ==========================================
  sbcs: [
    {
      id: "raspberry-pi-5",
      name: "Raspberry Pi 5 (8GB)",
      manufacturer: "Raspberry Pi Foundation",
      cpu: "ARM Cortex-A76 quad-core 2.4 GHz",
      ram: "8 GB LPDDR4X",
      gpu: "VideoCore VII @ 800 MHz",
      storage: "microSD + M.2 NVMe (via HAT)",
      connectivity: ["WiFi 5", "Bluetooth 5", "Gigabit Ethernet", "PCIe 2.0 x1"],
      ports: ["USB 3.0 x2", "USB 2.0 x2", "HDMI 4K60 x2", "CSI/DSI"],
      price: "$80",
      level: "intermediario",
      projects: 150,
      os: ["Raspberry Pi OS", "Ubuntu 24.04", "ROS 2 Humble"],
      description: "O cérebro da revolução maker. 2.4 GHz quad-core, PCIe para NVMe, ROS 2 nativo."
    },
    {
      id: "jetson-orin-nano",
      name: "NVIDIA Jetson Orin Nano Dev Kit (8GB)",
      manufacturer: "NVIDIA",
      cpu: "ARM Cortex-A78AE 6-core",
      ram: "8 GB LPDDR5",
      gpu: "Ampere (1024 núcleos CUDA + 32 Tensor Cores)",
      aiPerformance: "40 TOPS",
      storage: "M.2 NVMe (não incluso)",
      connectivity: ["WiFi 6", "Gigabit Ethernet", "PCIe 3.0"],
      ports: ["USB 3.2 x4", "HDMI", "MIPI CSI x2"],
      price: "$499",
      level: "avancado",
      projects: 60,
      os: ["JetPack 6", "Ubuntu 22.04", "ROS 2"],
      description: "IA de verdade na borda. 40 TOPS para rodar YOLOv8, transformers e SLAM simultaneamente."
    },
    {
      id: "jetson-agx-orin",
      name: "NVIDIA Jetson AGX Orin 64GB",
      manufacturer: "NVIDIA",
      cpu: "ARM Cortex-A78AE 12-core",
      ram: "64 GB LPDDR5",
      gpu: "Ampere (2048 CUDA + 64 Tensor Cores)",
      aiPerformance: "275 TOPS",
      price: "$1,999",
      level: "especialista",
      projects: 20,
      description: "O topo da cadeia. 275 TOPS — roda múltiplos modelos de IA, SLAM 3D e navegação autônoma completa."
    },
    {
      id: "radxa-rock-5b",
      name: "Radxa ROCK 5B (16GB)",
      manufacturer: "Radxa",
      cpu: "Rockchip RK3588 octa-core (4x A76 + 4x A55)",
      ram: "16 GB LPDDR4X",
      gpu: "Mali-G610 MP4",
      aiPerformance: "6 TOPS NPU",
      storage: "M.2 NVMe + microSD",
      connectivity: ["WiFi 6E", "Bluetooth 5.2", "2.5GbE"],
      ports: ["USB 3.2 x2", "HDMI 8K", "MIPI CSI x3"],
      price: "$189",
      level: "avancado",
      projects: 35,
      os: ["Armbian", "Ubuntu", "Android"],
      description: "A alternativa poderosa ao Pi. 16GB RAM, NPU 6 TOPS, 3 entradas de câmera."
    },
    {
      id: "orange-pi-5-max",
      name: "Orange Pi 5 Max (16GB)",
      manufacturer: "Orange Pi",
      cpu: "Rockchip RK3588 octa-core",
      ram: "16 GB LPDDR4X",
      gpu: "Mali-G610 MP4",
      aiPerformance: "6 TOPS NPU",
      price: "$149",
      level: "intermediario",
      projects: 30,
      description: "Especificações de topo por preço de entrada. RK3588 com 16GB RAM."
    },
    {
      id: "beaglebone-black",
      name: "BeagleBone Black Industrial",
      manufacturer: "BeagleBoard.org",
      cpu: "ARM Cortex-A8",
      ram: "512 MB DDR3",
      features: ["PRUs em tempo real x2", "ADC 12-bit 8ch", "CAN Bus nativo"],
      price: "$65",
      level: "avancado",
      projects: 25,
      niche: "Controle industrial determinístico com PRUs",
      description: "O rei do tempo real. PRUs garantem controle determinístico — nada de Linux atrapalhando seus timings."
    },
    {
      id: "lattepanda-sigma",
      name: "LattePanda Sigma",
      manufacturer: "LattePanda",
      cpu: "Intel Core i5-1340P (12-core, 16 threads)",
      ram: "32 GB LPDDR5",
      gpu: "Intel Iris Xe Graphics",
      connectivity: ["WiFi 6E", "Bluetooth 5.3", "2.5GbE", "Thunderbolt 4"],
      price: "$649",
      level: "especialista",
      projects: 15,
      features: ["Windows 11 + Linux dual boot", "x86 nativo", "ROS 2 aceleração total"],
      description: "PC completo em tamanho de carta. Roda Windows e Linux nativamente com performance de laptop premium."
    },
    {
      id: "khadas-vim4",
      name: "Khadas VIM4",
      manufacturer: "Khadas",
      cpu: "Amlogic A311D2 octa-core",
      ram: "8 GB LPDDR4X",
      gpu: "Mali-G52 MP8",
      aiPerformance: "5 TOPS NPU",
      price: "$189",
      level: "avancado",
      projects: 20,
      description: "Design premium com NPU. Suite completa de IA com aceleração de hardware."
    }
  ],

  // ==========================================
  // 3. ROBÔS E PLATAFORMAS (8 produtos)
  // ==========================================
  robots: [
    {
      id: "turtlebot-4",
      name: "TurtleBot 4",
      type: "Carrinho diferencial educacional",
      manufacturer: "Clearpath Robotics / Open Robotics",
      dof: 2,
      payload: "9 kg",
      speed: "0.3 m/s",
      sensors: ["Lidar 360° RPLidar S2", "Câmera RGB-D RealSense", "IMU BNO055", "Odometria", "Bumper"],
      compute: "Raspberry Pi 4",
      ros: "ROS 2 Humble nativo",
      price: "$1,500",
      level: "intermediario",
      projects: 80,
      description: "O robô oficial do ROS 2. Aprenda navegação, SLAM e manipulação na plataforma padrão da indústria."
    },
    {
      id: "ur5e",
      name: "Universal Robots UR5e",
      type: "Braço colaborativo industrial",
      manufacturer: "Universal Robots",
      dof: 6,
      payload: "5 kg",
      reach: "850 mm",
      repeatability: "±0.03 mm",
      ros: "ROS + ROS 2 via ur_robot_driver",
      price: "$35,000",
      level: "profissional",
      projects: 30,
      description: "Braço industrial de verdade. Repetibilidade de 0.03mm com segurança colaborativa certificada."
    },
    {
      id: "unitree-go2",
      name: "Unitree Go2",
      type: "Quadrúpede",
      manufacturer: "Unitree Robotics",
      dof: 12,
      weight: "15 kg",
      payload: "5 kg",
      speed: "5 m/s",
      sensors: ["Lidar 360°", "Câmeras depth 4x", "IMU", "Force sensors nas patas"],
      features: ["Corre 5 m/s", "Sobe escadas", "Auto-recuperação de queda"],
      ros: "ROS 2 Humble",
      price: "$1,600",
      level: "avancado",
      projects: 25,
      description: "O cão-robô acessível. Corre, sobe escadas e se levanta sozinho com ROS 2 onboard."
    },
    {
      id: "crazyflie",
      name: "Bitcraze Crazyflie 2.1",
      type: "Drone nano para enxames",
      manufacturer: "Bitcraze",
      dof: 4,
      weight: "27g",
      flightTime: "7 min",
      sensors: ["IMU 9-DOF", "Barômetro", "Optical flow deck (opcional)"],
      ros: "ROS 2 via Crazyswarm2",
      price: "$225",
      level: "avancado",
      projects: 40,
      description: "Enxames de drones em miniatura. Controle 10+ Crazyflies simultaneamente com Crazyswarm2."
    },
    {
      id: "otto-diy",
      name: "Otto DIY",
      type: "Robô humanoide educativo (impresso em 3D)",
      manufacturer: "Open Source (Community)",
      dof: 6,
      compute: "Arduino Nano / ESP32",
      price: "$60 (peças + impressão 3D)",
      level: "iniciante",
      projects: 50,
      age: "10+ anos",
      description: "Construa seu primeiro robô humanoide. Impresso em 3D, controlado por Arduino, dança e anda."
    },
    {
      id: "openmanipulator-x",
      name: "ROBOTIS OpenManipulator-X",
      type: "Braço educacional ROS",
      manufacturer: "ROBOTIS",
      dof: 5 + garra,
      payload: "500g",
      reach: "380 mm",
      ros: "ROS + ROS 2 + MoveIt",
      price: "$1,200",
      level: "intermediario",
      projects: 35,
      description: "Braço feito para ROS. MoveIt integrado, perfeito para aprender cinemática e planejamento de trajetória."
    },
    {
      id: "leo-rover",
      name: "Leo Rover",
      type: "Rover outdoor para pesquisa",
      manufacturer: "Leo Rover",
      dof: 2 + suspensão rocker-bogie,
      compute: "Raspberry Pi 4 + STM32",
      sensors: ["GPS", "IMU", "Encoders"],
      ros: "ROS + ROS 2",
      price: "$2,500",
      level: "avancado",
      projects: 20,
      description: "Exploração off-road. Suspensão rocker-bogie, GPS e ROS para mapeamento outdoor."
    },
    {
      id: "bluerov2",
      name: "BlueROV2",
      type: "ROV subaquático",
      manufacturer: "Blue Robotics",
      dof: 6,
      depth: "100m",
      sensors: ["Câmera HD 1080p", "Luzes LED 1500 lumens", "IMU", "Profundidade"],
      price: "$1,800",
      level: "avancado",
      projects: 15,
      description: "Exploração subaquática. 100m de profundidade com ROS para inspeção de cascos e dutos."
    }
  ],

  // ==========================================
  // 4. SENSORES (25+ produtos em 3 subcategorias)
  // ==========================================
  sensors: {
    vision: [
      { id: "realsense-d435i", name: "Intel RealSense D435i", type: "Depth estéreo + IMU", range: "0.3–3m", fps: 90, fov: "87°x58°", resolution: "1280x720 depth", price: "$300" },
      { id: "realsense-d455", name: "Intel RealSense D455", type: "Depth estéreo longo alcance", range: "0.4–6m", fps: 90, fov: "87°x58°", price: "$400" },
      { id: "oak-d-pro", name: "Luxonis OAK-D Pro", type: "Depth + IA on-device", range: "0.3–5m", fps: 60, features: ["YOLO nativo", "SLAM on-chip", "Night vision IR ativo"], price: "$350" },
      { id: "oak-1-max", name: "Luxonis OAK-1 MAX", type: "RGB 4K + IA", fps: 60, resolution: "12MP", price: "$150" },
      { id: "rplidar-a1", name: "Slamtec RPLidar A1M8", type: "Lidar 360°", range: "12m", precision: "±10mm", sampleRate: "8000 pts/s", price: "$100" },
      { id: "rplidar-s2", name: "Slamtec RPLidar S2", type: "Lidar 360° outdoor", range: "30m", precision: "±10mm", sampleRate: "32000 pts/s", price: "$350" },
      { id: "livox-mid40", name: "Livox Mid-40", type: "Lidar 3D estado sólido", range: "260m", fov: "38.4° circular", price: "$1,500" },
      { id: "flir-lepton", name: "FLIR Lepton 3.5", type: "Câmera térmica", resolution: "160x120", thermalSensitivity: "<50mK", price: "$250" },
      { id: "pi-camera-v3", name: "Raspberry Pi Camera Module 3", type: "RGB 12MP", features: ["Autofocus", "HDR", "Wide angle 102°"], price: "$25" },
    ],
    environmental: [
      { id: "bme680", name: "Bosch BME680", measures: "Temp, Umidade, Pressão, VOC (qualidade do ar)", accuracy: "±0.5°C / ±3% RH", price: "$15" },
      { id: "sht45", name: "Sensirion SHT45", measures: "Temp, Umidade", accuracy: "±0.1°C / ±1% RH", price: "$12", note: "Grau laboratorial" },
      { id: "pms5003", name: "Plantower PMS5003", measures: "PM1.0, PM2.5, PM10 (partículas)", range: "0–500 µg/m³", price: "$15" },
      { id: "sgp30", name: "Sensirion SGP30", measures: "CO2eq, TVOC", price: "$20" },
      { id: "ds18b20", name: "Maxim DS18B20 (à prova d'água)", measures: "Temperatura", accuracy: "±0.5°C", range: "-55°C a +125°C", price: "$3" },
      { id: "sen55", name: "Sensirion SEN55", measures: "PM, VOC, NOx, Temp, Umidade (tudo em 1)", price: "$40" },
      { id: "atlas-ph", name: "Atlas Scientific pH Probe", measures: "pH 0–14", accuracy: "±0.01", price: "$80" },
      { id: "atlas-do", name: "Atlas Scientific DO Probe", measures: "Oxigênio dissolvido", price: "$200" },
    ],
    position: [
      { id: "bno055", name: "Bosch BNO055", type: "IMU 9-DOF absoluta", accuracy: "±1° orientação", features: ["Fusão de sensores onboard"], price: "$20" },
      { id: "neo-6m", name: "u-blox NEO-6M", type: "GPS", accuracy: "2.5m", updateRate: "5 Hz", price: "$10" },
      { id: "zed-f9p", name: "u-blox ZED-F9P", type: "GPS RTK centimétrico", accuracy: "1cm com correção", updateRate: "20 Hz", price: "$200" },
      { id: "as5600", name: "AMS AS5600", type: "Encoder magnético 12-bit", accuracy: "0.087°", interface: "I2C / PWM", price: "$5" },
      { id: "vl53l5cx", name: "ST VL53L5CX", type: "ToF 8x8 multi-zona (64 pixels)", range: "4m", precision: "±1mm", price: "$15" },
      { id: "tf-luna", name: "Benewake TF-Luna", type: "ToF single-point", range: "8m (indoor) / 2m (outdoor)", price: "$20" },
    ],
  },

  // ==========================================
  // 5. ATUADORES E MOTORES (7 produtos)
  // ==========================================
  actuators: [
    { id: "sg90", name: "Micro Servo SG90", type: "Servo analógico", torque: "0.18 N·m (1.8 kg·cm)", speed: "0.1s/60°", weight: "9g", price: "$3", level: "iniciante" },
    { id: "mg996r", name: "Servo MG996R", type: "Servo digital engrenagem metálica", torque: "1.1 N·m (11 kg·cm)", speed: "0.17s/60°", weight: "55g", price: "$8", level: "iniciante" },
    { id: "dynamixel-ax12a", name: "Dynamixel AX-12A", type: "Servo inteligente", torque: "1.5 N·m (15.3 kg·cm)", feedback: ["Posição", "Temperatura", "Carga", "Tensão"], interface: "TTL Half-duplex", price: "$50", level: "intermediario" },
    { id: "dynamixel-xm540", name: "Dynamixel XM540-W270", type: "Servo inteligente alto torque", torque: "12.5 N·m (127 kg·cm)", feedback: ["Posição", "Velocidade", "Corrente", "Temperatura"], interface: "TTL/RS-485", price: "$350", level: "avancado" },
    { id: "odrive-pro", name: "ODrive Pro", type: "Driver BLDC dual FOC", features: ["FOC", "Encoder", "CAN", "Python API", "Regenerative braking"], power: "48V/50A por canal", price: "$199", level: "avancado" },
    { id: "nema17", name: "NEMA 17 + Driver TMC2209", type: "Motor de passo", torque: "0.5 N·m", precision: "1.8° / 200 passos (até 256 microsteps)", price: "$25", level: "intermediario", note: "TMC2209 = silencioso" },
    { id: "nema23", name: "NEMA 23 + Driver TB6600", type: "Motor de passo grande porte", torque: "2 N·m", precision: "1.8° / 200 passos", price: "$60", level: "avancado" },
  ],

  // ==========================================
  // 6. SOFTWARE E FRAMEWORKS
  // ==========================================
  software: {
    operatingSystems: [
      { id: "ros2-humble", name: "ROS 2 Humble Hawksbill", type: "Middleware robótico", lts: "Maio 2027", language: "C++17 / Python 3.10", price: "Gratuito (Apache 2.0)" },
      { id: "ros2-jazzy", name: "ROS 2 Jazzy Jalisco", type: "Middleware robótico (latest)", lts: "Maio 2029", price: "Gratuito" },
      { id: "micro-ros", name: "Micro-ROS", type: "ROS 2 para microcontroladores", targets: "ESP32, STM32, Arduino, Zephyr", price: "Gratuito" },
      { id: "ubuntu-core", name: "Ubuntu Core 24", type: "Sistema imutável para IoT", features: ["Snaps", "Atualização atômica", "Segurança por isolamento"], price: "Gratuito" },
    ],
    simulation: [
      { id: "gazebo-harmonic", name: "Gazebo Harmonic", type: "Simulador 3D física", features: ["ROS 2 nativo", "GPU accelerated"], price: "Gratuito (Apache 2.0)" },
      { id: "isaac-sim", name: "NVIDIA Isaac Sim 2024", type: "Simulador fotorrealista GPU", features: ["RTX rendering", "Isaac Gym", "Digital twins"], price: "Gratuito em Jetson / Cloud pago" },
      { id: "webots", name: "Webots R2024", type: "Simulador multi-robô", features: ["70+ modelos prontos", "Cross-platform"], price: "Gratuito (open source)" },
      { id: "coppeliasim", name: "CoppeliaSim", type: "Simulador com API script", features: ["Python + Lua scripting", "Vision sensors"], price: "Gratuito (edu) / Comercial $3k" },
    ],
    ai: [
      { id: "yolov8", name: "Ultralytics YOLOv8", type: "Detecção/segmentação/pose", performance: "Real-time em Jetson Orin", price: "Gratuito (AGPL)" },
      { id: "pytorch", name: "PyTorch 2.4", type: "Framework deep learning", price: "Gratuito (BSD)" },
      { id: "tflite-micro", name: "TensorFlow Lite Micro", type: "ML para microcontroladores", targets: "Arduino, ESP32, Cortex-M", price: "Gratuito" },
      { id: "llama3", name: "Llama 3.1 (via Ollama)", type: "LLM local para robôs", size: "8B parâmetros (4.7GB quantizado)", price: "Gratuito (Meta)" },
      { id: "whisper", name: "Faster Whisper", type: "Speech-to-Text multilíngue", performance: "Real-time em Jetson Orin", price: "Gratuito (MIT)" },
      { id: "piper-tts", name: "Piper TTS", type: "Text-to-Speech offline", voices: "30+ vozes, múltiplos idiomas", price: "Gratuito (MIT)" },
    ],
    infrastructure: [
      { id: "docker", name: "Docker + Compose v2", type: "Containerização", price: "Gratuito" },
      { id: "k3s", name: "K3s (Kubernetes leve)", type: "Orquestração de frota robótica", price: "Gratuito (Apache 2.0)" },
      { id: "grafana", name: "Grafana + Prometheus", type: "Monitoramento e observabilidade", price: "Gratuito (AGPL)" },
      { id: "emqx", name: "EMQX (MQTT Broker)", type: "Mensageria IoT escalável", capacity: "100M+ conexões", price: "Gratuito (community)" },
      { id: "zenoh", name: "Zenoh", type: "Protocolo next-gen robótica", features: ["Pub/sub", "Queries", "Zero-copy"], price: "Gratuito (Apache 2.0)" },
    ],
  },

  // ==========================================
  // 7. FERRAMENTAS DE FABRICAÇÃO (6 produtos)
  // ==========================================
  fabrication: [
    { id: "ender3-v3", name: "Creality Ender 3 V3 SE", type: "Impressora 3D FDM", volume: "220x220x250mm", speed: "250 mm/s (máx 500)", features: ["Auto nivelamento", "Direct drive"], price: "$200" },
    { id: "bambu-a1", name: "Bambu Lab A1", type: "Impressora 3D FDM rápida", volume: "256x256x256mm", speed: "500 mm/s", features: ["AMS multicolor (opcional)", "AI fault detection"], price: "$400" },
    { id: "anycubic-photon", name: "Anycubic Photon Mono 2", type: "Impressora 3D SLA/resina", precision: "0.01mm (10 microns)", volume: "165x143x89mm", price: "$200", note: "Para peças de alta precisão" },
    { id: "xtool-d1", name: "xTool D1 Pro 20W", type: "Cortadora a laser diodo", area: "430x390mm", materials: ["Madeira 10mm", "Acrílico escuro 8mm", "Couro"], price: "$700" },
    { id: "snapmaker-artisan", name: "Snapmaker Artisan", type: "3-em-1 (FDM + Laser 10W + CNC 200W)", volume: "400x400x400mm", price: "$2,800" },
    { id: "cnc-3018", name: "Genmitsu CNC 3018-PRO", type: "CNC router de entrada", area: "300x180x45mm", price: "$200" },
  ],

  // ==========================================
  // 8. KITS COMPLETOS (CURADOS PELA NEXUS)
  // ==========================================
  kits: [
    {
      id: "kit-iniciante-iot",
      name: "Kit Iniciante IoT — Sua Primeira Rede de Sensores",
      level: "iniciante",
      price: "$89",
      contents: [
        "Arduino Uno R4 WiFi",
        "Sensor BME680 (temp/umidade/pressão/VOC)",
        "Sensor PMS5003 (partículas PM2.5)",
        "Display OLED 0.96\" 128x64",
        "Breadboard 830 pontos",
        "Jumpers macho-macho x30",
        "Fonte 9V 1A",
        "Case organizadora"
      ],
      projects: 5,
      certification: "Nexus IoT Fundamentals",
      description: "Do zero à sua primeira rede de sensores. Construa um monitor ambiental completo em 5 projetos guiados."
    },
    {
      id: "kit-intermediario-ros",
      name: "Kit Intermediário — Robô com ROS 2",
      level: "intermediario",
      price: "$499",
      contents: [
        "Raspberry Pi 5 8GB",
        "RPLidar A1M8 (360°)",
        "Câmera Pi v3 12MP",
        "IMU BNO055 9-DOF",
        "Motores DC 12V com encoder x2",
        "Driver L298N dual",
        "Bateria LiPo 3S 5000mAh",
        "Chassi acrílico 2WD",
        "Cartão SD 64GB"
      ],
      projects: 8,
      certification: "Nexus ROS Associate",
      description: "Construa um robô autônomo completo. SLAM, navegação e visão computacional com ROS 2 Humble."
    },
    {
      id: "kit-avancado-ia",
      name: "Kit Avançado — IA na Borda com Jetson",
      level: "avancado",
      price: "$1,499",
      contents: [
        "NVIDIA Jetson Orin Nano 8GB",
        "Câmera Luxonis OAK-D Pro (depth + IA)",
        "Dynamixel XM540 x4 (servos inteligentes)",
        "ODrive Pro (driver BLDC)",
        "Motor BLDC 500W",
        "Bateria LiPo 6S 10000mAh",
        "Fonte 24V industrial"
      ],
      projects: 6,
      certification: "Nexus AI Robotics Professional",
      description: "IA de verdade. YOLOv8, SLAM visual e controle de motores de alta performance em tempo real."
    },
    {
      id: "kit-especialista-frota",
      name: "Kit Especialista — Frota de 5 Robôs",
      level: "especialista",
      price: "$4,999",
      contents: [
        "ESP32-S3 x5 (comunicação)",
        "Raspberry Pi 5 8GB x5 (cérebro)",
        "RPLidar A1 x5 (navegação)",
        "Switch Gigabit 8 portas",
        "Mini PC servidor (Intel NUC i5)",
        "K3s + Grafana + Prometheus pré-instalados",
        "Documentação de arquitetura de frota"
      ],
      projects: 3,
      certification: "Nexus Robotics Architect",
      description: "Gerencie uma frota inteira. Kubernetes para robôs, monitoramento centralizado e orquestração de tarefas."
    },
  ],

  // ==========================================
  // 9. PROTOCOLOS DE COMUNICAÇÃO (catálogo de referência)
  // ==========================================
  protocols: {
    wired: [
      { name: "UART/Serial", speed: "Até 6 Mbps", range: "3m (RS-232) / 15m (TTL)", pair: "2 fios (TX/RX)" },
      { name: "I²C", speed: "100 kHz–5 MHz", range: "1m", devices: "127 por barramento", pair: "2 fios (SDA/SCL)" },
      { name: "SPI", speed: "Até 100 MHz", range: "30cm", pair: "4 fios (MOSI/MISO/SCK/CS)" },
      { name: "CAN Bus", speed: "1 Mbps", range: "1 km", pair: "2 fios (CANH/CANL)", note: "Padrão automotivo e industrial" },
      { name: "CAN FD", speed: "8 Mbps", payload: "64 bytes (vs 8 do CAN)", note: "Evolução do CAN" },
      { name: "RS-485 / Modbus RTU", speed: "10 Mbps", range: "1.2 km", devices: "32 por barramento", note: "Padrão industrial" },
      { name: "Ethernet TCP/IP", speed: "Até 10 Gbps", range: "100m (cobre) / 40km (fibra)" },
      { name: "EtherCAT", speed: "100 Mbps", determinism: "100 µs jitter", note: "Controle de movimento industrial" },
      { name: "USB 3.2/4.0", speed: "Até 40 Gbps", range: "3m" },
      { name: "PCIe 4.0/5.0", speed: "16 GT/s por lane (4.0)", note: "Conexão de GPU e NVMe" },
      { name: "1-Wire", speed: "16.3 kbps", range: "300m", pair: "1 fio + GND", note: "Sensores Dallas" },
      { name: "LIN Bus", speed: "19.2 kbps", range: "40m", note: "Automotivo (sub-CAN)" },
      { name: "I3C", speed: "33 Mbps", note: "Evolução do I²C com hot-join e in-band interrupts" },
    ],
    wireless: [
      { name: "WiFi 6/6E/7", freq: "2.4/5/6 GHz", speed: "Até 46 Gbps (WiFi 7)", range: "50m indoor" },
      { name: "Bluetooth 5.4", freq: "2.4 GHz", speed: "2 Mbps", range: "200m+ (LE Long Range)" },
      { name: "Zigbee 3.0", freq: "2.4 GHz", speed: "250 kbps", range: "100m", mesh: "Sim" },
      { name: "Thread", freq: "2.4 GHz", speed: "250 kbps", mesh: "Sim", note: "IPv6 nativa, base do Matter" },
      { name: "Matter 1.3", note: "Padrão unificado (WiFi + Thread). Compatível com Apple, Google, Amazon, Samsung" },
      { name: "Z-Wave 800", freq: "Sub-GHz (varia por país)", range: "100m", mesh: "Sim, até 232 nós" },
      { name: "LoRa (SX1276)", freq: "868/915 MHz", speed: "50 kbps", range: "15 km (rural)", note: "Baixíssimo consumo" },
      { name: "LoRaWAN", note: "Rede LoRa com gateways. The Things Network (gratuito global), Helium (cripto)" },
      { name: "NB-IoT / LTE-M", note: "Redes celulares 4G/5G para IoT. Cobertura de operadoras" },
      { name: "5G NR (URLLC)", latency: "1ms", note: "Ultra-Reliable Low Latency — para robôs remotos e V2X" },
      { name: "UWB", precision: "10 cm", note: "Posicionamento indoor preciso (Apple AirTag, FiRa)" },
      { name: "RFID / NFC", freq: "13.56 MHz", range: "10cm", note: "Identificação sem contato" },
      { name: "ESP-NOW", latency: "1ms", range: "200m", note: "Protocolo proprietário Espressif — par a par direto" },
      { name: "nRF24L01+", speed: "2 Mbps", range: "1 km (com PA+LNA)", note: "Clássico para comunicação entre Arduinos" },
    ],
    industrial: [
      { name: "OPC-UA", note: "Padrão Industry 4.0. Cliente/servidor + pub/sub. Segurança integrada" },
      { name: "Modbus TCP", note: "Modbus sobre Ethernet. Simples e onipresente em CLPs" },
      { name: "PROFINET", note: "Ethernet industrial Siemens. Determinismo <1ms" },
      { name: "EtherNet/IP", note: "Ethernet industrial Rockwell/Allen-Bradley. CIP sobre TCP/UDP" },
      { name: "MQTT Sparkplug B", note: "MQTT com payload definido para indústria. Plug-and-play entre fabricantes" },
      { name: "DDS", note: "Data Distribution Service. Base do ROS 2. Comunicação descentralizada peer-to-peer" },
    ],
  },

  // ==========================================
  // MÉTODOS UTILITÁRIOS
  // ==========================================
  /**
   * Busca produto por ID em todas as categorias
   * @param {string} id - ID do produto
   * @returns {object|null} Produto encontrado ou null
   */
  findProductById(id) {
    const categories = [
      ...this.microcontrollers,
      ...this.sbcs,
      ...this.robots,
      ...this.sensors.vision,
      ...this.sensors.environmental,
      ...this.sensors.position,
      ...this.actuators,
      ...this.kits,
    ];
    return categories.find(p => p.id === id) || null;
  },

  /**
   * Filtra produtos por nível
   * @param {string} level - iniciante, intermediario, avancado, especialista, profissional
   * @returns {array} Lista de produtos do nível
   */
  getByLevel(level) {
    const all = [
      ...this.microcontrollers,
      ...this.sbcs,
      ...this.robots,
      ...this.actuators,
      ...this.kits,
    ];
    return all.filter(p => p.level === level);
  },

  /**
   * Retorna todos os produtos com preço menor que o valor
   * @param {number} maxPrice - Preço máximo
   * @returns {array} Lista de produtos
   */
  getByMaxPrice(maxPrice) {
    const all = [
      ...this.microcontrollers,
      ...this.sbcs,
      ...this.robots,
      ...this.sensors.vision,
      ...this.sensors.environmental,
      ...this.sensors.position,
      ...this.actuators,
      ...this.kits,
    ];
    return all.filter(p => {
      const price = parseFloat(p.price.replace(/[$,]/g, ''));
      return !isNaN(price) && price <= maxPrice;
    });
  },

  /**
   * Retorna contagem total de produtos
   * @returns {object} Contagem por categoria
   */
  getTotalCount() {
    return {
      microcontrollers: this.microcontrollers.length,
      sbcs: this.sbcs.length,
      robots: this.robots.length,
      sensors: this.sensors.vision.length + this.sensors.environmental.length + this.sensors.position.length,
      actuators: this.actuators.length,
      software: Object.values(this.software).flat().length,
      fabrication: this.fabrication.length,
      kits: this.kits.length,
      protocols: this.protocols.wired.length + this.protocols.wireless.length + this.protocols.industrial.length,
    };
  },
};

// Exportação para módulos ES6
export default NEXUS_PRODUCTS_CATALOG;

// Também disponível globalmente (para scripts não-modulares)
if (typeof window !== 'undefined') {
  window.NEXUS_PRODUCTS_CATALOG = NEXUS_PRODUCTS_CATALOG;
}

/* ============================================================
   FIM DO ARQUIVO: js/data/products-catalog.js
   PRÓXIMO: js/data/projects-database.js
   ============================================================ */
