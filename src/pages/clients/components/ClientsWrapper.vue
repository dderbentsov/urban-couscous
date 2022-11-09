<template lang="pug">
  .wrapper.flex.w-full.relative.mx-6
    clients-table(@is-open-client-add-form="transmitPageFormState")
</template>

<script>
import ClientsTable from "@/pages/clients/components/ClientsTable";
export default {
  name: "ClientsWrapper",
  components: { ClientsTable },
  data() {
    return {
      isOpenForm: false,
    };
  },
  methods: {
    transmitPageFormState(value) {
      this.$emit("is-open-client-add-form", value);
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  overflow: auto
</style>
