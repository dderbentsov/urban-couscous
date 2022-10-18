<template lang="pug">
  .calendar-clock-column.flex.flex-col.items-end.gap-y-43.pt-9.pb-12.px-3
    span.font-medium.text-base(
      v-for="hour in hoursArray"
      :key="hour"
      :class="currentHourStyle(hour)"
      ) {{ hour }}
</template>

<script>
export default {
  name: "CalendarClockColumn",
  props: {
    hoursArray: Array,
    currentTime: String,
    currentDate: Object,
    dayEndTime: Number,
    isCurrentDate: Boolean,
  },
  computed: {
    currentHour() {
      return this.convertTime(this.currentTime, 0, -6);
    },
    currentMinute() {
      return this.convertTime(this.currentTime, 3, -3);
    },
    isEndDay() {
      return this.dayEndTime === this.currentHour && this.currentMinute > 0;
    },
  },
  methods: {
    currentHourStyle(elem) {
      if (
        this.convertTime(elem, 0, 3) === this.currentHour &&
        !this.isEndDay &&
        this.isCurrentDate
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
    convertTime(str, startIndex, endIndex) {
      return parseInt(str.slice(startIndex, endIndex), 10);
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
