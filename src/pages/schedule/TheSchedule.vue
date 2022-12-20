<template lang="pug">
  .wrapper.flex.w-full.relative.mx-2
    .schedule-wrapper.relative.flex.flex-col.px-6.py-6.h-full.w-full.gap-y-5
      schedule-header
      schedule-body(:employee-list="employeeList")
      schedule-bar
</template>

<script>
import ScheduleHeader from "@/pages/schedule/components/ScheduleHeader.vue";
import ScheduleBar from "@/pages/schedule/components/ScheduleBar.vue";
import ScheduleBody from "@/pages/schedule/components/ScheduleBody.vue";
import { fetchWrapper } from "@/shared/fetchWrapper.js";
export default {
  name: "TheSchedule",
  components: { ScheduleHeader, ScheduleBar, ScheduleBody },
  data() {
    return {
      employeeList: [],
    };
  },
  methods: {
    getSchedules() {
      fetchWrapper
        .get("general/employee/")
        .then((res) => (this.employeeList = res.results));
    },
  },
  mounted() {
    this.getSchedules();
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  overflow: auto
  border-top-left-radius: 4px
  border-top-right-radius: 4px

.schedule-wrapper
  background-color: var(--default-white)
  height: calc(100vh - 64px)
</style>
