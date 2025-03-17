class Shader {
  #id;

  constructor(vertexShaderSource, fragmentShaderSource) {
    this.compile(vertexShaderSource, fragmentShaderSource);
  }

  compile(vertexSource, fragmentSource) {
    const vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader, vertexSource);
    glCompileShader(vertexShader);
    console.log(glGetShaderInfoLog(vertexShader));

    const fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader, fragmentSource);
    glCompileShader(fragmentShader);
    console.log(glGetShaderInfoLog(fragmentShader));

    this.#id = glCreateProgram();
    glAttachShader(this.#id, vertexShader);
    glAttachShader(this.#id, fragmentShader);
    glLinkProgram(this.#id);
    console.log(glGetProgramInfoLog(this.#id));
  }

  setVector3(name, vector, useShader) {
    if (useShader) {
      this.use();
    }
    glUniform3fv(glGetUniformLocation(this.#id, name), vector);
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
