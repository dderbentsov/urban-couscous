<template lang="pug">
  .calendar-container.flex
    calendar-sidebar(
      @width="changeWidth"
      :team-data="employeesData"
      :open-form-create="openFormCreateEvent"
      :event-types="eventTypes"
    )
    calendar-schedule(
      :owners-data="employeesData"
      :current-date="currentDate"
      :time-information="timeInformation"
      :events-data="eventsData"
      :members-data="membersData"
      :sidebar-width="sidebarWidth"
      :event-types="eventTypes"
      :change-form-was-closed="changeFormWasClosed"
      @previous-date="switchPreviousDate"
      @next-date="switchNextDate"
      @selected-layout="changeCalendarLayout"
      @open-change-form="openFormCreateEvent"
      @reset-change-form="resetChangeFormState"
      @selected-event="writeEventData"
      @delete-event="openModal"
    )
    calendar-form-add-event(
      v-if="isOpenForm"
      :close-form="closeFormCreateEvent"
      :owners-data="employeesData"
      :members-data="membersData"
      :selected-event-data="selectedEvent"
      :event-types="eventTypes"
      @clear-selected-event-data="clearSelectedEvent"
      @close-change-form="setChangeFormState"
    )
    base-modal(
      v-model="showModal"
      title="Удаление события"
    ) 
      calendar-delete-modal(
        :event-types="eventTypes"
        :owner-event="selectedEvent"
        :close-modal="changeShowModal"
      )
</template>

<script>
import { fetchWrapper } from "../../shared/fetchWrapper.js";
import * as moment from "moment/moment";
import CalendarSchedule from "./components/CalendarSchedule.vue";
import CalendarSidebar from "./components/CalendarSidebar.vue";
import CalendarFormAddEvent from "./components/CalendarFormAddEvent.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import CalendarDeleteModal from "./components/CalendarDeleteModal.vue";
export default {
  name: "TheCalendar",
  components: {
    CalendarSchedule,
    CalendarSidebar,
    CalendarFormAddEvent,
    BaseModal,
    CalendarDeleteModal,
  },
  data() {
    return {
      sidebarWidth: "72px",
      calendarLayout: "",
      currentDate: moment(),
      selectedEvent: {},
      showModal: false,
      timeInformation: {
        dayStartTime: "08:00",
        dayEndTime: "24:00",
      },
      eventsData: [],
      employeesData: [],
      isOpenForm: false,
      changeFormWasClosed: false,
      membersData: [],
      eventTypes: [
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
        .get("registry/event/?limit=20")
        .then((res) => this.saveEventsData(res));
    },
    changeWidth(value) {
      this.sidebarWidth = value;
    },
    openFormCreateEvent() {
      this.isOpenForm = true;
    },
    closeFormCreateEvent() {
      this.isOpenForm = false;
      this.fetchEventsData();
    },
    setChangeFormState() {
      this.changeFormWasClosed = true;
    },
    resetChangeFormState() {
      this.changeFormWasClosed = false;
    },
    writeEventData(eventData) {
      this.selectedEvent = eventData;
      this.openFormCreateEvent();
    },
    clearSelectedEvent() {
      this.selectedEvent = {};
    },
    openModal(eventData) {
      this.selectedEvent = eventData;
      this.showModal = true;
    },
    changeShowModal() {
      this.showModal = false;
    },
  },
  watch: {
    showModal: function () {
      if (this.showModal === false) {
        this.setChangeFormState();
        this.clearSelectedEvent();
      }
    },
  },
  mounted() {
    this.fetchPersonsData();
    this.fetchEventsData();
  },
};
</script>

<style lang="sass" scoped>
.calendar-container
  width: calc(100vw - 80px)
</style>
