<template lang="pug">
  div(class="app-container")
    header-component
    div(class="pages-container")
      sidebar-component
      router-view
</template>

<script>
  import HeaderComponent from './components/homePageComponents/HeaderComponent.vue';
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
  background-color: var(--bg-lavender-color)
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
  margin: 0
  padding: 0
</style>
