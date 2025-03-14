const startLine = 30;
const finishLine = 400;

const spacing = 20;
const segmentSize = 25;
const eyeSize = 7;

const numCaterpillars = 3;
const caterpillarEnds = [];

let isRunning = false;

function setup() {
  createCanvas(500, 500);

  frameRate(3);
  textAlign(CENTER);

  for (let i = 0; i < numCaterpillars; i++) {
    caterpillarEnds.push(startLine);
  }
}

function drawCaterpillar(x, y, segments) {
  for (let i = 0; i < segments; i++) {
    fill(MAGENTA);
    stroke(BLACK);
    lineWidth(1);
    circle(x, y, segmentSize);

    x += spacing;
  }

  fill(BLACK);
  stroke(WHITE);
  lineWidth(3);
  circle(x, y - eyeSize * 2, eyeSize);
  circle(x - eyeSize * 2, y - eyeSize * 2, eyeSize);
}

function drawCaterpillars() {
  for (let i = 0; i < numCaterpillars; i++) {
    const padding = height / numCaterpillars;
    const y = (i + 0.5) * padding;

    const crawl = random(3, 5);

    drawCaterpillar(caterpillarEnds[i], y, crawl);
  }
}

function moveCaterpillars() {
  for (let i = 0; i < numCaterpillars; i++) {
    const move = random(5, 30);
    caterpillarEnds[i] += move;
  }
}

function draw() {
  background(BROWN);

  noStroke();

  fill(BLACK);
  rect(startLine, 0, 5, height);

  fill(LIME);
  rect(finishLine, 0, 20, height);
  
  if (isRunning) {
    moveCaterpillars();
  }

  drawCaterpillars();

  circX += spacing;

  if (circX > finishLine) {
    stopDraw();
  }
}

function mouseClicked() {
  isRunning = true;
}
