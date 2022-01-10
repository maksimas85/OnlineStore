<template>
  <div class="flex">
    <button
      :style="{ backgroundColor: value.value }"
      class="optionButton w-7 h-4 mr-1 cursor-pointer border-2 border-solid border-black hover:border-yellow-500"
      :class="{ 'border-yellow-500': idIndex === value.value_index }"
      :disabled="colorInStock"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'ButtonColorOption',
  props: ['value', 'idIndex', 'code', 'listProduct'],
  data() {
    return {
      val: this.$props.value,
    };
  },
  computed: {
    colorInStock() {
      if (this.$props?.listProduct?.size?.length &&
        this.$props.listProduct.size.some((el) => el.code === this.$props.code)) {
        return !this.$props.listProduct.size.find((item) => item.value_index === this.val.value_index);
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
