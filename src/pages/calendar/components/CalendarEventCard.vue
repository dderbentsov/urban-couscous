<template lang="pug">
  .wrapper.flex.px-2.my-1.items-start.cursor-pointer(:style="cardHeight")
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
  },
  data() {
    return {
      pixelsPerHour: 62,
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
  },
  methods: {
    trimTime(time) {
      return time.slice(11, -4);
    },
    composeFullName(object) {
      return `${object.last_name} ${object.first_name} ${object.patronymic}`;
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  width: calc(100% - 8px)
  height: 23px
  border-radius: 4px
  background-color: var(--bg-event-yellow-color)
  color: var(--font-black-color)
  position: absolute
  z-index: 3

.header
  width: 100%
</style>
