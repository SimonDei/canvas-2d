createCanvas(800, 800 * 9 / 16);

const flowers = [];
let img = null;

function setup() {
  img = loadImage('./mushroom.png');

  for (let i = 0; i < 6; i++) {
    flowers.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      size: random(25, 50),
      pedals: random([4, 5, 6, 8]),
      color: random([RED, GRAY, ORANGE, YELLOW, BLUE, TEAL, PURPLE, PINK])
    });
  }
}

function draw() {
  background(BLACK);

  fill(WHITE);
  text(deltaTime.toFixed(2), 10, 10);

  for (const flower of flowers) {
    fill(flower.color);

    for (let i = 0; i < 360 / flower.pedals; i++) {
      rotate(360 / flower.pedals * i);
      ellipse(flower.x, flower.y, flower.size, flower.size / 2);
    }

    fill(GREEN);
    circle(flower.x, flower.y, 10);
  }

  rotate(0);
  imageScaled(img, 50, 50, 100, 100);
}

function mouseClicked() {
  flowers.push({
    x: mouseX,
    y: mouseY,
    size: random(25, 50),
    pedals: random([4, 5, 6, 8]),
    color: random([RED, GRAY, ORANGE, YELLOW, BLUE, TEAL, PURPLE, PINK])
  });
}

function mouseMoved() {
  if (mouseX > width / 2) {
    text('HALLO', 50, 50);
  }
}
