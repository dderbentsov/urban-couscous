<template lang="pug">
  .flex.box-border.px-4.items-center.gap-x-2.w-full(:style="{ minWidth : width + 'px' }")
    .dot.w-2.h-2
    span.text-sm(:style="{ color : color }") {{value}}
</template>

<script>
export default {
  name: "TableCellBodyPriority",
  props: {
    value: String,
    width: Number,
    color: {
      default: "#9294A7",
    },
  },
};
</script>

<style lang="sass" scoped>
.dot
  background-color: var(--font-grey-color)
  border-radius: 50%
</style>
