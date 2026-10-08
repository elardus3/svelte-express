import express from 'express';
import type { Product, Sort, Store } from '../shared/types.ts';

/**
 * Get a random integer between 0 and the max
 * @param max defaults to 10 if omitted
 */
function getRandomInt(max: number = 10): number {
  return Math.floor(Math.random() * max);
}

/**
 * Adjust the given base price up randomly by between 0 to 1%
 * @param base price in cents
 */
function adjustPrice(base: number): number {
  const random = 1 + Math.random() / 100;
  return Math.floor(base * random);
}

let id = 0;
const catalog: Product[] = [
  { id: ++id, name: 'Oats', brand: 'PNP', store: 'PNP', price: adjustPrice(3699), qty: getRandomInt() },
  { id: ++id, name: 'Oats', brand: 'Spar', store: 'Spar', price: adjustPrice(4299), qty: getRandomInt() },
  { id: ++id, name: 'Oats', brand: 'Jungle', store: 'Spar', price: adjustPrice(4699), qty: getRandomInt() },
  { id: ++id, name: 'Oats', brand: 'Bokomo', store: 'Checkers', price: adjustPrice(3699), qty: getRandomInt() },
  { id: ++id, name: 'Oats', brand: 'La Italiana', store: 'Spar', price: adjustPrice(3699), qty: getRandomInt() },
  { id: ++id, name: 'Oats', brand: 'Checkers', store: 'Checkers', price: adjustPrice(3499), qty: getRandomInt() },
  { id: ++id, name: 'Oats', brand: 'Morning Mills', store: 'Checkers', price: adjustPrice(3999), qty: getRandomInt() },
  { id: ++id, name: 'Skimmed Milk', brand: 'Spar', store: 'Spar', price: adjustPrice(9999), qty: getRandomInt() },
  { id: ++id, name: 'Low Fat Milk', brand: 'Spar', store: 'Spar', price: adjustPrice(9999), qty: getRandomInt() },
  { id: ++id, name: 'Full Cream Milk', brand: 'PNP', store: 'PNP', price: adjustPrice(9799), qty: getRandomInt() },
  { id: ++id, name: 'Full Cream Milk', brand: 'Spar', store: 'Spar', price: adjustPrice(9999), qty: getRandomInt() },
  { id: ++id, name: 'Full Cream Milk', brand: 'Clover', store: 'PNP', price: adjustPrice(11649), qty: getRandomInt() },
  { id: ++id, name: 'Full Cream Milk', brand: 'Fair Cape', store: 'PNP', price: adjustPrice(10499), qty: getRandomInt() },
  { id: ++id, name: 'Full Cream Milk', brand: 'Dewfresh', store: 'Checkers', price: adjustPrice(10999), qty: getRandomInt() },
  { id: ++id, name: 'Full Cream Milk', brand: 'First Choice', store: 'Checkers', price: adjustPrice(9999), qty: getRandomInt() },
  { id: ++id, name: 'Full Cream Milk', brand: 'Crystal Valley', store: 'Checkers', price: adjustPrice(9999), qty: getRandomInt() },
  { id: ++id, name: 'Smooth Peanut Butter', brand: 'Yum Yum', store: 'PNP', price: adjustPrice(10999), qty: getRandomInt() },
  { id: ++id, name: 'Smooth Peanut Butter', brand: 'Thokoman', store: 'PNP', price: adjustPrice(9999), qty: getRandomInt() },
  { id: ++id, name: 'Crunchy Peanut Butter', brand: 'Thokoman', store: 'PNP', price: adjustPrice(9999), qty: getRandomInt() },
  { id: ++id, name: 'Smooth Peanut Butter', brand: 'Thokoman', store: 'Spar', price: adjustPrice(9999), qty: getRandomInt() },
  { id: ++id, name: 'Crunchy Peanut Butter', brand: 'Thokoman', store: 'Spar', price: adjustPrice(9999), qty: getRandomInt() },
  { id: ++id, name: 'Smooth Peanut Butter', brand: 'Yum Yum', store: 'Checkers', price: adjustPrice(9999), qty: getRandomInt() },
  { id: ++id, name: 'Smooth Peanut Butter', brand: 'Thokoman', store: 'Checkers', price: adjustPrice(9999), qty: getRandomInt() },
  { id: ++id, name: 'Crunchy Peanut Butter', brand: 'Thokoman', store: 'Checkers', price: adjustPrice(9999), qty: getRandomInt() },
  { id: ++id, name: 'Smooth Peanut Butter', brand: 'Housebrand', store: 'Checkers', price: adjustPrice(6999), qty: getRandomInt() },
  { id: ++id, name: 'Crunchy Peanut Butter', brand: 'Housebrand', store: 'Checkers', price: adjustPrice(6999), qty: getRandomInt() },
  { id: ++id, name: 'Smooth Peanut Butter', brand: `Pot O' Gold`, store: 'Checkers', price: adjustPrice(7499), qty: getRandomInt() },
  { id: ++id, name: 'Crunchy Peanut Butter', brand: `Pot O' Gold`, store: 'Checkers', price: adjustPrice(7499), qty: getRandomInt() },
  { id: ++id, name: 'Smooth Peanut Butter', brand: 'Simple Truth', store: 'Checkers', price: adjustPrice(7999), qty: getRandomInt() },
  { id: ++id, name: 'Crunchy Peanut Butter', brand: 'Simple Truth', store: 'Checkers', price: adjustPrice(7999), qty: getRandomInt() },
];

const productsUrl = '/api/products/';

const corsResponse = (_req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
};

const randomDelay = (req: any, _res: any, next: any) => {
  if (req.method === 'GET' && req.originalUrl.startsWith(productsUrl)) {
    setTimeout(() => next(), getRandomInt(3) * 1000);
    return;
  }

  next();
};

const randomError = (req: any, res: any, next: any) => {
  if (req.method === 'GET' && req.originalUrl.startsWith(productsUrl)) {
    if (getRandomInt() >= 3) next();
    else res.status(500).json({ result: false, error: 'Randomly simulated error' });
    return;
  }

  next();
};

const app = express();
const port = 8080;

// middleware
app.use(corsResponse);
app.use(randomDelay);
app.use(randomError);

// GET /api/products/
app.get(productsUrl, (req, res) => {
  const search = (req.query.search as string)?.toLowerCase();
  let products: Product[] = search
    ? catalog.filter(p => p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search))
    : [...catalog];

  const store: Store = req.query.store as Store;
  if (store) products = products.filter(p => p.store === store);

  const sort: Sort = req.query.sort as Sort;
  if (sort === 'Price') products.sort((a, b) => a.price - b.price);
  else products.sort((a, b) => a.name.localeCompare(b.name));

  res.status(200).json({ result: true, products });
});

app.listen(port, () => console.log(`server started on port ${port}`));
