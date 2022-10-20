<template lang="pug">
  .sidebar.flex.flex-col.bg-white
    .sidebar-wrapper.h-full
      .sidebar-content.items-center
        base-button-plus
</template>

<script>
import BaseButtonPlus from "../../../components/base/buttons/BaseButtonPlus.vue";
export default {
  components: {
    BaseButtonPlus,
  },
};
</script>

<style lang="sass" scoped>
.sidebar
  width: 72px
.sidebar-wrapper
   border-left: 2px solid var(--btn-blue-color-3)
   margin: 13px 0
.sidebar-content
  padding: 19px 16px
.button-plus
  width: 40px
  height: 40px
  max-height: 40px
  background: var(--btn-blue-color)
  color: var(--default-white)
</style>
