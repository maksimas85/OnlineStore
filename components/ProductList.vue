<template>
  <div class="bg-white">
    <h2 v-if='!products.length' class='text-x1 md:text-2xl sm:pl-3 md:pl-12 mt-4'>Sorry, no products</h2>
    <div
      class="max-w-2xl mx-auto py-6 px-2 sm:py-4 sm:px-1 lg:max-w-7xl lg:px-6"
    >
      <div
        class="
          grid grid-cols-1
          gap-y-10
          sm:grid-cols-2
          gap-x-6
          lg:grid-cols-3
          xl:grid-cols-4 xl:gap-x-8
        "
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "~/components/ProductCard";
export default {
  name: "ProductList",
  components: { ProductCard },
  props: ['productList'],
  computed: {
    products() {
      if(!this.productList) {
        return this.$store.getters["products/getProducts"].filter(
          (item) => item.brand === +this.$route.params.id
        );
      } else {
        return this.productList.products
      }
    },
  },
};
</script>
