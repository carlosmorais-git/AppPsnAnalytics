from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.games import cron

class home_ok_view(APIView):
    """
    Endpoint para verificar se a API está funcionando corretamente.
    
    Retorna uma mensagem de sucesso.
    """
    def get(self, request):
        return Response({
            "status": "success",
            "message": "Api esta funcionando corretamente"}, status=status.HTTP_200_OK)
class ScrapePSNView(APIView):
    """
    Endpoint para executar scraping da PlayStation Store
    
    Query Parameters:
    - pages: número de páginas para raspar (padrão: 1)
    - mock: true/false - usar modo mock (padrão: true)
    
    Exemplos:
    - GET /api/scrape/psn/ → scraping mock de 1 página
    - GET /api/scrape/psn/?mock=false&pages=3 → scraping real de 3 páginas
    """

    def get(self, request):
        # Parâmetros da query string
        mock_mode = request.query_params.get('mock', 'true').lower() == 'true'
        max_pages = int(request.query_params.get('pages', 1))
        
        # Limita número de páginas para evitar sobrecarga
        if max_pages > 10:
            return Response(
                {"error": "Máximo de 10 páginas permitido por requisição"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Executa o scraping via função cron
        response = cron.run_psn_scraping(max_pages=max_pages, mock_mode=mock_mode)

        return response
