<template lang="pug">
  .wrapper.flex.relative
    .row-overlay.flex.justify-center.items-center.gap-x-2.text-base(
      v-if="rowOverlay",
    )
      button.recover-btn(@click="stopTimer") Восстановить
      .countdown 0:{{ countdown }}
    .row-wrapper.flex.flex-col.w-full(:class="closedDetail")
      .row-body.flex.w-full.cursor-pointer(
        :id="id",
        @click="(e) => openDetailInfo(e)",
        :class="{'row-overlay-color': rowOverlay}"
      )
        .flex.items-center.px-2(
          v-show="!isOpenChange",
          :tabindex="1",
          @click="(e) => openPopup(e)",
          @blur="handleUnFocusPopup"
        )
          .relative.dots-button.icon-dots.cursor-pointer.leading-6.text-center
            clients-action-popup(
              v-if="isOpenPopup",
              :open-change-data="openChangeData",
              :disabled-delete="!!deletedClientId && !rowOverlay",
              @delete-client="transmitDeleteClient",
              :create-medical-card="createMedicalCard"
            )
        .dots.flex.justify-center.items-center(v-if="!rowOverlay")
          .flex.z-10(v-if="isOpenChange", class="pl-[10px]")
            base-button(
              @click="closeChangeData",
              confirm,
              rounded,
              outlined,
              :size="20"
            )
              .icon-ok.text-xsm(class="pt-[3px]")
        //- .check-box.flex.justify-center.items-center(
        //-   :class="{'row-opacity': rowOverlay}"
        //- )
        //-   clients-table-checkbox(
        //-     :id="id",
        //-     :check="check",
        //-     :is-check="isCheck"
        //-   )
        table-cell-body-name(
          :class="{'row-opacity': rowOverlay}"
          :value="dataClient",
          :avatar="dataClient.avatar",
          :avatar-color="dataClient.color",
          :photo="dataClient.photo",
          :url="url",
          :is-open-change="isOpenChange",
          :width="columnBody.find(el => el.name === 'fullName').width"
        )
        table-cell-body-age(
          v-if="!rowOverlay",
          :value="dataClient",
          :is-open-change="isOpenChange",
          :width="columnBody.find(el => el.name === 'age').width"
        )
        table-cell-body-priority(
          v-if="!rowOverlay",
          :value="dataClient",
          :choose-priority="choosePriority",
          :is-open-change="isOpenChange",
          :width="columnBody.find(el => el.name === 'priority').width"
        )
        table-cell-body-phone(
          v-if="!rowOverlay",
          :value="dataClient",
          :is-open-change="isOpenChange",
          :width="columnBody.find(el => el.name === 'phone').width"
        )
        table-cell-body-email(
          v-if="!rowOverlay",
          :value="dataClient",
          :is-open-change="isOpenChange",
          :width="columnBody.find(el => el.name === 'email').width"
        )
        table-cell-body-networks(
          v-if="!rowOverlay",
          :delete-network="deleteNetwork",
          :add-network="addNetwork",
          :networks="dataClient.contacts",
          :is-open-change="isOpenChange",
          :width="columnBody.find(el => el.name === 'networks').width"
        )
      client-detail-info-wrapper.detail.px-52px(
        :class="{'pb-[30px] pt-4': isOpenDetailInfo}"
        :data-address="dataAddress",
        :data-detail="dataDetail",
        :data-attachments="dataAttachments",
        :data-document="dataIdentityDocument",
        :save-new-doc="saveNewDoc",
        :delete-doc="deleteDoc",
        :update-document="postUpdateIdentityDocument",
        :update-address="postUpdateAddress",
        :lack-data="lackData",
        :lack-address="lackAddress",
        :dope-address="dopeAddress",
        :lack-attachments="lackAttachments",
        :create-address="postCreateAddress",
        :create-document="postCreateIdentityDocument",
        :address-id="addressId",
        :doc-id="docId",
      )
</template>

