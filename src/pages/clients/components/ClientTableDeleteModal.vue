<template lang="pug">
  .flex.flex-col.mb-1.mt-4
    span.font-medium.text-base.modal-text Вы действительно хотите удалить клиента?
    .flex.gap-x-3.mt-6.font-semibold
      base-button(
        outlined,
        :size=40,
        @click="closeModal"
      ) Отменить
      base-button(
        outlined-red,
        :size=40,
        @click="transmitDeleteClient"
      ) Удалить
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
export default {
  name: "ClientTableDeleteModal",
  components: {
    BaseButton,
  },
  props: {
    closeModal: Function,
    deletedClientId: String,
  },
  methods: {
    transmitDeleteClient() {
      this.$emit("delete-client", this.deletedClientId);
      this.closeModal();
    },
  },
};
</script>

<style lang="sass" scoped>
.modal-text
  color: var(--font-grey-color)

.card-container
  width: 420px
  height: 194px
  border-radius: 4px
  border: 1px solid var(--border-light-grey-color-1)
</style>
