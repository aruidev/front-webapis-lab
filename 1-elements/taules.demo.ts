import { Taules } from "./taules.js";

const taula = Taules.crearTaula(3, 3, { border: "1", style: "border-collapse: collapse;" }, [
    ["Nom", "Edat", "Ciutat"],
    ["Alice", 30, "Barcelona"],
    ["Bob", 25, "Madrid"]
]);

Taules.esborrarColumnes(taula, 1, 1); // Esborra la columna "Edat"
Taules.omplirCasella(taula, 0, 1, "Ciutat d'Origen"); // Canvia el text de la capçalera de la segona columna

document.getElementById("output")?.appendChild(taula);