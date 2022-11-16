<template lang="pug">
  clients-wrapper(:open-form="openForm")
</template>

<script>
import ClientsWrapper from "@/pages/clients/components/ClientsWrapper";
export default {
  name: "TheClients",
  components: { ClientsWrapper },
  props: {
    openForm: Function,
  },
};
</script>
