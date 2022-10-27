<template lang="pug">
  .flex.box-border.px-4.items-center.gap-x-3.w-full.text-sm(:style="{ minWidth : width + 'px' }")
    .flex.avatar.justify-center.items-center
      span {{avatar}}
    span.font-semibold(v-if="!isOpenChange") {{value.fullName}}
    base-input(v-if="isOpenChange" type="text" v-model:value="value.fullName" :width-input="300")
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
export default {
  name: "TableCellBodyName",
  components: { BaseInput },
  props: {
    value: Object,
    avatar: String,
    width: Number,
    imgUrl: String,
    isOpenChange: Boolean,
  },
};
</script>

<style lang="sass" scoped>
.avatar
  width: 36px
  height: 36px
  border-radius: 50%
  background-color: var(--font-grey-color)
  color: var(--font-dark-blue-color)
</style>
