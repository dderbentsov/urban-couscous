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
          .flex.flex-col.gap-y-6
            .flex Логин
            base-input(placeholder="Введите ваш логин")
          .flex.flex-col.gap-y-6
            .flex Пароль
            base-input(type="password" placeholder="Введите ваш пароль")
          .flex.items-center.gap-x-11
            input.w-4.h-4.checkbox.cursor-pointer(type="checkbox" @change="(e) => check(e)")
            .flex Запомнить меня
        base-button.font-semibold(:size="48") Войти в аккаунт
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
export default {
  name: "TheLogin",
  components: { BaseInput, BaseButton },
  data() {
    return {
      colorUnderText: "var(--font-grey-color)",
    };
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
