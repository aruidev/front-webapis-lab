import Svg from "./svg.js";

// Crea o reutiliza un <svg> en el DOM
const svg = (document.getElementById("svg-element") as unknown as SVGSVGElement) ?? (() => {
	const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	el.id = "svg-elementº";
	el.setAttribute("width", "600");
	el.setAttribute("height", "400");
	el.setAttribute("viewBox", "0 0 600 400");
	el.style.border = "1px solid #ccc";
	document.body.appendChild(el);
	return el;
})();

// Línea
const line = Svg.crearLinia(50, 50, 250, 120, { stroke: "#1e88e5", strokeWidth: 4 });
// Rectángulo
const rect = Svg.crearRect(300, 60, 120, 80, { fill: "#e3f2fd", stroke: "#1976d2", strokeWidth: 3, rx: 6, ry: 6 });
// Círculo
const circle = Svg.crearCercle(150, 250, 50, { fill: "#ffe0b2", stroke: "#f57c00", strokeWidth: 3 });
// Elipse
const ellipse = Svg.crearElipse(420, 260, 70, 40, { fill: "#f3e5f5", stroke: "#8e24aa", strokeWidth: 3 });
// Polígono
const polygon = Svg.crearPoligon([
	[500, 300],
	[560, 340],
	[540, 380],
	[460, 380],
	[440, 340]
], { fill: "#c8e6c9", stroke: "#2e7d32", strokeWidth: 3 });
// Texto
const text = Svg.crearText(80, 370, "Hola SVG!", { fontSize: 20, fill: "#333" });

// Añadir todo al SVG
svg.append(line, rect, circle, ellipse, polygon, text);
