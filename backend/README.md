# 🎮 PSN Analytics API

> **API REST para scraping e análise de preços de jogos da PlayStation Store**

Extrai dados de jogos da PSN, armazena histórico de preços e fornece endpoints de analytics para dashboards e aplicativos.

---

## 🚀 Quick Start

```bash
# 1. Instalar dependências
pip install -r requirements.txt

# 2. Configurar ambiente
cp .env.example .env

# 3. Criar banco de dados
python manage.py migrate

# 4. Rodar servidor
python manage.py runserver
```

Acesse: `http://localhost:8000/api/`

---

## 📡 Endpoints Principais

### Jogos

```
GET  /api/games-viewset/              # Lista todos os jogos
GET  /api/games-viewset/{psn_id}/     # Detalhe do jogo
GET  /api/games-viewset/{psn_id}/history/  # Histórico de preços
```

### Analytics

```
GET  /api/analytics/top-discounts/    # Top descontos
GET  /api/analytics/cheapest/         # Jogos mais baratos
GET  /api/analytics/avg-discount/     # Média de descontos
```

### Scraping

```
GET  /api/scrape/psn/?mock=true       # Scraping com dados mock
GET  /api/scrape/psn/?mock=false&pages=3  # Scraping real (3 páginas)
```

**Documentação interativa:** `http://localhost:8000/swagger/`

---

## ⚙️ Como Funciona

1. **Scraping:** Extrai dados da PlayStation Store (título, preço, desconto, imagem)
2. **Armazenamento:** Salva jogos + histórico de preços no banco
3. **API:** Endpoints REST paginados com serializers otimizados
4. **Analytics:** Queries agregadas pra estatísticas e gráficos

**Modo Mock:** Usa dados fictícios pra desenvolvimento sem fazer requests reais.

---

## 🔧 Configuração Avançada

### PostgreSQL

1. Instale/garanta um servidor PostgreSQL ativo.
2. Crie banco e usuário.
3. Ajuste o arquivo `.env` com:

DB_ENGINE=postgres
DB_NAME=psn_analytics
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432

4. Instale dependências e aplique migrações:

pip install -r requirements.txt
python manage.py migrate

### CORS (pra React/React Native)

```python
# settings.py
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:19000",
]
```

### Scraping Real

```python
# Ativar modo real e ajustar páginas
GET /api/scrape/psn/?mock=false&pages=5
```

---

## 📝 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

---

## Desenvolvido

Carlos Morais https://github.com/carlosmorais-git