<script>
import TableCellBodyMeeting from "@/pages/clients/components/cells/TableCellBodyMeeting";
import TableCellBodyNetworks from "@/pages/clients/components/cells/TableCellBodyNetworks";
import TableCellBodyEmail from "@/pages/clients/components/cells/TableCellBodyEmail";
import TableCellBodyPhone from "@/pages/clients/components/cells/TableCellBodyPhone";
import TableCellBodyPriority from "@/pages/clients/components/cells/TableCellBodyPriority";
import TableCellBodyJobTitle from "@/pages/clients/components/cells/TableCellBodyJobTitle";
import TableCellBodyAge from "@/pages/clients/components/cells/TableCellBodyAge";
import TableCellBodyName from "@/pages/clients/components/cells/TableCellBodyName";
import ClientsActionPopup from "@/pages/clients/components/ClientsActionPopup";
import ClientsTableCheckbox from "@/pages/clients/components/ClientsTableCheckbox";
import ClientDetailInfoWrapper from "@/pages/clients/components/ClientDetailInfoWrapper";
import BaseButton from "@/components/base/BaseButton";
import BaseModal from "@/components/base/BaseModal";
import { fetchWrapper } from "@/shared/fetchWrapper";
import { column } from "@/pages/clients/utils/tableConfig";
import TheNotificationProvider from "@/components/Notifications/TheNotificationProvider";
import { addNotification } from "@/components/Notifications/notificationContext";
import * as moment from "moment";

