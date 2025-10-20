// Dados fictícios para simular retorno de API
// Este arquivo contém todos os dados que seriam normalmente retornados por uma API real

// Lista de jogos fictícios com informações detalhadas
export const MOCK_GAMES = [
  {
    id: 1,
    title: "Marvel's Spider-Man Remastered",
    platform: "PS5",
    genre: "Ação",
    original_price: 249.5,
    discounted_price: 124.75,
    discount_percentage: 50,
    edition_type: "Standard",
    image_url:
      "https://image.api.playstation.com/vulcan/ap/rnd/202011/0402/C784xeOFo2wViCf4m5bxgoeH.png",
    rating: 4.8,
    release_date: "2022-08-12",
    description:
      "Jogue como Peter Parker e Miles Morales em uma aventura épica pela Nova York.",
    developer: "Insomniac Games",
    publisher: "Sony Interactive Entertainment",
  },
  {
    id: 2,
    title: "F1® 25 Iconic Edition",
    platform: "PS5",
    genre: "Corrida",
    original_price: 449.5,
    discounted_price: 359.6,
    discount_percentage: 20,
    edition_type: "Premium",
    image_url:
      "https://image.api.playstation.com/vulcan/ap/rnd/202505/1521/70a9d12de4396b9cdfda69a7e29e3833ada7d7e4201217fa.png",
    rating: 4.5,
    release_date: "2024-07-16",
    description:
      "A experiência de Fórmula 1 mais autêntica e imersiva já criada.",
    developer: "Codemasters",
    publisher: "EA Sports",
  },
  {
    id: 3,
    title: "Mortal Kombat 11 Ultimate",
    platform: "PS5PS4",
    genre: "Luta",
    original_price: 279.99,
    discounted_price: 27.99,
    discount_percentage: 90,
    edition_type: "Ultimate",
    image_url:
      "https://d5gag3xtge2og.cloudfront.net/producao/33430318/G/mk.jpg",
    rating: 4.6,
    release_date: "2020-11-17",
    description:
      "A experiência definitiva de Mortal Kombat com todos os DLCs incluídos.",
    developer: "NetherRealm Studios",
    publisher: "Warner Bros. Games",
  },
  {
    id: 4,
    title: "Cyberpunk 2077",
    platform: "PS5",
    genre: "RPG",
    original_price: 299.9,
    discounted_price: 149.95,
    discount_percentage: 50,
    edition_type: "Standard",
    image_url:
      "https://image.api.playstation.com/vulcan/ap/rnd/202008/0416/6Bo40lnWU0BhgrOUm7Cb6by3.png",
    rating: 4.2,
    release_date: "2020-12-10",
    description:
      "Um RPG de ação em mundo aberto ambientado na megalópole Night City.",
    developer: "CD Projekt RED",
    publisher: "CD Projekt",
  },
  {
    id: 5,
    title: "FIFA 24",
    platform: "PS4",
    genre: "Esporte",
    original_price: 350.0,
    discounted_price: 175.0,
    discount_percentage: 50,
    edition_type: "Standard",
    image_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8oRm17dfNR-ikbjdSUA8HRM9hCivCF8Ns1Q&s",
    rating: 4.3,
    release_date: "2023-09-29",
    description:
      "O jogo de futebol mais realista do mundo com tecnologia HyperMotion.",
    developer: "EA Vancouver",
    publisher: "EA Sports",
  },
  {
    id: 6,
    title: "God of War Ragnarök",
    platform: "PS5",
    genre: "Ação",
    original_price: 349.9,
    discounted_price: 279.92,
    discount_percentage: 20,
    edition_type: "Standard",
    image_url:
      "https://m.media-amazon.com/images/S/aplus-media-library-service-media/47d71018-ac81-4a88-a841-f01c0b2bd935.__CR0,0,970,600_PT0_SX970_V1___.png",
    rating: 4.9,
    release_date: "2022-11-09",
    description:
      "Kratos e Atreus embarcam em uma jornada mítica em busca de respostas.",
    developer: "Santa Monica Studio",
    publisher: "Sony Interactive Entertainment",
  },
  {
    id: 7,
    title: "The Last of Us Part I",
    platform: "PS5",
    genre: "Aventura",
    original_price: 299.9,
    discounted_price: 149.95,
    discount_percentage: 50,
    edition_type: "Standard",
    image_url:
      "https://cdn1.epicgames.com/offer/0c40923dd1174a768f732a3b013dcff2/EGS_TheLastofUsPartI_NaughtyDogLLC_S1_2560x1440-3659b5fe340f8fc073257975b20b7f84",
    rating: 4.7,
    release_date: "2022-09-02",
    description:
      "Uma experiência de sobrevivência emocional em um mundo pós-apocalíptico.",
    developer: "Naughty Dog",
    publisher: "Sony Interactive Entertainment",
  },
  {
    id: 8,
    title: "Horizon Forbidden West",
    platform: "PS5PS4",
    genre: "RPG",
    original_price: 299.9,
    discounted_price: 149.95,
    discount_percentage: 50,
    edition_type: "Standard",
    image_url:
      "https://image.api.playstation.com/vulcan/ap/rnd/202107/3100/ki0STHGAkIF06Q4AU8Ow4OkV.png",
    rating: 4.6,
    release_date: "2022-02-18",
    description:
      "Explore um mundo pós-apocalíptico vibrante e perigoso como Aloy.",
    developer: "Guerrilla Games",
    publisher: "Sony Interactive Entertainment",
  },
  {
    id: 9,
    title: "Gran Turismo 7",
    platform: "PS5",
    genre: "Corrida",
    original_price: 349.9,
    discounted_price: 279.92,
    discount_percentage: 20,
    edition_type: "Standard",
    image_url:
      "https://image.api.playstation.com/vulcan/ap/rnd/202109/1321/eFGBuaRr21HUpGtsy3biwJip.png",
    rating: 4.4,
    release_date: "2022-03-04",
    description: "O simulador de corrida definitivo com mais de 400 carros.",
    developer: "Polyphony Digital",
    publisher: "Sony Interactive Entertainment",
  },
  {
    id: 10,
    title: "Ghost of Tsushima Director's Cut",
    platform: "PS5",
    genre: "Ação",
    original_price: 299.9,
    discounted_price: 149.95,
    discount_percentage: 50,
    edition_type: "Director's Cut",
    image_url:
      "https://gmedia.playstation.com/is/image/SIEPDC/ghost-of-tsushima-directors-cut-keyart-01-en-15jun21?$facebook$",
    rating: 4.8,
    release_date: "2021-08-20",
    description:
      "Uma aventura samurai épica no Japão feudal com a expansão Iki Island.",
    developer: "Sucker Punch Productions",
    publisher: "Sony Interactive Entertainment",
  },
];

