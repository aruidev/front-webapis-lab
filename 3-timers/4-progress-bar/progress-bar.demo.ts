import ProgressBar from "./progress-bar.js";

const container = document.getElementById("progress-container") as HTMLElement | null;
const btnStart = document.getElementById("pb-start") as HTMLButtonElement | null;
const btnReset = document.getElementById("pb-reset") as HTMLButtonElement | null;
const btnStep = document.getElementById("pb-step") as HTMLButtonElement | null;
const btnFull = document.getElementById("pb-full") as HTMLButtonElement | null;

if (container) {
	const bar = ProgressBar.crearBarraProgreso(container, {
		initial: 0,
		heightPx: 16,
		showLabel: true,
	});

	let current = 0;

	const setAndStore = (val: number, animate = true) => {
		current = Math.max(0, Math.min(100, val));
		bar.set(current, animate);
	};

	btnStart?.addEventListener("click", () => {
		current = 0;
		bar.reset();
		// Simula carga en 5 pasos
		const steps = [20, 40, 65, 85, 100];
		steps.forEach((value, idx) => {
			setTimeout(() => setAndStore(value), idx * 600);
		});
	});

	btnReset?.addEventListener("click", () => {
		current = 0;
		bar.reset();
	});

	btnStep?.addEventListener("click", () => {
		setAndStore(current + 10);
	});

	btnFull?.addEventListener("click", () => {
		setAndStore(100);
	});
} else {
	console.warn("progress-bar.demo: no se encontró el contenedor #progress-container");
}
