<template lang="pug">
  .input-wrapper.flex.gap-x-2.px-4.box-border(class="py-2.5" :style="{ minWidth: widthInput + 'px' }")
    img.cursor-pointer( v-if="withIcon" :class="position" src="@/assets/icons/search-black.svg" alt="SearchTable")
    input.w-full.outline-0.text-base.not-italic(:style="{ backgroundColor: backgroundInput, fontSize: fontSizeInput }" :value="value" :type="type" @input="$emit('update:value', $event.target.value)" :placeholder="placeholder")
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    type: {
      default: "text",
    },
    value: String,
    withIcon: {
      default: false,
    },
    iconPosition: String,
    placeholder: {
      default: "Поиск",
    },
    widthInput: Number,
    backgroundInput: String,
    fontSizeInput: String,
  },
  computed: {
    position() {
      if (this.iconPosition === "right") {
        return "right";
      }
      return "left";
    },
  },
};
</script>

<style lang="sass" scoped>
.left
  order: 0
.right
  order: 1
.input-wrapper
  border: 2px solid var(--border-light-grey-color)
  border-radius: 4px
</style>
