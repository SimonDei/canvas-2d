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

/**
 * Repräsentiert einen 2D-Vektor mit den Komponenten x und y.
 *
 * Diese Klasse ermöglicht es, einen 2D-Vektor zu erstellen, der durch zwei Komponenten (x und y) definiert wird.
 * Vektoren werden häufig in der Mathematik, Physik und Computergrafik verwendet, um Positionen oder Bewegungen im zweidimensionalen Raum darzustellen.
 *
 * @example
 * // Erstelle einen neuen Vektor mit den Komponenten x = 5 und y = 10
 * const vector = new Vector2(5, 10);
 */
class Vector2 {
  /**
   * Erzeugt eine neue Instanz der `Vector2`-Klasse.
   *
   * @param {number} x - Die x-Komponente des Vektors.
   * @param {number} y - Die y-Komponente des Vektors.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * Repräsentiert einen 3D-Vektor mit den Komponenten x, y und z.
 *
 * Diese Klasse ermöglicht es, einen 3D-Vektor zu erstellen, der durch drei Komponenten (x, y, z) definiert wird.
 * Vektoren werden häufig in der Mathematik, Physik und Computergrafik verwendet, um Positionen oder Bewegungen im dreidimensionalen Raum darzustellen.
 *
 * @example
 * // Erstelle einen neuen Vektor mit den Komponenten x = 1, y = 2 und z = 3
 * const vector = new Vector3(1, 2, 3);
 */
class Vector3 {
  /**
   * Erzeugt eine neue Instanz der `Vector3`-Klasse.
   *
   * @param {number} x - Die x-Komponente des Vektors.
   * @param {number} y - Die y-Komponente des Vektors.
   * @param {number} z - Die z-Komponente des Vektors.
   */
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

/**
 * Repräsentiert eine Farbe mit den Komponenten Rot, Grün und Blau (RGB).
 *
 * Diese Klasse ermöglicht es, eine Farbe zu erstellen, die durch drei Farbkomponenten (Rot, Grün, Blau) definiert wird.
 * Außerdem bietet die Klasse eine Methode, um die Farbe als `rgb()`-String darzustellen, der in {@link fill} oder {@link stroke} verwendet werden kann.
 *
 * @example
 * // Erstelle eine neue Farbe mit den RGB-Werten 100 % (Rot), 50 % (Grün), und 45 % (Blau)
 * const color = new Color(255, 128, 114);
 *
 * // Gibt die Farbe als rgb()-String zurück
 * console.log(color.toString());  // rgb(255, 128, 114)
 */
class Color {
  /**
   * Erzeugt eine neue Instanz der `Color`-Klasse.
   *
   * @param {number} red - Der Rotwert der Farbe (zwischen 0 und 255).
   * @param {number} green - Der Grünwert der Farbe (zwischen 0 und 255).
   * @param {number} blue - Der Blauwert der Farbe (zwischen 0 und 255).
   * @param {number} [alpha=255] - Der Alphawert der Farbe (zwischen 0 und 255, standardmäßig 255).
   */
  constructor(red, green, blue, alpha = 255) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
  }

  /**
   * Gibt die Farbe als CSS-kompatiblen `rgb()`-String zurück.
   *
   * Der `toString()`-Methode gibt die RGB-Werte zurück.
   *
   * @returns {string} - Der `rgb()`-String, der die Farbe darstellt, z. B. `rgb(255, 255, 255)`.
   */
  toString() {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
  }
}

/**
 * Eine Klasse, die ein Rechteck darstellt.
 *
 * Diese Klasse wird verwendet, um ein Rechteck mit einer bestimmten Position und Größe zu beschreiben.
 * Ein Rechteck hat eine obere linke Ecke, die durch die Koordinaten `x` und `y` definiert ist, 
 * sowie eine Breite (`width`) und eine Höhe (`height`), die die Größe des Rechtecks bestimmen.
 *
 * @example
 * // Erstellt ein Rechteck mit der Position (50, 100) und einer Größe von 200x150 Pixel
 * const myRect = new Rect(50, 100, 200, 150);
 * 
 * // Zugriff auf die Eigenschaften des Rechtecks
 * console.log(myRect.x); // Gibt 50 aus
 * console.log(myRect.width); // Gibt 200 aus
 *
 * @class
 */
class Rect {
  /**
   * Erstellt ein neues Rechteck.
   * 
   * @param {number} x - Die x-Koordinate der oberen linken Ecke des Rechtecks.
   * @param {number} y - Die y-Koordinate der oberen linken Ecke des Rechtecks.
   * @param {number} width - Die Breite des Rechtecks.
   * @param {number} height - Die Höhe des Rechtecks.
   */
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

class DrawImage {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.pixels = new ImageData(width, height);
    this.canvas = new OffscreenCanvas(width, height);
    this.ctx = this.canvas.getContext('2d');
  }

  get(x, y) {
    return this.pixels[y * this.width + x];
  }

  set(x, y, color) {
    this.pixels.data[(y * this.width + x) * 4] = color.red * 2.55;
    this.pixels.data[(y * this.width + x) * 4 + 1] = color.green * 2.55;
    this.pixels.data[(y * this.width + x) * 4 + 2] = color.blue * 2.55;
    this.pixels.data[(y * this.width + x) * 4 + 3] = color.alpha * 2.55;
  }

  scale(scale) {
    const newImageData = new ImageData(this.width * scale, this.height * scale);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const red = this.pixels.data[(y * this.width + x) * 4];
        const green = this.pixels.data[(y * this.width + x) * 4 + 1];
        const blue = this.pixels.data[(y * this.width + x) * 4 + 2];
        const alpha = this.pixels.data[(y * this.width + x) * 4 + 3];
        for (let dy = 0; dy < scale; dy++) {
          for (let dx = 0; dx < scale; dx++) {
            newImageData.data[((y * scale + dy) * (this.width * scale) + (x * scale + dx)) * 4] = red;
            newImageData.data[((y * scale + dy) * (this.width * scale) + (x * scale + dx)) * 4 + 1] = green;
            newImageData.data[((y * scale + dy) * (this.width * scale) + (x * scale + dx)) * 4 + 2] = blue;
            newImageData.data[((y * scale + dy) * (this.width * scale) + (x * scale + dx)) * 4 + 3] = alpha;
          }
        }
      }
    }
    this.pixels = newImageData;
    this.width = this.pixels.width;
    this.height = this.pixels.height;
  }

  update() {
    this.ctx.putImageData(this.pixels, 0, 0, 0, 0, this.canvas.width, this.canvas.height);
  }

  draw(x, y) {
    __2djs.ctx.save();

    __2djs.ctx.translate(x + this.canvas.width / 2, y + this.canvas.height / 2);
    __2djs.ctx.rotate(__2djs.rotation * __2djs.angleMode);
    __2djs.ctx.drawImage(this.canvas, -this.canvas.width / 2, -this.canvas.height / 2);

    __2djs.ctx.restore();
  }
}

