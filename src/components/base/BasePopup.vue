<template lang="pug">
  .flex.flex-col.items-end.absolute
    .corner
    .popup-wrapper.flex.flex-col.gap-y-3.p-4.h-fit(:style="{ width : width + 'px' }")
      slot
</template>

<script>
export default {
  name: "BasePopup",
  props: {
    width: Number,
    top: Number,
    right: Number,
  },
};
</script>

<style lang="sass" scoped>
.popup-wrapper
  border-radius: 4px 0 4px 4px
  background-color: var(--default-white)
  box-shadow: var(--default-shadow)
  z-index: 1
.corner
  width: 8px
  height: 8px
  border-top-left-radius: 100%
  background-color: var(--default-white)
  z-index: 2
  overflow: hidden
</style>
