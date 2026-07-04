from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.games.views.scraping_views import ScrapePSNView
from apps.games.views.game_views import GameViewSet
from apps.games.views.analytics_views import (
    TopDiscountsView,
    CheapestGamesView,
    AvgDiscountView,
   
)

# Router para ViewSets (rotas automáticas)
router = DefaultRouter()
router.register(r'games-viewset', GameViewSet, basename='game')

urlpatterns = [
    # - GET /games-viewset/ → lista todos
    # - GET /games-viewset/{psn_id}/ → detalhe
    # - GET /games-viewset/{psn_id}/history/ → histórico (action customizada)
    path('', include(router.urls)),    

    # Scraping
    path("scrape/psn/", ScrapePSNView.as_view()),

    # Analytics
    path("analytics/top-discounts/", TopDiscountsView.as_view()),
    path("analytics/cheapest/", CheapestGamesView.as_view()),
    path("analytics/avg-discount/", AvgDiscountView.as_view()),
]
