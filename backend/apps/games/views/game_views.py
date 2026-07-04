"""
Views para gerenciamento de jogos e histórico de preços.

Tipos de Views Utilizadas:
========================

1. ListAPIView / RetrieveAPIView (Generic Views)
   - Uso: CRUD com customização
   - Características: Mais controle, rotas manuais
   - Cenário: Quando precisa de lógica específica

2. ReadOnlyModelViewSet (ViewSet)
   - Uso: CRUD automático (apenas leitura)
   - Características: Menos código, rotas automáticas
   - Cenário: CRUD padrão sem customização complexa
   - Actions customizadas: Use @action para endpoints extras

Regra: Use ViewSet quando possível. Use Generic Views quando precisar de mais controle.
"""

from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.games.models import Game,GamePriceHistory
from apps.games.serializers import (
    GameListSerializer,
    GameDetailSerializer,
    GamePriceHistorySerializer,
    PriceHistoryHistoryOnlySerializer
)


class GameViewSet(ReadOnlyModelViewSet):
    """
    ViewSet OTIMIZADO para CRUD automático de jogos (apenas leitura).
    
    Otimizações aplicadas:
    - Usa serializer diferente para list vs detail
    - Evita N+1 queries na listagem
    - Traz history apenas no detalhe
    """
    queryset = Game.objects.all()
    lookup_field = 'psn_id'  # Busca por psn_id em vez de pk
    
    def get_serializer_class(self):
        """
        Usa serializer otimizado dependendo da action:
        - list: GameListSerializer (SEM history)
        - retrieve: GameDetailSerializer (COM history)
        """
        if self.action == 'retrieve':
            return GameDetailSerializer
        return GameListSerializer
    
    @action(detail=False, methods=['get'])
    def history_list(self, request):
        """
        Action customizada: Histórico de preços de um jogo
        
        Endpoint: GET /api/games-viewset/history/
        Retorna todo o histórico de preços do jogo
        """
        
        # Prefetch ordena o histórico por data decrescente
        from django.db.models import Count
        from django.db.models import Prefetch

        historico_ordenado = Prefetch(
            'history', 
            queryset=GamePriceHistory.objects.order_by('-date') 
        )

        games = Game.objects.annotate(
            history_count=Count('history')
        ).filter(
            history_count__gte=2
        ).prefetch_related(historico_ordenado)

        # Monta o dicionário agrupado usando o serializer para formatar os dados
        history_agrupado = {}
        for game in games:
            # Passamos o queryset do histórico do jogo para o serializer formatar
            serializer = PriceHistoryHistoryOnlySerializer(game.history.all(), many=True)
            history_agrupado[game.title] = serializer.data

        return Response({
            "count": len(history_agrupado),
            "results": history_agrupado
        })
    
    @action(detail=True, methods=['get'])
    def history(self, request, psn_id=None):
        """
        Action customizada: Histórico de preços de um jogo
        
        Endpoint: GET /api/games-viewset/{psn_id}/history/
        Retorna todo o histórico de preços do jogo
        """
        game = self.get_object() # Busca automaticamente o jogo atual pelo psn_id
        history = game.history.all().order_by('-date')
        serializer = GamePriceHistorySerializer(history, many=True)
        return Response({
            "count": history.count(),
            "results": serializer.data
        })
    
    

