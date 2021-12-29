<template>
  <div class="flex flex-row">
    <div v-for="(value, index) in option.values" @click="someFunc(value.value_index, index)" class="my-0.5">
      <ButtonColorOption v-if="option.attribute_code === 'color'" :value="value"/>
      <ButtonSizeOption v-if="option.attribute_code === 'size'" :value="value"/>
    </div>
  </div>
</template>

<script>
import ButtonSizeOption from '~/components/ButtonSizeOption';
import ButtonColorOption from '~/components/ButtonColorOption';

export default {
  props: ['option'],
  components: { ButtonSizeOption, ButtonColorOption },
  name: "ButtonOption",
  methods: {
    someFunc(value_index, index) {
      console.log(value_index, index)
    }
  }
}
</script>
