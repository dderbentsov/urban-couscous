<template lang="pug">
  .login-wrapper.flex
    .left-col.flex.flex-col.items-center
      .logo-wrapper.absolute.left-12.top-12
        img(src="@/assets/images/logoText.svg" alt="logoText")
      .login-panel.flex.flex-col.justify-center.gap-y-10
        .flex.flex-col.gap-y-2
          .text-welcome.flex.not-italic.font-bold.text-5xl Добро пожаловать!
          .text-under.flex.not-italic.font-medium.text-base(
            :style="{color: this.underTextColor}") Очень рады вас видеть. Войдите в аккаунт, чтобы начать пользоваться сервисом «Астра».
        .flex.flex-col.gap-y-5
          .flex.flex-col.gap-y-6px
            .flex.non-italic.font-semibold.text-xss Логин
            base-input.h-12.font-medium(v-model:value="user.username", type="text", placeholder="Введите ваш логин")
          .flex.flex-col.gap-y-6px.relative
            .flex.non-italic.font-semibold.text-xss Пароль
            base-input.h-12(v-model:value="user.password", :type="changeType", placeholder="Введите ваш пароль")
            img.absolute.z-10.right-4.bottom-14px.cursor-pointer(:src="changeIcon", alt="eyePassword", @click="changeView")
          .flex.items-center.gap-x-11px
            input.w-4.h-4.checkbox.cursor-pointer(@click="persist", type="checkbox")
            .flex.non-italic.font-medium.base Запомнить меня
        base-button.font-semibold(:disabled="disabledButton", :size="48", @click="login") Войти в аккаунт
      .absolute.left-12.bottom-12 2022 © Астра 
    .right-col.flex.items-center.justify-center.relative
      img.absolute.z-10(src="@/assets/images/bigLogo.svg" alt="bigLogo")
      img.absolute.z-10.absolute.left-0.bottom-0(src="@/assets/images/ellipseBottom.svg" alt="ellipseBottom")
      img.absolute.z-10.absolute.right-0.top-0(src="@/assets/images/ellipseTop.svg" alt="ellipseTop")
      img.opacity-10(src="@/assets/images/dots.svg" alt="Logo")
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";
import viewPasswordIcon from "@/assets/icons/eye.svg";
import hidePasswordIcon from "@/assets/icons/openEye.svg";
export default {
  name: "TheLogin",
  components: { BaseInput, BaseButton },
  data() {
    return {
      underTextColor: "var(--font-grey-color)",
      isView: false,
      viewPassword: viewPasswordIcon,
      hidePassword: hidePasswordIcon,
      user: { username: "", password: "" },
    };
  },
  computed: {
    changeIcon() {
      return !this.isView ? this.viewPassword : this.hidePassword;
    },
    changeType() {
      return !this.isView ? "password" : "text";
    },
    disabledButton() {
      return this.user.username && this.user.password ? false : true;
    },
  },
  methods: {
    changeView() {
      this.isView = !this.isView;
    },
    persist() {
      localStorage.username = this.user.username;
      localStorage.password = this.user.password;
    },
    login() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.user),
      };
      fetch("http://45.84.227.122:8080/auth/jwt/create", requestOptions)
        .then((result) => result.json())
        .then((token) => {
          localStorage.setItem("tokenAccess", token.access);
          token.cookie("tokenRefresh", token.refresh, { httpOnly: true });
        });
    },
  },

  mounted() {
    if (localStorage.username) this.user.username = localStorage.username;
    if (localStorage.password) this.user.password = localStorage.password;
  },
};
</script>

<style lang="sass" scoped>
.login-wrapper
  width: 100%
  height: 100%
  position: relative
  overflow: hidden
.left-col
  display: flex
  justify-content: center
  background-color: var(--default-white)
  height: 100%
  width: 812px
  flex: 1 1 auto
.logo-wrapper
  width: 89.28px
  height: 74.64px
.login-panel
  width: 444px
  height: 422px
.text-welcome
  letter-spacing: 0.02em
  color: var(--font-dark-blue-color)
.input-wrapper
  border-width: 1.5px
.right-col
  height: 100%
  width: 1105px
  background-color: var(--font-dark-blue-color)
  flex: 1 1 auto
</style>
