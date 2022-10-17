<template lang="pug">
  .calendar-column-wrapper.flex.flex-col
    .header.flex.items-center.justify-between.py-2.px-6
      .flex.items-center
        img.avatar-wrapper.mr-2(:src="info.avatar" alt="Team member")
        span.member-name.font-medium.text-base.mr-6 {{ info.name }}
        img.icon-wrapper.cursor-pointer(src="@/assets/icons/lock.svg")
      base-doc-ok-button
    .body.flex.flex-col
      span.block.time-indicator(v-if="isShownIndicator" :style="indicatorLocation")
      .line.flex.items-center(v-for="hour in hoursArray" :key="hour")
        .middle-line
</template>

<script>
import BaseDocOkButton from "@/components/base/buttons/BaseDocOkButton.vue";
export default {
  name: "CalendarColumn",
  components: { BaseDocOkButton },
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
    hoursArray: Array,
    currentTime: String,
  },
  data() {
    return {
      isShownIndicator: true,
    };
  },
  computed: {
    indicatorLocation() {
      return {
        top: `${this.calculateIndicatorLocation()}px`,
      };
    },
  },
  methods: {
    calculateIndicatorLocation() {
      let newTime = this.currentTime
        .split(":")
        .map((elem) => parseInt(elem, 10));
      let result = (newTime[0] - 8) * 62 + newTime[1] * 1.03;
      if (result > 620) {
        this.isShownIndicator = false;
        return 0;
      }
      return result;
    },
  },
};
</script>

<style lang="sass" scoped>
.calendar-column-wrapper
  width: 100%

.header
  height: 48px

.body
  position: relative

.avatar-wrapper
  width: 32px
  height: 32px

.icon-wrapper
  width: 24px
  height: 24px

.member-name
  color: var(--font-dark-blue-color)

.line
  border-bottom: 1px solid var(--border-light-grey-color)
  height: 62px
  &:nth-child(2)
    height: 63px
    border-top: 1px solid var(--border-light-grey-color)
  &:last-child
    display: none

.middle-line
  border-top: 1px dashed var(--border-light-grey-color)
  width: 100%

.time-indicator
  width: 100%
  border-top: 1px solid var(--time-indicator-color)
  position: absolute
</style>
