<template>
  <div>
    <nuxt-link class="flex w-12 cursor-pointer relative" to="/cartpage">
      <img class="v-10 h-10" src="../assets/image/orderlogo.png" alt="#" />
      <span
        v-if="count"
        class="
          absolute
          -top-1
          -right-1
          border border-current
          rounded-full
          h-6
          w-6
          flex
          items-center
          justify-center
          bg-red-600
          text-sm
          font-medium
          text-white
        "
        >{{ count > 9 ? "9+" : count }}</span
      >
    </nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.getters["order/productsCartLength"];
    },
  },
};
</script>
