<template lang="pug">
  .flex.row.text-base.font-semibold.min-w-fit
    clients-table-cell-header(v-for="cell in columnHead" :title="cell.title" :width="cell.width" :class="!cell.title && 'px-3'")
      .icon-down-arrow.icon.text-xsm.cursor-pointer(v-if="cell.iconHead && cell.name !== 'fullName'" )
      .icon-sort-number.cursor-pointer.text-xs.icon(v-if="cell.iconHead && cell.name === 'fullName'")
      clients-table-checkbox(v-if="cell.name === 'checkbox'" :id="cell.name" :check="check" :is-check="isCheck")
</template>

<script>
import { column } from "@/pages/clients/utils/tableConfig";
import ClientsTableCellHeader from "@/pages/clients/components/cells/ClientsTableCellHeader";
import ClientsTableCheckbox from "@/pages/clients/components/ClientsTableCheckbox";
export default {
  name: "ClientsTableHead",
  components: { ClientsTableCheckbox, ClientsTableCellHeader },
  props: {
    check: Function,
    isCheck: Boolean,
  },
  data() {
    return {
      columnHead: column,
    };
  },
};
</script>

<style lang="sass" scoped>
.row
  min-height: 36px
  color: var(--font-grey-color)
  border-bottom: 1px solid var(--border-light-grey-color)
.icon
  color: var(--font-dark-blue-color)
</style>
