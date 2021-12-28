<template>
  <div class="flex flex-col justify-between max-w-2xl mx-auto py-6 px-2 sm:py-2 sm:px-2 lg:max-w-7xl lg:px-6">
    <a class="group cursor-pointer">
      <div class="w-full h-32 aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <div v-if="!loading" class="item mt-4 w-full h-full">
          <i class="loader --1"></i>
        </div>
        <img
          v-else
          :src="`https://raw.githubusercontent.com/fe-side/vue-test/master/assets${img}`"
          :alt="product.title"
          class="w-full h-full object-center object-cover group-hover:opacity-75"
        />
      </div>
      <div class="mr-1 mt-4 text-sm font-medium text-gray-900 sm:text-center">
        {{ currentBrand }}
      </div>
      <h3 class="mt-1 text-sm text-gray-700 sm:text-center">
        {{ product.title }}
      </h3>
      <p class="mt-1 text-lg font-medium text-gray-900 sm:text-center">
        ${{ product.regular_price.value }}
        {{ product.regular_price.currency }}
      </p>
    </a>
    <div v-if="product.configurable_options">
      <div v-for="(option, index) in product.configurable_options" :key="index">
        <component
          :is="option.attribute_code"
          :value="option.values"
          :isClicked="isClicked"
          :sizeArr="sizeArr"
          @changeColor="filterOption"
          @changeSize="filterProduct"
        ></component>
      </div>
    </div>
    <div class="mt-5">
      <div class="rounded-md shadow">
        <button
          @click="addProductInCart(product)"
          class="
            w-full
            flex
            items-center
            justify-center
            px-2
            py-1
            border border-transparent
            text-base
            font-medium
            rounded-md
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            md:text-lg
          "
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonSizeOption from '~/components/ButtonSizeOption';
import ButtonColorOption from '~/components/ButtonColorOption';

export default {
  name: 'ProductCard',
  components: {
    size: ButtonSizeOption,
    color: ButtonColorOption,
  },
  props: ['product'],
  data() {
    return {
      variants: this.$props.product.variants,
      confOptions: this.$props.product.configurable_options,
      sizeArr: null,
      img: this.$props.product.image,
      listProduct: [],
      curProduct: null,
      isClicked: {
        color: null,
        size: null,
      },
    };
  },
  computed: {
    brands() {
      return this.$store.getters['brands/getBrands'];
    },
    currentBrand() {
      return this.brands.find((brand) => brand.id === this.$props.product.brand).title;
    },
    loading() {
      return this.$store.getters['products/getIsLoading'];
    },
  },
  methods: {
    addProductInCart(item) {
      if (item.type === 'simple') {
        this.$store.dispatch('order/addProductInCart', item);
      }

      if (item.type === 'configurable' && this.curProduct?.product?.id) {
        this.$store.dispatch('order/addProductInCart', {
          ...item,
          id: this.curProduct.product.id,
        });
      }
      localStorage.setItem('cart', JSON.stringify(this.$store.getters['order/getProductsCart']));
      localStorage.setItem('brands', JSON.stringify(this.$store.getters['brands/getBrands']));
    },

    filterOption(id) {
      this.curProduct = null;
      this.isClicked.size = null;
      const sizeOption = this.variants.filter((el) => el.attributes.find((i) => i.value_index === id));
      this.listProduct = sizeOption;

      // this.img = sizeOption.find(el => el).product.image;

      const filterSize = sizeOption
        .map((item) => {
          return item.attributes.filter((i) => i.code === 'size');
        })
        .flat();

      const objSize = this.confOptions.find((el) => el.attribute_code === 'size');
      const sizeIdx = filterSize.map((s) => s.value_index);

      this.sizeArr = sizeIdx.map((l) => {
        return objSize.values.find((el) => el.value_index === l);
      });
    },

    filterProduct(id) {
      if (this.listProduct.length) {
        this.curProduct = this.listProduct.find((item) => {
          return item.attributes.find((el) => el.value_index === id);
        });
      }
    },
  },
};
</script>

<style>
.item {
  background: rgba(255, 255, 255, 0.1);
  display: grid;
  place-items: center;
  border-radius: 4px;
  transition: opacity 0.4s ease;
}

.loader {
  --color: blue;
  --size-mid: 6vmin;

  position: relative;
  width: 50%;
  display: grid;
  place-items: center;
}

.loader::before,
.loader::after {
  content: '';
  box-sizing: border-box;
  position: absolute;
}

.loader.--1::before {
  width: var(--size-mid);
  height: var(--size-mid);
  border: 4px solid var(--color);
  border-top-color: transparent;
  border-radius: 50%;
  animation: loader-1 1s linear infinite;
}

.loader.--1::after {
  width: calc(var(--size-mid) - 2px);
  height: calc(var(--size-mid) - 2px);
  border: 2px solid transparent;
  border-top-color: var(--color);
  border-radius: 50%;
  animation: loader-1 0.6s linear reverse infinite;
}

@keyframes loader-1 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
