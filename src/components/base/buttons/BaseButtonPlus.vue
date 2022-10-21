<template lang="pug">
  button.flex.items-center.justify-center.cursor-pointer.button-plus.text-xs.box-border(:style="{width:size + 'px', height:size + 'px'}" :class="{change:withBorder}")
    .flex.w-fit.h-fit
      span.icon-plus.leading-none(:style="{fontSize:iconSize + 'px'}")
</template>

<script>
export default {
  name: "BaseButtonPlus",
  props: {
    size: {
      default: 24,
    },
    iconSize: {
      default: 14,
    },
    withBorder: {
      default: false,
    },
  },
};
</script>

<style lang="sass" scoped>
.button-plus
  outline: none
  border: none
  color: var(--btn-blue-color)
  border-radius: 50%
.change
  background-color: var(--btn-blue-color-0)
  color: var(--btn-blue-color)
  border: 1.5px solid var(--btn-blue-color)
  &:hover
    border: none
    background-color: var(--btn-blue-color)
    color: var(--default-white)
</style>
