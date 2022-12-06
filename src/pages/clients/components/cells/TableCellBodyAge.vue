<template lang="pug">
  .flex.box-border.px-4.items-center.w-full.text-sm(:style="{ minWidth : width + 'px' }")
    span(v-if="!isOpenChange") {{value.age ? value.age.split("-").reverse().join(".") : ""}}
    base-input-date.input.max-h-10(
      v-if="isOpenChange",
      @click.stop,
      v-model:value="value.age",
      :width-input="124"
    )
</template>

<script>
import BaseInputDate from "@/components/base/BaseInputDate";
export default {
  name: "TableCellBodyAge",
  components: { BaseInputDate },
  props: {
    value: Object,
    width: Number,
    isOpenChange: Boolean,
  },
};
</script>
<style lang="sass" scoped>
.input
  border: 1.5px solid var(--border-light-grey-color)
</style>
