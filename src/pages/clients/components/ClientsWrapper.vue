<template lang="pug">
  .wrapper.flex.w-full.relative.mx-6
    clients-table(
      :open-form-create="openFormCreateClient",
      @create-client="transmitOpenCreateForm",
      :is-close-header-form="isCloseHeaderForm"
    )
</template>

<script>
import ClientsTable from "@/pages/clients/components/ClientsTable";
export default {
  name: "ClientsWrapper",
  components: { ClientsTable },
  props: {
    isCloseHeaderForm: Boolean,
  },
  data() {
    return {
      isOpenForm: true,
    };
  },
  methods: {
    openFormCreateClient() {
      this.isOpenForm = true;
    },
    closeFormCreateClient() {
      this.isOpenForm = false;
    },
    transmitOpenCreateForm(value) {
      this.$emit("create-client", value);
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  overflow: auto
</style>
