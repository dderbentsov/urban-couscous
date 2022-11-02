<template lang="pug">
  teleport(:to="appContainer")
    .base-menu(:style="styles")
      slot
</template>

<script>
export default {
  name: "BaseMenu",
  computed: {
    appContainer() {
      return this.$.appContext.app._container;
    },
    parent() {
      return this.$parent.$el;
    },
    parentSize() {
      return this.parent?.getBoundingClientRect();
    },
    styles() {
      return {
        left: this.parentSize.left + "px",
        top: this.parentSize.top + this.parentSize.height + "px",
      };
    },
  },
  mounted() {
    console.log(this.parentSize);
  },
};
</script>

<style scoped lang="sass">
.base-menu
  position: absolute
  z-index: 10
</style>
