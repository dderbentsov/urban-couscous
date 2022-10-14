<template lang="pug">
  .schedule.ml-2
    calendar-header(
      :currentDate="currentDate"
      @previous-date="previousDate"
      @next-date="nextDate"
      @selected-layout="selectedLayout")
    calendar-column(:info="columnInfo") 
</template>

<script>
import CalendarHeader from "./CalendarHeader.vue";
import CalendarColumn from "./CalendarColumn.vue";
import teamMemberAvatar from "@/assets/images/team-member.svg";
export default {
  name: "CalendarSchedule",
  components: { CalendarHeader, CalendarColumn },
  props: {
    currentDate: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      columnInfo: {
        name: "Захарова А.О.",
        avatar: teamMemberAvatar,
      },
    };
  },
  methods: {
    previousDate() {
      this.$emit("previous-date");
    },
    nextDate() {
      this.$emit("next-date");
    },
    selectedLayout(option) {
      this.$emit("selected-layout", option);
    },
  },
};
</script>

<style lang="sass" scoped>
.schedule
  width: 100%
</style>
