# PSN Analytics App

Aplicativo React Native para visualizar e analisar ofertas da PlayStation Store em tempo real.

![alt text](image.png) ![alt text](image-2.png) ![alt text](image-1.png)

## 🚀 Tecnologias

- React Native + Expo
- TypeScript
- React Navigation
- Context API + useMemo/useCallback
- Axios
- Django REST API (Backend)

## 📱 Funcionalidades

- **Dashboard**: Lista de jogos em promoção com estatísticas
- **Analytics**: Gráficos e análises detalhadas
- **Detalhes**: Informações completas de cada jogo
- **API Real**: Integração com backend Django
- **Fallback**: 3 jogos mock se API falhar
- **Context Global**: Dados compartilhados e otimizados

## 📁 Estrutura

```
src/
├── components/          # Componentes reutilizáveis
│   └── GameCard/
├── screens/            # Telas do app
│   ├── DashboardScreen/
│   ├── AnalyticsScreen/
│   └── GameDetailsScreen/
├── navigator/          # Configuração de navegação
├── contexts/           # Context API (GamesContext)
├── service/            # API e integração backend
├── data/              # Dados mock (fallback)
├── types/             # TypeScript types
└── config/            # Configurações (API, etc)
```

## 🛠️ Como Usar

### 1. Instalação

```bash
npm install
```

### 2. Configurar IP do Backend

Edite `src/config/api.config.js`:

```javascript
const LOCAL_IP = "SEU_IP_AQUI"; // Ex: 192.168.0.10
```

### 3. Executar

```bash
# Iniciar app
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

### 4. Backend (Django)

O backend deve estar rodando em:

```bash
cd src
python manage.py runserver 0.0.0.0:8000
```

## 🔧 Como Funciona

### Context API

O `GamesContext` gerencia estado global:

- Carrega dados da API uma vez
- Compartilha entre todas as telas
- Otimizado com `useMemo` e `useCallback`
- Fallback automático se API falhar

### API Real + Fallback

```
App inicia → GamesContext carrega API
  ✅ Sucesso: Usa dados reais do Django
  ❌ Falha: Carrega 3 jogos mock automaticamente
```

### Navegação

- **Tab Navigator**: Dashboard ↔ Analytics
- **Stack Navigator**: Detalhes do jogo

---
