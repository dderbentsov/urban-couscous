<template lang="pug">
  .section-wrapper.flex.flex-col.h-fit.cursor-pointer(@dblclick="openInterfaceChange" :class="{click:isOpenChange}" :style="{ flexDirection:settings[section].rowFlex&&'row', width : settings[section].width + 'px', height : settings[section].height+'px'}")
    .section-header.flex.items-center.justify-between.pl-4.pr-3(:class="{small:settings[section].rowFlex}")
      span.text-sm.font-semibold.whitespace-nowrap {{settings[section].title}}
      .flex.items-center.gap-x-8(v-if="isOpenChange")
        base-button-ok(@click="saveChange" v-if="isChange" :size="20" :icon-size="10" :dark-style="true")
        .edit.icon-edit.cursor-pointer.text-sm(v-if="!isChange" @click="changeClientData")
        base-button-plus(v-if="settings[section].addFile" :size="20" :icon-size="10" :with-border="true")
    .section-body.w-full.flex.flex-col.px-4.pt-3.pb-4.gap-y-4
      .flex.flex-col(v-for="(item, key) in sectionInfo" class="gap-y-1.5")
        span.title-section.font-semibold.text-xs(v-if="settings[section].options") {{settings[section].options[key]}}
        span.title-section.font-semibold.text-xs(v-if="item.header") {{item.header}}
        client-detail-input.text-sm.text-sm.w-max-fit(v-if="isChange && item.value" :style="{fontWeight:item.copy&&600}" v-model:value="item.value" :width="settings[section].width")
          .copy.icon-copy.cursor-pointer(v-if="item.copy")
        .flex.gap-x-4(v-if="item.value && !isChange")
          span.text-sm.w-fit(:style="{fontWeight:item.copy&&600}") {{item.value}}
          .copy.icon-copy.cursor-pointer(v-if="item.copy")
        .flex.gap-x-4(v-if="item.name")
          .icon-files.cursor-pointer(:style="{color:settings.docsColor[item.type]}")
          span.text-sm {{item.name}}
</template>

<script>
import ClientDetailInput from "@/pages/clients/components/ClientDetailInput";
import BaseButtonOk from "@/components/base/buttons/BaseButtonOk";
import BaseButtonPlus from "@/components/base/buttons/BaseButtonPlus";
import { detail } from "@/pages/clients/utils/tableConfig";
export default {
  name: "ClientDetailInfoSection",
  components: { BaseButtonPlus, BaseButtonOk, ClientDetailInput },
  props: {
    sectionInfo: Object,
    section: String,
  },
  data() {
    return {
      isOpenChange: false,
      isChange: false,
      settings: detail,
    };
  },
  methods: {
    openInterfaceChange() {
      this.isOpenChange = !this.isOpenChange;
    },
    changeClientData() {
      this.isChange = true;
    },
    saveChange() {
      this.isOpenChange = false;
      this.isChange = false;
    },
  },
};
</script>

<style lang="sass" scoped>
.section-wrapper
  border: 1px solid var(--border-light-grey-color)
  border-radius: 4px
  color: var(--font-dark-blue-color)
  &.click
    background-color: var(--light-grey-bg-color)
.section-header
  min-height: 44px
  border-bottom: 1px solid var(--border-light-grey-color)
.small
  border-bottom: none
  border-right: 1px solid var(--border-light-grey-color)
  min-width: 180px
.title-section
  color: var(--font-grey-color)
.copy
  color: var(--btn-blue-color)
  opacity: 0.6
.section-body
  overflow-y: auto
  &::-webkit-scrollbar
    width: 4px
  &::-webkit-scrollbar-track
    background-color: rgba(211, 212, 220, 0.5)
    border-radius: 8px
  &::-webkit-scrollbar-thumb
    border-radius: 8px
    background-color: var(--btn-blue-color)
.edit
  color: var(--btn-blue-color)
  &:hover
    opacity: 0.6
</style>
