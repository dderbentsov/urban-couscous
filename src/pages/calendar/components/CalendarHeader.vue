<template lang="pug">
  .calendar-header-wrapper.flex.items-center.justify-between.py-3.pl-5.pr-6
    .flex
      base-button.left-arrow.mr-4(left-icon="icon-down-arrow", rounded, secondary,
        :iconLeftSize="16", :size="32", @click="previousHandler")
      base-button.right-arrow.mr-6(left-icon="icon-down-arrow", rounded, secondary,
        :iconLeftSize="16", :size="32", @click="nextHandler")
      .text.flex.items-center
        span.font-medium.text-base {{ dateString }}
          span.today.font-bold.text-xxs(v-if="isCurrentDate")  Сегодня
    calendar-layout-switch(@selected="changeSelectedLayout")
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
import CalendarLayoutSwitch from "./CalendarLayoutSwitch.vue";
export default {
  name: "CalendarHeader",
  components: { CalendarLayoutSwitch, BaseButton },
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
  z-index: 10

.left-arrow
  padding: 3px 4px 0 4px !important
  transform: rotate(90deg)

.right-arrow
  padding: 3px 4px 0 4px !important
  transform: rotate(270deg)

.text
  color: var(--font-dark-blue-color)

.today
  opacity: 0.5
</style>
