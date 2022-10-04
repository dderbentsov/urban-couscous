<template lang="pug">
  a(:href="path")
    div(class='button-icon-item')
      basic-icon(icon-color="#252850" width="40" height="40" )
        slot
</template>

<script>
  import BasicIcon from "@/components/iconsComponents/basicIcon/BasicIcon";
  export default {
    name: "ButtonSidebar",
    components: {BasicIcon},
    props: ['path']
  }
</script>

<style lang="sass">
  .button-icon-item
    width: fit-content
    padding: 12px 16px 12px 12px
    cursor: pointer
    border-radius: 0 4px 4px 0
    border-left-color: rgb(65, 105, 225, 0)
    border-left-width: 4px
    border-left-style: solid
  .button-icon-item:hover
    background-color: rgb(65, 105, 225, 0.3)
    border-left-color: rgb(65, 105, 225, 1)
    path
      fill: #4169E1
</style>
