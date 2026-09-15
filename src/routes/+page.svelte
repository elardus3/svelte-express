<script lang="ts">
  import { onMount } from 'svelte';
  import { type ApiResult, type Product, sorts, type Sort, stores, type Store } from '../../shared/types.ts';

  let loading = $state<boolean>(true);
  let error = $state<string | null>(null);
  let search = $state<string>('');
  let store = $state<Store | null>(null);
  let sort = $state<Sort>('Name');
  let products = $state<Product[]>([]);

  function onStore(s: Store) {
    store = store === s ? null : s;
    fetchProducts();
  }

  function onSort(s: Sort) {
    if (sort !== s) {
      sort = s;
      fetchProducts();
    }
  }

  async function fetchProducts() {
    loading = true;
    error = null;

    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (store) params.append('store', store);
    params.append('sort', sort);

    const res = await fetch(`http://localhost:8080/api/products/?${params}`);
    const json: ApiResult = await res.json();

    if (json.result) products = json.products;
    else error = json.error;
    loading = false;
  }

  onMount(() => fetchProducts());
</script>

<section>
  <p>
    <label for="search">Search</label>
    <input id="search" placeholder="Search name or brand" bind:value={search} oninput={fetchProducts} />
  </p>
  <p>
    <label for="store">Store</label>
    {#each stores as s}
      <button id={s === stores[0] ? 'store' : null} class={store === s ? 'selected' : null} onclick={() => onStore(s)}>{s}</button>
    {/each}
  </p>
  <p>
    <label for="sort">Sort</label>
    {#each sorts as s}
      <button id={s === sorts[0] ? 'sort' : null} class={sort === s ? 'selected' : null} onclick={() => onSort(s)}>{s}</button>
    {/each}
  </p>
</section>

<main>
  {#if loading}
    <div class="loading"></div>
  {:else if error}
    <div class="error">
      <p>{error}</p>
      <button onclick={fetchProducts}>Retry</button>
    </div>
  {:else if products.length}
    <p>Found {products.length} {products.length >= 2 ? 'products' : 'product'}</p>
    <section>
    {#each products as product (product.id)}
      <article class={product.qty ? 'available' : null}>
        <div>{product.name}</div>
        <div>{product.brand}</div>
        {#if !store}
          <div>@ {product.store}</div>
        {/if}
        <div>R {(product.price / 100).toFixed(2)}</div>
        {#if product.qty}
          <div>{product.qty} {product.qty >= 2 ? 'units' : 'unit'} in stock</div>
          {:else}
          <div>Out of stock</div>
        {/if}
      </article>
    {/each}
    </section>
  {:else}
    No products found
  {/if}
</main>

<style>
  @media (min-width: 50em) {
    section p {
      display: inline-block;
      margin-top: 0;
      margin-bottom: 0;

      &:not(:first-child) { margin-left: 1rem }
    }
  }

  label,
  button:not(:last-child) { margin-right: 1rem }

  input,
  button {
    padding: 0.25rem 0.5rem;
    border: 1px solid #999;
  }

  button { transition: .2s }

  button:hover,
  .selected {
    background-color: blue;
    border-color: blue;
    color: #ccc;
  }

  main section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin: auto;

    @media (min-width: 30em) { grid-template-columns: repeat(2, 1fr) }
    @media (min-width: 45em) { grid-template-columns: repeat(3, 1fr) }
    @media (min-width: 60em) { grid-template-columns: repeat(4, 1fr) }
    @media (min-width: 75em) { grid-template-columns: repeat(5, 1fr) }
  }

  article {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    background-color: #ddd;

    &.available { background-color: #c1e1c1 }
  }

  .error { color: red }

  .loading {
    @media (min-width: 50em) { margin-top: 1rem }

    &:after {
      content: "";
      display: block;
      width: 60px;
      height: 60px;
      border: 3px solid #ddd;
      border-left-color: blue;
      border-radius: 50%;
      animation: rotate 2s infinite linear;
    }
  }

  @keyframes rotate { 100% { transform: rotate(360deg) } }

  @media (prefers-color-scheme: dark) {
    input,
    button { border: 1px solid #fff }

    article {
      background-color: #333;

      &.available { background-color: #020 }
    }

    .loading:after {
      border-color: #333;
      border-left-color: blue;
    }
  }
</style>
