<template lang="pug">
  .wrapper.flex.w-full.relative.mx-2
    clients-table(
      :open-form="openForm",
      :is-open-form="isOpenForm",
      :updated-clients="updatedClients",
      @reset-updated-clients="transmitReset",
      :url="url",
      :created-client-id="createdClientId"
    )
</template>

<script>
import ClientsTable from "@/pages/clients/components/ClientsTable";
export default {
  name: "ClientsWrapper",
  components: { ClientsTable },
  props: {
    openForm: Function,
    isOpenForm: Boolean,
    updatedClients: Boolean,
    url: String,
    createdClientId: String,
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
  border-top-right-radius: 4px
</style>
