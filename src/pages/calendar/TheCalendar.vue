<template lang="pug">
  .calendar-container
    calendar-schedule(
      :currentDate="currentDate"
      @previous-date="switchPreviousDate"
      @next-date="switchNextDate"
      @selected-layout="changeCalendarLayout"
      )
</template>

<script>
import * as moment from "moment/moment";
import CalendarSchedule from "./components/CalendarSchedule.vue";
export default {
  name: "TheCalendar",
  components: { CalendarSchedule },
  data() {
    return {
      calendarLayout: "",
      currentDate: moment(),
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
