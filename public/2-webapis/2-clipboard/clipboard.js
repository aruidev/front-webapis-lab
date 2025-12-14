/**
 * Comprueba si la Clipboard API está disponible.
 * @returns true si `navigator.clipboard` existe.
 */
function esDisponible() {
    return typeof navigator !== 'undefined' && !!navigator.clipboard;
}
/**
 * Copia texto plano al portapapeles.
 * @param text - Texto a copiar.
 */
async function copiarText(text) {
    if (!esDisponible())
        throw new Error('Clipboard API no soportada');
    await navigator.clipboard.writeText(text);
}
/**
 * Copia HTML (y su texto plano) al portapapeles.
 * @param html - Contenido HTML a copiar.
 * @param plainText - Texto alternativo (fallback) opcional.
 */
async function copiarHtml(html, plainText) {
    if (!esDisponible())
        throw new Error('Clipboard API no soportada');
    const item = new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plainText ?? html.replace(/<[^>]*>/g, '')], { type: 'text/plain' })
    });
    await navigator.clipboard.write([item]);
}
/**
 * Copia el HTML de un elemento del DOM y su texto plano.
 * @param element - Elemento objetivo.
 */
async function copiarElement(element) {
    const html = element.outerHTML;
    const text = element.innerText ?? element.textContent ?? '';
    await copiarHtml(html, text);
}
/**
 * Lee y devuelve texto plano del portapapeles.
 * @returns Texto leído.
 */
async function pegarText() {
    if (!esDisponible())
        throw new Error('Clipboard API no soportada');
    return await navigator.clipboard.readText();
}
/**
 * Intenta leer HTML del portapapeles; si no hay, devuelve null.
 * @returns HTML como string o null si no disponible.
 */
async function pegarHtml() {
    if (!esDisponible())
        throw new Error('Clipboard API no soportada');
    const items = await navigator.clipboard.read();
    for (const item of items) {
        if (item.types.includes('text/html')) {
            const blob = await item.getType('text/html');
            return await blob.text();
        }
    }
    return null;
}
/**
 * Inserta HTML leído del portapapeles en un contenedor destino.
 * @param desti - Contenedor donde insertar el primer nodo del HTML pegado.
 * @returns true si insertó HTML, false si no había HTML.
 */
async function pegarHtmlA(desti) {
    const html = await pegarHtml();
    if (!html)
        return false;
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const first = temp.firstElementChild;
    if (first)
        desti.appendChild(first);
    return !!first;
}
/**
 * Vincula botones por id para copiar/pegar usando la librería.
 * @param copyBtn - Botón de copiar.
 * @param pasteBtn - Botón de pegar.
 * @param sourceElement - Elemento cuyo HTML se copiará.
 * @param destino - Contenedor donde pegar HTML.
 */
function vincularBotons(copyBtn, pasteBtn, sourceElement, destino) {
    copyBtn.addEventListener('click', async () => {
        try {
            await copiarElement(sourceElement);
            // Opcional: feedback
        }
        catch (err) {
            alert('Error al copiar: ' + err.message);
        }
    });
    pasteBtn.addEventListener('click', async () => {
        try {
            const ok = await pegarHtmlA(destino);
            if (!ok) {
                // Fallback a texto
                const text = await pegarText();
                const p = document.createElement('p');
                p.textContent = text;
                destino.appendChild(p);
            }
        }
        catch (err) {
            alert('Error al pegar: ' + err.message);
        }
    });
}
// Exports estilo librería
export { esDisponible, copiarText, copiarHtml, copiarElement, pegarText, pegarHtml, pegarHtmlA, vincularBotons };
export const Clipboard = {
    esDisponible,
    copiarText,
    copiarHtml,
    copiarElement,
    pegarText,
    pegarHtml,
    pegarHtmlA,
    vincularBotons
};
export default Clipboard;
