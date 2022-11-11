<template lang="pug">
  .input-wrapper.flex.gap-x-2.px-3.box-border.w-max-fit(class="py-2.5")
    textarea.place-input.w-full.outline-0.text-sm.not-italic.resize-none(
      :rows="Math.ceil(value.length/heightInput)"
      :value="value"
      @input="$emit('update:value', $event.target.value)"

    )
    slot
</template>

<script>
import { mask } from "vue-the-mask";
export default {
  name: "ClientDetailInput",
  props: {
    value: String,
    width: Number,
    sharp: String,
  },
  directives: { mask },

  computed: {
    heightInput() {
      return ((this.width / 100) * 70) / 11;
    },
  },
};
</script>

<style lang="sass" scoped>
.input-wrapper
  border: 2px solid var(--border-light-grey-color)
  border-radius: 4px
  background-color: var(--default-white)
</style>
