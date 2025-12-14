const NS = "http://www.w3.org/2000/svg";
type SvgAttrs = { [key: string]: any };

/**
 * Crea un elemento SVG genérico con atributos opcionales.
 * @param tag - Nombre de la etiqueta SVG.
 * @param attrs - Atributos a aplicar.
 */
function crear(tag: string, attrs: SvgAttrs = {}): SVGElement {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) {
        if (v !== undefined && v !== null) el.setAttribute(k, String(v));
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
function crearLinia(
    x1: number, y1: number,
    x2: number, y2: number,
    options: { stroke?: string; strokeWidth?: number; [key: string]: any } = {}
): SVGLineElement {
    const line = crear("line", {
        x1, y1, x2, y2,
        stroke: options.stroke ?? "#333",
        "stroke-width": options.strokeWidth ?? 2
    }) as SVGLineElement;
    for (const [k, v] of Object.entries(options)) {
        if (k !== "stroke" && k !== "strokeWidth") line.setAttribute(k, String(v));
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
function crearText(
    x: number, y: number,
    content: string,
    options: { fontSize?: number; fill?: string; [key: string]: any } = {}
): SVGTextElement {
    const text = crear("text", {
        x, y,
        "font-size": options.fontSize ?? 14,
        fill: options.fill ?? "#222"
    }) as SVGTextElement;
    text.textContent = content;
    for (const [k, v] of Object.entries(options)) {
        if (k !== "fontSize" && k !== "fill") text.setAttribute(k, String(v));
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
function crearRect(
    x: number, y: number,
    width: number, height: number,
    options: { fill?: string; stroke?: string; strokeWidth?: number; [key: string]: any } = {}
): SVGRectElement {
    const rect = crear("rect", {
        x, y, width, height,
        fill: options.fill ?? "transparent",
        stroke: options.stroke ?? "#333",
        "stroke-width": options.strokeWidth ?? 2
    }) as SVGRectElement;
    for (const [k, v] of Object.entries(options)) {
        if (!["fill", "stroke", "strokeWidth"].includes(k)) rect.setAttribute(k, String(v));
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
function crearCercle(
    cx: number, cy: number,
    r: number,
    options: { fill?: string; stroke?: string; strokeWidth?: number; [key: string]: any } = {}
): SVGCircleElement {
    const circle = crear("circle", {
        cx, cy, r,
        fill: options.fill ?? "transparent",
        stroke: options.stroke ?? "#333",
        "stroke-width": options.strokeWidth ?? 2
    }) as SVGCircleElement;
    for (const [k, v] of Object.entries(options)) {
        if (!["fill", "stroke", "strokeWidth"].includes(k)) circle.setAttribute(k, String(v));
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
function crearElipse(
    cx: number, cy: number,
    rx: number, ry: number,
    options: { fill?: string; stroke?: string; strokeWidth?: number; [key: string]: any } = {}
): SVGEllipseElement {
    const ellipse = crear("ellipse", {
        cx, cy, rx, ry,
        fill: options.fill ?? "transparent",
        stroke: options.stroke ?? "#333",
        "stroke-width": options.strokeWidth ?? 2
    }) as SVGEllipseElement;
    for (const [k, v] of Object.entries(options)) {
        if (!["fill", "stroke", "strokeWidth"].includes(k)) ellipse.setAttribute(k, String(v));
    }
    return ellipse;
}

/**
 * Crea un polígono SVG.
 * @param points - Array de puntos [[x1, y1], [x2, y2], ...].
 * @param options - Opciones adicionales (fill, stroke, strokeWidth, etc.).
 */
function crearPoligon(
    points: Array<[number, number]>,
    options: { fill?: string; stroke?: string; strokeWidth?: number; [key: string]: any } = {}
): SVGPolygonElement {
    const pointsAttr = points.map(([x, y]) => `${x},${y}`).join(" ");
    const polygon = crear("polygon", {
        points: pointsAttr,
        fill: options.fill ?? "transparent",
        stroke: options.stroke ?? "#333",
        "stroke-width": options.strokeWidth ?? 2
    }) as SVGPolygonElement;
    for (const [k, v] of Object.entries(options)) {
        if (!["fill", "stroke", "strokeWidth"].includes(k)) polygon.setAttribute(k, String(v));
    }
    return polygon;
}

/**
 * Crea un path SVG a partir de un string d.
 * @param d - String de comandos del path.
 * @param options - Opciones adicionales (fill, stroke, strokeWidth, etc.).
 */
function crearPath(d: string, options: { fill?: string; stroke?: string; strokeWidth?: number; [key: string]: any } = {}): SVGPathElement {
    const path = crear("path", {
        d,
        fill: options.fill ?? "transparent",
        stroke: options.stroke ?? "#333",
        "stroke-width": options.strokeWidth ?? 2
    }) as SVGPathElement;
    for (const [k, v] of Object.entries(options)) {
        if (!["fill", "stroke", "strokeWidth"].includes(k)) path.setAttribute(k, String(v));
    }
    return path;
}

// Exports
export {
    crear,
    crearLinia,
    crearText,
    crearRect,
    crearCercle,
    crearElipse,
    crearPoligon,
    crearPath
};

export const Svg = {
    crear,
    crearLinia,
    crearText,
    crearRect,
    crearCercle,
    crearElipse,
    crearPoligon,
    crearPath
} as const;

export default Svg;