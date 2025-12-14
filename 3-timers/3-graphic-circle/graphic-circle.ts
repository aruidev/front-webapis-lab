type PieDatum = {
	valor: number;
	etiqueta?: string;
	color?: string;
};

type PieOptions = {
	radio?: number; // radio del pastel en px
	delayMs?: number; // retardo entre sectores (por defecto 500ms)
	duracionMs?: number; // duración total de la animación (por defecto 2000ms)
	easing?: (t: number) => number; // easing opcional (t normalizado 0-1)
	onFin?: () => void; // callback al terminar
};

type PieApi = {
	play: () => void;
	stop: () => void;
	reset: () => void;
	setDatos: (datos: PieDatum[]) => void;
	getDatos: () => PieDatum[];
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeLinear = (t: number) => t;

const degToRad = (deg: number) => (deg * Math.PI) / 180;

const describeArc = (cx: number, cy: number, r: number, startDeg: number, endDeg: number) => {
	const startRad = degToRad(startDeg);
	const endRad = degToRad(endDeg);
	const x1 = cx + r * Math.cos(startRad);
	const y1 = cy + r * Math.sin(startRad);
	const x2 = cx + r * Math.cos(endRad);
	const y2 = cy + r * Math.sin(endRad);
	const largeArc = endDeg - startDeg > 180 ? 1 : 0;
	return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
};

/**
 * Crea un gráfico de pastel animado.
 * - Los sectores empiezan en 0° (sin área) y se animan hasta su ángulo final.
 * - El primer sector arranca de inmediato y los siguientes con un retardo configurable (delayMs).
 * - Todos finalizan al mismo tiempo (los últimos avanzan más rápido para alcanzar el final).
 * @param container - Elemento contenedor donde se insertará el gráfico.
 * @param datos - Array de datos para los sectores del pastel.
 * @param options - Opciones de configuración del gráfico.
 * @returns API para controlar el gráfico de pastel.
 */
function crearGraficoPastel(container: HTMLElement, datos: PieDatum[], options: PieOptions = {}): PieApi {
	const delayMs = options.delayMs ?? 500;
	const duracionMs = Math.max(options.duracionMs ?? 2000, delayMs * (Math.max(datos.length - 1, 0) + 1));
	const easing = options.easing ?? easeLinear;

	let rafId: number | null = null;
	let startTime = 0;
	let currentDatos: PieDatum[] = [...datos];

	const size = (options.radio ?? 140) * 2;
	const r = size / 2 - 4;
	const cx = size / 2;
	const cy = size / 2;

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", String(size));
	svg.setAttribute("height", String(size));
	svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
	svg.style.borderRadius = "12px";
	svg.style.background = "#0f172a";
	svg.style.border = "1px solid rgba(255,255,255,0.12)";

	const slices: { path: SVGPathElement; start: number; end: number; dato: PieDatum }[] = [];

    /**
     * Calcula los ángulos de inicio y fin de cada sector.
     * @returns Array de objetos con start y end en grados.
     */
	const calcularAngulos = () => {
		const total = currentDatos.reduce((acc, d) => acc + Math.max(d.valor, 0), 0) || 1;
		let cursor = -90; // iniciar arriba
		return currentDatos.map((d) => {
			const span = (Math.max(d.valor, 0) / total) * 360;
			const start = cursor;
			const end = cursor + span;
			cursor = end;
			return { start, end };
		});
	};

    /**
     * Renderiza la estructura inicial del gráfico.
     */
	const renderEstructura = () => {
		svg.innerHTML = "";
		slices.length = 0;
		const angulos = calcularAngulos();
		angulos.forEach((ang, i) => {
			const dato = currentDatos[i];
			const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
			path.setAttribute("fill", dato.color ?? "url(#grad)");
			path.setAttribute("stroke", "rgba(255,255,255,0.15)");
			path.setAttribute("stroke-width", "1");
			svg.appendChild(path);
			slices.push({ path, start: ang.start, end: ang.end, dato });
		});
	};

    /**
     * Resetea los sectores a su estado inicial (0°).
     */
	const resetShapes = () => {
		slices.forEach((s) => s.path.setAttribute("d", ""));
	};

    /**
     * Función de tick para la animación.
     */
	const tick = () => {
		const now = performance.now();
		const elapsed = now - startTime;
		let anyActive = false;

		slices.forEach((s, idx) => {
			const offset = delayMs * idx;
			const restante = Math.max(duracionMs - offset, 1);
			const progreso = clamp01((elapsed - offset) / restante);
			const eased = easing(progreso);
			const endActual = s.start + (s.end - s.start) * eased;
			if (progreso < 1) anyActive = true;
			s.path.setAttribute("d", describeArc(cx, cy, r, s.start, endActual));
			s.path.setAttribute("data-label", s.dato.etiqueta ?? String(s.dato.valor));
		});

		if (anyActive) {
			rafId = requestAnimationFrame(tick);
		} else {
			rafId = null;
			options.onFin?.();
		}
	};

    /**
     * Inicia la animación del gráfico de pastel.
     */
	const play = () => {
		stop();
		resetShapes();
		startTime = performance.now();
		rafId = requestAnimationFrame(tick);
	};

    /**
     * Detiene la animación del gráfico de pastel.
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
		resetShapes();
	};

    /**
     * Actualiza los datos del gráfico.
     * @param datosNuevos - Nuevos datos para los sectores.
     */
	const setDatos = (datosNuevos: PieDatum[]) => {
		currentDatos = [...datosNuevos];
		renderEstructura();
	};

    /**
     * Renderiza la estructura inicial.
     */
	renderEstructura();
	container.appendChild(svg);

    /**
     * Devuelve la API del gráfico de pastel.
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
export { crearGraficoPastel };

export const GraphicCircle = {
	crearGraficoPastel,
} as const;

export default GraphicCircle;
