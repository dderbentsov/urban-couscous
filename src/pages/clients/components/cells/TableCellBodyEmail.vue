<template lang="pug">
  .flex.box-border.px-4.items-center.w-full.text-sm(:style="{ minWidth : width + 'px' }")
    span(v-if="!isOpenChange") {{value.email.username}}
    base-input(v-if="isOpenChange" :width-input="234" v-model:value="value.email.username" :placeholder="value.email.username" )
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "TableCellBodyEmail",
  components: { BaseInput },
  props: {
    value: Object,
    width: Number,
    isOpenChange: Boolean,
  },
};
</script>
