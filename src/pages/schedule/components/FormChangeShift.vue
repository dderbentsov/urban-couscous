<template lang="pug">
  .flex.flex-col.gap-y-6.pt-6.pb-7.px-8.event-form.fixed.right-6.bottom-6(
    v-click-outside="closeForm"
  )
    .flex.justify-between
      span.title.text-xl.font-bold Замена смен
      .flex.pt-2
        .icon-cancel.close-icon.tesxt-xs.cursor-pointer(@click="closeForm")
    .flex.flex-col.gap-y-6
      .flex.flex-col.gap-y-2
        span.text-smm.font-semibold Дата
        base-input-date.input-date
      .flex.flex-col(class="gap-y-1.5")
        span.text-smm.font-semibold Текущий сотрудник
        base-custom-select.h-10(v-model="currentEmployee")
      .flex.flex-col(class="gap-y-1.5")
        span.text-smm.font-semibold Замена сотрдника
        base-custom-select.h-10(v-model="currentEmployee")
      .time-wrapper.flex.justify-center
        .flex.flex-col.py-14px.px-4.gap-y-14px.items-center
          .text-xxs.opacity-40.font-bold Начало
          base-input-time.item-input.text-base.select(:width-input="40")
        .flex.flex-col.py-14px.px-4.gap-y-14px.items-center
          .text-xxs.opacity-40.font-bold Конец
          base-input-time.item-input.text-base.select(:width-input="40")
      .flex.justify-center
        base-button.font-semibold(:size="40") Сохранить
</template>

<script>
import BaseCustomSelect from "@/components/base/BaseCustomSelect.vue";
import BaseInputDate from "@/components/base/BaseInputDate.vue";
import BaseInputTime from "@/components/base/BaseInputTime.vue";
import BaseButton from "@/components/base/BaseButton.vue";

export default {
  name: "FormChangeShift",
  components: { BaseCustomSelect, BaseInputDate, BaseInputTime, BaseButton },
  props: { closeForm: Function },
  data() {
    return {
      currentEmployee: { label: "", id: null },
    };
  },
};
</script>

<style lang="sass" scoped>
.event-form
  height: fit-content
  width: 534px
  background-color: var(--default-white)
  box-shadow: var(--default-shadow)
  border-radius: 4px
  z-index: 5

.select
  height: 40px
  border: 1.5px solid var(--border-light-grey-color)
  border-radius: 4px

.input-date
  border: 1.5px solid var(--border-light-grey-color)
</style>
