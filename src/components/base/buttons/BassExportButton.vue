<template lang="pug">
  button.button.flex.gap-x-2.px-6.box-border(class="py-2.5")
    .icon-download.text(v-if="withIcon || onlyIcon")
    span.text-base.font-semibold(v-if="!onlyIcon" ) Сохранить
</template>

<script>
export default {
  name: "BaseExportButton",
  props: {
    withIcon: {
      default: false,
    },
    onlyIcon: {
      default: false,
    },
  },
};
</script>

<style lang="sass" scoped>
.button
  border: 2px solid var(--btn-blue-color)
  border-radius: 4px
  color: var(--btn-blue-color)
  &:hover
    opacity: 0.7
</style>
