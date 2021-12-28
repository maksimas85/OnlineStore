<template>
  <div class="flex">
    <div v-for="(val, index) in value">
      <button
        :style="{ backgroundColor: val ? val.value : false }"
        class="w-7 h-4 mr-1 cursor-pointer border-2 border-solid border-black hover:border-yellow-500"
        @click="changeColor(val.value_index, index)"
        :class="{ 'border-yellow-500': isClicked.color === index }"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonColorOption',
  props: ['value', 'isClicked'],
  methods: {
    changeColor(id, index) {
      this.isClicked.color = index;
      this.$emit('changeColor', id);
    },
  },
};
</script>
