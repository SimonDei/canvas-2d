const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
document.body.appendChild(canvas);
setCanvas(canvas);

const vertexSource = await fetch('./vertex.glsl').then(res => res.text());
const fragmentSource = await fetch('./fragment.glsl').then(res => res.text());

const shroom = new Image();
shroom.src = './mushroom.png';
await shroom.decode();

const shroomTexture = new Texture(shroom);
const shader = new Shader(vertexSource, fragmentSource);
const spriteRenderer = new SpriteRenderer(shader);

glViewport(0, 0, 800, 600);
glEnable(GL_BLEND);
glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

glClearColor(0, 0, 0, 1);

setInterval(() => {
  glClear(GL_COLOR_BUFFER_BIT);

  spriteRenderer.drawSprite(shroomTexture, 100, 100, 200, 200, Math.PI / 4, 0.5, 0.5, 0);
}, 60 / 1000);
