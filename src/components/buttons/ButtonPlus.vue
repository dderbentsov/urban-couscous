<template lang="pug">
  button(class="button-plus")
    basic-icon(width="12" height="12" icon-color="#4169E1" )
      plus-icon
</template>

<script>
  import PlusIcon from "../iconsComponents/PlusIcon";
  import BasicIcon from "../iconsComponents/basicIcon/BasicIcon";
  export default {
    name: "ButtonPlus",
    components: {BasicIcon, PlusIcon}
  }
</script>

<style lang="sass">
  .button-plus
    width: fit-content
    background-color: rgba(65, 105, 225, 0.25)
    padding: 7px 7px 3px 7px
    border-radius: 50%
</style>
