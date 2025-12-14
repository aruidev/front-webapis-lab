import { Taules } from "./taules.js";
const myTable = Taules.crearTaula(5, 5, { id: "myTable", border: "1", style: "border-collapse: collapse;" });
const output = document.getElementById("output");
if (output) {
    output.appendChild(myTable);
}
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
Taules.omplirCasella(myTable, 0, 4, "<");
Taules.omplirCasella(myTable, 1, 3, "<");
Taules.omplirCasella(myTable, 2, 2, "<");
Taules.omplirCasella(myTable, 3, 1, "<");
Taules.omplirCasella(myTable, 4, 0, "<");
prevBtn.addEventListener("click", () => {
    Taules.MoureColumnesAnterior(myTable);
});
nextBtn.addEventListener("click", () => {
    Taules.MoureColumnesSeguent(myTable);
});
