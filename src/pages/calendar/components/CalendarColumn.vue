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
    .body.pl-1.h-full(@dblclick="clickOnBackground")
      transition-group(name="card")
        calendar-event-card(
          v-for="event, index in dayEvents",
          :key="event.id + index",
          :id="event.id",
          :ownerEvent="event",
          :event-statuses="eventStatuses",
          :style="eventCardPosition(event.start, event.end)",
          :change-form-was-closed="changeFormWasClosed",
          @selected-event="transmitEventData",
          @reset-change-form="transmitResetChangeForm",
          @delete-event="transmitDeleteEvent",
          :schedule-body-ref="scheduleBodyRef",
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
    eventStatuses: Array,
    changeFormWasClosed: Boolean,
    scheduleBodyRef: Node,
    url: String,
    openFormCreateEvent: Function,
    currentDate: {
      type: Object,
      default() {
        return {};
      },
    },
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
        parseInt(end, 10) > this.dayEndTime
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
    clickOnBackground(e) {
      let res = String((e.offsetY / this.pixelsPerHour).toFixed(2)).split(".");
      let hours = parseInt(res[0]) + this.dayStartTime;
      let minuts = Math.round(res[1] * 0.6);
      if (minuts < 10) minuts = "0" + minuts;
      if (hours < 10) hours = "0" + hours;
      this.$emit("selected-event", {
        employees: [
          {
            employee: this.ownerData,
            role: "owner",
          },
        ],
        start: `${this.currentDate.format(
          "YYYY-MM-DD"
        )}T${hours}:${minuts}:00Z`,
        end: `${this.currentDate.format("YYYY-MM-DD")}T${hours}:${minuts}:00Z`,
      });
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

.card-enter-from
  opacity: 0
  pointer-events: none

.card-enter-active
  transition: 0.3s ease

.card-leave-to
  opacity: 0
  pointer-events: none

.card-leave-active
  transition: 0.3s ease

.card-move
  transition: 0.3s ease
</style>
