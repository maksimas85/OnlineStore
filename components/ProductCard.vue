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
        <ButtonOption :option="option" :product="product" :listProduct="listProduct" @changeOption="changeFilter" />
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
import ButtonOption from '~/components/ButtonOption';

export default {
  name: 'ProductCard',
  components: { ButtonOption },
  props: ['product'],
  data() {
    return {
      img: this.$props.product.image,
      variants: this.$props.product.variants,
      listProduct: {
        color: null,
        size: null,
      },
      curProduct: {
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

      if (item.type === 'configurable' && this.curProduct?.color && this.curProduct?.size) {
        const currentEl = {};
        this.variants.forEach((el) => {
          currentEl[el.product.id] = el.product;
          el.attributes.forEach((item) => {
            currentEl[el.product.id][item.code] = item;
          });
        });

        const currentProductId = Object.values(currentEl).find(
          (el) => el.color.value_index === this.curProduct.color && el.size.value_index === this.curProduct.size
        ).id;

        this.$store.dispatch('order/addProductInCart', {
          ...item,
          id: currentProductId,
        });
      }
      localStorage.setItem('cart', JSON.stringify(this.$store.getters['order/getProductsCart']));
      localStorage.setItem('brands', JSON.stringify(this.$store.getters['brands/getBrands']));
    },

    changeFilter(arrOption, code, id) {
      this.curProduct[code] = id;
      this.listProduct[code] = arrOption;
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
