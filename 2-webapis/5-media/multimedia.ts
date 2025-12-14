/**
 * Reproduce el elemento multimedia.
 * @param media - Elemento de audio o vídeo.
 */
async function reproducir(media: HTMLMediaElement): Promise<void> {
	await media.play();
}

/**
 * Pausa la reproducción.
 * @param media - Elemento de audio o vídeo.
 */
function pausar(media: HTMLMediaElement): void {
	media.pause();
}

/**
 * Alterna entre reproducir y pausar.
 * @param media - Elemento de audio o vídeo.
 */
async function alternarReproduccion(media: HTMLMediaElement): Promise<void> {
	if (media.paused) {
		await reproducir(media);
	} else {
		pausar(media);
	}
}

/**
 * Avanza o retrocede en segundos.
 * @param media - Elemento multimedia.
 * @param seconds - Segundos a desplazar (positivo avanza, negativo retrocede).
 */
function desplazarTiempo(media: HTMLMediaElement, seconds: number): void {
	const nextTime = media.currentTime + seconds;
	const duration = Number.isFinite(media.duration) ? media.duration : Infinity;
	media.currentTime = Math.max(0, Math.min(nextTime, duration));
}

/**
 * Establece el volumen entre 0 y 1.
 * @param media - Elemento multimedia.
 * @param volume - Valor entre 0 y 1.
 */
function fijarVolumen(media: HTMLMediaElement, volume: number): void {
	const clamped = Math.max(0, Math.min(volume, 1));
	media.volume = clamped;
}

/**
 * Ajusta el volumen sumando un delta.
 * @param media - Elemento multimedia.
 * @param delta - Delta de volumen (p. ej. 0.1 = +10%).
 */
function ajustarVolumen(media: HTMLMediaElement, delta: number): void {
	fijarVolumen(media, media.volume + delta);
}

type OpcionesVinculacion = {
	media: HTMLMediaElement;
	btnPlay?: HTMLElement | null;
	btnPause?: HTMLElement | null;
	btnToggle?: HTMLElement | null;
	btnForward?: HTMLElement | null;
	btnBackward?: HTMLElement | null;
	btnVolUp?: HTMLElement | null;
	btnVolDown?: HTMLElement | null;
	stepSeconds?: number; // por defecto 5s
	volumeStep?: number; // por defecto 0.1 (10%)
	onStateChange?: (media: HTMLMediaElement) => void;
};

/**
 * Vincula botones de control a un elemento multimedia.
 * @param options - Configuración de botones y pasos. 
 */
function vincularControles(options: OpcionesVinculacion): void {
	const {
		media,
		btnPlay,
		btnPause,
		btnToggle,
		btnForward,
		btnBackward,
		btnVolUp,
		btnVolDown,
		stepSeconds = 5,
		volumeStep = 0.1,
		onStateChange,
	} = options;

	if (btnPlay) {
		btnPlay.addEventListener("click", () => reproducir(media).catch(console.error));
	}

	if (btnPause) {
		btnPause.addEventListener("click", () => pausar(media));
	}

	if (btnToggle) {
		btnToggle.addEventListener("click", () => alternarReproduccion(media).catch(console.error));
	}

	if (btnForward) {
		btnForward.addEventListener("click", () => desplazarTiempo(media, stepSeconds));
	}

	if (btnBackward) {
		btnBackward.addEventListener("click", () => desplazarTiempo(media, -stepSeconds));
	}

	if (btnVolUp) {
		btnVolUp.addEventListener("click", () => ajustarVolumen(media, volumeStep));
	}

	if (btnVolDown) {
		btnVolDown.addEventListener("click", () => ajustarVolumen(media, -volumeStep));
	}

	if (onStateChange) {
		media.addEventListener("play", () => onStateChange(media));
		media.addEventListener("pause", () => onStateChange(media));
		media.addEventListener("volumechange", () => onStateChange(media));
		media.addEventListener("timeupdate", () => onStateChange(media));
	}
}

// Exports

export { reproducir, pausar, alternarReproduccion, desplazarTiempo, fijarVolumen, ajustarVolumen, vincularControles };

export const Multimedia = {
	reproducir,
	pausar,
	alternarReproduccion,
	desplazarTiempo,
	fijarVolumen,
	ajustarVolumen,
	vincularControles
} as const;

export default Multimedia;
