<template lang="pug">
  .flex.flex-col.mb-1.mt-4
    span.font-medium.text-base.modal-text.mb-3 Вы действительно хотите удалить это событие?
    .card-container
      calendar-event-description-card(
        disabled,
        :event-statuses="eventStatuses",
        :owner-event="ownerEvent"
      )
    .flex.gap-x-3.mt-6.font-semibold
      base-button(
        outlined,
        :size=40,
        @click="closeModal"
      ) Отменить
      base-button(
        outlined-red,
        :size=40,
        @click="deleteEvent"
      ) Удалить
</template>

<script>
import { fetchWrapper } from "@/shared/fetchWrapper.js";
import BaseButton from "@/components/base/BaseButton.vue";
import CalendarEventDescriptionCard from "./CalendarEventDescriptionCard.vue";
import TheNotificationProvider from "@/components/Notifications/TheNotificationProvider";
import { addNotification } from "@/components/Notifications/notificationContext";
export default {
  name: "CalendarDeleteModal",
  components: {
    CalendarEventDescriptionCard,
    BaseButton,
    TheNotificationProvider,
  },
  props: {
    ownerEvent: Object,
    eventStatuses: {
      type: Array,
      default() {
        return [];
      },
    },
    closeModal: Function,
  },
  methods: {
    async deleteEvent() {
      await fetchWrapper.del(`registry/event/${this.ownerEvent.id}/delete/`);
      this.$emit("update-events");
      this.closeModal();
      this.addSuccessNotification();
    },
    addSuccessNotification() {
      addNotification(
        new Date().getTime(),
        "Событие успешно удалено",
        "",
        "success",
        5000
      );
    },
  },
};
</script>

<style lang="sass" scoped>
.modal-text
  color: var(--font-grey-color)

.card-container
  width: 374px
  height: 82px
  border-radius: 4px
  border: 1px solid var(--border-light-grey-color-1)
</style>
