<template lang="pug">
  .wrapper.px-4.pt-14px.pb-4.font-medium.cursor-auto(
    :style="typeColor",
    v-click-outside="close"
  )
    .flex.justify-between.items-center.mb-2
      .flex
        span.inline-block.font-bold.text-base.mr-3.mt-2px {{ eventTime }}
        .type.text-xxs.px-14px.py-1(v-if="isCertainType")
          span.type-text {{ ownerEvent.kind }}
      .right-side.flex.gap-x-4.text-sm
        .icon-basket.flex.items-center.cursor-pointer
        .icon-edit.flex.items-center.cursor-pointer(@click="transmitEventData")
        .icon-cancel.text-xxs.flex.items-center.cursor-pointer(@click="close")
    .body.mr-6
      span.text-base  {{ eventMember }}
      .flex.text-xxs.mt-4.justify-between
        .column
          ul
            li(v-for="elem in description" :key="elem") {{ elem }}
</template>

<script>
export default {
  name: "CalendarEventDescriptionCard",
  props: {
    ownerEvent: Object,
    eventTypes: {
      type: Array,
      default() {
        return [];
      },
    },
    eventTime: {
      type: String,
      default: "",
    },
    eventMember: {
      type: String,
      default: "",
    },
    description: Array,
  },
  data() {
    return {
      isCertainType: true,
    };
  },
  computed: {
    typeColor() {
      switch (this.ownerEvent.kind) {
        case this.eventTypes[0].label:
          return {
            "--bg-color": "var(--bg-event-green-color-0)",
            "--font-color": this.eventTypes[0].color,
          };
        case this.eventTypes[1].label:
          return {
            "--bg-color": "var(--bg-event-red-color-0)",
            "--font-color": this.eventTypes[1].color,
          };
        case this.eventTypes[2].label:
          return {
            "--bg-color": "var(--bg-event-yellow-color-0)",
            "--font-color": "var(--font-black-color)",
          };
        case this.eventTypes[3].label:
          return {
            "--bg-color": "var(--bg-event-blue-color-0)",
            "--font-color": this.eventTypes[3].color,
          };
        default:
          this.changeType();
          return {};
      }
    },
  },
  methods: {
    changeType() {
      this.isCertainType = false;
    },
    transmitEventData() {
      this.$emit("selected-event");
    },
    close() {
      this.$emit("close-description-card");
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  height: auto !important
  background-color: var(--default-white)
  border-radius: 4px
  color: var(--font-black-color)
  box-shadow: var(--default-shadow)

.type
  background-color: var(--bg-color)
  border-radius: 4px

.type-text
  color: var(--font-color)

.right-side
  height: 16px
  color: var(--btn-blue-color)

.icon-basket
  color: var(--border-red-color)

.column
  max-width: calc(462px/2 - 36px)

ul
  list-style-type: none
  margin: 0
  padding: 0

li
  margin-bottom: 8px
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  &:last-child
    margin: 0px

li:before
  content: ''
  display: inline-block
  height: 6px
  width: 6px
  border-radius: 50%
  background-color: var(--font-black-color)
  margin: 0 8px 1px 0
</style>
