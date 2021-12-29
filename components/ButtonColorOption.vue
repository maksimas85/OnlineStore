<template>
  <div class="flex">
    <button
      :style="{ backgroundColor: value.value }"
      class="w-7 h-4 mr-1 cursor-pointer border-2 border-solid border-black hover:border-yellow-500"
      @click="changeColor(value.value_index)"
    ></button>
  </div>
</template>

<!--:class="{ 'border-yellow-500': isClicked.color === index }"-->

<script>
export default {
  name: 'ButtonColorOption',
  props: ['value'],
  methods: {
    changeColor(id) {
      // this.isClicked.color = index;
      this.$emit('changeColor', id);
    },
  },
};
</script>
