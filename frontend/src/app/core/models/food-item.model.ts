export interface FoodItem {
  id?: number;
  name: string;
  quantity: number;
  category: string;
  expiration: string; // ISO date: "2026-05-15"
}

export const CATEGORIES = [
  'Dairy',
  'Meat',
  'Seafood',
  'Vegetables',
  'Fruits',
  'Grains',
  'Beverages',
  'Condiments',
  'Snacks',
  'Frozen Foods',
  'Other',
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  Dairy: '#1565c0',
  Meat: '#b71c1c',
  Seafood: '#00695c',
  Vegetables: '#2e7d32',
  Fruits: '#e65100',
  Grains: '#6d4c41',
  Beverages: '#4527a0',
  Condiments: '#f57f17',
  Snacks: '#ad1457',
  'Frozen Foods': '#0277bd',
  Other: '#546e7a',
};

export const CATEGORY_ICONS: Record<string, string> = {
  Dairy: 'egg',
  Meat: 'set_meal',
  Seafood: 'set_meal',
  Vegetables: 'eco',
  Fruits: 'apple',
  Grains: 'grain',
  Beverages: 'local_drink',
  Condiments: 'restaurant',
  Snacks: 'cookie',
  'Frozen Foods': 'ac_unit',
  Other: 'more_horiz',
};
