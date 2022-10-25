<template lang="pug">
  .flex.box-border.px-4.items-center.gap-x-2.w-full(:style="{ minWidth : width + 'px' }")
    .dot.w-2.h-2(:style="{ backgroundColor : settings.settings.find((el) => el.priority == value).color }")
    span.text-sm(:style="{ color : settings.settings.find((el) => el.priority == value).color }") {{settings.settings.find((el) => el.priority == value).text}}
</template>

<script>
import { column } from "@/pages/clients/utils/tableConfig";
export default {
  name: "TableCellBodyPriority",
  props: ["value", "width"],
  data() {
    return {
      settings: column.find((el) => el.name === "priority"),
    };
  },
};
</script>

<style lang="sass" scoped>
.dot
  background-color: var(--font-grey-color)
  border-radius: 50%
</style>
