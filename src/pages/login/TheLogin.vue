<template lang="pug">
  .login-wrapper.flex
    .left-col.flex.flex-col.items-center.relative
      .logo-wrapper.absolute.left-12.top-12
        img.logo-img(src="@/assets/images/logoText.svg" alt="logoText")
      .login-panel.flex.flex-col.justify-center.gap-y-10
        .flex.flex-col.gap-y-2
          .text-welcome.flex.not-italic.font-bold.text-5xl Добро пожаловать!
          .text-under.flex.not-italic.font-medium.text-base(
            :style="{color: this.colorUnderText}") Очень рады вас видеть. Войдите в аккаунт, чтобы начать пользоваться сервисом «Астра».
        .flex.flex-col.gap-y-5
          .flex.flex-col.gap-y-6px
            .flex Логин
            base-input.h-12(v-model:value="user.login" type="text" placeholder="Введите ваш логин")
          .flex.flex-col.gap-y-6px.relative
            .flex Пароль
            base-input.h-12(v-model:value="user.password" :type="changeType" placeholder="Введите ваш пароль")
            img.absolute.z-10.right-4.bottom-14px.cursor-pointer(:src="changeIcon" alt="eyePassword" @click="changeView")
          .flex.items-center.gap-x-11px
            input.w-4.h-4.checkbox.cursor-pointer(@click="persist" type="checkbox")
            .flex Запомнить меня
        base-button.font-semibold(:disabled="disabledButton" :size="48") Войти в аккаунт
      .absolute.left-12.bottom-12 2022 © Астра 
    .right-col.flex.items-center.justify-center.relative
      img.logo-img.absolute.z-10(src="@/assets/images/bigLogo.svg" alt="bigLogo")
      img.logo-img.absolute.z-10.absolute.left-0.bottom-0(src="@/assets/images/ellipseBottom.svg" alt="ellipseBottom")
      img.logo-img.absolute.z-10.absolute.right-0.top-0(src="@/assets/images/ellipseTop.svg" alt="ellipseTop")
      img.logo-img.opacity-10(src="@/assets/images/dots.svg" alt="Logo")
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";
import viewPass from "@/assets/icons/eye.svg";
import notViewPass from "@/assets/icons/openEye.svg";
export default {
  name: "TheLogin",
  components: { BaseInput, BaseButton },
  data() {
    return {
      colorUnderText: "var(--font-grey-color)",
      isView: false,
      img: viewPass,
      notimg: notViewPass,
      user: { login: "", password: "" },
    };
  },
  computed: {
    changeIcon() {
      return !this.isView ? this.img : this.notimg;
    },
    changeType() {
      return !this.isView ? "password" : "text";
    },
    disabledButton() {
      return this.user.login && this.user.password ? false : true;
    },
  },
  methods: {
    changeView() {
      this.isView = !this.isView;
    },
    persist() {
      localStorage.login = this.user.login;
      localStorage.password = this.user.password;
    },
  },
  mounted() {
    if (localStorage.login) this.user.login = localStorage.login;
    if (localStorage.password) this.user.password = localStorage.password;
  },
};
</script>

<style lang="sass" scoped>
.left-col
  padding: 329px 185px
  background-color: var(--default-white)
  height: 1080px
  width: 812px
.logo-wrapper
  width: 89.28px
  height: 74.64px
.login-panel
  width: 444px
  height: 422px
.text-welcome
  letter-spacing: 0.02em
  color: var(--font-dark-blue-color)
.right-col
  height: 1080px
  width: 1105px
  background-color: var(--font-dark-blue-color)
</style>
