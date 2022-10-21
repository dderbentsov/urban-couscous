<template lang="pug">
  .schedule.ml-2.w-full
    calendar-header(
      :current-date="currentDate"
      :is-current-date="isCurrentDate"
      @previous-date="previousDate"
      @next-date="nextDate"
      @selected-layout="selectedLayout"
      )
    .schedule-body.flex
      div
        calendar-clock-column(
          :hours-array="hoursArray"
          :current-time="currentTime"
          :is-current-date="isCurrentDate"
          :day-end-time="validateEndTime"
          )
      calendar-background(
        :hours-array="hoursArray"
        :events-data="eventsData"
        )
      .time-circle-indicator.left-74px(
        v-if="isShownIndicator"
        :style="circleIndicatorLocation"
        )
      span.time-line-indicator.block.left-20(
        v-if="isShownIndicator"
        :style="lineIndicatorLocation"
        )  
</template>

<script>
import * as moment from "moment/moment";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarBackground from "./CalendarBackground.vue";
import CalendarClockColumn from "./CalendarClockColumn.vue";
export default {
  name: "CalendarSchedule",
  components: {
    CalendarHeader,
    CalendarBackground,
    CalendarClockColumn,
  },
  props: {
    currentDate: {
      type: Object,
      default() {
        return {};
      },
    },
    timeInformation: {
      type: Object,
      default() {
        return {};
      },
    },
    eventsData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentTime: "",
      hoursArray: [],
      timer: null,
      isCurrentDate: true,
      isShownIndicator: true,
      pixelsPerHour: 62,
      columnHeaderHeight: 48,
    };
  },
  computed: {
    hours() {
      return this.convertTime(this.currentTime, 0, -6);
    },
    minutes() {
      return this.convertTime(this.currentTime, 3, -3);
    },
    hoursMinutes() {
      return this.currentTime.slice(0, -3);
    },
    validateStartTime() {
      return this.verifyTime(this.timeInformation.dayStartTime);
    },
    validateEndTime() {
      return this.verifyTime(this.timeInformation.dayEndTime);
    },
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
    pixelsPerMinute() {
      return this.pixelsPerHour / 60;
    },
    scheduleSize() {
      return (
        (this.validateEndTime - this.validateStartTime) * this.pixelsPerHour +
        this.columnHeaderHeight
      );
    },
  },
  methods: {
    previousDate() {
      this.$emit("previous-date");
    },
    nextDate() {
      this.$emit("next-date");
    },
    selectedLayout(option) {
      this.$emit("selected-layout", option);
    },
    startTimer() {
      if (
        this.hours >= this.validateStartTime &&
        this.hours < this.validateEndTime
      ) {
        this.timer = setInterval(() => {
          this.changeCurrentTime();
          this.changeHoursArray();
        }, 5000);
      }
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    changeCurrentTime() {
      this.currentTime = moment().format("HH:mm:ss");
    },
    hoursArrayInitialization() {
      this.hoursArray = [];
      for (let i = this.validateStartTime; i <= this.validateEndTime; i++) {
        if (
          i === this.hours &&
          this.hours !== this.validateEndTime &&
          this.isCurrentDate
        ) {
          this.hoursArray.push(this.hoursMinutes);
        } else this.hoursArray.push(`${i}:00`);
      }
    },
    changeHoursArray() {
      this.hoursArray = this.hoursArray.map((elem) => {
        if (this.convertTime(elem, 0, -3) === this.hours) {
          return this.hoursMinutes;
        }
        return elem;
      });
    },
    verifyTime(dayTime) {
      let timeArray = dayTime.split(":").map((elem) => parseInt(elem, 10));
      let newTime = timeArray[1] > 30 ? timeArray[0] + 1 : timeArray[0];
      return newTime;
    },
    convertTime(str, startIndex, endIndex) {
      return parseInt(str.slice(startIndex, endIndex), 10);
    },
    calculateIndicatorLocation() {
      let newTime = this.currentTime
        .split(":")
        .map((elem) => parseInt(elem, 10));
      let result =
        (newTime[0] - this.validateStartTime) * this.pixelsPerHour +
        newTime[1] * this.pixelsPerMinute +
        this.columnHeaderHeight;
      if (result > this.scheduleSize || result < 0) {
        this.isShownIndicator = false;
        return 0;
      }
      return result;
    },
  },
  watch: {
    currentTime() {
      if (
        this.hours === this.validateEndTime &&
        this.minutes > 0 &&
        this.timer
      ) {
        this.stopTimer();
        this.hoursArrayInitialization();
      }
    },
    currentDate: function () {
      this.isCurrentDate =
        this.currentDate.format("DD.MM.YYYY") === moment().format("DD.MM.YYYY");
      this.isShownIndicator = this.isCurrentDate;
      if (this.timer) {
        this.stopTimer();
        this.hoursArrayInitialization();
      }
      if (this.isCurrentDate) {
        this.changeCurrentTime();
        this.hoursArrayInitialization();
        this.startTimer();
      }
    },
  },
  mounted() {
    this.changeCurrentTime();
    this.hoursArrayInitialization();
    this.startTimer();
  },
  beforeUnmount() {
    this.stopTimer();
  },
};
</script>

<style lang="sass" scoped>
.schedule
  background-color: var(--default-white)
  width: calc(100% - 80px)

.time-line-indicator
  width: calc(100% - 80px)
  border-top: 1px solid var(--time-indicator-color)
  position: absolute

.time-circle-indicator
  width: 12px
  height: 12px
  background-color: var(--time-indicator-color)
  border-radius: 50%
  position: absolute

.schedule-body
  position: relative
</style>
