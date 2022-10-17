<template lang="pug">
  .calendar-clock-column.flex.flex-col.items-end.gap-y-43.pt-9.pb-12.px-3
    span.font-medium.text-base(v-for="hour in hoursArray" :key="hour" :class="currentHourStyle(hour)") {{ hour }}
</template>

<script>
import * as moment from "moment/moment";
export default {
  name: "CalendarClockColumn",
  props: {
    hoursArray: Array,
    currentTime: String,
    currentDate: Object,
  },
  computed: {
    currentHour() {
      return parseInt(this.currentTime.slice(0, -6), 10);
    },
    isCurrentDay() {
      return (
        this.currentDate.format("DD.MM.YYYY") === moment().format("DD.MM.YYYY")
      );
    },
  },
  methods: {
    currentHourStyle(elem) {
      if (
        parseInt(elem.slice(0, 3), 10) === this.currentHour &&
        this.isCurrentDay
      ) {
        return {
          "current-time": true,
          "font-bold": true,
        };
      }
      return {
        "current-time": false,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
.current-time
  color: var(--time-indicator-color)

.calendar-clock-column
  width: 80px
  height: 100%
  color: var(--font-dark-blue-color)
</style>