//#region Globale Variablen

/**
 * Der Wert für den Gradmaß (Degrees) bei der Einstellung des Winkelmaßes.
 *
 * Diese Konstante wird verwendet, um das Winkelmaß auf Grad zu setzen, wenn die Funktion `angleMode()` aufgerufen wird.
 * Der Wert von `DEGREES` entspricht 1, und er sorgt dafür, dass Winkel in Grad angegeben werden.
 *
 * @type {number}
 * @see {@link angleMode} - Funktion, um das Winkelmaß auf Grad oder Radiant einzustellen.
 *
 * @example
 * // Setzt das Winkelmaß auf Grad
 * angleMode(DEGREES);
 */
const DEGREES = 1;

/**
 * Der Wert für den Radiantmaß (Radians) bei der Einstellung des Winkelmaßes.
 *
 * Diese Konstante wird verwendet, um das Winkelmaß auf Radiant zu setzen, wenn die Funktion `angleMode()` aufgerufen wird.
 * Der Wert von `RADIANS` entspricht 2, und er sorgt dafür, dass Winkel in Radiant angegeben werden.
 *
 * @type {number}
 * @see {@link angleMode} - Funktion, um das Winkelmaß auf Grad oder Radiant einzustellen.
 *
 * @example
 * // Setzt das Winkelmaß auf Radiant
 * angleMode(RADIANS);
 */
const RADIANS = 2;

/**
 * Die Konstante für die linken Textausrichtung.
 *
 * Diese Konstante wird verwendet, um den Text am linken Rand auszurichten.
 * 
 * @constant {string} LEFT - Der Wert für die linke Textausrichtung.
 * @see {@link textAlign}
 *
 * @example
 * // Setzt die Textausrichtung auf links
 * textAlign(LEFT);
 */
const LEFT = 'left';

/**
 * Die Konstante für die mittige Textausrichtung.
 *
 * Diese Konstante wird verwendet, um den Text horizontal in der Mitte auszurichten.
 * 
 * @constant {string} CENTER - Der Wert für die mittige Textausrichtung.
 * @see {@link textAlign}
 *
 * @example
 * // Setzt die Textausrichtung auf die Mitte
 * textAlign(CENTER);
 */
const CENTER = 'center';

/**
 * Die Konstante für die rechte Textausrichtung.
 *
 * Diese Konstante wird verwendet, um den Text horizontal am rechten Rand auszurichten.
 * 
 * @constant {string} RIGHT - Der Wert für die rechte Textausrichtung.
 * @see {@link textAlign}
 *
 * @example
 * // Setzt die Textausrichtung auf rechts
 * textAlign(RIGHT);
 */
const RIGHT = 'right';

/**
 * Ein Viertel der Kreiszahl Pi (π/4), entspricht 45 Grad in Bogenmaß.
 *
 * @constant {number}
 *
 * @example
 * // Verwenden von QUARTER_PI, um eine 45-Grad-Rotation anzuwenden
 * ctx.rotate(QUARTER_PI);
 *
 * @example
 * // Berechnen von Sinus und Kosinus für 45 Grad
 * const sin45 = Math.sin(QUARTER_PI);
 * const cos45 = Math.cos(QUARTER_PI);
 */
const QUARTER_PI = Math.PI / 4;

/**
 * Die Hälfte der Kreiszahl Pi (π/2), entspricht 90 Grad in Bogenmaß.
 *
 * @constant {number}
 *
 * @example
 * // Verwenden von HALF_PI, um einen Viertelkreis zu zeichnen
 * ctx.arc(100, 100, 50, 0, HALF_PI);
 *
 * @example
 * // Rotieren um 90 Grad (im Uhrzeigersinn)
 * ctx.rotate(HALF_PI);
 */
const HALF_PI = Math.PI / 2;

/**
 * Die Kreiszahl Pi (π), Verhältnis des Umfangs eines Kreises zu seinem Durchmesser.
 *
 * @constant {number}
 *
 * @example
 * // Verwenden von PI, um einen Halbkreis zu zeichnen
 * ctx.arc(100, 100, 50, 0, PI);
 */
const PI = Math.PI;

/**
 * Die doppelte Kreiszahl Pi (2π), entspricht 360 Grad in Bogenmaß.
 *
 * @constant {number}
 *
 * @example
 * // Verwenden von TWO_PI zum Zeichnen eines vollständigen Kreises
 * ctx.arc(100, 100, 50, 0, TWO_PI);
 */
const TWO_PI = Math.PI * 2;

let canvas = null;

/**
 * Zähler für die Anzahl der abgelaufenen Frames.
 *
 * Diese Variable wird oft in Animations- oder Spielanwendungen verwendet,
 * um die Anzahl der Frames zu verfolgen, die seit dem Start oder
 * seit der letzten Aktualisierung vergangen sind. Der Wert von `frameCount`
 * wird in der Regel in einem Animations- oder Spiel-Loop erhöht.
 *
 * @type {number}
 * @default 0
 *
 * @example
 * // Erhöht den Frame-Zähler in jedem Animations-Frame
 * function update() {
 *   frameCount++;
 *   // Weitere Updates hier...
 * }
 *
 * @example
 * // Berechnet die Zeit, die seit dem Start vergangen ist, basierend auf frameCount
 * const timeElapsed = frameCount * deltaTime;
 */
let frameCount = 0;

/**
 * Die Zeitspanne (in Millisekunden) zwischen zwei aufeinanderfolgenden Frames.
 *
 * Diese Variable wird oft in Animations- oder Spielanwendungen verwendet,
 * um die Zeitdifferenz zwischen den Frames zu berechnen und so eine
 * gleichmäßige Animation oder Bewegung zu gewährleisten. Der Wert von
 * `deltaTime` wird üblicherweise in einem Animations- oder Spiel-Loop
 * aktualisiert.
 *
 * @type {number}
 * @default 0
 *
 * @example
 * // Berechnet die Bewegung eines Objekts basierend auf der Delta-Zeit
 * object.x += velocity * deltaTime;
 *
 * @example
 * // Aktualisiert deltaTime in einem Animations-Loop
 * let lastTime = 0;
 * function update(time) {
 *   deltaTime = time - lastTime;
 *   lastTime = time;
 *   // Weitere Updates hier...
 * }
 */
