<template lang="pug">
  .calendar-header-wrapper.flex.items-center.justify-between.py-3.pl-5.pr-6
    .flex
      base-arrow-button.left-arrow.mr-4(@click="previousHandler")
      base-arrow-button.right-arrow.mr-6(@click="nextHandler")
      .text.flex.items-center
        span.font-medium.text-base {{ dateString }}
          span.today.font-bold.text-xxs(v-if="isToday")  Сегодня
    calendar-layout-switch(@selected="changeSelectedLayout")
</template>

<script>
import * as moment from "moment/moment";
import BaseArrowButton from "@/components/base/buttons/BaseArrowButton.vue";
import CalendarLayoutSwitch from "./CalendarLayoutSwitch.vue";
export default {
  name: "CalendarHeader",
  components: { BaseArrowButton, CalendarLayoutSwitch },
  props: {
    currentDate: Object,
  },
  data() {
    return {
      isToday: true,
    };
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
  watch: {
    currentDate: function () {
      this.isToday =
        this.currentDate.format("DD.MM.YYYY") === moment().format("DD.MM.YYYY");
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

.left-arrow
  transform: rotate(90deg)

.right-arrow
  transform: rotate(270deg)

.text
  color: var(--font-dark-blue-color)

.today
  opacity: 0.5
</style>
