<template lang="pug">
  .wrapper.cursor-pointer.my-1.relative(
    :style="themeColors",
    :class="cardTheme",
    ref="eventCard"
  )
    .card.flex.px-2(
      :class="{'py-6px flex-col': longCard}",
      :style="cardHeight",
      @click="openDescriptionCard"
    )
      .header.flex.justify-between.items-center(:class="{'items-start': longCard}")
        .header-text
          span.inline-block.align-middle.font-bold.text-base.mr-4 {{ eventTime }}
          span.inline-block.align-middle.font-medium.text-base {{ eventMember }}
        .details-count.flex.justify-center.items-center.text-xxs.font-medium(v-if="someDetailsShown") {{ `+${detailsCount}` }}
      .body.flex.text-xxs.font-medium(v-if="longCard")
        .col.mr-22px
          ul
            li.mt-2(v-for="elem in descriptionColumns.leftColumn" :key="elem") {{ elem }}
        .col
          ul
            li.mt-2(v-for="elem in descriptionColumns.rightColumn" :key="elem") {{ elem }}
    calendar-event-description-card(
      v-if="isOpenDescriptionCard"
      :owner-event="ownerEvent"
      :event-types="eventTypes"
      @selected-event="transmitEventData"
      @close-description-card="closeDescriptionCard"
      @delete-event="transmitDeleteEvent"
      :schedule-body-ref="scheduleBodyRef"
    )
  </template>

