<template lang="pug">
  button.event-button Создать событие
</template>

<script>
  export default {
    name: "AddEventButton"
  }
</script>

<style lang="sass" scoped>
  .event-button
    outline: none
    border: none
    cursor: pointer
    font-style: normal
    line-height: 19px
    font-size: 16px
    width: fit-content
    color: var(--bg-white-color)
    background-color: var(--btn-blue-color)
    padding: 11px 16px 11px 16px
    border-radius: 4px
</style>
