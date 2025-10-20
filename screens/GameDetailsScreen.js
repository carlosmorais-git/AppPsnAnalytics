import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";

// Obter dimensões da tela
const { width } = Dimensions.get("window");

// Tela de detalhes do jogo com informações completas
const GameDetailsScreen = ({ route, navigation }) => {
  // Obter dados do jogo passados pela navegação
  const { game } = route.params;

  // Função para calcular economia
  const calculateSavings = () => {
    return game.original_price - game.discounted_price;
  };

  // Componente para informação detalhada
  const InfoRow = ({ label, value, color = "#ffffff" }) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, { color }]}>{value}</Text>
    </View>
  );

  // Componente para badge de rating
  const RatingBadge = ({ rating }) => (
    <View style={styles.ratingBadge}>
      <Text style={styles.ratingText}>⭐ {rating}</Text>
    </View>
  );

  return (
    <>
      <ScrollView style={styles.container}>
        {/* Cabeçalho com imagem */}
        <View style={styles.header}>
          <Image
            source={{
              uri: game.image_url || "https://via.placeholder.com/400x200",
            }}
            style={styles.gameImage}
            resizeMode="cover"
          />

          {/* Overlay com informações básicas */}
          <View style={styles.overlay}>
            <View style={styles.titleContainer}>
              <Text style={styles.gameTitle}>{game.title}</Text>
              <RatingBadge rating={game.rating} />
            </View>

            {/* Badge de desconto */}
            {game.discount_percentage > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  -{game.discount_percentage}%
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Conteúdo principal */}
        <View style={styles.content}>
          {/* Seção de preços */}
          <View style={styles.priceSection}>
            <Text style={styles.sectionTitle}>Preço</Text>
            <View style={styles.priceContainer}>
              {game.discount_percentage > 0 && (
                <Text style={styles.originalPrice}>
                  De: R$ {game.original_price.toFixed(2)}
                </Text>
              )}
              <Text style={styles.currentPrice}>
                Por: R$ {game.discounted_price.toFixed(2)}
              </Text>
              {game.discount_percentage > 0 && (
                <Text style={styles.savings}>
                  Economia: R$ {calculateSavings().toFixed(2)}
                </Text>
              )}
            </View>
          </View>

          {/* Informações do jogo */}
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Informações</Text>
            <InfoRow label="Plataforma" value={game.platform} color="#60a5fa" />
            <InfoRow label="Gênero" value={game.genre} color="#8b5cf6" />
            <InfoRow label="Edição" value={game.edition_type} color="#10b981" />
            <InfoRow label="Desenvolvedor" value={game.developer} />
            <InfoRow label="Publicadora" value={game.publisher} />
            <InfoRow
              label="Data de Lançamento"
              value={new Date(game.release_date).toLocaleDateString("pt-BR")}
            />
          </View>

          {/* Descrição */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.description}>{game.description}</Text>
          </View>

          {/* Estatísticas */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Estatísticas</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{game.rating}</Text>
                <Text style={styles.statLabel}>Avaliação</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>
                  {game.discount_percentage}%
                </Text>
                <Text style={styles.statLabel}>Desconto</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>
                  R$ {calculateSavings().toFixed(0)}
                </Text>
                <Text style={styles.statLabel}>Economia</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Botão de ação - link do jogo */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() =>
          Linking.openURL(
            "https://store.playstation.com/pt-br/product/UP1018-PPSA01618_00-MK11ULTIMATEKOLL"
          )
        }
      >
        <Text style={styles.actionButtonText}>Ver na PlayStation Store</Text>
      </TouchableOpacity>
    </>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  header: {
    position: "relative",
    height: 250,
  },
  gameImage: {
    width: "100%",
    height: "200",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    flex: 1,
    marginRight: 16,
  },
  ratingBadge: {
    backgroundColor: "#f59e0b",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
  discountBadge: {
    position: "absolute",
    top: -40,
    right: 20,
    backgroundColor: "#ef4444",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  discountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 16,
  },
  priceSection: {
    marginBottom: 24,
  },
  priceContainer: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
  },
  originalPrice: {
    fontSize: 16,
    color: "#94a3b8",
    textDecorationLine: "line-through",
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 8,
  },
  savings: {
    fontSize: 16,
    color: "#f59e0b",
    fontWeight: "600",
  },
  infoSection: {
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: "#94a3b8",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: "#e2e8f0",
    lineHeight: 24,
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
  },
  statsSection: {
    marginBottom: 150,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 0.3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#60a5fa",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
  },
  actionButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    padding: 16,
    bottom: "10%",
    right: "22%",
    left: "22%",
    position: "absolute",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
});

export default GameDetailsScreen;
