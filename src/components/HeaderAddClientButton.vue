<template lang="pug">
  button.add-client-button.flex.items-center.justify-center
    .icon-wrapper.flex.items-center.justify-center.icon-plus.text-xsm
    .icon-wrapper.flex.items-center.justify-center.icon-person.text-m
</template>

<script>
export default {
  name: "HeaderAddClientButton",
};
</script>

<style lang="sass" scoped>
.add-client-button
  width: 80px
  height: 40px
  background-color: var(--btn-blue-color)
  color: var(--default-white)
  border-radius: 4px
  &:hover
    background-color: var(--btn-blue-color-4)
  &:active
    background-color: var(--font-dark-blue-color)

.icon-wrapper
  width: 24px
  height: 24px
</style>
