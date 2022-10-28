<template lang="pug">
  .calendar-background-wrapper.flex.flex-col(
    ref="backgroundWrapper"
    :style="backgroundExtendedWidth"
    )
    .body.flex.flex-col
      .line-wrapper
        .line.flex.items-center(
          v-for="hour in timeCoil"
          :key="hour"
          )
          .middle-line
</template>

<script>
export default {
  name: "CalendarBackground",
  props: {
    timeCoil: Array,
    filteredOwners: Array,
    eventsData: Array,
    currentDate: Object,
    sidebarWidth: String,
    dayStartTime: Number,
    dayEndTime: Number,
    ownersCount: Number,
  },
  data() {
    return {
      backgroundWidth: 0,
      columnWidth: 0,
      defaultColumnWidth: 470,
      pixelsPerHour: 62,
    };
  },
  computed: {
    ownersArrayLength() {
      return this.filteredOwners.length;
    },
    backgroundExtendedWidth() {
      if (this.ownersCount > 3) {
        return {
          width: `${this.defaultColumnWidth * this.ownersCount}px`,
        };
      }
      return {
        width: "100%",
      };
    },
    backgroundHeight() {
      return (this.timeCoil.length - 1) * this.pixelsPerHour + 48;
    },
    horizontalScrollPresence() {
      return {
        "scroll-x": this.ownersArrayLength > 3,
      };
    },
  },
  methods: {
    calculateColumnPosition(elemIndex) {
      let deductible = parseInt(this.sidebarWidth.slice(0, -2), 10) - 72;
      if (this.ownersArrayLength < 4) {
        this.columnWidth =
          (this.backgroundWidth - deductible) / this.ownersArrayLength;
        return {
          width: `${this.columnWidth}px`,
          height: `${this.backgroundHeight}px`,
          left: `${elemIndex * this.columnWidth}px`,
        };
      }
      return {
        width: `${this.defaultColumnWidth}px`,
        height: `${this.backgroundHeight}px`,
        left: `${elemIndex * this.defaultColumnWidth}px`,
      };
    },
    calculateBackgroundWidth() {
      this.backgroundWidth = this.$refs.backgroundWrapper.scrollWidth;
    },
  },
  mounted() {
    this.calculateBackgroundWidth();
  },
};
</script>

<style lang="sass" scoped>
.calendar-background-wrapper
  position: relative

.header-wrapper
  position: relative

.header
  height: 48px

.body
  position: relative

.line
  border-bottom: 1px solid var(--border-light-grey-color)
  height: 62px
  &:first-child
    height: 63px
    border-top: 1px solid var(--border-light-grey-color)
  &:last-child
    display: none

.middle-line
  border-top: 1px dashed var(--border-light-grey-color)
  width: 100%
</style>
