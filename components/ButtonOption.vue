<template>
  <div class="flex flex-row">
    <div v-for="value in option.values" @click="changeOptions(value.value_index, option.attribute_code)" class="my-0.5">
      <component
        :is="option.attribute_code"
        :code="option.attribute_code"
        :idIndex="idIndex"
        :listProduct="listProduct"
        :value="value"
        :key="value.value_index"
      ></component>
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
  props: ['option', 'product', 'listProduct'],
  data() {
    return {
      idIndex: null,
      code: null,
      variants: this.$props.product.variants,
      isDisabledIndex: null,
    };
  },
  methods: {
    changeOptions(index, code) {
      this.code = code;
      this.idIndex = index;
      this.isDisabledOption(index, code);
      this.$emit('changeOption', this.isDisabledIndex, code);
    },
    isDisabledOption(id, code) {
      const sizeOption = this.variants.filter((el) => el.attributes.find((i) => i.value_index === id));
      this.isDisabledIndex = sizeOption
        .map((item) => {
          return item.attributes.filter((i) => i.code !== code);
        })
        .flat();
    },
  },
};
</script>
