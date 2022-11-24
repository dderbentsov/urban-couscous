<template lang="pug">
  .wrapper-table.relative.flex.flex-col.px-6.py-6.h-full.w-full
    clients-table-hat(
      :is-open-actions="marked.length",
      :open-form="openForm",
      @search="filterDataClients",
      @reset-search="fetchDataClients"
    )
    .flex.flex-col.h-full.gap-y-2.table-container.w-full.mt-8.mb-3
      clients-table-header(:check="selectedCheck" :is-check="selectAll")
      .flex.flex-col
        clients-table-row(
          v-for="client in dataClients",
          :key="client.id",
          :id="client.id",
          :is-check="marked.includes(client.id)",
          :check="selectedCheck",
          :client="client",
          :fetch-data-clients="fetchDataClients",
          :current-year="currentYear"
        )
    client-table-pagination(
      v-if="pageCount > 1"
      :length="pageCount",
      :current-page="currentTablePage",
      @previous-page="switchPreviousPage",
      @next-page="switchNextPage",
      @set-current-page="changeCurrentTablePage"
    )
</template>

<script>
import { fetchWrapper } from "@/shared/fetchWrapper.js";
import ClientsTableHeader from "@/pages/clients/components/ClientsTableHeader";
import ClientsTableHat from "@/pages/clients/components/ClientsTableHat";
import ClientsTableRow from "@/pages/clients/components/ClientsTableRow";
import ClientsTableCheckbox from "@/pages/clients/components/ClientsTableCheckbox";
import BaseClientFormCreate from "@/components/base/BaseClientFormCreate";
import ClientTablePagination from "./ClientTablePagination.vue";
export default {
  name: "ClientsTable",
  components: {
    ClientsTableCheckbox,
    ClientsTableRow,
    ClientsTableHat,
    ClientsTableHeader,
    BaseClientFormCreate,
    ClientTablePagination,
  },
  props: {
    openForm: Function,
    currentYear: Number,
    isOpenForm: Boolean,
    updatedClients: Boolean,
  },

  data() {
    return {
      selectAll: false,
      marked: [],
      dataClients: [],
      currentTablePage: 1,
      limit: 4,
      count: 0,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / this.limit);
    },
  },
  methods: {
    saveDataClients(data) {
      this.dataClients = data.results;
      this.count = data.count;
    },
    filterDataClients(text) {
      fetchWrapper
        .get(
          `general/person/?last_name=${text}&?limit=${this.limit}&offset=${
            (this.currentPage - 1) * this.limit
          }`
        )
        .then((data) => this.saveDataClients(data));
    },
    async fetchDataClients(currentPage) {
      let response = await fetchWrapper.get(
        `general/person/?limit=${this.limit}&offset=${
          (currentPage - 1) * this.limit
        }`
      );
      this.saveDataClients(response);
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
    switchPreviousPage() {
      this.currentTablePage -= 1;
    },
    switchNextPage() {
      this.currentTablePage += 1;
    },
    changeCurrentTablePage(value) {
      this.currentTablePage = value;
    },
  },
  watch: {
    updatedClients() {
      if (this.updatedClients === true) {
        this.fetchDataClients(this.currentTablePage).then(
          () => (this.currentTablePage = this.pageCount)
        );
        this.$emit("reset-updated-clients");
      }
    },
    currentTablePage() {
      this.fetchDataClients(this.currentTablePage);
    },
  },
  mounted() {
    this.fetchDataClients(this.currentTablePage);
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
