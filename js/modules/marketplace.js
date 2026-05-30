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
                                <span class="text-muted">(${kit.reviews} avaliações)</span>
                            </div>

                            <div class="card-footer">
                                <button class="btn btn-sm btn-outline" onclick="IdenzaMarketplace.viewKitDetails('${kit.id}')">
                                    <i class="fas fa-info-circle"></i> Detalhes
                                </button>
                                <button class="btn btn-sm btn-gold" onclick="IdenzaMarketplace.addToCart('${kit.id}')">
                                    <i class="fas fa-cart-plus"></i> Adicionar
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Benefícios -->
                <div class="panel panel-full" style="margin-top:var(--space-6);">
                    <div class="panel-header">
                        <i class="fas fa-shield-alt"></i>
                        <h2>Por que comprar na Idenza?</h2>
                    </div>
                    <div class="grid-cols-3" style="gap:var(--space-4);">
                        <div style="text-align:center;padding:var(--space-4);">
                            <i class="fas fa-truck" style="font-size:2rem;color:var(--gold-primary);margin-bottom:var(--space-2);"></i>
                            <h5>Frete Grátis</h5>
                            <p class="text-small">Em compras acima de $${this.config.freeShippingThreshold}</p>
                        </div>
                        <div style="text-align:center;padding:var(--space-4);">
                            <i class="fas fa-book" style="font-size:2rem;color:var(--gold-primary);margin-bottom:var(--space-2);"></i>
                            <h5>Manuais Impressos</h5>
                            <p class="text-small">Documentação completa em português</p>
                        </div>
                        <div style="text-align:center;padding:var(--space-4);">
                            <i class="fas fa-headset" style="font-size:2rem;color:var(--gold-primary);margin-bottom:var(--space-2);"></i>
                            <h5>Suporte Técnico</h5>
                            <p class="text-small">Consultoria inclusa nos kits avançados</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // ============================================================
    // DETALHES DO KIT (MODAL)
    // ============================================================
    viewKitDetails(kitId) {
        const kit = this.state.kits.find(k => k.id === kitId);
        if (!kit) return;

        IdenzaModal.open({
            title: kit.name,
            size: 'lg',
            content: `
                <div class="kit-detail">
                    <div class="kit-detail-header">
                        <span class="badge badge-${kit.level === 'iniciante' ? 'success' : kit.level === 'intermediario' ? 'warning' : 'critical'}">${kit.level}</span>
                        ${kit.discount ? `<span class="badge badge-gold">${kit.discount}</span>` : ''}
                        <span class="kit-detail-price" style="margin-left:auto;">
                            ${kit.originalPrice ? `<span style="text-decoration:line-through;color:var(--color-text-muted);">$${kit.originalPrice.toFixed(2)}</span> ` : ''}
                            <strong style="font-size:1.5rem;color:var(--gold-primary);">$${kit.price.toFixed(2)}</strong>
                        </span>
                    </div>

                    <p style="margin:var(--space-4) 0;">${kit.subtitle}</p>

                    <h4>📦 Conteúdo do Kit</h4>
                    <ul class="list-styled">
                        ${kit.contents.map(item => `<li>${item}</li>`).join('')}
                    </ul>

                    <div class="grid-cols-2" style="gap:var(--space-4);margin-top:var(--space-4);">
                        <div>
                            <h4>🚀 Projetos Inclusos</h4>
                            <p class="text-small">${kit.projects} projetos completos com BOM e passo a passo na Idenza Academy.</p>
                        </div>
                        <div>
                            <h4>🎓 Certificação</h4>
                            <p class="text-small">Ao completar os projetos, você recebe a certificação <strong>${kit.certification}</strong>.</p>
                        </div>
                    </div>

                    <div style="margin-top:var(--space-4);">
                        <i class="fas fa-star" style="color:var(--gold-primary);"></i> ${kit.rating} (${kit.reviews} avaliações)
                    </div>

                    <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);justify-content:flex-end;">
                        <button class="btn btn-outline" onclick="IdenzaModal.close()">Fechar</button>
                        <button class="btn btn-gold" onclick="IdenzaMarketplace.addToCart('${kit.id}'); IdenzaModal.close();">
                            <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho — $${kit.price.toFixed(2)}
                        </button>
                    </div>
                </div>
            `,
        });
    },

    // ============================================================
    // CARRINHO DE COMPRAS
    // ============================================================
    addToCart(kitId, qty = 1) {
        const kit = this.state.kits.find(k => k.id === kitId);
        if (!kit) return;

        const existing = this.state.cart.find(item => item.id === kitId);
        if (existing) {
            existing.qty += qty;
        } else {
            this.state.cart.push({
                id: kitId,
                name: kit.name,
                price: kit.price,
                qty,
                certification: kit.certification,
            });
        }

        this._saveCart();
        IdenzaToast?.success(`${kit.name} adicionado ao carrinho!`);
        this._refreshHeader();
    },

    removeFromCart(kitId) {
        this.state.cart = this.state.cart.filter(item => item.id !== kitId);
        this._saveCart();
        IdenzaToast?.info('Item removido do carrinho');
        this._refreshHeader();
    },

    updateCartQty(kitId, qty) {
        const item = this.state.cart.find(i => i.id === kitId);
        if (item) {
            item.qty = Math.max(1, qty);
            this._saveCart();
        }
    },

    viewCart() {
        if (this.state.cart.length === 0) {
            IdenzaToast?.info('Seu carrinho está vazio.');
            return;
        }

        const subtotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const shipping = subtotal >= this.config.freeShippingThreshold ? 0 : this.config.shippingBase;
        const discount = this._calculateDiscount(subtotal);
        const total = subtotal - discount + shipping;

        IdenzaModal.open({
            title: '🛒 Carrinho de Compras',
            size: 'lg',
            content: `
                <div class="cart-detail">
                    <div class="table-container">
                        <table class="table">
                            <thead><tr><th>Produto</th><th>Preço</th><th>Qtd</th><th>Subtotal</th><th></th></tr></thead>
                            <tbody>
                                ${this.state.cart.map(item => `
                                    <tr>
                                        <td>
                                            <strong>${item.name}</strong>
                                            <br><small class="text-muted">Certificação: ${item.certification}</small>
                                        </td>
                                        <td>$${item.price.toFixed(2)}</td>
                                        <td>
                                            <input type="number" class="form-input cart-qty-input" 
                                                   value="${item.qty}" min="1" max="10" 
                                                   style="width:60px;text-align:center;"
                                                   onchange="IdenzaMarketplace.updateCartQty('${item.id}', parseInt(this.value))">
                                        </td>
                                        <td>$${(item.price * item.qty).toFixed(2)}</td>
                                        <td>
                                            <button class="btn btn-sm btn-outline" onclick="IdenzaMarketplace.removeFromCart('${item.id}'); IdenzaModal.close(); IdenzaMarketplace.viewCart();">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <!-- Cupom -->
                    <div style="margin-top:var(--space-4);display:flex;gap:var(--space-3);align-items:center;">
                        <input type="text" class="form-input" id="couponInput" placeholder="Cupom de desconto" style="flex:1;">
                        <button class="btn btn-outline" id="applyCouponBtn">Aplicar</button>
                        ${this.state.appliedCoupon ? `
                            <span class="badge badge-success">
                                <i class="fas fa-check"></i> ${this.state.appliedCoupon}
                                <button class="btn-icon-only" onclick="IdenzaMarketplace.removeCoupon(); IdenzaModal.close(); IdenzaMarketplace.viewCart();" style="margin-left:4px;">×</button>
                            </span>
                        ` : ''}
                    </div>

                    <!-- Totais -->
                    <div style="margin-top:var(--space-4);text-align:right;">
                        <p>Subtotal: <strong>$${subtotal.toFixed(2)}</strong></p>
                        ${discount > 0 ? `<p style="color:var(--color-success);">Desconto: <strong>-$${discount.toFixed(2)}</strong></p>` : ''}
                        <p>Frete: <strong>${shipping === 0 ? '<span style="color:var(--color-success);">GRÁTIS</span>' : '$' + shipping.toFixed(2)}</strong></p>
                        <hr>
                        <p style="font-size:var(--text-lg);">Total: <strong style="color:var(--gold-primary);">$${total.toFixed(2)}</strong></p>
                    </div>

                    <div style="margin-top:var(--space-6);display:flex;justify-content:flex-end;gap:var(--space-3);">
                        <button class="btn btn-outline" onclick="IdenzaModal.close()">Continuar Comprando</button>
                        <button class="btn btn-gold" onclick="IdenzaMarketplace.checkout()">
                            <i class="fas fa-lock"></i> Finalizar Compra
                        </button>
                    </div>
                </div>
            `,
            onOpen: () => {
                document.getElementById('applyCouponBtn')?.addEventListener('click', () => {
                    const code = document.getElementById('couponInput')?.value.trim().toUpperCase();
                    if (code && this.coupons[code]) {
                        this.state.appliedCoupon = code;
                        IdenzaToast?.success(`Cupom ${code} aplicado!`);
                        IdenzaModal.close();
                        this.viewCart();
                    } else {
                        IdenzaToast?.warning('Cupom inválido');
                    }
                });
            },
        });
    },

    applyCoupon(code) {
        const coupon = this.coupons[code.toUpperCase()];
        if (coupon) {
            this.state.appliedCoupon = code.toUpperCase();
            return coupon;
        }
        return null;
    },

    removeCoupon() {
        this.state.appliedCoupon = null;
    },

    _calculateDiscount(subtotal) {
        if (!this.state.appliedCoupon) return 0;

        const coupon = this.coupons[this.state.appliedCoupon];
        if (!coupon) return 0;

        if (coupon.type === 'percent') {
            return subtotal * coupon.discount;
        }
        return coupon.discount;
    },

    // ============================================================
    // CHECKOUT (SIMULADO)
    // ============================================================
    checkout() {
        const subtotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const shipping = subtotal >= this.config.freeShippingThreshold ? 0 : this.config.shippingBase;
        const discount = this._calculateDiscount(subtotal);
        const total = subtotal - discount + shipping;

        IdenzaModal.close();

        IdenzaModal.open({
            title: '🎉 Pedido Confirmado!',
            size: 'md',
            content: `
                <div style="text-align:center;padding:var(--space-6);">
                    <i class="fas fa-check-circle" style="font-size:4rem;color:var(--color-success);margin-bottom:var(--space-4);"></i>
                    <h3>Pedido #IDZ-${Date.now().toString(36).toUpperCase()}</h3>
                    <p>Total: <strong style="color:var(--gold-primary);font-size:1.5rem;">$${total.toFixed(2)}</strong></p>
                    <p class="text-small">Um email de confirmação foi enviado.</p>
                    <p class="text-small">Tempo estimado de entrega: 5-7 dias úteis.</p>
                    <div class="cert-list" style="margin-top:var(--space-4);">
                        <strong>Certificações incluídas:</strong>
                        ${this.state.cart.map(item => `<p class="text-small">🎓 ${item.certification}</p>`).join('')}
                    </div>
                </div>
            `,
        });

        // Limpa carrinho
        this.state.cart = [];
        this.state.appliedCoupon = null;
        this._saveCart();
    },

    // ============================================================
    // PERSISTÊNCIA
    // ============================================================
    _saveCart() {
        IdenzaStorage.set('marketplace_cart', this.state.cart);
    },

    _refreshHeader() {
        // Atualiza badge do carrinho se houver
        const cartCount = this.state.cart.reduce((sum, item) => sum + item.qty, 0);
        const cartTotal = this.state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        
        const cartBtn = document.getElementById('viewCartBtn');
        if (cartBtn) {
            if (cartCount > 0) {
                cartBtn.style.display = '';
                cartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> Carrinho (${cartCount}) — $${cartTotal.toFixed(2)}`;
            } else {
                cartBtn.style.display = 'none';
            }
        }
    },

    // ============================================================
    // EVENTOS
    // ============================================================
    _bindEvents() {
        IdenzaDOM.delegate(document, 'click', '#viewCartBtn', () => {
            this.viewCart();
        });
    },
};

// ============================================================
// REGISTRO NO SISTEMA DE MÓDULOS
// ============================================================
if (typeof IdenzaModules === 'undefined') {
    window.IdenzaModules = {};
}
IdenzaModules.initMarketplace = (container) => IdenzaMarketplace.init(container);
