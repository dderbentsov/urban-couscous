<template lang="pug">
  .base-options(:style="styles")
    slot
</template>

<script>
export default {
  name: "BaseOptions",
  computed: {
    parent() {
      return this.$parent.$el;
    },
    parentSize() {
      return this.parent?.getBoundingClientRect();
    },
    styles() {
      return {
        top: this.parentSize.height + "px",
        left: "-1px",
        minWidth: this.parentSize.width + "px",
      };
    },
  },
};
</script>

<style scoped lang="sass">
.base-options
  position: absolute
  z-index: 10
</style>
