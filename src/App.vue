<template lang="pug">
  div
    header-component
</template>

<script>
import HeaderComponent from './components/homePageComponents/HeaderComponent.vue'
export default {
  name: 'App',
  components: {HeaderComponent}
}
</script>

<style lang="sass">
@import "./assets/sass/variables.sass"

#app
  font-family: Raleway
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  width: 100%
  background-color: $bg-lavender-color

body
  margin: 0
  padding: 0

</style>
