<template lang="pug">
  .flex.box-border.px-4.items-center.w-full.text-sm(:style="{ minWidth : width + 'px' }")
    span.text-sm(v-if="!isOpenChange") {{value.phone.username.replace(/\+7(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 ($1) $2-$3-$4')}}
    base-input(v-if="isOpenChange" :width-input="154" v-model:value="value.phone.username" :placeholder="value.phone.username")
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "TableCellBodyPhone",
  components: { BaseInput },
  props: {
    value: Object,
    width: Number,
    isOpenChange: Boolean,
  },
};
</script>
