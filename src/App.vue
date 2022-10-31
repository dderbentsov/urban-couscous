<template lang="pug">
  router-view
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="sass">
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
