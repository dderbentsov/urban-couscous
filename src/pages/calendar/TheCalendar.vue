<template lang="pug">
  calendar-header(
    :currentDay="currentDate"
    @previous-date="switchPreviousDate"
    @next-date="switchNextDate"
    @selectedLayout="changeCalendarLayout")
</template>

<script>
import * as moment from "moment/moment";
import CalendarHeader from "./components/CalendarHeader.vue";
export default {
  name: "TheCalendar",
  components: { CalendarHeader },
  data() {
    return {
      currentDate: moment(),
      calendarLayout: "",
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
