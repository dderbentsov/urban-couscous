<template lang="pug">
  div(class="pages-container")
    sidebar-component
    router-view
</template>

<script>
  import SidebarComponent from "./components/homePageComponents/SidebarComponent";
  export default {
    name: 'App',
    components: {SidebarComponent}
  }
</script>

<style lang="sass">
#app
  display: flex
  flex-direction: column
  row-gap: 8px
  height: 100%
  font-family: Raleway, sans-serif
  font-style: normal
  font-feature-settings: 'pnum' on, 'lnum' on
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  background-color: #E9E9F6
.pages-container
  display: flex
  flex: auto
</style>
