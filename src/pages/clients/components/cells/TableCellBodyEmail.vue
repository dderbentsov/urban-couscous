<template lang="pug">
  .flex.box-border.px-4.items-center.w-full.text-sm(
    :style="{ minWidth: width + 'px', maxWidth: isHover && this.value.email.username.length >= 25 ? width + 30 + 'px' : width + 'px' }"
  )
    span.z-10(
      v-if="!isOpenChange",
      @mouseover="changeHover",
      @mouseleave="changeHover"
    ) {{maxValue}}
    base-input(
      v-if="isOpenChange",
      :width-input="234",
      @click.stop,
      v-model:value="value.email.username",
      :placeholder="value.email.username"
    )
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
  data() {
    return {
      isHover: false,
    };
  },
  computed: {
    maxValue() {
      return this.value.email.username.length >= 25 && !this.isHover
        ? this.value.email.username.substr(0, 25) + "..."
        : this.value.email.username;
    },
  },
  methods: {
    changeHover() {
      this.isHover = !this.isHover;
    },
  },
};
</script>
