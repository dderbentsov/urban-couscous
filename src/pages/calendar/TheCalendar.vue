<template lang="pug">
  .calendar-container.flex(:style="{ width: `calc(100% - ${currentWidth})` }")
    calendar-sidebar(@width='changeWidth' :team="team")
    calendar-schedule(
      :current-date="currentDate"
      :time-information="timeInformation"
      :events-data="eventsData"
      @previous-date="switchPreviousDate"
      @next-date="switchNextDate"
      @selected-layout="changeCalendarLayout"
      )
</template>

<script>
import * as moment from "moment/moment";
import CalendarSchedule from "./components/CalendarSchedule.vue";
import CalendarSidebar from "./components/CalendarSidebar.vue";
import img from "../../assets/images/team-member.svg";
export default {
  name: "TheCalendar",
  components: { CalendarSchedule, CalendarSidebar },
  data() {
    return {
      currentWidth: "152px",
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
      team: [
        { id: 1, name: "Захарова А.О.", avatar: img },
        { id: 2, name: "Константинопольская Ю.В.", avatar: img },
        { id: 3, name: "Коломойцев И.К.", avatar: img },
        { id: 4, name: "Зайцев В.С.", avatar: img },
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
    fetchEventsData() {
      fetch("/registry/event/")
        .then((res) => res.json())
        .then((res) => this.saveEventsData(res));
    },
    changeWidth(value) {
      this.currentWidth = value.width;
    },
  },
  mounted() {
    this.fetchEventsData();
  },
};
</script>
