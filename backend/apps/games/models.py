
from django.db import models

class Game(models.Model):
    psn_id = models.CharField(max_length=200, unique=True, db_index=True)  # Índice para lookup rápido
    title = models.CharField(max_length=200, db_index=True)  # Índice para buscas
    image_url = models.URLField()
    platform = models.CharField(max_length=30, default="PS4/PS5", db_index=True)  # Índice para filtros
    genre = models.CharField(max_length=100, null=True, blank=True, db_index=True)  # Índice para filtros

    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    discount_percentage = models.IntegerField(default=0, db_index=True)  # Índice para ordenação

    last_update = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['-discount_percentage']),  # Para ordenar por desconto
            models.Index(fields=['platform', 'genre']),     # Para filtros combinados
            models.Index(fields=['-last_update']),          # Para jogos recentes
        ]

    def __str__(self):
        return self.title


class GamePriceHistory(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name="history", db_index=True)
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    discount_percentage = models.IntegerField(default=0)
    date = models.DateField(auto_now_add=True, db_index=True)  # Índice para ordenação

    class Meta:
        ordering = ["-date"]
        indexes = [
            models.Index(fields=['game', '-date']),  # Para histórico por jogo
        ]

    def __str__(self):
        return f"{self.game.title} - {self.discount_percentage}%"
