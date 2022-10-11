<template lang="pug">
  .flex.flex-col.w-full.h-full.gap-y-2
    the-header
    .flex.flex-auto
      the-sidebar
      router-view
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheSidebar from "@/components/TheSidebar";
export default {
  name: "App",
  components: { TheHeader, TheSidebar },
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
