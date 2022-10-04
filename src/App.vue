<template lang="pug">
  div(class="app-container")
    header-component
    div(class="pages-container")
      sidebar-component
      router-view
</template>

<script>
  import HeaderComponent from "./components/homePageComponents/HeaderComponent";
  import SidebarComponent from "./components/homePageComponents/SidebarComponent";
  export default {
    name: 'App',
    components: {HeaderComponent, SidebarComponent}
  }
</script>

<style lang="sass">
#app
  height: 100%
  width: 100%
  font-family: Raleway, sans-serif
  font-style: normal
  font-feature-settings: 'pnum' on, 'lnum' on
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
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
