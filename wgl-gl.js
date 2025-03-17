/** @type {WebGL2RenderingContext} */
let gl = null;

const GL_DEPTH_TEST = 0x0b71;
const GL_BLEND = 0x0be2;
const GL_SRC_ALPHA = 0x0302;
const GL_ONE_MINUS_SRC_ALPHA = 0x0303;
const GL_DST_ALPHA = 0x0304;
const GL_ONE_MINUS_DST_ALPHA = 0x0305;
const GL_VERTEX_SHADER = 0x8b31;
const GL_FRAGMENT_SHADER = 0x8b30;
const GL_ARRAY_BUFFER = 0x8892;
const GL_ELEMENT_ARRAY_BUFFER = 0x8893;
const GL_STATIC_DRAW = 0x88e4;
const GL_POINTS = 0x0000;
const GL_LINES = 0x0001;
const GL_TRIANGLES = 0x0004;
const GL_COLOR_BUFFER_BIT = 0x4000;
const GL_DEPTH_BUFFER_BIT = 0x0100;
const GL_UNSIGNED_BYTE = 0x1401;
const GL_UNSIGNED_SHORT = 0x1403;
const GL_FLOAT = 0x1406;
const GL_TEXTURE_2D = 0x0de1;
const GL_TEXTURE0 = 0x84c0;
const GL_TEXTURE1 = 0x84c1;
const GL_TEXTURE_MIN_FILTER = 0x2801;
const GL_TEXTURE_MAG_FILTER = 0x2800;
const GL_NEAREST = 0x2600;
const GL_LINEAR = 0x2601;
const GL_LINEAR_MIPMAP_LINEAR = 0x2703;
const GL_TEXTURE_WRAP_S = 0x2802;
const GL_TEXTURE_WRAP_T = 0x2803;
const GL_REPEAT = 0x2901;
const GL_MIRRORED_REPEAT = 0x8370;
const GL_CLAMP_TO_EDGE = 0x812f;
const GL_RGB = 0x1907;
const GL_RGBA = 0x1908;

function setCanvas(canvas) {
  gl = canvas.getContext('webgl2');
}

//#region Basic Functions

function glClearColor(r, g, b, a) {
  gl.clearColor(r, g, b, a);
}

function glClear(mask) {
  gl.clear(mask);
}

function glEnable(cap) {
  gl.enable(cap);
}

function glDisable(cap) {
  gl.disable(cap);
}

function glViewport(x, y, width, height) {
  gl.viewport(x, y, width, height);
}

function glBlendFunc(sfactor, dfactor) {
  gl.blendFunc(sfactor, dfactor);
}

function glDrawArrays(mode, first, count) {
  gl.drawArrays(mode, first, count);
}

function glDrawElements(mode, count, type, offset) {
  gl.drawElements(mode, count, type, offset);
}

function glDrawArraysInstanced(mode, first, count, instanceCount) {
  gl.drawArraysInstanced(mode, first, count, instanceCount);
}

function glDrawElementsInstanced(mode, count, type, offset, instanceCount) {
  gl.drawElementsInstanced(mode, count, type, offset, instanceCount);
}

function glVertexAttribDivisor(index, divisor) {
  gl.vertexAttribDivisor(index, divisor);
}

//#endregion

//#region Program und Shader

function glCreateProgram() {
  return gl.createProgram();
}

function glGetProgramInfoLog(program) {
  return gl.getProgramInfoLog(program);
}

function glCreateShader(type) {
  return gl.createShader(type);
}

function glShaderSource(shader, source) {
  gl.shaderSource(shader, source);
}

function glCompileShader(shader) {
  gl.compileShader(shader);
}

function glGetShaderParameter(shader, pname) {
  gl.getShaderParameter(shader, pname);
}

function glGetShaderInfoLog(shader) {
  return gl.getShaderInfoLog(shader);
}

function glAttachShader(program, shader) {
  gl.attachShader(program, shader);
}

function glLinkProgram(program) {
  gl.linkProgram(program);
}

function glUseProgram(program) {
  gl.useProgram(!program ? null : program);
}

function glGetAttribLocation(program, name) {
  return gl.getAttribLocation(program, name);
}

function glGetUniformLocation(program, name) {
  return gl.getUniformLocation(program, name);
}

//#endregion

//#region Program Attributes and Uniforms

function glUniform1f(location, x) {
  gl.uniform1f(location, x);
}

function glUniform2f(location, x, y) {
  gl.uniform2f(location, x, y);
}

function glUniform3f(location, x, y, z) {
  gl.uniform3f(location, x, y, z);
}

function glUniform4f(location, x, y, z, w) {
  gl.uniform4f(location, x, y, z, w);
}

function glUniform1i(location, x) {
  gl.uniform1i(location, x);
}

function glUniform2i(location, x, y) {
  gl.uniform2i(location, x, y);
}

function glUniform2fv(location, value) {
  gl.uniform2fv(location, value);
}

function glUniform3i(location, x, y, z) {
  gl.uniform3i(location, x, y, z);
}

function glUniform3fv(location, value) {
  gl.uniform3fv(location, value);
}

function glUniform4i(location, x, y, z, w) {
  gl.uniform4i(location, x, y, z, w);
}

function glUniformMatrix4fv(location, transpose, value) {
  gl.uniformMatrix4fv(location, transpose, value);
}

function glVertexAttribPointer(index, size, type, normalized, stride, offset) {
  gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
}

function glEnableVertexAttribArray(index) {
  gl.enableVertexAttribArray(index);
}

//#endregion

//#region Vertex Buffer Objects

function glGenBuffer() {
  return gl.createBuffer();
}

function glBindBuffer(target, buffer) {
  gl.bindBuffer(target, !buffer ? null : buffer);
}

function glBufferData(target, data, usage) {
  gl.bufferData(target, data, usage);
}

function glBufferSubData(target, offset, data) {
  gl.bufferSubData(target, offset, data);
}

//#endregion

//#region Vertex Array Objects

function glGenVertexArray() {
  return gl.createVertexArray();
}

function glBindVertexArray(array) {
  gl.bindVertexArray(!array ? null : array);
}

//#endregion

//#region Textures

function glTexParameteri(target, pname, param) {
  gl.texParameteri(target, pname, param);
}

function glTexParameterf(target, pname, param) {
  gl.texParameterf(target, pname, param);
}

function glGenTexture() {
  return gl.createTexture();
}

function glBindTexture(target, texture) {
  gl.bindTexture(target, !texture ? null : texture);
}

function glActiveTexture(texture) {
  gl.activeTexture(texture);
}

function glTexImage2D(target, level, internalformat, width, height, border, format, type, data) {
  gl.texImage2D(target, level, internalformat, width, height, border, format, type, data);
}

function glGenerateMipmap(target) {
  gl.generateMipmap(target);
}

//#endregion
