<template lang="pug">
  clients-wrapper(@create-client="transmitOpenCreateForm", :is-close-header-form="isCloseHeaderForm")
</template>

<script>
import ClientsWrapper from "@/pages/clients/components/ClientsWrapper";
export default {
  name: "TheClients",
  components: { ClientsWrapper },
  props: {
    isCloseHeaderForm: Boolean,
  },
  methods: {
    transmitOpenCreateForm(value) {
      this.$emit("create-client", value);
    },
  },
};
</script>
