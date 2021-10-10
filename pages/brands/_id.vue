<template>
  <section>
    <h1 class="text-x1 md:text-2xl font-bold sm:pl-3 md:pl-12">Catalog</h1>
    <ProductList />
  </section>
</template>

<script>
import ProductList from "~/components/ProductList";

export default {
  layout: "default",
  components: {
    ProductList,
  },
};
</script>
