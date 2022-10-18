<template lang="pug">
  .calendar-container
    calendar-schedule(
      :current-date="currentDate"
      :time-information="timeInformation"
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
      timeInformation: {
        dayStartTime: "8:00",
        dayEndTime: "18:00",
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
