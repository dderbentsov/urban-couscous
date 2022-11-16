<template lang="pug">
  .wrapper.flex.w-full.relative.mx-6
    clients-table(:open-form="openForm")
</template>

<script>
import ClientsTable from "@/pages/clients/components/ClientsTable";
export default {
  name: "ClientsWrapper",
  components: { ClientsTable },
  props: {
    openForm: Function,
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  overflow: auto
</style>
