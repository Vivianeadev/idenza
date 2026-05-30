/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — COMPONENTE TOAST
 * ============================================================
 * 
 * Sistema de notificações toast (snackbar) com:
 * - Múltiplos tipos: success, warning, critical, info
 * - Duração configurável
 * - Barra de progresso de expiração
 * - Ações (botões no toast)
 * - Empilhamento inteligente
 * - Posição configurável
 * - Animações de entrada e saída
 * - Agrupamento de toasts similares
 * 
 * @component Toast
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaToast = {
    // ============================================================
    // CONFIGURAÇÃO
    // ============================================================
    config: {
        position: 'bottom-right', // top-left, top-right, bottom-left, bottom-right, top-center, bottom-center
        maxToasts: 5,
