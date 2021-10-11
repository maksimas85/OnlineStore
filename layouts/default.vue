<template>
  <div class="container mx-auto px-4 pt-6 box-border">
    <Header />
    <div class="flex sm: pt-3">
      <div class="w-1/6 sm:w-1/4 md:w-1/6">
        <SideMenu />
      </div>
      <div class="w-5/6 sm:w-3/4 md:w-5/6">
        <Nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import SideMenu from "~/components/SideMenu";
export default {
  components: { SideMenu },
};
</script>
