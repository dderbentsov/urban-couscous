<template lang="pug">
  .wrapper.px-4.pt-14px.pb-4.font-medium.cursor-auto(
    :style="{...typeColor, ...position, ...constantWidth}",
    v-click-outside="close",
    :class="{'shadow': !disabled}",
    ref="descriptionCard"
  )
    .flex.justify-between.items-center.mb-2
      .flex
        span.inline-block.font-bold.text-base.mr-3.mt-2px {{ eventTime }}
        .type.text-xs.font-medium.flex.items-center.justify-center.px-14px(v-if="isCertainType")
          span.type-text {{ status }}
      .right-side.flex.gap-x-4.text-sm(v-if="!disabled")
        .icon-basket.flex.items-center.cursor-pointer(@click="transmitDeleteEvent")
        .icon-edit.flex.items-center.cursor-pointer(@click="transmitEventData")
        .icon-cancel.text-xxs.flex.items-center.cursor-pointer(@click="close")
    .body.mr-6
      span.text-base  {{ eventMember }}
      .flex.text-xxs.justify-between(
        v-if="!disabled",
        :class="{'mt-4': description.length > 0}"
        )
        .column
          ul
            li(v-for="elem in description" :key="elem") {{ elem }}
</template>

<script>
import { statusesDictionary } from "../utils/statusesDictionary.js";
export default {
  name: "CalendarEventDescriptionCard",
  props: {
    ownerEvent: Object,
    eventStatuses: {
      type: Array,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    scheduleBodyRef: Node,
  },
  data() {
    return {
      isCertainType: true,
      position: {},
    };
  },
  computed: {
    status() {
      return this.ownerEvent.status
        ? statusesDictionary[this.ownerEvent.status]
        : "";
    },
    typeColor() {
      switch (this.ownerEvent.status) {
        case this.eventStatuses[1].value:
          return {
            "--bg-color": "var(--bg-event-grey-color-0)",
            "--font-color": this.eventStatuses[1].color,
          };
        case this.eventStatuses[2].value:
          return {
            "--bg-color": "var(--bg-event-yellow-color-0)",
            "--font-color": "var(--font-black-color)",
          };
        case this.eventStatuses[3].value:
          return {
            "--bg-color": "var(--bg-event-orange-color-0)",
            "--font-color": "var(--font-black-color)",
          };
        case this.eventStatuses[4].value:
          return {
            "--bg-color": "var(--bg-event-blue-color-0)",
            "--font-color": this.eventStatuses[4].color,
          };
        case this.eventStatuses[5].value:
          return {
            "--bg-color": "var(--bg-event-green-color-0)",
            "--font-color": this.eventStatuses[5].color,
          };
        case this.eventStatuses[6].value:
          return {
            "--bg-color": "var(--bg-event-red-color-0)",
            "--font-color": this.eventStatuses[6].color,
          };
        default:
          return {
            "--bg-color": "var(--bg-event-default-hover-color)",
            "--font-color": "var(--btn-blue-color)",
          };
      }
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
    description() {
      return this.ownerEvent.description
        ? this.ownerEvent.description.split(", ")
        : [];
    },
    constantWidth() {
      if (!this.disabled) {
        return {
          width: "426px !important",
        };
      }
      return "";
    },
  },
  methods: {
    changeType() {
      this.isCertainType = false;
    },
    transmitEventData() {
      this.$emit("selected-event");
    },
    transmitDeleteEvent() {
      this.$emit("delete-event");
    },
    close() {
      if (!this.disabled) this.$emit("close-description-card");
    },
    trimTime(time) {
      return time.slice(11, -4);
    },
    composeFullName(object) {
      return `${object.last_name} ${object.first_name} ${object.patronymic}`;
    },
  },
  mounted() {
    if (!this.$refs.descriptionCard || !this.scheduleBodyRef) return;
    const cardRect = this.$refs.descriptionCard.getBoundingClientRect();
    const bodyRect = this.scheduleBodyRef.getBoundingClientRect();
    const bodyHeight = this.scheduleBodyRef.clientHeight + bodyRect.y - 20;
    if (cardRect.y + cardRect.height > bodyHeight) {
      this.position = {
        top: `-${cardRect.height + 8}px`,
      };
    } else
      this.position = {
        "margin-top": "8px",
      };
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  height: auto !important
  background-color: var(--default-white)
  color: var(--font-dark-blue-color)

.shadow
  border-radius: 4px
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
