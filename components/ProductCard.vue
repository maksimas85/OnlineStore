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
          :src="`https://raw.githubusercontent.com/fe-side/vue-test/master/assets${img}`"
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
        <ButtonOption
          v-for="(color, index) in option.values"
          :key="index"
          :color="color"
          @click.native="isClickedColor = index"
          :style="{ borderColor: isClickedColor === index ? 'rgb(234 179 8)' : '' }"
          @changeColor="filterOption(color.value_index, variants, confOptions)"
        ></ButtonOption>
      </div>

      <div
        class="flex flex-row"
        v-for="sOption in product.configurable_options.filter(
          (el) => el.attribute_id === 144
        )"
      >
        <ButtonOption
          v-for="(size, index) in (sizeArr || sOption.values)"
          :key="index"
          :size="size"
          @click.native="isClickedSize = index"
          :style="{ borderColor: isClickedSize === index ? 'rgb(234 179 8)' : '' }"
          @changeSize="filterProduct(size.value_index)"
        >
          <span class="flex justify-center items-center w-full h-full text-xs">
            {{ size.label }}
          </span>
        </ButtonOption>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonOption from "~/components/ButtonOption";
export default {
  name: "ProductCard",
  components: { ButtonOption },
  props: ["product"],
  data() {
    return {
      variants: this.$props.product.variants,
      confOptions: this.$props.product.configurable_options,
      sizeArr: null,
      img: this.$props.product.image,
      listProduct: [],
      curProduct: null,
      isClickedColor: null,
      isClickedSize: null
    }
  },
  computed: {
    brands() {
      return this.$store.getters["brands/getBrands"];
    },
  },
  methods: {
    addProductInCart(item) {
      this.$store.dispatch("order/addProductInCart", {...item, id: this.curProduct?.product?.id || item.id});
      localStorage.setItem(
        "cart",
        JSON.stringify(this.$store.getters["order/getProductsCart"])
      );
      localStorage.setItem(
        "brands",
        JSON.stringify(this.$store.getters["brands/getBrands"])
      );
    },
    filterOption(id, variants, opt) {
      const sizeOption = variants.filter(el => el.attributes.find(i => i.value_index === id));
      this.listProduct = sizeOption;

      // this.img = sizeOption.find(el => el).product.image;

      const filterSize = sizeOption.map(item => {
        return item.attributes.filter(i => i.code === "size")
      }).flat();

      const objSize = opt.find(el => el.attribute_code === "size");
      const sizeIdx = filterSize.map(s => s.value_index);

      this.sizeArr = sizeIdx.map(l => {
        return objSize.values.find(el => el.value_index === l)
      });
    },
    filterProduct(id) {
      if (this.listProduct.length) {
        this.curProduct = this.listProduct.find(item => {
          return item.attributes.find(el => el.value_index === id)
        })
      }
    }
  },
};
</script>