let deltaTime = 0;

/**
 * Eine feste Breite in Pixel.
 *
 * Diese Konstante speichert eine Breite, die nicht verändert werden kann.
 *
 * @type {number}
 * @default 0
 *
 * @example
 * // Verwenden der Breite in einer Berechnung
 * const area = width * height;
 */
let width = 0;

/**
 * Eine feste Höhe in Pixel.
 *
 * Diese Konstante speichert eine Höhe, die nicht verändert werden kann.
 *
 * @type {number}
 * @default 0
 *
 * @example
 * // Verwenden der Höhe in einer Berechnung
 * const area = width * height;
 */
let height = 0;

/**
 * Die aktuelle Breite des sichtbaren Bereichs des Browserfensters (Viewport).
 *
 * Diese Konstante speichert die Breite des Viewports in Pixel, die von
 * `window.visualViewport.width` abgerufen wird. Sie ist hilfreich, um das
 * Layout dynamisch an die Größe des Browserfensters anzupassen.
 *
 * @constant {number}
 *
 * @example
 * // Gibt die aktuelle Fensterbreite in der Konsole aus
 * console.log(windowWidth);
 */
const windowWidth = window.visualViewport.width;

/**
 * Die aktuelle Höhe des sichtbaren Bereichs des Browserfensters (Viewport).
 *
 * Diese Konstante speichert die Höhe des Viewports in Pixel, die von
 * `window.visualViewport.height` abgerufen wird. Sie ist hilfreich, um das
 * Layout dynamisch an die Höhe des Browserfensters anzupassen, insbesondere
 * bei responsiven Designs oder bei der Erstellung von Layouts, die die
 * Fensterhöhe berücksichtigen müssen.
 *
 * @constant {number}
 *
 * @example
 * // Gibt die aktuelle Fensterhöhe in der Konsole aus
 * console.log(windowHeight);
 */
const windowHeight = window.visualViewport.height;

/**
 * Die aktuelle x-Koordinate der Maus relativ zur Zeichenfläche.
 *
 * Diese Variable speichert die horizontale Position der Maus. Sie wird
 * regelmäßig aktualisiert, um die Mausbewegung auf der Zeichenfläche zu verfolgen.
 *
 * @example
 * // Gibt die aktuelle Position von mouseX in der Konsole aus.
 * function mouseMoved() {
 *   console.log(mouseX);
 * }
 *
 * @type {number}
 * @default 0
 */
let mouseX = 0;

/**
 * Die aktuelle y-Koordinate der Maus relativ zur Zeichenfläche.
 *
 * Diese Variable speichert die vertikale Position der Maus. Sie wird
 * regelmäßig aktualisiert, um die Mausbewegung auf der Zeichenfläche zu verfolgen.
 *
 * @example
 * // Gibt die aktuelle Position von mouseY in der Konsole aus.
 * function mouseMoved() {
 *   console.log(mouseY);
 * }
 *
 * @type {number}
 * @default 0
 */
let mouseY = 0;

/**
 * Gibt an, ob die Maustaste aktuell gedrückt ist.
 *
 * Diese Variable speichert den Zustand der Maustaste. Wenn `mouseIsPressed` den Wert `true`
 * hat, bedeutet dies, dass die Maustaste gerade gedrückt wird. Wenn der Wert `false` ist, 
 * ist die Maustaste nicht gedrückt.
 *
 * Diese Variable wird oft verwendet, um Interaktionen mit der Benutzeroberfläche zu überwachen,
 * beispielsweise um zu überprüfen, ob der Benutzer mit der Maus klickt oder zieht.
 *
 * @example
 * // Überprüft, ob die Maustaste gedrückt ist und gibt den Status in der Konsole aus
 * if (mouseIsPressed) {
 *   console.log("Die Maustaste ist gedrückt.");
 * } else {
 *   console.log("Die Maustaste ist nicht gedrückt.");
 * }
 *
 * @type {boolean}
 * @default false
 */
let mouseIsPressed = false;

//#endregion

//#region Farbkonstanten

/**
 * Die Farbe Schwarz, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine schwarze Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 0
 * - Grün: 0
 * - Blau: 0
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} BLACK - Eine schwarze Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante BLACK, um eine Linie in Schwarz zu zeichnen
 * stroke(BLACK);
 */
const BLACK = makeColor(0, 0, 0);

/**
 * Die Farbe Weiß, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine weiße Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 255
 * - Grün: 255
 * - Blau: 255
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} WHITE - Eine weiße Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante WHITE, um eine Linie in Weiß zu zeichnen
 * stroke(WHITE);
 */
const WHITE = makeColor(255, 255, 255);

/**
 * Die Farbe Grau, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine graue Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 137
 * - Grün: 137
 * - Blau: 137
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} GRAY - Eine graue Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante GRAY, um eine Linie in Grau zu zeichnen
 * stroke(GRAY);
 */
const GRAY = makeColor(137, 137, 137);

/**
 * Die Farbe Hellgrau, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine hellgraue Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 211
 * - Grün: 211
 * - Blau: 211
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} LIGHTGRAY - Eine hellgraue Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante LIGHTGRAY, um eine Linie in Hellgrau zu zeichnen
 * stroke(LIGHTGRAY);
 */
const LIGHTGRAY = makeColor(211, 211, 211);

/**
 * Die Farbe Dunkelgrau, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine dunkelgraue Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 80
 * - Grün: 80
 * - Blau: 80
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} DARKGRAY - Eine dunkelgraue Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante DARKGRAY, um eine Linie in Dunkelgrau zu zeichnen
 * stroke(DARKGRAY);
 */
const DARKGRAY = makeColor(80, 80, 80);

/**
 * Die Farbe Rot, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine rote Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 255
 * - Grün: 44
 * - Blau: 44
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} RED - Eine rote Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante RED, um eine Linie in Rot zu zeichnen
 * stroke(RED);
 */
const RED = makeColor(255, 44, 44);

/**
 * Die Farbe Grün, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine grüne Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 0
 * - Grün: 128
 * - Blau: 0
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} GREEN - Eine grüne Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante GREEN, um eine Linie in Grün zu zeichnen
 * stroke(GREEN);
 */
