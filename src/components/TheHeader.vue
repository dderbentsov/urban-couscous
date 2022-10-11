<template lang="pug">
  .header-wrapper.flex.flex-row.space-between.justify-between.box-border.py-2.px-6
    .left-side.flex.items-center.box-border
      img.logo-img(src="@/assets/images/logo.svg" alt="Logo")
    .flex.flex-row
      header-inputs.mr-10
      button.header-buttons.flex.justify-center.items-center.mr-8.p-0
        .icon-bell
      .flex.flex-row.justify-centflexer.items-center
        img.avatar-img.mr-2(:src="avatarSrc")
        button.header-buttons
          .icon-down-arrow.flex.justify-center.items-center.p-0
</template>

<script>
import img from "@/assets/images/avatar.svg";
import HeaderInputs from "./HeaderInputs.vue";
export default {
  name: "TheHeader",
  components: { HeaderInputs },
  data() {
    return {
      avatarSrc: img,
    };
  },
};
</script>

<style lang="sass" scoped>
.header-buttons
  outline: none
  border: none
  background-color: transparent
  cursor: pointer
  color: var(--font-dark-blue-color)

.header-wrapper
  width: 100%
  background-color: var(--bg-white-color)
  position: relative
  z-index: 2

.left-side
  cursor: pointer

.logo-img
  height: 32px
  width: 70px

.icon-down-arrow
  width: 24px
  height: 24px
  font-size: 12px

.icon-bell
  width: 24px
  height: 24px
  font-size: 24px
  color: var(--font-dark-blue-color)

.avatar-img
  width: 32px
  height: 32px
</style>
