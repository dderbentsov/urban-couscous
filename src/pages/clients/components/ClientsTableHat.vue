<template lang="pug">
  .flex.justify-between.w-full.h-fit
    .flex.gap-2.w-fit.h-fit
      .input
        base-input(:with-icon="true")
      button.filter-button.flex.items-center.justify-center.box-border(class="px-2.5")
        .icon-filter.text-xl.leading-4
    clients-table-header-actions(v-if="!!isOpenActions" :is-selected-one="isOpenActions===1")
    .flex.w-fit.h-fit.gap-x-2
      bass-export-button(:only-icon="true")
      base-create-button(@click="openFormCreate" :with-icon="true")

</template>

<script>
import ClientsTableHeaderActions from "@/pages/clients/components/ClientsTableHeaderActions";
import BaseCreateButton from "@/components/base/buttons/BaseCreateButton";
import BassExportButton from "@/components/base/buttons/BassExportButton";
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "ClientsTableHat",
  components: {
    BaseInput,
    BassExportButton,
    BaseCreateButton,
    ClientsTableHeaderActions,
  },
  props: {
    openFormCreate: Function,
    isOpenActions: Number,
  },
};
</script>

<style lang="sass" scoped>
.input
  width: 280px
  height: fit-content
.filter-button
  border-radius: 4px
  border: 2px solid var(--border-light-grey-color)
</style>
