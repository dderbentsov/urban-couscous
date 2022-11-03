<template lang="pug">
  .wrapper-table.relative.flex.flex-col.gap-y-8.px-6.py-6.h-full.w-full
    clients-form-create(v-if="isOpenFormCreate" :close-form="closeFormCreateClient")
    clients-table-hat(:is-open-actions="marked.length" :open-form-create="openFormCreateClient")
    .flex.flex-col.h-full.gap-y-2.table-container
      clients-table-header(:check="selectedCheck" :is-check="selectAll")
      .flex.flex-col
        clients-table-row(
          v-for="client in dataClients"
          :key="client.id"
          :id="client.id"
          :is-check="marked.includes(client.id)"
          :check="selectedCheck"
          :client="client"
          :fetch-data-clients="fetchDataClients"
          )
</template>

<script>
import { fetchWrapper } from "@/shared/fetchWrapper.js";
import ClientsTableHeader from "@/pages/clients/components/ClientsTableHeader";
import ClientsTableHat from "@/pages/clients/components/ClientsTableHat";
import ClientsTableRow from "@/pages/clients/components/ClientsTableRow";
import ClientsTableCheckbox from "@/pages/clients/components/ClientsTableCheckbox";
import ClientsFormCreate from "@/pages/clients/components/ClientsFormCreate";
export default {
  name: "ClientsTable",
  components: {
    ClientsTableCheckbox,
    ClientsTableRow,
    ClientsTableHat,
    ClientsTableHeader,
    ClientsFormCreate,
  },
  data() {
    return {
      isOpenFormCreate: false,
      selectAll: false,
      marked: [],
      dataClients: [],
    };
  },
  methods: {
    openFormCreateClient() {
      this.isOpenFormCreate = true;
    },
    closeFormCreateClient() {
      this.isOpenFormCreate = false;
      this.fetchDataClients();
    },
    saveDataClients(data) {
      this.dataClients = data.results;
    },
    fetchDataClients() {
      // eslint-disable-next-line
      fetchWrapper.get("general/person/").then((data) => this.saveDataClients(data))
    },
    selectedCheck(e) {
      if (e.target.id === "checkbox") {
        this.selectAll = !this.selectAll;
        this.marked = this.dataClients.map((el) => el.id);
        !this.selectAll && (this.marked = []);
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
.wrapper-table
  background-color: var(--default-white)
.table-container
  overflow: auto
  &::-webkit-scrollbar
      height: 4px
  &::-webkit-scrollbar-track
    background-color: rgba(211, 212, 220, 0.5)
    border-radius: 8px
  &::-webkit-scrollbar-thumb
    border-radius: 8px
    background-color: var(--btn-blue-color)
</style>
