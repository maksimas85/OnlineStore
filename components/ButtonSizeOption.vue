<template>
  <button
    class="
      w-7
      h-4
      mr-1
      cursor-pointer
      border-2 border-solid border-black
      hover:border-yellow-500
    "
    @click="changeSize"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonSizeOption",
  props: ["size"],
  methods: {
    changeSize() {
      this.$emit("changeSize");
    },
  },
};
</script>
