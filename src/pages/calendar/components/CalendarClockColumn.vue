<template lang="pug">
  .calendar-clock-column.flex.flex-col.items-end.gap-y-43.pt-9.pb-12.px-3
    span.font-medium.text-base(v-for="hour in hoursArray") {{ hour }}
</template>

<script>
export default {
  name: "CalendarClockColumn",
  props: {
    hoursArray: Array,
  },
};
</script>

<style lang="sass" scoped>
.calendar-clock-column
  width: 80px
  height: 100%
  color: var(--font-dark-blue-color)
</style>
