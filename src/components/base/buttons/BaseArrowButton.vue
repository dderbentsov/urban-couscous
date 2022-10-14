<template lang="pug">
  button.arrow-button.flex.items-center.icon-down-arrow.text-base.px-2.pt-1
</template>

<script>
export default {
  name: "ArrowButton",
};
</script>

<style lang="sass" scoped>
.arrow-button
  width: 32px
  height: 32px
  background-color: var(--btn-blue-color-1)
  color: var(--btn-blue-color)
  border-radius: 50%
  &:hover
    background-color: var(--btn-blue-color-2)
</style>
