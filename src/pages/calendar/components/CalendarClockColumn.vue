<template lang="pug">
  .calendar-clock-column.flex.flex-col.items-end.gap-y-43.pb-5.px-3
    span.text-base(
      v-for="hour in timeCoil",
      :key="hour",
      :class="currentHourStyle(hour)"
    ) {{ hour }}
</template>

<script>
export default {
  name: "CalendarClockColumn",
  props: {
    timeCoil: Array,
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
        "font-medium": true,
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
  color: var(--bg-event-red-color)
.calendar-clock-column
  width: 80px
  height: 100%
  color: var(--font-dark-blue-color)
  background-color: var(--default-white)
</style>
