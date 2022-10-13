<template lang="pug">
  .wrapper.px-6.pt-6.h-full.w-full.min-w-fit
    table.w-full
      thead.head-table
        tr.head-row
          th.w-3
            .checkbox.px-4.py-3
              clients-table-checkbox
          th.name
            .flex.px-4.justify-between.gap-x-40
              span.text-sm ФИО
              .icon-down-arrow.text-xsm.mt-1
          th.age
            .flex.px-4.justify-between
              span.text-sm Возраст
              .icon-down-arrow.text-xsm.mt-1
          th
            .px-4.text-left
              span.text-sm Должность
          th.priority
            .flex.px-4.justify-between
              span.text-sm Приоритет
              .icon-down-arrow.text-xsm.mt-1
          th
            .phone.px-4.text-left
              span.text-sm Телефон
          th
            .email.px-4.text-left
              span.text-sm Email
          th
            .networks.px-4.text-left
              span.text-sm Сети
          th.meeting
            .flex.px-4.justify-between.gap-x-11
              span.text-sm Ближайшая встреча
              .icon-down-arrow.text-xsm.mt-1
          th.w-5
            .do.px-4
              span.text-sm Do
      tbody
        clients-table-row(v-for="client in dataClients"
          :key="client.id"
          :id="client.id"
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
      dataClients: [
        {
          id: "1",
          fullName: "Вильгейльм Арнольд Витальевич",
          age: "34",
          jobTitle: "Менеджер",
          priority: "Высокий",
          phone: "+7 (915) 657–21–14",
          email: "Superboyband@yandex.ru",
          networks: [],
          meetingTime: {
            date: "02.06.22",
            time: "18:30–19:30",
          },
        },
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
.head-table
  color: var(--font-grey-color)
  border-collapse: separate
  border-bottom: 8px solid transparent
.meeting
  max-width: 180px
.priority
  max-width: 80px
.head-row
  border-bottom: 1px solid #D3D4DC
.wrapper
  background-color: var(--default-white)
.color
  background-color: red
</style>
