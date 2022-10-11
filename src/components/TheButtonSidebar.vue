<template lang="pug">
  a(:href="path")
    button(:id="id" class='button-icon-item')
      slot
</template>

<script>
  export default {
    name: "ButtonSidebar",
    props: {
      path: String,
      id: String,
      changeStyle: Function
    },
    data(){
      return {
        selectedStyle: false
      }
    }
  }
</script>

<style lang="sass" scoped>
  .button-icon-item
    width: fit-content
    padding: 12px 16px 12px 12px
    cursor: pointer
    font-size: 40px
    background-color: rgb(65, 105, 225, 0)
    border-radius: 0 4px 4px 0
    border-left-color: rgb(65, 105, 225, 0)
    border-left-width: 4px
    border-right: none
    border-top: none
    border-bottom: none
    border-left-style: solid
  .button-icon-item:focus
    background-color: rgb(65, 105, 225, 0.3)
    border-left-color: rgb(65, 105, 225, 1)
    color: #4169E1
  .button-icon-item:hover
    background-color: rgb(65, 105, 225, 0.3)
    border-left-color: rgb(65, 105, 225, 1)
    color: #4169E1
</style>
