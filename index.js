import { background, createCanvas, fill, RED, BLACK, rotate, GREEN, ellipse, circle, random, BLUE, width, height, draw, GRAY, ORANGE, YELLOW, TEAL, PURPLE, PINK } from './2d.js';

createCanvas();

const flowers = [];

for (let i = 0; i < 6; i++) {
  flowers.push({
    x: random(50, width() - 50),
    y: random(50, height() - 50),
    size: random(25, 50),
    pedals: random([4, 5, 6, 8]),
    color: random([RED, GRAY, ORANGE, YELLOW, BLUE, TEAL, PURPLE, PINK])
  });
}

draw(() => {
  background(BLACK);

  for (const flower of flowers) {
    fill(flower.color);

    for (let i = 0; i < 360 / flower.pedals; i++) {
      rotate(i * 360 / flower.pedals);
      ellipse(flower.x, flower.y, flower.size, flower.size / 2);
    }

    fill(GREEN);
    circle(flower.x, flower.y, 15);
  }
});
