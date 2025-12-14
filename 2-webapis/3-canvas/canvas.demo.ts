// Create and add a canvas to the body
import Canvas from "./canvas.js";

// Obtén o crea el canvas de demostración
const canvas = (document.getElementById("canvas") as HTMLCanvasElement) ?? (() => {
    const c = document.createElement("canvas");
    c.id = "canvas";
    c.width = 640;
    c.height = 400;
    c.style.border = "1px solid black";
    document.body.appendChild(c);
    return c;
})();

const context = canvas.getContext("2d");

if (context) {
    // Líneas conectadas
    Canvas.drawLines(context, [
        [50, 50],
        [150, 80],
        [200, 30],
        [300, 120]
    ], 3, "#4a90e2");

    // Polígono
    Canvas.drawPolygon(context, [
        [400, 50],
        [500, 80],
        [550, 30],
        [600, 120]
    ], 2, "#e24a4a", "#f0f8ff");

    // Rectángulo
    Canvas.drawRect(context, 50, 200, 120, 60, 4, "#333", "#aaffaa");

    // Círculo
    Canvas.drawCircle(context, 250, 250, 40, 3, "#ff9900", "#fff0aa");

    // Arco / sector
    Canvas.drawArc(context, 400, 250, 50, 30, 270, 2, "#0099ff", "rgba(0,153,255,0.3)");

    // Texto
    Canvas.drawText(context, "Hola Canvas!", 320, 380, "bold 24px Verdana", 1, "#222", "#4a90e2");
}
