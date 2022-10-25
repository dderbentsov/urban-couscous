<template lang="pug">
  .flex.box-border.px-4.items-center.w-full(:style="{ minWidth : width + 'px' }")
    span.text-sm {{new Date().getFullYear() - new Date(value).getFullYear()}}
</template>

<script>
export default {
  name: "TableCellBodyAge",
  props: {
    value: String,
    width: Number,
  },
};
</script>
