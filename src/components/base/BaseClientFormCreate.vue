<template lang="pug">
  .wrapper-create.flex.flex-col.fixed.right-6.bottom-6.px-4.py-7.gap-y-8(
    v-click-outside="closeModal"
  )
    .icon-cancel.close.absolute.top-5.right-5.cursor-pointer(@click="closeForm")
    span.title.text-xl.font-bold.px-4 Создание клиента
    .flex.gap-x-4.h-fit.px-4
      .flex.gap-x-3.w-full
        base-button.relative(
          :rounded="true",
          :secondary="true",
          :size="40",
          @click="changeOpenPopup",
          v-for="img in image"
        )
          .icon-download.text-xl(v-if="img === defaultIcon")
          .wrapper-img.flex.w-10.h-10(v-else)
            img.current-avatar.object-cover(:src="img")
          base-popup.right-5.top-7(v-if="showPopup", v-click-outside="closePopup", :width="230")
            .flex.items-center.gap-x-2
              img(src="@/assets/icons/computer.svg")
              span.text-smm(@click="changeOpenModal") Загрузить с компьютера
            .flex.items-center.gap-x-2
              img(src="@/assets/icons/camera.svg")
              span.text-smm Сделать фото
          base-modal(v-model="showModal", title="Загрузить изображение")
            .flex.flex-col.items-center.justify-center(
              :style="{padding: '153px 370px'}"
              )
              .avatar-wrapper.flex.relative
                input.input(
                  type="file",
                  id="image-upload",
                  accept="image/*",
                  @change="(e) => previewImages(e)"
                )
                .avatar.flex.absolute.items-center.gap-x-6(v-for="img in image")
                  img.avatar.object-cover(for="image-upload", :src="img", v-if="img")
                  base-button(:rounded="true", :size="48", @click="closeAddImage")
                    .icon-ok
        base-input.w-full(v-model:value="infoClient.basic.full_name" placeholder="ФИО*")
    .flex.flex-col.flex-auto.l.gap-y-8
      .flex.px-4
        button.title-info.px-6.py-2.cursor-pointer.w-full.text-sm(
          v-for="info in listInfoTitle",
          @click="(e) => selectTab(e)",
          :class="{active:info.active}",
          :key="info.key" :id="info.key"
        ) {{info.title}}
      .flex(:style="{display :'block'}" ref="basic")
        form-create-basic-info(
          :basic-info="infoClient.basic"
          :phone="infoClient.phone"
          :email="infoClient.email"
          :save-network-id="saveNetworkId"
          :add-network="addNewNetwork"
          :save-client="saveClient"
          :choose-option="chooseOptionNetworks"
          :choose-priority="choosePriority"
          :priority-list="priorityList"
        )
      .flex(:style="{display :'none'}" ref="doc")
        form-create-identity-documents(
          :identity-document="infoClient.identity_document",
          :save-client="saveClient"
        )
      .flex(:style="{display :'none'}" ref="address")
        form-create-addresses(
          :addresses="infoClient.addresses",
          :save-file="saveDocFile",
          :save-client="saveClient"
        )
      .flex(:style="{display :'none'}" ref="additional")
        form-create-additional(
          :additional-info="infoClient.additional",
          :add-new-additional="addNewAdditionalInfo",
          :save-file="saveAdditionalFiles",
          :save-client="saveClient"
        )
</template>

