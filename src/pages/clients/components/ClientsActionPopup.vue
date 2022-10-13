<template lang="pug">
  .flex.flex-col.items-end.absolute.right-2.top-5
    .corner
    .popup-wrapper.flex.flex-col.gap-y-3.w-10.h-10.p-4
      .button.keep-redaction.flex.gap-x-3
        .icon-edit.icon-redaction
        span Редактировать
      .button.keep-redaction.flex.gap-x-3
        img(src="@/assets/icons/star.svg" alt="Star")
        span На ведение
      .button.delete.flex.gap-x-3
        img(src="@/assets/icons/basket.svg" alt="Basket")
        span Удалить
</template>

<script>
export default {
  name: "ClientsActionPopup",
};
</script>

<style lang="sass" scoped>
.popup-wrapper
  width: 180px
  height: 128px
  border-radius: 4px 0 4px 4px
  background-color: var(--default-white)
  box-shadow: var(--default-shadow)
  z-index: 1
.keep-redaction
  color: var(--font-dark-blue-color)
.icon-redaction
  color: var(--btn-blue-color)
.delete
  color: var(--btn-red-color)
.button
  &:hover
    opacity: 0.7
.corner
  width: 8px
  height: 8px
  border-top-left-radius: 100%
  background-color: var(--default-white)
  z-index: 2
  overflow: hidden
</style>
