<template lang="pug">
  .row-wrapper.flex.flex-col.w-full.min-w-fit
    .row-body.flex.w-full.cursor-pointer(:id="id" @dblclick="(e) => openDetailInfo(e)")
      .check-box.flex.justify-center.items-center
        clients-table-checkbox(:id="id" :check="check" :is-check="isCheck")
      table-cell-body-name(:value="dataClient" :avatar="dataClient.avatar" :avatar-color="dataClient.color" :is-open-change="isOpenChange" :width="columnBody.find(el => el.name === 'fullName').width")
      table-cell-body-age(:value="dataClient" :is-open-change="isOpenChange" :width="columnBody.find(el => el.name === 'age').width")
      table-cell-body-priority(:value="dataClient.priority" :choose-priority="choosePriority" :is-open-change="isOpenChange" :width="columnBody.find(el => el.name === 'priority').width")
      table-cell-body-phone(:value="dataClient" :is-open-change="isOpenChange" :width="columnBody.find(el => el.name === 'phone').width")
      table-cell-body-email(:value="dataClient" :is-open-change="isOpenChange" :width="columnBody.find(el => el.name === 'email').width")
      table-cell-body-networks(:delete-network="deleteNetwork" :add-network="addNetwork" :networks="dataClient.contacts" :is-open-change="isOpenChange" :width="columnBody.find(el => el.name === 'networks').width")
      .dots.flex.justify-center.items-center
        base-button(v-if="isOpenChange" @click="closeChangeData" :confirm="true" :rounded="true" :outlined="true" :size="20")
          .icon-ok.text-xsm(class="pt-[3px]")
        .relative.dots-button.icon-dots.cursor-pointer.leading-6.text-center(v-show="!isOpenChange" :tabindex="1" @click="(e) => openPopup(e)" @blur="handleUnFocusPopup")
          clients-action-popup(v-if="isOpenPopup" :open-change-data="openChangeData")
    client-detail-info-wrapper(v-if="isOpenDetailInfo" :data-address="dataAddress" :data-detail="dataDetail" :data-document="dataIdentityDocument" :save-new-doc="saveNewDoc" :delete-doc="deleteDoc")
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
      dataDetail: {},
      isOpenDetailInfo: false,
      isOpenPopup: false,
      columnBody: column,
      isOpenChange: false,
      dataClient: {},
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
      priority: this.client.priority,
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
      fetch(
        `http://45.84.227.122:8080/general/person/${this.client.id}/update/`,
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            full_name: this.dataClient.fullName,
            birth_date: this.dataClient.age,
            priority: this.dataClient.priority,
          }),
        }
      );
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
      fetch("http://45.84.227.122:8080/general/contact/create/", {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          kind: contact.kind,
          username: contact.username,
          person_id: this.client.id,
        }),
      });
    },
    postUpdateContact(contact) {
      fetch(`http://45.84.227.122:8080/general/contact/${contact.id}/update/`, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          kind: contact.kind,
          username: contact.username,
          person_id: this.client.id,
        }),
      });
    },
    postDeleteContact(contact) {
      fetch(`http://45.84.227.122:8080/general/contact/${contact.id}/delete/`, {
        method: "DELETE",
      });
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
    closeChangeData() {
      this.isOpenChange = false;
      this.postUpdateClient();
      this.postContactsClient();
    },
    openChangeData() {
      this.isOpenChange = true;
    },
    fetchClientDetail(id) {
      // eslint-disable-next-line
      fetch(`http://45.84.227.122:8080/general/person/${id}/detail`).then((res) => res.json()).then((data) => this.saveClientDetail(data))
    },
    saveClientDetail(data) {
      this.saveIdentityDocument(
        data.identity_documents.find((el) => el.kind === "Паспорт")
      );
      this.saveAddress(data.address[0]);
    },
    saveIdentityDocument(data) {
      this.dataIdentityDocument = {
        numba: data?.numba || "-",
        issued_by_org: data?.issued_by_org || "-",
        issued_by_org_code: data?.issued_by_org_code || "-",
        issued_by_date: data?.issued_by_date || "-",
      };
    },
    saveAddress(data) {
      this.dataAddress = {
        join_address: data?.join_address || "-",
      };
    },
    openPopup(e) {
      e.target.focus();
      this.isOpenPopup = !this.isOpenPopup;
    },
    openDetailInfo(e) {
      this.isOpenDetailInfo = !this.isOpenDetailInfo;
      this.isOpenDetailInfo && this.fetchClientDetail(e.currentTarget.id);
    },
    handleUnFocusPopup() {
      this.isOpenPopup = false;
    },
    saveNewDoc(section, data) {
      this.dataDetail[section] = [...this.dataDetail[section], ...data];
    },
    deleteDoc(e, section) {
      if (section === "additional") {
        this.dataDetail[section].forEach((el, index) => {
          if (el.name === e.target.id) {
            delete this.dataDetail[section][index].name;
          }
        });
      }
      this.dataDetail[section] = this.dataDetail[section].filter(
        (el) => el.name !== e.target.id
      );
    },
  },
};
</script>

<style lang="sass" scoped>
.row-wrapper
  border-bottom: 1px solid #D3D4DC
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
