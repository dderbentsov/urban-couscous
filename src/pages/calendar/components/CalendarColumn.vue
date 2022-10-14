<template lang="pug">
  .calendar-column-wrapper.flex.flex-col(@click="updateTime")
    .header.flex.items-center.justify-between.py-2.px-6
      .flex.items-center
        img.avatar-wrapper.mr-2(:src="info.avatar" alt="Team member")
        span.member-name.font-medium.text-base.mr-6 {{ info.name }}
        img.icon-wrapper.cursor-pointer(src="@/assets/icons/lock.svg")
      base-doc-ok-button
    .body.flex.flex-col
      .line.flex.items-center(v-for="hour in hourArray" :key="hour")
        span.self-start {{ hour}}
        .middle-line
</template>

<script>
import * as moment from "moment/moment";
import BaseDocOkButton from "@/components/base/buttons/BaseDocOkButton.vue";
export default {
  name: "CalendarColumn",
  components: { BaseDocOkButton },
  props: {
    info: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      currtentTime: "",
      hourArray: [
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
      ],
    };
  },
  methods: {
    updateTime() {
      setInterval(this.changeCurrentTime, 30000);
    },
    changeCurrentTime() {
      this.currtentTime = moment().format("h:mm:ss");
      console.log(this.currtentTime);
    },
  },
};
</script>

<style lang="sass" scoped>
.calendar-column-wrapper
  width: 100%
  background-color: var(--default-white)

.header
  height: 48px
  border-bottom: 1px solid var(--border-light-grey-color)

.avatar-wrapper
  width: 32px
  height: 32px

.icon-wrapper
  width: 24px
  height: 24px

.member-name
  color: var(--font-dark-blue-color)

.line
  border-bottom: 1px solid var(--border-light-grey-color)
  height: 62px
  &:last-child
    display: none

.middle-line
  border-top: 1px dashed var(--border-light-grey-color)
  width: 100%
</style>
