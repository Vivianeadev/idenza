/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — UTILITÁRIOS DE FORMATAÇÃO
 * ============================================================
 * 
 * Funções para formatação de dados:
 * - Datas e timestamps
 * - Números, moedas e porcentagens
 * - Tamanhos de arquivo e dados
 * - Strings e identificadores
 * - Durações e tempos
 * - Nomes técnicos
 * 
 * @namespace IdenzaFormat
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaFormat = {
    // ============================================================
    // DATA E HORA
    // ============================================================
    date(date, format = 'pt-BR') {
        const d = date instanceof Date ? date : new Date(date);
        if (isNaN(d.getTime())) return 'Data inválida';

        switch (format) {
            case 'iso':
                return d.toISOString();
            case 'pt-BR':
                return d.toLocaleDateString('pt-BR');
            case 'pt-BR-full':
                return d.toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                });
            case 'us':
                return d.toLocaleDateString('en-US');
            default:
                return d.toLocaleDateString('pt-BR');
        }
    },

    time(date, seconds = false) {
        const d = date instanceof Date ? date : new Date(date);
        if (isNaN(d.getTime())) return 'Hora inválida';

        const options = { hour: '2-digit', minute: '2-digit' };
        if (seconds) options.second = '2-digit';
        
        return d.toLocaleTimeString('pt-BR', options);
    },

    dateTime(date, format = 'short') {
        const d = date instanceof Date ? date : new Date(date);
        if (isNaN(d.getTime())) return 'Data/hora inválida';

        if (format === 'short') {
            return `${this.date(d)} ${this.time(d, true)}`;
        }
        return d.toLocaleString('pt-BR');
    },

    timestamp(date) {
        const d = date instanceof Date ? date : new Date(date);
        if (isNaN(d.getTime())) return null;
        return d.getTime();
    },

    relativeTime(date) {
        const d = date instanceof Date ? date : new Date(date);
        if (isNaN(d.getTime())) return '—';

        const now = Date.now();
        const diff = now - d.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 5) return 'agora mesmo';
        if (seconds < 60) return `há ${seconds}s`;
        if (minutes < 60) return `há ${minutes}min`;
        if (hours < 24) return `há ${hours}h`;
        if (days === 1) return 'ontem';
        if (days < 7) return `há ${days} dias`;
        if (days < 30) return `há ${Math.floor(days / 7)} semanas`;
        if (days < 365) return `há ${Math.floor(days / 30)} meses`;
        return `há ${Math.floor(days / 365)} anos`;
    },

    // ============================================================
    // DURAÇÃO
    // ============================================================
    duration(ms, format = 'compact') {
        if (ms < 0) ms = 0;

        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;

        if (format === 'compact') {
            if (hours > 0) return `${hours}h ${remainingMinutes}min`;
            if (minutes > 0) return `${minutes}min ${remainingSeconds}s`;
            return `${seconds}s`;
        }

        return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    },

    // ============================================================
    // NÚMEROS
    // ============================================================
    number(value, decimals = 0) {
        if (value === null || value === undefined || isNaN(value)) return '0';
        return Number(value).toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
    },

    currency(value, currency = 'BRL') {
        if (value === null || value === undefined) return '—';
        
        return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency,
        });
    },

    percent(value, decimals = 1) {
        if (value === null || value === undefined) return '0%';
        return Number(value).toLocaleString('pt-BR', {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
    },

    compact(value) {
        if (value === null || value === undefined) return '0';

        const num = Number(value);
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
        return num.toString();
    },

    // ============================================================
    // TAMANHOS DE DADOS
    // ============================================================
    fileSize(bytes) {
        if (bytes === 0) return '0 B';
        if (bytes === null || bytes === undefined) return '—';

        const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const size = (bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1);
        return `${size} ${units[i]}`;
    },

    memorySize(mb) {
        return this.fileSize(mb * 1024 * 1024);
    },

    // ============================================================
    // STRINGS
    // ============================================================
    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },

    titleCase(str) {
        if (!str) return '';
        return str.replace(/\b\w/g, char => char.toUpperCase());
    },

    slugify(str) {
        if (!str) return '';
        return str
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    truncate(str, maxLength = 50, suffix = '...') {
        if (!str) return '';
        if (str.length <= maxLength) return str;
        return str.substring(0, maxLength - suffix.length) + suffix;
    },

    initials(str) {
        if (!str) return '';
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')
            .substring(0, 3);
    },

    camelToTitle(str) {
        if (!str) return '';
        return str
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, char => char.toUpperCase())
            .trim();
    },

    snakeToTitle(str) {
        if (!str) return '';
        return str
            .split('_')
            .map(word => this.capitalize(word))
            .join(' ');
    },

    // ============================================================
    // IDENTIFICADORES
    // ============================================================
    generateId(prefix = 'idenza') {
        return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`;
    },

    shortId(length = 8) {
        return Math.random().toString(36).substr(2, length);
    },

    // ============================================================
    // FORMATAÇÕES TÉCNICAS
    // ============================================================
    temperature(value, unit = '°C') {
        if (value === null || value === undefined) return '—';
        return `${Number(value).toFixed(1)}${unit}`;
    },

    speed(value, unit = 'm/s') {
        if (value === null || value === undefined) return '—';
        return `${Number(value).toFixed(1)} ${unit}`;
    },

    latency(value) {
        if (value === null || value === undefined) return '—';
        if (value < 1) return `${(value * 1000).toFixed(0)} µs`;
        if (value < 1000) return `${value.toFixed(1)} ms`;
        return `${(value / 1000).toFixed(2)} s`;
    },

    frequency(value) {
        if (value === null || value === undefined) return '—';
        if (value >= 1e9) return `${(value / 1e9).toFixed(1)} GHz`;
        if (value >= 1e6) return `${(value / 1e6).toFixed(0)} MHz`;
        if (value >= 1e3) return `${(value / 1e3).toFixed(0)} KHz`;
        return `${value} Hz`;
    },

    torque(value) {
        if (value === null || value === undefined) return '—';
        return `${Number(value).toFixed(1)} N·m`;
    },

    weight(value) {
        if (value === null || value === undefined) return '—';
        if (value >= 1000) return `${(value / 1000).toFixed(1)} kg`;
        return `${value} g`;
    },

    voltage(value) {
        if (value === null || value === undefined) return '—';
        return `${Number(value).toFixed(1)}V`;
    },

    current(value) {
        if (value === null || value === undefined) return '—';
        if (value >= 1) return `${Number(value).toFixed(1)}A`;
        return `${(value * 1000).toFixed(0)}mA`;
    },

    percentage(value, decimals = 1) {
        if (value === null || value === undefined) return '—';
        return `${Number(value).toFixed(decimals)}%`;
    },

    // ============================================================
    // FORMATAÇÃO PARA LOGS
    // ============================================================
    logTimestamp() {
        const now = new Date();
        return now.toISOString().replace('T', ' ').substring(0, 23);
    },

    logLevel(level) {
        const levels = { info: 'INFO', warn: 'WARN', error: 'ERROR', debug: 'DEBUG' };
        return levels[level] || level.toUpperCase().padEnd(5, ' ');
    },
};

// ============================================================
// EXPORTAÇÃO
// ============================================================
window.IdenzaFormat = IdenzaFormat;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = IdenzaFormat;
}
