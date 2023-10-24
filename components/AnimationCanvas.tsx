import { PIXEL_NOISE_SHADER } from "../shaders/pixelNoiseTransition";
import { PixelRatio, Dimensions, StyleSheet } from "react-native";
import React from "react";
import {
  AnimatedProps,
  Canvas,
  Group,
  Image,
  ImageShader,
  Paint,
  RuntimeShader,
  Shader,
  SkImage,
} from "@shopify/react-native-skia";

type Props = {
  uniforms: AnimatedProps<any>;
  baseTexture: SkImage | null;
  targetTexture: SkImage | null;
};

const AnimationCanvas = ({ baseTexture, targetTexture, uniforms }: Props) => {
  const pd = PixelRatio.get(); //pixel density
  const { height, width } = Dimensions.get("screen");

  return (
    <Canvas
      style={[StyleSheet.absoluteFill, { zIndex: 999 }]}
      pointerEvents="none"
    >
      <Group transform={[{ scale: 1 / pd }]}>
        <Group
          layer={
            <Paint>
              <RuntimeShader source={PIXEL_NOISE_SHADER} uniforms={uniforms} />
            </Paint>
          }
          transform={[{ scale: pd }]}
        >
          <ImageShader
            image={baseTexture}
            x={0}
            y={0}
            height={height}
            width={width}
            // fit="cover"
          />
          <ImageShader
            image={targetTexture}
            x={0}
            y={0}
            height={height}
            width={width}
            // fit="cover"
          />
        </Group>
      </Group>
    </Canvas>
  );
};

export default AnimationCanvas;
