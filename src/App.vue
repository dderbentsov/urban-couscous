<template lang="pug">
  .app-container
    the-header
    .pages-container
      the-sidebar
      router-view
</template>

<script>
  import TheHeader from "@/components/TheHeader";
  import TheSidebar from "@/components/TheSidebar";
  export default {
    name: 'App',
    components: {TheHeader, TheSidebar}
  }
</script>

<style lang="sass">
  #app
    font-feature-settings: 'pnum' on, 'lnum' on
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    height: 100%
    width: 100%
    line-height: normal
  .pages-container
    display: flex
    flex: auto
  .app-container
    height: 100%
    width: 100%
    row-gap: 8px
    display: flex
    flex-direction: column
  body
    background-color: var(--bg-lavender-color)
    margin: 0
    padding: 0
</style>
