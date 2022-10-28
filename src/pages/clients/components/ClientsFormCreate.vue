<template lang="pug">
  .wrapper-create.flex.flex-col.absolute.top-28.right-0.px-4.py-7.gap-y-8
    .icon-cancel.close.absolute.top-5.right-5.cursor-pointer(@click="closeForm")
    span.title.text-xl.font-bold.px-4 Создание клиента
    .flex.gap-x-4.h-fit.px-4
      .flex.gap-x-3.w-full
        .export-avatar.cursor-pointer.flex.justify-center.items-center
          .icon-download.text-xl
        base-input(v-model:value="infoClient.basic.full_name" placeholder="ФИО*" :width-input="326" )
        base-select(:list-data="priorityList" :option-data="getPriorityOption" :width-select="176" :for-networks="false" :style-border="true" :choose-option="chooseOptionSelect")
    .flex.flex-col.flex-auto.l.gap-y-8
      .flex.px-4
        button.title-info.px-6.py-2.cursor-pointer.w-full.text-sm(v-for="(info, index) in listInfoTitle" @click="(e) => selectTab(e)" :class="{active:info.active}" :key="index" :id="info.title") {{info.title}}
      .flex(:style="{display :'block'}" ref="basic")
        form-create-basic-info( :basic-info="infoClient.basic" :phone="infoClient.phone" :email="infoClient.email" :add-network="addNewNetwork" :save-client="saveClient" :choose-option="chooseOptionNetworks")
      .flex(:style="{display :'none'}" ref="doc")
        form-create-identity-documents(:identity-document="infoClient.pass" :save-client="saveClient")
      .flex(:style="{display :'none'}" ref="addresses")
        form-create-addresses(:addresses="infoClient.addresses" :save-file="saveDocFile" :save-client="saveClient")
      .flex(:style="{display :'none'}" ref="additional")
        form-create-additional(:additional-info="infoClient.additional" :add-new-additional="addNewAdditionalInfo" :save-file="saveAdditionalFiles" :save-client="saveClient")
</template>

<script>
import { column } from "@/pages/clients/utils/tableConfig";
import FormCreateBasicInfo from "@/pages/clients/components/FormCreateBasicInfo";
import FormCreateIdentityDocuments from "@/pages/clients/components/FormCreateIdentityDocuments";
import FormCreateAddresses from "@/pages/clients/components/FormCreateAddresses";
import FormCreateAdditional from "@/pages/clients/components/FormCreateAdditional";
import BaseInput from "@/components/base/BaseInput";
import BaseSelect from "@/components/base/BaseSelect";
export default {
  name: "ClientsFormCreate",
  components: {
    BaseInput,
    BaseSelect,
    FormCreateBasicInfo,
    FormCreateIdentityDocuments,
    FormCreateAddresses,
    FormCreateAdditional,
  },
  props: {
    closeForm: Function,
  },
  data() {
    return {
      prioritySettings: column.find((el) => el.name === "priority"),
      infoClient: {
        basic: {
          full_name: "",
          birth_date: "",
          priority: null,
          contacts: [
            {
              id: "network",
              kind: "",
              username: "",
            },
          ],
        },
        phone: {
          kind: "PHONE",
          username: "",
        },
        email: {
          kind: "EMAIL",
          username: "",
        },
        pass: {
          kind: "Паспорт",
          numba: "",
          issued_by_org: "",
          issued_by_date: "",
          issued_by_org_code: "",
        },
        addresses: {
          actualPlace: "",
          registrationPlace: "",
        },
        doc: {},
        additional: [
          {
            id: "add",
            header: "",
            description: "",
            file: {},
          },
        ],
      },
      listInfoTitle: [
        {
          title: "Основное",
          key: "basic",
          active: true,
        },
        {
          title: "Документы",
          key: "doc",
          active: false,
        },
        {
          title: "Адреса",
          key: "addresses",
          active: false,
        },
        {
          title: "Дополнительное",
          key: "additional",
          active: false,
        },
      ],
      priorityOption: "Приоритет",
      priorityList: ["Высокий", "Средний", "Низкий", "-"],
    };
  },
  computed: {
    getPriorityOption() {
      return this.prioritySettings.settings.find(
        (el) => el.priority === this.infoClient.basic.priority
      ).text;
    },
  },
  methods: {
    postNewClient() {
      fetch("http://45.84.227.122:8080/general/person/create/", {
        method: "POST",
        headers: {
          Accept: "text/html; q=1.0, */*",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          full_name: this.infoClient.basic.full_name,
          birth_date: this.infoClient.basic.birth_date,
        }),
      });
    },
    chooseOptionSelect(e) {
      this.infoClient.basic.priority = this.prioritySettings.settings.find(
        (el) => el.text === e.target.id
      ).priority;
    },
    chooseOptionNetworks() {},
    saveClient() {
      this.postNewClient();
    },
    saveDocFile(e) {
      this.infoClient.doc = e.target.files;
    },
    saveAdditionalFiles(e) {
      this.infoClient.additional.find((el) => el.id === e.target.id).file =
        e.target.file;
    },
    addNewAdditionalInfo() {
      this.infoClient.additional.push({
        id:
          this.infoClient.additional[0].id + this.infoClient.additional.length,
        header: "",
        description: "",
        file: {},
      });
    },
    addNewNetwork() {
      this.infoClient.basic.contacts.push({
        id:
          this.infoClient.basic.contacts[0].id +
          this.infoClient.basic.contacts.length,
        kind: "",
        username: "",
      });
    },
    selectTab(event) {
      this.listInfoTitle.forEach((el) => {
        if (el.title === event.target.id) {
          el.active = true;
          this.$refs[el.key].style.display = "block";
        } else {
          el.active = false;
          this.$refs[el.key].style.display = "none";
        }
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper-create
  z-index: 1
  background-color: var(--default-white)
  border-radius: 4px
  width: 634px
  min-height: 700px
  box-shadow: var(--default-shadow)
.title
  color: var(--font-dark-blue-color)
.export-avatar
  width: 40px
  height: 40px
  border-radius: 50%
  background-color: var(--bg-btn-icons-color)
  color: var(--btn-blue-color)
  &:hover
    color: var(--default-white)
    background-color: var(--btn-blue-color)
.title-info
  color: var(--font-grey-color)
  border-bottom: 1.5px solid var(--font-grey-color)
  &:hover
    color: var(--btn-blue-color)
    border-bottom: 1.5px solid var(--btn-blue-color)
  &.active
    color: var(--btn-blue-color)
    border-bottom: 1.5px solid var(--btn-blue-color)
</style>
