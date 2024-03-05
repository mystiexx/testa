import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import Home from "./screens/home";
import { StatusBar } from "expo-status-bar";
import Settings from "./screens/settings";
import Questions from "./screens/questions";
import Final from "./screens/final";
import Help from "./screens/help";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsloaded] = useFonts({
    Black: require("./assets/fonts/Black.otf"),
    bold: require("./assets/fonts/Bold.otf"),
    italic: require("./assets/fonts/Italic.otf"),
    light: require("./assets/fonts/Light.otf"),
    medium: require("./assets/fonts/Medium.otf"),
    regular: require("./assets/fonts/Regular.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsloaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsloaded]);

  if (!fontsloaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator onLayoutRootView={onLayoutRootView}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="help"
          component={Help}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="questions"
          component={Questions}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="final"
          component={Final}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
