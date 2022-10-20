<template lang="pug">
  .calendar-background-wrapper.flex.flex-col(
    ref="backgroundWrapper"
    )
    calendar-column(
      v-for="(owner, index) in columnInformation.owners"
      :key="owner"
      :column-information="owner"
      :style="calculateColumnPosition(index)"
      )
    .header(:style="backgroundExtendedWidth")
    .body.flex.flex-col(:style="backgroundExtendedWidth")
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
      backgroundWidth: 0,
      columnWidth: 0,
      defaultColumnWidth: 470,
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
    ownersArrayLength() {
      return this.columnInformation.owners.length;
    },
    backgroundExtendedWidth() {
      if (this.ownersArrayLength > 3) {
        return {
          width: `${this.defaultColumnWidth * this.ownersArrayLength}px`,
        };
      }
      return {
        width: "auto",
      };
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
      if (this.ownersArrayLength < 4) {
        this.columnWidth = this.backgroundWidth / this.ownersArrayLength;
        return {
          width: `${this.columnWidth}px`,
          left: `${elemIndex * this.columnWidth}px`,
        };
      }
      return {
        width: `${this.defaultColumnWidth}px`,
        left: `${elemIndex * this.defaultColumnWidth}px`,
      };
    },
    calculateBackgroundWidth() {
      this.backgroundWidth = this.$refs.backgroundWrapper.clientWidth;
    },
  },
  watch: {
    currentDate: function () {
      this.isShownIndicator =
        this.currentDate.format("DD.MM.YYYY") === moment().format("DD.MM.YYYY");
    },
  },
  mounted() {
    this.calculateBackgroundWidth();
  },
};
</script>

<style lang="sass" scoped>
.calendar-background-wrapper
  width: 100%
  position: relative
  overflow-x: scroll

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
  z-index: 10

.time-circle-indicator
  width: 12px
  height: 12px
  background-color: var(--time-indicator-color)
  border-radius: 50%
  position: absolute
  z-index: 10
</style>
