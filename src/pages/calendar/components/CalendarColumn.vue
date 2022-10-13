<template lang="pug">
  .calendar-column-wrapper.flex.flex-col
    .header.flex.items-center.justify-between.py-2.px-6
      .flex.items-center
        img.avatar-wrapper.mr-2(:src="info.avatar" alt="Team member")
        span.member-name.font-medium.text-base.mr-6 {{ info.name }}
        img.icon-wrapper.cursor-pointer(src="@/assets/icons/lock.svg")
      base-doc-ok-button
    .body.flex.flex-col
      .line.flex.items-center(v-for="hour in 10" :key="hour")
        .middle-line
</template>

<script>
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

.middle-line
  border-top: 1px dashed var(--border-light-grey-color)
  width: 100%
</style>
