import GraphicBars from "./graphic-bars.js";

const container = document.getElementById("bars-container") as HTMLElement | null;
const btnPlay = document.getElementById("bars-play") as HTMLButtonElement | null;
const btnReset = document.getElementById("bars-reset") as HTMLButtonElement | null;
const btnShuffle = document.getElementById("bars-shuffle") as HTMLButtonElement | null;

const datosBase = [
	{ valor: 30, etiqueta: "A", color: "linear-gradient(135deg, #3b82f6, #06b6d4)" },
	{ valor: 55, etiqueta: "B", color: "linear-gradient(135deg, #f59e0b, #f97316)" },
	{ valor: 80, etiqueta: "C", color: "linear-gradient(135deg, #22c55e, #16a34a)" },
	{ valor: 45, etiqueta: "D", color: "linear-gradient(135deg, #a855f7, #8b5cf6)" },
];

const crearDatasetAleatorio = () =>
	Array.from({ length: 5 }, (_, i) => ({
		valor: Math.floor(Math.random() * 90) + 10,
		etiqueta: `Item ${i + 1}`,
		color: "linear-gradient(135deg, #f55454ff, #aa3434ff)", // default color
	}));

if (container) {
	let currentDatos = [...datosBase];
	const chart = GraphicBars.crearGraficoBarras(container, currentDatos, {
		delayMs: 200,
		duracionMs: 600,
		onFin: () => console.info("Animación de barras completada"),
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
} else {
	console.warn("graphic-bars.demo: no se encontró el contenedor #bars-container");
}
