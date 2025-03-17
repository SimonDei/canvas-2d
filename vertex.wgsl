struct VInput {
  @location(0) position: vec4f,
  // @location(1) color: vec4f,
  @location(1) texCoord: vec2f
}

struct VModel {
  position: vec2f,
  scale: vec2f,
  rotation: f32
}

struct VOutput {
  @builtin(position) position: vec4f,
  //@location(0) color: vec4f,
  @location(0) texCoord: vec2f
}

@group(0) @binding(0) var<uniform> u_projection: mat4x4f;
@group(0) @binding(1) var<uniform> u_transform: VModel;
@group(0) @binding(2) var fSampler: sampler;
@group(0) @binding(3) var fTexture: texture_2d<f32>;

fn identity() -> mat4x4f {
  return mat4x4f(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
}

fn translate(iMat: mat4x4f, x: f32, y: f32) -> mat4x4f {
  return iMat * mat4x4f(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    x, y, 0.0, 1.0
  );
}

fn rotateZ(iMat: mat4x4f, rotation: f32) -> mat4x4f {
  return iMat * mat4x4f(
    cos(rotation), -sin(rotation), 0.0, 0.0,
    sin(rotation), cos(rotation), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
}

fn scale(iMat: mat4x4f, x: f32, y: f32) -> mat4x4f {
  return iMat * mat4x4f(
    x, 0.0, 0.0, 0.0,
    0.0, y, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
}

@vertex
fn vertex_main(input: VInput) -> VOutput {
  var model: mat4x4f = identity();

  model = translate(model, u_transform.position.x + u_transform.scale.x / 2, u_transform.position.y + u_transform.scale.y / 2);
  model = rotateZ(model, u_transform.rotation);
  model = translate(model, -u_transform.scale.x / 2, -u_transform.scale.y / 2);
  model = scale(model, u_transform.scale.x, u_transform.scale.y);
  
  var output: VOutput;
  output.position = u_projection * model * input.position;
  //output.color = input.color;
  output.texCoord = input.texCoord;
  return output;
}
