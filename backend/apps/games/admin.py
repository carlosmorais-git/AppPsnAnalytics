from django.contrib import admin

from .models import Game, GamePriceHistory

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ("title", "platform", "genre", "original_price",
     "discounted_price", "discount_percentage", "last_update")
    search_fields = ("title", "psn_id")
    list_filter = ("platform", "genre")
    ordering = ("-discount_percentage",)

@admin.register(GamePriceHistory)
class GamePriceHistoryAdmin(admin.ModelAdmin):
    list_display = ("game", "date", "original_price", 
    "discounted_price", "discount_percentage")
    search_fields = ("game__title",)
    ordering = ("-date",)
