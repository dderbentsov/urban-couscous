<template lang="pug">
  router-view
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="sass">
html
  ::-webkit-scrollbar
    width: 8px
    height: 8px
  ::-webkit-scrollbar-track
    border-radius: 4px
    background-color: var(--bg-ligth-blue-color)
  ::-webkit-scrollbar-thumb
    background-color: var(--btn-blue-color-2)
    border-radius: 4px
#app
  font-feature-settings: 'pnum' on, 'lnum' on
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  height: 100%
  width: 100%
  line-height: normal
body
  background-color: var(--bg-lavender-color)
  margin: 0
  padding: 0
</style>
