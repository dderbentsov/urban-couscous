<template lang="pug">
  .calendar-column-wrapper
    .header.flex.items-center.justify-between.py-2.px-6
      .flex.items-center
        img.avatar-wrapper.mr-2(:src="info.avatar" alt="Team member")
        span.member-name.font-medium.text-base.mr-6 {{ info.name }}
        img.icon-wrapper(src="@/assets/icons/lock.svg")
      base-doc-ok-button  
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
  data() {
    return {};
  },
};
</script>

<style lang="sass" scoped>
.calendar-column-wrapper
  width: 100%
  background-color: var(--default-white)

.header
  height: 48px

.avatar-wrapper
  width: 32px
  height: 32px

.icon-wrapper
  width: 24px
  height: 24px

.member-name
  color: var(--font-dark-blue-color)
</style>
