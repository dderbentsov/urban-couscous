<template lang="pug">
  .wrapper-table.relative.flex.flex-col.px-6.py-6.h-full.w-full
    clients-table-hat(
      :is-open-actions="marked.length",
      :open-form="openForm",
      @search="filterDataClients",
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
          @update-clients="updateDataClient"
        )
    client-table-pagination(
      v-if="paginationInfo.length > 1"
      :pagination-info="paginationInfo"
      @previous-page="switchPreviousPage",
      @next-page="switchNextPage",
      @set-current-page="changeCurrentTablePage"
    )
    base-modal(
      v-model="showModal",
      title="Удалить клиента"
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
import BaseModal from "@/components/base/BaseModal.vue";
export default {
  name: "ClientsTable",
  components: {
    ClientsTableCheckbox,
    ClientsTableRow,
    ClientsTableHat,
    ClientsTableHeader,
    BaseClientFormCreate,
    ClientTablePagination,
    BaseModal,
  },
  props: {
    openForm: Function,
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
      textSearch: "",
      paginationInfo: {
        currentPage: 0,
        length: 0,
      },
      showModal: true,
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.count / this.limit);
    },
  },
  methods: {
    updateDataClient() {
      if (this.dataClients.length === 1) this.currentTablePage -= 1;
      else this.fetchDataClients();
    },
    saveDataClients(data) {
      this.dataClients = data.results;
      this.count = data.count;
    },
    filterDataClients(text) {
      if (text) this.textSearch = text;
      else this.textSearch = "";
      if (this.currentTablePage !== 1) this.currentTablePage = 1;
      else {
        this.fetchDataClients();
      }
    },
    async fetchDataClients() {
      let response = {};
      if (this.textSearch) {
        response = await fetchWrapper.get(
          `general/person/?last_name=${this.textSearch}&limit=${
            this.limit
          }&offset=${(this.currentTablePage - 1) * this.limit}`
        );
      } else {
        response = await fetchWrapper.get(
          `general/person/?limit=${this.limit}&offset=${
            (this.currentTablePage - 1) * this.limit
          }`
        );
      }
      this.saveDataClients(response);
      this.paginationInfo = {
        currentPage: this.currentTablePage,
        length: this.pageCount,
      };
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
        this.textSearch = "";
        setTimeout(() => {
          this.fetchDataClients().then(
            () => (this.currentTablePage = this.pageCount)
          );
        }, 60);
        this.$emit("reset-updated-clients");
      }
    },
    currentTablePage() {
      this.fetchDataClients();
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
  height: calc(100vh - 64px)
.table-container
  overflow: auto
  &::-webkit-scrollbar
    height: 4px
    width: 4px
  &::-webkit-scrollbar-track
    background-color: rgba(211, 212, 220, 0.5)
    border-radius: 8px
  &::-webkit-scrollbar-thumb
    border-radius: 8px
    background-color: var(--btn-blue-color)
</style>
