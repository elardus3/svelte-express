<script lang="ts">
  let { product, store } = $props();
</script>

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

<style>
  article {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    background-color: #ddd;

    &.available { background-color: #c1e1c1 }
  }

  @media (prefers-color-scheme: dark) {
    article {
      background-color: #333;

      &.available {
        background-color: #020
      }
    }
  }
</style>
