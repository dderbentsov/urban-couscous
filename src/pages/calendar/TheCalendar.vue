<template lang="pug">
  .calendar-container.flex
    calendar-sidebar(
      :url="url",
      :team-data="employeesData",
      :open-form-create="openFormCreateEvent",
      :event-statuses="eventStatuses",
      @width="changeWidth",
    )
    calendar-schedule(
      :url="url",
      :owners-data="employeesData",
      :current-date="currentDate",
      :time-information="timeInformation",
      :events-data="eventsData",
      :sidebar-width="sidebarWidth",
      :event-statuses="eventStatuses",
      :change-form-was-closed="changeFormWasClosed",
      @previous-date="switchPreviousDate",
      @next-date="switchNextDate",
      @selected-layout="changeCalendarLayout",
      @reset-change-form="resetChangeFormState",
      @selected-event="writeEventData",
      @delete-event="openModal",
      :open-form-create-event="openFormCreateEvent"
    )
    transition(name="form")
      calendar-form-add-event(
        v-if="isOpenForm",
        :close-form="closeFormCreateEvent",
        :owners-data="employeesData",
        :selected-event-data="selectedEvent",
        :event-statuses="eventStatuses",
        :time-information="timeInformation",
        @clear-selected-event-data="clearSelectedEvent",
        @close-change-form="setChangeFormState"
      )
    base-modal(
      v-model="showModal",
      title="Удаление события"
    ) 
      calendar-delete-modal(
        :event-statuses="eventStatuses",
        :owner-event="selectedEvent",
        :close-modal="changeShowModal",
        @update-events="fetchEventsData"
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
  props: {
    url: String,
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
        dayEndTime: "20:00",
      },
      eventsData: [],
      employeesData: [],
      isOpenForm: false,
      changeFormWasClosed: false,
      eventStatuses: [
        {
          id: 0,
          label: "Планируется прием",
          value: "PLANNED",
          color: "var(--default-white)",
        },
        {
          id: 1,
          label: "Отменил",
          value: "CANCELED",
          color: "var(--bg-event-grey-color)",
        },
        {
          id: 2,
          label: "Ожидается прием",
          value: "EXPECTED",
          color: "var(--bg-event-yellow-color)",
        },
        {
          id: 3,
          label: "Опаздывает",
          value: "LATE",
          color: "var(--bg-event-orange-color)",
        },
        {
          id: 4,
          label: "Идет прием",
          value: "RECEPTION",
          color: "var(--bg-event-blue-color)",
        },
        {
          id: 5,
          label: "Прием завершен",
          value: "COMPLETED",
          color: "var(--bg-event-green-color)",
        },
        {
          id: 6,
          label: "Не пришел",
          value: "DID_NOT_COME",
          color: "var(--bg-event-red-color)",
        },
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
    fetchEmployeesData() {
      fetchWrapper
        .get("general/employee/")
        .then((res) => this.saveEmployeesData(res));
    },
    fetchEventsData() {
      fetchWrapper
        .get("registry/event/?limit=100")
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
    this.fetchEmployeesData();
    this.fetchEventsData();
  },
};
</script>

<style lang="sass" scoped>
.calendar-container
  width: calc(100vw - 80px)

.form-enter-from
  opacity: 0
  transform: translateY(300px)
  pointer-events: none

.form-enter-active
  transition: 0.5s ease

.form-leave-to
  opacity: 0
  transform: translateY(300px)
  pointer-events: none

.form-leave-active
  transition: 0.5s ease

.form-move
  transition: 0.5s ease
</style>
