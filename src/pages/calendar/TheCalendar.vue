<template lang="pug">
  .calendar-container.flex
    calendar-sidebar(
      @width="changeWidth"
      :team-data="employeesData"
      :open-form-create="openFormCreateEvent"
      :event-type="eventType"
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
      @update-events="fetchEventsData"
    )
</template>

<script>
import { fetchWrapper } from "../../shared/fetchWrapper.js";
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
  props: {
    isOpenHeaderForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sidebarWidth: "72px",
      calendarLayout: "",
      currentDate: moment(),
      timeInformation: {
        dayStartTime: "08:00",
        dayEndTime: "20:00",
      },
      eventsData: [],
      employeesData: [],
      isOpenForm: false,
      membersData: [],
      eventType: [
        { id: 1, label: "Встреча", color: "var(--bg-event-green-color)" },
        { id: 2, label: "Планерка", color: "var(--bg-event-red-color)" },
        { id: 3, label: "Интервью", color: "var(--bg-event-yellow-color)" },
        { id: 4, label: "Важная работа", color: "var(--bg-event-blue-color)" },
      ],
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
    fetchPersonsData() {
      fetchWrapper
        .get("general/employee/")
        .then((res) => this.saveEmployeesData(res));
      fetchWrapper
        .get("general/person/")
        .then((res) => this.saveMembersData(res));
    },
    fetchEventsData() {
      fetchWrapper
        .get("registry/event/")
        .then((res) => this.saveEventsData(res));
    },
    changeWidth(value) {
      this.sidebarWidth = value;
    },
    openFormCreateEvent() {
      this.isOpenForm = !this.isOpenHeaderForm;
      this.$emit("is-open-page-form", this.isOpenForm);
    },
    closeFormCreateEvent() {
      this.isOpenForm = false;
      this.$emit("is-open-page-form", this.isOpenForm);
    },
  },
  mounted() {
    this.fetchPersonsData();
    this.fetchEventsData();
  },
  beforeUnmount() {
    this.closeFormCreateEvent();
  },
};
</script>

<style lang="sass" scoped>
.calendar-container
  width: calc(100vw - 80px)
</style>
