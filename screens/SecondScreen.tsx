import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenRenderListener from "../components/ScreenRenderListener";
type Props = {};

const SecondScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <ScreenRenderListener />
      <Text>Second</Text>
      <StatusBar style="auto" />
      <TouchableOpacity>
        <View>
          <Text>lalala</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5a98e9",
    alignItems: "center",
    justifyContent: "center",
  },
});
