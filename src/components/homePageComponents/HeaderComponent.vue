<template lang="pug">
  div.header-wrapper.flex
    img(src="../../assets/images/logo.svg")
</template>

<script>

export default {
  name: 'HeaderComponent',
}
</script>

<style lang="sass">
@import "../../assets/sass/variables.sass"
.header-wrapper
  width: auto
  padding: 8px 24px
  background-color: $bg-white-color
.flex
  display: flex
</style>
