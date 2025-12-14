const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeLinear = (t) => t;
/**
 * Crea un gráfico de barras animado dentro de un contenedor dado.
 * - Las barras parten de altura 0.
 * - La primera barra se anima al instante y las siguientes con un retardo configurable (delayMs).
 * - Todas terminan al mismo tiempo (las que empiezan más tarde avanzan más rápido para alcanzar el final).
 * @param container - Elemento contenedor donde se insertará el gráfico.
 * @param datos - Array de datos para las barras.
 * @param options - Opciones de configuración del gráfico.
 * @returns API para controlar el gráfico de barras.
 */
function crearGraficoBarras(container, datos, options = {}) {
    const delayMs = options.delayMs ?? 500;
    const duracionMs = Math.max(options.duracionMs ?? 2000, delayMs * (Math.max(datos.length - 1, 0) + 1));
    const easing = options.easing ?? easeLinear;
    let rafId = null;
    let startTime = 0;
    let currentDatos = [...datos];
    // Styles y estructura inicial
    const wrapper = document.createElement("div");
    wrapper.style.display = "grid";
    wrapper.style.gridTemplateColumns = `repeat(${Math.max(currentDatos.length, 1)}, 1fr)`;
    wrapper.style.alignItems = "stretch";
    wrapper.style.gap = "12px";
    wrapper.style.height = `${options.alturaMax ?? 240}px`;
    wrapper.style.padding = "8px";
    wrapper.style.background = "rgba(255,255,255,0.04)";
    wrapper.style.border = "1px solid rgba(255,255,255,0.1)";
    wrapper.style.borderRadius = "12px";
    const barElements = [];
    const labelElements = [];
    /**
     * Crea la barra individual.
     * @param dato - Dato de la barra (valor, etiqueta, color).
     */
    const crearBarra = (dato) => {
        const barContainer = document.createElement("div");
        barContainer.style.display = "grid";
        barContainer.style.gridTemplateRows = "1fr auto"; // barra ocupa el alto, etiqueta abajo
        barContainer.style.gap = "6px";
        barContainer.style.justifyItems = "center";
        barContainer.style.height = "100%"; // necesario para que el % de la barra tome la altura total
        const track = document.createElement("div");
        track.style.position = "relative";
        track.style.width = "100%";
        track.style.height = "100%";
        track.style.borderRadius = "8px 8px 4px 4px";
        track.style.background = "rgba(255,255,255,0.05)";
        const bar = document.createElement("div");
        bar.style.position = "absolute";
        bar.style.left = "0";
        bar.style.bottom = "0";
        bar.style.width = "100%";
        bar.style.height = "0%";
        bar.style.borderRadius = "8px 8px 4px 4px";
        bar.style.background = dato.color ?? "linear-gradient(135deg, #3b82f6, #06b6d4)";
        bar.style.transition = "height 80ms linear"; // actualiza suave entre frames
        bar.style.transformOrigin = "bottom";
        track.appendChild(bar);
        const label = document.createElement("span");
        label.textContent = dato.etiqueta ?? String(dato.valor);
        label.style.fontSize = "12px";
        label.style.color = "#e2e8f0";
        barContainer.append(track, label);
        wrapper.appendChild(barContainer);
        barElements.push(bar);
        labelElements.push(label);
    };
    /**
     * Renderiza la estructura completa del gráfico.
     */
    const renderEstructura = () => {
        wrapper.innerHTML = "";
        barElements.length = 0;
        labelElements.length = 0;
        wrapper.style.gridTemplateColumns = `repeat(${Math.max(currentDatos.length, 1)}, 1fr)`;
        currentDatos.forEach(crearBarra);
    };
    /**
     * Actualiza las etiquetas de las barras.
     */
    const actualizarLabels = () => {
        labelElements.forEach((el, i) => {
            const d = currentDatos[i];
            el.textContent = d?.etiqueta ?? String(d?.valor ?? "");
        });
    };
    /**
     * Calcula el valor máximo entre los datos actuales.
     * @returns Valor máximo.
     */
    const calcularMax = () => {
        const maxDato = Math.max(...currentDatos.map((d) => d.valor), 1);
        return maxDato;
    };
    /**
     * Resetea las alturas de las barras a 0%.
     */
    const resetHeights = () => {
        barElements.forEach((bar) => {
            bar.style.height = "0%";
        });
    };
    /**
     * Función de tick para la animación.
     */
    const tick = () => {
        const ahora = performance.now();
        const elapsed = ahora - startTime;
        const maxValor = calcularMax();
        let anyActive = false;
        barElements.forEach((bar, idx) => {
            const dato = currentDatos[idx];
            const offset = delayMs * idx;
            const restante = Math.max(duracionMs - offset, 1);
            const progreso = clamp01((elapsed - offset) / restante);
            const eased = easing(progreso);
            const porcentaje = (dato.valor / maxValor) * eased * 100;
            bar.style.height = `${porcentaje}%`;
            if (progreso < 1)
                anyActive = true;
        });
        if (anyActive) {
            rafId = requestAnimationFrame(tick);
        }
        else {
            rafId = null;
            options.onFin?.();
        }
    };
    /**
     * Inicia la animación del gráfico de barras.
     */
    const play = () => {
        stop();
        resetHeights();
        startTime = performance.now();
        rafId = requestAnimationFrame(tick);
    };
    /**
     * Detiene la animación del gráfico de barras.
     */
    const stop = () => {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    };
    /**
     * Resetea el gráfico a su estado inicial.
     */
    const reset = () => {
        stop();
        resetHeights();
    };
    /**
     * Actualiza los datos del gráfico.
     * @param datosNuevos - Nuevos datos para las barras.
     */
    const setDatos = (datosNuevos) => {
        currentDatos = [...datosNuevos];
        renderEstructura();
    };
    /**
     * Renderiza la estructura inicial.
     */
    renderEstructura();
    container.appendChild(wrapper);
    /**
     * Devuelve la API del gráfico de barras.
     */
    return {
        play,
        stop,
        reset,
        setDatos,
        getDatos: () => [...currentDatos],
    };
}
// Exports
export { crearGraficoBarras };
export const GraphicBars = {
    crearGraficoBarras,
};
export default GraphicBars;
