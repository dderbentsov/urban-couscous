<template lang="pug">
  .schedule.ml-2
    calendar-header(
      :currentDate="currentDate"
      @previous-date="previousDate"
      @next-date="nextDate"
      @selected-layout="selectedLayout")
    .schedule-body.flex
      calendar-clock-column(:hoursArray="hoursArray" :currentTime="currentTime")
      calendar-background(:hoursArray="hoursArray" :currentTime="currentTime")
</template>

<script>
import * as moment from "moment/moment";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarBackground from "./CalendarBackground.vue";
import CalendarClockColumn from "./CalendarClockColumn.vue";
export default {
  name: "CalendarSchedule",
  components: { CalendarHeader, CalendarBackground, CalendarClockColumn },
  props: {
    currentDate: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      currentTime: "",
      hoursArray: [],
      timer: null,
    };
  },
  computed: {
    hours() {
      return parseInt(this.currentTime.slice(0, -6), 10);
    },
    hoursMinutes() {
      return this.currentTime.slice(0, -3);
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
      if (this.hours >= 8 && this.hours < 18) {
        this.timer = setInterval(() => {
          this.changeCurrentTime();
          this.changeHoursArray();
        }, 30000);
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
      for (let i = 8; i <= 18; i++) {
        if (i === this.hours) {
          this.hoursArray.push(this.hoursMinutes);
        } else this.hoursArray.push(`${i}:00`);
      }
    },
    changeHoursArray() {
      this.hoursArray = this.hoursArray.map((elem) => {
        if (parseInt(elem.slice(0, -3), 10) === this.hours) {
          return this.hoursMinutes;
        }
        return elem;
      });
    },
  },
  watch: {
    currentTime() {
      if (this.hours >= 18) {
        this.stopTimer();
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
</style>
