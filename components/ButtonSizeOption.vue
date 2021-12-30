<template>
  <div class="flex">
    <button
      class="optionButton w-7 h-4 mr-1 cursor-pointer border-2 border-solid border-black hover:border-yellow-500"
      :class="{ 'border-yellow-500': idIndex === value.value_index }"
      :disabled="false"
    >
      <span class="flex justify-center items-center w-full h-full text-xs">
        {{ value.label }}
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonSizeOption',
  props: ['value', 'idIndex', 'isDisabled'],
  // computed: {
  //   SizeInStock() {
  //     if (this.sizeArr && this.value && this.sizeArr.length !== this.value.length) {
  //       const idx = this.value.findIndex((el) => el.label === this.sizeArr.find((el) => el).label);
  //       return this.value[idx].label;
  //     }
  //   },
  // }
};
</script>

<style scoped>
.optionButton:disabled {
  border: 2px solid gray !important;
  background-color: lightgray;
}
</style>
