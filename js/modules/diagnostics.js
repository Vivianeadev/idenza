/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — MÓDULO DIAGNÓSTICO AVANÇADO
 * ============================================================
 * 
 * Ferramenta interativa de diagnóstico de falhas:
 * - Checklist de verificação passo a passo
 * - Simulador de cenários de falha
 * - Score de diagnóstico
 * - Recomendações inteligentes
 * - Histórico de diagnósticos
 * 
 * @module Diagnostics
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaDiagnostics = {
    config: {},

    state: {
        currentChecklist: null,
        checksCompleted: 0,
        totalChecks: 0,
        score: 0,
        history: [],
    },

    // ============================================================
    // CENÁRIOS DE DIAGNÓSTICO
    // ============================================================
    _scenarios: [
        {
            id: 'scenario-gpu-overheat',
            title: 'Superaquecimento da GPU',
            description: 'O robô parou com protective stop. A GPU está a 47.2°C e o pipeline de visão falhou 3 vezes.',
            symptoms: ['Protective stop ativo', 'Vision pipeline offline', 'GPU > 45°C', 'USB buffer overflow'],
            correctRootCause: 'thermal',
            checklist: [
                { id: 'check-temp', question: 'Verificar temperatura da GPU (IOT-ENV-001)', expected: '>45°C', hint: 'Cheque o sensor térmico no dashboard' },
                { id: 'check-fans', question: 'Inspecionar ventoinhas do computador de bordo', expected: 'Paradas ou lentas', hint: 'Abra o gabinete e verifique visualmente' },
                { id: 'check-logs', question: 'Analisar logs de erro do vision_pipeline', expected: 'SIGSEGV + GPU memory fail', hint: 'Veja o Event Stream no dashboard' },
                { id: 'check-usb', question: 'Verificar buffer overflow USB da câmera', expected: 'Frames perdidos > 10', hint: 'Logs mostram "USB buffer overflow"' },
                { id: 'root-cause', question: 'Identificar a causa raiz', expected: 'Superaquecimento da GPU', hint: 'O superaquecimento causou falha em cascata' },
            ],
            actionPlan: [
                'Parar a esteira imediatamente',
                'Desligar o computador de bordo',
                'Verificar e limpar ventoinhas',
                'Aguardar 10 minutos para resfriamento',
                'Verificar se a temperatura baixou para <40°C',
                'Religar o sistema e monitorar',
            ],
        },
        {
            id: 'scenario-sensor-failure',
            title: 'Falha no Sensor de Temperatura',
            description: 'O sensor IOT-ENV-001 está reportando dados intermitentes com 34% de perda de pacotes e latência de 12 segundos.',
            symptoms: ['Latência alta (12s)', 'Perda de pacotes 34%', 'Dados inconsistentes'],
            correctRootCause: 'connectivity',
            checklist: [
                { id: 'check-signal', question: 'Verificar intensidade do sinal WiFi do sensor', expected: '< -80 dBm', hint: 'Use um analisador WiFi' },
                { id: 'check-battery', question: 'Verificar nível da bateria do sensor', expected: '< 20%', hint: 'Bateria fraca causa transmissão irregular' },
                { id: 'check-interference', question: 'Verificar interferência no canal WiFi', expected: 'Canal congestionado', hint: 'Muitos dispositivos no mesmo canal' },
                { id: 'root-cause', question: 'Identificar a causa raiz', expected: 'Má conectividade WiFi', hint: 'Sinal fraco ou bateria fraca' },
            ],
            actionPlan: [
                'Aproximar o sensor do roteador',
                'Trocar a bateria do sensor',
                'Mudar o canal WiFi do roteador',
                'Adicionar um repetidor WiFi',
                'Considerar usar LoRa para longo alcance',
            ],
        },
    ],

    // ============================================================
    // INICIALIZAÇÃO
    // ============================================================
    init(container) {
        this.state.history = IdenzaStorage.get('diagnostics_history') || [];

        this._render(container);
        this._bindEvents();

        if (IdenzaApp && IdenzaApp.config.debug) {
            console.log('[IdenzaDiagnostics] Ferramenta de diagnóstico inicializada');
        }
    },

    // ============================================================
    // RENDERIZAÇÃO
    // ============================================================
    _render(container) {
        container.innerHTML = `
            <div class="diagnostics-page animate-fade-in">
                <div class="panel panel-full">
                    <div class="panel-header">
                        <i class="fas fa-stethoscope"></i>
                        <h2>🔍 Ferramenta de Diagnóstico Avançado</h2>
                        <span class="badge badge-info">${this._scenarios.length} CENÁRIOS</span>
                    </div>
                    <p class="tiny-hint">Treine suas habilidades de diagnóstico com cenários reais de falha em sistemas robóticos. Siga o checklist, identifique a causa raiz e receba sua pontuação.</p>
                </div>

                <!-- Seleção de Cenário -->
                <div class="grid-cards" style="margin-top:var(--space-4);" id="scenarioGrid">
                    ${this._scenarios.map((scenario, index) => `
                        <div class="card card-accent-top animate-fade-in-up" style="animation-delay:${index * 100}ms">
                            <div class="card-icon">
                                <i class="fas fa-bug"></i>
                            </div>
                            <h4 class="card-title">${scenario.title}</h4>
                            <p class="card-text">${scenario.description.substring(0, 100)}...</p>
                            <div class="project-meta">
                                ${scenario.symptoms.slice(0, 2).map(s => `<span class="tag tag-warning">${s}</span>`).join('')}
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-sm btn-gold" onclick="IdenzaDiagnostics.startScenario('${scenario.id}')">
                                    <i class="fas fa-play"></i> Iniciar Diagnóstico
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- Histórico -->
                ${this.state.history.length > 0 ? `
                    <div class="panel panel-full" style="margin-top:var(--space-6);">
                        <div class="panel-header">
                            <i class="fas fa-history"></i>
                            <h2>Histórico de Diagnósticos</h2>
                        </div>
                        <div class="table-container">
                            <table class="table">
                                <thead><tr><th>Cenário</th><th>Data</th><th>Score</th><th>Causa Raiz</th></tr></thead>
                                <tbody>
                                    ${this.state.history.slice(-5).reverse().map(h => `
                                        <tr>
                                            <td>${h.scenarioTitle}</td>
                                            <td>${IdenzaFormat.date(h.date)}</td>
                                            <td>${h.score}%</td>
                                            <td><span class="badge ${h.correct ? 'badge-success' : 'badge-critical'}">${h.correct ? '✅ Correta' : '❌ Incorreta'}</span></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    },

    // ============================================================
    // INICIAR CENÁRIO
    // ============================================================
    startScenario(scenarioId) {
        const scenario = this._scenarios.find(s => s.id === scenarioId);
        if (!scenario) return;

        this.state.currentChecklist = scenario;
        this.state.checksCompleted = 0;
        this.state.totalChecks = scenario.checklist.length;
        this.state.score = 0;

        IdenzaModal.open({
            title: `Diagnóstico: ${scenario.title}`,
            size: 'lg',
            content: `
                <div class="diagnostic-scenario">
                    <div class="alert alert-warning">
                        <div class="alert-icon"><i class="fas fa-exclamation-triangle"></i></div>
                        <div class="alert-content">
                            <div class="alert-title">Cenário Ativo</div>
                            <div class="alert-message">${scenario.description}</div>
                        </div>
                    </div>

                    <h4>Sintomas Reportados:</h4>
                    <div class="tag-list" style="margin-bottom:var(--space-4);">
                        ${scenario.symptoms.map(s => `<span class="tag tag-warning">${s}</span>`).join('')}
                    </div>

                    <h4>Checklist de Diagnóstico (${this.state.totalChecks} passos):</h4>
                    <div class="diagnostic-checklist" id="diagnosticChecklist">
                        ${scenario.checklist.map((check, index) => `
                            <div class="diagnostic-check-item" id="checkItem${index}">
                                <div class="check-header">
                                    <span class="check-number">${index + 1}</span>
                                    <div class="check-question">
                                        <strong>${check.question}</strong>
                                        ${check.hint ? `<p class="tiny-hint">💡 Dica: ${check.hint}</p>` : ''}
                                    </div>
                                </div>
                                <div class="check-answer" id="checkAnswer${index}">
                                    <input type="text" class="form-input" placeholder="Sua resposta..." id="answerInput${index}">
                                    <button class="btn btn-sm btn-outline" onclick="IdenzaDiagnostics.checkAnswer(${index})">
                                        Verificar
                                    </button>
                                    <span class="check-result" id="checkResult${index}"></span>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="diagnostic-score" id="diagnosticScore" style="display:none;margin-top:var(--space-4);text-align:center;">
                        <h3 id="scoreTitle"></h3>
                        <div class="score-value" id="scoreValue" style="font-size:3rem;color:var(--gold-primary);"></div>
                        <div id="scoreMessage"></div>
                        ${scenario.actionPlan ? `
                            <div style="margin-top:var(--space-4);text-align:left;">
                                <h4>📋 Plano de Ação Recomendado:</h4>
                                <ol class="list-numbered">
                                    ${scenario.actionPlan.map(a => `<li>${a}</li>`).join('')}
                                </ol>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `,
        });
    },

    checkAnswer(index) {
        const scenario = this.state.currentChecklist;
        if (!scenario) return;

        const input = document.getElementById(`answerInput${index}`);
        const result = document.getElementById(`checkResult${index}`);
        const userAnswer = input?.value.trim().toLowerCase();
        const expectedAnswer = scenario.checklist[index].expected.toLowerCase();

        if (!userAnswer) return;

        const isCorrect = userAnswer.includes(expectedAnswer) || expectedAnswer.includes(userAnswer);

        if (result) {
            result.innerHTML = isCorrect ? 
                '<span style="color:var(--color-success);"><i class="fas fa-check-circle"></i> Correto!</span>' :
                `<span style="color:var(--color-critical);"><i class="fas fa-times-circle"></i> Incorreto. Esperado: "${scenario.checklist[index].expected}"</span>`;
        }

        // Desabilita input
        if (input) input.disabled = true;

        this.state.checksCompleted++;

        // Verifica se completou todos
        if (this.state.checksCompleted >= this.state.totalChecks) {
            this._finishDiagnostic();
        }
    },

    _finishDiagnostic() {
        const scenario = this.state.currentChecklist;
        const allInputs = document.querySelectorAll('.check-answer input');
        
        // Calcula score
        let correctAnswers = 0;
        allInputs.forEach(input => {
            if (input.disabled) {
                const resultEl = input.parentElement.querySelector('.check-result');
                if (resultEl?.textContent.includes('Correto')) {
                    correctAnswers++;
                }
            }
        });

        this.state.score = Math.round((correctAnswers / this.state.totalChecks) * 100);

        // Mostra resultado
        const scoreDiv = document.getElementById('diagnosticScore');
        const scoreTitle = document.getElementById('scoreTitle');
        const scoreValue = document.getElementById('scoreValue');
        const scoreMessage = document.getElementById('scoreMessage');

        if (scoreDiv) scoreDiv.style.display = 'block';
        if (scoreTitle) scoreTitle.textContent = this.state.score >= 80 ? '🎉 Diagnóstico Concluído!' : '📚 Continue Praticando';
        if (scoreValue) scoreValue.textContent = `${this.state.score}%`;
        if (scoreMessage) {
            scoreMessage.innerHTML = this.state.score >= 80 ?
                '<p style="color:var(--color-success);">Excelente! Você identificou a causa raiz corretamente.</p>' :
                '<p style="color:var(--color-warning);">Revise os passos incorretos e tente novamente.</p>';
        }

        // Salva no histórico
        const record = {
            scenarioId: scenario.id,
            scenarioTitle: scenario.title,
            score: this.state.score,
            correct: this.state.score >= 80,
            date: new Date().toISOString(),
        };

        this.state.history.push(record);
        IdenzaStorage.set('diagnostics_history', this.state.history);
        IdenzaEvents.emit('idenza:diagnosticCompleted', record);
    },

    // ============================================================
    // EVENTOS
    // ============================================================
    _bindEvents() {
        // Nada específico — ações são via onclick nos botões
    },
};

// ============================================================
// REGISTRO NO SISTEMA DE MÓDULOS
// ============================================================
if (typeof IdenzaModules === 'undefined') {
    window.IdenzaModules = {};
}
IdenzaModules.initDiagnostics = (container) => IdenzaDiagnostics.init(container);
