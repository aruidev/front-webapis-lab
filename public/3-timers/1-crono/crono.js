/**
 * Formatea milisegundos a "MM:SS.D" (minutos, segundos, décimas).
 * @param ms - Tiempo en milisegundos.
 * @returns Tiempo formateado en "MM:SS.D".
 */
function formatearTiempo(ms) {
    const totalDecimas = Math.floor(ms / 100);
    const decimas = totalDecimas % 10;
    const totalSegundos = Math.floor(totalDecimas / 10);
    const segundos = totalSegundos % 60;
    const minutos = Math.floor(totalSegundos / 60);
    const mm = minutos.toString().padStart(2, "0");
    const ss = segundos.toString().padStart(2, "0");
    return `${mm}:${ss}.${decimas}`;
}
/**
 * Crea un cronómetro con estado (stop, pause, run) y callbacks opcionales.
 * @param options - Opciones de configuración.
 * @returns API del cronómetro.
 */
function crearCronometro(options = {}) {
    const { tickMs = 100, onTick, onStateChange, onMarca } = options;
    let estado = "stop";
    let inicioMs = 0; // timestamp (performance.now) cuando se arranca
    let acumuladoMs = 0; // tiempo acumulado cuando no está corriendo
    let marcas = [];
    let timer = null;
    /**
     * Limpia el timer si existe.
     */
    const clearTimer = () => {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    };
    /**
     * Función llamada en cada tick para actualizar el tiempo.
     */
    const tick = () => {
        const ms = getElapsedMs();
        onTick?.(ms, formatearTiempo(ms));
    };
    /**
     * Función para cambiar el estado del cronómetro.
     * @param nuevo - Nuevo estado a establecer.
     */
    const setEstado = (nuevo) => {
        if (estado !== nuevo) {
            estado = nuevo;
            onStateChange?.(estado);
        }
    };
    /**
     * Función para obtener el tiempo transcurrido en ms.
     * @returns - Tiempo transcurrido en ms.
     */
    const getElapsedMs = () => {
        if (estado === "run") {
            return acumuladoMs + (performance.now() - inicioMs);
        }
        return acumuladoMs;
    };
    /**
     * Función para iniciar o reanudar el cronómetro.
     */
    const start = () => {
        if (estado === "run") {
            // Marca intermedia
            const ms = getElapsedMs();
            const f = formatearTiempo(ms);
            marcas = [...marcas, f];
            onMarca?.(ms, f, marcas);
            return;
        }
        // reanudar desde stop o pause
        inicioMs = performance.now();
        setEstado("run");
        clearTimer();
        timer = window.setInterval(tick, tickMs);
        tick();
    };
    /**
     * Función para pausar el cronómetro
     */
    const pause = () => {
        if (estado !== "run")
            return;
        acumuladoMs = getElapsedMs();
        clearTimer();
        setEstado("pause");
        tick();
    };
    /**
     * Función para resetear el cronómetro
     */
    const reset = () => {
        clearTimer();
        acumuladoMs = 0;
        inicioMs = 0;
        marcas = [];
        setEstado("stop");
        onMarca?.(0, formatearTiempo(0), marcas);
        tick();
    };
    /**
     * Devuelve la API del cronómetro con sus métodos.
     * @return API del cronómetro.
     */
    return {
        start,
        pause,
        reset,
        getState: () => estado,
        getElapsedMs,
        getMarcas: () => [...marcas],
    };
}
// Exports
export { crearCronometro, formatearTiempo };
export const Cronometro = {
    crearCronometro,
    formatearTiempo,
};
export default Cronometro;