const GREEN = makeColor(0, 128, 0);

/**
 * Die Farbe Limette (Lime), erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine limettengrüne Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 137
 * - Grün: 243
 * - Blau: 54
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} LIME - Eine limettengrüne Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante LIME, um eine Linie in Limettengrün zu zeichnen
 * stroke(LIME);
 */
const LIME = makeColor(137, 243, 54);

/**
 * Die Farbe Dunkelgrün, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine dunkelgrüne Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 6
 * - Grün: 64
 * - Blau: 43
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} DARKGREEN - Eine dunkelgrüne Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante DARKGREEN, um eine Linie in Dunkelgrün zu zeichnen
 * stroke(DARKGREEN);
 */
const DARKGREEN = makeColor(6, 64, 43);

/**
 * Die Farbe Kastanienbraun (Maroon), erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine kastanienbraune Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 85
 * - Grün: 0
 * - Blau: 0
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} MAROON - Eine kastanienbraune Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante MAROON, um eine Linie in Kastanienbraun zu zeichnen
 * stroke(MAROON);
 */
const MAROON = makeColor(85, 0, 0);

/**
 * Die Farbe Blau, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine reine blaue Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 0
 * - Grün: 0
 * - Blau: 100
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} BLUE - Eine reine blaue Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante BLUE, um eine Linie in Blau zu zeichnen
 * stroke(BLUE);
 */
const BLUE = makeColor(0, 0, 255);

/**
 * Die Farbe Himmelblau, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine himmelblaue Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 139
 * - Grün: 200
 * - Blau: 229
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} SKYBLUE - Eine himmelblaue Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante SKYBLUE, um eine Linie in Himmelblau zu zeichnen
 * stroke(SKYBLUE);
 */
const SKYBLUE = makeColor(130, 200, 229);

/**
 * Die Farbe Dunkelblau, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine dunkelblaue Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 17
 * - Grün: 17
 * - Blau: 132
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} DARKBLUE - Eine dunkelblaue Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante DARKBLUE, um eine Linie in Dunkelblau zu zeichnen
 * stroke(DARKBLUE);
 */
const DARKBLUE = makeColor(17, 17, 132);

/**
 * Die Farbe Gelb, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine gelbe Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 255
 * - Grün: 222
 * - Blau: 33
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} YELLOW - Eine gelbe Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante YELLOW, um eine Linie in Gelb zu zeichnen
 * stroke(YELLOW);
 */
const YELLOW = makeColor(255, 222, 33);

/**
 * Die Farbe Orange, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine orange Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 255
 * - Grün: 165
 * - Blau: 0
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} ORANGE - Eine orange Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante ORANGE, um eine Linie in Orange zu zeichnen
 * stroke(ORANGE);
 */
const ORANGE = makeColor(255, 165, 0);

/**
 * Die Farbe Teal (Türkis), erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine teal (türkise) Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 6
 * - Grün: 148
 * - Blau: 148
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} TEAL - Eine teal (türkise) Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante TEAL, um eine Linie in Teal zu zeichnen
 * stroke(TEAL);
 */
const TEAL = makeColor(6, 148, 148);

/**
 * Die Farbe Lila, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine lila Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 157
 * - Grün: 0
 * - Blau: 255
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} PURPLE - Eine lila Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante PURPLE, um eine Linie in Lila zu zeichnen
 * stroke(PURPLE);
 */
const PURPLE = makeColor(157, 0, 255);

/**
 * Die Farbe Violett, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine violette Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 127
 * - Grün: 0
 * - Blau: 255
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} VIOLET - Eine violette Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante VIOLET, um eine Linie in Violett zu zeichnen
 * stroke(VIOLET);
 */
const VIOLET = makeColor(127, 0, 255);

/**
 * Die Farbe Magenta, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine magenta Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 253
 * - Grün: 61
 * - Blau: 181
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} MAGENTA - Eine magenta Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante MAGENTA, um eine Linie in Magenta zu zeichnen
 * stroke(MAGENTA);
 */
const MAGENTA = makeColor(253, 61, 181);

/**
 * Die Farbe Dunkellila, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine dunkle lila Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 52
 * - Grün: 21
 * - Blau: 57
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} DARKPURPLE - Eine dunkle lila Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante DARKPURPLE, um eine Linie in Dunkellila zu zeichnen
 * stroke(DARKPURPLE);
 */
const DARKPURPLE = makeColor(52, 21, 57);

/**
 * Die Farbe Rosa, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine rosa Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 255
 * - Grün: 141
 * - Blau: 161
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} PINK - Eine rosa Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante PINK, um eine Linie in Pink zu zeichnen
 * stroke(PINK);
 */
const PINK = makeColor(255, 141, 161);

/**
 * Die Farbe Braun, erstellt mit der Funktion `makeColor`.
 *
 * Diese Konstante repräsentiert eine braune Farbe, die mit den RGB-Werten erstellt wurde:
 * - Rot: 137
 * - Grün: 81
 * - Blau: 41
 * 
 * Der Alphawert (Transparenz) ist standardmäßig auf 100% (volle Deckkraft) gesetzt.
 *
 * @constant {Color} BROWN - Eine braune Farbe, die für Zeichnungen oder als Farbanwendung verwendet werden kann.
 *
 * @example
 * // Verwendet die Konstante BROWN, um eine Linie in Braun zu zeichnen
 * stroke(BROWN);
 */
const BROWN = makeColor(137, 81, 41);

//#endregion Farbkonstanten

/**
 * Erzeugt eine RGB-Farbe aus Prozentwerten für Rot, Grün und Blau und optionalem Alphawert.
 * 
 * Diese Funktion erstellt eine Farbe basierend auf den Prozentwerten für Rot, Grün und Blau.
 * Der Alphawert (Transparenz) kann ebenfalls als Prozentwert angegeben werden und ist standardmäßig auf 255 (vollständig undurchsichtig) gesetzt.
 * Die zurückgegebene Farbe wird als `Color`-Objekt dargestellt, das die RGB-Werte sowie den Alpha-Wert enthält.
 *
 * @param {number} red - Der Rotanteil der Farbe (0 bis 255).
 * @param {number} green - Der Grünanteil der Farbe (0 bis 255).
 * @param {number} blue - Der Blauanteil der Farbe (0 bis 255).
 * @param {number} [alpha=255] - Der Alphawert der Farbe (0 bis 255, standardmäßig 255).
 * @returns {Color} Ein `Color`-Objekt, das die RGB-Werte und den Alpha-Wert der Farbe enthält.
 *
 * @example
 * // Erstellt ein hellblaues Farbwert
 * const color = makeColor(0, 128, 255, 255);
 *
 * @example
 * // Erstellt eine mittlere Graufarbe
 * const gray = makeColor(128, 128, 128);
 */
