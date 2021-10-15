<template>
  <div class="max-w-2xl mx-auto py-6 px-2 sm:py-2 sm:px-2 lg:max-w-7xl lg:px-6">
    <a class="group cursor-pointer" @click="addProductInCart(product)">
      <div
        class="
          w-full
          aspect-w-1 aspect-h-1
          bg-gray-200
          rounded-lg
          overflow-hidden
          xl:aspect-w-7 xl:aspect-h-8
        "
      >
        <img
          :src="`https://raw.githubusercontent.com/fe-side/vue-test/master/assets/images/${product.id}.png`"
          :alt="product.title"
          class="
            w-full
            h-full
            object-center object-cover
            group-hover:opacity-75
          "
        />
      </div>
      <h3 class="mt-4 text-sm text-gray-700">
        {{ product.title }}
      </h3>
      <p class="mt-1 text-lg font-medium text-gray-900">
        ${{ product.regular_price.value }}
        {{ product.regular_price.currency }}
      </p>
    </a>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: ["product"],
  data() {
    return {
      // newProduct: null,
      // defaultQty: {
      //   qty: 1,
      // },
    };
  },
  methods: {
    addProductInCart(item) {
      // this.newProduct = Object.assign(this.product, this.defaultQty);
      this.$store.dispatch('order/addProductInCart', item);
    },
  },
};
</script>
