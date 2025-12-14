import Fullscreen from "./fullscreen.js";

// Referencias del DOM
const container = document.getElementById("fs-target") ?? document.documentElement;
const toggleBtn = document.getElementById("fs-toggle") as HTMLButtonElement | null;
const enterBtn = document.getElementById("fs-enter") as HTMLButtonElement | null;
const exitBtn = document.getElementById("fs-exit") as HTMLButtonElement | null;
const stateEl = document.getElementById("fs-state") as HTMLElement | null; // Elemento para mostrar estado (Fullscreen activo/inactivo)

// Sincronizar botón de alternancia
if (toggleBtn) {
	Fullscreen.vincularBotoCommutacio(toggleBtn, container, { enter: "Pantalla completa", exit: "Salir de pantalla completa" });
}

// Botones directos
enterBtn?.addEventListener("click", async () => {
		await Fullscreen.entrar(container);
		if (toggleBtn) Fullscreen.sincronitzarTextBoto(toggleBtn, { enter: "Pantalla completa", exit: "Salir de pantalla completa" });
});

exitBtn?.addEventListener("click", async () => {
		await Fullscreen.sortir();
		if (toggleBtn) Fullscreen.sincronitzarTextBoto(toggleBtn, { enter: "Pantalla completa", exit: "Salir de pantalla completa" });
});

// Mostrar estado en tiempo real
Fullscreen.enCanvi((el) => {
	if (stateEl) stateEl.textContent = el ? "Fullscreen activo" : "Fullscreen inactivo";
});
