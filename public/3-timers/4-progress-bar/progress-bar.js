const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeLinear = (t) => t;
/**
 * Crea una barra de progreso sencilla (0-100) con animación opcional.
 * @param container - Elemento contenedor donde se insertará la barra de progreso.
 * @param options - Opciones de configuración de la barra de progreso.
 * @returns API para controlar la barra de progreso.
 */
function crearBarraProgreso(container, options = {}) {
    const heightPx = options.heightPx ?? 14;
    const animationMs = options.animationMs ?? 400;
    const easing = options.easing ?? easeLinear;
    const formatLabel = options.formatLabel ?? ((v) => `${Math.round(v)}%`);
    let current = clamp01((options.initial ?? 0) / 100) * 100;
    let rafId = null;
    let destroyed = false;
    const wrapper = document.createElement("div");
    wrapper.style.display = "grid";
    wrapper.style.gap = "6px";
    const track = document.createElement("div");
    track.style.position = "relative";
    track.style.width = "100%";
    track.style.height = `${heightPx}px`;
    track.style.background = options.background ?? "rgba(255,255,255,0.12)";
    track.style.borderRadius = `${heightPx / 2}px`;
    track.style.overflow = "hidden";
    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", "100");
    const fill = document.createElement("div");
    fill.style.position = "absolute";
    fill.style.left = "0";
    fill.style.top = "0";
    fill.style.height = "100%";
    fill.style.width = "0%";
    fill.style.background = options.fill ?? "linear-gradient(135deg, #22c55e, #16a34a)";
    fill.style.transition = "width 80ms linear";
    const label = document.createElement("span");
    label.style.fontSize = "13px";
    label.style.color = "#e2e8f0";
    label.style.fontVariantNumeric = "tabular-nums";
    if (!options.showLabel)
        label.style.display = "none";
    track.appendChild(fill);
    wrapper.append(track, label);
    container.appendChild(wrapper);
    /**
     * Renderiza la barra de progreso.
     * @param value - Valor objetivo (0-100).
     */
    const render = (value) => {
        const pct = clamp01(value / 100) * 100;
        current = pct;
        fill.style.width = `${pct}%`;
        track.setAttribute("aria-valuenow", pct.toFixed(0));
        if (options.showLabel)
            label.textContent = formatLabel(pct);
    };
    /**
     * Detiene la animación en curso.
     */
    const stopAnim = () => {
        if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    };
    /**
     * Anima la barra de progreso hasta el valor objetivo.
     * @param target - Valor objetivo (0-100).
     * @param duration - Duración de la animación en ms.
     */
    const animateTo = (target, duration) => {
        stopAnim();
        const start = current;
        const clampedTarget = clamp01(target / 100) * 100;
        const delta = clampedTarget - start;
        const dur = Math.max(duration, 0);
        if (dur === 0 || Math.abs(delta) < 0.001) {
            render(clampedTarget);
            return;
        }
        const t0 = performance.now();
        const step = () => {
            const t = performance.now();
            const p = clamp01((t - t0) / dur);
            const eased = easing(p);
            render(start + delta * eased);
            if (p < 1) {
                rafId = requestAnimationFrame(step);
            }
            else {
                rafId = null;
            }
        };
        rafId = requestAnimationFrame(step);
    };
    /**
     * Establece el valor de la barra de progreso.
     * @param valor - Valor objetivo (0-100).
     * @param animate - Indica si la actualización debe animarse.
     * @param customDurationMs - Duración personalizada de la animación en ms.
     * @returns objeto API (set, get, reset, destroy).
     */
    const set = (valor, animate = true, customDurationMs) => {
        if (destroyed)
            return;
        const dur = animate ? (customDurationMs ?? animationMs) : 0;
        animateTo(valor, dur);
    };
    /**
     * Devuelve el valor actual de la barra de progreso.
     * @returns Valor actual (0-100).
     */
    const get = () => current;
    /**
     * Resetea la barra de progreso al valor 0.
     */
    const reset = () => set(0, false);
    const destroy = () => {
        if (destroyed)
            return;
        stopAnim();
        wrapper.remove();
        destroyed = true;
    };
    // Render inicial
    render(current);
    /**
     * Devuelve la API de la barra de progreso (set, get, reset, destroy).
     */
    return { set, get, reset, destroy };
}
// Exports
export { crearBarraProgreso };
export const ProgressBar = {
    crearBarraProgreso,
};
export default ProgressBar;
