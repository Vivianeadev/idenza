/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — MÓDULO ACADEMY (CURSOS)
 * ============================================================
 * 
 * Plataforma de cursos e trilhas de aprendizado:
 * - Catálogo de cursos com níveis
 * - Trilhas de aprendizado (IoT, ROS, IA, Fabricação)
 * - Sistema de progresso com tracking
 * - Certificações
 * - Favoritos e histórico
 * 
 * @module Academy
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaAcademy = {
    config: {},

    state: {
        courses: [],
        userProgress: {},
        activeTab: 'all',
    },

    // ============================================================
    // DADOS DOS CURSOS
    // ============================================================
    _coursesData: [
        {
            id: 'trilha-iot',
            title: 'Trilha IoT — Internet das Coisas do Zero ao Profissional',
            slug: 'trilha-iot',
            icon: 'fa-network-wired',
            level: 'iniciante',
            duration: '40 horas',
            lessons: 12,
            projects: 5,
            students: 3240,
            rating: 4.9,
            description: 'Domine o mundo da Internet das Coisas. Aprenda a conectar sensores, criar redes mesh, enviar dados para a nuvem e construir dashboards inteligentes.',
            curriculum: [
                { lesson: 1, title: 'Introdução à IoT e Microcontroladores', duration: '2h', type: 'video' },
                { lesson: 2, title: 'Primeiros Passos com Arduino e Sensores', duration: '3h', type: 'hands-on' },
                { lesson: 3, title: 'Comunicação WiFi com ESP32', duration: '3h', type: 'hands-on' },
                { lesson: 4, title: 'Protocolo MQTT na Prática', duration: '4h', type: 'hands-on' },
                { lesson: 5, title: 'Criando Dashboards com Node-RED', duration: '3h', type: 'hands-on' },
                { lesson: 6, title: 'Armazenamento em Nuvem (InfluxDB)', duration: '3h', type: 'video' },
                { lesson: 7, title: 'Redes Mesh com ESP-NOW e Zigbee', duration: '4h', type: 'hands-on' },
                { lesson: 8, title: 'LoRa e LoRaWAN — Longo Alcance', duration: '4h', type: 'hands-on' },
                { lesson: 9, title: 'Segurança em Dispositivos IoT', duration: '3h', type: 'video' },
                { lesson: 10, title: 'Projeto: Estação Meteorológica Completa', duration: '4h', type: 'project' },
                { lesson: 11, title: 'Projeto: Rede de Sensores para Agricultura', duration: '4h', type: 'project' },
                { lesson: 12, title: 'Certificação e Projeto Final', duration: '3h', type: 'exam' },
            ],
        },
        {
            id: 'trilha-ros',
            title: 'Trilha ROS 2 — Robótica com Robot Operating System',
            slug: 'trilha-ros',
            icon: 'fa-cogs',
            level: 'intermediario',
            duration: '60 horas',
            lessons: 15,
            projects: 4,
            students: 1890,
            rating: 4.8,
            description: 'Aprenda o sistema operacional mais usado na robótica mundial. Do básico de nodes e tópicos até navegação autônoma com SLAM.',
            curriculum: [
                { lesson: 1, title: 'O que é ROS 2 e por que usar', duration: '2h', type: 'video' },
                { lesson: 2, title: 'Instalação e Configuração do ROS 2 Humble', duration: '2h', type: 'hands-on' },
                { lesson: 3, title: 'Nodes, Topics e Messages', duration: '4h', type: 'hands-on' },
                { lesson: 4, title: 'Services e Actions', duration: '3h', type: 'hands-on' },
                { lesson: 5, title: 'Launch Files e Parâmetros', duration: '3h', type: 'hands-on' },
                { lesson: 6, title: 'Simulação com Gazebo', duration: '4h', type: 'hands-on' },
                { lesson: 7, title: 'Sensores: Câmeras, Lidar e IMU no ROS 2', duration: '4h', type: 'hands-on' },
                { lesson: 8, title: 'Visão Computacional com OpenCV + ROS 2', duration: '4h', type: 'hands-on' },
                { lesson: 9, title: 'SLAM — Mapeamento e Localização Simultâneos', duration: '5h', type: 'hands-on' },
                { lesson: 10, title: 'Navegação Autônoma com Nav2', duration: '5h', type: 'hands-on' },
                { lesson: 11, title: 'Manipulação com MoveIt 2', duration: '5h', type: 'hands-on' },
                { lesson: 12, title: 'Projeto: Robô Seguidor de Linha', duration: '5h', type: 'project' },
                { lesson: 13, title: 'Projeto: Carrinho Autônomo com SLAM', duration: '5h', type: 'project' },
                { lesson: 14, title: 'Debugging e Ferramentas de Diagnóstico', duration: '3h', type: 'video' },
                { lesson: 15, title: 'Certificação ROS 2 e Projeto Final', duration: '4h', type: 'exam' },
            ],
        },
        {
            id: 'trilha-ai',
            title: 'Trilha IA na Borda — Inteligência Artificial para Robôs',
            slug: 'trilha-ai',
            icon: 'fa-brain',
            level: 'avancado',
            duration: '50 horas',
            lessons: 10,
            projects: 3,
            students: 760,
            rating: 5.0,
            description: 'Leve inteligência artificial para dentro do robô. YOLOv8, SLAM com deep learning, LLMs locais e reinforcement learning no NVIDIA Jetson.',
            curriculum: [
                { lesson: 1, title: 'Fundamentos de Deep Learning para Robótica', duration: '4h', type: 'video' },
                { lesson: 2, title: 'Configurando NVIDIA Jetson Orin', duration: '3h', type: 'hands-on' },
                { lesson: 3, title: 'YOLOv8 — Detecção de Objetos em Tempo Real', duration: '5h', type: 'hands-on' },
                { lesson: 4, title: 'Segmentação e Pose Estimation', duration: '4h', type: 'hands-on' },
                { lesson: 5, title: 'Integração YOLO + ROS 2 + Câmera Depth', duration: '5h', type: 'hands-on' },
                { lesson: 6, title: 'LLMs Locais: Llama 3 + Robôs que Entendem Voz', duration: '5h', type: 'hands-on' },
                { lesson: 7, title: 'Reinforcement Learning com Isaac Lab', duration: '6h', type: 'hands-on' },
                { lesson: 8, title: 'Projeto: Braço que Joga Xadrez', duration: '6h', type: 'project' },
                { lesson: 9, title: 'Projeto: Robô que Segue Pessoas', duration: '6h', type: 'project' },
                { lesson: 10, title: 'Certificação AI Robotics e Projeto Final', duration: '6h', type: 'exam' },
            ],
        },
    ],

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init(container) {
        this.state.courses = this._coursesData;
        this.state.userProgress = IdenzaState?.get('academy.progress') || {};

        this._render(container);
        this._bindEvents();

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaAcademy] Academy inicializada com', this.state.courses.length, 'trilhas');
        }
    },

    // ============================================================
    // RENDERIZAÇÃO
    // ============================================================
    _render(container) {
        container.innerHTML = `
            <div class="academy-page animate-fade-in">
                <!-- Header -->
                <div class="panel panel-full">
                    <div class="panel-header">
                        <i class="fas fa-graduation-cap"></i>
                        <h2>🎓 Idenza Academy — Cursos e Trilhas</h2>
                        <span class="badge badge-gold">${this.state.courses.length} TRILHAS</span>
                    </div>
                    <p class="tiny-hint">Do iniciante ao especialista. Trilhas completas com aulas práticas, projetos e certificação.</p>
                    <span class="layman-explain">Escolha seu caminho de aprendizado — como escolher uma carreira na faculdade</span>
                </div>

                <!-- Métricas do Aluno -->
                <div class="grid-metrics" style="margin-top:var(--space-4);">
                    <div class="state-card">
                        <div class="value">${this._countCompletedLessons()}</div>
                        <div class="label">Aulas Completadas</div>
                    </div>
                    <div class="state-card">
                        <div class="value">${this._countCompletedCourses()}</div>
                        <div class="label">Cursos Completos</div>
                    </div>
                    <div class="state-card">
                        <div class="value">${this._countCertificates()}</div>
                        <div class="label">Certificados</div>
                    </div>
                    <div class="state-card">
                        <div class="value">${this._calculateTotalProgress()}%</div>
                        <div class="label">Progresso Geral</div>
                    </div>
                </div>

                <!-- Grid de Cursos -->
                <div class="grid-academy" style="margin-top:var(--space-6);" id="academyGrid">
                    ${this._renderCourseCards()}
                </div>
            </div>
        `;
    },

    _renderCourseCards() {
        return this.state.courses.map((course, index) => {
            const progress = this.state.userProgress[course.id] || 0;
            
            return `
                <div class="card card-accent-top animate-fade-in-up" 
                     style="animation-delay:${index * 100}ms"
                     data-course-id="${course.id}">
                    <div class="card-icon">
                        <i class="fas ${course.icon}"></i>
                    </div>
                    <h4 class="card-title">${course.title}</h4>
                    <p class="card-text">${course.description.substring(0, 100)}...</p>
                    
                    <div class="project-meta">
                        <span class="tag tag-${course.level}">${this._levelLabel(course.level)}</span>
                        <span class="tag"><i class="fas fa-clock"></i> ${course.duration}</span>
                        <span class="tag"><i class="fas fa-book"></i> ${course.lessons} aulas</span>
                    </div>

                    <div class="project-stats">
                        <span><i class="fas fa-star" style="color:var(--gold-primary);"></i> ${course.rating}</span>
                        <span><i class="fas fa-users"></i> ${course.students}</span>
                        <span><i class="fas fa-project-diagram"></i> ${course.projects} projetos</span>
                    </div>

                    ${progress > 0 ? `
                        <div class="progress-container" style="margin-top:var(--space-3);">
                            <div class="progress-header">
                                <span class="tiny-hint">Progresso</span>
                                <span class="tiny-hint">${progress}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width:${progress}%;"></div>
                            </div>
                        </div>
                    ` : ''}

                    <div class="card-footer">
                        <span class="tiny-hint">${course.lessons} aulas · ${course.projects} projetos</span>
                        <button class="btn btn-sm btn-gold" onclick="IdenzaAcademy.viewCourse('${course.id}')">
                            ${progress > 0 ? 'Continuar' : 'Começar'} <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    // ============================================================
    // VISUALIZAR CURSO (MODAL)
    // ============================================================
    viewCourse(courseId) {
        const course = this.state.courses.find(c => c.id === courseId);
        if (!course) return;

        const progress = this.state.userProgress[courseId] || 0;

        IdenzaModal.open({
            title: course.title,
            size: 'xl',
            content: `
                <div class="course-detail">
                    <div class="course-header">
                        <span class="badge badge-${course.level === 'iniciante' ? 'success' : course.level === 'intermediario' ? 'warning' : 'critical'}">${this._levelLabel(course.level)}</span>
                        <span class="badge badge-info"><i class="fas fa-clock"></i> ${course.duration}</span>
                        <span class="badge badge-gold"><i class="fas fa-star"></i> ${course.rating}</span>
                    </div>

                    <p style="margin:var(--space-4) 0;">${course.description}</p>

                    ${progress > 0 ? `
                        <div class="progress-container" style="margin-bottom:var(--space-4);">
                            <div class="progress-header">
                                <strong>Seu Progresso</strong>
                                <strong>${progress}%</strong>
                            </div>
                            <div class="progress-bar" style="height:10px;">
                                <div class="progress-fill" style="width:${progress}%;"></div>
                            </div>
                        </div>
                    ` : ''}

                    <h4><i class="fas fa-list"></i> Currículo (${course.lessons} aulas)</h4>
                    <div class="curriculum-list">
                        ${course.curriculum.map((lesson, i) => {
                            const isCompleted = this._isLessonCompleted(courseId, i + 1);
                            return `
                                <div class="curriculum-item ${isCompleted ? 'completed' : ''}">
                                    <div class="curriculum-number">
                                        ${isCompleted ? '<i class="fas fa-check-circle" style="color:var(--color-success);"></i>' : i + 1}
                                    </div>
                                    <div class="curriculum-info">
                                        <strong>${lesson.title}</strong>
                                        <div class="curriculum-meta">
                                            <span><i class="fas fa-clock"></i> ${lesson.duration}</span>
                                            <span class="tag tag-${lesson.type === 'project' ? 'warning' : lesson.type === 'exam' ? 'critical' : 'info'}">${this._lessonTypeLabel(lesson.type)}</span>
                                        </div>
                                    </div>
                                    <button class="btn btn-sm ${isCompleted ? 'btn-outline' : 'btn-gold'}">
                                        ${isCompleted ? 'Revisar' : 'Iniciar'}
                                    </button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `,
        });
    },

    // ============================================================
    // PROGRESSO
    // ============================================================
    _countCompletedLessons() {
        return IdenzaState?.get('academy.completedLessons')?.length || 0;
    },

    _countCompletedCourses() {
        return IdenzaState?.get('academy.completedCourses')?.length || 0;
    },

    _countCertificates() {
        return IdenzaState?.get('academy.certificates')?.length || 0;
    },

    _calculateTotalProgress() {
        const allLessons = this.state.courses.reduce((sum, c) => sum + c.lessons, 0);
        const completed = this._countCompletedLessons();
        return allLessons > 0 ? Math.round((completed / allLessons) * 100) : 0;
    },

    _isLessonCompleted(courseId, lessonNumber) {
        const completed = IdenzaState?.get('academy.completedLessons') || [];
        return completed.includes(`${courseId}:${lessonNumber}`);
    },

    // ============================================================
    // EVENTOS
    // ============================================================
    _bindEvents() {
        // Nada específico — ações são via onclick nos botões
    },

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    _levelLabel(level) {
        const labels = { iniciante: '🟢 Iniciante', intermediario: '🟡 Intermediário', avancado: '🔴 Avançado' };
        return labels[level] || level;
    },

    _lessonTypeLabel(type) {
        const labels = { video: '🎬 Vídeo', 'hands-on': '🔧 Prática', project: '🚀 Projeto', exam: '📝 Prova' };
        return labels[type] || type;
    },
};

// ============================================================
// REGISTRO NO SISTEMA DE MÓDULOS
// ============================================================
if (typeof IdenzaModules === 'undefined') {
    window.IdenzaModules = {};
}
IdenzaModules.initAcademy = (container) => IdenzaAcademy.init(container);
