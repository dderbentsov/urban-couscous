<template lang="pug">
  button.cursor-pointer.icon-long-arrow.open-button.text-xs.pt-1
</template>

<script>
export default {
  name: "OpenButton",
};
</script>

<style lang="sass" scoped>
.open-button
  outline: none
  border: none
  width: 24px
  height: 24px
  max-height: 24px
  color: var(--btn-blue-color)
  background-color: var(--bg-ligth-blue-color)
  border-radius: 50%
</style>
