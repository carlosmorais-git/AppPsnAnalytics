import React from "react";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Importar ícones

// Importar telas
import DashboardScreen from "./screens/DashboardScreen";
import AnalyticsScreen from "./screens/AnalyticsScreen";
import GameDetailsScreen from "./screens/GameDetailsScreen";
import { StatusBar, View } from "react-native-web";

// Criar navegadores
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Navegador de abas para as telas principais
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Ocultar header das abas

        tabBarStyle: {
          backgroundColor: "#1e293b", // Cor de fundo da tab bar
          borderTopColor: "#334155", // Cor da borda superior
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: "#60a5fa", // Cor do ícone/texto ativo
        tabBarInactiveTintColor: "#94a3b8", // Cor do ícone/texto inativo

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Ofertas PlayStation",
          backgroundColor: "#1e293b",

          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarLabel: "Análises",
          tabBarIcon: ({ color, size }) => (
            <Icon name="chart-bar" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Navegador principal com stack para permitir navegação para detalhes
function AppNavigator() {
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
}

// Componente principal da aplicação
export default function App() {
  return (
    <>
      {/* Container de navegação */}
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}
