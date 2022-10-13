<template lang="pug">
  calendar-header(
    :currentDay="currentDate"
    @previous-date="switchPreviousDate"
    @next-date="switchNextDate")
</template>

<script>
import * as moment from "moment/moment";
import CalendarHeader from "./components/CalendarHeader.vue";
moment.locale("ru");
export default {
  name: "TheCalendar",
  components: { CalendarHeader },
  data() {
    return {
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
  },
};
</script>
,
