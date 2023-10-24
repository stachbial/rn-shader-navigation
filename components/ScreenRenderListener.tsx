import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useShaderTransitionContext } from "../context/ShaderTransitionContext";

const ScreenRenderListener = () => {
  const { setTargetTexture } = useShaderTransitionContext();

  useEffect(() => {
    // setTargetTexture();
  }, []);
  return <></>;
};

export default ScreenRenderListener;
