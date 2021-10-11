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
                  "
                >
                  Price
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
                  "
                >
                  Total
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only"></span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(product, index) in products" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        class="h-10 w-10 rounded-full"
                        :src="`https://raw.githubusercontent.com/fe-side/vue-test/master/assets/images/${product.id}.png`"
                        alt=""
                      />
                    </div>
                    <div class="flex ml-4">
                      <div class="mr-1 text-sm font-medium text-gray-900">
                        {{ product.brand }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ product.title }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="flex px-6 py-6 whitespace-nowrap">
                  <div class="mr-1 text-sm text-gray-900">
                    {{ product.regular_price.value }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ product.regular_price.currency }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="
                      px-2
                      inline-flex
                      text-xs
                      leading-5
                      font-semibold
                      rounded-full
                      bg-green-100
                      text-green-800
                    "
                  >
                    {{ product.qty }}
                  </span>
                </td>
                <td
                  class="flex px-6 py-6 whitespace-nowrap text-sm text-gray-500"
                >
                  <div class="mr-1 text-sm text-gray-900">
                    {{ product.regular_price.value * product.qty }}
                  </div>
                  <div class="text-sm text-gray-500">
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
                  "
                >
                  <button @click="removeOrder">
                    <img
                      class="v-8 h-8"
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
  layout: "orderlayout",
  computed: {
    products() {
      return this.$store.getters["order/getProductsOrder"];
    },
    subTotal() {
      return this.products.reduce((acc, item) => {
        return (acc = acc + item.qty * item.regular_price.value);
      }, 0);
    },
  },
  methods: {
    removeOrder() {
      this.$store.commit("order/remove", this.product);
    },
  },
};
</script>
