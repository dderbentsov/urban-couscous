<template lang="pug">
  .flex.flex-col(
    :style="backgroundExtendedWidth"
    )
    .flex.flex-col
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
    ownersCount: Number,
  },
  data() {
    return {
      columnWidth: 0,
      defaultColumnWidth: 470,
      pixelsPerHour: 62,
    };
  },
  computed: {
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
  },
};
</script>

<style lang="sass" scoped>
.header
  height: 48px

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
