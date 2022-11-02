<template lang="pug">
  button.base-button.text-base(
    :disabled="disabled",
    :class="{'rounded': rounded, 'outlined': outlined, 'secondary': secondary, 'confirm': confirm, 'added': added}"
    :style="{height: size + 'px', minWidth: size + 'px'}"
    )
    .button-container
      span.icon-container(
        :class="leftIcon",
        v-if="leftIcon",
        :style="{fontSize: iconLeftSize + 'px'}"
        )
      slot
      .split(v-if="split")
      span.icon-container(
        :class="rightIcon",
        v-if="rightIcon"
        :style="{fontSize: iconRightSize + 'px'}"
        )
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    confirm: Boolean,
    outlined: Boolean,
    added: Boolean,
    rounded: Boolean,
    disabled: Boolean,
    split: Boolean,
    secondary: Boolean,
    rightIcon: {
      type: String,
      default: "",
    },
    leftIcon: {
      type: String,
      default: "",
    },
    iconLeftSize: {
      type: Number,
      default: 10,
    },
    iconRightSize: {
      type: Number,
      default: 10,
    },
    size: {
      type: Number,
      default: 24,
    },
  },
};
</script>

<style scoped lang="sass">
.base-button
  padding: 8px 23px
  background-color: var(--btn-blue-color)
  border: 1px solid var(--btn-blue-color)
  color: var(--default-white)
  display: flex
  justify-content: center
  align-items: center
  border-radius: 4px
  white-space: nowrap
  &:active
    background-color: var(--font-dark-blue-color)
    border: 1px solid var(--font-dark-blue-color)
  &:hover
    background-color: var(--btn-blue-color-hover)
    border: 1px solid var(--btn-blue-color-hover)
  &:disabled, &[disabled]
    background-color: var(--btn-blue-color-disabled)
    border: 1px solid var(--btn-blue-color-disabled)
.rounded
  padding: 0
  border-radius: 50%

.outlined
  background-color: var(--default-white)
  border: 1px solid var(--btn-blue-color)
  color: var(--btn-blue-color)
  &:active
    background-color: var(--default-white)
    border: 1px solid var(--font-dark-blue-color)
    color: var(--font-dark-blue-color)
  &:hover
    background-color: var(--default-white)
    border: 1px solid var(--btn-blue-color-hover)
    color: var(--btn-blue-color-hover)
  &:disabled, &[disabled]
    background-color: var(--default-white)
    border: 1px solid var(--btn-blue-color-1)
    color: var(--btn-blue-color-1)

.added
  border: 2px solid var(--btn-blue-color)
  &:hover
    border: none
    background-color: var(--btn-blue-color)
    color: var(--default-white)

.secondary
  background-color: var(--btn-blue-sec-color)
  border: 1px solid var(--btn-blue-sec-color)
  color: var(--btn-blue-color)
  &:hover
    background-color: var(--btn-blue-color-hover)
    border: 1px solid var(--btn-blue-color-hover)
    color: var(--btn-blue-color)
  &:disabled, &[disabled]
    background-color: var(--btn-blue-sec-color)
    border: 1px solid var(--btn-blue-sec-color)
    color: var(--btn-blue-color)

.confirm
  border-color: var(--btn-blue-color)
  border: 2px solid var(--btn-blue-color)
  &:hover
    border: none
    background-color: var(--btn-blue-color)
    color: var(--default-white)
  &:active
    background-color: var(--btn-light-green-color)
    color: var(--btn-green-color)

.button-container
  display: flex
  gap: 8px

.split
  height: 19px
  width: 1px
  border-radius: 1px
  background-color: var(--default-white)
  opacity: 0.3

.icon-container
  display: flex
  align-items: center
  justify-content: center
</style>
