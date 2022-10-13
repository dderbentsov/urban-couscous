<template lang="pug">
  button.event-button.not-italic.leading-5.text-base.py-3.px-4 Создать событие
</template>

<script>
export default {
  name: "AddEventButton",
};
</script>

<style lang="sass" scoped>
.event-button
  outline: none
  border: none
  width: fit-content
  color: var(--default-white)
  background-color: var(--btn-blue-color)
  border-radius: 4px
</style>
