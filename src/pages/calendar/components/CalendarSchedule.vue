<template lang="pug">
  .schedule.ml-2
    calendar-header(
      :currentDate="currentDate"
      @previous-date="previousDate"
      @next-date="nextDate"
      @selected-layout="selectedLayout")
    .schedule-body.flex
      calendar-clock-column(:hoursArray="hoursArray")
      calendar-column(:info="columnInfo" :hoursArray="hoursArray" :currentTime="currentTime")
</template>

<script>
import * as moment from "moment/moment";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarColumn from "./CalendarColumn.vue";
import CalendarClockColumn from "./CalendarClockColumn.vue";
import teamMemberAvatar from "@/assets/images/team-member.svg";
export default {
  name: "CalendarSchedule",
  components: { CalendarHeader, CalendarColumn, CalendarClockColumn },
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
      columnInfo: {
        name: "Захарова А.О.",
        avatar: teamMemberAvatar,
      },
      currentTime: "",
      hoursArray: [],
      timer: null,
    };
  },
  methods: {
    hours() {
      return parseInt(this.currentTime.slice(0, -6), 10);
    },
    hoursMinutes() {
      return this.currentTime.slice(0, -3);
    },
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
      if (this.hours() <= 18 && this.hours() >= 8) {
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
        if (i === this.hours()) {
          this.hoursArray.push(this.hoursMinutes());
        } else this.hoursArray.push(`${i}:00`);
      }
    },
    changeHoursArray() {
      this.hoursArray = this.hoursArray.map((elem) => {
        if (parseInt(elem.slice(0, -3), 10) === this.hours()) {
          return this.hoursMinutes();
        }
        return elem;
      });
    },
  },
  watch: {
    currentTime() {
      if (this.hours() >= 18) {
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
  width: 100%
  background-color: var(--default-white)
</style>
