<template>
  <div class="flex">
    <button
      class="sizeButton w-7 h-4 mr-1 cursor-pointer border-2 border-solid border-black hover:border-yellow-500"
      @click="changeSize(value.value_index, index)"
    >
      <span class="flex justify-center items-center w-full h-full text-xs">
        {{ value.label }}
      </span>
    </button>
  </div>
</template>
<!--        :disabled="SizeInStock !== undefined ? val.label !== SizeInStock : false"-->
<!--        :class="{ 'border-yellow-500': isClicked.size === index }"-->

<script>
export default {
  name: 'ButtonSizeOption',
  props: ['value'],
  // computed: {
  //   SizeInStock() {
  //     if (this.sizeArr && this.value && this.sizeArr.length !== this.value.length) {
  //       const idx = this.value.findIndex((el) => el.label === this.sizeArr.find((el) => el).label);
  //       return this.value[idx].label;
  //     }
  //   },
  // },
  // methods: {
  //   changeSize(id, index) {
  //     this.isClicked.size = index;
  //     this.$emit('changeSize', id);
  //   },
  // },
};
</script>

<style scoped>
.sizeButton:disabled {
  border: 2px solid gray !important;
  background-color: lightgray;
}
</style>
