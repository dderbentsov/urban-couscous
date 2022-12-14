<template lang="pug">
  .base.flex.flex-col.gap-y-6
    .flex.flex-col.gap-y-6
      span.font-bold Паспортные данные
      .flex.flex-col.gap-y-4
        .flex.gap-x-4
          .flex.flex-col.gap-y-2
            .counter.font-semibold.text-smm Серия и номер
            base-input(:width-input="277", placeholder="0000 000000")
          .flex.flex-col.gap-y-2
            .counter.font-semibold.text-smm Дата выдачи
            base-input-date.input-date.h-10(:width-input="277")
        .flex.flex-col.gap-y-4
          .flex.flex-col.gap-y-2
            .counter.font-semibold.text-smm Кем выдан
            base-input(:width-input="277", placeholder="Точно как в паспорте")
          .flex.flex-col.gap-y-2
            .counter.font-semibold.text-smm Страховая оганизация
            base-input(:width-input="277", placeholder="Введите название организации")
    base-button(:size="40", @click="changeIdentityDoc")
      span.font-semibold Далее
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseInputDate from "@/components/base/BaseInputDate";
import BaseSelect from "@/components/base/BaseSelect";
import BaseButton from "@/components/base/BaseButton";
import { mask } from "vue-the-mask";

export default {
  name: "MedicalIdentityDocuments",
  components: { BaseInput, BaseInputDate, BaseSelect, BaseButton },
  directives: { mask },
  props: {
    changeIdentityDoc: Function,
  },
};
</script>

<style lang="sass" scoped>
.input-date
  border: 1.5px solid var(--border-light-grey-color)
  border-radius: 4px

.counter
  color: var(--font-grey-color)
</style>
