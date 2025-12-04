// Tipos e interfaces do projeto

export interface Game {
  id: number;
  title: string;
  platform: string;
  genre: string;
  original_price: number;
  discounted_price: number;
  discount_percentage: number;
  rating: number;
  release_date: string;
  image_url: string;
  description: string;
  edition_type: string;
  developer: string;
  publisher: string;
}

export interface GeneralStats {
  totalGames: number;
  averageDiscount: number;
  averagePrice: number;
  totalSavings: number;
  bestDeal: string;
  worstDeal: string;
  bestDealDiscount: number;
}

export interface GenreDistribution {
  genre: string;
  count: number;
  percentage: number;
}

export interface PlatformDistribution {
  platform: string;
  count: number;
  percentage: number;
}

export interface PriceRange {
  range: string;
  count: number;
}

export interface DiscountRange {
  range: string;
  count: number;
  percentage: number;
}

export interface PriceTrend {
  month: string;
  avgPrice: number;
}

export interface TopGame {
  title: string;
  rating: number;
  discount: number;
}

export interface Analytics {
  generalStats: GeneralStats;
  genreDistribution: GenreDistribution[];
  platformDistribution: PlatformDistribution[];
  priceRanges: PriceRange[];
  discountRanges: DiscountRange[];
  priceTrends: PriceTrend[];
  topRatedGames: TopGame[];
  totalGames: number;
  totalSavings: number;
  bestDeal: string;
  bestDealDiscount: number;
  priceEvolution: PriceTrend[];
  discountDistribution: DiscountRange[];
}
