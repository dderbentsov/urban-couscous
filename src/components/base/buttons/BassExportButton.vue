<template lang="pug">
  button.button.flex.gap-x-2.px-6.box-border(class="py-2.5")
    img(v-if="withIcon || onlyIcon" src="@/assets/icons/export.svg" alt="Export")
    span.text.text-base.font-semibold(v-if="!onlyIcon" ) Сохранить
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
.text
  color: var(--btn-blue-color)
</style>
