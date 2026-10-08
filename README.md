## Install dependencies

```sh
npm i
```

Or, on macos or linux

```sh
./install.sh
```

## Run API (backend server)

```sh
npm run server
```

Or, on macos or linux

```sh
./api.sh
```

## Run browser frontend (in new additional terminal)

```sh
npm run dev
```

Or, on macos or linux

```sh
./run.sh
```

## API endpoints

A single endpoint GET [http://localhost:8080/api/products/]() defined to fetch all products.

Add optional query parameters `search`, `store` or `sort` to refine product search.

Sample successful response:

```
{
  "result": true,
  "products": [
    {"id": 2, "name": "Crunchy Peanut Butter", "brand": "Thokoman", "store": "Checkers", "price": 9999, "qty": 9},
    {"id": 4, "name": "Crunchy Peanut Butter", "brand": "Thokoman", "store": "PNP", "price": 9999, "qty": 8}
  ]
}
```

Sample random error response:

```
{
  "result": false,
  "error": "Randomly simulated error"
}
```
