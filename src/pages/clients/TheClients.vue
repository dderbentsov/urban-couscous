<template lang="pug">
  clients-wrapper(
    :open-form="openForm",
    :is-open-form="isOpenForm",
    :current-year="currentYear"
  )
</template>

<script>
import ClientsWrapper from "@/pages/clients/components/ClientsWrapper";
export default {
  name: "TheClients",
  components: { ClientsWrapper },
  props: {
    openForm: Function,
    currentYear: Number,
    isOpenForm: Boolean,
  },
};
</script>