export default {
  name: "ClientsTableRow",
  components: {
    BaseButton,
    BaseModal,
    ClientsTableCheckbox,
    ClientsActionPopup,
    TableCellBodyName,
    TableCellBodyAge,
    TableCellBodyJobTitle,
    TableCellBodyPriority,
    TableCellBodyPhone,
    TableCellBodyEmail,
    TableCellBodyNetworks,
    TableCellBodyMeeting,
    ClientDetailInfoWrapper,
    TheNotificationProvider,
  },
  data() {
    return {
      dataIdentityDocument: {},
      dataAddress: {},
      dataAttachments: [
        {
          initialization: true,
        },
      ],
      dataDetail: {},
      isOpenDetailInfo: false,
      isOpenPopup: false,
      columnBody: column,
      prioritySettings: column.find((el) => el.name === "priority"),
      isOpenChange: false,
      dataClient: {},
      docId: "",
      addressId: "",
      lackData: true,
      lackAddress: true,
      lackAttachments: true,
      dopeAddress: {
        city: "",
        region: "",
        street: "",
        house: "",
        flat: "",
        index: "",
      },
      timer: null,
      countdown: 0,
    };
  },
  props: {
    id: String,
    check: Function,
    isCheck: Boolean,
    client: Object,
    deletedClientId: String,
    updateDataClient: Function,
    url: String,
    fetchDataClients: Function,
    createMedicalCard: Function,
  },
  computed: {
    rowOverlay() {
      return this.deletedClientId === this.client.id;
    },
    closedDetail() {
      return {
        "closed-detail": !this.isOpenDetailInfo,
      };
    },
  },
  methods: {
    stopTimer() {
      if (this.countdown !== 0) this.countdown = 0;
      this.$emit("recover-client");
      clearInterval(this.timer);
      this.timer = null;
    },
    startTimer() {
      this.countdown = 30;
      this.timer = setInterval(() => {
        this.changeCountdown();
      }, 1000);
    },
    changeCountdown() {
      if (this.countdown === 0) {
        this.deleteClient().then(() => {
          this.updateDataClient();
          this.stopTimer();
        });
      } else {
        this.countdown -= 1;
      }
    },
    postUpdateClient() {
      let foundElement = this.prioritySettings.settings.find(
        (el) => el.text === this.dataClient.priority
      );
      let data = {};
      let clientName = `${this.client.last_name || ""} ${
        this.client.first_name || ""
      } ${this.client.patronymic || ""}`;

      if (!this.dataClient.fullName) this.dataClient.fullName = clientName;
      else if (this.dataClient.fullName !== clientName)
        data.full_name = this.dataClient.fullName;

      if (this.dataClient.age !== this.client.birth_date && this.dataClient.age)
        data.birth_date = this.dataClient.age;
      else if (!this.dataClient.age && this.client.birth_date) {
        this.addErrorNotification(
          "Некорректная дата рождения",
          "Пожалуйста, введите дату рождения корректно"
        );
        this.dataClient.age = this.client.birth_date || "";
      }
      if (foundElement.id !== this.client.priority)
        data.priority = foundElement.id;
      if (
        data.birth_date &&
        moment(data.birth_date).isAfter(moment().format("YYYY-MM-DD"))
      ) {
        this.addErrorNotification(
          "Некорректная дата рождения",
          "Дата рождения позже текущего дня"
        );
        this.dataClient.age = this.client.birth_date || "";
      } else if (!Object.keys(data).length == 0)
        fetchWrapper
          .post(`general/person/${this.client.id}/update/`, {
            ...data,
          })
          .then(() => this.fetchDataClients());
    },
    postContactsClient() {
      let contacts = [...this.dataClient.contacts];
      if (
        this.dataClient.email.username &&
        !contacts.find((el) => el.kind === "EMAIL")
      )
        contacts.push(this.dataClient.email);
      if (
        this.dataClient.phone.username &&
        !contacts.find((el) => el.kind === "PHONE")
      )
        contacts.push(this.dataClient.phone);
      let mapCreateContacts = this.client.contacts.map((el) => el.kind);
      let mapDeleteContacts = contacts.map((el) => el.kind);
      let createContacts = contacts.filter((el) =>
        el.kind === "EMAIL" || el.kind === "PHONE"
          ? !mapCreateContacts.includes(el.kind)
          : el.kind
      );
      let deleteContacts = this.client.contacts.filter(
        (el) => !mapDeleteContacts.includes(el.kind)
      );
      let updateContacts = [];
      this.client.contacts.forEach((el) => {
        if (
          el.kind === "PHONE" &&
          el.username !== this.dataClient.phone.username
        )
          updateContacts.push(this.dataClient.phone);
        if (
          el.kind === "EMAIL" &&
          el.username !== this.dataClient.email.username
        )
          updateContacts.push(this.dataClient.email);
      });
      createContacts.forEach((el) => {
        if (!el.id) this.postCreateContact(el);
      });
      deleteContacts.forEach((el) => this.postDeleteContact(el));
      updateContacts.forEach((el) => this.postUpdateContact(el));
    },
    postCreateContact(contact) {
      fetchWrapper
        .post("general/contact/create/", {
          kind: contact.kind,
          username: contact.username,
          person_id: this.client.id,
        })
        .then(() => this.fetchDataClients());
    },
    postUpdateContact(contact) {
      fetchWrapper
        .post(`general/contact/${contact.id}/update/`, {
          kind: contact.kind,
          username: contact.username,
          person_id: this.client.id,
        })
        .then(() => this.fetchDataClients());
    },
    postDeleteContact(contact) {
      fetchWrapper
        .del(`general/contact/${contact.id}/delete/`)
        .then(() => this.fetchDataClients());
    },
    addNetwork(network) {
      this.dataClient.contacts.push(network);
    },
    deleteNetwork(e) {
      this.dataClient.contacts = this.dataClient.contacts.filter(
        (el) => el.kind !== e.target.id
      );
    },
    choosePriority(e) {
      this.dataClient.priority = this.columnBody
        .find((el) => el.name === "priority")
        ["settings"].find((el) => el.text === e.target.id).priority;
    },
    closeChangeData(e) {
      e.stopPropagation();
      this.isOpenChange = false;
      this.postUpdateClient();
      this.postContactsClient();
    },
    openChangeData() {
      this.isOpenChange = true;
    },
    transmitDeleteClient() {
      this.isOpenDetailInfo = false;
      this.$emit("delete-client", this.client.id);
    },
    async deleteClient() {
      await fetchWrapper.del(`general/person/${this.client.id}/delete/`);
      this.addSuccessNotification("Клиент успешно удален", "");
      this.handleUnFocusPopup();
    },
    addSuccessNotification(title, message) {
      addNotification(new Date().getTime(), title, message, "success", 5000);
    },
    addErrorNotification(title, message) {
      addNotification(title, title, message, "error", 5000);
    },
    fetchClientDetail(id) {
      fetchWrapper
        .get(`general/person/${id}/detail/`)
        .then((data) => this.saveClientDetail(data));
      this.fetchAttachment();
    },
    saveClientDetail(data) {
      this.saveIdentityDocument(
        data.identity_documents.find(
          (el) => el.kind === "Паспорт" || el.kind === "PASSPORT"
        )
      );
      this.saveAddress(data.address[0]);
    },
    fetchAttachment() {
      fetchWrapper
        .get("general/attachment/?limit=1000")
        .then((data) => this.saveAttachment(data.results));
    },
    saveAttachment(data) {
      this.dataAttachments = data.filter((e) => e.person_id.id === this.id);
      this.lackAttachments = this.dataAttachments[0]?.id ? true : false;
    },
    saveIdentityDocument(data) {
      if (data?.id) {
        this.docId = data.id;
        this.dataIdentityDocument = {
          numba:
            data.series && data.numba ? data?.series + " " + data?.numba : "",
          issued_by_org: data.issued_by_org ? data?.issued_by_org : "",
          issued_by_org_code: data.issued_by_org_code
            ? data?.issued_by_org_code
            : "",
          issued_by_date: data.issued_by_date ? data?.issued_by_date : "",
        };
        this.lackData = true;
      } else {
        this.lackData = false;
        this.dataIdentityDocument = {
          numba: "",
          issued_by_org: "",
          issued_by_org_code: "",
          issued_by_date: "",
        };
      }
    },
    postUpdateIdentityDocument() {
      fetchWrapper
        .post(`general/identity_document/${this.docId}/update/`, {
          kind: "PASSPORT",
          series_number: this.dataIdentityDocument.numba,
          issued_by_org: this.dataIdentityDocument.issued_by_org,
          issued_by_org_code: this.dataIdentityDocument.issued_by_org_code,
          issued_by_date: this.dataIdentityDocument.issued_by_date,
        })
        .then((response) => {
          this.fetchClientDetail(this.id);
          if (response.type) {
            if (response.errors[0].code === "blank")
              this.addErrorNotification(
                "Ошибка редактрирования ДУЛ",
                "Часть паспортных данных не заполнена"
              );
            if (response.errors[0].code === "Ошибка редактрирования ДУЛ")
              this.addErrorNotification(
                response.errors[0].code,
                response.errors[0].detail
              );
            if (response?.errors[0].code === "invalid")
              this.addErrorNotification(
                "Ошибка редактрирования ДУЛ",
                "Дата выдачи паспорта не заполнена"
              );
          } else this.addSuccessNotification("Изменения успешно сохранены", "");
        });
    },
    saveAddress(data) {
      this.addressId = data?.id;
      if (data?.full_address) {
        this.dataAddress = {
          full_address: data.full_address,
        };
        this.lackAddress = true;
      } else {
        this.lackAddress = false;
        this.dataAddress = {
          full_address: "",
        };
      }
    },
    mergeFullAddress() {
      if (
        this.dopeAddress.region &&
        this.dopeAddress.city &&
        this.dopeAddress.street &&
        this.dopeAddress.house
      ) {
        return `${this.dopeAddress.index}, ${this.dopeAddress.region} обл., г.${this.dopeAddress.city}, ул.${this.dopeAddress.street}, д.${this.dopeAddress.house}, кв.${this.dopeAddress.flat}`;
      }
    },
    clearAddress() {
      this.dopeAddress = {
        city: "",
        region: "",
        street: "",
        flat: "",
        house: "",
        index: "",
      };
    },
    postUpdateAddress() {
      fetchWrapper
        .post(`general/address/${this.addressId}/update/`, {
          full_address:
            this.mergeFullAddress() || this.dataAddress.full_address,
        })
        .then((response) => {
          this.fetchClientDetail(this.id);
          if (response.type && response.errors[0].code === "blank")
            this.addErrorNotification(
              "Ошибка именения адреса",
              "Полный адрес не заполнен"
            );
          else this.addSuccessNotification("Изменения успешно сохранены", "");
        });
      this.clearAddress();
    },
    openPopup(e) {
      e.target.focus();
      e.stopPropagation();
      this.isOpenPopup = !this.isOpenPopup;
    },
    openDetailInfo(e) {
      this.isOpenDetailInfo = !this.isOpenDetailInfo;
      this.isOpenDetailInfo && this.fetchClientDetail(e.currentTarget.id);
    },
    handleUnFocusPopup() {
      this.isOpenPopup = false;
    },
    saveNewDoc(data) {
      this.dataAttachments = [...data];
      const formData = new FormData();
      this.dataAttachments.forEach((e) => {
        formData.append("person_id", this.id);
        formData.append("document", e);
        formData.append("title", e.name.substr(0, e.name.lastIndexOf(".")));
        fetchWrapper
          .post("general/attachment/create/", formData, "formData")
          .then(() => this.fetchClientDetail(this.id));
      });
    },
    deleteDoc(attachmentId) {
      fetchWrapper
        .del(`general/attachment/${attachmentId}/delete/`)
        .then(() => this.fetchClientDetail(this.id));
    },
    postCreateAddress() {
      fetchWrapper
        .post("general/address/create/", {
          person_id: this.id,
          full_address:
            this.mergeFullAddress() || this.dataAddress.full_address,
        })
        .then((response) => {
          this.fetchClientDetail(this.id);
          if (response.type && response.errors[0].code === "blank")
            this.addErrorNotification(
              "Ошибка создания адреса",
              "Полный адрес не заполнен"
            );
          else this.addSuccessNotification("Полный адрес успешно создан", "");
        });
    },
    postCreateIdentityDocument() {
      fetchWrapper
        .post("general/identity_document/create/", {
          person_id: this.id,
          kind: "PASSPORT",
          series_number: this.dataIdentityDocument.numba,
          issued_by_org: this.dataIdentityDocument.issued_by_org,
          issued_by_org_code: this.dataIdentityDocument.issued_by_org_code,
          issued_by_date: this.dataIdentityDocument.issued_by_date,
        })
        .then((response) => {
          this.fetchClientDetail(this.id);
          if (response.type) {
            if (response.errors[0].code === "blank")
              this.addErrorNotification(
                "Ошибка создания ДУЛ",
                "Часть паспортных данных не заполнена"
              );
            if (response.errors[0].code === "Ошибка создания ДУЛ")
              this.addErrorNotification(
                response.errors[0].code,
                response.errors[0].detail
              );
            if (response.errors[0].code === "invalid")
              this.addErrorNotification(
                "Ошибка создания ДУЛ",
                "Дата выдачи паспорта не заполнена"
              );
          } else
            this.addSuccessNotification(
              "Паспортные данные успешно созданы",
              ""
            );
        });
    },
  },
  watch: {
    rowOverlay() {
      if (this.rowOverlay) this.startTimer();
    },
    client: {
      deep: true,
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.dataClient = {
            id: this.client.id,
            fullName: `${this.client.last_name || ""} ${
              this.client.first_name || ""
            } ${this.client.patronymic || ""}`,
            age: this.client.birth_date || "",
            priority: this.prioritySettings.settings.find(
              (el) =>
                el.priority === this.client.priority ||
                this.client.priority === el.id
            ).text,
            phone: {
              id:
                this.client.contacts.find((el) => el.kind === "PHONE")?.id ||
                "",
              kind: "PHONE",
              username:
                this.client.contacts.find((el) => el.kind === "PHONE")
                  ?.username || "",
            },
            email: {
              id:
                this.client.contacts.find((el) => el.kind === "EMAIL")?.id ||
                "",
              kind: "EMAIL",
              username:
                this.client.contacts.find((el) => el.kind === "EMAIL")
                  ?.username || "",
            },
            contacts: this.client.contacts.filter(
              (el) =>
                !el.deleted_flg && el.kind !== "EMAIL" && el.kind !== "PHONE"
            ),
            avatar: this.client.first_name
              ? this.client.last_name[0] + this.client.first_name[0]
              : this.client.last_name.substr(0, 2),
            color: this.client.color,
            photo: this.client.photo,
          };
        }
      },
    },
  },
  beforeUnmount() {
    if (this.timer) {
      this.deleteClient();
      this.stopTimer();
    }
  },
};
</script>

<style lang="sass" scoped>
.row-wrapper
  border-bottom: 1px solid var(--border-light-grey-color)
  min-width: 1556px
.row-wrapper:hover
  background-color: var(--bg-hover-row-table)
.row-body
  color: var(--font-dark-blue-color)
  min-height: 56px
.check-box
  min-width: 36px
.dots
  min-width: 14px
.dots-button
  width: 20px
  height: 20px
  border-radius: 50%
  color: var(--font-grey-color)
  &:hover
    background-color: var(--btn-blue-color)
    color: var(--default-white)
.row-opacity
  opacity: 0.5
.row-overlay
  background: transparent
  position: absolute
  z-index: 10
  width: 100%
  height: 100%
.row-overlay-color
  background: var(--row-overlay-color)
.recover-btn
  color: var(--btn-blue-color)
.countdown
  color: var(--font-grey-color )
.detail
  max-height: 560px
  transition: 0.3s ease all
  overflow: hidden
.closed-detail .detail
  max-height: 0
</style>
