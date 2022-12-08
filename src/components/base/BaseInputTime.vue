<template lang="pug">
  .input-wrapper.flex.gap-x-2.px-4.box-border(
    class="py-2.5"
    :style="{ minWidth: widthInput + 'px' }"
  )
    input.input.w-full.outline-0.not-italic(
      :value="value"
      type="time"
      @input="$emit('update:value', $event.target.value)"
      :placeholder="placeholder"
      :maxlength="maxLength"
    )
    .slot(v-if="withIcon" :class="iconPosition")
      slot.cursor-pointer
</template>

<script>
export default {
  name: "BaseInputTime",
  props: {
    maxLength: Number,
    value: String,
    withIcon: {
      default: false,
    },
    iconPosition: {
      default: "right",
    },
    placeholder: {
      default: "Поиск",
    },
    widthInput: Number,
  },
};
</script>

<style lang="sass" scoped>
.left
  order: -1
.right
  order: 1
.input-wrapper
  border-radius: 4px
  background-color: var(--default-white)
  color: var(--font-black-color)
input::-webkit-calendar-picker-indicator
  cursor: pointer
</style>
