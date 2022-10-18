<template lang="pug">
  .wrapper-secondary.flex.flex-col.gap-y-8
    .flex.flex-col.gap-y-6
      span.title-info.text-base.font-bold Паспортные данные
      .grid.grid-cols-2.gap-x-4.gap-y-6
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Серия и номер
          base-input.input-info(v-model:value="secondaryInfo.pass.number" placeholder="0000 000000" :width-input="277")
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Кем и когда выдан
          base-input.input-info(v-model:value="secondaryInfo.pass.issuedBy" placeholder="Точно как в паспорте" :width-input="277")
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Код подразделения
          base-input.input-info(v-model:value="secondaryInfo.pass.divisionCode" placeholder="000–000" :width-input="277")
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Дата выдачи
          base-input.input-info(type="date" v-model:value="secondaryInfo.pass.dateIssue" placeholder="Дата" :width-input="277")
    .flex.flex-col.gap-y-6
      span.title-info.text-base.font-bold СНИЛС и ИНН
      .grid.grid-cols-2.gap-x-4.gap-y-6
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Номер СНИЛС
          base-input.input-info(v-model:value="secondaryInfo.snilsInn.snils" placeholder="000–000–000 00" :width-input="277")
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Номер ИНН
          base-input.input-info(v-model:value="secondaryInfo.snilsInn.inn" placeholder="000000000000" :width-input="277")
    .flex.flex-col.gap-y-6
      span.title-info.text-base.font-bold Даты
      .grid.grid-cols-2.gap-x-4.gap-y-6
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Дата рождения
          base-input.input-info(type="date" v-model:value="secondaryInfo.dates.birthday" placeholder="00,00,0000" :width-input="277")
    .flex.flex-col.gap-y-6
      span.title-info.text-base.font-bold Адреса
      .grid.grid-cols-2.gap-x-4.gap-y-6
        .flex.flex-col.col-start-1.col-end-3(class="gap-y-1.5")
          span.text-sm Адрес постоянной регистрации
          base-input.input-info(v-model:value="secondaryInfo.addresses.actualPlace" placeholder="Место регистрации  (в паспорте)")
        .flex.flex-col.col-start-1.col-end-3(class="gap-y-1.5")
          span.text-sm Адрес фактического проживания
          base-input.input-info(v-model:value="secondaryInfo.addresses.registrationPlace" placeholder="Место проживания на данный момент")
    base-create-button(text="Создать клиента" @click="saveClient")
</template>

<script>
import BaseCreateButton from "@/components/base/buttons/BaseCreateButton";
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "FormCreateSecondaryInfo",
  components: { BaseCreateButton, BaseInput },
  props: {
    secondaryInfo: Object,
    saveClient: Function,
  },
};
</script>

<style lang="sass" scoped>
.wrapper-secondary
  max-height: 443px
  overflow-y: auto
  flex: auto
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
