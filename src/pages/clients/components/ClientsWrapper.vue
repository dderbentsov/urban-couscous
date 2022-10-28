<template lang="pug">
  .wrapper.flex.w-full.relative.mx-6
    clients-table(:open-form-create="openFormCreateClient")
</template>

<script>
import ClientsFormCreate from "@/pages/clients/components/ClientsFormCreate";
import ClientsTable from "@/pages/clients/components/ClientsTable";
export default {
  name: "ClientsWrapper",
  components: { ClientsTable, ClientsFormCreate },
  data() {
    return {
      isOpenForm: false,
    };
  },
  methods: {
    openFormCreateClient() {
      this.isOpenForm = true;
    },
    closeFormCreateClient() {
      this.isOpenForm = false;
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  overflow: auto
</style>
