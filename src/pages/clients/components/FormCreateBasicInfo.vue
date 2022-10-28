<template lang="pug">
  .wrapper-info.flex.flex-col.flex-auto.h-full.gap-y-8.justify-between
    .grid.grid-cols-2.gap-x-4.gap-y-6.px-4
      .flex.flex-col(class="gap-y-1.5")
        span.text-sm Дата рождения
          span.obligatory *
        base-input.input-info(v-model:value="basicInfo.birth_date" type="date" :width-input="277")
      .flex.flex-col(class="gap-y-1.5")
        span.text-sm Номер телефона
          span.obligatory *
        base-input.input-info(v-model:value="phone.username" placeholder="+7 (915) 644–92–23" :width-input="277")
      .flex.flex-col(class="gap-y-1.5")
        span.text-sm Email
          span.obligatory *
        base-input.input-info(v-model:value="email.username" placeholder="user@yandex.ru" :width-input="277")
      .flex.flex-col.col-start-1.col-end-3.w-100(class="gap-y-1.5")
        span.text-sm Ссылки на соцсети
        .flex(class="gap-x-1.5" v-for="network in basicInfo.contacts" :key="network.id")
          base-adding-network(:list-adding-networks="networks.settings" selected-option="icon-tg" :value="network" :choose-network="chooseOption")
        span.add-network.cursor-pointer(v-show="networks.settings.length !== basicInfo.contacts.length" @click="addNetwork") Добавить соцсеть
    .px-4
      base-create-button(text="Сохранить" @click="saveClient")
</template>

<script>
import BaseCreateButton from "@/components/base/buttons/BaseCreateButton";
import BaseInput from "@/components/base/BaseInput";
import BaseAddingNetwork from "@/components/base/BaseAddingNetwork";
import { column } from "@/pages/clients/utils/tableConfig";
export default {
  name: "FormCreateBasicInfo",
  components: { BaseInput, BaseCreateButton, BaseAddingNetwork },
  props: {
    chooseOption: Function,
    phone: Object,
    email: Object,
    basicInfo: Object,
    saveClient: Function,
    addNetwork: Function,
  },
  data() {
    return {
      networks: column.find((el) => el.name === "networks"),
    };
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
