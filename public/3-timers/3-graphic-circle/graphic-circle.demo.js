import GraphicCircle from "./graphic-circle.js";
const container = document.getElementById("circle-container");
const btnPlay = document.getElementById("circle-play");
const btnReset = document.getElementById("circle-reset");
const btnShuffle = document.getElementById("circle-shuffle");
const datosBase = [
    { valor: 25, etiqueta: "A", color: "#3b82f6" },
    { valor: 35, etiqueta: "B", color: "#f59e0b" },
    { valor: 20, etiqueta: "C", color: "#22c55e" },
    { valor: 20, etiqueta: "D", color: "#a855f7" },
];
const coloresAleatorios = ["#e11d48", "#0ea5e9", "#f59e42", "#10b981", "#6366f1", "#f43f5e", "#fbbf24"];
const crearDatasetAleatorio = () => Array.from({ length: 5 }, (_, i) => ({
    valor: Math.floor(Math.random() * 40) + 10,
    etiqueta: `Slice ${i + 1}`,
    color: coloresAleatorios[i % coloresAleatorios.length],
}));
if (container) {
    let currentDatos = [...datosBase];
    const chart = GraphicCircle.crearGraficoPastel(container, currentDatos, {
        delayMs: 400,
        duracionMs: 2200,
        onFin: () => console.info("Animación de pastel completada"),
    });
    btnPlay?.addEventListener("click", () => {
        chart.setDatos(currentDatos);
        chart.play();
    });
    btnReset?.addEventListener("click", () => {
        chart.reset();
    });
    btnShuffle?.addEventListener("click", () => {
        currentDatos = crearDatasetAleatorio();
        chart.setDatos(currentDatos);
        chart.play();
    });
}
else {
    console.warn("graphic-circle.demo: no se encontró el contenedor #circle-container");
}
