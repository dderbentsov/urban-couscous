<template lang="pug">
  .calendar-background-wrapper.flex.flex-col
    calendar-column(
      v-for="(owner, index) in columnInformation.owners"
      :key="owner"
      :column-information="owner"
      :style="calculateColumnPosition(index)"
      )
    .header
    .body.flex.flex-col
      .line-wrapper
        .line.flex.items-center(
          v-for="hour in hoursArray"
          :key="hour"
          )
          .middle-line
      .time-circle-indicator.-left-6px(
        v-if="isShownIndicator"
        :style="circleIndicatorLocation"
        )
      span.time-line-indicator.block(
        v-if="isShownIndicator"
        :style="lineIndicatorLocation"
        )
</template>

<script>
import * as moment from "moment/moment";
import CalendarColumn from "./CalendarColumn.vue";
export default {
  name: "CalendarBackground",
  components: { CalendarColumn },
  props: {
    hoursArray: Array,
    currentTime: String,
    currentDate: Object,
    dayStartTime: Number,
    dayEndTime: Number,
    columnInformation: Object,
  },
  data() {
    return {
      isShownIndicator: true,
      pixelsPerHour: 62,
      columnWidth: 470,
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
    scheduleSize() {
      return (this.dayEndTime - this.dayStartTime) * this.pixelsPerHour;
    },
    pixelsPerMinute() {
      return this.pixelsPerHour / 60;
    },
  },
  methods: {
    calculateIndicatorLocation() {
      let newTime = this.currentTime
        .split(":")
        .map((elem) => parseInt(elem, 10));
      let result =
        (newTime[0] - this.dayStartTime) * this.pixelsPerHour +
        newTime[1] * this.pixelsPerMinute;
      if (result > this.scheduleSize || result < 0) {
        this.isShownIndicator = false;
        return 0;
      }
      return result;
    },
    calculateColumnPosition(elemIndex) {
      return {
        left: `${elemIndex * this.columnWidth}px`,
      };
    },
  },
  watch: {
    currentDate: function () {
      this.isShownIndicator =
        this.currentDate.format("DD.MM.YYYY") === moment().format("DD.MM.YYYY");
    },
  },
};
</script>

<style lang="sass" scoped>
.calendar-background-wrapper
  width: 100%
  position: relative

.header
  height: 48px

.body
  position: relative

.line
  border-bottom: 1px solid var(--border-light-grey-color)
  height: 62px
  &:first-child
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
