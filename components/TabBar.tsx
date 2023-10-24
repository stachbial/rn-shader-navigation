import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useShaderTransitionContext } from "../context/ShaderTransitionContext";

// https://reactnavigation.org/docs/bottom-tab-navigator#tabbar
const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { setBaseTexture, isAnimating, setTargetTexture } =
    useShaderTransitionContext();

  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 30,
        backgroundColor: "#5e587a",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const wait = async (ms: number) =>
          new Promise((resolve) => setTimeout(resolve, ms));

        const onPress = async () => {
          if (isAnimating || isFocused) return;
          await setBaseTexture();
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name);
            // await wait(16);
            setTargetTexture();
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "#bd6a6a",
              borderColor: "#000",
              borderWidth: 1,
            }}
          >
            <Text
              style={{
                color: isFocused ? "#673ab7" : "#222",
                alignSelf: "center",
              }}
            >
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
