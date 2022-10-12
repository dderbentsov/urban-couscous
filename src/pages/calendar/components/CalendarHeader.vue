<template lang="pug">
  .calendar-header-wrapper.flex.items-center.justify-between.ml-2.py-3.pl-5.pr-6
    .right-side.flex
      base-arrow-button.left-arrow.mr-4
      base-arrow-button.right-arrow.mr-6
      .text.flex.items-center
        span.font-medium.text-base 24 Мая 2022 
          span.today.font-bold.text-xxs(v-if="isToday") Сегодня
</template>

<script>
import BaseArrowButton from "@/components/base/buttons/BaseArrowButton.vue";
export default {
  name: "CalendarHeader",
  components: { BaseArrowButton },
  data() {
    return {
      isToday: true,
    };
  },
  computed: {},
};
</script>

<style lang="sass">
.calendar-header-wrapper
  width: 100%
  background-color: var(--bg-white-color)
  height: 56px
  border-radius: 4px

.right-side

.left-arrow
  transform: rotate(90deg)
.right-arrow
  transform: rotate(270deg)

.text
  color: var(--font-dark-blue-color)

.today
  opacity: 0.5
</style>
