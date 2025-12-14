/**
 * Comprueba si el modo de pantalla completa está activo.
 * @returns Devuelve true si hay un elemento en fullscreen; false en caso contrario.
 */
function esActiu() {
    return !!document.fullscreenElement;
}
/**
 * Entra en modo pantalla completa para un elemento dado.
 * @param target - Elemento objetivo para solicitar pantalla completa. Por defecto, el elemento raíz del documento.
 * @returns Promesa que se resuelve cuando el navegador aplica el fullscreen.
 */
async function entrar(target = document.documentElement) {
    await target.requestFullscreen();
}
/**
 * Sale del modo pantalla completa si está activo.
 * @returns Promesa que se resuelve al abandonar el fullscreen.
 */
async function sortir() {
    if (document.fullscreenElement) {
        await document.exitFullscreen();
    }
}
/**
 * Alterna el modo pantalla completa: entra si no está activo, sale si lo está.
 * @param target - Elemento objetivo para entrar en fullscreen cuando no está activo.
 * @returns Promesa que se resuelve cuando se completa la acción.
 */
async function alternar(target = document.documentElement) {
    if (esActiu()) {
        await sortir();
    }
    else {
        await entrar(target);
    }
}
/**
 * Suscribe un manejador al evento de cambio de pantalla completa.
 * @param handler - Función llamada cuando cambia el estado; recibe el elemento en fullscreen o null.
 */
function enCanvi(handler) {
    document.addEventListener("fullscreenchange", () => handler(document.fullscreenElement));
}
/**
 * Suscribe un manejador al evento de error de pantalla completa.
 * @param handler - Función llamada cuando ocurre un error relacionado con fullscreen.
 */
function enError(handler) {
    document.addEventListener("fullscreenerror", handler);
}
/**
 * Sincroniza el texto de un botón con el estado de pantalla completa.
 * @param btn - Elemento del botón a actualizar.
 * @param labels - Textos para los estados de entrada y salida de fullscreen.
 */
function sincronitzarTextBoto(btn, labels = { enter: "Go Fullscreen", exit: "Exit Fullscreen" }) {
    btn.textContent = esActiu() ? labels.exit : labels.enter;
}
/**
 * Vincula un botón para alternar pantalla completa y sincroniza su texto automáticamente.
 * @param btn - Botón que alternará el estado de fullscreen.
 * @param target - Elemento objetivo para solicitar fullscreen cuando se active.
 * @param labels - Textos personalizados para el botón en los estados de entrada/salida.
 */
function vincularBotoAlternar(btn, target = document.documentElement, labels) {
    // Inicializa texto
    sincronitzarTextBoto(btn, labels);
    // Cambia al pulsar
    btn.addEventListener("click", async () => {
        try {
            await alternar(target);
            sincronitzarTextBoto(btn, labels);
        }
        catch (err) {
            console.error(`${err?.name ?? "Error"}: ${err?.message ?? String(err)}`);
        }
    });
    // Sincroniza ante cambios externos
    enCanvi(() => sincronitzarTextBoto(btn, labels));
    enError(ev => console.error("fullscreenerror:", ev));
}
// Exports
export { esActiu, entrar, sortir, alternar as commutar, enCanvi, enError, sincronitzarTextBoto, vincularBotoAlternar as vincularBotoCommutacio };
export const Fullscreen = {
    esActiu,
    entrar,
    sortir,
    commutar: alternar,
    enCanvi,
    enError,
    sincronitzarTextBoto,
    vincularBotoCommutacio: vincularBotoAlternar,
};
export default Fullscreen;
