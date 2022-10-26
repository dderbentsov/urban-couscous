<template lang="pug">
  .calendar-background-wrapper.flex.flex-col(
    ref="backgroundWrapper"
    :class="horizontalScrollPresence"
    )
    .header-wrapper
      .header(:style="backgroundExtendedWidth")
    calendar-column(
      v-for="(owner, index) in filteredOwners"
      :key="owner.id"
      :owner-data="owner"
      :style="calculateColumnPosition(index)"
      :day-events="filterEventsByOwner(owner)"
      :day-start-time="dayStartTime"
      :day-end-time="dayEndTime"
      )
    .body.flex.flex-col(
      :style="backgroundExtendedWidth"
      )
      .line-wrapper
        .line.flex.items-center(
          v-for="hour in timeCoil"
          :key="hour"
          )
          .middle-line
</template>

<script>
import CalendarColumn from "./CalendarColumn.vue";
export default {
  name: "CalendarBackground",
  components: { CalendarColumn },
  props: {
    timeCoil: Array,
    filteredOwners: Array,
    eventsData: Array,
    currentDate: Object,
    sidebarWidth: String,
    dayStartTime: Number,
    dayEndTime: Number,
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
      if (this.ownersArrayLength > 3) {
        return {
          width: `${this.defaultColumnWidth * this.ownersArrayLength}px`,
        };
      }
      return {
        width: "auto",
      };
    },
    backgroundHeight() {
      return (this.timeCoil.length - 1) * this.pixelsPerHour + 48;
    },
    filteredEventsByDate() {
      return this.eventsData.filter(
        ({ start }) =>
          start.slice(0, 10) === this.currentDate.format("YYYY-MM-DD")
      );
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
    filterEventsByOwner(owner) {
      let filteredArray = [];
      this.filteredEventsByDate.forEach((item) => {
        let foundEvent = item.employees.find(
          (elem) =>
            JSON.stringify(elem.employee) === JSON.stringify(owner) &&
            elem.role === "owner"
        );
        if (foundEvent) filteredArray.push(item);
      });
      return filteredArray;
    },
  },
  mounted() {
    this.calculateBackgroundWidth();
  },
};
</script>

<style lang="sass" scoped>
.scroll-x
  overflow-x: auto

.calendar-background-wrapper
  width: 100%
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
