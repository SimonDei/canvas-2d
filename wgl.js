function createProgram() {
  const program = glCreateProgram();

  const vertexShader = glCreateShader(GL_VERTEX_SHADER);
  const vertexSource = `#version 300 es
    
    in vec4 position;
    in vec4 color;
    in vec2 texCoord;
    
    uniform mat4 projection;
    uniform mat4 model;
    
    out vec4 vColor;
    out vec2 vTexCoord;
    
    void main() {
      gl_Position = projection * model * position;
      vColor = color;
      vTexCoord = texCoord;
    }
  `;

  glShaderSource(vertexShader, vertexSource);
  glCompileShader(vertexShader);

  const fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
  const fragmentSource = `#version 300 es
    precision mediump float;
    
    in vec4 vColor;
    in vec2 vTexCoord;
    
    uniform sampler2D tex;
    
    out vec4 fragColor;
    
    void main() {
      fragColor = texture(tex, vTexCoord);
    }
  `;

  glShaderSource(fragmentShader, fragmentSource);
  glCompileShader(fragmentShader);

  glAttachShader(program, vertexShader);
  glAttachShader(program, fragmentShader);

  glLinkProgram(program);

  return program;
}

function setProjectionMatrix(width, height, program) {
  let orthoMatrix = glMatrix.mat4.create();
  glMatrix.mat4.ortho(orthoMatrix, 0, width, height, 0, -1, 1);

  glUseProgram(program);

  const projectionLocation = glGetUniformLocation(program, 'projection');
  glUniformMatrix4fv(projectionLocation, false, orthoMatrix);

  glUseProgram(0);
}

let rectangleArrayBuffer;

function drawRectangle(x, y, width, height, r, g, b, rotation, program) {
  glUseProgram(program);

  let modelMatrix = glMatrix.mat4.create();
  glMatrix.mat4.translate(modelMatrix, modelMatrix, glMatrix.vec3.fromValues(x + width / 2, y + height / 2, 0));
  glMatrix.mat4.rotate(modelMatrix, modelMatrix, rotation, glMatrix.vec3.fromValues(0, 0, 1));
  glMatrix.mat4.translate(modelMatrix, modelMatrix, glMatrix.vec3.fromValues(-width / 2, -height / 2, 0));
  glMatrix.mat4.scale(modelMatrix, modelMatrix, glMatrix.vec3.fromValues(width, height, 1));

  const modelLocation = glGetUniformLocation(program, 'model');
  glUniformMatrix4fv(modelLocation, false, modelMatrix);

  if (!rectangleArrayBuffer) {
    rectangleArrayBuffer = glGenVertexArray();
    glBindVertexArray(rectangleArrayBuffer);
  } else {
    glBindVertexArray(rectangleArrayBuffer);
    glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_SHORT, 0);
    glBindVertexArray(0);
    glUseProgram(0);
    return;
  }

  const vertices = new Float32Array([
    0, 1, 0, 1, r, g, b, 1, 0, 0,  // oben links
    1, 1, 0, 1, r, g, b, 1, 1, 0,  // oben rechts
    0, 0, 0, 1, r, g, b, 1, 0, 1,  // unten links
    1, 0, 0, 1, r, g, b, 1, 1, 1   // unten rechts
  ]);

  const vertexBuffer = glGenBuffer();
  glBindBuffer(GL_ARRAY_BUFFER, vertexBuffer);
  glBufferData(GL_ARRAY_BUFFER, vertices, GL_STATIC_DRAW);

  const positionLocation = glGetAttribLocation(program, 'position');
  glVertexAttribPointer(positionLocation, 4, GL_FLOAT, false, 40, 0);
  glEnableVertexAttribArray(positionLocation);

  const colorLocation = glGetAttribLocation(program, 'color');
  glVertexAttribPointer(colorLocation, 4, GL_FLOAT, false, 40, 16);
  glEnableVertexAttribArray(colorLocation);

  const texCoordLocation = glGetAttribLocation(program, 'texCoord');
  glVertexAttribPointer(texCoordLocation, 2, GL_FLOAT, false, 40, 32);
  glEnableVertexAttribArray(texCoordLocation);

  const indices = new Uint16Array([
    0, 1, 2,
    1, 3, 2
  ]);

  const indexBuffer = glGenBuffer();
  glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, indexBuffer);
  glBufferData(GL_ELEMENT_ARRAY_BUFFER, indices, GL_STATIC_DRAW);

  glBindVertexArray(0);
  glUseProgram(0);
}

document.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  document.body.appendChild(canvas);
  setCanvas(canvas);

  glEnable(GL_BLEND);
  glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);

  glClearColor(0, 0.5, 1, 1);

  const program = createProgram();
  setProjectionMatrix(800, 600, program);

  let rotation = 0;

  const img = new Image();
  img.src = './mushroom.png';
  await img.decode();

  const texture = glGenTexture();
  glBindTexture(GL_TEXTURE_2D, texture);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR_MIPMAP_LINEAR);
  glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);

  glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, img.width, img.height, 0, GL_RGBA, GL_UNSIGNED_BYTE, img);
  glGenerateMipmap(GL_TEXTURE_2D);

  setInterval(() => {
    glClear(GL_COLOR_BUFFER_BIT);

    drawRectangle(100, 100, 100, 100, 1, 0, 0, rotation, program);
    // drawRectangle(300, 300, 100, 100, 1, 0, 0, rotation, program);

    rotation += 0.01;
  }, 60 / 1000);
});
