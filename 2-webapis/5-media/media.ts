/**
 * Lista los dispositivos de audio/vídeo disponibles.
 * @returns Array de dispositivos.
 */
async function listarDispositivos(): Promise<MediaDeviceInfo[]> {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices;
}

/**
 * Inicia la captura de vídeo (y opcionalmente audio) y la asigna a un <video>.
 * @param videoEl - Elemento de vídeo destino.
 * @param constraints - Restricciones; por defecto solo vídeo.
 * @returns El MediaStream obtenido.
 */
async function iniciarVideo(
  videoEl: HTMLVideoElement,
  constraints: MediaStreamConstraints = { video: true, audio: false }
): Promise<MediaStream> {
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  videoEl.srcObject = stream;
  return stream;
}

/**
 * Devuelve la primera pista de vídeo del stream.
 * @param stream - MediaStream activo.
 * @returns La pista de vídeo o null si no existe.
 */
function obtenerPistaVideo(stream: MediaStream): MediaStreamTrack | null {
  return stream.getVideoTracks()[0] ?? null;
}

/**
 * Ajusta el brillo de la pista de vídeo (si el dispositivo lo soporta).
 * @param stream - MediaStream con pista de vídeo.
 * @param brillo - Valor de brillo (típicamente 0-255).
 */
async function setBrillo(stream: MediaStream, brillo: number): Promise<void> {
  const track = obtenerPistaVideo(stream);
  if (!track) throw new Error("No hay pista de vídeo disponible");
  await track.applyConstraints({ advanced: [{ brightness: brillo }] } as unknown as MediaTrackConstraints);
}

/**
 * Restablece el brillo y opcionalmente sincroniza un input tipo slider.
 * @param stream - MediaStream con pista de vídeo.
 * @param brilloPorDefecto - Valor a aplicar tras reset (por defecto 128).
 * @param slider - Input range opcional a sincronizar.
 */
async function resetBrillo(
  stream: MediaStream,
  brilloPorDefecto = 128,
  slider?: HTMLInputElement
): Promise<void> {
  const track = obtenerPistaVideo(stream);
  if (!track) return;
  await track.applyConstraints({});
  await setBrillo(stream, brilloPorDefecto);
  if (slider) slider.value = String(brilloPorDefecto);
}

/**
 * Descarga el contenido de un canvas como JPEG.
 * @param filename - Nombre de archivo destino.
 * @param canvas - Canvas de origen.
 * @param calidad - Calidad JPEG (0-1), por defecto 0.95.
 */
function descargarCanvas(filename: string, canvas: HTMLCanvasElement, calidad = 0.95) {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/jpeg", calidad);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

/**
 * Captura un fotograma del vídeo a un canvas y lo descarga como imagen.
 * @param video - Elemento de vídeo de origen.
 * @param canvas - Canvas destino.
 * @param filename - Nombre del archivo resultante.
 * @param calidad - Calidad JPEG.
 */
function capturarFoto(
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  filename = "foto.jpg",
  calidad = 0.95
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  descargarCanvas(filename, canvas, calidad);
}

/**
 * Crea un MediaRecorder y acumula sus partes de datos.
 * @param stream - MediaStream de audio/vídeo.
 * @param mimeType - MIME deseado (por defecto audio/webm).
 * @returns El grabador y el array donde se guardan los fragmentos.
 */
function crearGrabador(
  stream: MediaStream,
  mimeType = "audio/webm"
): { grabador: MediaRecorder; partes: Blob[] } {
  if (!MediaRecorder.isTypeSupported(mimeType)) {
    throw new Error(`Tipo MIME no soportado: ${mimeType}`);
  }
  const partes: Blob[] = [];
  const grabador = new MediaRecorder(stream, { mimeType });
  grabador.addEventListener("dataavailable", (ev: BlobEvent) => {
    if (ev.data && ev.data.size > 0) partes.push(ev.data);
  });
  return { grabador, partes };
}

/**
 * Inicia la grabación (ya configurada con crearGrabador).
 * @param grabador - MediaRecorder listo para grabar.
 */
function iniciarGrabacion(grabador: MediaRecorder) {
  grabador.start();
}

/**
 * Detiene la grabación y devuelve el Blob resultante.
 * @param grabador - MediaRecorder activo.
 * @param partes - Fragmentos recogidos durante la grabación.
 * @returns Blob con el contenido grabado.
 */
function detenerGrabacion(grabador: MediaRecorder, partes: Blob[]): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const onStop = () => {
      grabador.removeEventListener("stop", onStop);
      grabador.removeEventListener("error", onError);
      resolve(new Blob(partes, { type: grabador.mimeType }));
    };
    const onError = (ev: Event) => {
      grabador.removeEventListener("stop", onStop);
      grabador.removeEventListener("error", onError);
      reject(ev);
    };
    grabador.addEventListener("stop", onStop);
    grabador.addEventListener("error", onError);
    grabador.stop();
  });
}

/**
 * Reproduce un Blob de audio en un <audio>.
 * @param blob - Blob a reproducir.
 * @param audioEl - Elemento de audio destino.
 */
function reproducirBlobAudio(blob: Blob, audioEl: HTMLAudioElement) {
  const url = URL.createObjectURL(blob);
  audioEl.src = url;
  audioEl.play().catch(() => {});
  audioEl.addEventListener(
    "ended",
    () => {
      URL.revokeObjectURL(url);
    },
    { once: true }
  );
}

// Exports

export {
  listarDispositivos,
  iniciarVideo,
  obtenerPistaVideo,
  setBrillo,
  resetBrillo,
  descargarCanvas,
  capturarFoto,
  crearGrabador,
  iniciarGrabacion,
  detenerGrabacion,
  reproducirBlobAudio,
};

export const Media = {
  listarDispositivos,
  iniciarVideo,
  obtenerPistaVideo,
  setBrillo,
  resetBrillo,
  descargarCanvas,
  capturarFoto,
  crearGrabador,
  iniciarGrabacion,
  detenerGrabacion,
  reproducirBlobAudio,
} as const;

export default Media;