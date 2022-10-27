<template lang="pug">
  .wrapper.flex.flex-col.gap-y-8.px-6.pt-6.h-full.w-full.min-w-fit
    clients-table-hat(:is-open-actions="marked.length" :open-form-create="openFormCreate")
    .flex.flex-col.h-full.gap-y-2
      clients-table-header(:check="selectedCheck" :is-check="selectAll")
      .flex.flex-col
        clients-table-row(
          v-for="client in dataClients"
          :key="client.id"
          :id="client.id"
          :is-check="marked.includes(client.id)"
          :check="selectedCheck"
          :client="client"
          )
</template>

<script>
import ClientsTableHeader from "@/pages/clients/components/ClientsTableHeader";
import ClientsTableHat from "@/pages/clients/components/ClientsTableHat";
import ClientsTableRow from "@/pages/clients/components/ClientsTableRow";
import ClientsTableCheckbox from "@/pages/clients/components/ClientsTableCheckbox";
export default {
  name: "ClientsTable",
  components: {
    ClientsTableCheckbox,
    ClientsTableRow,
    ClientsTableHat,
    ClientsTableHeader,
  },
  props: {
    openFormCreate: Function,
  },
  data() {
    return {
      selectAll: false,
      marked: [],
      dataClients: [],
    };
  },
  methods: {
    saveDataClients(data) {
      this.dataClients = data.results;
    },
    fetchDataClients() {
      // eslint-disable-next-line
      fetch("api/clients").then((res) => res.json()).then((data) => this.saveDataClients(data))
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
.wrapper
  background-color: var(--default-white)
</style>
