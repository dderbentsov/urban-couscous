<template lang="pug">
  .calendar-container.flex
    calendar-sidebar
    calendar-schedule(
      :current-date="currentDate"
      :time-information="timeInformation"
      :column-information="columnInformation"
      @previous-date="switchPreviousDate"
      @next-date="switchNextDate"
      @selected-layout="changeCalendarLayout"
      )
</template>

<script>
import * as moment from "moment/moment";
import CalendarSchedule from "./components/CalendarSchedule.vue";
import CalendarSidebar from "./components/CalendarSidebar.vue";
export default {
  name: "TheCalendar",
  components: { CalendarSchedule, CalendarSidebar },
  data() {
    return {
      calendarLayout: "",
      currentDate: moment(),
      timeInformation: {
        dayStartTime: "8:00",
        dayEndTime: "18:00",
      },
      eventsData: [],
      columnInformation: {
        owners: [
          "Захарова А.О.",
          "Константинопольская Ю.В.",
          "Коломойцев И.К.",
          "Зайцев В.С.",
        ],
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
    saveEventsData(res) {
      this.eventsData = res.results;
    },
    fetchEventsData() {
      fetch("/registry/event/")
        .then((res) => res.json())
        .then((res) => this.saveEventsData(res));
    },
  },
  mounted() {
    this.fetchEventsData();
  },
};
</script>

<style lang="sass" scoped>
.calendar-container
  width: calc(100% - 80px)
</style>
