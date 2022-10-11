<template lang="pug">
  button(class="add-button-event") Создать событие
</template>

<script>
  export default {
    name: "AddEventButton"
  }
</script>

<style lang="sass" scoped>
  .add-button-event
    outline: none
    border: none
    cursor: pointer
    font-family: Raleway
    font-style: normal
    font-size: 16px
    width: fit-content
    color: var(--bg-white-color)
    background-color: var(--btn-blue-color)
    padding: 11px 16px 11px 16px
    border-radius: 4px
</style>
