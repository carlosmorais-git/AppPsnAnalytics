from django.core.management.base import BaseCommand
from apps.games.models import Game, GamePriceHistory


class Command(BaseCommand):
    help = 'Popula o banco com jogos de teste'

    def handle(self, *args, **options):
        games_data = [
            {
                "psn_id": "gow-ragnarok-ps5",
                "title": "God of War Ragnarök",
                "platform": "PS5",
                "genre": "Ação",
                "image_url": "https://mock.image/gow.jpg",
                "original_price": 349.90,
                "discounted_price": 249.90,
                "discount_percentage": 28,
            },
            {
                "psn_id": "spiderman-2-ps5",
                "title": "Spider-Man 2",
                "platform": "PS5",
                "genre": "Ação",
                "image_url": "https://mock.image/spiderman2.jpg",
                "original_price": 349.90,
                "discounted_price": 299.90,
                "discount_percentage": 14,
            },
            {
                "psn_id": "tlou-part1-ps5",
                "title": "The Last of Us Part I",
                "platform": "PS5",
                "genre": "Ação",
                "image_url": "https://mock.image/tlou1.jpg",
                "original_price": 349.90,
                "discounted_price": 199.90,
                "discount_percentage": 43,
            },
            {
                "psn_id": "horizon-fw-ps5",
                "title": "Horizon Forbidden West",
                "platform": "PS5",
                "genre": "RPG",
                "image_url": "https://mock.image/hfw.jpg",
                "original_price": 349.90,
                "discounted_price": 229.90,
                "discount_percentage": 34,
            },
            {
                "psn_id": "returnal-ps5",
                "title": "Returnal",
                "platform": "PS5",
                "genre": "Roguelike",
                "image_url": "https://mock.image/returnal.jpg",
                "original_price": 349.90,
                "discounted_price": 139.90,
                "discount_percentage": 60,
            },
            {
                "psn_id": "demons-souls-ps5",
                "title": "Demon's Souls",
                "platform": "PS5",
                "genre": "RPG",
                "image_url": "https://mock.image/demonsouls.jpg",
                "original_price": 349.90,
                "discounted_price": 179.90,
                "discount_percentage": 49,
            },
            {
                "psn_id": "bloodborne-ps4",
                "title": "Bloodborne",
                "platform": "PS4",
                "genre": "RPG",
                "image_url": "https://mock.image/bloodborne.jpg",
                "original_price": 199.90,
                "discounted_price": 49.90,
                "discount_percentage": 75,
            },
            {
                "psn_id": "ghost-tsushima-dc-ps5",
                "title": "Ghost of Tsushima Director's Cut",
                "platform": "PS5",
                "genre": "Ação",
                "image_url": "https://mock.image/ghostdc.jpg",
                "original_price": 349.90,
                "discounted_price": 229.90,
                "discount_percentage": 34,
            },
            {
                "psn_id": "ff7-intergrade-ps5",
                "title": "Final Fantasy VII Remake Intergrade",
                "platform": "PS5",
                "genre": "RPG",
                "image_url": "https://mock.image/ff7.jpg",
                "original_price": 299.90,
                "discounted_price": 159.90,
                "discount_percentage": 47,
            },
            {
                "psn_id": "elden-ring-ps5",
                "title": "Elden Ring",
                "platform": "PS5",
                "genre": "RPG",
                "image_url": "https://mock.image/eldenring.jpg",
                "original_price": 299.90,
                "discounted_price": 199.90,
                "discount_percentage": 33,
            },
        ]

        games_created = 0
        history_created = 0

        for item in games_data:
            # Cria ou busca o jogo
            game, created = Game.objects.get_or_create(
                psn_id=item["psn_id"],
                defaults={
                    "title": item["title"],
                    "platform": item["platform"],
                    "genre": item["genre"],
                    "image_url": item["image_url"],
                    "original_price": item["original_price"],
                    "discounted_price": item["discounted_price"],
                    "discount_percentage": item["discount_percentage"],
                }
            )
            
            if created:
                games_created += 1
                self.stdout.write(self.style.SUCCESS(f'✓ Jogo criado: {game.title}'))
            else:
                self.stdout.write(self.style.WARNING(f'- Jogo já existe: {game.title}'))

            # Cria histórico de preço
            history = GamePriceHistory.objects.create(
                game=game,
                original_price=item["original_price"],
                discounted_price=item["discounted_price"],
                discount_percentage=item["discount_percentage"],
            )
            history_created += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'\n✔ Populate finalizado!\n'
                f'  - {games_created} jogos criados\n'
                f'  - {history_created} registros de histórico criados'
            )
        )