// Dados para gráficos e análises
export const ANALYTICS_DATA = {
  // Distribuição de jogos por gênero
  genreDistribution: [
    { genre: "Ação", count: 4, percentage: 40 },
    { genre: "RPG", count: 2, percentage: 20 },
    { genre: "Corrida", count: 2, percentage: 20 },
    { genre: "Aventura", count: 1, percentage: 10 },
    { genre: "Luta", count: 1, percentage: 10 },
  ],

  // Distribuição de jogos por plataforma
  platformDistribution: [
    { platform: "PS5", count: 7, percentage: 70 },
    { platform: "PS4", count: 1, percentage: 10 },
    { platform: "PS5PS4", count: 2, percentage: 20 },
  ],

  // Distribuição de descontos
  discountDistribution: [
    { range: "0-20%", count: 3, percentage: 30 },
    { range: "21-50%", count: 6, percentage: 60 },
    { range: "51-90%", count: 1, percentage: 10 },
  ],

  // Evolução de preços ao longo do tempo (simulado)
  priceEvolution: [
    { month: "Jan", avgPrice: 280.5, avgDiscount: 35 },
    { month: "Fev", avgPrice: 275.2, avgDiscount: 38 },
    { month: "Mar", avgPrice: 265.8, avgDiscount: 42 },
    { month: "Abr", avgPrice: 260.4, avgDiscount: 45 },
    { month: "Mai", avgPrice: 255.1, avgDiscount: 48 },
    { month: "Jun", avgPrice: 250.75, avgDiscount: 50 },
  ],

  // Top jogos por rating
  topRatedGames: [
    { title: "God of War Ragnarök", rating: 4.9 },
    { title: "Marvel's Spider-Man Remastered", rating: 4.8 },
    { title: "Ghost of Tsushima Director's Cut", rating: 4.8 },
    { title: "The Last of Us Part I", rating: 4.7 },
    { title: "Mortal Kombat 11 Ultimate", rating: 4.6 },
  ],

  // Estatísticas gerais
  generalStats: {
    totalGames: 10,
    averageDiscount: 42,
    averagePrice: 219.89,
    totalSavings: 1299.51,
    bestDeal: "Mortal Kombat 11 Ultimate",
    bestDealDiscount: 90,
  },
};

// Função para simular chamada de API com delay
export const mockApiCall = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};

// Simulação de endpoints de API
export const API_ENDPOINTS = {
  // Buscar todos os jogos
  getGames: () => mockApiCall(MOCK_GAMES),

  // Buscar jogo por ID
  getGameById: (id) => mockApiCall(MOCK_GAMES.find((game) => game.id === id)),

  // Buscar dados de análise
  getAnalytics: () => mockApiCall(ANALYTICS_DATA),

  // Buscar jogos por filtro
  getGamesByFilter: (filter) => {
    let filteredGames = [...MOCK_GAMES];

    if (filter.genre) {
      filteredGames = filteredGames.filter((game) =>
        game.genre.toLowerCase().includes(filter.genre.toLowerCase())
      );
    }

    if (filter.platform) {
      filteredGames = filteredGames.filter(
        (game) => game.platform === filter.platform
      );
    }

    if (filter.maxPrice) {
      filteredGames = filteredGames.filter(
        (game) => game.discounted_price <= filter.maxPrice
      );
    }

    return mockApiCall(filteredGames);
  },
};
