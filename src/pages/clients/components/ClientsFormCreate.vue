<template lang="pug">
  .wrapper.flex.flex-col.absolute.top-28.right-0.px-8.py-7.gap-y-8
    .icon-cancel.close.absolute.top-5.right-5.cursor-pointer(@click="closeForm")
    span.title.text-xl.font-bold Создание клиента
    .flex.gap-x-4.h-fit
      .flex.gap-x-3.w-full
        .export-avatar.cursor-pointer.flex.justify-center.items-center
          img.icon-download(src="@/assets/icons/download.svg" alt="Download")
        base-input(v-model:value="infoClient.fullName" placeholder="ФИО*" :width-input="326" )
      base-select(:list-data="priorityList" :option-data="priorityOption" :width-select="176" :style-border="true" :choose-option="chooseOptionSelect")
    .flex.flex-col.flex-auto.l.gap-y-8
      .flex
        button.title-info.px-6.py-2.cursor-pointer(v-for="(info, index) in infoTitleArray" @click="(e) => selectTab(e)" :class="{active:info.active}" :key="index" :id="info.title") {{info.title}}
      .flex(:style="{display :'block'}" ref="basic")
        form-create-basic-info( :basic-info="infoClient.basicInfo" :add-network="addNewNetwork" :save-client="saveClient")
      .flex(:style="{display :'none'}" ref="secondary")
        form-create-secondary-info(:secondary-info="infoClient.secondaryInfo" :save-client="saveClient")
      .flex(:style="{display :'none'}" ref="doc")
        form-create-doc(:doc="infoClient.doc" :save-file="saveDocFile" :save-client="saveClient")
      .flex(:style="{display :'none'}" ref="additional")
        form-create-additional(:additional-info="infoClient.additional" :add-new-additional="addNewAdditionalInfo" :save-file="saveAdditionalFiles" :save-client="saveClient")
</template>

<script>
import FormCreateBasicInfo from "@/pages/clients/components/FormCreateBasicInfo";
import FormCreateSecondaryInfo from "@/pages/clients/components/FormCreateSecondaryInfo";
import FormCreateDoc from "@/pages/clients/components/FormCreateDoc";
import FormCreateAdditional from "@/pages/clients/components/FormCreateAdditional";
import BaseInput from "@/components/base/BaseInput";
import BaseSelect from "@/components/base/BaseSelect";
export default {
  name: "ClientsFormCreate",
  components: {
    BaseInput,
    BaseSelect,
    FormCreateBasicInfo,
    FormCreateSecondaryInfo,
    FormCreateDoc,
    FormCreateAdditional,
  },
  props: {
    closeForm: Function,
  },
  data() {
    return {
      name: "sdasdasd",
      infoClient: {
        fullName: "",
        priority: "",
        basicInfo: {
          age: "",
          jobTitle: "",
          number: "",
          email: "",
          networks: [
            {
              id: "network",
              network: "",
            },
          ],
        },
        secondaryInfo: {
          pass: {
            number: "",
            issuedBy: "",
            divisionCode: "",
            dateIssue: "",
          },
          snilsInn: {
            inn: "",
            snils: "",
          },
          dates: {
            birthday: "",
          },
          addresses: {
            actualPlace: "",
            registrationPlace: "",
          },
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
      infoTitleArray: [
        {
          title: "Основное",
          key: "basic",
          active: true,
        },
        {
          title: "Вторичное",
          key: "secondary",
          active: false,
        },
        {
          title: "Документы",
          key: "doc",
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
  methods: {
    chooseOptionSelect(e) {
      this.priorityOption = this.priorityList[e.target.id];
      this.infoClient.priority = this.priorityList[e.target.id];
    },
    saveClient() {
      console.log(this.infoClient);
    },
    saveDocFile(e) {
      this.infoClient.doc = e.target.files;
    },
    saveAdditionalFiles(e) {
      console.log(e.target.id, e.target.files[0]);
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
      this.infoClient.basicInfo.networks.push({
        id:
          this.infoClient.basicInfo.networks[0].id +
          this.infoClient.basicInfo.networks.length,
        network: "",
      });
    },
    selectTab(event) {
      this.infoTitleArray.forEach((el) => {
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
.wrapper
  z-index: 1
  background-color: var(--default-white)
  width: fit-content
  border-radius: 4px
  min-width: 634px
  max-height: 700px
  min-height: 700px
  box-shadow: var(--default-shadow)
.title
  color: var(--font-dark-blue-color)
.icon-download
  width: 18px
  height: 18px
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
