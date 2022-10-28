<template lang="pug">
  .flex.w-full(class="gap-x-1.5")
    base-select(:for-networks="true" :style-border="true" :list-data="listAddingNetworks" :option-data="selectedOption" :choose-option="chooseNetwork" :width-select="42")
    base-input.input-info.w-full(v-model:value="value.username" placeholder="Ссылкa")
</template>

<script>
import BaseSelect from "@/components/base/BaseSelect";
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "TableAddingNetwork",
  components: { BaseInput, BaseSelect },
  props: {
    selectedOption: String,
    value: Object,
    listAddingNetworks: Array,
    chooseNetwork: Function,
  },
};
</script>

<style lang="sass" scoped>
.icon
  color: var(--font-dark-blue-color)
  width: 48px
  height: 42px
  border: 2px solid var(--border-light-grey-color)
  border-radius: 4px
</style>
