<template>
  <header class="flex justify-between px-8 pb-4 my-4 border-b-4 border-black">
    <MainLogo />
    <OrderLogo />
  </header>
</template>

<script>
import MainLogo from "~/components/MainLogo";
import OrderLogo from "~/components/OrderLogo";
export default {
  name: "Header",
  components: { MainLogo, OrderLogo },
};
</script>
