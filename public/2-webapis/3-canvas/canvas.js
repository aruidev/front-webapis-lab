/**
 * Traza líneas conectadas entre una lista de puntos.
 * @param context - Contexto 2D del canvas.
 * @param points - Array de puntos [x, y] en orden.
 * @param lineWidth - Grosor del trazo.
 * @param strokeStyle - Color del trazo.
 */
function drawLines(context, points, lineWidth = 2, strokeStyle = "#000") {
    if (points.length < 2)
        return;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i][0], points[i][1]);
    }
    context.stroke();
}
/**
 * Dibuja y/o rellena un polígono cerrado a partir de puntos.
 * @param context - Contexto 2D del canvas.
 * @param points - Puntos en orden.
 * @param lineWidth - Grosor del trazo.
 * @param strokeStyle - Color del trazo.
 * @param fillStyle - Color de relleno opcional.
 */
function drawPolygon(context, points, lineWidth = 2, strokeStyle = "#000", fillStyle) {
    if (points.length < 2)
        return;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    if (fillStyle)
        context.fillStyle = fillStyle;
    context.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        context.lineTo(points[i][0], points[i][1]);
    }
    context.closePath();
    if (fillStyle)
        context.fill();
    context.stroke();
}
/**
 * Dibuja y/o rellena un rectángulo.
 * @param context - Contexto 2D del canvas.
 * @param x - Coordenada x.
 * @param y - Coordenada y.
 * @param width - Ancho.
 * @param height - Alto.
 * @param lineWidth - Grosor del trazo.
 * @param strokeStyle - Color del trazo.
 * @param fillStyle - Color de relleno opcional.
 */
function drawRect(context, x, y, width, height, lineWidth = 2, strokeStyle = "#000", fillStyle) {
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    if (fillStyle) {
        context.fillStyle = fillStyle;
        context.fillRect(x, y, width, height);
    }
    context.strokeRect(x, y, width, height);
}
/**
 * Dibuja y/o rellena un círculo.
 * @param context - Contexto 2D del canvas.
 * @param centerX - Centro X.
 * @param centerY - Centro Y.
 * @param radius - Radio.
 * @param lineWidth - Grosor del trazo.
 * @param strokeStyle - Color del trazo.
 * @param fillStyle - Color de relleno opcional.
 */
function drawCircle(context, centerX, centerY, radius, lineWidth = 2, strokeStyle = "#000", fillStyle) {
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    if (fillStyle)
        context.fillStyle = fillStyle;
    if (fillStyle)
        context.fill();
    context.stroke();
}
/**
 * Dibuja y/o rellena un sector (arco) de circunferencia.
 * @param context - Contexto 2D del canvas.
 * @param centerX - Centro X.
 * @param centerY - Centro Y.
 * @param radius - Radio.
 * @param startAngleDeg - Ángulo inicial en grados.
 * @param endAngleDeg - Ángulo final en grados.
 * @param lineWidth - Grosor del trazo.
 * @param strokeStyle - Color del trazo.
 * @param fillStyle - Color de relleno opcional.
 */
function drawArc(context, centerX, centerY, radius, startAngleDeg, endAngleDeg, lineWidth = 2, strokeStyle = "#000", fillStyle) {
    const startRad = startAngleDeg * (Math.PI / 180);
    const endRad = endAngleDeg * (Math.PI / 180);
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, startRad, endRad);
    context.closePath();
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    if (fillStyle)
        context.fillStyle = fillStyle;
    if (fillStyle)
        context.fill();
    context.stroke();
}
/**
 * Dibuja y/o rellena texto.
 * @param context - Contexto 2D del canvas.
 * @param text - Texto a dibujar.
 * @param x - Coordenada x.
 * @param y - Coordenada y.
 * @param font - Fuente CSS (ej. "16px Arial").
 * @param lineWidth - Grosor del trazo.
 * @param strokeStyle - Color del trazo.
 * @param fillStyle - Color de relleno opcional.
 */
function drawText(context, text, x, y, font = "16px Arial", lineWidth = 1, strokeStyle = "#000", fillStyle) {
    context.font = font;
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    if (fillStyle) {
        context.fillStyle = fillStyle;
        context.fillText(text, x, y);
    }
    context.strokeText(text, x, y);
}
// Exports
export { drawLines, drawPolygon, drawRect, drawCircle, drawArc, drawText };
export const Canvas = {
    drawLines,
    drawPolygon,
    drawRect,
    drawCircle,
    drawArc,
    drawText
};
export default Canvas;
