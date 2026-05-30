/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — MÓDULO GUIAS E TUTORIAIS
 * ============================================================
 * 
 * Central de guias práticos:
 * - Conexão Arduino + ROS
 * - Configuração ESP32 + MQTT
 * - Setup NVIDIA Jetson
 * - Docker para robótica
 * - Guias interativos com código
 * 
 * @module Guides
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaGuides = {
    state: {
        guides: [],
        activeGuide: null,
    },

    // ============================================================
    // DADOS DOS GUIAS
    // ============================================================
    _guidesData: [
        {
            id: 'arduino-ros-connection',
            title: 'Conectando Arduino ao ROS 2',
            icon: 'fa-plug',
            level: 'intermediario',
            duration: '1 hora',
            description: 'Aprenda a conectar seu Arduino ao ecossistema ROS 2 usando rosserial ou Micro-ROS.',
            tags: ['Arduino', 'ROS 2', 'Serial', 'Micro-ROS'],
            steps: [
                { title: 'Instale o Micro-ROS', content: 'No seu computador com ROS 2, instale o agente Micro-ROS.', code: 'sudo apt install ros-humble-micro-ros-agent' },
                { title: 'Configure o Arduino', content: 'Abra a Arduino IDE e instale a biblioteca micro_ros_arduino.', code: '#include <micro_ros_arduino.h>' },
                { title: 'Carregue o Firmware', content: 'Compile e carregue o exemplo de publisher no Arduino.', code: 'publisher.ino' },
                { title: 'Execute o Agente', content: 'Rode o agente Micro-ROS conectado à porta serial do Arduino.', code: 'ros2 run micro_ros_agent micro_ros_agent serial --dev /dev/ttyUSB0' },
                { title: 'Teste a Comunicação', content: 'Verifique se o tópico está sendo publicado no ROS 2.', code: 'ros2 topic list\nros2 topic echo /micro_ros/arduino/temperature' },
            ],
        },
        {
            id: 'esp32-mqtt-setup',
            title: 'ESP32 com MQTT — Comunicação sem Fio',
            icon: 'fa-wifi',
            level: 'iniciante',
            duration: '45 minutos',
            description: 'Configure seu ESP32 para enviar dados de sensores via MQTT para um broker local ou na nuvem.',
            tags: ['ESP32', 'MQTT', 'WiFi', 'Sensores'],
            steps: [
                { title: 'Instale as Bibliotecas', content: 'Na Arduino IDE, instale PubSubClient e WiFi.', code: 'PubSubClient by Nick O\'Leary\nWiFi (built-in for ESP32)' },
                { title: 'Configure WiFi e MQTT', content: 'Defina SSID, senha e endereço do broker MQTT.', code: 'const char* ssid = "SEU_WIFI";\nconst char* mqtt_server = "broker.hivemq.com";' },
                { title: 'Conecte e Publique', content: 'No loop, leia o sensor e publique no tópico MQTT.', code: 'client.publish("idenza/sensor/temp", msg);' },
                { title: 'Teste com MQTT Explorer', content: 'Use o MQTT Explorer para visualizar os dados chegando.', code: 'Baixe em: https://mqtt-explorer.com/' },
            ],
        },
        {
            id: 'jetson-orin-setup',
            title: 'Configurando NVIDIA Jetson Orin Nano para IA',
            icon: 'fa-microchip',
            level: 'avancado',
            duration: '2 horas',
            description: 'Guia completo de instalação do JetPack 6, CUDA, TensorRT e YOLOv8 no Jetson Orin Nano.',
            tags: ['NVIDIA', 'Jetson', 'CUDA', 'YOLOv8', 'IA'],
            steps: [
                { title: 'Flash do JetPack 6', content: 'Use o NVIDIA SDK Manager para instalar o sistema operacional.', code: 'sdkmanager --cli' },
                { title: 'Instale os Pacotes Essenciais', content: 'Atualize o sistema e instale ferramentas de build.', code: 'sudo apt update && sudo apt install -y build-essential cmake git' },
                { title: 'Verifique CUDA e TensorRT', content: 'Confirme que CUDA está acessível e TensorRT instalado.', code: 'nvcc --version\npython3 -c "import tensorrt; print(tensorrt.__version__)"' },
                { title: 'Instale PyTorch para Jetson', content: 'Instale a versão otimizada do PyTorch para arquitetura ARM.', code: 'pip install torch torchvision --index-url https://download.pytorch.org/whl/jetson' },
                { title: 'Teste com YOLOv8', content: 'Faça o download do YOLOv8 e execute a inferência em uma imagem.', code: 'yolo predict model=yolov8n.pt source=test.jpg device=0' },
            ],
        },
        {
            id: 'docker-ros-setup',
            title: 'Docker para Robótica com ROS 2',
            icon: 'fa-docker',
            level: 'avancado',
            duration: '1.5 horas',
            description: 'Containerize seus projetos ROS 2 para desenvolvimento e deploy consistentes em qualquer máquina.',
            tags: ['Docker', 'ROS 2', 'DevOps', 'Container'],
            steps: [
                { title: 'Instale Docker e Docker Compose', content: 'Instale as ferramentas de containerização.', code: 'sudo apt install docker.io docker-compose-v2' },
                { title: 'Crie o Dockerfile', content: 'Defina a imagem base com ROS 2 Humble.', code: 'FROM osrf/ros:humble-desktop\nRUN apt update && apt install -y ros-humble-desktop' },
                { title: 'Configure docker-compose.yml', content: 'Defina volumes, dispositivos e rede para o container ROS.', code: 'volumes:\n  - ./src:/ros2_ws/src\ndevices:\n  - /dev/ttyUSB0:/dev/ttyUSB0' },
                { title: 'Build e Execute', content: 'Construa a imagem e inicie o container.', code: 'docker compose build\ndocker compose up -d' },
                { title: 'Acesse o Container', content: 'Entre no container e execute comandos ROS.', code: 'docker compose exec ros bash\nsource /opt/ros/humble/setup.bash\nros2 topic list' },
            ],
        },
    ],

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init(container) {
        this.state.guides = this._guidesData;

        this._render(container);
        this._bindEvents();

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaGuides] Guias inicializados com', this.state.guides.length, 'guias');
        }
    },

    // ============================================================
    // RENDERIZAÇÃO
    // ============================================================
    _render(container) {
        container.innerHTML = `
            <div class="guides-page animate-fade-in">
                <div class="panel panel-full">
                    <div class="panel-header">
                        <i class="fas fa-book"></i>
                        <h2>📚 Guias e Tutoriais Idenza</h2>
                        <span class="badge badge-gold">${this.state.guides.length} GUIAS</span>
                    </div>
                    <p class="tiny-hint">Guias práticos passo a passo para configurar e integrar tecnologias de robótica, IoT e IA.</p>
                </div>

                <div class="grid-cards" style="margin-top:var(--space-4);">
                    ${this.state.guides.map((guide, index) => `
                        <div class="card card-accent-top animate-fade-in-up" style="animation-delay:${index * 100}ms">
                            <div class="card-icon">
                                <i class="fas ${guide.icon}"></i>
                            </div>
                            <h4 class="card-title">${guide.title}</h4>
                            <p class="card-text">${guide.description}</p>
                            <div class="project-meta">
                                <span class="tag tag-${guide.level}">${guide.level}</span>
                                <span class="tag"><i class="fas fa-clock"></i> ${guide.duration}</span>
                            </div>
                            <div class="tag-list">
                                ${guide.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-sm btn-gold" onclick="IdenzaGuides.openGuide('${guide.id}')">
                                    <i class="fas fa-play"></i> Iniciar Guia
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    },

    // ============================================================
    // ABRIR GUIA (MODAL)
    // ============================================================
    openGuide(guideId) {
        const guide = this.state.guides.find(g => g.id === guideId);
        if (!guide) return;

        this.state.activeGuide = guide;

        IdenzaModal.open({
            title: guide.title,
            size: 'lg',
            content: `
                <div class="guide-detail">
                    <p style="margin-bottom:var(--space-4);">${guide.description}</p>

                    <div class="guide-steps-container">
                        ${guide.steps.map((step, index) => `
                            <div class="guide-step-card" id="guideStep${index}">
                                <div class="guide-step-header" onclick="IdenzaGuides.toggleStep(${index})">
                                    <div class="guide-step-number">${index + 1}</div>
                                    <h5>${step.title}</h5>
                                    <i class="fas fa-chevron-down guide-step-arrow"></i>
                                </div>
                                <div class="guide-step-body">
                                    <p>${step.content}</p>
                                    ${step.code ? `
                                        <div class="code-block">
                                            <div class="code-header">
                                                <span>Terminal / Código</span>
                                                <button class="copy-btn"><i class="fas fa-copy"></i> Copiar</button>
                                            </div>
                                            <pre><code>${this._escapeHTML(step.code)}</code></pre>
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `,
            onOpen: () => {
                // Abre o primeiro passo automaticamente
                setTimeout(() => {
                    const firstBody = document.querySelector('.guide-step-body');
                    if (firstBody) {
                        firstBody.style.display = 'block';
                        firstBody.parentElement.querySelector('.guide-step-arrow')?.classList.add('rotated');
                    }
                }, 100);
            },
        });
    },

    toggleStep(index) {
        const stepCard = document.getElementById(`guideStep${index}`);
        const body = stepCard?.querySelector('.guide-step-body');
        const arrow = stepCard?.querySelector('.guide-step-arrow');

        if (body) {
            const isOpen = body.style.display === 'block';
            body.style.display = isOpen ? 'none' : 'block';
            if (arrow) {
                arrow.classList.toggle('rotated', !isOpen);
            }
        }
    },

    // ============================================================
    // EVENTOS
    // ============================================================
    _bindEvents() {
        // Delegação para botões de cópia nos guias (dentro do modal)
        document.addEventListener('click', (e) => {
            const copyBtn = e.target.closest('.copy-btn');
            if (copyBtn) {
                const pre = copyBtn.closest('.code-block')?.querySelector('code');
                if (pre) {
                    navigator.clipboard.writeText(pre.textContent).then(() => {
                        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                        setTimeout(() => {
                            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copiar';
                        }, 2000);
                    });
                }
            }
        });
    },

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    _escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },
};

// ============================================================
// REGISTRO NO SISTEMA DE MÓDULOS
// ============================================================
if (typeof IdenzaModules === 'undefined') {
    window.IdenzaModules = {};
}
IdenzaModules.initGuides = (container) => IdenzaGuides.init(container);
