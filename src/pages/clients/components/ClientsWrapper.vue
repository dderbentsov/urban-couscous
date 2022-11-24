<template lang="pug">
  .wrapper.flex.w-full.relative.mx-2
    clients-table(
      :open-form="openForm",
      :is-open-form="isOpenForm",
      :current-year="currentYear",
      :updated-clients="updatedClients",
      @reset-updated-clients="transmitReset"
    )
</template>

<script>
import ClientsTable from "@/pages/clients/components/ClientsTable";
export default {
  name: "ClientsWrapper",
  components: { ClientsTable },
  props: {
    openForm: Function,
    currentYear: Number,
    isOpenForm: Boolean,
    updatedClients: Boolean,
  },
  methods: {
    transmitReset() {
      this.$emit("reset-updated-clients");
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  overflow: auto
  border-top-left-radius: 4px
</style>
