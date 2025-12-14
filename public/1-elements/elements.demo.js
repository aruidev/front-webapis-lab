import { Elements } from "./elements.js";
const div1 = Elements.crearElement('div', { 'class': 'contenidor' }, 'Hola món!');
const div2 = Elements.crearElement('div', { 'id': 'segon-div' }, 'Aquest és el segon div.');
document.getElementById("output")?.appendChild(div1);
document.getElementById("output")?.appendChild(div2);
Elements.moureAnterior(div2); // Mou el segon div abans del primer