<script>
import CalendarEventDescriptionCard from "./CalendarEventDescriptionCard.vue";
export default {
  name: "CalendarEventCard",
  components: { CalendarEventDescriptionCard },
  props: {
    changeFormWasClosed: Boolean,
    ownerEvent: Object,
    eventTypes: {
      type: Array,
      default() {
        return [];
      },
    },
    scheduleBodyRef: Node,
  },
  data() {
    return {
      pixelsPerHour: 62,
      isActive: false,
      someDetailsShown: true,
      isOpenDescriptionCard: false,
    };
  },
  computed: {
    pixelsPerMinute() {
      return this.pixelsPerHour / 60;
    },
    eventTime() {
      return `${this.trimTime(this.ownerEvent.start)} - ${this.trimTime(
        this.ownerEvent.end
      )}`;
    },
    eventMember() {
      let membersArray = this.ownerEvent.members;
      if (membersArray.length > 1) {
        let primaryMember = membersArray.find(
          (elem) => elem.role === "primary"
        );
        return this.composeFullName(primaryMember.person);
      }
      return this.composeFullName(membersArray[0].person);
    },
    calculateCardHeight() {
      let startTime = this.trimTime(this.ownerEvent.start)
        .split(":")
        .map((elem) => parseInt(elem, 10));
      let endTime = this.trimTime(this.ownerEvent.end)
        .split(":")
        .map((elem) => parseInt(elem, 10));
      return (
        (endTime[0] * 60 + endTime[1] - (startTime[0] * 60 + startTime[1])) *
        this.pixelsPerMinute
      );
    },
    cardHeight() {
      return {
        height: `${this.calculateCardHeight - 8}px`,
      };
    },
    cardTheme() {
      return {
        "active-theme": this.isActive,
        "default-theme": !this.isActive,
        "long-card": this.longCard,
      };
    },
    themeColors() {
      switch (this.ownerEvent.kind) {
        case this.eventTypes[0].label:
          return {
            "--bg-color": "var(--bg-event-green-color-0)",
            "--bg-active": this.eventTypes[0].color,
            "--bg-hover": "var(--bg-event-green-color-1)",
            "--font-color": "var(--font-black-color)",
            "--font-active-color": "var(--default-white)",
            "--count-color": this.eventTypes[0].color,
          };
        case this.eventTypes[1].label:
          return {
            "--bg-color": "var(--bg-event-red-color-0)",
            "--bg-active": this.eventTypes[1].color,
            "--bg-hover": "var(--bg-event-red-color-1)",
            "--font-color": "var(--font-black-color)",
            "--font-active-color": "var(--default-white)",
            "--count-color": this.eventTypes[1].color,
          };
        case this.eventTypes[2].label:
          return {
            "--bg-color": "var(--bg-event-yellow-color-0)",
            "--bg-active": this.eventTypes[2].color,
            "--bg-hover": "var(--bg-event-yellow-color-1)",
            "--font-color": "var(--font-black-color)",
            "--font-active-color": "var(--font-black-color)",
            "--count-color": "var(--font-black-color)",
          };
        case this.eventTypes[3].label:
          return {
            "--bg-color": "var(--bg-event-blue-color-0)",
            "--bg-active": this.eventTypes[3].color,
            "--bg-hover": "var(--bg-event-blue-color-1)",
            "--font-color": "var(--font-black-color)",
            "--font-active-color": "var(--default-white)",
            "--count-color": this.eventTypes[3].color,
          };
        default:
          return {
            "--bg-color": "var(--default-white)",
            "--bg-active": "var(--btn-blue-color)",
            "--bg-hover": "var(--bg-event-default-hover-color)",
            "--font-color": "var(--font-black-color)",
            "--font-active-color": "var(--default-white)",
            "--border-color": "#b3c3f3",
            "--border-active-color": "var(--btn-blue-color)",
            "--count-color": "var(--btn-blue-color)",
          };
      }
    },
    description() {
      return this.ownerEvent.description
        ? this.ownerEvent.description.split(", ")
        : [];
    },
    descriptionColumns() {
      let leftCol = [],
        rightCol = [],
        heightParts = parseInt((this.calculateCardHeight - 8) / 23);
      if (this.ownerEvent.description && heightParts > 1) {
        let n = heightParts;
        for (let i = 0; i < n * 2 - 2; i++) {
          if (!this.description[i]) break;
          i % 2 === 0
            ? leftCol.push(this.description[i])
            : rightCol.push(this.description[i]);
        }
      }
      return {
        leftColumn: leftCol,
        rightColumn: rightCol,
      };
    },
    longCard() {
      return parseInt((this.calculateCardHeight - 8) / 23) > 1 ? true : false;
    },
    detailsCount() {
      let columnsLength =
          this.descriptionColumns.leftColumn.length +
          this.descriptionColumns.rightColumn.length,
        remainingDetails = this.description.length - columnsLength;
      if (!remainingDetails) this.changeDetailsShown();
      return remainingDetails;
    },
  },
  methods: {
    trimTime(time) {
      return time.slice(11, -4);
    },
    composeFullName(object) {
      return `${object.last_name} ${object.first_name} ${object.patronymic}`;
    },
    setActiveTheme() {
      this.isActive = true;
    },
    setDefaultTheme() {
      this.isActive = false;
    },
    changeDetailsShown() {
      this.someDetailsShown = false;
    },
    transmitEventData() {
      this.$emit("selected-event", this.ownerEvent);
      this.hideDescriptionCard();
    },
    transmitDeleteEvent() {
      this.$emit("delete-event", this.ownerEvent);
    },
    hideDescriptionCard() {
      this.isOpenDescriptionCard = false;
    },
    openDescriptionCard() {
      if (!this.isOpenDescriptionCard && !this.isActive) {
        this.isOpenDescriptionCard = true;
        this.setActiveTheme();
      }
    },
    closeDescriptionCard() {
      this.hideDescriptionCard();
      this.setDefaultTheme();
    },
  },
  watch: {
    changeFormWasClosed: {
      immediate: true,
      handler(newValue) {
        if (newValue === true) {
          this.setDefaultTheme();
          this.$emit("reset-change-form");
        }
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  position: absolute
  width: calc(100% - 8px)

.default-theme
  z-index: 2
  .card
    background-color: var(--bg-color)
    border: 2px solid var(--border-color)
    border-left: 4px solid var(--bg-active)
  .card:hover
      background-color: var(--bg-hover)
  .header-text, .body
    color: var(--font-color)
  .details-count
    background-color: var(--bg-active)
    color: var(--font-active-color)
  li:before
    background-color: var(--font-color)

.active-theme
  z-index: 3
  .card
    background-color: var(--bg-active)
    border: 2px solid var(--border-active-color)
    border-left: 4px solid var(--bg-active)
  .header-text, .body
    color: var(--font-active-color)
  .details-count
    background-color: var(--default-white)
    color: var(--count-color)
  li:before
    background-color: var(--font-active-color)

.card
  border-radius: 4px
  min-height: 23px

.header
  width: 100%

.details-count
  width: 24px
  height: 16px
  border-radius: 16px

.col
  max-width: calc(462px/2 - 22px)

ul
  list-style-type: none
  margin: 0
  padding: 0

li
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

li:before
  content: ''
  display: inline-block
  height: 8px
  width: 8px
  border-radius: 50%
  background-color : var(--font-black-color)
  margin-right: 4px
</style>
