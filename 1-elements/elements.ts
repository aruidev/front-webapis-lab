type Atributs = {
    [key: string]: string;
}

type CustomNode = Element | Text;

/**
 * Crea un nodo de texto del DOM.
 * @param text - El contenido de texto para el nodo.
 * @returns Un nodo de texto (Text).
 */
function crearNode(text: string) {
    return document.createTextNode(text);
}

/**
 * Importa y aplica múltiples atributos a un elemento del DOM.
 * @param element - El elemento al que se le aplicarán los atributos.
 * @param atributs - Un objeto con pares clave-valor de atributos HTML.
 */
function importarAtributs(element: Element, atributs: Atributs) {
    for (const key in atributs) {
        element.setAttribute(key, atributs[key]);
    }
}

/**
 * Crea un elemento HTML con atributos y contenido opcional.
 * @param tag - El nombre de la etiqueta HTML (ej: 'div', 'span', 'p').
 * @param atributs - (Opcional) Objeto con atributos HTML a aplicar.
 * @param node - (Opcional) Contenido del elemento: puede ser un string (texto) o un Node hijo.
 * @returns El elemento HTML creado.
 */
function crearElement(tag: string, atributs?: Atributs, node?: Node | string) {
    const element = document.createElement(tag);
    if (atributs) {
        importarAtributs(element, atributs);
    }
    if (node) {
        if (typeof node === 'string') {
            element.appendChild(crearNode(node));
        } else {
            element.appendChild(node);
        }
    }
    return element;
}

/**
 * Mueve un elemento al primer hijo de su padre.
 * @param element - El elemento a mover.
 */
function aPrimerFill(element: Element) {
    const parent = element.parentElement;
    if (parent && parent.firstChild) {
        parent.insertBefore(element, parent.firstChild);
    }
}

/**
 * Mueve un elemento al último hijo de su padre.
 * @param element - El elemento a mover.
 */
function aUltimFill(element: Element) {
    const parent = element.parentElement;
    if (parent) {
        parent.appendChild(element);
    }
}

/**
 * Mueve un elemento una posición anterior entre sus hermanos.
 * @param element - El elemento a mover.
 */
function moureAnterior(element: Element) {
    const parent = element.parentElement;
    const previousSibling = element.previousElementSibling;
    if (parent && previousSibling) {
        parent.insertBefore(element, previousSibling);
    }
}

/**
 * Mueve un elemento una posición siguiente entre sus hermanos.
 * @param element - El elemento a mover.
 */
function moureSeguent(element: Element) {
    const parent = element.parentElement;
    const nextSibling = element.nextElementSibling;
    if (parent && nextSibling) {
        parent.insertBefore(nextSibling, element);
    }
}

// Exports

export type { Atributs, CustomNode };

export {
    crearNode,
    crearElement,
    importarAtributs,
    aPrimerFill,
    aUltimFill,
    moureAnterior,
    moureSeguent
};

export const Elements = {
    crearNode,
    crearElement,
    importarAtributs,
    aPrimerFill,
    aUltimFill,
    moureAnterior,
    moureSeguent
} as const;