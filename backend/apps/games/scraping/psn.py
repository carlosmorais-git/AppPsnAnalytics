# scraping/psn.py

import requests
from bs4 import BeautifulSoup
import time
from project.settings import PSN_SCRAPING_API_URL

def parse_price(valor):
    """Converte string de preço para float"""
    if not valor:
        return None
    return float(valor.replace("R$", "").replace(",", ".").strip())


def scrape_psn_page(max_pages=1, mock_mode=True):
    """
    Scraping da PlayStation Store com paginação
    
    Args:
        max_pages (int): Número máximo de páginas para raspar (cada página ~27 jogos)
        mock_mode (bool): Se True, retorna dados mock. Se False, faz scraping real.
    
    Returns:
        list: Lista de dicionários com dados dos jogos
    """
    
    if mock_mode:
        # MODO MOCK - Dados fake para desenvolvimento
        return [
            {
                "psn_id": "spider-man-remastered-mock",
                "title": "Spider-Man Remastered",
                "platform": "PS5",
                "genre": "Ação",
                "image_url": "https://mock.image/spiderman.jpg",
                "original_price": 249.90,
                "discounted_price": 124.95,
                "discount_percentage": 50,
            },
            {
                "psn_id": "ratchet-clank-rift-apart-mock",
                "title": "Ratchet & Clank: Rift Apart",
                "platform": "PS5",
                "genre": "Aventura",
                "image_url": "https://mock.image/ratchet.jpg",
                "original_price": 349.90,
                "discounted_price": 174.95,
                "discount_percentage": 50,
            },
            {
                "psn_id": "gran-turismo-7-mock",
                "title": "Gran Turismo 7",
                "platform": "PS5",
                "genre": "Corrida",
                "image_url": "https://mock.image/gt7.jpg",
                "original_price": 349.90,
                "discounted_price": 279.92,
                "discount_percentage": 20,
            },
        ]
    
    # MODO SCRAPING REAL
    all_games = []
    
    try:
        for pagina in range(1, max_pages + 1):
            print(f"Raspando página {pagina}/{max_pages}...")
            
            link_site = f'{PSN_SCRAPING_API_URL}/{pagina}'
            
            # Faz requisição com timeout
            requisicao = requests.get(link_site, timeout=30)
            requisicao.raise_for_status()  # Levanta erro se status != 200
            
            site = BeautifulSoup(requisicao.text, 'html.parser')
            main = site.find('main')
            
            if not main:
                print(f"⚠️ Página {pagina}: elemento 'main' não encontrado")
                continue
            
            linhas = main.find_all('li')
            print(f"  Encontrados {len(linhas)} itens na página {pagina}")
            
            for item in linhas:
                try:
                    # Título do jogo
                    title_elem = item.find(class_="psw-t-body")
                    if not title_elem:
                        continue
                    title = title_elem.text.strip()
                    
                    # Imagem
                    image_elem = item.find("img")
                    image_url = image_elem["src"] if image_elem else "https://placeholder.com/300"
                    
                    # Link do jogo
                    link_elem = item.find("a")
                    if not link_elem or not link_elem.get("href"):
                        continue
                    link = link_elem["href"]
                    if not link.startswith("http"):
                        link = "https://store.playstation.com" + link
                    
                    # PSN ID (último segmento da URL)
                    psn_id = link.rstrip('/').split("/")[-1]
                    
                    # Preço com desconto (promoção)
                    discounted_price = None
                    try:
                        promo_elem = item.find(class_='psw-m-r-3')
                        if promo_elem:
                            discounted_price = parse_price(promo_elem.text)
                    except:
                        pass
                    
                    # Preço original (riscado)
                    original_price = None
                    try:
                        original_elem = item.find("s")
                        if original_elem:
                            original_price = parse_price(original_elem.text)
                    except:
                        pass
                    
                    # Se não tem preço original mas tem desconto, usa o desconto como original
                    if not original_price and discounted_price:
                        original_price = discounted_price
                        discounted_price = None
                    
                    # Calcula porcentagem de desconto
                    discount_percentage = 0
                    if discounted_price and original_price and original_price > 0:
                        discount_percentage = int((1 - discounted_price / original_price) * 100)
                    
                    game_data = {
                        "psn_id": psn_id,
                        "title": title,
                        "platform": "PS5",  # Assumindo PS5, ajuste conforme necessário
                        "genre": "Diversos",  # A PSN Store não mostra gênero na lista
                        "image_url": image_url,
                        "original_price": original_price or 0,
                        "discounted_price": discounted_price,
                        "discount_percentage": discount_percentage,
                    }
                    
                    all_games.append(game_data)
                    
                except Exception as e:
                    print(f"  ⚠️ Erro ao processar item: {e}")
                    continue
            
            # Delay entre páginas para não sobrecarregar o servidor
            if pagina < max_pages:
                time.sleep(2)
        
        print(f"\n✓ Scraping concluído: {len(all_games)} jogos coletados")
        return all_games
        
    except requests.exceptions.Timeout:
        print("❌ Erro: Timeout na requisição")
        return []
    except requests.exceptions.RequestException as e:
        print(f"❌ Erro na requisição: {e}")
        return []
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        return []