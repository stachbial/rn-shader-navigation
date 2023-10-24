import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenRenderListener from "../components/ScreenRenderListener";

type Props = {};

const ThirdScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <ScreenRenderListener />
      <Text>Third Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default ThirdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#90a54e",
    alignItems: "center",
    justifyContent: "center",
  },
});
