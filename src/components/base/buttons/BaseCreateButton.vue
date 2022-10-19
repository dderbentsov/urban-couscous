<template lang="pug">
  button.button.flex.w-fit.gap-x-2.text-base.pt-3.pb-2.px-6
    .flex.text-xs.w-fit.pt-1(v-if="withIcon")
      span.icon-plus
    span.text-base.font-semibold {{text}}
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
</style>
