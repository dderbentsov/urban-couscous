<template lang="pug">
  .schedule.flex-col
    .table-header.flex.w-full
      .flex.items-center(:style="{padding: '16px 102px'}")
        .text.font-bold Сотрудник
      .column-wrapper.flex
        .schedule-column.flex.flex-col.items-center.justify-center.px-2(
          v-for="day in result",
          :style="{backgroundColor: day.format('ddd') === 'сб' || day.format('ddd') === 'вс' ? 'var(--bg-white-color-1)' : ''}"
        )
          .text.flex.font-bold(
            :style="{opacity: day.format('ddd') === 'сб' || day.format('ddd') === 'вс' ? '0.6' : '1'}"
          ) {{day.format("D")}}
          .text.flex.font-bold(
            :style="{opacity: day.format('ddd') === 'сб' || day.format('ddd') === 'вс' ? '0.6' : '1'}"
            ) {{day.format("ddd")}}
    .schedule-body.flex.w-full
      .edit.flex.items-center.justify-center.h-9.w-9
        .flex.icon-edit
      .name.flex.justify-center.items-center.cursor-pointer(v-if="schedule.employee.label", @click="openSelect")
        span {{schedule.employee.label}}
      .name.flex(v-if="!schedule.employee.label")
        base-custom-select(
          :items="ownersList",
          v-model="schedule.employee",
          placeholder="Добавить сотрудника",
          :style="{border: 'none'}"
        )
</template>

<script>
import * as moment from "moment";
import BaseModal from "@/components/base/BaseModal.vue";
import BaseCustomSelect from "@/components/base/BaseCustomSelect.vue";
export default {
  name: "ScheduleBody",
  components: { BaseModal, BaseCustomSelect },
  props: {
    employeeList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      days: "",
      result: [],
      startMonth: moment("2022-12-01"),
      showSelect: false,
      employee: [],
      schedule: {
        employee: {
          label: "",
          id: null,
        },
      },
    };
  },
  computed: {
    ownersList() {
      if (this.employeeList) {
        let filteredArray = [];
        this.employeeList.forEach((elem) => {
          filteredArray.push({
            id: elem.id,
            label: this.trimOwnerName(
              elem.last_name,
              elem.first_name,
              elem.patronymic
            ),
          });
        });
        return filteredArray;
      }
      return [];
    },
  },
  methods: {
    changeDays() {
      this.days = moment().daysInMonth();
    },
    pushMonth() {
      this.result.push(this.startMonth);
      for (let i = 2; i <= this.days; i++) {
        this.result.push(this.startMonth.clone().add(i - 1, "d"));
      }
    },
    trimOwnerName(lastName, firstName, patronymic) {
      let checkedFirstName = firstName !== null ? firstName[0] + "." : "";
      let checkedPatronymic = patronymic !== null ? patronymic[0] + "." : "";
      return `${lastName} ${checkedFirstName}${checkedPatronymic}`;
    },
    openSelect() {
      this.showSelect = true;
      for (let index = 0; index < this.employeeList.length; index++) {
        this.employee.push(this.employeeList[index]);
      }
    },
  },
  mounted() {
    this.changeDays();
    this.pushMonth();
  },
};
</script>

<style lang="sass" scoped>
.schedule
  border: 1.5px solid var(--border-light-grey-color-1)
  border-radius: 4px
  min-height: 87px

.table-header
  height: 50px
  background-color: #D7D9FF
  border-bottom: 1.5px solid var(--border-light-grey-color-1)
  border-top-left-radius: 2px
  border-top-right-radius: 2px

.column-wrapper
  max-width: 1080px
  overflow: auto

.text
  color: var(--btn-blue-color)

.edit
  border-right: 1.5px solid var(--border-light-grey-color-1)

.name
  min-width: 255px
  max-width: 255px
  border-right: 1.5px solid var(--border-light-grey-color-1)
  color: var(--btn-blue-color)

.modal-wrapper
  border: 1.5px solid var(--border-light-grey-color-1)
  border-radius: 4px
  width: 400px
  height: 500px
</style>
