<template lang="pug">
  .wrapper-addresses.flex.flex-col.flex-auto.h-full.gap-y-8.justify-between
    .flex.flex-col.gap-y-6.px-4
      span.title-info.text-base.font-bold Адреса
      .grid.grid-cols-2.gap-x-4.gap-y-6
        .flex.flex-col.col-start-1.col-end-3(class="gap-y-1.5")
          span.text-sm Адрес постоянной регистрации
          base-input.input-info(v-model:value="addresses.actualPlace" placeholder="Место регистрации  (в паспорте)")
        .flex.flex-col.col-start-1.col-end-3(class="gap-y-1.5")
          span.text-sm Адрес фактического проживания
          base-input.input-info(v-model:value="addresses.registrationPlace" placeholder="Место проживания на данный момент")
    .px-4
      base-create-button(text="Создать клиента" @click="saveClient")
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseCreateButton from "@/components/base/buttons/BaseCreateButton";
export default {
  name: "FormCreateAddresses",
  components: { BaseCreateButton, BaseInput },
  props: {
    addresses: Object,
    saveClient: Function,
    saveFile: Function,
  },
};
</script>

<style lang="sass" scoped>
.wrapper-addresses
  min-height: 443px
  max-height: 443px
  overflow-y: auto
  color: var(--font-grey-color)
  &::-webkit-scrollbar
    width: 4px
  &::-webkit-scrollbar-track
    background-color: rgba(211, 212, 220, 0.5)
    border-radius: 8px
  &::-webkit-scrollbar-thumb
    border-radius: 8px
    background-color: var(--btn-blue-color)
.input-info
  color: var(--font-dark-blue-color)
.title-info
  color: var(--font-dark-blue-color)
</style>
