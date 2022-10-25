<template lang="pug">
  .flex.box-border.px-4.items-center.w-full(:style="{ minWidth : width + 'px' }")
    span.text-sm {{value.some((el) => el.kind === "PHONE")?value.find((el) => el.kind === "PHONE").username:''}}
</template>

<script>
export default {
  name: "TableCellBodyPhone",
  props: {
    value: Array,
    width: Number,
  },
};
</script>
