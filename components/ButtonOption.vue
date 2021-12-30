<template>
  <div class="flex flex-row">
    <div v-for="value in option.values" @click="someFunc(value.value_index, option.attribute_code)" class="my-0.5">
      <component :is="option.attribute_code" :value="value" :isDisabled="isDisabledIndex" :idIndex="idIndex" :key="value.value_index"></component>
    </div>
  </div>
</template>

<script>
import ButtonSizeOption from '~/components/ButtonSizeOption';
import ButtonColorOption from '~/components/ButtonColorOption';

export default {
  name: 'ButtonOption',
  components: {
    color: ButtonColorOption,
    size: ButtonSizeOption,
  },
  props: ['option', 'product'],
  data() {
    return {
      idIndex: null,
      code: null,
      variants: this.$props.product.variants,
      isDisabledIndex: null
    }
  },
  methods: {
    someFunc(index, code) {
      this.code = code;
      this.idIndex = index;
      this.$emit('changeOption', index, code)
      this.isDisabledOption(index, code);
    },
    isDisabledOption(id, code) {
      console.log(id);
      console.log(code);
      const sizeOption = this.variants.filter((el) => el.attributes.find((i) => i.value_index === id));
      console.log(sizeOption);
      this.isDisabledIndex = sizeOption
        .map((item) => {
          return item.attributes.filter((i) => i.code === 'size');
        })
        .flat();
    }
  },
};
</script>
