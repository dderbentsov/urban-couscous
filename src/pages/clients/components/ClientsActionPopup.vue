<template lang="pug">
  .popup-wrapper.absolute.flex.flex-col.gap-y-3.w-10.h-10.right-2.top-5.p-4
    .keep-redaction.flex.gap-x-3
      .icon-edit.icon-redaction
      span Редактировать
    .keep-redaction.flex.gap-x-3
      .icon-star.icon-redaction
      span На ведение
    .delete.flex.gap-x-3
      .icon-basket
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
  height: 136px
  border-radius: 4px 0 4px 4px
  background-color: var(--default-white)
  box-shadow: var(--default-shadow)
.keep-redaction
  color: var(--font-dark-blue-color)
.icon-redaction
  color: var(--btn-blue-color)
.delete
  color: var(--btn-red-color)
</style>
