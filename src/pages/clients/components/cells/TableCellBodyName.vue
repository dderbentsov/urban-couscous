<template lang="pug">
  .flex.box-border.px-4.items-center.gap-x-3.w-full(:style="{ minWidth : width + 'px' }")
    img(v-if="imgUrl" :src="imgUrl" alt="Avatar")
    span.text-sm.font-semibold {{value}}
</template>

<script>
export default {
  name: "TableCellBodyName",
  props: {
    value: String,
    width: Number,
    imgUrl: String,
  },
};
</script>
