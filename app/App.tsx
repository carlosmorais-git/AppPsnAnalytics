import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigator/AppNavigator";
import { GamesProvider } from "./src/contexts/GamesContext";

export default function App() {
  return (
    <GamesProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </GamesProvider>
  );
}
