<template lang="pug">
  .wrapper-table.relative.flex.px-6.py-6.h-full.w-full
    transition(name="table", mode="out-in")
      .flex.justify-center.items-center.w-full(v-if="dataClientsPresence")
        base-loader(
          :width="60",
          :height="60"
        )
      .relative.flex.flex-col.h-full.w-full(v-else)
        clients-table-hat(
          :is-open-actions="marked.length",
          :open-form="openForm",
          :clearing-text-search="clearingTextSearch",
          :change-clearing-text-search="changeClearingTextSearch",
          @search="filterDataClients",
          :created-client-name="createdClientName",
        )
        .flex.flex-col.h-full.table-container.w-full.mt-8.mb-3
          base-modal(v-model="showMedicalCard")
            form-create-medical-card
          clients-table-header(:check="selectedCheck" :is-check="selectAll")
          .flex.flex-col
            clients-table-row(
              v-for="client in dataClients",
              :key="client.id",
              :id="client.id",
              :url="url",
              :is-check="marked.includes(client.id)",
              :check="selectedCheck",
              :client="client",
              :deleted-client-id="deletedRowId",
              :update-data-client="updateDataClient",
              :fetch-data-clients="fetchDataClients",
              :fetch-created-client-data="fetchCreatedClientData",
              :create-medical-card="createMedicalCard",
              :created-client-name="createdClientName",
              @delete-client="deleteClientHandler",
              @recover-client="clearDeletedRowId",
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
          client-table-delete-modal(
            :close-modal="closeModal",
            :deleted-client-id="deletedClientId",
            @delete-client="writeDeletedRowId"
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
import ClientTableDeleteModal from "./ClientTableDeleteModal.vue";
import FormCreateMedicalCard from "@/pages/clients/components/FormCreateMedicalCard";
import BaseLoader from "@/components/Loader/BaseLoader.vue";
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
    ClientTableDeleteModal,
    FormCreateMedicalCard,
    BaseLoader,
  },
  props: {
    openForm: Function,
    isOpenForm: Boolean,
    updatedClients: Boolean,
    url: String,
    createdClientId: String,
  },

  data() {
    return {
      selectAll: false,
      marked: [],
      dataClients: [
        {
          initialization: true,
        },
      ],
      currentTablePage: 1,
      limit: 14,
      clientsCount: 0,
      filteredClientsCount: 0,
      textSearch: "",
      paginationInfo: {
        currentPage: 0,
        length: 0,
      },
      showModal: false,
      deletedClientId: "",
      deletedRowId: "",
      clearingTextSearch: false,
      showMedicalCard: false,
      createdClientName: "",
    };
  },
  computed: {
    dataClientsPresence() {
      return this.dataClients[0]?.initialization;
    },
  },
  methods: {
    updateDataClient() {
      this.clearCreatedClientName();
      if (this.textSearch) this.filteredClientsCount -= 1;
      else this.clientsCount -= 1;
      if (this.dataClients.find(({ id }) => id === this.deletedRowId)) {
        if (this.dataClients.length === 1) this.currentTablePage -= 1;
        else this.fetchDataClients();
      }
    },
    saveDataClients(data) {
      this.dataClients = data.results;
    },
    saveClientsCount(data) {
      if (!this.clientsCount) this.clientsCount = data.count;
    },
    saveFilteredClientsCount(data) {
      if (!this.filteredClientsCoun) this.filteredClientsCount = data.count;
    },
    filterDataClients(text) {
      this.clearCreatedClientName();
      if (text) {
        this.textSearch = text;
        this.filteredClientsCount = 0;
      } else this.textSearch = "";
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
        this.saveDataClients(response);
        this.saveFilteredClientsCount(response);
        this.paginationInfo = {
          currentPage: this.currentTablePage,
          length: this.calculatePageCount(this.filteredClientsCount),
        };
      } else {
        response = await fetchWrapper.get(
          `general/person/?limit=${this.limit}&offset=${
            (this.currentTablePage - 1) * this.limit
          }`
        );
        this.saveDataClients(response);
        this.saveClientsCount(response);
        this.paginationInfo = {
          currentPage: this.currentTablePage,
          length: this.calculatePageCount(this.clientsCount),
        };
      }
    },
    async fetchCreatedClientData() {
      fetchWrapper
        .get(`general/person/${this.createdClientId}/detail/`)
        .then((response) => {
          this.dataClients = [response];
          this.createdClientName = `${response.last_name} ${response.first_name} ${response.patronymic}`;
          this.paginationInfo = {
            currentPage: 0,
            length: 0,
          };
        });
    },
    calculatePageCount(count) {
      return Math.ceil(count / this.limit);
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
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
    createMedicalCard() {
      this.showMedicalCard = true;
    },
    deleteClientHandler(id) {
      this.deletedClientId = id;
      this.openModal();
    },
    writeDeletedRowId(id) {
      this.deletedRowId = id;
    },
    clearDeletedRowId() {
      this.deletedRowId = "";
    },
    clearDeletedClientId() {
      this.deletedClientId = "";
    },
    changeClearingTextSearch() {
      this.clearingTextSearch = false;
      this.clearCreatedClientName();
    },
    clearCreatedClientName() {
      this.createdClientName = "";
    },
  },
  watch: {
    updatedClients() {
      if (this.updatedClients === true) {
        this.textSearch = "";
        this.clientsCount += 1;
        this.fetchCreatedClientData();
        this.$emit("reset-updated-clients");
      }
    },
    currentTablePage() {
      this.fetchDataClients();
    },
    showModal() {
      if (!this.showModal) this.clearDeletedClientId();
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
.table-enter-from
  opacity: 0
  transform: translateY(0px)
  pointer-events: none
.table-enter-active
  transition: 0.3s ease
.table-leave-to
  opacity: 0
  transform: translateY(0px)
  pointer-events: none
.table-leave-active
  transition: 0.3s ease
.table-move
  transition: 0.3s ease
</style>
