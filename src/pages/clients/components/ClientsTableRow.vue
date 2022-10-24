<template lang="pug">
  .row-wrapper.flex.flex-col.w-full
    .row-body.flex.w-full.cursor-pointer(:id="id" @dblclick="(e) => openDetailInfo(e)")
      .check-box.flex.justify-center.items-center
        clients-table-checkbox(:id="id" :check="check" :is-check="isCheck")
      table-cell-body-name(:value="fullName" :width="columnBody.find(el => el.name === 'fullName').width")
      table-cell-body-age(:value="age" :width="columnBody.find(el => el.name === 'age').width")
      table-cell-body-job-title(:value="jobTitle" :width="columnBody.find(el => el.name === 'jobTitle').width")
      table-cell-body-priority(:value="priority" :width="columnBody.find(el => el.name === 'priority').width")
      table-cell-body-phone(:value="phone" :width="columnBody.find(el => el.name === 'phone').width")
      table-cell-body-email(:value="email" :width="columnBody.find(el => el.name === 'email').width")
      table-cell-body-networks(:networks="networks" :width="columnBody.find(el => el.name === 'networks').width")
      table-cell-body-meeting(:date="meetingTime.date" :time="meetingTime.time" :width="columnBody.find(el => el.name === 'meeting').width")
      .dots.flex.justify-center.items-center
        .relative.dots-button.icon-dots.cursor-pointer.leading-6.text-center(:tabindex="1" @click="(e) => openPopup(e)" @blur="handleUnFocusPopup")
          clients-action-popup(v-if="isOpenPopup")
    client-detail-info-wrapper(v-if="isOpenDetailInfo" :data-detail="dataDetail" :save-new-doc="saveNewDoc" :delete-doc="deleteDoc")
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
import { column } from "@/pages/clients/utils/tableConfig";
export default {
  name: "ClientsTableRow",
  components: {
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
      dataDetail: {},
      isOpenDetailInfo: false,
      isOpenPopup: false,
      columnBody: column,
    };
  },
  props: {
    id: String,
    check: Function,
    isCheck: Boolean,
    fullName: String,
    age: String,
    jobTitle: String,
    priority: String,
    phone: String,
    email: String,
    networks: Array,
    meetingTime: Object,
  },
  methods: {
    fetchClientDetail(id) {
      // eslint-disable-next-line
      fetch(`/api/detail/${id}`).then((res) => res.json()).then((data) => this.saveClientDetail(data))
    },
    saveClientDetail(data) {
      this.dataDetail = data;
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
