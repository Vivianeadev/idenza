/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — UTILITÁRIOS DE VALIDAÇÃO
 * ============================================================
 * 
 * Funções de validação para formulários e dados:
 * - Validação de campos obrigatórios
 * - Email, URL, senha, CPF, CNPJ
 * - Schemas de validação declarativos
 * - Mensagens de erro localizadas
 * - Sanitização de entrada
 * 
 * @namespace IdenzaValidate
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaValidate = {
    // ============================================================
    // VALIDAÇÕES SIMPLES
    // ============================================================
    required(value) {
        if (value === null || value === undefined) return false;
        if (typeof value === 'string') return value.trim().length > 0;
        if (typeof value === 'number') return true;
        if (Array.isArray(value)) return value.length > 0;
        return !!value;
    },

    email(value) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(value).toLowerCase());
    },

    url(value) {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    },

    minLength(value, min) {
        return String(value || '').length >= min;
    },

    maxLength(value, max) {
        return String(value || '').length <= max;
    },

    exactLength(value, length) {
        return String(value || '').length === length;
    },

    number(value) {
        return !isNaN(Number(value)) && isFinite(value);
    },

    integer(value) {
        return Number.isInteger(Number(value));
    },

    positive(value) {
        return Number(value) > 0;
    },

    negative(value) {
        return Number(value) < 0;
    },

    min(value, min) {
        return Number(value) >= min;
    },

    max(value, max) {
        return Number(value) <= max;
    },

    between(value, min, max) {
        const n = Number(value);
        return n >= min && n <= max;
    },

    // ============================================================
    // VALIDAÇÕES BRASILEIRAS
    // ============================================================
    cpf(value) {
        const cpf = String(value).replace(/[^\d]/g, '');
        
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) sum += parseInt(cpf[i]) * (10 - i);
        let digit = (sum * 10) % 11;
        if (digit === 10) digit = 0;
        if (digit !== parseInt(cpf[9])) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) sum += parseInt(cpf[i]) * (11 - i);
        digit = (sum * 10) % 11;
        if (digit === 10) digit = 0;
        return digit === parseInt(cpf[10]);
    },

    cnpj(value) {
        const cnpj = String(value).replace(/[^\d]/g, '');
        if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

        const weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        
        let sum = 0;
        for (let i = 0; i < 12; i++) sum += parseInt(cnpj[i]) * weights[i];
        let digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (digit !== parseInt(cnpj[12])) return false;

        sum = 0;
        for (let i = 0; i < 13; i++) sum += parseInt(cnpj[i]) * (weights[i - 1] || 6);
        digit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        return digit === parseInt(cnpj[13]);
    },

    phone(value) {
        const phone = String(value).replace(/[^\d]/g, '');
        return phone.length === 10 || phone.length === 11;
    },

    cep(value) {
        const cep = String(value).replace(/[^\d]/g, '');
        return cep.length === 8;
    },

    // ============================================================
    // VALIDAÇÕES TÉCNICAS
    // ============================================================
    ipAddress(value) {
        const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
        const ipv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        return ipv4.test(value) || ipv6.test(value);
    },

    port(value) {
        const port = Number(value);
        return Number.isInteger(port) && port >= 0 && port <= 65535;
    },

    rosTopic(value) {
        return /^\/[a-zA-Z_][a-zA-Z0-9_\/]*$/.test(value);
    },

    mqttTopic(value) {
        // MQTT topics permitem + (single level) e # (multi level) wildcards
        return /^[a-zA-Z0-9_\-\/\+#]+$/.test(value) && !value.includes('#') || 
               (value.includes('#') && value.endsWith('#'));
    },

    i2cAddress(value) {
        const addr = Number(value);
        return Number.isInteger(addr) && addr >= 0 && addr <= 127;
    },

    gpio(value) {
        const pin = Number(value);
        return Number.isInteger(pin) && pin >= 0 && pin <= 40;
    },

    // ============================================================
    // VALIDAÇÃO POR SCHEMA
    // ============================================================
    validate(data, schema) {
        const errors = {};

        Object.entries(schema).forEach(([field, rules]) => {
            const value = this._getNestedValue(data, field);

            if (Array.isArray(rules)) {
                for (const rule of rules) {
                    const error = this._applyRule(value, rule, field);
                    if (error) {
                        errors[field] = error;
                        break;
                    }
                }
            }
        });

        return {
            valid: Object.keys(errors).length === 0,
            errors,
        };
    },

    validateField(value, rules) {
        if (Array.isArray(rules)) {
            for (const rule of rules) {
                const error = this._applyRule(value, rule);
                if (error) return error;
            }
        }
        return null;
    },

    _applyRule(value, rule, field = '') {
        const ruleName = typeof rule === 'string' ? rule : rule.rule;
        const params = rule.params || {};
        const message = rule.message || this._getDefaultMessage(ruleName, field, params);

        switch (ruleName) {
            case 'required':
                return this.required(value) ? null : message;
            case 'email':
                return this.email(value) ? null : message;
            case 'url':
                return this.url(value) ? null : message;
            case 'number':
                return this.number(value) ? null : message;
            case 'integer':
                return this.integer(value) ? null : message;
            case 'positive':
                return this.positive(value) ? null : message;
            case 'min':
                return this.min(value, params.min) ? null : message;
            case 'max':
                return this.max(value, params.max) ? null : message;
            case 'between':
                return this.between(value, params.min, params.max) ? null : message;
            case 'minLength':
                return this.minLength(value, params.min) ? null : message;
            case 'maxLength':
                return this.maxLength(value, params.max) ? null : message;
            case 'cpf':
                return this.cpf(value) ? null : message;
            case 'cnpj':
                return this.cnpj(value) ? null : message;
            case 'phone':
                return this.phone(value) ? null : message;
            case 'custom':
                return typeof params.fn === 'function' ? (params.fn(value) ? null : message) : null;
            default:
                return null;
        }
    },

    _getDefaultMessage(rule, field, params) {
        const label = field.replace(/_/g, ' ').replace(/\./g, ' > ');
        const messages = {
            required: `${label} é obrigatório`,
            email: `${label} deve ser um email válido`,
            url: `${label} deve ser uma URL válida`,
            number: `${label} deve ser um número`,
            integer: `${label} deve ser um número inteiro`,
            positive: `${label} deve ser positivo`,
            min: `${label} deve ser no mínimo ${params.min}`,
            max: `${label} deve ser no máximo ${params.max}`,
            between: `${label} deve estar entre ${params.min} e ${params.max}`,
            minLength: `${label} deve ter no mínimo ${params.min} caracteres`,
            maxLength: `${label} deve ter no máximo ${params.max} caracteres`,
            cpf: `${label} inválido`,
            cnpj: `${label} inválido`,
            phone: `${label} inválido`,
        };
        return messages[rule] || `${label} inválido`;
    },

    // ============================================================
    // SANITIZAÇÃO
    // ============================================================
    sanitize(value) {
        if (typeof value !== 'string') return value;

        return value
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    },

    stripTags(value) {
        return String(value || '').replace(/<\/?[^>]+(>|$)/g, '');
    },

    escapeRegex(value) {
        return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    normalizeString(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    },

    // ============================================================
    // UTILITÁRIOS
    // ============================================================
    _getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : undefined;
        }, obj);
    },

    isValid(data, schema) {
        return this.validate(data, schema).valid;
    },
};

// ============================================================
// EXPORTAÇÃO
// ============================================================
window.IdenzaValidate = IdenzaValidate;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaValidate;
}
