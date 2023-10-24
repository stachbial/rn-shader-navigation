import { createContext, useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  Canvas,
  Group,
  Image,
  ImageShader,
  Rect,
  RuntimeShader,
  SkImage,
  makeImageFromView,
} from "@shopify/react-native-skia";
import AnimationCanvas from "../components/AnimationCanvas";
import {
  Easing,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { PIXEL_NOISE_SHADER } from "../shaders/pixelNoiseTransition";

//base texture is the snapshot that the transition is animated from, target texture is the snapshot that is animated to
type ShaderTransitionContext = {
  isAnimating: boolean;
  setBaseTexture: () => Promise<void>;
  setTargetTexture: () => Promise<void>;
};

const initialValues: ShaderTransitionContext = {
  isAnimating: false,
  setBaseTexture: async () => {},
  setTargetTexture: async () => {},
};

const ShaderTransitionContext =
  createContext<ShaderTransitionContext>(initialValues);

export const useShaderTransitionContext = () =>
  useContext<ShaderTransitionContext>(ShaderTransitionContext);

const ShaderTransitionContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const snapshotRef = useRef<View>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [baseTexture, setBaseTexture] = useState<SkImage | null>(null);
  const [targetTexture, setTargetTexture] = useState<SkImage | null>(null);
  const { height, width } = Dimensions.get("screen");
  const progress = useSharedValue(0);

  const handleSetBaseTexture = async () => {
    return new Promise<void>(async (resolve) => {
      const baseTex = await makeImageFromView(snapshotRef);
      setBaseTexture(baseTex);
      resolve();
    });
  };
  const handleSetTargetTexture = async () => {
    return new Promise<void>(async (resolve) => {
      const baseTex = await makeImageFromView(snapshotRef);
      setTargetTexture(baseTex);
      resolve();
    });
  };

  const reset = () => {
    setBaseTexture(null);
    setTargetTexture(null);
    setIsAnimating(false);
    progress.value = 0.0;
  };

  useEffect(() => {
    if (baseTexture && targetTexture && !isAnimating) {
      setIsAnimating(true);

      progress.value = withTiming(
        1.0,
        {
          duration: 400,
          easing: Easing.inOut(Easing.circle),
        },
        (finished) => {
          if (finished) runOnJS(reset)();
        }
      );
    }
  }, [baseTexture, targetTexture, isAnimating]);

  const uniforms = useDerivedValue(() => {
    return {
      progress: progress.value,
      cellPixelSize: 10.0,
    };
  });

  return (
    <ShaderTransitionContext.Provider
      value={{
        isAnimating,
        setBaseTexture: handleSetBaseTexture,
        setTargetTexture: handleSetTargetTexture,
      }}
    >
      <View style={StyleSheet.absoluteFill} ref={snapshotRef}>
        {children}
      </View>
      <Canvas
        style={[StyleSheet.absoluteFill, { zIndex: 99999 }]}
        pointerEvents="none"
      >
        {baseTexture && (
          <Group blendMode="xor">
            <Image
              image={baseTexture}
              x={0}
              y={0}
              height={height}
              width={width}
            />
            {targetTexture && isAnimating && (
              <Group>
                <RuntimeShader
                  source={PIXEL_NOISE_SHADER}
                  uniforms={uniforms}
                />
                <Rect x={0} y={0} height={height} width={width}>
                  <ImageShader
                    image={targetTexture}
                    x={0}
                    y={0}
                    height={height}
                    width={width}
                    fit="contain"
                  />
                </Rect>
              </Group>
            )}
          </Group>
        )}
      </Canvas>
    </ShaderTransitionContext.Provider>
  );
};

export default ShaderTransitionContextProvider;
