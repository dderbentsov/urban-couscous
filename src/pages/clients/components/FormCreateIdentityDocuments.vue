<template lang="pug">
  .wrapper-documents.flex.flex-col.flex-auto.h-full.gap-y-8.justify-between
    .flex.flex-col.gap-y-6.px-4
      span.title-info.text-base.font-bold Паспортные данные
      .grid.grid-cols-2.gap-x-4.gap-y-6
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Серия и номер
          base-input.input-info(
            v-mask="'#### ######'",
            v-model:value="identityDocument.pass.series_number",
            placeholder="0000 000000",
            :width-input="277"
          )
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Кем выдан
          base-input.input-info(
            v-model:value="identityDocument.pass.issued_by_org",
            placeholder="Точно как в паспорте",
            :width-input="277"
          )
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Код подразделения
          base-input.input-info(
            v-mask="'###-###'",
            v-model:value="identityDocument.pass.issued_by_org_code",
            placeholder="000–000",
            :width-input="277"
          )
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Дата выдачи
          base-input-date.input-date(
            v-model:value="identityDocument.pass.issued_by_date",
            placeholder="Дата",
            :width-input="277"
          )
    .flex.flex-col.gap-y-6.px-4
      span.title-info.text-base.font-bold СНИЛС и ИНН
      .grid.grid-cols-2.gap-x-4.gap-y-6
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Номер СНИЛС
          base-input.input-info(
            v-mask="'###-###-### ##'",
            v-model:value="identityDocument.snils.numba",
            placeholder="000–000–000 00",
            :width-input="277"
          )
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm Номер ИНН
          base-input.input-info(
            v-mask="'############'",
            v-model:value="identityDocument.inn.numba",
            placeholder="000000000000",
            :width-input="277"
          )
    .px-4
      base-button(@click="saveClient" :size="40")
        span.font-semibold Создать клиента
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
import BaseInput from "@/components/base/BaseInput";
import BaseInputDate from "@/components/base/BaseInputDate";
import { mask } from "vue-the-mask";
export default {
  name: "FormCreateIdentityDocuments",
  components: { BaseInput, BaseInputDate, BaseButton },
  props: {
    identityDocument: Object,
    saveClient: Function,
  },
  directives: { mask },
};
</script>

<style lang="sass" scoped>
.wrapper-documents
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
.input-date
  border: 1.5px solid var(--border-light-grey-color)
</style>
