/** @type {HTMLCanvasElement} */
let canvas = null;
/** @type {CanvasRenderingContext2D} */
let ctx = null;
/** @type {number} */
let rotation = 0;

class Vector3 {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  toString() {
    return `rgb(${this.x * 255}, ${this.y * 255}, ${this.z * 255})`;
  }
}

export function createCanvas() {
  document.body.style.cssText = `
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #222222;
  `;
  canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 800 * 9 / 16;
  document.body.appendChild(canvas);

  ctx = canvas.getContext('2d');
  background(makeColor(0, 0, 0));
}

export function draw(drawCallback) {
  setInterval(drawCallback, 1000 / 60);
}

export function width() {
  return canvas.width;
}

export function height() {
  return canvas.height;
}

//#region Farbkonstanten

/**
 * Die Farbe Schwarz.
 * 
 * @example
 * // Verwendet die Konstante BLACK, um den Hintergrund schwarz zu machen
 * background(BLACK);
 */
export const BLACK = makeColor(0, 0, 0);

/**
 * Die Farbe Weiß.
 * 
 * @example
 * // Verwendet die Konstante WHITE, um den Hintergrund weiß zu machen
 * background(WHITE);
 */
export const WHITE = makeColor(100, 100, 100);

/**
 * Die Farbe Grau.
 * 
 * @example
 * // Verwendet die Konstante GRAY, um die Füllfarbe auf Grau zu setzen
 * fill(GRAY);
 */
export const GRAY = makeColor(50, 50, 50);

/**
 * Die Farbe Rot.
 * 
 * @example
 * // Verwendet die Konstante RED, um den Hintergrund rot zu machen
 * background(RED);
 */
export const RED = makeColor(100, 0, 0);

/**
 * Die Farbe Grün.
 * 
 * @example
 * // Verwendet die Konstante GREEN, um den Hintergrund grün zu machen
 * background(GREEN);
 */
export const GREEN = makeColor(0, 100, 0);

/**
 * Die Farbe Blau.
 * 
 * @example
 * // Verwendet die Konstante BLUE, um den Hintergrund blau zu machen
 * background(BLUE);
 */
export const BLUE = makeColor(0, 0, 100);

/**
 * Die Farbe Gelb.
 * 
 * @example
 * // Verwendet die Konstante YELLOW, um einen gelben Kreis zu zeichnen
 * fill(YELLOW);
 */
export const YELLOW = makeColor(100, 100, 0);

/**
 * Die Farbe Orange.
 * 
 * @example
 * // Verwendet die Konstante ORANGE, um eine Linie in Orange zu zeichnen
 * stroke(ORANGE);
 */
export const ORANGE = makeColor(100, 50, 0);

/**
 * Die Farbe Türkis.
 * 
 * @example
 * // Verwendet die Konstante TEAL, um einen türkisen Kreis zu füllen
 * fill(TEAL);
 */
export const TEAL = makeColor(0, 100, 100);

/**
 * Die Farbe Lila.
 * 
 * @example
 * // Verwendet die Konstante PURPLE, um einen lila Hintergrund zu erstellen
 * background(PURPLE);
 */
export const PURPLE = makeColor(50, 0, 50);

/**
 * Die Farbe Rosa.
 * 
 * @example
 * // Verwendet die Konstante PINK, um eine Linie in Pink zu zeichnen
 * stroke(PINK);
 */
export const PINK = makeColor(100, 0, 50);

//#endregion Farbkonstanten

/**
 * Erzeugt eine RGB-Farbe aus Prozentwerten für Rot, Grün und Blau.
 *
 * @param {number} red - Der Rotanteil der Farbe in Prozent (0 bis 100).
 * @param {number} green - Der Grünanteil der Farbe in Prozent (0 bis 100).
 * @param {number} blue - Der Blauanteil der Farbe in Prozent (0 bis 100).
 * @returns {Vector3} Ein Vektor, der die RGB-Werte der Farbe enthält.
 *
 * @example
 * // Erstellt ein hellblaues Farbwert
 * const color = makeColor(0, 50, 100);
 *
 * @example
 * // Erstellt eine mittlere Graufarbe
 * const gray = makeColor(50, 50, 50);
 */
export function makeColor(red, green, blue) {
  return new Vector3(red / 100.0, green / 100.0, blue / 100.0);
}

