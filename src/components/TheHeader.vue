<template lang="pug">
  .header-wrapper.relative.flex.justify-center.box-border.py-2.pl-4_75px.pr-6
    transition(name="form")
      base-client-form-create(
        v-if="isOpenForm",
        :close-form="closeForm",
        :set-updated-clients="setUpdatedClients",
      )
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
      button.header-buttons.flex.justify-center.items-center.mr-8.p-0
        .icon-bell.text-xxl
      .flex.justify-centflexer.items-center.relative
        base-avatar.mr-2(:size="36", :color="userData.color", v-if="!userData.photo") {{changeName}}       
        base-avatar.mr-2(:size="32", v-else)
          img.h-full.object-cover(:src="url + userData.photo", alt="Avatar")
        button.header-buttons(@click="openPopup")
          .icon-down-arrow.text-xxs.flex.justify-center.items-center.p-0
        base-popup.right-2.top-10(v-if="showPopup", :width="160", v-click-outside="openPopup")
          .text-popup.flex.cursor-pointer.pl-2(@click="logout") Выйти
</template>

<script>
import img from "@/assets/images/avatar.svg";
import chargePersonAvatar from "@/assets/images/charge-person-avatar.svg";
import HeaderInputs from "./HeaderInputs.vue";
import BaseAvatar from "@/components/base/BaseAvatar";
import BaseButton from "@/components/base/BaseButton.vue";
import BasePopup from "@/components/base/BasePopup.vue";
import BaseClientFormCreate from "@/components/base/BaseClientFormCreate";
export default {
  name: "TheHeader",
  components: {
    HeaderInputs,
    BaseAvatar,
    BaseButton,
    BasePopup,
    BaseClientFormCreate,
  },
  props: {
    url: String,
    openForm: Function,
    closeForm: Function,
    isOpenForm: Boolean,
    setUpdatedClients: Function,
  },
  data() {
    return {
      avatarSrc: img,
      chargePersonInfo: {
        avatarSrc: chargePersonAvatar,
        name: "Гордеев Николай Степанович",
      },
      showPopup: false,
      userData: JSON.parse(localStorage.getItem("userData")),
    };
  },
  computed: {
    changeName() {
      return `${this.userData.last_name || ""} ${
        this.userData.first_name || ""
      } ${this.userData.patronymic || ""}`;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("tokenAccess");
      this.$router.push("/login");
    },
    openPopup() {
      this.showPopup = !this.showPopup;
    },
  },
};
</script>

<style lang="sass" scoped>
.form-enter-from
  opacity: 0
  transform: translateY(300px)
  pointer-events: none

.form-enter-active
  transition: 0.5s ease

.form-leave-to
  opacity: 0
  transform: translateY(300px)
  pointer-events: none

.form-leave-active
  transition: 0.5s ease

.form-move
  transition: 0.5s ease

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

.text-popup
  color: var(--btn-blue-color)
  &:hover
    opacity: 0.8
</style>
