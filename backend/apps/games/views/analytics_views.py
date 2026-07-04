from rest_framework.views import APIView
from rest_framework.response import Response
from apps.games.models import GamePriceHistory
from django.db.models import Sum, Avg


class TopDiscountsView(APIView):
    """
    Retorna jogos com os maiores descontos.
    """
    def get(self, request):
        history = GamePriceHistory.objects.order_by("-discount_percentage")[:20]
        data = [{
            "game": h.game.title,
            "discount": h.discount_percentage,
        } for h in history]

        return Response(data)


class CheapestGamesView(APIView):
    """
    Retorna os jogos mais baratos no momento.
    """
    def get(self, request):
        history = GamePriceHistory.objects.order_by("discounted_price")[:20]
        data = [{
            "game": h.game.title,
            "price": h.discounted_price,
        } for h in history]

        return Response(data)


class AvgDiscountView(APIView):
    """
    Retorna média geral de descontos.
    """
    def get(self, request, *args, **kwargs):   
        # Cálculo da média de descontos   
        aggregation_result = GamePriceHistory.objects.all().aggregate(
            avg_discount=Avg("discount_percentage")
        )     
        # Extrai o valor médio do dicionário retornado
        avg = aggregation_result["avg_discount"]

        # O resultado é um dicionário: {'avg_discount': valor_medio}
        return Response({"avg_discount": avg})

