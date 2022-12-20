<template lang="pug">
  .wrapper-bar.flex.flex-col.gap-y-4
    .flex.px-5.py-5.w-full.justify-around
      .time-wrapper.flex.justify-between
        .flex.flex-col.py-14px.px-4.gap-y-14px
          .text.text-smm Начало рабочего дня
          base-input-time.item-input.text-base.select(:width-input="40")
        .flex.flex-col.py-14px.px-4.gap-y-14px
          .text.span.text-smm Конец рабочего дня
          base-input-time.item-input.text-base.select(:width-input="40")
      .status-wrapper.flex.flex-col
        .flex.justify-center.items-center.h-10
          span.font-semibold Статусы
        .flex.justify-around(class="py-2.5")
          base-button.button-work.font-semibold(
            :style="{minWidth: '190px', minHeight: '43px'}"
          ) Работает
          base-button.button-status.font-semibold(
            :style="{minWidth: '190px', minHeight: '43px'}"
          ) Отпуск/больничный
          base-button.button-free.font-semibold(
            :style="{minWidth: '190px', minHeight: '43px'}"
          ) Выходной
      .graph-template.flex
        base-custom-select(
          :items="scheduleList",
          center,
          v-model="schedule",
          placeholder="Шаблоны графиков"
        )
    .flex.justify-center
      base-button.font-semibold(:size="40") Сохранить
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
import BaseCustomSelect from "@/components/base/BaseCustomSelect.vue";
import BaseInputTime from "@/components/base/BaseInputTime.vue";
export default {
  name: "ScheduleBar",
  components: { BaseButton, BaseCustomSelect, BaseInputTime },
  data() {
    return {
      scheduleList: [
        { label: "Индивидуальный", id: 1 },
        { label: "2/2", id: 2 },
        { label: "3/2", id: 3 },
        { label: "5/2", id: 4 },
      ],
      schedule: {},
    };
  },
};
</script>

<style lang="sass" scoped>
.wrapper-bar
  height: 224px
  border: 1.5px solid var(--border-light-grey-color-1)
  border-radius: 4px

.time-wrapper
  width: 350px
  height: 102px
  border: 1.5px solid var(--border-light-grey-color-1)
  border-radius: 4px

.select
  height: 40px
  border: 1.5px solid var(--border-light-grey-color)
  border-radius: 4px

.item-input
  appearance: none
  outline: none
  height: 40px
  &::-webkit-calendar-picker-indicator
    display: none
    -webkit-appearance: none
  &::placeholder
    color: var(--font-black-color-1)

.text
  color: var(--font-grey-color)

.status-wrapper
  width: 690px
  height: 102px
  border: 1.5px solid var(--border-light-grey-color-1)
  border-radius: 4px

.button-work
  background: #55CD76
  border: none
  &:active
    background-color: #55CD76
    opacity: 1
    border: none
  &:hover
    background-color: #55CD76
    opacity: 0.8
    border: none

.button-status
  background: #D7D9FF
  border: none
  &:active
    background-color: #D7D9FF
    opacity: 1
    border: none
  &:hover
    background-color: #D7D9FF
    opacity: 0.8
    border: none

.button-free
  background: #9294A7
  border: none
  &:active
    background-color: #9294A7
    opacity: 1
    border: none
  &:hover
    background-color: #9294A7
    opacity: 0.8
    border: none

.graph-template
  width: 218px
  height: 40px
</style>
