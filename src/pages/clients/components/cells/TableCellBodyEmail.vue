<template lang="pug">
  .flex.box-border.px-4.items-center.w-full(:style="{ minWidth : width + 'px' }")
    span.text-sm {{value.some((el) => el.kind === "EMAIL")?value.find((el) => el.kind === "EMAIL").username:''}}
</template>

<script>
export default {
  name: "TableCellBodyEmail",
  props: {
    value: Array,
    width: Number,
  },
};
</script>
