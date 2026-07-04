// Dados fictícios para simular retorno de API
// Este arquivo contém todos os dados que seriam normalmente retornados por uma API real

// Jogos de fallback (caso a API falhe)
// Mantém apenas 3 jogos para servir como backup
export const FALLBACK_GAMES = [
  {
    id: 9999,
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
    id: 9998,
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
    id: 9997,
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
];

// Analytics de fallback (caso a API de analytics falhe)
export const FALLBACK_ANALYTICS = {
  generalStats: {
    totalGames: 3,
    averageDiscount: 53,
    averagePrice: 144.22,
    totalSavings: 344.23,
    bestDeal: "Mortal Kombat 11 Ultimate",
    bestDealDiscount: 90,
  },
  genreDistribution: [
    { genre: "Ação", count: 2, percentage: 67 },
    { genre: "Luta", count: 1, percentage: 33 },
  ],
  platformDistribution: [
    { platform: "PS5", count: 2, percentage: 67 },
    { platform: "PS5PS4", count: 1, percentage: 33 },
  ],
  discountDistribution: [
    { range: "0-20%", count: 2, percentage: 67 },
    { range: "21-50%", count: 0, percentage: 0 },
    { range: "91-100%", count: 1, percentage: 33 },
  ],
  priceEvolution: [
    { month: "Jan", avgPrice: 189.99, avgDiscount: 28 },
    { month: "Fev", avgPrice: 175.5, avgDiscount: 35 },
    { month: "Mar", avgPrice: 198.75, avgDiscount: 25 },
    { month: "Abr", avgPrice: 162.3, avgDiscount: 42 },
    { month: "Mai", avgPrice: 171.8, avgDiscount: 38 },
    { month: "Jun", avgPrice: 144.22, avgDiscount: 53 },
    { month: "Jul", avgPrice: 156.9, avgDiscount: 45 },
    { month: "Ago", avgPrice: 138.45, avgDiscount: 58 },
    { month: "Set", avgPrice: 149.2, avgDiscount: 48 },
    { month: "Out", avgPrice: 127.8, avgDiscount: 65 },
    { month: "Nov", avgPrice: 152.3, avgDiscount: 46 },
    { month: "Dez", avgPrice: 118.5, avgDiscount: 72 },
  ],
  topRatedGames: [
    { title: "God of War Ragnarök", rating: 4.9 },
    { title: "Marvel's Spider-Man Remastered", rating: 4.8 },
    { title: "Mortal Kombat 11 Ultimate", rating: 4.6 },
  ],
};