/**
 * Setzt die Hintergrundfarbe der Zeichenfläche.
 *
 * @param {Vector3} color - Die Farbe, die als Hintergrundfarbe gesetzt werden soll
 *                         (erzeugt durch die {@link makeColor} Funktion).
 * 
 * @example
 * // Setzt den Hintergrund auf Schwarz
 * background(makeColor(0, 0, 0));
 */
export function background(color) {
  ctx.fillStyle = color.toString();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Setzt die Füllfarbe für Formen auf der Zeichenfläche.
 *
 * @param {Vector3} color - Die Farbe zum Füllen von Formen, angegeben als Farbname (z. B. "red"), 
 *                         Hex-Code (z. B. "#ff0000") oder durch die {@link makeColor} Funktion erzeugt.
 *
 * @example
 * // Setzt die Füllfarbe auf Grün
 * fill('green');
 *
 * @example
 * // Erstellt eine Farbe mit makeColor und setzt sie als Füllfarbe
 * fill(makeColor(100, 50, 0));
 *
 * @see makeColor - Kann verwendet werden, um eine RGB-Farbe aus Prozentwerten zu erzeugen.
 */
export function fill(color) {
  ctx.fillStyle = color.toString();
}

/**
 * Setzt die Farbe für Linien (Konturen) auf der Zeichenfläche.
 *
 * @param {Vector3} color - Die Farbe der Linien, angegeben als Farbname (z. B. "red"), 
 *                         Hex-Code (z. B. "#ff0000") oder durch die {@link makeColor} Funktion erzeugt.
 *
 * @example
 * // Setzt die Linienfarbe auf Blau
 * stroke('blue');
 *
 * @example
 * // Erstellt eine Farbe mit makeColor und setzt sie als Linienfarbe
 * stroke(makeColor(50, 0, 100));
 *
 * @see makeColor - Kann verwendet werden, um eine RGB-Farbe aus Prozentwerten zu erzeugen.
 */
export function stroke(color) {
  ctx.strokeStyle = color.toString();
}

/**
 * Zeichnet eine Linie auf die Zeichenfläche.
 *
 * @param {number} x1 - Die x-Koordinate des Startpunkts der Linie.
 * @param {number} y1 - Die y-Koordinate des Startpunkts der Linie.
 * @param {number} x2 - Die x-Koordinate des Endpunkts der Linie.
 * @param {number} y2 - Die y-Koordinate des Endpunkts der Linie.
 *
 * @example
 * // Zeichnet eine Linie von (50, 50) nach (200, 200)
 * line(50, 50, 200, 200);
 */
export function line(x1, y1, x2, y2) {
  ctx.save();

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.restore();
}

/**
 * Zeichnet ein Quadrat auf die Zeichenfläche.
 *
 * @param {number} x - Die x-Koordinate der oberen linken Ecke des Quadrats.
 * @param {number} y - Die y-Koordinate der oberen linken Ecke des Quadrats.
 * @param {number} size - Die Seitenlänge des Quadrats in Pixeln.
 *
 * @example
 * // Zeichnet ein Quadrat mit der oberen linken Ecke bei (50, 50) und einer Größe von 100 Pixeln
 * square(50, 50, 100);
 */
export function square(x, y, size) {
  ctx.save();

  ctx.translate(x + size / 2, y + size / 2);
  ctx.rotate(rotation * Math.PI / 180);
  ctx.translate(size / -2, size / -2);
  ctx.scale(size, size);

  ctx.beginPath();
  ctx.rect(0, 0, 1, 1);
  ctx.fill();

  ctx.restore();
}

/**
 * Zeichnet ein Rechteck auf die Zeichenfläche.
 *
 * @param {number} x - Die x-Koordinate der oberen linken Ecke des Rechtecks.
 * @param {number} y - Die y-Koordinate der oberen linken Ecke des Rechtecks.
 * @param {number} width - Die Breite des Rechtecks in Pixeln.
 * @param {number} height - Die Höhe des Rechtecks in Pixeln.
 *
 * @example
 * // Zeichnet ein Rechteck mit der oberen linken Ecke bei (50, 50),
 * // einer Breite von 200 Pixeln und einer Höhe von 100 Pixeln
 * rectangle(50, 50, 200, 100);
 */
export function rectangle(x, y, width, height) {
  ctx.save();

  ctx.translate(x + width / 2, y + height / 2);
  ctx.rotate(rotation * Math.PI / 180);
  ctx.translate(width / -2, height / -2);
  ctx.scale(width, height);

  ctx.beginPath();
  ctx.rect(0, 0, 1, 1);
  ctx.fill();

  ctx.restore();
}

/**
 * Zeichnet einen gefüllten Kreis auf die Zeichenfläche.
 *
 * @param {number} x - Die x-Koordinate des Mittelpunkts des Kreises.
 * @param {number} y - Die y-Koordinate des Mittelpunkts des Kreises.
 * @param {number} radius - Der Radius des Kreises in Pixeln.
 *
 * @example
 * // Zeichnet einen Kreis mit Mittelpunkt (100, 100) und einem Radius von 50 Pixeln
 * circle(100, 100, 50);
 */
export function circle(x, y, radius) {
  ctx.save();

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  ctx.fill();

  ctx.restore();
}

/**
 * Zeichnet eine gefüllte und umrandete Ellipse auf die Zeichenfläche.
 *
 * @param {number} x - Die x-Koordinate des Mittelpunkts der Ellipse.
 * @param {number} y - Die y-Koordinate des Mittelpunkts der Ellipse.
 * @param {number} radiusX - Der horizontale Radius der Ellipse in Pixeln.
 * @param {number} radiusY - Der vertikale Radius der Ellipse in Pixeln.
 *
 * @example
 * // Zeichnet eine Ellipse mit Mittelpunkt (100, 100), horizontalem Radius 50 
 * // und vertikalem Radius 30 Pixel
 * ellipse(100, 100, 50, 30);
 */
export function ellipse(x, y, radiusX, radiusY) {
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(rotation * Math.PI / 180);

  ctx.beginPath();
  ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

/**
 * Zeichnet Text an einer angegebenen Position auf der Zeichenfläche.
 *
 * @param {string} text - Der Text, der auf dem Canvas angezeigt werden soll.
 * @param {number} x - Die x-Koordinate der Position, an der der Text beginnt.
 * @param {number} y - Die y-Koordinate der Position, an der der Text beginnt.
 * @param {number} [size=20] - Die Schriftgröße des Textes in Pixeln. Standardwert ist 20.
 *
 * @example
 * // Zeichnet den Text "Hallo Welt!" an der Position (50, 100) mit der Schriftgröße 30
 * text("Hallo Welt!", 50, 100, 30);
 *
 * @example
 * // Zeichnet den Text "Canvas ist cool!" an der Position (150, 150) mit der Standard-Schriftgröße 20
 * text("Canvas ist cool!", 150, 150);
 */
export function text(text, x, y, size = 20) {
  ctx.font = `${size}px Arial`;

  ctx.save();

  ctx.fillText(text, x, y);

  ctx.restore();
}

/**
 * Zeichnet ein Bild auf die Zeichenfläche an einer angegebenen Position und mit einer angegebenen Größe.
 *
 * @param {string} imagePath - Der Pfad zum Bild, das auf das Canvas gezeichnet werden soll.
 * @param {number} x - Die x-Koordinate der Position, an der das Bild angezeigt wird.
 * @param {number} y - Die y-Koordinate der Position, an der das Bild angezeigt wird.
 * @param {number} width - Die Breite des angezeigten Bildes.
 * @param {number} height - Die Höhe des angezeigten Bildes.
 *
 * @example
 * // Lädt das Bild "image.png" und zeigt es bei (50, 50) mit einer Breite von 200 und einer Höhe von 150 an
 * image('image.png', 50, 50, 200, 150);
 */
export function image(imagePath, x, y, width, height) {
  const img = new Image();
  img.src = imagePath;
  img.onload = () => {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.drawImage(img, -width / 2, -height / 2, width, height);
    ctx.restore();
  };
}

/**
 * Dreht die Zeichenfläche um einen bestimmten Winkel.
 *
 * @param {number} degrees - Der Winkel, um den die Zeichenfläche gedreht werden soll, in Grad.
 *                           Ein positiver Wert dreht die Fläche im Uhrzeigersinn, ein negativer Wert gegen den Uhrzeigersinn.
 * 
 * @example
 * // Dreht die Zeichenfläche um 45 Grad im Uhrzeigersinn
 * rotate(45);
 *
 * @example
 * // Dreht die Zeichenfläche um 90 Grad gegen den Uhrzeigersinn
 * rotate(-90);
 */
export function rotate(degrees) {
  rotation = degrees;
}

/**
 * @template T
 * @param {T[]|number} min 
 * @param {number} [max] 
 * @returns {T|number}
 */
export function random(min, max) {
  if (Array.isArray(min)) {
    return min[Math.floor(Math.random() * min.length)];
  }
  return Math.random() * (max - min) + min;
}
