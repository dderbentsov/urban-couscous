<template lang="pug">
  .input-wrapper.flex.gap-x-2.px-4.box-border(class="py-2.5")
    img.cursor-pointer( v-if="withIcon" :class="position" src="@/assets/icons/search-black.svg" alt="SearchTable")
    input.input-search.outline-0.text-base.not-italic(placeholder="Искать")
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    withIcon: {
      default: false,
    },
    iconPosition: String,
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
.input-search
  min-width: 220px
</style>
