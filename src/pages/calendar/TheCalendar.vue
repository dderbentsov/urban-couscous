<template lang="pug">
  .calendar-container.flex
    calendar-sidebar(
      @width="changeWidth"
      :team-data="employeesData"
      :open-form-create="openFormCreateEvent"
    )
    calendar-schedule(
      :owners-data="employeesData"
      :current-date="currentDate"
      :time-information="timeInformation"
      :events-data="eventsData"
      :members-data="membersData"
      :sidebar-width="sidebarWidth"
      :close-form-create-event="closeFormCreateEvent"
      :is-open-form="isOpenForm"
      @previous-date="switchPreviousDate"
      @next-date="switchNextDate"
      @selected-layout="changeCalendarLayout"
      @open-change-form="openFormCreateEvent"
    )
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
      employeesData: [],
      isOpenForm: false,
      membersData: [],
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
    saveEmployeesData(res) {
      this.employeesData = res.results;
    },
    saveMembersData(res) {
      this.membersData = res.results;
    },
    fetchEventsData() {
      fetch("http://45.84.227.122:8080/registry/event/")
        .then((res) => res.json())
        .then((res) => this.saveEventsData(res));
      fetch("http://45.84.227.122:8080/general/employee/")
        .then((res) => res.json())
        .then((res) => this.saveEmployeesData(res));
      fetch("http://45.84.227.122:8080/general/person/")
        .then((res) => res.json())
        .then((res) => this.saveMembersData(res));
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
