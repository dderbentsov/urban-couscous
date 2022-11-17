<template lang="pug">
  .wrapper.flex.w-full.relative.mx-6
    clients-table(:open-form="openForm", :current-year="currentYear")
</template>

<script>
import ClientsTable from "@/pages/clients/components/ClientsTable";
export default {
  name: "ClientsWrapper",
  components: { ClientsTable },
  props: {
    openForm: Function,
    currentYear: Number,
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  overflow: auto
  border-top-left-radius: 4px
</style>
