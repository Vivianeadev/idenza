/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — COMPONENTE CODE VIEWER
 * ============================================================
 * 
 * Visualizador de código com syntax highlighting:
 * - Highlight para ROS, Python, C++, Bash, YAML, JSON
 * - Botão de cópia com feedback
 * - Numeração de linhas
 * - Tema escuro e claro
 * - Suporte a múltiplas linguagens
 * - Blocos colapsáveis
 * - Indicador de linguagem
 * 
 * @component CodeViewer
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaCodeViewer = {
    config: {
        showLineNumbers: true,
        showLanguage: true,
        showCopyButton: true,
        defaultLanguage: 'plaintext',
        theme: 'dark',
        maxHeight: '500px',
    },

    // Mapa de palavras-chave por linguagem
    keywords: {
        python: ['def', 'class', 'import', 'from', 'return', 'if', 'elif', 'else', 'for', 'while', 'try', 'except', 'finally', 'with', 'as', 'yield', 'lambda', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is', 'None', 'True', 'False', 'self', 'raise', 'assert'],
        cpp: ['int', 'float', 'double', 'char', 'bool', 'void', 'auto', 'const', 'static', 'virtual', 'override', 'class', 'struct', 'namespace', 'using', 'public', 'private', 'protected', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'delete', 'nullptr', 'true', 'false', 'include', 'define', 'template', 'typename'],
        ros: ['rosservice', 'rostopic', 'rosnode', 'rosrun', 'roslaunch', 'rosparam', 'rosmsg', 'rossrv', 'catkin', 'colcon', 'rclcpp', 'rclpy', 'Node', 'Publisher', 'Subscriber', 'Service', 'Action', 'spin', 'init', 'shutdown'],
        bash: ['echo', 'cd', 'ls', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'grep', 'chmod', 'sudo', 'apt', 'pip', 'git', 'docker', 'export', 'source', 'alias', 'unalias', 'if', 'then', 'else', 'fi', 'for', 'do', 'done', 'while', 'function', 'return'],
        yaml: ['true', 'false', 'null', 'yes', 'no', 'on', 'off'],
        json: ['true', 'false', 'null'],
        javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'class', 'extends', 'new', 'this', 'super', 'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'null', 'undefined', 'true', 'false', 'console'],
    },

    strings: ['python', 'cpp', 'ros', 'bash', 'yaml', 'json', 'javascript'],

    // ============================================================
    // INICIALIZAR BLOCO DE CÓDIGO
    // ============================================================
    init(containerSelector = '.code-block') {
        const containers = document.querySelectorAll(containerSelector);

        containers.forEach(container => {
            if (container.dataset.idenzaCode) return; // Já inicializado

            const config = {
                ...this.config,
                language: container.dataset.language || this.config.defaultLanguage,
                showLineNumbers: container.dataset.lineNumbers !== 'false',
                showCopyButton: container.dataset.copyButton !== 'false',
                showLanguage: container.dataset.languageLabel !== 'false',
            };

            this._enhanceBlock(container, config);
            container.dataset.idenzaCode = 'true';
        });
    },

    // ============================================================
    // CRIAR BLOCO DE CÓDIGO DINAMICAMENTE
    // ============================================================
    create(container, code, language = 'plaintext', options = {}) {
        const config = { ...this.config, ...options, language };

        const wrapper = document.createElement('div');
        wrapper.className = 'code-block';
        wrapper.dataset.language = language;

        // Header
        if (config.showLanguage || config.showCopyButton) {
            const header = document.createElement('div');
            header.className = 'code-header';

            if (config.showLanguage) {
                const langLabel = document.createElement('span');
                langLabel.className = 'code-language';
                langLabel.innerHTML = `<i class="fas fa-code"></i> ${this._getLanguageLabel(language)}`;
                header.appendChild(langLabel);
            }

            if (config.showCopyButton) {
                const copyBtn = document.createElement('button');
                copyBtn.className = 'copy-btn';
                copyBtn.title = 'Copiar código';
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copiar';
                copyBtn.addEventListener('click', () => this._copyCode(wrapper, copyBtn));
                header.appendChild(copyBtn);
            }

            wrapper.appendChild(header);
        }

        // Pre
        const pre = document.createElement('pre');
        if (config.maxHeight) {
            pre.style.maxHeight = config.maxHeight;
            pre.style.overflowY = 'auto';
        }

        // Code
        const codeEl = document.createElement('code');
        codeEl.className = `language-${language}`;
        codeEl.textContent = code;
        codeEl.innerHTML = this._highlight(code, language, config.showLineNumbers);

        pre.appendChild(codeEl);
        wrapper.appendChild(pre);

        if (typeof container === 'string') {
            container = document.querySelector(container);
        }

        if (container) {
            container.appendChild(wrapper);
        }

        wrapper.dataset.idenzaCode = 'true';
        return wrapper;
    },

    // ============================================================
    // HIGHLIGHT DE SINTAXE
    // ============================================================
    _highlight(code, language, showLineNumbers = true) {
        let highlighted = this._escapeHTML(code);

        // Aplica highlighting baseado na linguagem
        const langKeywords = this.keywords[language] || [];

        if (langKeywords.length > 0) {
            // Strings (entre aspas)
            highlighted = highlighted.replace(/(["'`])(?:(?!\1).)*?\1/g, 
                '<span class="code-string">$&</span>');

            // Comentários
            if (language === 'python' || language === 'ros' || language === 'yaml' || language === 'bash') {
                highlighted = highlighted.replace(/(#.*$)/gm, 
                    '<span class="code-comment">$1</span>');
            }
            if (language === 'cpp' || language === 'javascript') {
                highlighted = highlighted.replace(/(\/\/.*$)/gm, 
                    '<span class="code-comment">$1</span>');
                highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, 
                    '<span class="code-comment">$1</span>');
            }
            if (language === 'bash') {
                highlighted = highlighted.replace(/(#.*$)/gm, 
                    '<span class="code-comment">$1</span>');
            }

            // Palavras-chave
            langKeywords.forEach(keyword => {
                const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
                highlighted = highlighted.replace(regex, 
                    '<span class="code-keyword">$1</span>');
            });

            // Números
            highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, 
                '<span class="code-number">$1</span>');

            // Funções (palavra seguida de parênteses)
            highlighted = highlighted.replace(/\b([a-zA-Z_]\w*)\s*\(/g, 
                '<span class="code-function">$1</span>(');

            // ROS específico (tópicos, serviços)
            if (language === 'ros' || language === 'bash') {
                highlighted = highlighted.replace(/(\/[a-zA-Z_]+\/?[a-zA-Z_]*)/g, 
                    '<span class="code-ros-topic">$1</span>');
            }
        }

        // Numeração de linhas
        if (showLineNumbers) {
            const lines = highlighted.split('\n');
            highlighted = lines.map((line, i) => 
                `<span class="code-line"><span class="code-line-number">${i + 1}</span>${line || ' '}</span>`
            ).join('\n');
        }

        return highlighted;
    },

    _escapeHTML(str) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
        };
        return str.replace(/[&<>"']/g, char => map[char]);
    },

    _getLanguageLabel(language) {
        const labels = {
            python: 'Python',
            cpp: 'C++',
            ros: 'ROS Command',
            bash: 'Bash / Terminal',
            yaml: 'YAML',
            json: 'JSON',
            javascript: 'JavaScript',
            plaintext: 'Texto',
        };
        return labels[language] || language.toUpperCase();
    },

    // ============================================================
    // BOTÃO DE CÓPIA
    // ============================================================
    _copyCode(wrapper, button) {
        const code = wrapper.querySelector('code');
        if (!code) return;

        const text = code.textContent;

        navigator.clipboard.writeText(text).then(() => {
            // Feedback visual
            const originalHTML = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copiado!';
            button.style.color = 'var(--color-success)';

            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.color = '';
            }, 2000);

            IdenzaToast?.success('Código copiado para a área de transferência');
        }).catch(() => {
            // Fallback para navegadores antigos
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            IdenzaToast?.success('Código copiado!');
        });
    },

    // ============================================================
    // MELHORAR BLOCOS EXISTENTES
    // ============================================================
    _enhanceBlock(container, config) {
        const pre = container.querySelector('pre');
        const code = container.querySelector('code');

        if (!pre || !code) return;

        // Aplica highlight
        const language = container.dataset.language || config.language;
        const rawCode = code.textContent;
        code.innerHTML = this._highlight(rawCode, language, config.showLineNumbers);

        // Adiciona max-height
        if (config.maxHeight) {
            pre.style.maxHeight = config.maxHeight;
            pre.style.overflowY = 'auto';
        }
    },

    // ============================================================
    // DESTRUIÇÃO
    // ============================================================
    destroy(container) {
        if (container && container.dataset) {
            delete container.dataset.idenzaCode;
        }
    },
};

// ============================================================
// INICIALIZAÇÃO AUTOMÁTICA
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    IdenzaCodeViewer.init();
    window.IdenzaCodeViewer = IdenzaCodeViewer;
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaCodeViewer;
}
