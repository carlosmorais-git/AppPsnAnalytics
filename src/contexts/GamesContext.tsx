import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  ReactNode,
} from "react";
import { apiService } from "../service/api";
import { Game, Analytics } from "../types";

interface GamesContextData {
  games: Game[];
  analytics: Analytics;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  loadGames: () => Promise<void>;
  refreshGames: () => Promise<void>;
  getGameById: (id: number) => Game | undefined;
}

const GamesContext = createContext<GamesContextData>({} as GamesContextData);

interface GamesProviderProps {
  children: ReactNode;
}

export const GamesProvider: React.FC<GamesProviderProps> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | any>({} as Analytics);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função para carregar jogos da API
  const loadGames = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Context: Carregando jogos...");

      // Busca jogos da API
      const gamesData = await apiService.getGames();
      setGames(gamesData);

      // Calcula analytics a partir dos jogos
      const analyticsData = await apiService.getAnalytics(gamesData);
      setAnalytics(analyticsData);

      console.log("✅ Context: Dados carregados com sucesso!");
    } catch (err) {
      console.error("❌ Context: Erro ao carregar dados:", err);
      setError("Erro ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Função para refresh (pull to refresh)
  const refreshGames = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);
      console.log("🔄 Context: Atualizando jogos...");

      const gamesData = await apiService.getGames();
      setGames(gamesData);

      const analyticsData = await apiService.getAnalytics(gamesData);
      setAnalytics(analyticsData);

      console.log("✅ Context: Dados atualizados!");
    } catch (err) {
      console.error("❌ Context: Erro ao atualizar:", err);
      setError("Erro ao atualizar dados.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Função memoizada para buscar jogo por ID
  const getGameById = useCallback(
    (id: number): Game | undefined => {
      return games.find((game) => game.id === id);
    },
    [games]
  );

  // Carregar dados na montagem do componente
  useEffect(() => {
    loadGames();
  }, [loadGames]);

  // Memoizar o valor do contexto para evitar re-renders desnecessários
  const contextValue = useMemo(
    () => ({
      games,
      analytics,
      loading,
      refreshing,
      error,
      loadGames,
      refreshGames,
      getGameById,
    }),
    [
      games,
      analytics,
      loading,
      refreshing,
      error,
      loadGames,
      refreshGames,
      getGameById,
    ]
  );

  return (
    <GamesContext.Provider value={contextValue}>
      {children}
    </GamesContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useGames = (): GamesContextData => {
  const context = useContext(GamesContext);

  if (!context) {
    throw new Error("useGames deve ser usado dentro de um GamesProvider");
  }

  return context;
};
