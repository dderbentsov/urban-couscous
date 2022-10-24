<template lang="pug">
  .input-wrapper.flex.gap-x-2.px-4.box-border(class="py-2.5" :style="{ minWidth: widthInput + 'px' }")
    input.w-full.outline-0.text-base.not-italic(:style="{ backgroundColor: backgroundInput, fontSize: fontSizeInput }" :value="value" :type="type" @input="$emit('update:value', $event.target.value)" :placeholder="placeholder" :maxlength="maxLength")
    .slot(v-if="withIcon" :class="iconPosition")
      slot.cursor-pointer
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    type: {
      default: "text",
    },
    maxLength: Number,
    value: String,
    withIcon: {
      default: false,
    },
    iconPosition: {
      default: "right",
    },
    placeholder: {
      default: "Поиск",
    },
    widthInput: Number,
    backgroundInput: String,
    fontSizeInput: String,
  },
};
</script>

<style lang="sass" scoped>
.left
  order: -1
.right
  order: 1
.input-wrapper
  border: 2px solid var(--border-light-grey-color)
  border-radius: 4px
</style>
