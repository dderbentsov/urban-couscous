<template lang="pug">
  .wrapper-info.flex.flex-col.flex-auto.h-full.gap-y-8.justify-between
    .grid.grid-cols-2.gap-x-4.gap-y-6
      .flex.flex-col(class="gap-y-1.5")
        span.text-sm Возраст
          span.obligatory *
        base-input.input-info(v-model:value="basicInfo.age" placeholder="Колличество полных лет" :width-input="277")
      .flex.flex-col(class="gap-y-1.5")
        span.text-sm Должность
        base-input.input-info(v-model:value="basicInfo.jobTitle" placeholder="Должность клиента" :width-input="277")
      .flex.flex-col(class="gap-y-1.5")
        span.text-sm Номер телефона
          span.obligatory *
        base-input.input-info(v-model:value="basicInfo.number" placeholder="+7 (915) 644–92–23" :width-input="277")
      .flex.flex-col(class="gap-y-1.5")
        span.text-sm Email
          span.obligatory *
        base-input.input-info(v-model:value="basicInfo.email" placeholder="user@yandex.ru" :width-input="277")
      .flex.flex-col.col-start-1.col-end-3(class="gap-y-1.5")
        span.text-sm Ссылки на соцсети
        .flex(class="gap-x-1.5" v-for="network in basicInfo.networks" :key="network.id")
          .icon.flex.justify-center.items-center
            span.icon-telegram.leading-2.text-lg
          base-input.input-info.w-full(v-model:value="network.network" :id="network.id" placeholder="Ссылкa")
        span.add-network.cursor-pointer(@click="addNetwork") Добавить соцсеть
    base-create-button(text="Создать клиента" @click="saveClient")
</template>

<script>
import BaseCreateButton from "@/components/base/buttons/BaseCreateButton";
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "FormCreateBasicInfo",
  components: { BaseInput, BaseCreateButton },
  props: {
    basicInfo: Object,
    saveClient: Function,
    addNetwork: Function,
  },
};
</script>

<style lang="sass" scoped>
.wrapper-info
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
.obligatory
  color: var(--font-obligatory-color)
.add-network
  color: var(--btn-blue-color)
.icon
  color: var(--border-light-grey-color)
  width: 48px
  height: 100%
  border: 2px solid var(--border-light-grey-color)
  border-radius: 4px
</style>
