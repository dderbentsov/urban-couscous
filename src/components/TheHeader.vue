<template lang="pug">
  .header-wrapper.relative.flex.justify-center.box-border.py-2.pl-4_75px.pr-6
    base-client-form-create(v-if="isOpenForm", :close-form="closeForm")
    .flex.items-center.box-border.cursor-pointer.mr-auto
      img.logo-img.mr-29_25px(src="@/assets/images/logo.svg", alt="Logo")
      header-inputs
    //- .charge-person-container
    //-   header-active-client-panel(:info="chargePersonInfo")
    .flex.ml-auto
      base-button.mr-9(
        left-icon="icon-plus",
        :icon-left-size="10",
        :size="40",
        right-icon="icon-person",
        :icon-right-size="18",
        @click="openForm"
      )
      button.header-buttons.flex.justify-center.items-center.mr-8.p-0(@click="logout")
        .icon-bell.text-xxl
      .flex.justify-centflexer.items-center
        base-avatar.mr-2(:size="32")
          img(:src="avatarSrc", alt="Avatar")
        button.header-buttons
          .icon-down-arrow.text-xxs.flex.justify-center.items-center.p-0
</template>

<script>
import img from "@/assets/images/avatar.svg";
import chargePersonAvatar from "@/assets/images/charge-person-avatar.svg";
import HeaderInputs from "./HeaderInputs.vue";
import BaseAvatar from "@/components/base/BaseAvatar";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseClientFormCreate from "@/components/base/BaseClientFormCreate";
export default {
  name: "TheHeader",
  components: { HeaderInputs, BaseAvatar, BaseButton, BaseClientFormCreate },
  props: {
    openForm: Function,
    closeForm: Function,
    isOpenForm: Boolean,
  },
  data() {
    return {
      avatarSrc: img,
      chargePersonInfo: {
        avatarSrc: chargePersonAvatar,
        name: "Гордеев Николай Степанович",
      },
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
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
  z-index: 11

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

.charge-person-container
  position: absolute
</style>
