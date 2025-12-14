import Media from "./media.js";
// Referencias del DOM (ajusta los ids a tu HTML)
const videoEl = document.getElementById("video");
const canvasEl = document.getElementById("canvas");
const audioEl = document.getElementById("audio");
const btnStart = document.getElementById("start-cam");
const btnPhoto = document.getElementById("take-photo");
const btnRecStart = document.getElementById("rec-start");
const btnRecStop = document.getElementById("rec-stop");
const sliderBrillo = document.getElementById("brillo");
const devicesList = document.getElementById("devices");
let stream = null;
let grabador = null;
let partes = [];
// Iniciar cámara
btnStart?.addEventListener("click", async () => {
    if (!videoEl)
        return;
    try {
        stream = await Media.iniciarVideo(videoEl, { video: true, audio: true });
    }
    catch (err) {
        console.error("No se pudo iniciar el video:", err);
    }
});
// Ajustar brillo
sliderBrillo?.addEventListener("input", async (ev) => {
    if (!stream)
        return;
    const valor = Number(ev.target.value);
    try {
        await Media.setBrillo(stream, valor);
    }
    catch (err) {
        console.warn("No se pudo ajustar el brillo:", err);
    }
});
// Tomar foto
btnPhoto?.addEventListener("click", () => {
    if (!videoEl || !canvasEl)
        return;
    Media.capturarFoto(videoEl, canvasEl, "captura.jpg", 0.95);
});
// Grabar audio desde el stream actual
btnRecStart?.addEventListener("click", () => {
    if (!stream)
        return;
    try {
        const rec = Media.crearGrabador(stream, "audio/webm");
        grabador = rec.grabador;
        partes = rec.partes;
        Media.iniciarGrabacion(grabador);
    }
    catch (err) {
        console.error("No se pudo iniciar la grabación:", err);
    }
});
btnRecStop?.addEventListener("click", async () => {
    if (!grabador || !audioEl)
        return;
    try {
        const blob = await Media.detenerGrabacion(grabador, partes);
        Media.reproducirBlobAudio(blob, audioEl);
    }
    catch (err) {
        console.error("Error al detener la grabación:", err);
    }
});
// Listar dispositivos
async function cargarDispositivos() {
    if (!devicesList)
        return;
    try {
        const dispositivos = await Media.listarDispositivos();
        devicesList.innerHTML = "";
        dispositivos.forEach((d) => {
            const li = document.createElement("li");
            li.textContent = `${d.kind}: ${d.label || "(sin nombre)"}`;
            devicesList.appendChild(li);
        });
    }
    catch (err) {
        console.error("No se pudieron listar los dispositivos:", err);
    }
}
// Cargar dispositivos al inicio (puede requerir permiso de mic/cámara para mostrar nombres)
cargarDispositivos();
