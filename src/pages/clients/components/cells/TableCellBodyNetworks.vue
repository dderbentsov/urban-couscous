<template lang="pug">
  .network-cell.flex.box-border.px-4.items-center.w-full(:style="{ minWidth : width + 'px' }")
    .text-xl.icon(v-for="network in networks.filter((el) => el.kind !== 'EMAIL' && el.kind !== 'PHONE')" :id="network.id" :class="settings.settings.find((el) => el.network === network.kind).icon")
</template>

<script>
import { column } from "@/pages/clients/utils/tableConfig";
export default {
  name: "TableCellBodyNetworks",
  props: {
    networks: Array,
    width: Number,
  },
  data() {
    return {
      settings: column.find((el) => el.name === "networks"),
    };
  },
};
</script>

<style lang="sass" scoped>
.network-cell
  column-gap: 2px
.icon
  color: var(--btn-blue-color)
</style>
