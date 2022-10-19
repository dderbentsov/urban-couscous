<template lang="pug">
  .flex.box-border.px-4.items-center.w-full(:style="{ minWidth : width + 'px' }")
    .w-5.h-5(v-for="network in networks")
</template>

<script>
export default {
  name: "TableCellBodyNetworks",
  props: {
    networks: Array,
    width: Number,
  },
};
</script>
