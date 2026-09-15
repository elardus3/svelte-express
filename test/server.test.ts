import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Product } from "../shared/types.ts";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("GET products test suite", () => {
  beforeEach(() => mockFetch.mockClear());

  it("fetch products without filtering store", async () => {
    let id = 0;
    const mockProducts: Product[] = [
      { id: ++id, name: 'Oats', brand: 'PNP', store: 'PNP', price: 3699, qty: 4 },
      { id: ++id, name: 'Oats', brand: 'Spar', store: 'Spar', price: 4299, qty: 0 },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockProducts),
    });

    const url = 'http://localhost:8080/api/products/';
    const res = await fetch(url);
    const fetchedProducts = await res.json();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(url);
    expect(fetchedProducts).toEqual(mockProducts);
  });

  it("fetch products by filtering store", async () => {
    let id = 0;
    const mockProducts: Product[] = [
      { id: ++id, name: 'Oats', brand: 'Spar', store: 'Spar', price: 4299, qty: 0 },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockProducts),
    });

    const params = new URLSearchParams();
    params.append('store', 'Spar');

    const url = `http://localhost:8080/api/products/?${params}`;
    const res = await fetch(url);
    const fetchedProducts = await res.json();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(url);
    expect(fetchedProducts).toEqual(mockProducts);
  });

  it("fetch products by sorting by price", async () => {
    let id = 0;
    const mockProducts: Product[] = [
      { id: ++id, name: 'Oats', brand: 'Spar', store: 'Spar', price: 4299, qty: 0 },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockProducts),
    });

    const params = new URLSearchParams();
    params.append('sort', 'Price');

    const url = `http://localhost:8080/api/products/?${params}`;
    const res = await fetch(url);
    const fetchedProducts = await res.json();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(url);
    expect(fetchedProducts).toEqual(mockProducts);
  });

  it("fetch products by searching for text", async () => {
    let id = 0;
    const mockProducts: Product[] = [
      { id: ++id, name: 'Oats', brand: 'Spar', store: 'Spar', price: 4299, qty: 0 },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockProducts),
    });

    const params = new URLSearchParams();
    params.append('search', 'Oats');

    const url = `http://localhost:8080/api/products/?${params}`;
    const res = await fetch(url);
    const fetchedProducts = await res.json();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(url);
    expect(fetchedProducts).toEqual(mockProducts);
  });
});
