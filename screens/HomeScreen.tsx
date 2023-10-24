import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenRenderListener from "../components/ScreenRenderListener";

type Props = {};

const HomeScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <ScreenRenderListener />
      <Text>Home Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cd5b5b",
    alignItems: "center",
    justifyContent: "center",
  },
});
