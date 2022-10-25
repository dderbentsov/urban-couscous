<template lang="pug">
  .flex.box-border.px-4.items-center.gap-x-3.w-full(:style="{ minWidth : width + 'px' }")
    .flex.avatar.justify-center.items-center
      span {{`${value[0][0]}${value[1][0]}`}}
    span.text-sm.font-semibold {{value.join(' ')}}
</template>

<script>
export default {
  name: "TableCellBodyName",
  props: {
    value: Array,
    width: Number,
    imgUrl: String,
  },
};
</script>

<style lang="sass" scoped>
.avatar
  width: 36px
  height: 36px
  border-radius: 50%
  background-color: var(--font-grey-color)
  color: var(--font-dark-blue-color)
</style>
