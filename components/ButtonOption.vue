<template>
  <button
    :style="{ backgroundColor: color ? color.value : false }"
    class="w-7 h-4 mr-1 cursor-pointer border-2 border-solid border-black hover:border-yellow-500"
    @click="changeColor; changeSize"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "ButtonOption",
  props: ["color", "size"],
  methods: {
    changeColor() {
      this.$emit('changeColor');
    },
    changeSize() {
      this.$emit('changeSize');
    }
  }
}
</script>
