<template lang="pug">
  .base-avatar(:style="styles")
    slot
</template>

<script>
export default {
  name: "BaseAvatar",
  props: {
    size: {
      type: Number,
      size: 32,
    },
    color: {
      type: String,
      default: "d3d4dc",
    },
  },

  computed: {
    styles() {
      return {
        width: this.size + "px",
        height: this.size + "px",
        minWidth: this.size + "px",
        backgroundColor: "#" + this.color,
      };
    },
  },
};
</script>

<style scoped lang="sass">
.base-avatar
  align-items: center
  border-radius: 50%
  display: inline-flex
  justify-content: center
  line-height: normal
  position: relative
  text-align: center
  vertical-align: middle
  overflow: hidden
  color: var(--font-dark-blue-color)
  text-transform: uppercase

  img,
  svg
    border-radius: inherit
    display: inline-flex
    height: inherit
    width: inherit
</style>
