<template lang="pug">
  .wrapper.cursor-pointer.my-1(
    @click="transmitEventData",
    :style="themeColors",
    :class="cardTheme"
  )
    .card.flex.items-start.px-2(:style="cardHeight")
      .header.flex.justify-between.items-center
        .header-text
          span.inline-block.align-middle.font-bold.text-base.mr-4 {{ eventTime }}
          span.inline-block.align-middle.font-medium.text-base {{ eventMember }}
  </template>

<script>
export default {
  name: "CalendarEventCard",
  props: {
    ownerEvent: Object,
    eventTypes: Array,
  },
  data() {
    return {
      pixelsPerHour: 62,
      clicked: false,
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
        "active-theme": this.clicked,
        "default-theme": !this.clicked,
      };
    },
  },
  methods: {
    trimTime(time) {
      return time.slice(11, -4);
    },
    composeFullName(object) {
      return `${object.last_name} ${object.first_name} ${object.patronymic}`;
    },
    transmitEventData() {
      this.changeTheme();
      this.$emit("selected-event", this.ownerEvent);
    },
    changeTheme() {
      this.clicked = !this.clicked;
    },
    themeColors() {
      switch (this.ownerEvent.kind) {
        case this.eventTypes[0].label:
          return {
            "--bg-color": "var(--bg-event-green-color-0)",
            "--bg-active": this.eventTypes[0].color,
            "--bg-hover": "var(--bg-event-green-color-1)",
          };
        case this.eventTypes[1].label:
          return {
            "--bg-color": "var(--bg-event-red-color-0)",
            "--bg-active": this.eventTypes[1].color,
            "--bg-hover": "var(--bg-event-red-color-1)",
          };
        case this.eventTypes[2].label:
          return {
            "--bg-color": "var(--bg-event-yellow-color-0)",
            "--bg-active": this.eventTypes[2].color,
            "--bg-hover": "var(--bg-event-yellow-color-1)",
          };
        case this.eventTypes[3].label:
          return {
            "--bg-color": "var(--bg-event-blue-color-0)",
            "--bg-active": this.eventTypes[3].color,
            "--bg-hover": "var(--bg-event-blue-color-1)",
          };
        default:
          return {
            "--bg-color": "var(--default-white)",
            "--bg-active": "var(--btn-blue-color)",
            "--bg-hover": "var(--bg-event-default-hover-color)",
          };
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  position: absolute
  z-index: 3
  width: calc(100% - 8px)
  height: 23px

.default-theme
  .card
    background-color: var(--bg-color)
    border-left: 4px solid var(--bg-active)

.active-theme
  .card
    background-color: var(--bg-active)
    border-left: 4px solid var(--bg-active)

.card
  border-radius: 4px
  color: var(--font-black-color)
  &:hover
    background-color: var(--bg-hover)
    border-left: 4px solid var(--bg-active)
.header
  width: 100%
</style>
