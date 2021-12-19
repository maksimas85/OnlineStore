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
          :src="`https://raw.githubusercontent.com/fe-side/vue-test/master/assets${product.image}`"
          :alt="product.title"
          class="
            w-full
            h-full
            object-center object-cover
            group-hover:opacity-75
          "
        />
      </div>
      <div class="mr-1 mt-4 text-sm font-medium text-gray-900 sm:text-center">
        {{ brands.find((brand) => brand.id === product.brand).title }}
      </div>
      <h3 class="mt-1 text-sm text-gray-700 sm:text-center">
        {{ product.title }}
      </h3>
      <p class="mt-1 text-lg font-medium text-gray-900 sm:text-center">
        ${{ product.regular_price.value }}
        {{ product.regular_price.currency }}
      </p>
    </a>
    <div v-if="product.configurable_options" class="flex flex-col">
      <div
        class="flex flex-row my-1"
        v-for="option in product.configurable_options.filter(
          (el) => el.attribute_id === 93
        )"
      >
        <div
          v-for="color in option.values"
          class="w-7 h-4 mr-1 cursor-pointer border-2 border-solid border-black"
          :style="{ backgroundColor: color.value }"
          @click="filterOption(color.value_index, variants)"
        ></div>
      </div>
      <div
        class="flex flex-row"
        v-for="option in product.configurable_options.filter(
          (el) => el.attribute_id === 144
        )"
      >
        <div
          v-for="size in option.values"
          class="w-7 h-4 mr-1 border-2 border-solid border-black cursor-pointer"
        >
          <p class="flex justify-center items-center w-full h-full text-xs" :style="{ backgroundColor: size.value_index === 1442 ? 'white' : 'green'}">
            {{ size.label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: ["product"],
  data() {
    return {
      variants: this.$props.product.variants
    }
  },
  computed: {
    brands() {
      return this.$store.getters["brands/getBrands"];
    },
  },
  methods: {
    addProductInCart(item) {
      this.$store.dispatch("order/addProductInCart", item);
      localStorage.setItem(
        "cart",
        JSON.stringify(this.$store.getters["order/getProductsCart"])
      );
      localStorage.setItem(
        "brands",
        JSON.stringify(this.$store.getters["brands/getBrands"])
      );
    },
    filterOption(id, variants) {
      const sizeOption = variants.filter(el => el.attributes.find(i => i.value_index === id));
      const filterSize = sizeOption.map(item => {
        return item.attributes.filter(i => i.code === "size")
      })
      console.log(filterSize.flat())
      return filterSize.flat();
    }
  },
};
</script>
