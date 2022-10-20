<template lang="pug">
  .calendar-column-wrapper.flex.flex-col
    .header.flex.items-center.justify-between.py-2.px-6
      .flex.items-center
        img.avatar-wrapper.mr-2(src="@/assets/images/team-member.svg" alt="Team member")
        span.owner-name.font-medium.text-base.mr-6 {{ columnInformation }}
        img.icon-wrapper.cursor-pointer(src="@/assets/icons/lock.svg")
      base-doc-ok-button
    div
</template>

<script>
import BaseDocOkButton from "@/components/base/buttons/BaseDocOkButton.vue";
export default {
  name: "CalendarColumn",
  components: { BaseDocOkButton },
  props: {
    columnInformation: String,
  },
};
</script>

<style lang="sass" scoped>
.calendar-column-wrapper
  position: absolute
  border-right: 1px solid var(--border-light-grey-color)

.header
  height: 48px

.avatar-wrapper
  width: 32px
  height: 32px

.icon-wrapper
  width: 24px
  height: 24px

.owner-name
  color: var(--font-dark-blue-color)
</style>