function makeColor(red, green, blue, alpha = 255) {
  return new Color(red, green, blue, alpha);
}

document.addEventListener('DOMContentLoaded', () => setup?.());

/**
 * Erstellt ein HTML-Canvas-Element und fügt es dem Dokument hinzu.
 * 
 * Diese Funktion erzeugt ein `<canvas>`-Element mit den angegebenen Abmessungen 
 * und fügt es dem Dokument hinzu. Außerdem werden grundlegende Ereignisse wie
 * Mausbewegungen, Mausklicks und die Mausbetätigung verarbeitet. 
 * Sie stellt sicher, dass der Canvas in der Mitte der Seite angezeigt wird 
 * und setzt den Hintergrund auf Weiß.
 * 
 * @param {number} w - Die Breite des Canvas in Pixeln.
 * @param {number} h - Die Höhe des Canvas in Pixeln.
 *
 * @example
 * // Erstellt ein Canvas mit einer Breite von 800px und einer Höhe von 600px
 * createCanvas(800, 600);
 */
function createCanvas(w, h) {
  width = w;
  height = h;

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

  __2djs.canvas.addEventListener('click', () => {
    if (Object.hasOwn(window, 'mouseClicked')) {
      mouseClicked();
    }
  });

  __2djs.canvas.addEventListener('mousemove', function(event) {
    mouseX = event.x - __2djs.canvas.getBoundingClientRect().x;
    mouseY = event.y - __2djs.canvas.getBoundingClientRect().y;
    __2djs.mouseMoved = true;
  });

  __2djs.canvas.addEventListener('mousedown', function() {
    mouseIsPressed = true;
  });

  __2djs.canvas.addEventListener('mouseup', function() {
    mouseIsPressed = false;
  });

  __2djs.ctx = __2djs.canvas.getContext('2d');
  background(WHITE);

  __2djs.intervalCallback = () => {
    const startTime = performance.now();
    draw?.();
    if (__2djs.mouseMoved && Object.hasOwn(window, 'mouseMoved')) {
      mouseMoved();
    }
    frameCount++;
    deltaTime = performance.now() - startTime;
  };

  __2djs.intervalId = setInterval(__2djs.intervalCallback, 1000 / __2djs.frameRate);
}

/**
 * Setzt oder gibt die Anzahl der Frames pro Sekunde (FPS) für die Animation zurück.
 *
 * Wenn der Wert für `fps` angegeben wird, wird die Anzahl der Frames pro Sekunde
 * auf diesen Wert gesetzt und die Animation entsprechend angepasst. Ohne die Angabe
 * eines `fps` wird der aktuelle Wert der Frame-Rate zurückgegeben.
 *
 * - Wird `fps` auf `null` oder `undefined` gesetzt, wird der derzeitige Wert der Frame-Rate zurückgegeben.
 * - Wenn der `fps`-Wert bereits dem aktuellen Wert entspricht, wird nichts weiter unternommen.
 * - Wenn der `fps` geändert wird, wird die Aktualisierungsrate für die Frames angepasst.
 *
 * @param {number} [fps] - Die gewünschte Anzahl der Frames pro Sekunde. Wenn nicht angegeben, wird der aktuelle Wert zurückgegeben.
 * @returns {number|void} Gibt den aktuellen Frame-Rate-Wert zurück, wenn kein neuer Wert gesetzt wird. Andernfalls gibt die Funktion nichts zurück.
 *
 * @example
 * // Setzt die Frame-Rate auf 60 FPS
 * frameRate(60);
 *
 * @example
 * // Gibt die aktuelle Frame-Rate zurück
 * const currentFps = frameRate();
 */
function frameRate(fps) {
  if (fps === null || fps === undefined) {
    return __2djs.frameRate;
  }
  if (fps === __2djs.frameRate) {
    return;
  }
  __2djs.frameRate = fps;
  if (!__2djs.intervalId) {
    return;
  }
  clearInterval(__2djs.intervalId);
  __2djs.intervalId = setInterval(__2djs.intervalCallback, 1000 / fps);
}

/**
 * Setzt den Vollbildmodus der Zeichenfläche ein oder aus oder gibt den aktuellen Status zurück.
 *
 * Wenn `val` angegeben wird:
 * - Wenn `val` wahr (true) ist, wird der Vollbildmodus aktiviert und die Zeichenfläche geht in den Vollbildmodus.
 * - Wenn `val` falsch (false) ist, wird der Vollbildmodus deaktiviert und das Fenster verlässt den Vollbildmodus.
 *
 * Wenn `val` nicht angegeben wird, gibt die Funktion `true` zurück, wenn das Dokument im Vollbildmodus ist,
 * und `false`, wenn es nicht im Vollbildmodus ist.
 *
 * @param {boolean} [val] - Wenn `true`, wird der Vollbildmodus aktiviert; wenn `false`, wird er deaktiviert.
 *                          Wenn nicht angegeben, wird der aktuelle Vollbildstatus zurückgegeben.
 * @returns {boolean|void} - Gibt den aktuellen Vollbildstatus (true/false) zurück, wenn `val` nicht angegeben wird.
 *                           Gibt sonst nichts zurück (void), da der Vollbildmodus nur aktiviert oder deaktiviert wird.
 *
 * @example
 * // Aktiviert den Vollbildmodus für die Zeichenfläche
 * fullscreen(true);
 *
 * @example
 * // Deaktiviert den Vollbildmodus
 * fullscreen(false);
 *
 * @example
 * // Gibt zurück, ob das Dokument im Vollbildmodus ist
 * const isFullscreen = fullscreen();
 */
function fullscreen(val) {
  if (val === null || val === undefined) {
    return document.fullscreenElement !== null;
  } else if (val) {
    void __2djs.canvas.requestFullscreen();
  } else {
    void document.exitFullscreen();
  }
}

