import Media from "./media.js";

// Referencias del DOM (ajusta los ids a tu HTML)
const videoEl = document.getElementById("video") as HTMLVideoElement | null;
const canvasEl = document.getElementById("canvas") as HTMLCanvasElement | null;
const audioEl = document.getElementById("audio") as HTMLAudioElement | null;
const btnStart = document.getElementById("start-cam") as HTMLButtonElement | null;
const btnPhoto = document.getElementById("take-photo") as HTMLButtonElement | null;
const btnRecStart = document.getElementById("rec-start") as HTMLButtonElement | null;
const btnRecStop = document.getElementById("rec-stop") as HTMLButtonElement | null;
const sliderBrillo = document.getElementById("brillo") as HTMLInputElement | null;
const devicesList = document.getElementById("devices") as HTMLUListElement | null;

let stream: MediaStream | null = null;
let grabador: MediaRecorder | null = null;
let partes: Blob[] = [];

// Iniciar cámara
btnStart?.addEventListener("click", async () => {
	if (!videoEl) return;
	try {
		stream = await Media.iniciarVideo(videoEl, { video: true, audio: true });
	} catch (err) {
		console.error("No se pudo iniciar el video:", err);
	}
});

// Ajustar brillo
sliderBrillo?.addEventListener("input", async (ev) => {
	if (!stream) return;
	const valor = Number((ev.target as HTMLInputElement).value);
	try {
		await Media.setBrillo(stream, valor);
	} catch (err) {
		console.warn("No se pudo ajustar el brillo:", err);
	}
});

// Tomar foto
btnPhoto?.addEventListener("click", () => {
	if (!videoEl || !canvasEl) return;
	Media.capturarFoto(videoEl, canvasEl, "captura.jpg", 0.95);
});

// Grabar audio desde el stream actual
btnRecStart?.addEventListener("click", () => {
	if (!stream) return;
	try {
		const rec = Media.crearGrabador(stream, "audio/webm");
		grabador = rec.grabador;
		partes = rec.partes;
		Media.iniciarGrabacion(grabador);
	} catch (err) {
		console.error("No se pudo iniciar la grabación:", err);
	}
});

btnRecStop?.addEventListener("click", async () => {
	if (!grabador || !audioEl) return;
	try {
		const blob = await Media.detenerGrabacion(grabador, partes);
		Media.reproducirBlobAudio(blob, audioEl);
	} catch (err) {
		console.error("Error al detener la grabación:", err);
	}
});

// Listar dispositivos
async function cargarDispositivos() {
	if (!devicesList) return;
	try {
		const dispositivos = await Media.listarDispositivos();
		devicesList.innerHTML = "";
		dispositivos.forEach((d) => {
			const li = document.createElement("li");
			li.textContent = `${d.kind}: ${d.label || "(sin nombre)"}`;
			devicesList.appendChild(li);
		});
	} catch (err) {
		console.error("No se pudieron listar los dispositivos:", err);
	}
}

// Cargar dispositivos al inicio (puede requerir permiso de mic/cámara para mostrar nombres)
cargarDispositivos();
