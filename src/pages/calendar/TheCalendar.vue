<template lang="pug">
  .calendar-container.ml-2
    calendar-header(
      :currentDay="currentDate"
      @previous-date="switchPreviousDate"
      @next-date="switchNextDate"
      @selectedLayout="changeCalendarLayout")
    calendar-column(:info="columnInfo") 
</template>

<script>
import * as moment from "moment/moment";
import CalendarHeader from "./components/CalendarHeader.vue";
import CalendarColumn from "./components/CalendarColumn.vue";
import teamMemberAvatar from "@/assets/images/team-member.svg";
export default {
  name: "TheCalendar",
  components: { CalendarHeader, CalendarColumn },
  data() {
    return {
      currentDate: moment(),
      calendarLayout: "",
      columnInfo: {
        name: "Захарова А.О.",
        avatar: teamMemberAvatar,
      },
    };
  },
  methods: {
    switchPreviousDate() {
      this.currentDate = this.currentDate.clone().subtract(1, "day");
    },
    switchNextDate() {
      this.currentDate = this.currentDate.clone().add(1, "day");
    },
    changeCalendarLayout(option) {
      this.calendarLayout = option;
    },
  },
};
</script>

<style lang="sass" scoped>
.calendar-container
  width: 100%
</style>
