<template lang="pug">
  .flex.flex-col.absolute.left-2.top-6
    .corner
    .popup-wrapper.flex.flex-col.gap-y-3.w-10.h-10.p-4
      .button.keep-redaction.flex.gap-x-3(@click="openChangeData")
        .icon-edit.icon
        span Редактировать
      .button.keep-redaction.flex.gap-x-3
        .icon-star-off.icon
        span На ведение
      .button.keep-redaction.flex.gap-x-3(@click="createMedicalCard")
        .icon-star-off.icon
        span Мед. карта
      .button.delete.flex.gap-x-3(
        @click="transmitDeleteClient",
        :style="{'opacity': disabledDelete && '0.7'}"
      )
        .icon-basket.icon-delete
        span Удалить
</template>

<script>
import TheNotificationProvider from "@/components/Notifications/TheNotificationProvider";
import { addNotification } from "@/components/Notifications/notificationContext";
export default {
  name: "ClientsActionPopup",
  components: { TheNotificationProvider },
  props: {
    openChangeData: Function,
    disabledDelete: Boolean,
    createMedicalCard: Function,
  },
  methods: {
    transmitDeleteClient() {
      if (!this.disabledDelete) this.$emit("delete-client");
      else this.addWarningNotification();
    },
    addWarningNotification() {
      addNotification(
        new Date().getTime(),
        "Сейчас нельзя удалить клиента",
        "Для удаления дождитесь текущего удаления клиента или переключите страницу",
        "warning",
        5000
      );
    },
  },
};
</script>

<style lang="sass" scoped>
.popup-wrapper
  width: 180px
  height: 164px
  border-radius: 4px 0 4px 4px
  background-color: var(--default-white)
  box-shadow: var(--default-shadow)
  z-index: 11
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
  border-top-right-radius: 100%
  background-color: var(--default-white)
  z-index: 12
  overflow: hidden
.icon-delete
  color: var(--btn-red-color)
</style>
