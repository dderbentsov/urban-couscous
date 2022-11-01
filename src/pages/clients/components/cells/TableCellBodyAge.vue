<template lang="pug">
  .flex.box-border.px-4.items-center.w-full.text-sm(:style="{ minWidth : width + 'px' }")
    span(v-if="!isOpenChange") {{value.age ? new Date().getFullYear() - new Date(value.age).getFullYear() : ""}}
    base-input(v-if="isOpenChange" type="date" v-model:value="value.age" :width-input="124")
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "TableCellBodyAge",
  components: { BaseInput },
  props: {
    value: Object,
    width: Number,
    isOpenChange: Boolean,
  },
};
</script>
