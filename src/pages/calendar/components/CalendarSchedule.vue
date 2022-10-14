<template lang="pug">
  .schedule.ml-2
    calendar-header(
      :currentDate="currentDate"
      @previous-date="previousDate"
      @next-date="nextDate"
      @selected-layout="selectedLayout")
    .schedule-body.flex
      calendar-clock-column(:hoursArray="hoursArray")
      calendar-column(:info="columnInfo" :hoursArray="hoursArray" :currentTime="currtentTime")
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
      currtentTime: "",
      hoursArray: [],
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
      setInterval(this.changeCurrentTime, 5000);
    },
    changeCurrentTime() {
      this.currtentTime = moment().format("HH:mm:ss");
      console.log(this.currtentTime);
    },
    calculateHoursCount() {
      for (let i = 8; i <= 18; i++) {
        this.hoursArray.push(`${i}:00`);
      }
    },
  },
  mounted() {
    this.calculateHoursCount();
    this.updateTime();
  },
};
</script>

<style lang="sass" scoped>
.schedule
  width: 100%
  background-color: var(--default-white)
</style>
