class Shader {
  #id;

  constructor() {

  }

  compile(vertexSource, fragmentSource) {
    const vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader, vertexSource);
    glCompileShader(vertexShader);

    const fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader, fragmentSource);
    glCompileShader(fragmentShader);

    this.#id = glCreateProgram();
    glAttachShader(this.#id, vertexShader);
    glAttachShader(this.#id, fragmentShader);
    glLinkProgram(this.#id);
  }

  setMatrix4(name, matrix, useShader) {
    if (useShader) {
      this.use();
    }
    glUniformMatrix4fv(glGetUniformLocation(this.#id, name), false, matrix);
  }

  use() {
    glUseProgram(this.#id);
  }
}
