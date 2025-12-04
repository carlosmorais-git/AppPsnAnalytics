import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DashboardScreen from "../../screens/DashboardScreen";
import AnalyticsScreen from "../../screens/AnalyticsScreen";

export type TabParamList = {
  Dashboard: undefined;
  Analytics: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true, // Ocultar header das abas

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
};

export default TabNavigator;
