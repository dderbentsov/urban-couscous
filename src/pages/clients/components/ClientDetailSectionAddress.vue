<template lang="pug">
  .flex.flex-col.gap-y-4
    .flex.flex-col(class="gap-y-1.5")
      .text-info.text-xxs.font-semibold Город
      base-select(
        placeholder="Выберите город",
        :items="cities",
        v-model="dopeAddress.city"
      )
    .flex.flex-col(class="gap-y-1.5")
      .text-info.text-xxs.font-semibold Область
      base-input.input-info(placeholder="Введите область", v-model:value="dopeAddress.region")
    .flex.flex-col(class="gap-y-1.5")
      .text-info.text-xxs.font-semibold Улица
      base-input.input-info(placeholder="Введите улицу", v-model:value="dopeAddress.street")
    .flex.gap-x-4
      .flex.flex-col(class="gap-y-1.5")
        .text-info.text-xxs.font-semibold Дом
        base-input.input-info(placeholder="Дом", v-model:value="dopeAddress.house")
      .flex.flex-col(class="gap-y-1.5")
        .text-info.text-xxs.font-semibold Квартира
        base-input.input-info(placeholder="Квартира", v-model:value="dopeAddress.flat")
    .flex.flex-col(class="gap-y-1.5")
      .text-info.text-xxs.font-semibold Индекс
      base-input.input-info(v-mask="'######'", placeholder="000000", v-model:value="dopeAddress.index")
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseSelect from "@/components/base/BaseSelect";
import { mask } from "vue-the-mask";
export default {
  name: "ClientDetailSectionAddress",
  components: {
    BaseInput,
    BaseSelect,
  },
  props: {
    dopeAddress: Object,
    cities: Array,
  },
  directives: { mask },
};
</script>

<style lang="sass" scoped>
.input-info
  color: var(--font-dark-blue-color)
.text-info
  color: var(--font-grey-color)
</style>
