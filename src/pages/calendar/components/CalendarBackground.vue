<template lang="pug">
  .calendar-background-wrapper.flex.flex-col(
    ref="backgroundWrapper"
    :class="scrollPresence"
    )
    calendar-column(
      v-for="(owner, index) in filteredOwners"
      :key="owner.id"
      :owner-data="owner"
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
    eventsData: Array,
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
      return (this.hoursArray.length - 1) * this.pixelsPerHour + 48;
    },
    scrollPresence() {
      return {
        scroll: this.ownersArrayLength > 3,
      };
    },
    filteredOwners() {
      let filteredArray = [];
      let ownerAbsence = {
        id: null,
        last_name: null,
        first_name: null,
        patronymic: null,
      };
      this.eventsData.forEach(({ employees }) => {
        let findedElement = employees.find((elem) => elem.role === "owner");
        let emptyObjectPresence = this.findObjectInArray(
          filteredArray,
          ownerAbsence
        );
        if (!findedElement && !emptyObjectPresence) {
          filteredArray.push(ownerAbsence);
        }
        if (findedElement) {
          let ownerPresence = this.findObjectInArray(
            filteredArray,
            findedElement.employee
          );
          if (!ownerPresence) {
            filteredArray.push(findedElement.employee);
          }
        }
      });
      return filteredArray.sort(
        (previous, subsequent) => Boolean(subsequent.id) - Boolean(previous.id)
      );
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
    findObjectInArray(array, object) {
      return array.find(
        (item) => JSON.stringify(item) === JSON.stringify(object)
      );
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
