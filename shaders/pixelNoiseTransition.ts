import { frag } from "./Tags";

export const PIXEL_NOISE_SHADER = frag`
    // precision mediump float;

    uniform shader image1;
   
    uniform float progress;
    uniform float cellPixelSize;

    //http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
    float rand(vec2 co){
      float a = 12.9898;
      float b = 78.233;
      float c = 43758.5453;
      float dt= dot(co.xy ,vec2(a,b));
      float sn= mod(dt,3.14);
      return fract(sin(sn) * c);
    }
 

    half4 main(float2 xy) {
      vec2 cell = vec2(
      	floor(xy.x / cellPixelSize),
      	floor(xy.y / cellPixelSize)
      );
      
      if(progress < rand(cell)) {
        return vec4(0.0);
      } else {
        return image1.eval(xy).rbga;
      }

    }
`;