/**
 * Setzt die Hintergrundfarbe der Zeichenfläche.
 *
 * @param {Color} color - Die Farbe, die als Hintergrundfarbe gesetzt werden soll
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
 * @param {Color} color - Die Farbe zum Füllen von Formen, angegeben als Farbname (z. B. "red"),
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
 * Entfernt die Füllfarbe von gezeichneten Formen.
 *
 * Diese Funktion setzt die `fillStyle` des Kontextes auf `transparent`, wodurch gezeichnete Formen keine Füllfarbe mehr haben.
 * Sie wird häufig verwendet, wenn nur der Rand (Stroke) einer Form sichtbar sein soll, aber die Füllfarbe nicht angezeigt werden soll.
 *
 * @example
 * // Zeichnet ein Rechteck ohne Füllfarbe, nur der Rand wird sichtbar
 * noFill();
 * stroke(BLUE);
 * rectangle(50, 50, 150, 100);
 */
function noFill() {
  __2djs.ctx.fillStyle = 'transparent';
}

/**
 * Setzt die Farbe für Linien (Konturen) auf der Zeichenfläche.
 *
 * @param {Color} color - Die Farbe der Linien, angegeben als Farbname (z. B. "red"),
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

/**
 * Entfernt den Rand (Stroke) von gezeichneten Formen.
 *
 * Diese Funktion setzt die `strokeStyle` des Kontextes auf `transparent`, wodurch gezeichnete Formen keinen sichtbaren Rand mehr haben.
 * Sie wird häufig verwendet, wenn nur die Füllfarbe einer Form sichtbar sein soll, aber der Rand (Kontur) nicht angezeigt werden soll.
 *
 * @example
 * // Zeichnet einen Kreis ohne Rand
 * noStroke();
 * fill(RED);
 * circle(100, 100, 50);
 */
function noStroke() {
  __2djs.ctx.strokeStyle = 'transparent';
}

/**
 * Setzt die Strichbreite für gezeichnete Linien.
 *
 * Mit dieser Funktion kann die Breite von Linien, die auf der Zeichenfläche gezeichnet werden, geändert werden.
 * Der Parameter `width` bestimmt die Dicke der Linie in Pixeln.
 *
 * @param {number} width - Die gewünschte Strichbreite in Pixeln. Muss eine positive Zahl sein.
 *
 * @example
 * // Setzt die Strichbreite auf 5 Pixel
 * lineWidth(5);
 *
 * @example
 * // Setzt die Strichbreite auf 2 Pixel
 * lineWidth(2);
 */
function lineWidth(width) {
  __2djs.ctx.lineWidth = width;
}

/**
 * Zeichnet einen Punkt auf der Zeichenfläche.
 *
 * Diese Funktion zeichnet ein Quadrat, das als Punkt interpretiert wird,
 * an der angegebenen Position `(x, y)` auf der Zeichenfläche. Die Größe des Punktes
 * kann mit dem Parameter `size` festgelegt werden, der standardmäßig auf 1 Pixel gesetzt ist.
 *
 * @param {number} x - Die x-Koordinate des Punkts auf der Zeichenfläche.
 * @param {number} y - Die y-Koordinate des Punkts auf der Zeichenfläche.
 * @param {number} [size=1] - Die Größe des Punkts in Pixeln. Standardmäßig ist der Punkt 1 Pixel groß.
 *
 * @example
 * // Zeichnet einen Punkt bei den Koordinaten (50, 100) mit der Größe 5 Pixel
 * point(50, 100, 5);
 *
 * @example
 * // Zeichnet einen Punkt bei den Koordinaten (200, 200) mit der Standardgröße 1 Pixel
 * point(200, 200);
 */
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

/**
 * Zeichnet ein Dreieck auf der Zeichenfläche.
 *
 * Diese Funktion zeichnet ein Dreieck, das durch die drei angegebenen Punkte
 * `(x1, y1)`, `(x2, y2)` und `(x3, y3)` definiert ist. Es wird eine Linie
 * um das Dreieck gezogen, aber es wird nicht ausgefüllt.
 *
 * @param {number} x1 - Die x-Koordinate des ersten Punkts des Dreiecks.
 * @param {number} y1 - Die y-Koordinate des ersten Punkts des Dreiecks.
 * @param {number} x2 - Die x-Koordinate des zweiten Punkts des Dreiecks.
 * @param {number} y2 - Die y-Koordinate des zweiten Punkts des Dreiecks.
 * @param {number} x3 - Die x-Koordinate des dritten Punkts des Dreiecks.
 * @param {number} y3 - Die y-Koordinate des dritten Punkts des Dreiecks.
 *
 * @example
 * // Zeichnet ein Dreieck mit den Ecken bei (50, 50), (100, 50) und (75, 100)
 * triangle(50, 50, 100, 50, 75, 100);
 */
function triangle(x1, y1, x2, y2, x3, y3) {
  __2djs.ctx.save();

  __2djs.ctx.beginPath();
  __2djs.ctx.moveTo(x1, y1);
  __2djs.ctx.lineTo(x2, y2);
  __2djs.ctx.lineTo(x3, y3);
  __2djs.ctx.lineTo(x1, y1);
  __2djs.ctx.fill();
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
  __2djs.ctx.rotate(__2djs.rotation * __2djs.angleMode);
  __2djs.ctx.translate(size / -2, size / -2);
  __2djs.ctx.scale(size, size);

  __2djs.ctx.beginPath();
  __2djs.ctx.rect(0, 0, 1, 1);
  __2djs.ctx.fill();
  __2djs.ctx.stroke();

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
  __2djs.ctx.rotate(__2djs.rotation * __2djs.angleMode);
  __2djs.ctx.translate(width / -2, height / -2);
  __2djs.ctx.scale(width, height);

  __2djs.ctx.beginPath();
  __2djs.ctx.rect(0, 0, 1, 1);
  __2djs.ctx.fill();
  __2djs.ctx.restore();
  __2djs.ctx.stroke();
  
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
  __2djs.ctx.arc(x, y, radius, 0, TWO_PI, false);
  __2djs.ctx.fill();
  __2djs.ctx.stroke();

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
  __2djs.ctx.rotate(__2djs.rotation * __2djs.angleMode);

  __2djs.ctx.beginPath();
  __2djs.ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, TWO_PI);
  __2djs.ctx.fill();
  __2djs.ctx.stroke();

  __2djs.ctx.restore();
}

