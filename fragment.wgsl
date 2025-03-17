@fragment
fn fragment_main(input: VOutput) -> @location(0) vec4f {
  return textureSample(fTexture, fSampler, input.texCoord);
}
