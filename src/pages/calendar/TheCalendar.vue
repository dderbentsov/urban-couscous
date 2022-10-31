<template lang="pug">
  .calendar-container.flex
    calendar-sidebar(@width="changeWidth"
    :team-data="teamData"
    :open-form-create="openFormCreateEvent")
    calendar-schedule(
      :current-date="currentDate"
      :time-information="timeInformation"
      :events-data="eventsData"
      :sidebar-width="sidebarWidth"
      @previous-date="switchPreviousDate"
      @next-date="switchNextDate"
      @selected-layout="changeCalendarLayout"
      )
    calendar-form-add-event(v-if="isOpenForm" :close-form="closeFormCreateEvent")
</template>

<script>
import * as moment from "moment/moment";
import CalendarSchedule from "./components/CalendarSchedule.vue";
import CalendarSidebar from "./components/CalendarSidebar.vue";
import CalendarFormAddEvent from "./components/CalendarFormAddEvent.vue";
export default {
  name: "TheCalendar",
  components: {
    CalendarSchedule,
    CalendarSidebar,
    CalendarFormAddEvent,
  },
  data() {
    return {
      sidebarWidth: "72px",
      calendarLayout: "",
      currentDate: moment(),
      timeInformation: {
        dayStartTime: "00:00",
        dayEndTime: "20:00",
      },
      eventsData: [],
      teamData: [],
      isOpenForm: false,
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
    saveTeamData(res) {
      this.teamData = res.results;
    },
    fetchEventsData() {
      fetch("/registry/event/")
        .then((res) => res.json())
        .then((res) => this.saveEventsData(res));
      fetch("http://45.84.227.122:8080/general/employee/")
        .then((res) => res.json())
        .then((res) => this.saveTeamData(res));
    },
    changeWidth(value) {
      this.sidebarWidth = value;
    },

    openFormCreateEvent() {
      this.isOpenForm = true;
    },
    closeFormCreateEvent() {
      this.isOpenForm = false;
    },
  },
  mounted() {
    this.fetchEventsData();
  },
};
</script>

<style lang="sass" scoped>
.calendar-container
  width: calc(100vw - 80px)
</style>
