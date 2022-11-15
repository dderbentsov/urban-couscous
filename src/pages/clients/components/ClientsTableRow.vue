<template lang="pug">
  .row-wrapper.flex.flex-col.w-full
    .row-body.flex.w-full.cursor-pointer(
      :id="id",
      @click="(e) => openDetailInfo(e)"
    )
      .check-box.flex.justify-center.items-center
        clients-table-checkbox(
          :id="id",
          :check="check",
          :is-check="isCheck"
        )
      table-cell-body-name(
        :value="dataClient",
        :avatar="dataClient.avatar",
        :avatar-color="dataClient.color",
        :is-open-change="isOpenChange",
        :width="columnBody.find(el => el.name === 'fullName').width"
      )
      table-cell-body-age(
        :value="dataClient",
        :is-open-change="isOpenChange",
        :width="columnBody.find(el => el.name === 'age').width"
      )
      table-cell-body-priority(
        :value="dataClient.priority",
        :choose-priority="choosePriority",
        :is-open-change="isOpenChange",
        :width="columnBody.find(el => el.name === 'priority').width"
      )
      table-cell-body-phone(
        :value="dataClient",
        :is-open-change="isOpenChange",
        :width="columnBody.find(el => el.name === 'phone').width"
      )
      table-cell-body-email(
        :value="dataClient",
        :is-open-change="isOpenChange",
        :width="columnBody.find(el => el.name === 'email').width"
      )
      table-cell-body-networks(
        :delete-network="deleteNetwork",
        :add-network="addNetwork",
        :networks="dataClient.contacts",
        :is-open-change="isOpenChange",
        :width="columnBody.find(el => el.name === 'networks').width"
      )
      .dots.flex.justify-center.items-center
        base-button(
          v-if="isOpenChange",
          @click="closeChangeData",
          confirm,
          rounded,
          outlined,
          :size="20"
        )
          .icon-ok.text-xsm(class="pt-[3px]")
        .relative.dots-button.icon-dots.cursor-pointer.leading-6.text-center(
          v-show="!isOpenChange",
          :tabindex="1",
          @click="(e) => openPopup(e)",
          @blur="handleUnFocusPopup"
        )
          clients-action-popup(
            v-if="isOpenPopup",
            :open-change-data="openChangeData"
          )
    client-detail-info-wrapper(
      v-if="isOpenDetailInfo"
      :data-address="dataAddress"
      :data-detail="dataDetail"
      :data-attachments="dataAttachments"
      :data-document="dataIdentityDocument"
      :save-new-doc="saveNewDoc"
      :delete-doc="deleteDoc"
      :update-document="postUpdateIdentityDocument"
      :update-address="postUpdateAddress"
      :lack-data="lackData"
      :lack-address="lackAddress"
      :dope-address="dopeAddress"
      :create-address="postCreateAddress"
      :create-document="postCreateIdentityDocument"
      :address-id="addressId"
      :doc-id="docId"
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
import { fetchWrapper } from "@/shared/fetchWrapper";
import { column } from "@/pages/clients/utils/tableConfig";

export default {
  name: "ClientsTableRow",
  components: {
    BaseButton,
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
  },
  data() {
    return {
      dataIdentityDocument: {},
      dataAddress: {},
      dataAttachments: [],
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
      dopeAddress: {
        city: "",
        region: "",
        street: "",
        house: "",
        flat: "",
        index: "",
      },
    };
  },
  props: {
    id: String,
    check: Function,
    isCheck: Boolean,
    client: Object,
    fetchDataClients: Function,
  },
  created() {
    this.dataClient = {
      id: this.client.id,
      fullName: `${this.client.last_name || ""} ${
        this.client.first_name || ""
      } ${this.client.patronymic || ""}`,
      age: this.client.birth_date || "",
      priority: this.prioritySettings.settings.find(
        (el) => el.priority === this.client.priority
      ).text,
      phone: {
        id: this.client.contacts.find((el) => el.kind === "PHONE")?.id || "",
        kind: "PHONE",
        username:
          this.client.contacts.find((el) => el.kind === "PHONE")?.username ||
          "",
      },
      email: {
        id: this.client.contacts.find((el) => el.kind === "EMAIL")?.id || "",
        kind: "EMAIL",
        username:
          this.client.contacts.find((el) => el.kind === "EMAIL")?.username ||
          "",
      },
      contacts: [...this.client.contacts],
      avatar: `${this.client.last_name[0]}${this.client.first_name[0]}`,
      color: this.client.color,
    };
  },
  methods: {
    postUpdateClient() {
      fetchWrapper.post(`general/person/${this.client.id}/update/`, {
        full_name: this.dataClient.fullName,
        birth_date: this.dataClient.age,
        priority: this.dataClient.priority,
      });
    },
    postContactsClient() {
      let contacts = [...this.dataClient.contacts];
      if (
        this.dataClient.email.username &&
        !contacts.find((el) => el.kind === "EMAIL")
      ) {
        contacts.push(this.dataClient.email);
      }
      if (
        this.dataClient.phone.username &&
        !contacts.find((el) => el.kind === "PHONE")
      ) {
        contacts.push(this.dataClient.phone);
      }
      let mapCreateContacts = this.client.contacts.map((el) => el.kind);
      // let mapDeleteContacts = contacts.map((el) => el.kind);
      let createContacts = contacts.filter(
        (el) => !mapCreateContacts.includes(el.kind)
      );
      // let deleteContacts = this.client.contacts.filter(
      //   (el) => !mapDeleteContacts.includes(el.kind)
      // );
      let updateContacts = [];
      this.client.contacts.forEach((el) => {
        if (
          el.kind === "PHONE" &&
          el.username !== this.dataClient.phone.username
        ) {
          updateContacts.push(this.dataClient.phone);
        }
        if (
          el.kind === "EMAIL" &&
          el.username !== this.dataClient.email.username
        ) {
          updateContacts.push(this.dataClient.email);
        }
      });
      createContacts.forEach((el) => this.postCreateContact(el));
      // deleteContacts.forEach((el) => this.postDeleteContact(el));
      updateContacts.forEach((el) => this.postUpdateContact(el));
    },
    postCreateContact(contact) {
      fetchWrapper.post("general/contact/create/", {
        kind: contact.kind,
        username: contact.username,
        person_id: this.client.id,
      });
    },
    postUpdateContact(contact) {
      fetchWrapper.post(`general/contact/${contact.id}/update/`, {
        kind: contact.kind,
        username: contact.username,
        person_id: this.client.id,
      });
    },
    postDeleteContact(contact) {
      fetchWrapper.del(`general/contact/${contact.id}/delete/`);
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
    fetchClientDetail(id) {
      fetchWrapper
        .get(`general/person/${id}/detail/`)
        .then((data) => this.saveClientDetail(data));
    },
    saveClientDetail(data) {
      this.saveIdentityDocument(
        data.identity_documents.find(
          (el) => el.kind === "Паспорт" || el.kind === "PASSPORT"
        )
      );
      this.saveAddress(data.address[0]);
      this.saveAttachments([...data.attachments]);
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
          issued_by_date: data.issued_by_date
            ? data?.issued_by_date.split("-").reverse().join(".")
            : "",
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
          series_number: this.dataIdentityDocument.numba,
          issued_by_org: this.dataIdentityDocument.issued_by_org,
          issued_by_org_code: this.dataIdentityDocument.issued_by_org_code,
          issued_by_date: this.dataIdentityDocument.issued_by_date
            .split(".")
            .reverse()
            .join("-"),
        })
        .then(() => this.fetchClientDetail(this.id));
    },
    saveAddress(data) {
      this.addressId = data?.id;
      if (data?.join_adress && data?.join_adress.substr(0, 4) !== "None") {
        this.dataAddress = {
          join_adress: data?.join_adress,
        };
        this.lackAddress = true;
      } else {
        this.lackAddress = false;
        this.dataAddress = {
          join_adress: "",
        };
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
            this.dopeAddress.city +
              this.dopeAddress.region +
              this.dopeAddress.street +
              this.dopeAddress.house +
              this.dopeAddress.flat +
              this.dopeAddress.index || this.dataAddress.join_adress,
        })
        .then(() => this.fetchClientDetail(this.id));
      this.clearAddress();
    },
    saveAttachments(data) {
      this.dataAttachments = [...data];
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
      this.dataAttachments = [...this.dataDetail, ...data];
    },
    deleteDoc(e) {
      e.stopPropagation();
      this.dataAttachments = this.dataAttachments.filter(
        (el) => el.id !== e.target.id
      );
    },
    postCreateAddress() {
      fetchWrapper
        .post("general/address/create/", {
          person_id: this.id,
          full_address:
            this.dopeAddress.city +
              this.dopeAddress.region +
              this.dopeAddress.street +
              this.dopeAddress.house +
              this.dopeAddress.flat +
              this.dopeAddress.index || this.dataAddress.join_adress,
        })
        .then(() => this.fetchClientDetail(this.id));
    },
    postCreateIdentityDocument() {
      fetchWrapper
        .post("general/identity_document/create/", {
          person_id: this.id,
          kind: "PASSPORT",
          series_number: this.dataIdentityDocument.numba,
          issued_by_org: this.dataIdentityDocument.issued_by_org,
          issued_by_org_code: this.dataIdentityDocument.issued_by_org_code,
          issued_by_date: this.dataIdentityDocument.issued_by_date
            .split(".")
            .reverse()
            .join("-"),
        })
        .then(() => this.fetchClientDetail(this.id));
    },
  },
};
</script>

<style lang="sass" scoped>
.row-wrapper
  border-bottom: 1px solid #D3D4DC
  min-width: 1556px
.row-body
  color: var(--font-dark-blue-color)
  min-height: 56px
  &:hover
    background-color: var(--bg-hover-row-table)
.check-box
  min-width: 36px
.dots
  min-width: 53px
.dots-button
  width: 20px
  height: 20px
  border-radius: 50%
  color: var(--font-grey-color)
  &:hover
    background-color: var(--btn-blue-color)
    color: var(--default-white)
</style>
