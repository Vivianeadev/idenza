/**
 * ============================================================
 * IDENZA ROBOTICS ACADEMY — UTILITÁRIOS DOM
 * ============================================================
 * 
 * Funções auxiliares para manipulação do DOM:
 * - Seletores simplificados ($, $$)
 * - Criação de elementos
 * - Manipulação de classes
 * - Eventos delegados
 * - Animações
 * - Medições de elementos
 * 
 * @namespace IdenzaDOM
 * @version 6.0.0
 * @license Proprietária — Idenza Robotics Intelligence S.A.
 * ============================================================
 */

const IdenzaDOM = {
    // ============================================================
    // SELETORES
    // ============================================================
    
    // Seleciona um elemento
    $(selector, parent = document) {
        return parent.querySelector(selector);
    },

    // Seleciona todos os elementos
    $$(selector, parent = document) {
        return Array.from(parent.querySelectorAll(selector));
    },

    // Seleciona por ID
    byId(id) {
        return document.getElementById(id);
    },

    // Seleciona por classe
    byClass(className, parent = document) {
        return Array.from(parent.getElementsByClassName(className));
    },

    // Seleciona por tag
    byTag(tagName, parent = document) {
        return Array.from(parent.getElementsByTagName(tagName));
    },

    // ============================================================
    // CRIAÇÃO DE ELEMENTOS
    // ============================================================
    
    // Cria elemento com atributos e filhos
    create(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);

        // Aplica atributos
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'style' && typeof value === 'object') {
                Object.assign(element.style, value);
            } else if (key === 'dataset' && typeof value === 'object') {
                Object.assign(element.dataset, value);
            } else if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.slice(2).toLowerCase(), value);
            } else if (key === 'html') {
                element.innerHTML = value;
            } else if (key === 'text') {
                element.textContent = value;
            } else {
                element.setAttribute(key, value);
            }
        });

        // Adiciona filhos
        if (typeof children === 'string') {
            element.innerHTML = children;
        } else if (Array.isArray(children)) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else if (child instanceof Node) {
                    element.appendChild(child);
                }
            });
        } else if (children instanceof Node) {
            element.appendChild(children);
        }

        return element;
    },

    // Cria elemento a partir de string HTML
    fromHTML(htmlString) {
        const template = document.createElement('template');
        template.innerHTML = htmlString.trim();
        return template.content.firstChild;
    },

    // Cria fragmento de documento
    createFragment() {
        return document.createDocumentFragment();
    },

    // ============================================================
    // MANIPULAÇÃO DE CLASSES
    // ============================================================
    
    addClass(element, ...classes) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.classList.add(...classes);
    },

    removeClass(element, ...classes) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.classList.remove(...classes);
    },

    toggleClass(element, className, force) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.classList.toggle(className, force);
    },

    hasClass(element, className) {
        if (typeof element === 'string') element = this.$(element);
        return element ? element.classList.contains(className) : false;
    },

    // ============================================================
    // MANIPULAÇÃO DE ATRIBUTOS
    // ============================================================
    
    setAttr(element, name, value) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.setAttribute(name, value);
    },

    getAttr(element, name) {
        if (typeof element === 'string') element = this.$(element);
        return element ? element.getAttribute(name) : null;
    },

    removeAttr(element, name) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.removeAttribute(name);
    },

    setData(element, key, value) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.dataset[key] = value;
    },

    getData(element, key) {
        if (typeof element === 'string') element = this.$(element);
        return element ? element.dataset[key] : null;
    },

    // ============================================================
    // MANIPULAÇÃO DE CONTEÚDO
    // ============================================================
    
    html(element, content) {
        if (typeof element === 'string') element = this.$(element);
        if (!element) return;
        if (content === undefined) return element.innerHTML;
        element.innerHTML = content;
    },

    text(element, content) {
        if (typeof element === 'string') element = this.$(element);
        if (!element) return;
        if (content === undefined) return element.textContent;
        element.textContent = content;
    },

    empty(element) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.innerHTML = '';
    },

    remove(element) {
        if (typeof element === 'string') element = this.$(element);
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    },

    // ============================================================
    // INSERÇÃO
    // ============================================================
    
    append(parent, child) {
        if (typeof parent === 'string') parent = this.$(parent);
        if (parent && child) parent.appendChild(child);
        return parent;
    },

    prepend(parent, child) {
        if (typeof parent === 'string') parent = this.$(parent);
        if (parent && child) parent.insertBefore(child, parent.firstChild);
        return parent;
    },

    after(element, sibling) {
        if (typeof element === 'string') element = this.$(element);
        if (element && element.parentNode) {
            element.parentNode.insertBefore(sibling, element.nextSibling);
        }
    },

    before(element, sibling) {
        if (typeof element === 'string') element = this.$(element);
        if (element && element.parentNode) {
            element.parentNode.insertBefore(sibling, element);
        }
    },

    // ============================================================
    // EVENTOS
    // ============================================================
    
    on(element, event, callback, options = {}) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.addEventListener(event, callback, options);
    },

    off(element, event, callback) {
        if (typeof element === 'string') element = this.$(element);
        if (element) element.removeEventListener(event, callback);
    },

    // Delegação de eventos
    delegate(parent, event, selector, callback) {
        if (typeof parent === 'string') parent = this.$(parent);

        const handler = (e) => {
            const target = e.target.closest(selector);
            if (target && parent.contains(target)) {
                callback.call(target, e, target);
            }
        };

        parent.addEventListener(event, handler);
        
        // Retorna função para remover
        return () => parent.removeEventListener(event, handler);
    },

    // Evento único
    once(element, event, callback) {
        if (typeof element === 'string') element = this.$(element);
        if (element) {
            element.addEventListener(event, callback, { once: true });
        }
    },

    // Disparar evento
    trigger(element, eventName, detail = {}) {
        if (typeof element === 'string') element = this.$(element);
        if (element) {
            const event = new CustomEvent(eventName, { detail, bubbles: true });
            element.dispatchEvent(event);
        }
    },

    // ============================================================
    // ANIMAÇÕES
    // ============================================================
    
    fadeIn(element, duration = 300) {
        if (typeof element === 'string') element = this.$(element);
        if (!element) return;

        element.style.opacity = '0';
        element.style.display = '';
        element.style.transition = `opacity ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });

        return new Promise(resolve => setTimeout(resolve, duration));
    },

    fadeOut(element, duration = 300) {
        if (typeof element === 'string') element = this.$(element);
        if (!element) return;

        element.style.opacity = '1';
        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = '0';

        return new Promise(resolve => {
            setTimeout(() => {
                element.style.display = 'none';
                resolve();
            }, duration);
        });
    },

    slideDown(element, duration = 300) {
        if (typeof element === 'string') element = this.$(element);
        if (!element) return;

        element.style.display = '';
        const height = element.scrollHeight;
        element.style.overflow = 'hidden';
        element.style.maxHeight = '0';
        element.style.transition = `max-height ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.maxHeight = height + 'px';
        });

        return new Promise(resolve => {
            setTimeout(() => {
                element.style.maxHeight = 'none';
                element.style.overflow = '';
                resolve();
            }, duration);
        });
    },

    slideUp(element, duration = 300) {
        if (typeof element === 'string') element = this.$(element);
        if (!element) return;

        element.style.maxHeight = element.scrollHeight + 'px';
        element.style.overflow = 'hidden';
        element.style.transition = `max-height ${duration}ms ease`;

        requestAnimationFrame(() => {
            element.style.maxHeight = '0';
        });

        return new Promise(resolve => {
            setTimeout(() => {
                element.style.display = 'none';
                resolve();
            }, duration);
        });
    },

    // ============================================================
    // MEDIÇÕES E POSIÇÕES
    // ============================================================
    
    offset(element) {
        if (typeof element === 'string') element = this.$(element);
        if (!element) return { top: 0, left: 0 };

        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height,
        };
    },

    position(element) {
        if (typeof element === 'string') element = this.$(element);
        if (!element) return { top: 0, left: 0 };

        return {
            top: element.offsetTop,
            left: element.offsetLeft,
        };
    },

    width(element) {
        if (typeof element === 'string') element = this.$(element);
        return element ? element.offsetWidth : 0;
    },

    height(element) {
        if (typeof element === 'string') element = this.$(element);
        return element ? element.offsetHeight : 0;
    },

    isInViewport(element, offset = 0) {
        if (typeof element === 'string') element = this.$(element);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return (
            rect.top + offset < window.innerHeight &&
            rect.bottom - offset > 0 &&
            rect.left + offset < window.innerWidth &&
            rect.right - offset > 0
        );
    },

    scrollTo(element, options = {}) {
        if (typeof element === 'string') element = this.$(element);
        if (element) {
            element.scrollIntoView({
                behavior: options.smooth !== false ? '
