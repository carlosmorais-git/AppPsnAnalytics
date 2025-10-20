import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
import { API_ENDPOINTS } from "../data/mockData";

// Obter dimensões da tela
const { width } = Dimensions.get("window");

// Tela de análises com gráficos e estatísticas detalhadas
const AnalyticsScreen = () => {
  // Estados para gerenciar dados e carregamento
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Função para carregar dados de análise
  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await API_ENDPOINTS.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Erro ao carregar análises:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await loadAnalytics();
    setRefreshing(false);
  };

  // Carregar dados quando o componente é montado
  useEffect(() => {
    loadAnalytics();
  }, []);

  // Componente para gráfico de barras simples (sem biblioteca externa)
  const SimpleBarChart = ({ data, title, color = "#60a5fa" }) => {
    const maxValue = Math.max(
      ...data.map((item) => item.count || item.percentage)
    );

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{title}</Text>
        {data.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            <Text style={styles.barLabel}>
              {item.genre || item.platform || item.range || item.title}
            </Text>
            <View style={styles.barBackground}>
              <View
                style={[
                  styles.bar,
                  {
                    width: `${
                      ((item.count || item.percentage) / maxValue) * 100
                    }%`,
                    backgroundColor: color,
                  },
                ]}
              />
            </View>
            <Text style={styles.barValue}>
              {item.count || item.percentage}
              {item.percentage ? "%" : ""}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  // Componente para gráfico de linha simples
  const SimpleLineChart = ({ data, title }) => {
    const maxValue = Math.max(...data.map((item) => item.avgPrice));
    const minValue = Math.min(...data.map((item) => item.avgPrice));
    const range = maxValue - minValue;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>{title}</Text>
        <View style={styles.lineChartContainer}>
          {data.map((item, index) => {
            const height =
              range > 0 ? ((item.avgPrice - minValue) / range) * 100 : 50;
            return (
              <View key={index} style={styles.linePoint}>
                <View style={[styles.point, { bottom: `${height}%` }]} />
                <Text style={styles.lineLabel}>{item.month}</Text>
                <Text style={styles.lineValue}>
                  R$ {item.avgPrice.toFixed(0)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  // Componente para card de estatística
  const StatCard = ({ title, value, subtitle, color = "#60a5fa" }) => (
    <View style={[styles.statCard, { borderTopColor: color }]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  // Exibir loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando análises...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        {/* <Text style={styles.headerTitle}>Análises</Text> */}
        <Text style={styles.headerSubtitle}>Insights detalhados dos dados</Text>
      </View>

      {analytics && (
        <>
          {/* Estatísticas gerais */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Estatísticas Gerais</Text>
            <View style={styles.statsGrid}>
              <StatCard
                title="Melhor Oferta"
                value={analytics.generalStats.bestDeal}
                subtitle={`${analytics.generalStats.bestDealDiscount}% de desconto`}
                color="#10b981"
              />
              <StatCard
                title="Economia Total"
                value={`R$ ${analytics.generalStats.totalSavings.toFixed(2)}`}
                subtitle="Possível economia"
                color="#ef4444"
              />
            </View>
          </View>

          {/* Gráfico de distribuição por gênero */}
          <View style={styles.section}>
            <SimpleBarChart
              data={analytics.genreDistribution}
              title="Distribuição por Gênero"
              color="#8b5cf6"
            />
          </View>

          {/* Gráfico de distribuição por plataforma */}
          <View style={styles.section}>
            <SimpleBarChart
              data={analytics.platformDistribution}
              title="Distribuição por Plataforma"
              color="#06b6d4"
            />
          </View>

          {/* Gráfico de distribuição de descontos */}
          <View style={styles.section}>
            <SimpleBarChart
              data={analytics.discountDistribution}
              title="Distribuição de Descontos"
              color="#f59e0b"
            />
          </View>

          {/* Gráfico de evolução de preços */}
          <View style={styles.section}>
            <SimpleLineChart
              data={analytics.priceEvolution}
              title="Evolução de Preços (6 meses)"
            />
          </View>

          {/* Top jogos por rating */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Jogos por Avaliação</Text>
            {analytics.topRatedGames.map((game, index) => (
              <View key={index} style={styles.topGameItem}>
                <Text style={styles.topGameRank}>#{index + 1}</Text>
                <Text style={styles.topGameTitle}>{game.title}</Text>
                <Text style={styles.topGameRating}>⭐ {game.rating}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
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
    // paddingTop: 60,
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
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    flex: 0.48,
    borderTopWidth: 4,
  },
  statTitle: {
    fontSize: 14,
    color: "#94a3b8",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: "#64748b",
  },
  chartContainer: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
    textAlign: "center",
  },
  barContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  barLabel: {
    fontSize: 14,
    color: "#ffffff",
    width: 80,
  },
  barBackground: {
    flex: 1,
    height: 20,
    backgroundColor: "#334155",
    borderRadius: 10,
    marginHorizontal: 12,
  },
  bar: {
    height: "100%",
    borderRadius: 10,
  },
  barValue: {
    fontSize: 14,
    color: "#ffffff",
    width: 40,
    textAlign: "right",
  },
  lineChartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 120,
    alignItems: "flex-end",
  },
  linePoint: {
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  point: {
    width: 8,
    height: 8,
    backgroundColor: "#60a5fa",
    borderRadius: 4,
    position: "absolute",
  },
  lineLabel: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 8,
  },
  lineValue: {
    fontSize: 10,
    color: "#64748b",
    marginTop: 4,
  },
  topGameItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  topGameRank: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#60a5fa",
    width: 30,
  },
  topGameTitle: {
    fontSize: 14,
    color: "#ffffff",
    flex: 1,
    marginLeft: 12,
  },
  topGameRating: {
    fontSize: 14,
    color: "#f59e0b",
  },
});

export default AnalyticsScreen;
