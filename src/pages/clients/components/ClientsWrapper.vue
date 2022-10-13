<template lang="pug">
  .flex.w-full.mx-6
    clients-table
</template>

<script>
import ClientsTable from "@/pages/clients/components/ClientsTable";
export default {
  name: "ClientsWrapper",
  components: { ClientsTable },
};
</script>

<style lang="sass" scoped></style>
