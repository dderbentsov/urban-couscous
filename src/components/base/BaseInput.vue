<template lang="pug">
  .input-wrapper.flex.gap-x-2.px-4.box-border.py-10px(
    :class="{'border-none': borderNone, 'date-input': dateInput}",
    :style="{ minWidth: widthInput + 'px' }"
  )
    input.input.w-full.outline-0.not-italic(
      :class="{date:type === 'date'}",
      :value="value",
      :type="type",
      @input="$emit('update:value', $event.target.value)",
      :placeholder="placeholder",
      :maxlength="maxLength",
      :max="maxDate",
      :disabled="disabled"
    )
    .slot(v-if="withIcon", :class="iconPosition")
      slot.cursor-pointer
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    type: {
      default: "text",
    },
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
    borderNone: Boolean,
    disabled: Boolean,
    maxDate: String,
    dateInput: Boolean,
  },
};
</script>

<style lang="sass" scoped>
.left
  order: -1
.right
  order: 1
.input-wrapper
  border: 2px solid var(--border-light-grey-color)
  border-radius: 4px
  background-color: var(--default-white)
  color: var(--font-black-color)
.date
  background: url("../../assets/icons/calendar-input.svg") no-repeat 100% 50%
  &::-webkit-calendar-picker-indicator
    opacity: 0
.border-none
  border: none
.input
  background-color: inherit
</style>
