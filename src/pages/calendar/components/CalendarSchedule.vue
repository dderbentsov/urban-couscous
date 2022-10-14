<template lang="pug">
  .schedule.ml-2
    calendar-header(
      :currentDate="currentDate"
      @previous-date="previousDate"
      @next-date="nextDate"
      @selected-layout="selectedLayout")
    .schedule-body.flex
      calendar-clock-column(:hoursArray="hoursArray")
      calendar-column(:info="columnInfo" :hoursArray="hoursArray")
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
      hoursArray: [
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
      ],
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
      setInterval(this.changeCurrentTime, 30000);
    },
    changeCurrentTime() {
      this.currtentTime = moment().format("h:mm:ss");
      console.log(this.currtentTime);
    },
  },
};
</script>

<style lang="sass" scoped>
.schedule
  width: 100%
  background-color: var(--default-white)
</style>
