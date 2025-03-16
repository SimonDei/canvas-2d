const screenWidth = 700;
const screenHeight = 500;

const tubeWidth = 20;
const tubeCount = 100;
const tubeSpacing = 100;
const tubeGap = 150;
const minTubeHeight = 25;
const maxTubeHeight = screenHeight - tubeGap - minTubeHeight;
const tubePrevHeightMaxDiff = 150;

const tubes = [];

const birdWidth = 20;
const birdHeight = 20;
let birdX = 50;
let birdY = screenHeight / 2 - 10;
let birdVelocity = 0;
const birdAcceleration = 0.33;
const birdAccelerationUp = -7.5;
const birdMaxVelocity = 10;

let screenXOffset = 0;
const scrollSpeed = 1.25;

let playerScore = 0;
let isRunning = false;
let gameOver = false;

function setup() {
  createCanvas(screenWidth, screenHeight);

  let prevHeight = 0;

  for (let i = 0; i < tubeCount; i++) {
    const heightTop = min(max(minTubeHeight, prevHeight + random(-tubePrevHeightMaxDiff, tubePrevHeightMaxDiff)), maxTubeHeight);
    const x = 150 + (i * tubeSpacing);

    tubes.push({ x, heightTop });

    prevHeight = heightTop;
  }
  
  textSize(30);
  textAlign(CENTER);
}

function checkBirdCollision() {
  if (birdY < 0 || birdY > height) {
    gameOver = true;
  }

  for (const tube of tubes) {
    if (birdX + 20 > tube.x - screenXOffset && birdX < tube.x - screenXOffset + 20) {
      if (birdY < tube.heightTop || birdY + 20 > tube.heightTop + tubeGap) {
        gameOver = true;
      }
    }
  }

  if (gameOver) {
    resetGame();
  }
}

function calcPlayerScore() {
  let newScore = 0;
  for (const tube of tubes) {
    if (tube.x - screenXOffset < birdX) {
      newScore++;
    }
  }
  playerScore = newScore;
}

function drawTube(x, heightTop) {
  fill(YELLOW);
  rect(x - screenXOffset, 0, tubeWidth, heightTop);

  fill(YELLOW);
  rect(x - screenXOffset, heightTop + tubeGap, tubeWidth, height - heightTop - tubeGap);
}

function resetGame() {
  isRunning = false;
  playerScore = 0;
  birdY = height / 2 - birdHeight / 2;
  birdVelocity = 0;
  screenXOffset = 0;
}

function drawTubes() {
  const tubesToDraw = tubes.filter(tube => tube.x - screenXOffset > -20 && tube.x - screenXOffset < width + 20);

  for (const tube of tubesToDraw) {
    drawTube(tube.x, tube.heightTop);
  }
}

function drawBird() {
  if (birdVelocity > 0) {
    rotate(PI / 8);
  } else if (birdVelocity < 0) {
    rotate(-PI / 8);
  }

  fill(RED);
  rect(birdX, birdY, birdWidth, birdHeight);

  rotate(0);
}

function drawPlayerScore() {
  fill(BLACK);
  text(playerScore, 20, 10);
}

function draw() {
  background(SKYBLUE);

  noStroke();
  drawBird();

  stroke(BLACK);
  drawTubes();

  calcPlayerScore();
  drawPlayerScore();

  if (gameOver) {
    fill(BLACK);
    text('Game Over!', width / 2, height / 2);
    return;
  }

  if (!isRunning) {
    return;
  }
  
  checkBirdCollision();

  birdY += birdVelocity;
  birdVelocity = min(birdVelocity + birdAcceleration, birdMaxVelocity);

  screenXOffset += scrollSpeed;
}

function keyPressed(key) {
  if (key === " ") {
    if (!isRunning) {
      gameOver = false;
      isRunning = true;
    }

    birdVelocity = birdAccelerationUp;
  }
}