<script>
import { column } from "@/pages/clients/utils/tableConfig";
import { fetchWrapper } from "@/shared/fetchWrapper";
import FormCreateBasicInfo from "@/pages/clients/components/FormCreateBasicInfo";
import FormCreateIdentityDocuments from "@/pages/clients/components/FormCreateIdentityDocuments";
import FormCreateAddresses from "@/pages/clients/components/FormCreateAddresses";
import FormCreateAdditional from "@/pages/clients/components/FormCreateAdditional";
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";
import BasePopup from "@/components/base/BasePopup";
import BaseModal from "@/components/base/BaseModal";
import addImageIcon from "@/assets/icons/photo.svg";
import TheNotificationProvider from "@/components/Notifications/TheNotificationProvider";
import { addNotification } from "@/components/Notifications/notificationContext";
import * as moment from "moment";
export default {
  name: "BaseClientFormClient",
  components: {
    BaseInput,
    FormCreateBasicInfo,
    FormCreateIdentityDocuments,
    FormCreateAddresses,
    FormCreateAdditional,
    BaseButton,
    BasePopup,
    BaseModal,
    addImageIcon,
    TheNotificationProvider,
  },
  props: {
    closeForm: Function,
    setUpdatedClients: Function,
    writeCreatedClientId: Function,
  },
  data() {
    return {
      networksSettings: column.find((el) => el.name === "networks"),
      prioritySettings: column.find((el) => el.name === "priority"),
      networkId: "",
      infoClient: {
        basic: {
          full_name: "",
          birth_date: "",
          priority: {
            id: null,
            label: "",
          },
          contacts: [
            {
              id: "network",
              kind: "TELEGRAM",
              username: "",
              icon: "icon-tg",
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
        identity_document: {
          pass: {
            series_number: "",
            issued_by_org: "",
            issued_by_date: "",
            issued_by_org_code: "",
          },
          snils: {
            kind: "СНИЛС",
            numba: "",
          },
          inn: {
            kind: "ИНН",
            numba: "",
          },
        },
        addresses: {
          full_address: "",
          region: "",
          city: "",
          street: "",
          house_number: "",
          apartment_number: "",
          zip_code: "",
        },
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
          title: "ДУЛ",
          key: "doc",
          active: false,
        },
        {
          title: "Адрес",
          key: "address",
          active: false,
        },
      ],
      priorityList: [
        {
          id: 1,
          label: "Высокий",
        },
        {
          id: 2,
          label: "Средний",
        },
        {
          id: 3,
          label: "Низкий",
        },
        {
          id: 4,
          label: "-",
        },
      ],
      defaultIcon: addImageIcon,
      showModal: false,
      showPopup: false,
      image: [addImageIcon],
      imageData: [],
    };
  },
  computed: {
    getPriorityList() {
      return this.prioritySettings.settings.map((el) => {
        return { label: el.text, id: el.id };
      });
    },
  },
  methods: {
    previewImages(event) {
      this.image = [];
      var pictures = event.target.files;
      for (var i = 0; i < pictures.length; i++) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.image.push(e.target.result);
        };
        reader.readAsDataURL(pictures[i]);
      }
      this.imageData = [...this.imageData, ...event.target.files];
    },
    closeAddImage() {
      this.showModal = false;
      this.showPopup = false;
    },
    closePopup() {
      this.showPopup = false;
    },
    closeModal() {
      !this.showModal ? this.closeForm() : null;
    },
    createIdentityDocument(id) {
      let filteredData = Object.keys(
        this.filterDataEmptyProperty(this.infoClient.identity_document.pass)
      );
      if (filteredData.length > 0) {
        if (filteredData.length < 4) {
          this.addErrorNotification(
            "Паспортные данные заполнены не полностью",
            "Паспортные данные не будут записаны в профиль клиента"
          );
        } else if (
          moment(this.infoClient.identity_document.pass.issued_by_date).isAfter(
            moment().format("YYYY-MM-DD")
          )
        ) {
          this.addErrorNotification(
            "Некорректная дата выдачи паспорта",
            "Паспортные данные не будут записаны в профиль клиента"
          );
        } else
          fetchWrapper.post("general/identity_document/create/", {
            ...this.filterDataEmptyProperty(
              this.infoClient.identity_document.pass
            ),
            person_id: id,
            kind: "Паспорт",
          });
      }
    },
    createAddress(id) {
      Object.keys(this.filterDataEmptyProperty(this.infoClient.addresses))
        .length > 0 &&
        fetchWrapper.post("general/address/create/", {
          ...this.filterDataEmptyProperty(this.infoClient.addresses),
          person_id: id,
        });
    },
    createContacts(id) {
      if (this.infoClient.phone.username)
        fetchWrapper.post("general/contact/create/", {
          ...this.filterDataEmptyProperty(this.infoClient.phone),
          person_id: id,
        });
      if (this.infoClient.email.username)
        fetchWrapper.post("general/contact/create/", {
          ...this.filterDataEmptyProperty(this.infoClient.email),
          person_id: id,
        });
      this.infoClient.basic.contacts.forEach((el) => {
        if (el.username)
          fetchWrapper.post("general/contact/create/", {
            kind: el.kind,
            username: el.username,
            person_id: id,
          });
      });
    },
    postNewClient() {
      const formData = new FormData();
      formData.append("full_name", this.infoClient.basic.full_name);
      this.imageData.forEach((e) => {
        formData.append("photo", e);
      });
      if (this.infoClient.basic.birth_date)
        formData.append("birth_date", this.infoClient.basic.birth_date);
      let foundElement = this.prioritySettings.settings.find(
        (el) => el.priority === this.infoClient.basic.priority.id
      );
      if (foundElement.priority)
        formData.append("priority", foundElement.priority);
      fetchWrapper
        .post("general/person/create/", formData, "formData")
        .then((result) => {
          if (result.id) {
            this.createIdentityDocument(result.id);
            this.createAddress(result.id);
            this.createContacts(result.id);
            this.writeCreatedClientId(result.id);
            this.setUpdatedClients();
            this.addSuccessNotification();
          } else {
            this.addErrorNotification(
              "Клиент не создан",
              "Произошла ошибка сервера"
            );
          }
        });
    },
    filterDataEmptyProperty(data) {
      let postData = data;
      let keys = Object.keys(postData);
      keys.forEach((key) => {
        if (!postData[key]) {
          delete postData[key];
        }
      });
      return postData;
    },
    saveNetworkId(e) {
      this.networkId = e.currentTarget.id;
    },
    choosePriority(e) {
      this.infoClient.basic.priority = e.target.id;
    },
    chooseOptionNetworks(e) {
      let index = this.infoClient.basic.contacts.findIndex(
        (el) => el.id === this.networkId
      );
      let icon = this.networksSettings.settings.find(
        (el) => el.network === e.target.id
      ).icon;
      this.infoClient.basic.contacts[index].kind = e.target.id;
      this.infoClient.basic.contacts[index].icon = icon;
    },
    saveClient() {
      if (this.checkFormFullness()) {
        this.postNewClient();
        this.closeForm();
      }
    },
    changeOpenModal() {
      this.showModal = true;
      this.showPopup = false;
    },
    changeOpenPopup() {
      this.showPopup = true;
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
        kind: "TELEGRAM",
        username: "",
        icon: "icon-tg",
      });
    },
    selectTab(event) {
      this.listInfoTitle.forEach((el) => {
        if (el.key === event.target.id) {
          el.active = true;
          this.$refs[el.key].style.display = "block";
        } else {
          el.active = false;
          this.$refs[el.key].style.display = "none";
        }
      });
    },
    checkFormFullness() {
      if (!this.infoClient.basic.full_name) {
        this.addErrorNotification(
          "Не заполнено ФИО клиента",
          "Заполните ФИО клиента"
        );
        return false;
      } else if (
        this.infoClient.basic.birth_date &&
        moment(this.infoClient.basic.birth_date).isAfter(
          moment().format("YYYY-MM-DD")
        )
      ) {
        this.addErrorNotification(
          "Некорректная дата рождения",
          "Дата рождения позже текущего дня"
        );
        return false;
      } else if (
        this.infoClient.phone.username &&
        this.infoClient.phone.username.length < 18
      ) {
        this.addErrorNotification(
          "Некорректный номер телефона",
          "Введите мобильный номер, состоящий из 11 цифр"
        );
        return false;
      }
      return true;
    },
    addErrorNotification(title, message) {
      addNotification(title, title, message, "error", 5000);
    },
    addSuccessNotification() {
      addNotification(
        "Клиент успешно создан",
        "Клиент успешно создан",
        "",
        "success",
        5000
      );
    },
  },
  watch: {
    showModal: function () {
      if (this.showModal === false) {
        this.closeAddImage();
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.wrapper-create
  z-index: 5
  background-color: var(--default-white)
  border-radius: 4px
  width: 634px
  min-height: 585px
  box-shadow: var(--default-shadow)

.title
  color: var(--font-dark-blue-color)

.export-avatar
  min-width: 40px
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

.avatar-wrapper
  width: 400px
  height: 400px
  border-radius: 50%

.input
  width: 100%
  height: 100%
  border-radius: 50%
  z-index: 5
  opacity: 0
  cursor: pointer

.avatar
  height: 100%
  border-radius: 50%

.current-avatar
  cursor: pointer
  height: 100%
  border-radius: 50%
  background-size: cover
  background-repeat: no-repeat
  background-position: center
  &:hover
    display: none

.wrapper-img
  background-size: 20px
  background-repeat: no-repeat
  background-position: center
  background-image: url(@/assets/icons/download.svg)
</style>
