<template lang="pug">
  .calendar-background-wrapper.flex.flex-col
    .header.flex.items-center.justify-between.py-2.px-6
    .body.flex.flex-col
      .time-circle-indicator.-left-6(v-if="isShownIndicator" :style="circleIndicatorLocation")
      span.time-line-indicator.block(v-if="isShownIndicator" :style="lineIndicatorLocation")
      .line.flex.items-center(v-for="hour in hoursArray" :key="hour")
        .middle-line
</template>

<script>
export default {
  name: "CalendarBackground",
  props: {
    hoursArray: Array,
    currentTime: String,
  },
  data() {
    return {
      isShownIndicator: true,
    };
  },
  computed: {
    lineIndicatorLocation() {
      return {
        top: `${this.calculateIndicatorLocation()}px`,
      };
    },
    circleIndicatorLocation() {
      return {
        top: `${this.calculateIndicatorLocation() - 6}px`,
      };
    },
  },
  methods: {
    calculateIndicatorLocation() {
      let newTime = this.currentTime
        .split(":")
        .map((elem) => parseInt(elem, 10));
      let result = (newTime[0] - 8) * 62 + newTime[1] * 1.03;
      if (result > 620) {
        this.isShownIndicator = false;
        return 0;
      }
      return result;
    },
  },
};
</script>

<style lang="sass" scoped>
.calendar-background-wrapper
  width: 100%

.header
  height: 48px

.body
  position: relative

.line
  border-bottom: 1px solid var(--border-light-grey-color)
  height: 62px
  &:nth-child(3)
    height: 63px
    border-top: 1px solid var(--border-light-grey-color)
  &:last-child
    display: none

.middle-line
  border-top: 1px dashed var(--border-light-grey-color)
  width: 100%

.time-line-indicator
  width: 100%
  border-top: 1px solid var(--time-indicator-color)
  position: absolute

.time-circle-indicator
  width: 12px
  height: 12px
  background-color: var(--time-indicator-color)
  border-radius: 50%
  position: absolute
</style>
