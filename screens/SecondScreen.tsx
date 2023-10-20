import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const SecondScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>Second</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
