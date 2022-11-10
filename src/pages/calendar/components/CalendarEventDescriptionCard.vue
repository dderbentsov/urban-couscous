<template lang="pug">
  .wrapper.px-4.pt-14px.pb-4.font-medium
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
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  width: 426px
  background-color: var(--default-white)
  border-radius: 4px
  color: var(--font-black-color)
  box-shadow: var(--default-shadow)
</style>
