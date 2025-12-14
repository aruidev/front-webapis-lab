import Multimedia from "./multimedia.js";
// Referencias del DOM (ajusta los ids a tu HTML)
const video = document.getElementById("media");
const btnPlay = document.getElementById("play-btn");
const btnPause = document.getElementById("pause-btn");
const btnToggle = document.getElementById("toggle-btn");
const btnForward = document.getElementById("forward-btn");
const btnBackward = document.getElementById("backward-btn");
const btnVolUp = document.getElementById("volup-btn");
const btnVolDown = document.getElementById("voldown-btn");
const statusEl = document.getElementById("status");
if (video) {
    Multimedia.vincularControles({
        media: video,
        btnPlay,
        btnPause,
        btnToggle,
        btnForward,
        btnBackward,
        btnVolUp,
        btnVolDown,
        stepSeconds: 5,
        volumeStep: 0.1,
        onStateChange: (m) => {
            if (!statusEl)
                return;
            const estado = m.paused ? "Pausado" : "Reproduciendo";
            const tiempo = `${m.currentTime.toFixed(1)}s / ${Number.isFinite(m.duration) ? m.duration.toFixed(1) : "∞"}s`;
            const volumen = `${Math.round(m.volume * 100)}%`;
            statusEl.textContent = `${estado} | ${tiempo} | Vol: ${volumen}`;
        }
    });
}
else {
    console.warn("multimedia.demo: no se encontró el elemento video con id 'media'");
}
