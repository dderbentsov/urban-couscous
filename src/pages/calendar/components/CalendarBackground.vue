<template lang="pug">
  .calendar-background-wrapper.flex.flex-col(
    ref="backgroundWrapper"
    :class="addScroll"
    )
    calendar-column(
      v-for="(owner, index) in columnInformation.owners"
      :key="owner"
      :column-information="owner"
      :style="calculateColumnPosition(index)"
      )
    .header(:style="backgroundExtendedWidth")
    .body.flex.flex-col(
      :style="backgroundExtendedWidth"
      )
      .line-wrapper
        .line.flex.items-center(
          v-for="hour in hoursArray"
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
    hoursArray: Array,
    columnInformation: Object,
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
      return this.columnInformation.owners.length;
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
      return (this.hoursArray.length - 1) * this.pixelsPerHour + 48;
    },
    addScroll() {
      return {
        scroll: this.ownersArrayLength > 3,
      };
    },
  },
  methods: {
    calculateColumnPosition(elemIndex) {
      if (this.ownersArrayLength < 4) {
        this.columnWidth = this.backgroundWidth / this.ownersArrayLength;
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
      this.backgroundWidth = this.$refs.backgroundWrapper.offsetWidth;
    },
  },
  mounted() {
    this.calculateBackgroundWidth();
  },
};
</script>

<style lang="sass" scoped>
.scroll
  overflow-x: scroll

.calendar-background-wrapper
  width: 100%
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
