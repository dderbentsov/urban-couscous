<template lang="pug">
  .section-wrapper.flex.flex-col.h-fit.cursor-pointer(
    :style="{ flexDirection:settings[section].rowFlex&&'row', width : settings[section].width + 'px', height : settings[section].height+'px'}"
  )
    .section-header.flex.items-center.justify-between.pl-4.pr-3(:class="{small:settings[section].rowFlex}")
      span.text-sm.font-semibold.whitespace-nowrap {{settings[section].title}}
      .flex.items-center.gap-x-8
        base-button(
          v-if="isChange",
          @click="saveChange",
          confirm,
          rounded,
          outlined,
          :size="20"
        )
          .icon-ok.text-xsm(class="pt-[3px]")
        .edit.icon-edit.cursor-pointer.text-sm(
          v-if="!isChange",
          @click="changeClientData"
        )
        .flex.relative
          base-button(
            v-if="settings[section].addFile",
            @click="openAddingWrap",
            :rounded="true",
            :outlined="true",
            :added="true",
            :size="24"
          )
            .icon-plus(class="pt-[2px]")
          table-adding-new-doc(
            v-if="section === 'docs' && isOpenAddingWrap",
            :add-new-doc="addNewDoc",
            :save-docs="saveDocs",
            :new-docs="docData"
          )
          table-adding-new-additional(
            v-if="section === 'additional' && isOpenAddingWrap"
            :new-additional-data="additionalData",
            :add-new-additional="addDocAdditional",
            :save-additional="saveDocs"
          )
    .section-body.w-full.flex.flex-col.px-4.pt-3.pb-4.gap-y-4
      .flex.flex-col(v-for="(item, key) in sectionInfo" class="gap-y-1.5")
        span.title-section.font-semibold.text-xs(v-if="settings[section].options") {{settings[section].options[key]}}
        span.title-section.font-semibold.text-xs(v-if="item.header") {{item.header}}
        client-detail-input.text-sm.text-sm.w-max-fit(
          v-if="section!=='docs' && isChange",
          :style="{fontWeight:key === 'numba'&&600}",
          v-model:value="sectionInfo[key]",
          :width="settings[section].width"
        )
          .copy.icon-copy.cursor-pointer(
            v-if="item.copy",
            @click="() => copyValue(item)"
          )
        .flex(v-if="settings[section].options && !isChange")
          span.text-sm.w-fit(:style="{fontWeight:key === 'numba'&&600}") {{item}}
          .copy.icon-copy.cursor-pointer.pl-4(
            v-if="key === 'numba'",
            @click="() => copyValue(item)"
          )
        .flex(v-if="item.name && !isChange")
          span.text-sm.w-fit {{item.title}}
        .flex.items-center(v-if="item.title")
          .icon-cancel.cancel.cursor-pointer.pr-3.text-xsm(
            v-if="isChange",
            :id="item.id",
            @click="(e) => deleteDoc(e)"
          )
          span.text-sm {{item.title}}
</template>

<script>
import ClientDetailInput from "@/pages/clients/components/ClientDetailInput";
import BaseButton from "@/components/base/BaseButton";
import TableAddingNewDoc from "@/pages/clients/components/TableAddingNewDoc";
import TableAddingNewAdditional from "@/pages/clients/components/TableAddingNewAdditional";
import { detail } from "@/pages/clients/utils/tableConfig";
export default {
  name: "ClientDetailInfoSection",
  components: {
    TableAddingNewAdditional,
    BaseButton,
    ClientDetailInput,
    TableAddingNewDoc,
  },
  props: {
    saveNewDoc: Function,
    sectionInfo: Object,
    section: String,
    deleteDoc: Function,
  },
  data() {
    return {
      additionalData: {
        header: "",
        value: "",
        name: "",
        type: "",
      },
      docData: [],
      isOpenAddingWrap: false,
      isOpenChange: false,
      isChange: false,
      settings: detail,
    };
  },
  methods: {
    copyValue(text) {
      navigator.clipboard.writeText(text);
    },
    changeClientData() {
      if (!this.isOpenAddingWrap) {
        this.isChange = true;
      }
    },
    saveChange() {
      this.isOpenChange = false;
      this.isChange = false;
    },
    openAddingWrap() {
      if (!this.isChange) {
        this.isOpenAddingWrap = !this.isOpenAddingWrap;
      }
    },
    addNewDoc(e) {
      this.docData = [...this.docData, ...e.target.files];
    },
    addDocAdditional(e) {
      this.additionalData.name = e.target.files[0].name;
      this.additionalData.type = e.target.files[0].type;
    },
    saveDocs() {
      if (this.section === "additional") {
        this.saveNewDoc(this.section, [this.additionalData]);
      } else {
        this.saveNewDoc(this.section, this.docData);
      }
      this.isOpenAddingWrap = false;
      this.isOpenChange = false;
      this.docData = [];
      this.additionalData = {
        header: "",
        value: "",
        name: "",
        type: "",
      };
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
.cancel
  color: var(--font-grey-color)
  &:hover
    opacity: 0.6
</style>
