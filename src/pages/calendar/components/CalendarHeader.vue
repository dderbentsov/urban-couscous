<template lang="pug">
  .calendar-header-wrapper.flex.items-center.justify-between.py-3.pl-5.pr-6.top-0
    .flex
      base-arrow-button.left-arrow.mr-4(@click="previousHandler")
      base-arrow-button.right-arrow.mr-6(@click="nextHandler")
      .text.flex.items-center
        span.font-medium.text-base {{ dateString }}
          span.today.font-bold.text-xxs(v-if="isCurrentDate")  Сегодня
    calendar-layout-switch(@selected="changeSelectedLayout")
</template>

<script>
import BaseArrowButton from "@/components/base/buttons/BaseArrowButton.vue";
import CalendarLayoutSwitch from "./CalendarLayoutSwitch.vue";
export default {
  name: "CalendarHeader",
  components: { BaseArrowButton, CalendarLayoutSwitch },
  props: {
    currentDate: Object,
    isCurrentDate: Boolean,
  },
  computed: {
    dateString() {
      let newStr = this.currentDate.format("D MMMM YYYY");
      return newStr
        .split(" ")
        .map((elem, index) => {
          if (index === 1) return elem[0].toUpperCase() + elem.slice(1);
          return elem;
        })
        .join(" ");
    },
  },
  methods: {
    changeSelectedLayout(option) {
      this.$emit("selected-layout", option);
    },
    previousHandler() {
      this.$emit("previous-date");
    },
    nextHandler() {
      this.$emit("next-date");
    },
  },
};
</script>

<style lang="sass" scoped>
.calendar-header-wrapper
  width: 100%
  background-color: var(--default-white)
  height: 56px
  border-radius: 4px
  position: sticky
  z-index: 10

.left-arrow
  transform: rotate(90deg)

.right-arrow
  transform: rotate(270deg)

.text
  color: var(--font-dark-blue-color)

.today
  opacity: 0.5
</style>
