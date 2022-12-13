<template lang="pug">
  .base.flex.flex-col.gap-y-6
    .flex.flex-col.gap-y-6
      span.font-bold Основное
      .flex.flex-col.gap-y-4
        base-input.w-full(placeholder="ФИО*")
        .flex.gap-x-4
          .flex.flex-col.gap-y-2
            .counter.font-semibold.text-smm Дата рождения
            base-input-date.input-date.h-10(:width-input="277")
          .flex.flex-col.gap-y-2
            .counter.font-semibold.text-smm СНИЛС
            base-input(:width-input="277", placeholder="000–000–000 00")
        .flex.flex-col.gap-y-4
          .flex.flex-col.gap-y-2
            .counter.font-semibold.text-smm Адрес регистрации
            base-input(:width-input="277", placeholder="Введите полный адрес")
          .flex.flex-col.gap-y-2
            .counter.font-semibold.text-smm Фактический адрес места жительства
            base-input(:width-input="277", placeholder="Введите полный адрес")
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseInputDate from "@/components/base/BaseInputDate";
import BaseSelect from "@/components/base/BaseSelect";
export default {
  name: "MedicalBaseData",
  components: { BaseInput, BaseInputDate, BaseSelect },
};
</script>

<style lang="sass" scoped>
.input-date
  border: 1.5px solid var(--border-light-grey-color)
  border-radius: 4px

.counter
  color: var(--font-grey-color)
</style>
