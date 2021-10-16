<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                    sm:p-1
                  "
                >
                  Item
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                    sm:p-1
                    smx:text-center
                    mdx:text-left
                  "
                >
                  <span class="sm:ml-2 smx:m-0">Price</span>
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                    sm:p-1 sm:text-center
                  "
                >
                  Qty
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                    sm:p-1
                    smx:text-center
                    mdx:text-left
                  "
                >
                  <span class="sm:ml-4 smx:m-0">Total</span>
                </th>
                <th scope="col" class="relative px-6 py-3 sm:p-1">
                  <span></span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(product, index) in products" :key="index">
                <td class="px-6 py-4 whitespace-nowrap sm:p-1">
                  <div class="flex items-center sm:flex-col mdx:flex-row">
                    <div class="h-10 w-10">
                      <img
                        class="h-10 w-10"
                        :src="`https://raw.githubusercontent.com/fe-side/vue-test/master/assets/images/${product.id}.png`"
                        alt=""
                      />
                    </div>
                    <div class="flex ml-4 sm:ml-1 sm:flex-col md:flex-row">
                      <div
                        class="
                          mr-1
                          text-sm
                          font-medium
                          text-gray-900
                          sm:text-center
                        "
                      >
                        {{
                          brands.find((brand) => brand.id === product.brand)
                            .title
                        }}
                        <span>/</span>
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ product.title }}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  class="
                    flex
                    px-6
                    py-6
                    whitespace-nowrap
                    sm:mt-6 sm:p-1 sm:flex-col
                    mdx:flex-row mdx:mt-3
                  "
                >
                  <div
                    class="
                      mdx:mr-1
                      text-sm text-gray-900
                      sm:text-center sm:text-xs sm:m-0
                    "
                  >
                    {{ product.regular_price.value }}
                  </div>
                  <div class="text-sm text-gray-500 sm:text-center sm:text-xs">
                    {{ product.regular_price.currency }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap sm:p-1">
                  <div class="flex items-center">
                    <button
                      class="flex-grow text-lg text-red-400 h-full"
                      @click="removeProduct(product.id)"
                    >
                      <span>-</span>
                    </button>
                    <span
                      class="
                        w-7
                        px-1
                        justify-center
                        inline-flex
                        text-xs
                        leading-5
                        font-semibold
                        rounded-full
                        bg-green-100
                        text-green-800
                        h-5
                      "
                    >
                      {{ product.qty }}
                    </span>
                    <button
                      class="text-lg text-green-400 h-full flex-grow"
                      @click="addProduct(product)"
                    >
                      <span>+</span>
                    </button>
                  </div>
                </td>
                <td
                  class="
                    flex
                    px-6
                    py-6
                    whitespace-nowrap
                    text-sm text-gray-500
                    sm:p-1 sm:flex-col sm:mt-6 sm:p-1 sm:flex-col
                    mdx:flex-row mdx:mt-0
                    items-center
                  "
                >
                  <div
                    class="
                      w-10
                      text-sm text-gray-900
                      sm:text-center sm:text-xs sm:m-0
                    "
                  >
                    {{
                      Number(product.regular_price.value * product.qty).toFixed(
                        2
                      )
                    }}
                  </div>
                  <div class="w-10 text-sm text-gray-500 sm:text-center mdx:text-left sm:text-xs">
                    {{ product.regular_price.currency }}
                  </div>
                </td>
                <td
                  class="
                    px-6
                    py-4
                    whitespace-nowrap
                    text-right text-sm
                    font-medium
                    sm:p-1
                  "
                >
                  <button class="flex" @click="removeFromCart(product.id)">
                    <img
                      class="v-8 h-8 justify-center"
                      src="../assets/image/remove.png"
                      alt="#"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end py-2 pr-10">
          <p class="pr-2">Subtotal:</p>
          <span>${{ subTotal }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "cart",
  computed: {
    products() {
      return this.$store.getters["order/getProductsCart"];
    },
    brands() {
      return this.$store.getters["brands/getBrands"];
    },
    subTotal() {
      return Number(
        this.products
          .reduce((acc, item) => {
            return (acc = acc + item.qty * item.regular_price.value);
          }, 0)
          .toFixed(2)
      );
    },
  },
  methods: {
    removeFromCart(id) {
      this.$store.dispatch("order/removeFromCart", { id });
      this.actionLocalStorage();
    },
    removeProduct(id) {
      this.$store.dispatch("order/removeProductFromCart", { id });
      this.actionLocalStorage();
    },
    addProduct(product) {
      this.$store.dispatch("order/addProductInCart", product);
      localStorage.setItem(
        "cart",
        JSON.stringify(this.$store.getters["order/getProductsCart"])
      );
    },
    actionLocalStorage() {
      localStorage.removeItem("cart");
      localStorage.setItem(
        "cart",
        JSON.stringify(this.$store.getters["order/getProductsCart"])
      );
    },
  },
};
</script>
