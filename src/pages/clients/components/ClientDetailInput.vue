<template lang="pug">
  .input-wrapper.flex.gap-x-2.px-3.box-border.w-max-fit.text-sm(class="py-2.5")
    textarea.place-input.w-full.outline-0.not-italic.resize-none.font-medium(
      v-if="!sharp"
      :rows="textareaRows",
      :value="value",
      :cols="24",
      @input="$emit('update:value', $event.target.value)",
      :placeholder="placeholder",
    )
    input.w-full.outline-0.not-italic.font-medium(
      v-else,
      :value="value",
      @input="$emit('update:value', $event.target.value)",
      :placeholder="placeholder",
      v-mask="sharp"
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
    placeholder: {
      default: "Поиск",
    },
    rows: Number,
  },
  directives: { mask },
  computed: {
    heightInput() {
      return ((this.width / 100) * 70) / 11;
    },
    textareaRows() {
      if (this.value.length <= 22) return this.rows;
      return Math.ceil(this.value.length / 22);
    },
  },
};
</script>

<style lang="sass" scoped>
.input-wrapper
  border: 2px solid var(--border-light-grey-color)
  border-radius: 4px
  background-color: var(--default-white)
textarea
  overflow: hidden
</style>
