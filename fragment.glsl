#version 300 es
precision mediump float;

in vec2 texCoords;

out vec4 color;

uniform sampler2D image;
uniform vec3 spriteColor;

void main() {
  color = vec4(spriteColor, 1.0) * texture(image, texCoords);
}
