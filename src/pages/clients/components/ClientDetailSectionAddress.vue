<template lang="pug">
  .flex.flex-col.gap-y-4
    .flex.flex-col(class="gap-y-1.5")
      .text-info.text-xxs.font-semibold Город
      base-select.text-sm(
        disable,
        textStyle="text-sm",
        placeholder="Введите город",
        v-model="dopeAddress.city",
        :style="{backgroundColor: 'var(--bg-disable-grey-color)'}"
      )
    .flex.flex-col(class="gap-y-1.5")
      .text-info.text-xxs.font-semibold Область
      base-input.text-sm.input-info(
        disabled,
        placeholder="Введите область",
        v-model:value="dopeAddress.region",
        :style="{backgroundColor: 'var(--bg-disable-grey-color)'}"
      )
    .flex.flex-col(class="gap-y-1.5")
      .text-info.text-xxs.font-semibold Улица
      base-input.text-sm.input-info(
        disabled,
        placeholder="Введите улицу",
        v-model:value="dopeAddress.street",
        :style="{backgroundColor: 'var(--bg-disable-grey-color)'}"
      )
    .flex.gap-x-4
      .flex.flex-col(class="gap-y-1.5")
        .text-info.text-xxs.font-semibold Дом
        base-input.text-sm.input-info(
          disabled,
          placeholder="Дом",
          v-model:value="dopeAddress.house",
          :style="{backgroundColor: 'var(--bg-disable-grey-color)'}"
        )
      .flex.flex-col(class="gap-y-1.5")
        .text-info.text-xxs.font-semibold Квартира
        base-input.text-sm.input-info(
          disabled,
          placeholder="Квартира",
          v-model:value="dopeAddress.flat",
          :style="{backgroundColor: 'var(--bg-disable-grey-color)'}"
        )
    .flex.flex-col(class="gap-y-1.5")
      .text-info.text-xxs.font-semibold Индекс
      base-input.text-sm.input-info(
        disabled,
        v-mask="'######'",
        placeholder="000000",
        v-model:value="dopeAddress.index",
        :style="{backgroundColor: 'var(--bg-disable-grey-color)'}"
      )
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
