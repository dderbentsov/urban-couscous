<template lang="pug">
  .section-wrapper.flex.flex-col.h-fit(:style="{ minWidth : settings.width + 'px' }" :class="{flexRow:settings.rollFlex}")
    .section-header.flex.items-center.justify-start.pt-4.pb-3.pl-4(:class="{styleBorder:settings.rollFlex}")
      span.text-sm.font-semibold {{settings.title}}
    .section-body.w-full.flex.flex-col.px-4.pt-3.pb-4.gap-y-4
      .flex.flex-col(v-for="(item, key) in sectionInfo" class="gap-y-1.5")
        span.title-section.font-semibold.text-xs(v-if="settings.options") {{settings.options[key]}}
        .flex.gap-x-4
          .icon-files.cursor-pointer(v-if="!!item.file" style="color:red")
          span.text-sm.text-sm.text-center.w-fit(v-if="!!item.value" :style="{fontWeight:item.copy&&600}") {{item.value}}
          span.text-sm.text-center(v-if="!!item.file") {{item.file}}
          .icon-copy.cursor-pointer(v-if="item.copy")
</template>

<script>
import { detail } from "@/pages/clients/utils/tableConfig";
export default {
  name: "ClientDetailInfoSection",
  props: {
    sectionInfo: Object,
    section: String,
  },
  data() {
    return {
      settings: detail.find((el) => el.name === this.section),
    };
  },
};
</script>

<style lang="sass" scoped>
.section-wrapper
  border: 1px solid var(--border-light-grey-color)
  border-radius: 4px
  color: var(--font-dark-blue-color)
  &.flex-row
    flex-direction: row
.section-header
  border-bottom: 1px solid var(--border-light-grey-color)
  &.style-border
    border-bottom: none
    border-right: 1px solid var(--border-light-grey-color)
.title-section
  color: var(--font-grey-color)
</style>
