<template lang="pug">
  .calendar-column-wrapper.flex.flex-col
    .header.flex.items-center.justify-between.py-2.px-6.top-0
      .flex.items-center
        base-avatar.mr-2(:size="32", :color="ownerData.color")
          img.h-full.object-cover(
            :src="url + ownerData.photo",
            alt="Team member",
            v-if="ownerData.photo"
          )
          span(v-if="!ownerData.photo") {{ defaultAvatar }}
        span.owner-name.font-medium.text-base.mr-6 {{ ownerName }}
        img.icon-wrapper.cursor-pointer(src="@/assets/icons/lock.svg")
      column-header-checkbox
    .body.pl-1
      calendar-event-card(
        v-for="event in dayEvents",
        :key="event.id",
        :id="event.id",
        :ownerEvent="event",
        :event-types="eventTypes",
        :style="eventCardPosition(event.start, event.end)",
        :change-form-was-closed="changeFormWasClosed",
        @selected-event="transmitEventData",
        @reset-change-form="transmitResetChangeForm",
        @delete-event="transmitDeleteEvent",
        :schedule-body-ref="scheduleBodyRef"
      )
</template>

<script>
import ColumnHeaderCheckbox from "./CalendarColumnHeaderCheckbox.vue";
import BaseAvatar from "@/components/base/BaseAvatar";
import CalendarEventCard from "./CalendarEventCard.vue";
export default {
  name: "CalendarColumn",
  components: {
    CalendarEventCard,
    BaseAvatar,
    ColumnHeaderCheckbox,
  },
  props: {
    ownerData: Object,
    dayEvents: Array,
    dayEndTime: Number,
    dayStartTime: Number,
    eventTypes: Array,
    changeFormWasClosed: Boolean,
    scheduleBodyRef: Node,
    url: String,
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
    defaultAvatar() {
      return `${this.ownerData.last_name[0]}${this.ownerData.first_name[0]}`;
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
    transmitEventData(eventData) {
      this.$emit("selected-event", eventData);
    },
    transmitResetChangeForm() {
      this.$emit("reset-change-form");
    },
    transmitDeleteEvent(eventData) {
      this.$emit("delete-event", eventData);
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

.btn
  opacity: 0.5
  padding: 7px 13px !important

.icon-wrapper
  width: 24px
  height: 24px

.owner-name
  color: var(--font-dark-blue-color)
</style>
