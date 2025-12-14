const NS = "http://www.w3.org/2000/svg";
/**
 * Crea un elemento SVG genérico con atributos opcionales.
 * @param tag - Nombre de la etiqueta SVG.
 * @param attrs - Atributos a aplicar.
 */
function crear(tag, attrs = {}) {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (v !== undefined && v !== null)
            el.setAttribute(k, String(v));
    }
    return el;
}
/**
 * Crea una línea SVG.
 * @param x1 - Coordenada X del punto inicial.
 * @param y1 - Coordenada Y del punto inicial.
 * @param x2 - Coordenada X del punto final.
 * @param y2 - Coordenada Y del punto final.
 * @param options - Opciones adicionales (stroke, strokeWidth, etc.).
 */
function crearLinia(x1, y1, x2, y2, options = {}) {
    const line = crear("line", {
        x1, y1, x2, y2,
        stroke: options.stroke ?? "#333",
        "stroke-width": options.strokeWidth ?? 2
    });
    for (const [k, v] of Object.entries(options)) {
        if (k !== "stroke" && k !== "strokeWidth")
            line.setAttribute(k, String(v));
    }
    return line;
}
/**
 * Crea un texto SVG.
 * @param x - Coordenada X.
 * @param y - Coordenada Y.
 * @param content - Contenido del texto.
 * @param options - Opciones adicionales (fontSize, fill, etc.).
 */
function crearText(x, y, content, options = {}) {
    const text = crear("text", {
        x, y,
        "font-size": options.fontSize ?? 14,
        fill: options.fill ?? "#222"
    });
    text.textContent = content;
    for (const [k, v] of Object.entries(options)) {
        if (k !== "fontSize" && k !== "fill")
            text.setAttribute(k, String(v));
    }
    return text;
}
/**
 * Crea un rectángulo SVG.
 * @param x - Coordenada X.
 * @param y - Coordenada Y.
 * @param width - Ancho.
 * @param height - Alto.
 * @param options - Opciones adicionales (fill, stroke, strokeWidth, etc.).
 */
function crearRect(x, y, width, height, options = {}) {
    const rect = crear("rect", {
        x, y, width, height,
        fill: options.fill ?? "transparent",
        stroke: options.stroke ?? "#333",
        "stroke-width": options.strokeWidth ?? 2
    });
    for (const [k, v] of Object.entries(options)) {
        if (!["fill", "stroke", "strokeWidth"].includes(k))
            rect.setAttribute(k, String(v));
    }
    return rect;
}
/**
 * Crea un círculo SVG.
 * @param cx - Centro X.
 * @param cy - Centro Y.
 * @param r - Radio.
 * @param options - Opciones adicionales (fill, stroke, strokeWidth, etc.).
 */
function crearCercle(cx, cy, r, options = {}) {
    const circle = crear("circle", {
        cx, cy, r,
        fill: options.fill ?? "transparent",
        stroke: options.stroke ?? "#333",
        "stroke-width": options.strokeWidth ?? 2
    });
    for (const [k, v] of Object.entries(options)) {
        if (!["fill", "stroke", "strokeWidth"].includes(k))
            circle.setAttribute(k, String(v));
    }
    return circle;
}
/**
 * Crea una elipse SVG.
 * @param cx - Centro X.
 * @param cy - Centro Y.
 * @param rx - Radio X.
 * @param ry - Radio Y.
 * @param options - Opciones adicionales (fill, stroke, strokeWidth, etc.).
 */
function crearElipse(cx, cy, rx, ry, options = {}) {
    const ellipse = crear("ellipse", {
        cx, cy, rx, ry,
        fill: options.fill ?? "transparent",
        stroke: options.stroke ?? "#333",
        "stroke-width": options.strokeWidth ?? 2
    });
    for (const [k, v] of Object.entries(options)) {
        if (!["fill", "stroke", "strokeWidth"].includes(k))
            ellipse.setAttribute(k, String(v));
    }
    return ellipse;
}
/**
 * Crea un polígono SVG.
 * @param points - Array de puntos [[x1, y1], [x2, y2], ...].
 * @param options - Opciones adicionales (fill, stroke, strokeWidth, etc.).
 */
function crearPoligon(points, options = {}) {
    const pointsAttr = points.map(([x, y]) => `${x},${y}`).join(" ");
    const polygon = crear("polygon", {
        points: pointsAttr,
        fill: options.fill ?? "transparent",
        stroke: options.stroke ?? "#333",
        "stroke-width": options.strokeWidth ?? 2
    });
    for (const [k, v] of Object.entries(options)) {
        if (!["fill", "stroke", "strokeWidth"].includes(k))
            polygon.setAttribute(k, String(v));
    }
    return polygon;
}
/**
 * Crea un path SVG a partir de un string d.
 * @param d - String de comandos del path.
 * @param options - Opciones adicionales (fill, stroke, strokeWidth, etc.).
 */
function crearPath(d, options = {}) {
    const path = crear("path", {
        d,
        fill: options.fill ?? "transparent",
        stroke: options.stroke ?? "#333",
        "stroke-width": options.strokeWidth ?? 2
    });
    for (const [k, v] of Object.entries(options)) {
        if (!["fill", "stroke", "strokeWidth"].includes(k))
            path.setAttribute(k, String(v));
    }
    return path;
}
// Exports
export { crear, crearLinia, crearText, crearRect, crearCercle, crearElipse, crearPoligon, crearPath };
export const Svg = {
    crear,
    crearLinia,
    crearText,
    crearRect,
    crearCercle,
    crearElipse,
    crearPoligon,
    crearPath
};
export default Svg;
