<template lang="pug">
  div.text
    div.wrapper
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
.text
  color: #42b983

#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

body
  margin: 0  

.wrapper
  background-color: $bg-lavender-color
  width: 1920px
  height: 1000px
</style>
