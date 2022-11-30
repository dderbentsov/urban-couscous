<template lang="pug">
  clients-wrapper(
    :open-form="openForm",
    :is-open-form="isOpenForm",
    :updated-clients="updatedClients",
    @reset-updated-clients="transmitReset"
  )
</template>

<script>
import ClientsWrapper from "@/pages/clients/components/ClientsWrapper";
export default {
  name: "TheClients",
  components: { ClientsWrapper },
  props: {
    openForm: Function,
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
