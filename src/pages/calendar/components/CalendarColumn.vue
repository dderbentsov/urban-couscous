<template lang="pug">
  .calendar-column-wrapper.flex.flex-col
    .header.flex.items-center.justify-between.py-2.px-6.top-0
      .flex.items-center
        img.avatar-wrapper.mr-2(src="@/assets/images/team-member.svg" alt="Team member")
        span.owner-name.font-medium.text-base.mr-6 {{ ownerName }}
        img.icon-wrapper.cursor-pointer(src="@/assets/icons/lock.svg")
      base-doc-ok-button
    .body
      calendar-event-card(
        v-for="event in dayEvents"
        :key="event.id"
        :ownerEvent="event"
        :style="eventCardPosition(event.start, event.end)"
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
    dayEndTime: Number,
    dayStartTime: Number,
  },
  data() {
    return {
      pixelsPerHour: 62,
    };
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
    pixelsPerMinute() {
      return this.pixelsPerHour / 60;
    },
  },
  methods: {
    eventCardPosition(startTime, endTime) {
      let start = startTime
        .slice(11, -4)
        .split(":")
        .map((elem) => parseInt(elem, 10));
      let end = endTime.slice(11, -6);
      let position =
        (start[0] - this.dayStartTime) * this.pixelsPerHour +
        start[1] * this.pixelsPerMinute;
      if (
        parseInt(start[0], 10) < this.dayStartTime ||
        parseInt(end, 10) >= this.dayEndTime
      ) {
        return {
          top: "0px",
          visibility: "hidden",
        };
      }
      return {
        top: `${position}px`,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
.calendar-column-wrapper
  border-right: 1px solid var(--border-light-grey-color)
  &:last-child
    border-right: none

.header
  position: sticky
  z-index: 5
  background-color: var(--default-white)

.body
  position: relative
  z-index: 3

.avatar-wrapper
  width: 32px
  height: 32px

.icon-wrapper
  width: 24px
  height: 24px

.owner-name
  color: var(--font-dark-blue-color)
</style>
