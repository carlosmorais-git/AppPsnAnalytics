import React, { useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
  Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import GameCard from "../../components/GameCard";
import { useGames } from "../../contexts/GamesContext";
import { Game } from "../../types";
import { RootStackParamList } from "../../navigator/AppNavigator";

// Obter dimensões da tela para responsividade
const { width } = Dimensions.get("window");

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Main"
>;

interface DashboardScreenProps {
  navigation: DashboardScreenNavigationProp;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
}

// Tela principal do dashboard que exibe estatísticas e lista de jogos
const DashboardScreen = ({ navigation }: DashboardScreenProps) => {
  // Usar o contexto de jogos
  const { games, analytics, loading, refreshing, refreshGames } = useGames();

  // Função memoizada para navegar para detalhes do jogo
  const handleGamePress = useCallback(
    (game: Game) => {
      navigation.navigate("GameDetails", { game });
    },
    [navigation]
  );

  // Componente memoizado para exibir estatísticas gerais
  const StatsCard = useCallback(
    ({ title, value, subtitle, color = "#60a5fa" }: StatsCardProps) => (
      <View style={[styles.statsCard, { borderLeftColor: color }]}>
        <Text style={styles.statsTitle}>{title}</Text>
        <Text style={styles.statsValue}>{value}</Text>
        {subtitle && <Text style={styles.statsSubtitle}>{subtitle}</Text>}
      </View>
    ),
    []
  );

  // Renderizar item da lista de jogos (memoizado)
  const renderGameItem = useCallback(
    ({ item }: { item: Game }) => (
      <GameCard game={item} onPress={handleGamePress} />
    ),
    [handleGamePress]
  );

  // Exibir loading se ainda estiver carregando
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando ofertas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        renderItem={renderGameItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshGames} />
        }
        ListHeaderComponent={() => (
          <View style={styles.header}>
            {/* Título da tela */}
            <Text style={styles.headerSubtitle}>
              Ofertas PlayStation em tempo real
            </Text>

            {/* Cards de estatísticas */}
            {analytics && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.statsContainer}
              >
                <StatsCard
                  title="Total de Jogos"
                  value={analytics.generalStats?.totalGames || 0}
                  color="#10b981"
                />
                <StatsCard
                  title="Desconto Médio"
                  value={`${analytics.generalStats?.averageDiscount || 0}%`}
                  color="#f59e0b"
                />
                <StatsCard
                  title="Preço Médio"
                  value={`R$ ${(
                    analytics.generalStats?.averagePrice || 0
                  ).toFixed(2)}`}
                  color="#8b5cf6"
                />
                <StatsCard
                  title="Economia Total"
                  value={`R$ ${(
                    analytics.generalStats?.totalSavings || 0
                  ).toFixed(2)}`}
                  subtitle="Possível economia"
                  color="#ef4444"
                />
              </ScrollView>
            )}

            {/* Seção de jogos */}
            <View style={styles.gamesSection}>
              <Text style={styles.sectionTitle}>
                Ofertas Encontradas ({games.length})
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // Fundo escuro similar ao tema PlayStation
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 16,
  },
  header: {
    padding: 20,
    // paddingTop: 60, // Espaço para status bar
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#94a3b8",
    marginBottom: 24,
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    minWidth: width * 0.4, // 40% da largura da tela
    borderLeftWidth: 4,
  },
  statsTitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  statsSubtitle: {
    fontSize: 12,
    color: "#64748b",
  },
  gamesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default DashboardScreen;