/**
 * Setzt die Schriftgröße für den Text auf der Zeichenfläche.
 *
 * Diese Funktion ändert die Größe des Texts, der auf der Zeichenfläche gezeichnet wird.
 * Der Parameter `size` gibt die gewünschte Schriftgröße in Pixeln an.
 *
 * @param {number} size - Die Schriftgröße in Pixeln, die für den Text verwendet werden soll.
 *
 * @example
 * // Setzt die Schriftgröße auf 30 Pixel
 * textSize(30);
 */
function textSize(size) {
  __2djs.textSize = size;
}

/**
 * Legt die Textausrichtung auf der Zeichenfläche fest.
 *
 * Diese Funktion ändert die Textausrichtung des 2D-Kontexts. Sie kann verwendet werden, um 
 * die Ausrichtung von Texten zu steuern (z. B. links, mittig, rechts).
 * 
 * @param {string} alignment - Die gewünschte Ausrichtung des Textes. Kann eine der folgenden Werte sein:
 *   - `LEFT`: Text wird links ausgerichtet.
 *   - `RIGHT`: Text wird rechts ausgerichtet.
 *   - `CENTER`: Text wird mittig ausgerichtet.
 * 
 * @see {@link LEFT}, {@link RIGHT}, {@link CENTER}
 * 
 * @example
 * // Setzt die Textausrichtung auf die Mitte
 * textAlign(CENTER);
 * 
 * @example
 * // Setzt die Textausrichtung auf links
 * textAlign(LEFT);
 */
function textAlign(alignment) {
  __2djs.ctx.textAlign = alignment;
}

/**
 * Zeichnet Text an einer angegebenen Position auf der Zeichenfläche.
 *
 * @param {string} text - Der Text, der auf der Zeichenfläche angezeigt werden soll.
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
 * Zeichnet ein Gitter auf der Zeichenfläche.
 *
 * Diese Funktion zeichnet ein Gitter auf der Zeichenfläche, das aus horizontalen und vertikalen Linien besteht.
 * Die Größe des Gitters wird durch die Parameter `sizeX` und `sizeY` bestimmt, die die Breite
 * und Höhe der Zellen im Gitter angeben.
 *
 * @param {number} sizeX - Die Breite jeder Zelle im Gitter in Pixeln.
 * @param {number} sizeY - Die Höhe jeder Zelle im Gitter in Pixeln.
 *
 * @example
 * // Zeichnet ein Gitter mit Zellen von 50x50 Pixeln
 * grid(50, 50);
 *
 * @example
 * // Zeichnet ein Gitter mit Zellen von 20x30 Pixeln
 * grid(20, 30);
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
 * Lädt ein Bild von einer angegebenen Datei-URL.
 *
 * Diese Funktion erstellt ein `HTMLImageElement` und setzt die Quelle (`src`) des Bildes auf den angegebenen `imagePath`.
 * Sobald das Bild erfolgreich geladen wurde, wird das `data-loaded`-Attribut des Bildes auf `true` gesetzt.
 *
 * @param {string} imagePath - Der Pfad zur Bilddatei, die geladen werden soll.
 * @returns {HTMLImageElement} Das geladene `HTMLImageElement`, das auf das Bild verweist.
 *
 * @example
 * // Lädt ein Bild von einer URL und gibt das Image-Element zurück
 * const img = loadImage('path/to/image.jpg');
 *
 * // Zugriff auf das geladene Bild
 * console.log(img.src); // Gibt den Pfad zur Bildquelle zurück
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
 * Zeichnet ein Bild auf der Zeichenfläche.
 *
 * Diese Funktion zeichnet ein Bild an einer angegebenen Position `(x, y)` mit der angegebenen Breite und Höhe.
 * Das Bild wird nur gezeichnet, wenn es vollständig geladen wurde. Die Funktion berücksichtigt auch eine mögliche Rotation des Bildes.
 *
 * @param {HTMLImageElement} image - Das Bild, das auf der Zeichenfläche gezeichnet werden soll. Es muss ein geladenes `HTMLImageElement` sein.
 * @param {number} x - Die x-Koordinate des Bildes auf der Zeichenfläche.
 * @param {number} y - Die y-Koordinate des Bildes auf der Zeichenfläche.
 * @param {number} [width] - Die Breite des Bildes. Wenn nicht angegeben, wird die Originalbreite des Bildes verwendet.
 * @param {number} [height] - Die Höhe des Bildes. Wenn nicht angegeben, wird die Originalhöhe des Bildes verwendet.
 *
 * @example
 * // Lädt ein Bild und zeichnet es auf der Zeichenfläche bei den Koordinaten (100, 100)
 * const img = loadImage('path/to/image.jpg');
 * image(img, 100, 100, 200, 150);
 *
 * @example
 * // Zeichnet ein Bild mit der Standardgröße (Originalgröße des Bildes) an der Position (50, 50)
 * image(img, 50, 50);
 */
function image(image, x, y, width, height) {
  if (image.dataset.loaded !== 'true') {
    return;
  }

  __2djs.ctx.save();

  __2djs.ctx.translate(x + (width ?? image.width) / 2, y + (height ?? image.height) / 2);
  __2djs.ctx.rotate(__2djs.rotation * __2djs.angleMode);
  __2djs.ctx.drawImage(image, -(width ?? image.width) / 2, -(height ?? image.height) / 2, width ?? image.width, height ?? image.height);

  __2djs.ctx.restore();
}

/**
 * Setzt den Winkelmodus für die Zeichenfläche.
 *
 * Diese Funktion ermöglicht es, den Winkelmodus zu ändern, entweder in Grad (`DEGREES`) oder in Bogenmaß (`RADIANS`).
 * Der Winkelmodus beeinflusst, wie Winkel in späteren Funktionen interpretiert werden (z. B. bei der Rotation).
 *
 * @param {number} mode - Der Modus, der den Winkeltyp festlegt.
 *   - `DEGREES` setzt den Modus auf Grad, wobei 360 Grad eine vollständige Drehung entspricht.
 *   - `RADIANS` setzt den Modus auf Bogenmaß, wobei 2π Bogenmaß eine vollständige Drehung entspricht.
 *
 * @example
 * // Setzt den Winkelmodus auf Grad
 * angleMode(DEGREES);
 *
 * // Setzt den Winkelmodus auf Bogenmaß
 * angleMode(RADIANS);
 */
function angleMode(mode) {
  if (mode === DEGREES) {
    __2djs.angleMode = PI / 180;
  } else if (mode === RADIANS) {
    __2djs.angleMode = 1;
  }
}

