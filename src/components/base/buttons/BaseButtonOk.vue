<template lang="pug">
  button.button-ok.flex.items-center.justify-center.cursor-pointer.text-xs.box-border(:style="{width:size + 'px', height:size + 'px'}" :class="{change:darkStyle}")
    .flex.w-fit.h-fit
      span.icon-ok.leading-none(:style="{fontSize:iconSize + 'px'}")
</template>

<script>
export default {
  name: "BaseButtonOk",
  props: {
    size: {
      default: 24,
    },
    iconSize: {
      default: 14,
    },
    darkStyle: {
      default: false,
    },
  },
};
</script>

<style lang="sass" scoped>
.button-ok
  color: var(--btn-blue-color)
  border: 1.5px solid var(--btn-blue-color-3)
  border-radius: 50%
  &:hover
    border: none
    background-color: var(--btn-blue-color-3)
  &:active
    border: none
    background-color: var(--btn-light-green-color)
    color: var(--btn-green-color)
.change
  border-color: var(--btn-blue-color)
  &:hover
    border: none
    background-color: var(--btn-blue-color)
    color: var(--default-white)
  &:active
    background-color: var(--btn-light-green-color)
    color: var(--btn-green-color)
</style>
