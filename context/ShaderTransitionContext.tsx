import { createContext, useContext, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";

type ShaderTransitionContext = {
  isAnimating: boolean;
  setBaseTexture: () => void;
  setTargetTexture: () => void;
};

const initialValues: ShaderTransitionContext = {
  isAnimating: false,
  setBaseTexture: () => {},
  setTargetTexture: () => {},
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

  const handleSetBaseTexture = () => {};
  const handleSetTargetTexture = () => {};

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
    </ShaderTransitionContext.Provider>
  );
};

export default ShaderTransitionContextProvider;
