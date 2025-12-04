import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GameDetailsScreen from "../../screens/GameDetailsScreen";
import TabNavigator from "../TabNavigator";
import { Game } from "../../types";

export type RootStackParamList = {
  Main: undefined;
  GameDetails: { game: Game };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1e293b", // Cor de fundo do header
        },
        headerTintColor: "#ffffff", // Cor do texto/ícones do header
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 24,
        },
      }}
    >
      {/* Tela principal com abas */}
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ title: "PSN Analytics" }} // Ocultar header para as abas
      />

      {/* Tela de detalhes do jogo */}
      <Stack.Screen
        name="GameDetails"
        component={GameDetailsScreen}
        options={({ route }) => ({
          title: route.params?.game?.title || "Detalhes do Jogo",
          headerBackTitleVisible: false, // Ocultar texto do botão voltar no iOS
        })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
