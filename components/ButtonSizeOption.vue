<template>
  <div class="flex">
    <button
      class="optionButton w-7 h-4 mr-1 cursor-pointer border-2 border-solid border-black hover:border-yellow-500"
      :class="{ 'border-yellow-500': idIndex === value.value_index }"
      :disabled="sizeInStock"
    >
      <p class="flex justify-center items-center w-full h-full text-xs">
        {{ value.label }}
      </p>
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonSizeOption',
  props: ['value', 'code', 'idIndex', 'listProduct'],
  data() {
    return {
      val: this.$props.value,
    };
  },
  computed: {
    sizeInStock() {
      if (this.$props?.listProduct?.color?.length &&
        this.$props.listProduct.color.some((el) => el.code === this.$props.code)) {
          return !this.$props.listProduct.color.find((item) => item.value_index === this.val.value_index);
      }
    },
  },
};
</script>

<style scoped>
.optionButton:disabled {
  border: 2px solid gray !important;
  background-color: lightgray !important;
}
</style>
