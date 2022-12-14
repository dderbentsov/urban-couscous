<template lang="pug">
  clients-wrapper(
    :open-form="openForm",
    :is-open-form="isOpenForm",
    :updated-clients="updatedClients",
    @reset-updated-clients="transmitReset",
    :url="url",
    :created-client-id="createdClientId"
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
