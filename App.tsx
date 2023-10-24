import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SecondScreen from "./screens/SecondScreen";
import ThirdScreen from "./screens/ThirdScreen";
import TabBar from "./components/TabBar";
import ShaderTransitionContextProvider from "./context/ShaderTransitionContext";

export type TabParamList = {
  Home: undefined;
  Second: undefined;
  Third: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function App() {
  return (
    <ShaderTransitionContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          // screenOptions={{ lazy: false }}
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <TabBar {...props} />}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Second" component={SecondScreen} />
          <Tab.Screen name="Third" component={ThirdScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ShaderTransitionContextProvider>
  );
}