/**
 * Setzt oder gibt den aktuellen Rotationswinkel zurück.
 *
 * Wenn ein Wert angegeben wird, wird der Rotationswinkel auf diesen Wert gesetzt. Andernfalls wird der aktuelle Rotationswinkel zurückgegeben.
 * Die Rotation erfolgt in Grad, wenn der Winkelmaß-Modus auf `DEGREES` gesetzt ist, oder in Radiant, wenn der Winkelmaß-Modus auf `RADIANS` gesetzt ist.
 *
 * @param {number} [degrees] - Der Rotationswinkel in Grad oder Radiant, je nach aktuellem `angleMode`.
 *                             Wenn kein Wert angegeben wird, gibt die Funktion den aktuellen Rotationswinkel zurück.
 * @returns {number|void} Der aktuelle Rotationswinkel, wenn kein Wert übergeben wird, andernfalls wird nichts zurückgegeben.
 *
 * @example
 * // Setzt den Rotationswinkel auf 45 Grad
 * rotate(45);
 *
 * // Gibt den aktuellen Rotationswinkel zurück
 * const currentRotation = rotate();
 */
function rotate(degrees) {
  if (degrees === undefined) {
    return __2djs.rotation;
  }
  __2djs.rotation = degrees;
}

/**
 * Erhöht den aktuellen Rotationswinkel um einen bestimmten Wert.
 *
 * Diese Funktion fügt dem aktuellen Rotationswinkel einen angegebenen Wert hinzu. Wenn der Rotationswinkel 360 Grad oder mehr erreicht, wird er auf 0 zurückgesetzt, um eine kontinuierliche Rotation zu ermöglichen.
 * Der Wert wird in Grad angegeben, wenn der Winkelmaß-Modus auf `DEGREES` gesetzt ist, oder in Radiant, wenn der Winkelmaß-Modus auf `RADIANS` gesetzt ist.
 *
 * @param {number} degrees - Der Wert, um den der Rotationswinkel erhöht werden soll, in Grad oder Radiant.
 *
 * @example
 * // Erhöht den Rotationswinkel um 45 Grad
 * rotateAdd(45);
 */
function rotateAdd(degrees) {
  if ((__2djs.angleMode === DEGREES && __2djs.rotation >= 360) || (__2djs.angleMode === RADIANS && __2djs.rotation >= TWO_PI)) {
    __2djs.rotation = 0;
  }
  __2djs.rotation += degrees;
}

function stopDraw() {
  clearInterval(__2djs.intervalId);
}

/**
 * Gibt eine zufällige Zahl oder ein zufälliges Element zurück.
 *
 * Diese Funktion gibt eine zufällige Zahl im angegebenen Bereich oder ein zufälliges Element aus einem Array zurück.
 * Wenn ein Array als erster Parameter übergeben wird, wird ein zufälliges Element daraus gewählt.
 * Andernfalls wird eine zufällige Zahl im Bereich von `min` bis `max` zurückgegeben.
 *
 * @template T
 * @param {number|Array<T>} min - Wenn `min` eine Zahl ist, gibt sie den unteren Wert des Bereichs an.
 *   Wenn `min` ein Array ist, wird ein zufälliges Element aus dem Array zurückgegeben.
 * @param {number} [max] - Wenn `min` eine Zahl ist, gibt `max` den oberen Wert des Bereichs an. Wird `min` als Array übergeben, wird dieser Parameter ignoriert.
 * @returns {number|T} - Eine zufällige Zahl im angegebenen Bereich oder ein zufälliges Element aus dem Array.
 *
 * @example
 * // Gibt eine zufällige Zahl im Bereich von 5 bis 10 zurück
 * const randomNumber = random(5, 10);
 *
 * // Gibt ein zufälliges Element aus dem Array zurück
 * const randomElement = random([1, 2, 3, 4, 5]);
 */
function random(min, max) {
  if (Array.isArray(min)) {
    return min[Math.floor(Math.random() * min.length)];
  }
  return Math.random() * (max - min) + min;
}

/**
 * Mischt die Elemente eines Arrays zufällig.
 *
 * Diese Funktion verwendet den Fisher-Yates-Algorithmus, um die Elemente eines Arrays in zufälliger Reihenfolge zu mischen.
 * Nach dem Aufruf wird das Original-Array in zufälliger Reihenfolge verändert.
 *
 * @param {Array} array - Das Array, dessen Elemente gemischt werden sollen.
 * @returns {void} - Die Funktion gibt nichts zurück. Das ursprüngliche Array wird direkt verändert.
 *
 * @example
 * // Ein Array mit Zahlen
 * const numbers = [1, 2, 3, 4, 5];
 *
 * // Mischt das Array zufällig
 * shuffle(numbers);
 *
 * // Das Array ist nun zufällig gemischt, z. B. [3, 5, 1, 2, 4]
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Berechnet den Sinus eines Wertes.
 *
 * Diese Funktion gibt den Sinus des angegebenen Wertes zurück. Der Wert sollte im gleichen Winkelmaß wie das aktuelle `angleMode` (Radiant oder Grad) angegeben werden.
 * Der Sinus ist eine mathematische Funktion, die in der Trigonometrie verwendet wird, um die Verhältnisse in einem rechtwinkligen Dreieck zu beschreiben.
 *
 * @param {number} value - Der Winkelwert, für den der Sinus berechnet werden soll.
 * @returns {number} Der Sinus des angegebenen Wertes.
 *
 * @example
 * // Berechnet den Sinus eines Winkels von 90 Grad (im Radiantmaß)
 * const result = sin(PI / 2);
 */
function sin(value) {
  return Math.sin(value);
}

/**
 * Berechnet den Kosinus eines Wertes.
 *
 * Diese Funktion gibt den Kosinus des angegebenen Wertes zurück. Der Wert sollte im gleichen Winkelmaß wie das aktuelle `angleMode` (Radiant oder Grad) angegeben werden.
 * Der Kosinus ist eine mathematische Funktion, die in der Trigonometrie verwendet wird, um die Verhältnisse in einem rechtwinkligen Dreieck zu beschreiben.
 *
 * @param {number} value - Der Winkelwert, für den der Kosinus berechnet werden soll.
 * @returns {number} Der Kosinus des angegebenen Wertes.
 *
 * @example
 * // Berechnet den Kosinus eines Winkels von 0 Grad (im Radiantmaß)
 * const result = cos(0);
 */
function cos(value) {
  return Math.cos(value);
}
