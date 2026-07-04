// fronte-dev/api.js
import axios from "axios";
import { getCurrentConfig } from "../config/api.config";
import { FALLBACK_GAMES, FALLBACK_ANALYTICS } from "../data/mockData";

// Configuração do axios com timeout e baseURL
const config = getCurrentConfig();
export const api = axios.create({
  baseURL: config.baseURL,
  timeout: config.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiService = {
  // Buscar todos os jogos (com fallback para mock)
  getGames: async () => {
    try {
      console.log("🔄 Buscando jogos da API real...");
      const response = await api.get("/games-viewset/", {
        params: { page: 1 },
      });
      const data = response.data;

      // Mapeia dados do Django pro formato que o app espera
      const games = data.results.map((game) => ({
        id: game.id,
        title: game.title,
        platform: game.platform,
        genre: game.genre || "Ação",
        original_price: parseFloat(game.original_price),
        discounted_price:
          parseFloat(game.discounted_price) || parseFloat(game.original_price),
        discount_percentage: game.discount_percentage,
        image_url: game.image_url,
        edition_type: game.edition_type || "Standard",
        rating: game.rating || 4.5,
        release_date: game.release_date || "2024-01-01",
        description: game.description || `Descrição de ${game.title}`,
        developer: game.developer || "PlayStation Studios",
        publisher: game.publisher || "Sony Interactive Entertainment",
      }));

      console.log(`✅ ${games.length} jogos carregados da API`);
      return games;
    } catch (error) {
      console.warn(
        "⚠️ Erro ao buscar jogos da API, usando fallback:",
        error.message
      );
      console.log("📦 Carregando 3 jogos de fallback...");
      return FALLBACK_GAMES;
    }
  },

  // Buscar jogo por ID (com fallback para mock)
  getGameById: async (psn_id) => {
    try {
      console.log(`🔄 Buscando jogo ID ${psn_id} da API...`);
      const response = await api.get(`/games-viewset/${psn_id}/`);
      const game = response.data;

      const gameData = {
        id: game.id,
        title: game.title,
        platform: game.platform,
        genre: game.genre || "Ação",
        original_price: parseFloat(game.original_price),
        discounted_price:
          parseFloat(game.discounted_price) || parseFloat(game.original_price),
        discount_percentage: game.discount_percentage,
        image_url: game.image_url,
        history: game.history || [],
        edition_type: game.edition_type || "Standard",
        rating: game.rating || 4.5,
        release_date: game.release_date || "2024-01-01",
        description: game.description || `Descrição de ${game.title}`,
        developer: game.developer || "PlayStation Studios",
        publisher: game.publisher || "Sony Interactive Entertainment",
      };

      console.log(`✅ Jogo "${game.title}" carregado da API`);
      return gameData;
    } catch (error) {
      console.warn(
        "⚠️ Erro ao buscar jogos da API, usando fallback:",
        error.message
      );
      console.log("📦 Carregando 3 jogos de fallback...");
      return FALLBACK_GAMES.find((g) => g.id.toString() === psn_id.toString());
    }
  },

  getAnalytics: async (games = null) => {
    try {
      // Se não recebeu jogos, busca da API
      if (!games) {
        games = await apiService.getGames();
      }
      const feedback = FALLBACK_ANALYTICS;

      // Calcula analytics a partir dos jogos
      if (games && games.length > 0) {
        const totalGames = games.length;
        const averageDiscount = Math.round(
          games.reduce((sum, g) => sum + g.discount_percentage, 0) / totalGames
        );
        const averagePrice =
          games.reduce((sum, g) => sum + g.discounted_price, 0) / totalGames;
        const totalSavings = games.reduce(
          (sum, g) => sum + (g.original_price - g.discounted_price),
          0
        );

        // Encontra melhor oferta
        const bestDealGame = games.reduce((best, current) =>
          current.discount_percentage > best.discount_percentage
            ? current
            : best
        );

        // Calcula distribuição por gênero
        const genreCount = {};
        games.forEach((game) => {
          const genre = game.genre || "Outros";
          genreCount[genre] = (genreCount[genre] || 0) + 1;
        });
        const genreDistribution = Object.entries(genreCount).map(
          ([genre, count]) => ({
            genre,
            count,
            percentage: Math.round((count / totalGames) * 100),
          })
        );

        // Calcula distribuição por plataforma
        const platformCount = {};
        games.forEach((game) => {
          const platform = game.platform || "Outros";
          platformCount[platform] = (platformCount[platform] || 0) + 1;
        });
        const platformDistribution = Object.entries(platformCount).map(
          ([platform, count]) => ({
            platform,
            count,
            percentage: Math.round((count / totalGames) * 100),
          })
        );

        // Calcula distribuição de descontos
        const discountRanges = {
          "0-20%": 0,
          "21-50%": 0,
          "51-90%": 0,
          "91-100%": 0,
        };
        games.forEach((game) => {
          const discount = game.discount_percentage;
          if (discount <= 20) discountRanges["0-20%"]++;
          else if (discount <= 50) discountRanges["21-50%"]++;
          else if (discount <= 90) discountRanges["51-90%"]++;
          else discountRanges["91-100%"]++;
        });
        const discountDistribution = Object.entries(discountRanges)
          .filter(([_, count]) => count > 0)
          .map(([range, count]) => ({
            range,
            count,
            percentage: Math.round((count / totalGames) * 100),
          }));

        // Top jogos por rating
        const topRatedGames = [...games]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5)
          .map((game) => ({
            title: game.title,
            rating: game.rating,
          }));

        // Evolução de preços (mock - seria necessário histórico real)
        const priceEvolution = [
          {
            month: "Jan",
            avgPrice: averagePrice * 1.1,
            avgDiscount: averageDiscount - 10,
          },
          {
            month: "Fev",
            avgPrice: averagePrice * 1.05,
            avgDiscount: averageDiscount - 5,
          },
          {
            month: "Mar",
            avgPrice: averagePrice * 1.02,
            avgDiscount: averageDiscount - 2,
          },
          {
            month: "Abr",
            avgPrice: averagePrice,
            avgDiscount: averageDiscount,
          },
          {
            month: "Mai",
            avgPrice: averagePrice * 0.98,
            avgDiscount: averageDiscount + 2,
          },
          {
            month: "Jun",
            avgPrice: averagePrice * 1.2,
            avgDiscount: averageDiscount + 5,
          },
        ];

        // Ultinos 6meses

        console.log("✅ Analytics calculado a partir dos jogos");
        return {
          generalStats: {
            totalGames,
            averageDiscount,
            averagePrice,
            totalSavings,
            bestDeal: bestDealGame.title,
            bestDealDiscount: bestDealGame.discount_percentage,
          },
          genreDistribution,
          platformDistribution,
          discountDistribution,
          priceEvolution: feedback.priceEvolution.slice(-6),
          topRatedGames,
        };
      }

      // Se não tiver jogos, usa fallback
      console.log("📦 Usando analytics de fallback");
      return FALLBACK_ANALYTICS;
    } catch (error) {
      console.warn(
        "⚠️ Erro ao calcular analytics, usando fallback:",
        error.message
      );
      return FALLBACK_ANALYTICS;
    }
  },
};
