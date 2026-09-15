export const stores = ['Checkers', 'Spar', 'PNP'] as const;
export type Store = typeof stores[number];

export const sorts = ['Name', 'Price'] as const;
export type Sort = typeof sorts[number];

export interface Product {
  id: number;
  name: string;
  brand: string;
  store: Store | null;
  price: number;
  qty: number;
}

export type ApiResult = { result: true, products: Product[] } | { result: false; error: string };
