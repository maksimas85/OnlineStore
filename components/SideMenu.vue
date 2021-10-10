<template>
  <aside class="border-r border-black h-screen">
    <section class="flex flex-col md:px-1 md:py-1 sm:py-1 sm:px-1 lg:py-1">
      <h3 class="font-medium uppercase">all brands</h3>
      <ul>
        <li v-for="brand in brands" :key="brand.id">
          <nuxt-link :to="`/brands/${brand.id}`" exact class="cursor-pointer">
            {{ brand.title }}
          </nuxt-link>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script>
export default {
  name: "SideMenu",
  computed: {
    brands() {
      return this.$store.getters["brands/getBrands"];
    },
  },
  mounted() {
    this.$store.dispatch("brands/getBrands");
    this.$store.dispatch("products/getProducts");
  },
};
</script>

<style scoped>
.nuxt-link-active {
  color: crimson;
}
</style>
