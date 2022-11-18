<template lang="pug">
  .wrapper-addresses.flex.flex-col.flex-auto.h-full.gap-y-8.justify-between
    .flex.flex-col.gap-y-6.px-4
      .flex.flex-col.col-start-1.col-end-3(class="gap-y-1.5")
        span.text-sm.font-semibold Полный адрес
        base-input.input-info(
          v-model:value="addresses.full_address",
          placeholder="Введите адрес целиком"
        )
      .flex.items-center.justify-center.relative
        .line.absolute
        span.text-sm.separator.px-2 или
      .grid.grid-cols-2.gap-y-6.gap-x-4
        .flex.flex-col(class="gap-y-1.5")
          .text-info.text-xxs.font-semibold Город
          base-input.input-info(
            placeholder="Выберите город",
            v-model:value="addresses.city"
          )
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm.font-semibold Область
          base-input.input-info(
            placeholder="Введите область",
            v-model:value="addresses.region"
          )
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm.font-semibold Улица
          base-input.input-info(
            placeholder="Введите улицу",
            v-model:value="addresses.street"
          )
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm.font-semibold Дом
          base-input.input-info(
            placeholder="Номер дома",
            v-model:value="addresses.house_number"
          )
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm.font-semibold Квартира
          base-input.input-info(
            placeholder="Номер квартиры",
            v-model:value="addresses.apartment_number"
          )
        .flex.flex-col(class="gap-y-1.5")
          span.text-sm.font-semibold Индекс
          base-input.input-info(
            placeholder="000000",
            v-mask="'######'",
            v-model:value="addresses.zip_code"
          )
    .px-4
      base-button(@click="saveClient" :size="40")
        span.font-semibold Создать клиента
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
import BaseInput from "@/components/base/BaseInput";
import BaseCustomSelect from "@/components/base/BaseCustomSelect";
import { mask } from "vue-the-mask";
export default {
  name: "FormCreateAddresses",
  components: { BaseInput, BaseButton, BaseCustomSelect },
  props: {
    addresses: Object,
    saveClient: Function,
    saveFile: Function,
  },
  directives: { mask },
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
.line
  width: 570px
  height: 1px
  background-color: var(--border-light-grey-color)
  z-index: -1
.separator
  color: var(--font-dark-blue-color)
  background-color: var(--default-white)
</style>
