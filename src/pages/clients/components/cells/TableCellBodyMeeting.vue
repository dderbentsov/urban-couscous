<template lang="pug">
  .flex.box-border.px-4.items-center.gap-x-2.w-full(:style="{ minWidth : width + 'px' }")
    span.text-sm {{date}}
    span.time.text-xs {{time}}
</template>

<script>
export default {
  name: "TableCellBodyMeeting",
  props: {
    date: String,
    time: String,
    width: Number,
  },
};
</script>

<style lang="sass" scoped>
.time
  color: var(--font-grey-color)
</style>
