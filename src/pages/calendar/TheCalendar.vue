<template lang="pug">
  .calendar-container.flex
    calendar-sidebar(@width="changeWidth" :team="team")
    calendar-schedule(
      :current-date="currentDate"
      :time-information="timeInformation"
      :events-data="eventsData"
      :sidebar-width="sidebarWidth"
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
      sidebarWidth: "72px",
      calendarLayout: "",
      currentDate: moment(),
      timeInformation: {
        dayStartTime: "8:00",
        dayEndTime: "18:00",
      },
      eventsData: [],
      team: [
        {
          id: 1,
          last_name: "Гагарин",
          first_name: "Юрий",
          patronymic: "Алексеевич",
          avatar: img,
        },
        {
          id: 2,
          last_name: "Константинопольская",
          first_name: "Юлия",
          patronymic: "Витальевна",
          avatar: img,
        },
        {
          id: 3,
          last_name: "Коломойцев",
          first_name: "Игорь",
          patronymic: "Константинович",
          avatar: img,
        },
        {
          id: 4,
          last_name: "Зайцев",
          first_name: "Валерий",
          patronymic: "Сергеевич",
          avatar: img,
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
    fetchEventsData() {
      fetch("/registry/event/")
        .then((res) => res.json())
        .then((res) => this.saveEventsData(res));
    },
    changeWidth(value) {
      this.sidebarWidth = value;
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
