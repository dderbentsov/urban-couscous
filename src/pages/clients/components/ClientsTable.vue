<template lang="pug">
  .wrapper.px-6.pt-6.h-full.w-full.min-w-fit
    table.w-full
      thead.head-table
        tr.head-row
          th.w-3
            .px-4.py-3
              clients-table-checkbox(:is-check="selectAll" :check="selectedCheck" id="all")
          th
            .flex.px-4.justify-between
              span.text-sm ФИО
              img.cursor-pointer(src="@/assets/icons/sort-number.svg" alt="SortNumber")
          th
            .flex.px-4.justify-between.gap-x-6
              span.text-sm Возраст
              .icon.icon-down-arrow.text-xsm.mt-1.cursor-pointer
          th
            .px-4.text-left
              span.text-sm Должность
          th
            .flex.relative.px-4.justify-between.gap-x-3
              span.text-sm Приоритет
              .icon.icon-down-arrow.text-xsm.mt-1.cursor-pointer
          th
            .px-4.text-left
              span.text-sm Телефон
          th
            .px-4.text-left
              span.text-sm Email
          th
            .px-4.text-left
              span.text-sm.leading-8 Сети
          th
            .flex.px-4.justify-between.gap-x-11
              span.text-sm.leading-4.whitespace-nowrap Ближайшая встреча
              .icon.icon-down-arrow.text-xsm.mt-1.cursor-pointer
          th.w-5
            .do.px-4
              span.text-sm Do
      tbody.tbody
        clients-table-row(v-for="client in dataClients"
          :key="client.id"
          :id="client.id"
          :is-check="marked.includes(client.id)"
          :check="selectedCheck"
          :full-name="client.fullName"
          :age="client.age"
          :job-title="client.jobTitle"
          :priority="client.priority"
          :phone="client.phone"
          :email="client.email"
          :networks="client.networks"
          :meeting-time="client.meetingTime"
          )
</template>

<script>
import ClientsTableRow from "@/pages/clients/components/ClientsTableRow";
import ClientsTableCheckbox from "@/pages/clients/components/ClientsTableCheckbox";
export default {
  name: "ClientsTable",
  components: { ClientsTableCheckbox, ClientsTableRow },
  data() {
    return {
      selectAll: false,
      marked: [],
      dataClients: [],
    };
  },
  methods: {
    saveDataClients(data) {
      this.dataClients = data.dataClients;
    },
    fetchDataClients() {
      // eslint-disable-next-line
      fetch("/api/clients").then((res) => res.json()).then((data) => this.saveDataClients(data))
    },
    selectedCheck(e) {
      if (e.target.id === "all") {
        this.selectAll = !this.selectAll;
        this.marked = this.dataClients.map((el) => el.id);
        !this.selectAll ? (this.marked = []) : true;
      } else {
        if (e.target.checked) {
          this.marked = [...this.marked, e.target.id];
        }
        if (!e.target.checked) {
          this.marked = this.marked.filter((el) => el !== e.target.id);
        }
        if (this.marked.length !== this.dataClients.length) {
          this.selectAll = false;
        } else {
          this.selectAll = true;
        }
      }
    },
  },
  mounted() {
    this.fetchDataClients();
  },
};
</script>

<style lang="sass" scoped>
.icon
  color: var(--font-dark-blue-color)
  &.priority-open
    transform: rotate(180deg)
.head-table
  color: var(--font-grey-color)
.tbody:before
    content: "-"
    display: block
    line-height: 8px
    color: transparent
.head-row
  border-bottom: 1px solid #D3D4DC
.wrapper
  background-color: var(--default-white)
.color
  background-color: red
</style>
