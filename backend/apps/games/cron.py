from rest_framework.response import Response
from rest_framework import status

from .scraping.psn import scrape_psn_page
from .models import Game, GamePriceHistory


def run_psn_scraping(max_pages=3, mock_mode=False):
    """
    Executa o scraping da PlayStation Store e atualiza o banco de dados.
    Parâmetros:
    - max_pages: número máximo de páginas a raspar (padrão: 3)
    - mock_mode: se True, retorna dados mock (padrão: False)
    Retorna um Response do DRF com o status e os resultados.
    """
    # Scraping real (mock=False, 3 páginas)
    data = scrape_psn_page(max_pages=max_pages, mock_mode=mock_mode)
    
    if not data:
        return Response(
            {
                "status": "error",
                "message": "Nenhum dado coletado. Verifique a conexão ou os seletores CSS."
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    results = []
    games_created = 0
    games_updated = 0
    histories_created = 0 # Contador opcional para monitorar novos históricos

    for item in data:
        # Cria ou atualiza o jogo
        game, created = Game.objects.update_or_create(
            psn_id=item["psn_id"],
            defaults={
                "title": item["title"],
                "platform": item.get("platform", "PS5"),
                "genre": item.get("genre", "Diversos"),
                "image_url": item["image_url"],
                "original_price": item["original_price"],
                "discounted_price": item.get("discounted_price"),
                "discount_percentage": item["discount_percentage"],
            },
        )
        
        if created:
            games_created += 1
        else:
            games_updated += 1

        # --- LOGICA DE VERIFICAÇÃO DO HISTÓRICO ---
        # Buscamos o último histórico registrado para este jogo específico
        ultimo_historico = GamePriceHistory.objects.filter(game=game).order_by('-id').first()

        # Condições para criar um novo histórico:
        # 1. O jogo acabou de ser criado (não tem nenhum histórico ainda)
        # 2. OU o preço original mudou
        # 3. OU o preço com desconto mudou
        
        preço_mudou = (
            created or 
            ultimo_historico is None or
            ultimo_historico.original_price != item["original_price"] or
            ultimo_historico.discounted_price != item.get("discounted_price")
        )

        if preço_mudou:
            GamePriceHistory.objects.create(
                game=game,
                original_price=item["original_price"],
                discounted_price=item.get("discounted_price"),
                discount_percentage=item["discount_percentage"],
            )
            histories_created += 1
        # ------------------------------------------

        results.append({
            "psn_id": game.psn_id,
            "title": game.title,
            "discount": item["discount_percentage"],
            "created": created,
            "history_updated": preço_mudou # Informa no retorno se gerou histórico
        })

    return Response(
        {
            "status": "ok",
            "mode": "mock" if mock_mode else "real",
            "pages_scraped": max_pages,
            "total_imported": len(results),
            "games_created": games_created,
            "games_updated": games_updated,
            "histories_created": histories_created, # Novo campo na resposta
            "results": results
        },
        status=status.HTTP_200_OK,
    )
