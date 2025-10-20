import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
  Dimensions,
} from "react-native";
import GameCard from "../components/GameCard";
import { API_ENDPOINTS } from "../data/mockData";

// Obter dimensões da tela para responsividade
const { width } = Dimensions.get("window");

// Tela principal do dashboard que exibe estatísticas e lista de jogos
const DashboardScreen = ({ navigation }) => {
  // Estados para gerenciar dados e carregamento
  const [games, setGames] = useState([]); // Lista de jogos
  const [analytics, setAnalytics] = useState(null); // Dados de análise
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [refreshing, setRefreshing] = useState(false); // Estado de refresh

  // Função para carregar dados iniciais
  const loadData = async () => {
    try {
      setLoading(true);

      // Simular chamadas de API paralelas
      const [gamesData, analyticsData] = await Promise.all([
        API_ENDPOINTS.getGames(),
        API_ENDPOINTS.getAnalytics(),
      ]);

      setGames(gamesData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para refresh dos dados
  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // Carregar dados quando o componente é montado
  useEffect(() => {
    loadData();
  }, []);

  // Função para navegar para detalhes do jogo
  const handleGamePress = (game) => {
    navigation.navigate("GameDetails", { game });
  };

  // Componente para exibir estatísticas gerais
  const StatsCard = ({ title, value, subtitle, color = "#60a5fa" }) => (
    <View style={[styles.statsCard, { borderLeftColor: color }]}>
      <Text style={styles.statsTitle}>{title}</Text>
      <Text style={styles.statsValue}>{value}</Text>
      {subtitle && <Text style={styles.statsSubtitle}>{subtitle}</Text>}
    </View>
  );

  // Renderizar item da lista de jogos
  const renderGameItem = ({ item }) => (
    <GameCard game={item} onPress={handleGamePress} />
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
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => (
          <View style={styles.header}>
            {/* Título da tela */}
            {/* <Text style={styles.headerTitle}>PSN Dashboard</Text> */}
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
                  value={analytics.generalStats.totalGames}
                  color="#10b981"
                />
                <StatsCard
                  title="Desconto Médio"
                  value={`${analytics.generalStats.averageDiscount}%`}
                  color="#f59e0b"
                />
                <StatsCard
                  title="Preço Médio"
                  value={`R$ ${analytics.generalStats.averagePrice.toFixed(2)}`}
                  color="#8b5cf6"
                />
                <StatsCard
                  title="Economia Total"
                  value={`R$ ${analytics.generalStats.totalSavings.toFixed(2)}`}
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
