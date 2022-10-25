<template lang="pug">
  button.button.flex.w-fit.gap-x-2.text-base.pt-3.pb-2.px-6
    .flex.text-xs.w-fit.pt-1(v-if="withIcon" :class="iconPosition")
      span.icon-plus(:style="{fontSize:iconSize + 'px'}")
    span.text-base.font-semibold(:class="textStyled") {{text}}
</template>

<script>
export default {
  name: "BaseCreateButton",
  props: {
    text: {
      default: "Создать",
    },
    withIcon: {
      default: false,
    },
    iconPosition: {
      default: "left",
    },
    iconSize: {
      default: 13,
    },
    textStyled: {
      default: "normal",
    },
  },
};
</script>

<style lang="sass" scoped>
.button
  border: none
  color: var(--default-white)
  background-color: var(--btn-blue-color)
  border-radius: 4px
  &:hover
    opacity: 0.7
  &:active
    opacity: 1
    background-color: var(--font-dark-blue-color)
.left
  order: -1
.right
  order: 1
  padding-top: 1px
  border-left: 1px solid var(--bg-white-color-0)
  padding-left: 14px
  height: 24px
  align-items: center
.createEvent
  font-weight: 500
  padding-right: 2px
</style>
