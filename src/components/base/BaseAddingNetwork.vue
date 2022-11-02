<template lang="pug">
  .flex.w-full(class="gap-x-1.5")
    .flex(:id="value.id" @click="(e) => saveNetworkId(e)")
      base-select(:for-networks="true" :style-border="true" :list-data="listAddingNetworks" :option-data="selectedOption" :choose-option="chooseNetwork" :width-select="42")
    base-input.w-full(v-model:value="value.username" placeholder="Ссылкa")
</template>

<script>
import BaseSelect from "@/components/base/OldBaseSelect";
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "TableAddingNetwork",
  components: { BaseInput, BaseSelect },
  props: {
    saveNetworkId: {
      type: Function,
      default: () => {},
    },
    selectedOption: String,
    value: Object,
    listAddingNetworks: Array,
    chooseNetwork: Function,
  },
};
</script>
