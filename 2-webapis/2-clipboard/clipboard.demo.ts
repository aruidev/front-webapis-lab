import Clipboard from "./clipboard.js";

// Referencias del DOM
const copyBtn = document.getElementById("copy-btn") as HTMLButtonElement | null;
const pasteBtn = document.getElementById("paste-btn") as HTMLButtonElement | null;
const input = document.getElementById("input") as HTMLElement | null;
const output = document.getElementById("output") as HTMLElement | null;

if (copyBtn && input) {
	copyBtn.addEventListener("click", async () => {
		try {
			await Clipboard.copiarElement(input);
		} catch (err) {
			console.error("Error al copiar:", err);
			alert("Clipboard API no soportada o permiso denegado");
		}
	});
}

if (pasteBtn && output) {
	pasteBtn.addEventListener("click", async () => {
		try {
			const ok = await Clipboard.pegarHtmlA(output);
			if (!ok) {
				const text = await Clipboard.pegarText();
				const p = document.createElement("p");
				p.textContent = text;
				output.appendChild(p);
			}
		} catch (err) {
			console.error("Error al pegar:", err);
			alert("Clipboard API no soportada o permiso denegado");
		}
	});
}

// Opcional: si faltan elementos, muestra aviso en consola
if (!copyBtn || !pasteBtn || !input || !output) {
	console.warn("clipboard.demo: faltan elementos del DOM (#copy-btn, #paste-btn, #input, #output)");
}
