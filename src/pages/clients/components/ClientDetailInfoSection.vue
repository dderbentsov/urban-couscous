<template lang="pug">
  .section-wrapper.flex.flex-col.h-fit.cursor-pointer(
    :style="{flexDirection:settings[section].rowFlex && 'row', width: settings[section].width + 'px', height: settings[section].height + 'px', background: changeBackground}"
  )
    .section-header.flex.items-center.justify-between.pl-4.pr-3(:class="{small:settings[section].rowFlex}")
      span.text-sm.font-semibold.whitespace-nowrap {{settings[section].title}}
      .flex.items-center.gap-x-8
        base-button(
          v-if="isChange",
          @click.stop="changeDoc",
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
          base-popup.right-3.top-5(v-if="section === 'docs' && isOpenAddingWrap", :width="244")
            table-choice-adding-doc(
              :add-new-doc="addNewDoc",
              :save-docs="saveDocs",
              :new-docs="docData",
              :change-open-add-doc="changeOpenAddDoc",
              :change-open-create-doc="changeOpenCreateDoc",
            )
          base-modal(
            v-model="showModal",
            :style-content="{padding: isOpenAddDoc ? '16px' : '28px 32px'}",
            :showIcon="isOpenAddDoc"
          )
            table-adding-new-doc(
              v-if="isOpenAddDoc",
              :add-new-doc="addNewDoc",
              :new-docs="docData",
              :close-modal="changeShowModal",
            )
            table-create-package-doc(v-if="isOpenPackage")
          table-adding-new-additional(
            v-if="section === 'additional' && isOpenAddingWrap"
            :new-additional-data="additionalData",
            :add-new-additional="addDocAdditional",
            :save-additional="saveDocs"
          )
    .section-body.w-full.flex.flex-col.px-4.pt-3.pb-4.gap-y-4(
      v-if="this.isData || this.isAddress || this.isAttachments"
    )
      .flex.flex-col.gap-y-4
        .flex.flex-col(v-for="(item, key) in sectionInfo", class="gap-y-1.5")
          span.title-section.font-semibold.text-xs(
            v-if="settings[section].options") {{settings[section].options[key]}}
          span.title-section.font-semibold.text-xs(v-if="item.header") {{item.header}}
          client-detail-input.text-sm.w-max-fit(
            v-if="section!=='docs' && isChange && settings[section].options[key] !== 'Дата выдачи'",
            :style="{fontWeight:key === 'numba'&&600, maxHeight: settings[section].options[key] !== 'Выдан' ? '40px' : ''}",
            v-model:value="sectionInfo[key]",
            :width="settings[section].width",
            :placeholder="settings[section].placeholder[key]"
            :sharp="settings[section].sharps[key] && section === 'pass' ? settings[section].sharps[key] : ''"
          )
          base-input-date.input.text-sm(
            v-else-if="isChange && section !== 'docs'",
            v-model:value="sectionInfo.issued_by_date"
          )
             .copy.icon-copy.cursor-pointer(
              v-if="item.copy",
              @click="() => copyValue(item)"
            )
          .flex(v-if="settings[section].options && !isChange")
            span.text-sm.w-fit(:style="{fontWeight:key === 'numba'&&600}") {{item === 'issued_by_date' ? formattedDate : item}}
            .copy.icon-copy.cursor-pointer.pl-4(
              v-if="key === 'numba'",
              @click="() => copyValue(item)"
            )
          .separation.flex.items-center.justify-center.relative.mt-10px.mb(
            v-if="section === 'addresses' && isChange",
            class="gap-y-1.5"
          )
            .line.absolute
            .text-separation.span.text-sm.separator.px-2 или
          .flex.flex-col.gap-y-4(v-if="section === 'addresses' && isChange")
            client-detail-section-address(:dope-address="dopeAddress")
          .flex(v-if="item.name && !isChange")
            span.text-sm.w-fit {{item.title}}
          .flex.items-center(v-if="item.title")
            .icon-cancel.cancel.cursor-pointer.pr-3.text-xsm(
              v-if="isChange",
              :id="item.id",
              @click="deleteDoc(item.id)"
            )
            .flex.gap-x-2.items-center
              img(:src="iconDictionary[item?.document?.substr(item.document.lastIndexOf('.') + 1)]")
              span.text-sm {{item.title}}
            span.text-sm(v-if="item.document") {{`.${item?.document?.substr(item.document.lastIndexOf(".") + 1)}`}}
    .section-add.flex.justify-center.items-center.cursor-pointer(
      v-else,
      @click="openAddDoc"
    ) Добавить данные
</template>

<script>
import ClientDetailInput from "@/pages/clients/components/ClientDetailInput";
import BaseButton from "@/components/base/BaseButton";
import TableAddingNewDoc from "@/pages/clients/components/TableAddingNewDoc";
import TableAddingNewAdditional from "@/pages/clients/components/TableAddingNewAdditional";
import TableCreatePackageDoc from "@/pages/clients/components/TableCreatePackageDoc";
import ClientDetailSectionAddress from "@/pages/clients/components/ClientDetailSectionAddress";
import TableChoiceAddingDoc from "@/pages/clients/components/TableChoiceAddingDoc";
import BasePopup from "@/components/base/BasePopup";
import BaseModal from "@/components/base/BaseModal";
import BaseInputDate from "@/components/base/BaseInputDate";
import { detail } from "@/pages/clients/utils/tableConfig";
import pdfIcon from "@/assets/icons/pdf.svg";
import wordIcon from "@/assets/icons/word.svg";
import exelIcon from "@/assets/icons/exel.svg";
import * as moment from "moment";
export default {
  name: "ClientDetailInfoSection",
  components: {
    BaseButton,
    BaseInputDate,
    BasePopup,
    BaseModal,
    ClientDetailInput,
    ClientDetailSectionAddress,
    TableAddingNewAdditional,
    TableCreatePackageDoc,
    TableAddingNewDoc,
    TableChoiceAddingDoc,
  },
  props: {
    saveNewDoc: Function,
    sectionInfo: Object,
    section: String,
    deleteDoc: Function,
    updateDocument: Function,
    updateAddress: Function,
    lackData: Boolean,
    lackAddress: Boolean,
    lackAttachments: Boolean,
    dopeAddress: Object,
    createAddress: Function,
    createDocument: Function,
    addressId: String,
    docId: String,
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
      isChange: false,
      settings: detail,
      isData: true,
      isAddress: true,
      isAttachments: true,
      iconDictionary: {
        doc: wordIcon,
        docx: wordIcon,
        odt: wordIcon,
        pdf: pdfIcon,
        xls: exelIcon,
      },
      isOpenPackage: false,
      isOpenAddDoc: false,
      showModal: false,
    };
  },
  computed: {
    changeBackground() {
      return this.isChange
        ? "var(--light-grey-bg-color)"
        : "var(--default-white)";
    },
    formattedDate() {
      return this.sectionInfo["issued_by_date"]
        ? this.sectionInfo.issued_by_date.split("-").reverse().join(".")
        : "";
    },
  },
  methods: {
    openAddDoc() {
      this.isChange = true;
      if (this.section === "pass") {
        this.isData = true;
      } else if (this.section === "addresses") {
        this.isAddress = true;
      } else if (this.section === "docs") {
        this.isAttachments = true;
        this.showModal = true;
        this.isOpenAddDoc = true;
      }
    },
    changeOpenAddDoc() {
      this.showModal = true;
      this.isOpenPackage = true;
      this.isOpenAddingWrap = false;
    },
    changeOpenCreateDoc() {
      this.showModal = true;
      this.isOpenAddDoc = true;
      this.isOpenAddingWrap = false;
    },
    clearDocs() {
      this.isOpenPackage = false;
      this.isOpenAddDoc = false;
    },
    changeShowModal() {
      this.showModal = false;
      this.saveDocs();
    },
    checkDataPresence(data) {
      let postData = JSON.parse(JSON.stringify(data));
      let keys = Object.keys(postData);
      keys.forEach((key) => {
        if (!postData[key]) {
          delete postData[key];
        }
      });
      return postData;
    },
    changeDoc() {
      this.isChange = false;
      if (this.section === "pass") {
        if (!this.docId) {
          let changedData = Object.keys(
            this.checkDataPresence(this.sectionInfo)
          );
          if (
            changedData.length !== Object.keys(this.sectionInfo).length ||
            moment(this.sectionInfo.issued_by_date).isAfter(
              moment().format("YYYY-MM-DD")
            )
          ) {
            this.isData = false;
          }
          this.createDocument();
        } else this.updateDocument();
      }
      if (this.section === "addresses") {
        if (!this.addressId) {
          if (this.sectionInfo.join_adress === "") this.isAddress = false;
          this.createAddress();
        } else this.updateAddress();
      }
    },
    copyValue(text) {
      navigator.clipboard.writeText(text);
    },
    changeClientData() {
      if (!this.isOpenAddingWrap) {
        this.isChange = true;
      }
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
        this.saveNewDoc(this.docData);
      }
      this.isOpenAddingWrap = false;
      this.docData = [];
      this.additionalData = {
        header: "",
        value: "",
        name: "",
        type: "",
      };
    },
  },
  watch: {
    lackData: {
      deep: true,
      immediate: true,
      handler(newValue) {
        if (this.isData !== newValue) {
          this.isData = newValue;
        }
      },
    },
    lackAddress: {
      immediate: true,
      handler(newValue) {
        if (this.isAddress !== newValue) this.isAddress = newValue;
      },
    },
    lackAttachments: {
      immediate: true,
      handler(newValue) {
        this.isAttachments = newValue;
      },
    },
    showModal: function () {
      if (this.showModal === false) {
        this.clearDocs();
      }
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

.section-add
  height: 100%
  min-height: 64px
  color: var(--btn-blue-color)

.line
  width: 100%
  height: 1px
  background-color: var(--border-light-grey-color)
  z-index: 0

.separation
  width: 100%

.text-separation
  width: 38px
  z-index: 1
  background: var(--light-grey-bg-color)

.input
  border: 1.5px solid var(--border-light-grey-color)
  height: 40px
</style>
