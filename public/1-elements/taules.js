import { Elements } from "./elements.js";
/**
 * Elimina n filas a partir de una posición 0-based.
 * @param taula - Tabla objetivo.
 * @param n - Número de filas a borrar.
 * @param posicio - Posición inicial (0-based).
 */
function esborrarFiles(taula, n = 1, posicio = 0) {
    const start = Math.max(posicio, 0);
    for (let i = 0; i < n && start < taula.rows.length; i++) {
        taula.deleteRow(start);
    }
}
/**
 * Elimina n columnas a partir de una posición 0-based.
 * @param taula - Tabla objetivo.
 * @param n - Número de columnas a borrar.
 * @param posicio - Posición inicial (0-based).
 */
function esborrarColumnes(taula, n = 1, posicio = 0) {
    const start = Math.max(posicio, 0);
    for (const row of Array.from(taula.rows)) {
        for (let i = 0; i < n && start < row.cells.length; i++) {
            row.deleteCell(start);
        }
    }
}
/**
 * Rellena una casilla concreta (0-based) con texto.
 * @param taula - Tabla objetivo.
 * @param fila - Índice de fila (0-based).
 * @param columna - Índice de columna (0-based).
 * @param contingut - Texto a insertar.
 */
function omplirCasella(taula, fila, columna, contingut) {
    const row = taula.rows[fila];
    if (!row)
        return;
    const cell = row.cells[columna];
    if (!cell)
        return;
    cell.textContent = contingut;
}
/**
 * Rellena la tabla con una matriz de datos. Solo escribe donde hay filas/columnas existentes.
 * @param taula - Tabla objetivo.
 * @param dades - Matriz de datos [fila][columna].
 */
function omplir(taula, dades) {
    for (let i = 0; i < taula.rows.length; i++) {
        const rowData = dades?.[i];
        if (!rowData)
            continue;
        const row = taula.rows[i];
        for (let j = 0; j < row.cells.length; j++) {
            const value = rowData[j];
            if (value === undefined)
                continue;
            row.cells[j].textContent = String(value);
        }
    }
}
/**
 * Crea una tabla con número fijo de filas y columnas, aplica atributos y rellena datos iniciales.
 * @param files - Número de filas.
 * @param columnes - Número de columnas.
 * @param atributs - Atributos HTML a aplicar a la tabla.
 * @param dades - Matriz opcional de datos [fila][columna] para rellenar.
 * @returns La tabla creada.
 */
function crearTaula(files, columnes, atributs = {}, dades = []) {
    const taula = document.createElement("table");
    Elements.importarAtributs(taula, atributs);
    for (let i = 0; i < files; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < columnes; j++) {
            const value = dades?.[i]?.[j];
            const td = Elements.crearElement("td", undefined, value !== undefined ? String(value) : "");
            tr.appendChild(td);
        }
        taula.appendChild(tr);
    }
    return taula;
}
/**
 * Desplaza todas las columnas de la tabla una posición a la izquierda (la primera columna va al final).
 * @param taula - Tabla objetivo.
 */
function MoureColumnesAnterior(taula) {
    for (const row of Array.from(taula.rows)) {
        if (row.cells.length > 0) {
            const firstCell = row.cells[0];
            row.removeChild(firstCell);
            row.appendChild(firstCell);
        }
    }
}
/**
 * Desplaza todas las columnas de la tabla una posición a la derecha (la última columna va al inicio).
 * @param taula - Tabla objetivo.
 */
function MoureColumnesSeguent(taula) {
    for (const row of Array.from(taula.rows)) {
        if (row.cells.length > 0) {
            const lastCell = row.cells[row.cells.length - 1];
            row.removeChild(lastCell);
            row.insertBefore(lastCell, row.cells[0]);
        }
    }
}
// Exports 
export { esborrarFiles, esborrarColumnes, omplirCasella, omplir, crearTaula, MoureColumnesAnterior, MoureColumnesSeguent };
export const Taules = {
    esborrarFiles,
    esborrarColumnes,
    omplirCasella,
    omplir,
    crearTaula,
    MoureColumnesAnterior,
    MoureColumnesSeguent
};
