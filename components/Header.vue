<template>
  <header class="flex justify-between px-8 pb-4 my-4 border-b-4 border-black">
    <MainLogo />
    <CartLogo />
  </header>
</template>

<script>
import MainLogo from '~/components/MainLogo';
import CartLogo from '~/components/CartLogo';
export default {
  name: 'Header',
  components: { MainLogo, CartLogo },
  mounted() {
    this.$store.dispatch('order/loadingCartFromLocalStorage', JSON.parse(localStorage.getItem('cart')));
    this.$store.dispatch('brands/loadingBrandsFromLocalStorage', JSON.parse(localStorage.getItem('brands')));
  },
};
</script>
