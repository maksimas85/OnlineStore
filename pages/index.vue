<template>
  <ProductList :productList="products" />
</template>

<script>
import ProductList from "~/components/ProductList";
export default {
  components: { ProductList },
  layout: "default",
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>
