<template lang="pug">
  .section-wrapper.flex.flex-col.h-fit.cursor-pointer(
    :style="{width: settings[section].width + 'px', 'min-height': settings[section].height + 'px', background: changeBackground}",
  )
    .section-header.flex.items-center.justify-between.pl-4.pr-3(:class="{small:settings[section].rowFlex}")
      span.text-sm.font-semibold.whitespace-nowrap {{settings[section].title}}
      .flex.items-center.gap-x-8
        base-button(
          v-if="isChange && (this.isData || this.isAddress || this.isAttachments || this.isNotes)",
          @click.stop="changeDoc",
          confirm,
          rounded,
          outlined,
          :size="20"
        )
          .icon-ok.text-xsm(class="pt-[3px]")
        .edit.cursor-pointer(
          v-if="!isChange && (this.isData || this.isAddress || this.isAttachments || this.isNotes)",
          @click="changeClientData"
        )
          .icon-edit.text-base.mt-2px
        .flex.relative
          base-button(
            v-if="settings[section].addFile",
            @click="openAddingWrap",
            :rounded="true",
            :outlined="true",
            :added="true",
            :size="20"
          )
            .icon-plus.text-sm(class="pt-[2px]")
          base-popup.right-3.top-5(
            v-if="section === 'docs' && isOpenAddingWrap",
            v-click-outside="closePopup",
            :width="244"
          )
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
              v-click-outside="closeAddDocs"
            )
            table-create-package-doc(v-if="isOpenPackage")
          base-popup.right-3.top-5(
            v-if="section === 'additional' && isOpenAddingWrap",
            v-click-outside="closePopup",
            :width="485"
          )
            table-create-note(:create-note="createNote", :close-popup="closePopup")
    transition(name="section", mode="out-in")
      .flex.justify-center.items-center(
        v-if="sectionDataPresence",
        :style="{height: settings[section].voidHeight + 'px'}",
      )
        base-loader(:width="60", :height="60")
      .section-body.flex.flex-col.gap-y-4.px-4(
        v-else-if="(this.isData || this.isAddress || this.isAttachments || this.isNotes) && !isChange",
        :class="{'pt-3 pb-4': isData || isAddress || isAttachments || isNotes}",
        :style="{height: settings[section].voidHeight + 'px'}"
      )
        .flex.flex-col.gap-y-4
          .flex.flex-col(v-for="(item, key) in sectionInfo", class="gap-y-1.5")
            span.title-section.font-semibold.text-xs(v-if="settings[section].options") {{settings[section].options[key]}}
            span.title-section.font-semibold.text-xs(v-if="item.header") {{item.header}}
            .flex(v-if="settings[section].options && !isChange")
              span.text-sm.w-fit(:style="{fontWeight:key === 'numba'&&600}") {{key === 'issued_by_date' ? formattedDate : item}}
              .copy.icon-copy.cursor-pointer.pl-4(
                v-if="key === 'numba'",
                @click="() => copyValue(item)"
              )
            .flex(v-if="item.name && !isChange")
              span.text-sm.w-fit {{item.title}}
            .flex.items-center(v-if="item.title && section !== 'additional'")
              .flex.gap-x-2.items-center
                img(:src="iconDictionary[item?.document?.substr(item.document.lastIndexOf('.') + 1)]")
                span.text-sm {{item.title}}
              span.text-sm(v-if="item.document") {{`.${item?.document?.substr(item.document.lastIndexOf(".") + 1)}`}}
            .flex.flex-col(v-if="section === 'additional' && !isChange", class="gap-y-1.5")
              .title-section.text-xxs.font-semibold {{item.title}}
              span.text-smm {{item.description}}
      .section-body.flex.flex-col.gap-y-4.px-4(
        v-else-if="(this.isData || this.isAddress || this.isAttachments || this.isNotes) && isChange",
        :class="{'pt-3 pb-4': isData || isAddress || isAttachments || isNotes}",
      )
        .flex.flex-col.gap-y-4
          .flex.flex-col(v-for="(item, key) in sectionInfo", class="gap-y-1.5")
            span.title-section.font-semibold.text-xs(
              v-if="settings[section].options",
            ) {{settings[section].options[key]}}
            span.title-section.font-semibold.text-xs(v-if="item.header") {{item.header}}  
            client-detail-input.text-sm.w-max-fit(
              v-if="section!=='docs' && section!=='additional' && isChange && settings[section].options[key] !== 'Дата выдачи'",
              :style="{fontWeight:key === 'numba'&&600}",
              v-model:value="sectionInfo[key]",
              :rows="section ==='pass' ? 2 : 1",
              :placeholder="settings[section].placeholder[key] || settings[section].placeholder"
              :sharp="settings[section].sharps[key] && section === 'pass' ? settings[section].sharps[key] : ''"
            )
            base-input-date.input.text-sm(
              v-else-if="isChange && section !== 'docs' && section !== 'additional'",
              v-model:value="sectionInfo.issued_by_date"
            )
              .copy.icon-copy.cursor-pointer(
                v-if="item.copy",
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
            .flex.flex-col.gap-y-2(v-if="section === 'additional' && isChange")
              .flex.justify-between
                .title-section.text-xxs.font-semibold Заголовок
                .icon-cancel.cancel.cursor-pointer.pr-3.text-xsm(
                  v-if="isChange",
                  :id="item.id",
                  @click="deleteNote(item.id)"
                )
              client-detail-input.text-sm.w-max-fit.pr-12.relative(
                :maxLength="40",
                :style="{fontWeight:key === 'numba'&&600}",
                v-model:value="sectionInfo[key].title",
                placeholder="Заголовок"
              )
                .text.flex.absolute.text-xsx.top-18px(
                  class="right-2.5",
                  :style="{color: 'var(--font-grey-color)'}"
                ) {{`${sectionInfo[key].title.length}/40`}}
              .title-section.text-xxs.font-semibold Описание
              client-detail-input.text-sm.w-max-fit(
                :maxLength="40",
                :style="{fontWeight:key === 'numba'&&600}",
                v-model:value="sectionInfo[key].description",
                placeholder="Описание"
              )
            .flex.items-center(v-if="item.title && section !== 'additional'")
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
        v-else
        :style="{height: settings[section].voidHeight + 'px'}"
        @click="openAddDoc"
      ) Добавить данные
