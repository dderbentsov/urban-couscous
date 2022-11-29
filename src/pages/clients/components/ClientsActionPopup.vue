<template lang="pug">
  .flex.flex-col.items-end.absolute.right-2.top-5
    .corner
    .popup-wrapper.flex.flex-col.gap-y-3.w-10.h-10.p-4
      .button.keep-redaction.flex.gap-x-3(@click="openChangeData")
        .icon-edit.icon
        span Редактировать
      .button.keep-redaction.flex.gap-x-3
        .icon-star-off.icon
        span На ведение
      .button.delete.flex.gap-x-3(@click="deleteClient")
        .icon-basket.icon-delete
        span Удалить
</template>

<script>
export default {
  name: "ClientsActionPopup",
  props: {
    openChangeData: Function,
    deleteClient: Function,
  },
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
.icon
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
.icon-delete
  color: var(--btn-red-color)
</style>
