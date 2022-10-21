<template lang="pug">
  .header-wrapper.flex.justify-center.box-border.py-2.px-6
    .flex.items-center.box-border.cursor-pointer.mr-auto
      img.logo-img.mr-16(src="@/assets/images/logo.svg" alt="Logo")
      header-inputs
    .charge-person-container
      header-active-client-panel(:info="chargePersonInfo")
    .flex.ml-auto
      header-add-client-button.mr-9
      button.header-buttons.flex.justify-center.items-center.mr-8.p-0
        .icon-bell.text-xxl
      .flex.justify-centflexer.items-center
        img.avatar-img.mr-2(:src="avatarSrc")
        button.header-buttons
          .icon-down-arrow.text-xxs.flex.justify-center.items-center.p-0
</template>

<script>
import img from "@/assets/images/avatar.svg";
import chargePersonAvatar from "@/assets/images/charge-person-avatar.svg";
import HeaderInputs from "./HeaderInputs.vue";
import HeaderActiveClientPanel from "./HeaderActiveClientPanel.vue";
import HeaderAddClientButton from "./HeaderAddClientButton.vue";
export default {
  name: "TheHeader",
  components: { HeaderInputs, HeaderActiveClientPanel, HeaderAddClientButton },
  data() {
    return {
      avatarSrc: img,
      chargePersonInfo: {
        avatarSrc: chargePersonAvatar,
        name: "Гордеев Николай Степанович",
      },
    };
  },
};
</script>

<style lang="sass" scoped>
.header-buttons
  outline: none
  border: none
  background-color: transparent
  color: var(--font-dark-blue-color)

.header-wrapper
  width: 100%
  height: 56px
  background-color: var(--default-white)
  position: relative
  z-index: 2

.logo-img
  height: 32px
  width: 70px

.icon-down-arrow
  width: 24px
  height: 24px

.icon-bell
  width: 24px
  height: 24px
  color: var(--font-dark-blue-color)

.avatar-img
  width: 32px
  height: 32px

.charge-person-container
  position: absolute
</style>
