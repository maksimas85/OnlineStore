<template>
  <button
    :style="{ backgroundColor: color ? color.value : false }"
    class="
      w-7
      h-4
      mr-1
      cursor-pointer
      border-2 border-solid border-black
      hover:border-yellow-500
    "
    @click="changeColor"
  ></button>
</template>

<script>
export default {
  name: "ButtonColorOption",
  props: ["color"],
  methods: {
    changeColor() {
      console.log()
      this.$emit("changeColor");
    },
  },
};
</script>
