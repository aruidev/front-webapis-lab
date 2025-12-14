import Cronometro from "./crono.js";
// Referencias del DOM (ajusta los ids a tu HTML)
const display = document.getElementById("crono-display");
const marcasList = document.getElementById("crono-marcas");
const btnStart = document.getElementById("crono-start");
const btnPause = document.getElementById("crono-pause");
const btnReset = document.getElementById("crono-reset");
const crono = Cronometro.crearCronometro({
    tickMs: 100,
    onTick: (_ms, formatted) => {
        if (display)
            display.textContent = formatted;
    },
    onStateChange: (state) => {
        // Opcional: reflejar estado en data-attr o clases
        if (display)
            display.setAttribute("data-state", state);
    },
    onMarca: (_ms, formatted, marcas) => {
        if (!marcasList)
            return;
        marcasList.innerHTML = "";
        for (const m of marcas) {
            const li = document.createElement("li");
            li.textContent = m;
            marcasList.appendChild(li);
        }
    }
});
btnStart?.addEventListener("click", () => crono.start());
btnPause?.addEventListener("click", () => crono.pause());
btnReset?.addEventListener("click", () => crono.reset());
