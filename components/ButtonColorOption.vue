<template>
  <div class="flex">
    <button
      :style="{ backgroundColor: value.value }"
      class="optionButton w-7 h-4 mr-1 cursor-pointer border-2 border-solid border-black hover:border-yellow-500"
      :class="{ 'border-yellow-500': idIndex === value.value_index }"
      :disabled="false"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'ButtonColorOption',
  props: ['value', 'idIndex', 'isDisabled'],
};
</script>

<style scoped>
.optionButton:disabled {
  border: 2px solid gray !important;
  background-color: lightgray !important;
}
</style>
