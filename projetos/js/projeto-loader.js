/**
 * Idenza Robotics Academy — Carregador de Projeto
 * Preenche o template com os dados do robô selecionado via ?id=
 */
(function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (!id) {
        document.getElementById('nomeRobo').textContent = 'Robô não especificado';
        return;
    }
    
    const robo = IDENZA_ROBOS_DATABASE.find(r => r.id === id);
    
    if (!robo) {
        document.getElementById('nomeRobo').textContent = 'Robô não encontrado';
        document.getElementById('tipoRobo').textContent = `ID "${id}" não existe no banco de dados.`;
        return;
    }
    
    // Preencher header
    document.title = `${robo.nome} — Idenza Robotics Academy`;
    document.getElementById('nomeRobo').textContent = robo.nome;
    document.getElementById('tipoRobo').textContent = robo.tipo;
    document.getElementById('dificuldade').textContent = robo.dificuldade.toUpperCase();
    document.getElementById('custo').textContent = robo.custo;
    document.getElementById('tempo').textContent = robo.tempo;
    document.getElementById('pecas').textContent = robo.pecas;
    
    // Construir conteúdo
    const conteudo = document.getElementById('conteudoProjeto');
    conteudo.innerHTML = `
        <!-- Descrição -->
        <div class="panel">
            <h2><i class="fas fa-info-circle"></i> Sobre este Robô</h2>
            <p>${robo.descricao}</p>
            ${robo.video ? `<p><a href="${robo.video}" target="_blank" class="btn-video"><i class="fas fa-play"></i> Assistir Vídeo de Demonstração</a></p>` : ''}
        </div>
        
        <!-- Aprendizado -->
        <div class="panel">
            <h2><i class="fas fa-graduation-cap"></i> O Que Você Vai Aprender</h2>
            <ul>${robo.aprendizado.map(a => `<li>${a}</li>`).join('')}</ul>
        </div>
        
        ${robo.preRequisitos ? `
        <div class="panel">
            <h2><i class="fas fa-check-circle"></i> Pré-Requisitos</h2>
            <ul>${robo.preRequisitos.map(p => `<li>${p}</li>`).join('')}</ul>
        </div>` : ''}
        
        <!-- BOM -->
        <div class="panel">
            <h2><i class="fas fa-shopping-cart"></i> Lista de Compras (BOM)</h2>
            <table class="bom-table">
                <thead><tr><th>Item</th><th>Qtd</th><th>Preço</th><th>Função</th></tr></thead>
                <tbody>${robo.bom.map(item => `
                    <tr>
                        <td>${item.link ? `<a href="${item.link}" target="_blank">${item.item}</a>` : item.item}</td>
                        <td>${item.qtd}</td>
                        <td>${item.preco}</td>
                        <td>${item.funcao}</td>
                    </tr>`).join('')}</tbody>
            </table>
        </div>
        
        <!-- Ferramentas -->
        ${robo.ferramentas ? `
        <div class="panel">
            <h2><i class="fas fa-tools"></i> Ferramentas Necessárias</h2>
            <ul>${robo.ferramentas.map(f => `<li>${f}</li>`).join('')}</ul>
        </div>` : ''}
        
        ${robo.impressao3d ? `
        <div class="panel">
            <h2><i class="fas fa-cube"></i> Impressão 3D</h2>
            <p>Este robô requer peças impressas em 3D.</p>
            ${robo.arquivos3D ? `<p><a href="${robo.arquivos3D}" target="_blank" class="btn-video"><i class="fas fa-download"></i> Baixar Arquivos STL</a></p>` : ''}
        </div>` : ''}
        
        <!-- Passo a Passo -->
        <div class="panel">
            <h2><i class="fas fa-list-ol"></i> Passo a Passo Completo</h2>
            ${robo.passos.map(p => `
                <div class="step">
                    <div class="step-num">${p.numero}</div>
                    <div class="step-content">
                        <h4>${p.titulo}</h4>
                        <p>${p.descricao}</p>
                        ${p.codigo ? `<p><code>📄 Código: ${p.codigo}</code></p>` : ''}
                    </div>
                </div>`).join('')}
        </div>
        
        <!-- Código-Fonte -->
        ${robo.codigoFonte ? `
        <div class="panel">
            <h2><i class="fas fa-code"></i> Código-Fonte Completo</h2>
            ${Object.entries(robo.codigoFonte).map(([nome, codigo]) => `
                <h3>📄 ${nome}</h3>
                <pre class="code-block"><code>${escapeHTML(codigo)}</code></pre>
            `).join('')}
        </div>` : ''}
        
        <!-- Dicas -->
        ${robo.dicas ? `
        <div class="panel">
            <h2><i class="fas fa-lightbulb"></i> Dicas e Solução de Problemas</h2>
            <ul>${robo.dicas.map(d => `<li>${d}</li>`).join('')}</ul>
        </div>` : ''}
        
        <!-- Comunidade -->
        ${robo.comunidade || robo.github ? `
        <div class="panel">
            <h2><i class="fas fa-users"></i> Comunidade e Recursos</h2>
            ${robo.comunidade ? `<p><a href="${robo.comunidade}" target="_blank"><i class="fas fa-globe"></i> Site Oficial</a></p>` : ''}
            ${robo.github ? `<p><a href="${robo.github}" target="_blank"><i class="fab fa-github"></i> Repositório GitHub</a></p>` : ''}
        </div>` : ''}
    `;
    
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
})();
