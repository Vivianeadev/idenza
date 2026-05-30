/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — MÓDULO MARKETPLACE (LOJA)
 * ============================================================
 * 
 * Loja virtual dos Kits Idenza:
 * - Kits por nível de aprendizado
 * - Carrinho de compras
 * - Cálculo de frete
 * - Cupons de desconto
 * - Finalização de pedido (simulada)
 * 
 * @module Marketplace
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaMarketplace = {
    config: {
        currency: 'USD',
        freeShippingThreshold: 500,
        shippingBase: 15,
    },

    state: {
        kits: [],
        cart: [],
        wishlist: [],
        appliedCoupon: null,
    },

    // ============================================================
    // DADOS DOS KITS
    // ============================================================
    _kitsData: [
        {
            id: 'kit-idenza-starter-iot',
            name: 'Kit Idenza Starter IoT',
            subtitle: 'Sua Primeira Rede de Sensores',
            level: 'iniciante',
            price: 89.00,
            originalPrice: 119.00,
            discount: '25% OFF',
            contents: [
                'Arduino Uno R4 WiFi',
                'Sensor BME680',
                'Display OLED 0.96"',
                'LEDs RGB (3x)',
                'Resistores 220Ω (5x)',
                'Breadboard 830 pontos',
                'Jumpers macho-macho (20x)',
                'Cabo USB-C',
                'Fonte 9V 2A',
                'Caixa organizadora Idenza',
                'Manual impresso (60 páginas)',
            ],
            projects: 5,
            certification: 'Idenza IoT Fundamentals',
            rating: 4.9,
            reviews: 234,
            image: 'kit-starter-iot.jpg',
            featured: true,
        },
        {
            id: 'kit-idenza-ros-explorer',
            name: 'Kit Idenza ROS Explorer',
            subtitle: 'Robô com ROS 2 do Zero',
            level: 'intermediario',
            price: 499.00,
            originalPrice: 599.00,
            discount: '17% OFF',
            contents: [
                'Raspberry Pi 5 (8 GB)',
                'Cartão SD 64 GB com ROS 2 pré-instalado',
                'RPLidar A1M8 360°',
                'Câmera Raspberry Pi Module 3',
                'IMU Bosch BNO055 9-DOF',
                'Chassi de robô diferencial (impresso 3D)',
                'Motores DC 12V com encoder (2x)',
                'Driver de motor L298N',
                'Bateria LiPo 12V 5000mAh',
                'Carregador balanceado',
                'Power bank para Pi 5',
                'Manual Idenza ROS Explorer (120 páginas)',
            ],
            projects: 8,
            certification: 'Idenza ROS Associate',
            rating: 4.8,
            reviews: 156,
            image: 'kit-ros-explorer.jpg',
            featured: true,
        },
        {
            id: 'kit-idenza-ai-edge',
            name: 'Kit Idenza AI Edge',
            subtitle: 'IA na Borda com Jetson',
            level: 'avancado',
            price: 1499.00,
            originalPrice: 1799.00,
            discount: '17% OFF',
            contents: [
                'NVIDIA Jetson Orin Nano Dev Kit (8 GB)',
                'Luxonis OAK-D Pro (câmera depth + IA)',
                'Dynamixel XM540-W270 (4x)',
                'ODrive Pro (driver BLDC dual)',
                'Motor BLDC com encoder',
                'Braço robótico impresso em 3D (estrutura)',
                'Bateria LiPo 6S 22.2V 10Ah',
                'Hub USB-C com Ethernet + HDMI',
                'SSD NVMe 512 GB para Jetson',
                'Manual Idenza AI Edge (180 páginas)',
            ],
            projects: 6,
            certification: 'Idenza AI Robotics Professional',
            rating: 5.0,
            reviews: 89,
            image: 'kit-ai-edge.jpg',
            featured: true,
        },
        {
            id: 'kit-idenza-fleet',
            name: 'Kit Idenza Fleet Architect',
            subtitle: 'Frota de 5 Robôs Autônomos',
            level: 'especialista',
            price: 4999.00,
            originalPrice: 5999.00,
            discount: '17% OFF',
            contents: [
                'ESP32-S3 (5x)',
                'Raspberry Pi 5 8GB (5x)',
                'RPLidar A1M8 (5x)',
                'Switch Gigabit 8 portas',
                'Servidor Intel NUC i7',
                'K3s + Grafana + Prometheus pré-configurados',
                'Baterias e carregadores (5x cada)',
                'Manual de Orquestração de Frota (200 páginas)',
                'Consultoria Idenza (2 horas)',
            ],
            projects: 3,
            certification: 'Idenza Robotics Architect',
            rating: 4.9,
            reviews: 34,
            image: 'kit-fleet.jpg',
            featured: false,
        },
    ],

    coupons: {
        'IDENZA10': { discount: 0.10, type: 'percent', description: '10% de desconto — Lançamento' },
        'ACADEMY20': { discount: 0.20, type: 'percent', description: '20% de desconto — Alunos' },
        'ROBOTICS50': { discount: 50, type: 'fixed', description: '$50 off — Comunidade' },
    },

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init(container) {
        this.state.kits = this._kitsData;
        this.state.cart = IdenzaStorage.get('marketplace_cart') || [];
        this.state.wishlist = IdenzaStorage.get('products_wishlist') || [];

        this._render(container);
        this._bindEvents();

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaMarketplace] Loja inicializada com', this.state.kits.length, 'kits');
        }
    },

    // ============================================================
    // RENDERIZAÇÃO
    // ============================================================
    _render(container) {
        const cartCount = this.state.cart.reduce((sum, item) => sum + item.qty, 0);
        const cartTotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

        container.innerHTML = `
            <div class="marketplace-page animate-fade-in">
                <!-- Header -->
                <div class="panel panel-full">
                    <div class="panel-header">
                        <i class="fas fa-shopping-cart"></i>
                        <h2>🛒 Loja Idenza — Kits Curados</h2>
                        <div style="margin-left:auto;display:flex;gap:var(--space-3);align-items:center;">
                            ${cartCount > 0 ? `
                                <button class="btn btn-sm btn-gold" id="viewCartBtn">
                                    <i class="fas fa-shopping-cart"></i> Carrinho (${cartCount}) — $${cartTotal.toFixed(2)}
                                </button>
                            ` : ''}
                        </div>
                    </div>
                    <p class="tiny-hint">Kits completos e curados pela equipe Idenza Robotics. Cada kit inclui todos os componentes, manuais impressos e acesso aos projetos da Academy.</p>
                </div>

                <!-- Kits em Destaque -->
                <div class="grid-cards" style="margin-top:var(--space-4);" id="kitsGrid">
                    ${this.state.kits.map((kit, index) => `
                        <div class="card card-product card-accent-top animate-fade-in-up ${kit.featured ? 'card-featured' : ''}" 
                             style="animation-delay:${index * 100}ms">
                            ${kit.featured ? '<div class="featured-badge"><i class="fas fa-star"></i> Destaque</div>' : ''}
                            ${kit.discount ? `<div class="discount-badge">${kit.discount}</div>` : ''}
                            
                            <div class="card-icon">
                                <i class="fas fa-box-open"></i>
                            </div>
                            
                            <h4 class="card-title">${kit.name}</h4>
                            <p class="card-text">${kit.subtitle}</p>
                            
                            <div class="project-meta">
                                <span class="tag tag-${kit.level}">${kit.level}</span>
                                <span class="tag"><i class="fas fa-project-diagram"></i> ${kit.projects} projetos</span>
                                <span class="tag"><i class="fas fa-certificate"></i> ${kit.certification}</span>
                            </div>

                            <div class="kit-price-section">
                                ${kit.originalPrice ? `<span class="kit-original-price">$${kit.originalPrice.toFixed(2)}</span>` : ''}
                                <span class="kit-price">$${kit.price.toFixed(2)}</span>
                            </div>

                            <div class="kit-rating">
                                <i class="fas fa-star" style="color:var(--gold-primary);"></i> ${kit.rating} 
