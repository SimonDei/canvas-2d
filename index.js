const flowers = [];
let img = null;
let bitmap = null;
let rot1 = 0;

function setup() {
  createCanvas(1000, 1000 * 9 / 16);

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

  bitmap = new DrawImage(100, 100);
  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      bitmap.set(x, y, random([GRAY, ORANGE, YELLOW, BLUE, TEAL, PURPLE, PINK]));
    }
  }

  bitmap.scale(3);

  bitmap.update();
}

function draw() {
  background(BLACK);

  noStroke();

  for (const flower of flowers) {
    fill(flower.color);

    for (let i = 0; i < 360 / flower.pedals; i++) {
      rotate(360 / flower.pedals * i);
      ellipse(flower.x, flower.y, flower.size, flower.size / 2);
    }

    fill(GREEN);
    circle(flower.x, flower.y, 10);
  }

  rot1 += deltaTime * 0.5;
  rotate(rot1);

  bitmap.draw(200 + sin(frameCount * 0.04) * 100, 200 + cos(frameCount * 0.04) * 100);
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
