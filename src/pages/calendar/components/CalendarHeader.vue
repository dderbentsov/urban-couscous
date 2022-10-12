<template lang="pug">
  .calendar-header-wrapper.flex.items-center.justify-between.ml-2.py-3.pl-5.pr-6
    .flex
      base-arrow-button.left-arrow.mr-4
      base-arrow-button.right-arrow.mr-6
      .text.flex.items-center
        span.font-medium.text-base 24 Мая 2022 
          span.today.font-bold.text-xxs(v-if="isToday") Сегодня
    calendar-layout-switch(@selected="changeSelectedLayout")
</template>

<script>
import BaseArrowButton from "@/components/base/buttons/BaseArrowButton.vue";
import CalendarLayoutSwitch from "./CalendarLayoutSwitch.vue";
export default {
  name: "CalendarHeader",
  components: { BaseArrowButton, CalendarLayoutSwitch },
  data() {
    return {
      isToday: true,
      selectedLayout: "",
    };
  },
  methods: {
    changeSelectedLayout(option) {
      this.selectedLayout = option;
    },
  },
};
</script>

<style lang="sass" scoped>
.calendar-header-wrapper
  width: 100%
  background-color: var(--bg-white-color)
  height: 56px
  border-radius: 4px

.left-arrow
  transform: rotate(90deg)

.right-arrow
  transform: rotate(270deg)

.text
  color: var(--font-dark-blue-color)

.today
  opacity: 0.5
</style>
