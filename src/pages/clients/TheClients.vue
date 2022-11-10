<template lang="pug">
  clients-wrapper(@is-open-client-add-form="transmitPageFormState")
</template>

<script>
import ClientsWrapper from "@/pages/clients/components/ClientsWrapper";
export default {
  name: "TheClients",
  components: { ClientsWrapper },
  methods: {
    transmitPageFormState(value) {
      this.$emit("is-open-page-form", value);
    },
  },
};
</script>
