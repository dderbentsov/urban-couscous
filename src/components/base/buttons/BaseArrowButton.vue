<template lang="pug">
  button.arrow-button.flex.items-center.icon-down-arrow.px-2.pt-px
</template>

<script>
export default {
  name: "ArrowButton",
  data() {
    return {};
  },
};
</script>

<style lang="sass" scoped>
.arrow-button
  width: 32px
  height: 32px
  background: var(--btn-light-blue-color)
  color: var(--btn-blue-color)
  border-radius: 50%
  font-size: 16px
  &:hover
    background: #a0b4f0
</style>
