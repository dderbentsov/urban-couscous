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
      currentTime: moment().format("HH:mm:ss"),
      hoursArray: [],
      timer: null,
    };
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
    updateTime() {
      let currentHour = parseInt(this.currentTime.slice(0, -6), 10);
      if (currentHour < 20 && currentHour > 8) {
        this.timer = setInterval(() => {
          this.changeCurrentTime();
          this.changeHoursArray();
        }, 30000);
      }
    },
    changeCurrentTime() {
      this.currentTime = moment().format("HH:mm:ss");
    },
    hoursArrayInitialization() {
      for (let i = 8; i <= 18; i++) {
        let startTime = this.currentTime.slice(0, -3);
        let currentHour = parseInt(startTime.slice(0, -3), 10);
        if (i === currentHour) {
          this.hoursArray.push(startTime);
        } else this.hoursArray.push(`${i}:00`);
      }
    },
    changeHoursArray() {
      let newCurrentTime = this.currentTime.slice(0, -3);
      let currentHour = parseInt(newCurrentTime.slice(0, -3), 10);
      let newHoursArray = this.hoursArray.map((elem) => {
        if (parseInt(elem.slice(0, -3), 10) === currentHour) {
          return this.currentTime.slice(0, -3);
        }
        return elem;
      });
      this.hoursArray = newHoursArray;
    },
  },
  mounted() {
    this.changeCurrentTime();
    this.hoursArrayInitialization();
    this.updateTime();
  },
};
</script>

<style lang="sass" scoped>
.schedule
  width: 100%
  background-color: var(--default-white)
</style>