</template>

<script>
import ClientDetailInput from "@/pages/clients/components/ClientDetailInput";
import BaseButton from "@/components/base/BaseButton";
import TableAddingNewDoc from "@/pages/clients/components/TableAddingNewDoc";
import TableAddingNewAdditional from "@/pages/clients/components/TableAddingNewAdditional";
import TableCreatePackageDoc from "@/pages/clients/components/TableCreatePackageDoc";
import TableCreateNote from "@/pages/clients/components/TableCreateNote";
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
import BaseLoader from "@/components/Loader/BaseLoader.vue";
export default {
  name: "ClientDetailInfoSection",
  components: {
    BaseButton,
    BaseInputDate,
    BasePopup,
    BaseModal,
    BaseLoader,
    ClientDetailInput,
    ClientDetailSectionAddress,
    TableAddingNewAdditional,
    TableCreatePackageDoc,
    TableAddingNewDoc,
    TableChoiceAddingDoc,
    TableCreateNote,
  },
  props: {
    saveNewDoc: Function,
    sectionInfo: Object,
    section: String,
    deleteDoc: Function,
    deleteNote: Function,
    updateDocument: Function,
    updateAddress: Function,
    updateNotes: Function,
    lackData: Boolean,
    lackAddress: Boolean,
    lackAttachments: Boolean,
    lackNotes: Boolean,
    dopeAddress: Object,
    createAddress: Function,
    createDocument: Function,
    createNote: Function,
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
      isNotes: true,
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
    sectionDataPresence() {
      if (this.section === "docs" || this.section === "additional") {
        return this.sectionInfo[0]?.initialization;
      }
      return Object.keys(this.sectionInfo).length === 0;
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
      } else if (this.section === "additional") {
        this.isNotes = true;
        this.isOpenAddingWrap = true;
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
    closePopup() {
      this.isOpenAddingWrap = false;
    },
    closeAddDocs() {
      this.isAttachments = false;
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
          if (this.sectionInfo.full_address === "") this.isAddress = false;
          this.createAddress();
        } else this.updateAddress();
      }
      if (this.section === "additional") {
        if (!this.sectionInfo[0]?.id) {
          this.isNotes = false;
        } else {
          this.updateNotes();
        }
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
    lackNotes: {
      immediate: true,
      handler(newValue) {
        this.isNotes = newValue;
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
  width: 20px
  height: 20px
  color: var(--btn-blue-color)
  &:hover
    opacity: 0.6

.cancel
  color: var(--font-grey-color)
  &:hover
    opacity: 0.6

.section-add
  height: 100%
  color: var(--btn-blue-color)

.closed-add .section-add
  max-height: 0

.closed-body .section-body
  max-height: 0

.section-enter-from
  opacity: 0
  transform: translateY(0px)
  pointer-events: none

.section-enter-active
  transition: 0.3s ease

.section-leave-to
  opacity: 0
  transform: translateY(0px)
  pointer-events: none

.section-leave-active
  transition: 0.3s ease

.section-move
  transition: 0.3s ease

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
