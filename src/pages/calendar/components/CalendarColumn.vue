<template lang="pug">
  .calendar-column-wrapper.flex.flex-col
    .header.flex.items-center.justify-between.py-2.px-6
      .flex.items-center
        img.avatar-wrapper.mr-2(src="@/assets/images/team-member.svg" alt="Team member")
        span.owner-name.font-medium.text-base.mr-6 {{ ownerName }}
        img.icon-wrapper.cursor-pointer(src="@/assets/icons/lock.svg")
      base-doc-ok-button
    .px-1
      calendar-event-card(
        v-for="event in dayEvents"
        :key="event.id"
        :ownerEvent="event"
        )
</template>

<script>
import BaseDocOkButton from "@/components/base/buttons/BaseDocOkButton.vue";
import CalendarEventCard from "./CalendarEventCard.vue";
export default {
  name: "CalendarColumn",
  components: { BaseDocOkButton, CalendarEventCard },
  props: {
    ownerData: Object,
    dayEvents: Array,
  },
  computed: {
    ownerName() {
      if (this.ownerData.id) {
        return `${this.ownerData.last_name} ${this.ownerData.first_name.slice(
          0,
          1
        )}.${this.ownerData.patronymic.slice(0, 1)}.`;
      }
      return null;
    },
  },
};
</script>

<style lang="sass" scoped>
.calendar-column-wrapper
  position: absolute
  border-right: 1px solid var(--border-light-grey-color)

.header
  height: 48px

.avatar-wrapper
  width: 32px
  height: 32px

.icon-wrapper
  width: 24px
  height: 24px

.owner-name
  color: var(--font-dark-blue-color)
</style>
