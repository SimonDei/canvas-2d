const __2djs = {
  /** @type {HTMLCanvasElement} */
  canvas: null,
  /** @type {CanvasRenderingContext2D} */
  ctx: null,
  /** @type {number} */
  frameRate: 60,
  /** @type {number} */
  intervalId: null,
  /** @type {Function} */
  intervalCallback: null,
  /** @type {number} */
  rotation: 0,
  /** @type {number} */
  textSize: 20,
  /** @type {number} */
  angleMode: Math.PI / 180,
  /** @type {boolean} */
  mouseMoved: false,
  /** @type {{ type: string, callback: Function }[]} */
  listeners: []
}

class Vector2 {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

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

const DEGREES = 1;
const RADIANS = 2;
const QUARTER_PI = Math.PI / 4;
const HALF_PI = Math.PI / 2;
const PI = Math.PI;
const TWO_PI = Math.PI * 2;

let canvas = null;
let frameCount = 0;
let deltaTime = 0;
let width = 0;
let height = 0;
const windowWidth = window.visualViewport.width;
const windowHeight = window.visualViewport.height;
let mouseX = 0;
let mouseY = 0;

/**
 * @param {number} w
 * @param {number} h
 */
function createCanvas(w, h) {
  width = w;
  height = h;

  document.addEventListener('DOMContentLoaded', async () => {
    document.body.style.cssText = `
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #222222;
    `;

    __2djs.canvas = document.createElement('canvas');
    __2djs.canvas.width = w;
    __2djs.canvas.height = h;
    document.body.appendChild(__2djs.canvas);
    
    canvas = __2djs.canvas;

    __2djs.canvas.addEventListener('click', () => mouseClicked?.());

    __2djs.canvas.addEventListener('mousemove', function(event) {
      mouseX = event.x - __2djs.canvas.getBoundingClientRect().x;
      mouseY = event.y - __2djs.canvas.getBoundingClientRect().y;
      _mouseMoved = true;
    });

    __2djs.ctx = _canvas.getContext('2d');
    background(BLACK);

    setup?.();

    __2djs.intervalCallback = () => {
      const startTime = performance.now();
      draw?.();
      if (__2djs.mouseMoved) {
        mouseMoved?.();
      }
      frameCount++;
      deltaTime = performance.now() - startTime;
    };

    __2djs.intervalId = setInterval(__2djs.intervalCallback, 1000 / __2djs.frameRate);
  });
}

/**
 * @param {number} [fps]
 * @returns {number|void}
 */
function frameRate(fps) {
  if (fps === null || fps === undefined) {
    return __2djs.frameRate;
  }
  if (fps === __2djs.frameRate) {
    return;
  }
  __2djs.frameRate = fps;
  if (!_intervalId) {
    return;
  }
  clearInterval(__2djs.intervalId);
  __2djs.intervalId = setInterval(__2djs.intervalCallback, 1000 / fps);
}

/**
 * @param {boolean} [val]
 * @returns {boolean|void}
 */
function fullscreen(val) {
  if (val === null || val === undefined) {
    return document.fullscreenElement !== null;
  } else if (val) {
    __2djs.canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

//#region Farbkonstanten

/**
 * Die Farbe Schwarz.
 * 
 * @example
 * // Verwendet die Konstante BLACK, um den Hintergrund schwarz zu machen
 * background(BLACK);
 */
const BLACK = makeColor(0, 0, 0);

/**
 * Die Farbe Weiß.
 * 
 * @example
 * // Verwendet die Konstante WHITE, um den Hintergrund weiß zu machen
 * background(WHITE);
 */
const WHITE = makeColor(100, 100, 100);

/**
 * Die Farbe Grau.
 * 
 * @example
 * // Verwendet die Konstante GRAY, um die Füllfarbe auf Grau zu setzen
 * fill(GRAY);
 */
const GRAY = makeColor(50, 50, 50);

/**
 * Die Farbe Rot.
 * 
 * @example
 * // Verwendet die Konstante RED, um den Hintergrund rot zu machen
 * background(RED);
 */
const RED = makeColor(100, 0, 0);

/**
 * Die Farbe Grün.
 * 
 * @example
 * // Verwendet die Konstante GREEN, um den Hintergrund grün zu machen
 * background(GREEN);
 */
const GREEN = makeColor(0, 100, 0);

/**
 * Die Farbe Blau.
 * 
 * @example
 * // Verwendet die Konstante BLUE, um den Hintergrund blau zu machen
 * background(BLUE);
 */
const BLUE = makeColor(0, 0, 100);

/**
 * Die Farbe Gelb.
 * 
 * @example
 * // Verwendet die Konstante YELLOW, um einen gelben Kreis zu zeichnen
 * fill(YELLOW);
 */
const YELLOW = makeColor(100, 100, 0);

/**
 * Die Farbe Orange.
 * 
 * @example
 * // Verwendet die Konstante ORANGE, um eine Linie in Orange zu zeichnen
 * stroke(ORANGE);
 */
const ORANGE = makeColor(100, 50, 0);

/**
 * Die Farbe Türkis.
 * 
 * @example
 * // Verwendet die Konstante TEAL, um einen türkisen Kreis zu füllen
 * fill(TEAL);
 */
const TEAL = makeColor(0, 100, 100);

/**
 * Die Farbe Lila.
 * 
 * @example
 * // Verwendet die Konstante PURPLE, um einen lila Hintergrund zu erstellen
 * background(PURPLE);
 */
const PURPLE = makeColor(50, 0, 50);

/**
 * Die Farbe Rosa.
 * 
 * @example
 * // Verwendet die Konstante PINK, um eine Linie in Pink zu zeichnen
 * stroke(PINK);
 */
const PINK = makeColor(100, 0, 50);

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
function makeColor(red, green, blue) {
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
function background(color) {
  __2djs.ctx.fillStyle = color.toString();
  __2djs.ctx.fillRect(0, 0, __2djs.canvas.width, __2djs.canvas.height);
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
function fill(color) {
  __2djs.ctx.fillStyle = color.toString();
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
function stroke(color) {
  __2djs.ctx.strokeStyle = color.toString();
}

function lineWidth(width) {
  __2djs.ctx.lineWidth = width;
}

function point(x, y, size = 1) {
  __2djs.ctx.save();

  __2djs.ctx.fillRect(x, y, size, size);

  __2djs.ctx.restore();
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
function line(x1, y1, x2, y2) {
  __2djs.ctx.save();

  __2djs.ctx.beginPath();
  __2djs.ctx.moveTo(x1, y1);
  __2djs.ctx.lineTo(x2, y2);
  __2djs.ctx.stroke();

  __2djs.ctx.restore();
}

function triangle(x1, y1, x2, y2, x3, y3) {
  __2djs.ctx.save();

  __2djs.ctx.beginPath();
  __2djs.ctx.moveTo(x1, y1);
  __2djs.ctx.lineTo(x2, y2);
  __2djs.ctx.lineTo(x3, y3);
  __2djs.ctx.lineTo(x1, y1);
  __2djs.ctx.stroke();

  __2djs.ctx.restore();
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
function square(x, y, size) {
  __2djs.ctx.save();

  __2djs.ctx.translate(x + size / 2, y + size / 2);
  __2djs.ctx.rotate(rotation);
  __2djs.ctx.translate(size / -2, size / -2);
  __2djs.ctx.scale(size, size);

  __2djs.ctx.beginPath();
  __2djs.ctx.rect(0, 0, 1, 1);
  __2djs.ctx.fill();

  __2djs.ctx.restore();
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
function rect(x, y, width, height) {
  __2djs.ctx.save();

  __2djs.ctx.translate(x + width / 2, y + height / 2);
  __2djs.ctx.rotate(rotation);
  __2djs.ctx.translate(width / -2, height / -2);
  __2djs.ctx.scale(width, height);

  __2djs.ctx.beginPath();
  __2djs.ctx.rect(0, 0, 1, 1);
  __2djs.ctx.fill();

  __2djs.ctx.restore();
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
function circle(x, y, radius) {
  __2djs.ctx.save();

  __2djs.ctx.beginPath();
  __2djs.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  __2djs.ctx.fill();

  __2djs.ctx.restore();
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
function ellipse(x, y, radiusX, radiusY) {
  __2djs.ctx.save();

  __2djs.ctx.translate(x, y);
  __2djs.ctx.rotate(rotation);

  __2djs.ctx.beginPath();
  __2djs.ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
  __2djs.ctx.fill();

  __2djs.ctx.restore();
}

/**
 * @param {number} size
 */
function textSize(size) {
  __2djs.textSize = size;
}

/**
 * Zeichnet Text an einer angegebenen Position auf der Zeichenfläche.
 *
 * @param {string} text - Der Text, der auf dem Canvas angezeigt werden soll.
 * @param {number} x - Die x-Koordinate der Position, an der der Text beginnt.
 * @param {number} y - Die y-Koordinate der Position, an der der Text beginnt.
 * @param {number} [size] - Die Schriftgröße des Textes in Pixeln. Standardwert ist 20.
 *
 * @example
 * // Zeichnet den Text "Hallo Welt!" an der Position (50, 100) mit der Schriftgröße 30
 * text("Hallo Welt!", 50, 100, 30);
 *
 * @example
 * // Zeichnet den Text "Canvas ist cool!" an der Position (150, 150) mit der Standard-Schriftgröße 20
 * text("Canvas ist cool!", 150, 150);
 */
function text(text, x, y, size) {
  __2djs.ctx.font = `${size ?? __2djs.textSize}px Arial`;

  __2djs.ctx.save();

  __2djs.ctx.fillText(text, x, y + (size ?? __2djs.textSize));

  __2djs.ctx.restore();
}

/**
 * @param {number} sizeX
 * @param {number} sizeY
 */
function grid(sizeX, sizeY) {
  __2djs.ctx.save();
  __2djs.ctx.beginPath();

  for (let x = 0; x < width / sizeX; x++) {
    for (let y = 0; y < height / sizeY; y++) {
      __2djs.ctx.moveTo(0, y * sizeY);
      __2djs.ctx.lineTo(width, y * sizeY);
    }
    __2djs.ctx.moveTo(x * sizeX, 0);
    __2djs.ctx.lineTo(x * sizeX, height);
  }

  __2djs.ctx.stroke();
  __2djs.ctx.restore();
}

/**
 * @param {string} imagePath
 * @returns {HTMLImageElement}
 */
function loadImage(imagePath) {
  const image = new Image();
  image.src = imagePath;
  image.onload = () => {
    image.dataset.loaded = 'true';
  }
  return image;
}

/**
 * Zeichnet ein Bild auf die Zeichenfläche an einer angegebenen Position und mit einer angegebenen Größe.
 *
 * @param {HTMLImageElement} image - Der Pfad zum Bild, das auf das Canvas gezeichnet werden soll.
 * @param {number} x - Die x-Koordinate der Position, an der das Bild angezeigt wird.
 * @param {number} y - Die y-Koordinate der Position, an der das Bild angezeigt wird.
 * @param {number} [width] - Die Breite des angezeigten Bildes.
 * @param {number} [height] - Die Höhe des angezeigten Bildes.
 *
 * @example
 * // Lädt das Bild "image.png" und zeigt es bei (50, 50) mit einer Breite von 200 und einer Höhe von 150 an
 * image('image.png', 50, 50, 200, 150);
 */
function image(image, x, y, width, height) {
  if (image.dataset.loaded !== 'true') {
    return;
  }

  __2djs.ctx.save();

  __2djs.ctx.translate(x + (width ?? image.width) / 2, y + (height ?? image.height) / 2);
  __2djs.ctx.rotate(rotation);
  __2djs.ctx.drawImage(image, -(width ?? image.width) / 2, -(height ?? image.height) / 2, width ?? image.width, height ?? image.height);

  __2djs.ctx.restore();
}

/**
 * @param {number} mode
 */
function angleMode(mode) {
  if (mode === DEGREES) {
    __2djs.angleMode = Math.PI / 180;
  } else if (mode === RADIANS) {
    __2djs.angleMode = 1;
  }
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
function rotate(degrees) {
  rotation = degrees * __2djs.angleMode;
}

/**
 * @template T
 * @param {T[]|number} min 
 * @param {number} [max] 
 * @returns {T|number}
 */
function random(min, max) {
  if (Array.isArray(min)) {
    return min[Math.floor(Math.random() * min.length)];
  }
  return Math.random() * (max - min) + min;
}
