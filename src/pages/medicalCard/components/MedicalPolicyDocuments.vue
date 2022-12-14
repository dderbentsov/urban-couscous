<template lang="pug">
  .base.flex.flex-col.gap-y-6
    .flex.gap-x-4
      .flex.flex-col.gap-y-6
        span.font-bold Полис
        .flex.gap-x-4
          .flex.flex-col.gap-y-2
            .counter.font-semibold.text-smm Серия и номер полиса ОМС
            base-input(:width-input="277", placeholder="0000 000000")
          .flex.flex-col.gap-y-2
            .counter.font-semibold.text-smm Серия и номер полиса ДМС
            base-input(:width-input="277", placeholder="0000 000000")
    .flex.flex-col.gap-y-2
      .counter.font-semibold.text-smm Код категории льготы
      base-input(:width-input="277", placeholder="000")
    .flex.flex-col.gap-y-4
      .flex.flex-col.gap-y-2
        .counter.font-semibold.text-smm К кому обращаться в случае необходимости 
        base-input.w-full(placeholder="ФИО*")
      .flex.flex-col.gap-y-2
        .counter.font-semibold.text-smm Номер телефона
        base-input(
          :width-input="277",
          placeholder="+7 (915) 644–92–23"
        )
    base-button(:size="40")
      span.font-semibold Создать медицинскую карту
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseInputDate from "@/components/base/BaseInputDate";
import BaseSelect from "@/components/base/BaseSelect";
import BaseButton from "@/components/base/BaseButton";
import { mask } from "vue-the-mask";

export default {
  name: "MedicalPolicyDocuments",
  components: { BaseInput, BaseInputDate, BaseSelect, BaseButton },
  directives: { mask },
};
</script>

<style lang="sass" scoped>
.input-date
  border: 1.5px solid var(--border-light-grey-color)
  border-radius: 4px

.counter
  color: var(--font-grey-color)
</style>
