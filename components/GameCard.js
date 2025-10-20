import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// Componente de card para exibir informações de um jogo
// Recebe as propriedades do jogo e uma função de callback para quando o card é pressionado
const GameCard = ({ game, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(game)}>
      {/* Container principal do card */}
      <View style={styles.cardContent}>
        {/* Imagem do jogo */}

        <Image
          source={{
            uri: game.image_url || "https://via.placeholder.com/150x200",
          }}
          style={styles.gameImage}
          resizeMode="cover"
        />

        {/* Informações do jogo */}
        <View style={styles.gameInfo}>
          {/* Título do jogo */}
          <Text style={styles.gameTitle} numberOfLines={2}>
            {game.title}
          </Text>

          {/* Plataforma e gênero */}
          <View style={styles.metaInfo}>
            <Text style={styles.platform}>{game.platform}</Text>
            <Text style={styles.genre}>{game.genre}</Text>
          </View>

          {/* Informações de preço */}
          <View style={styles.priceContainer}>
            {/* Preço original (riscado se houver desconto) */}
            {game.discount_percentage > 0 && (
              <Text style={styles.originalPrice}>
                R$ {game.original_price.toFixed(2)}
              </Text>
            )}

            {/* Preço com desconto */}
            <Text style={styles.discountedPrice}>
              R$ {game.discounted_price.toFixed(2)}
            </Text>
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
    </TouchableOpacity>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b", // Cor de fundo escura similar ao tema PSN
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombra para Android
  },
  cardContent: {
    flexDirection: "row",
    padding: 16,
  },

  gameImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  gameInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  platform: {
    fontSize: 12,
    color: "#60a5fa", // Azul similar ao tema PlayStation
    fontWeight: "600",
  },
  genre: {
    fontSize: 12,
    color: "#94a3b8",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: "#94a3b8",
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#10b981", // Verde para indicar economia
  },
  discountBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#ef4444", // Vermelho para o badge de desconto
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default GameCard;
