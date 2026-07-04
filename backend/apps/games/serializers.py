from rest_framework import serializers
from .models import Game, GamePriceHistory



class PriceHistoryHistoryOnlySerializer(serializers.Serializer):
    date = serializers.DateField()
    original_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = serializers.DecimalField(max_digits=10, decimal_places=2)
    discount_percentage = serializers.IntegerField()
class GamePriceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = GamePriceHistory
        fields = [
            "id",
            "date",
            "original_price",
            "discounted_price",
            "discount_percentage",
        ]



class GameListSerializer(serializers.ModelSerializer):
    """
    Serializer otimizado para LISTAGEM de jogos.
    NÃO inclui history para evitar N+1 queries.
    """
    class Meta:
        model = Game
        fields = [
            "id",
            "psn_id",
            "title",
            "platform",
            "genre",
            "image_url",
            "original_price",
            "discounted_price",
            "discount_percentage",
            "last_update",
        ]


class GameDetailSerializer(serializers.ModelSerializer):
    """
    Serializer completo para DETALHE de jogo.
    Inclui history apenas quando buscar 1 jogo específico.
    """
    history = GamePriceHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = [
            "id",
            "psn_id",
            "title",
            "platform",
            "genre",
            "image_url",
            "original_price",
            "discounted_price",
            "discount_percentage",
            "last_update",
            "history",
        ]


# Para manter a compatibilidade
GameSerializer = GameListSerializer
