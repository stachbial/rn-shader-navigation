import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const ThirdScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Third Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default ThirdScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
