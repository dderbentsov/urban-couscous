<template lang="pug">
  .input-wrapper.flex.gap-x-2.px-4.box-border(
    class="py-2.5",
    :style="{ minWidth: widthInput + 'px' }"
  )
    input.input.w-full.outline-0.not-italic.date.cursor-text(
      :value="value",
      type="date",
      @input="$emit('update:value', $event.target.value)",
      :placeholder="placeholder",
      :maxlength="maxLength",
      max="9999-12-31",
      min="0000-01-01"
    )
    .slot(v-if="withIcon" :class="iconPosition")
      slot.cursor-pointer
</template>

<script>
export default {
  name: "BaseInputDate",
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
.date
  background: url("../../assets/icons/calendar-input.svg") no-repeat 100% 50%
  &::-webkit-calendar-picker-indicator
    opacity: 0
    cursor: pointer
</style>
