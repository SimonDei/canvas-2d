class SpriteRenderer {
  #shader;
  #vao;

  constructor(shader) {
    this.#shader = shader;
    this.init();
  }

  init() {
    const vertices = new Float32Array([
      // pos      // tex
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 0.0,

      0.0, 1.0, 0.0, 1.0,
      1.0, 1.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 0.0
    ]);

    this.#vao = glGenVertexArray();
    glBindVertexArray(this.#vao);

    const projection = glMatrix.mat4.create();
    glMatrix.mat4.ortho(projection, 0, 800, 600, 0, -1, 1);

    this.#shader.setMatrix4('projection', projection, true);

    const vbo = glGenBuffer();
    glBindBuffer(GL_ARRAY_BUFFER, vbo);
    glBufferData(GL_ARRAY_BUFFER, vertices, GL_STATIC_DRAW);

    glEnableVertexAttribArray(0);
    glVertexAttribPointer(0, 4, GL_FLOAT, false, 16, 0);

    glBindVertexArray(0);
    glBindBuffer(GL_ARRAY_BUFFER, 0);
  }

  drawSprite(texture, x, y, width, height, rotate, r, g, b) {
    this.#shader.use();

    const model = glMatrix.mat4.create();
    glMatrix.mat4.translate(model, model, glMatrix.vec3.fromValues(x, y, 0));
    glMatrix.mat4.translate(model, model, glMatrix.vec3.fromValues(0.5 * width, 0.5 * height, 0));
    glMatrix.mat4.rotate(model, model, rotate, glMatrix.vec3.fromValues(0, 0, 1));
    glMatrix.mat4.translate(model, model, glMatrix.vec3.fromValues(-0.5 * width, -0.5 * height, 0));
    glMatrix.mat4.scale(model, model, glMatrix.vec3.fromValues(width, height, 1));

    this.#shader.setMatrix4('model', model);
    this.#shader.setVector3('spriteColor', glMatrix.vec3.fromValues(r, g, b));

    glActiveTexture(GL_TEXTURE0);
    texture.bind();

    glBindVertexArray(this.#vao);
    glDrawArrays(GL_TRIANGLES, 0, 6);
    glBindVertexArray(0);
  }
}
