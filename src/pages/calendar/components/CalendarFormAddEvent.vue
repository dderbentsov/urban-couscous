<template lang="pug">
  .flex.flex-col.gap-y-6.pt-6.pb-7.px-8.event-form.absolute.right-2.bottom-14(@click="output")
    .flex.flex-col.gap-y-2
      .flex.justify-between.pt-2
        span.text-xs.opacity-40.font-bold.leading-3 Ответственный
        .icon-cancel.close-icon.text-xs.cursor-pointer(@click="closeForm")
      base-select(
        :size-input="ownerSelectSize"
        :option-data="ownerName"
        :list-data="ownersList"
        :choose-option="chooseOptionOwner"
        placeholder="Выберите ответственного"
        separator
      )
    .flex.flex-col.gap-y-2
      span.text-xs.opacity-40.font-bold.leading-3 Основная информация
      .flex.gap-x-4.items-center
        .icon-time.text-xl.icon
        .flex.gap-x-2.items-center
          .time-input.flex.gap-x-2.px-4.py-2.items-center
            input.item-input.text-base.cursor-text(
                v-model="eventData.start"
                placeholder ="11:00"
              )
          span —
          .time-input.flex.gap-x-2.px-4.py-2.items-center
            input.item-input.text-base.cursor-text(
                v-model="eventData.end"
                placeholder ="12:30"
              )
      .flex.gap-x-4.items-center
        .icon-person.text-xl.icon
        base-select(
          :size-input="memberSelectSize"
          :list-data="membersList"
          :option-data="memberName"
          :choose-option="chooseOptionMember"
          placeholder="Выберите участника"
          separator
          )
    .flex.flex-col.gap-y-2
      span.text-xs.opacity-40.font-bold.leading-3 Вид события
      base-select(
        :size-input="kindEventSelectSize"
        :option-data="eventData.kindEvent"
        :list-data="kindEvents"
        :choose-option="chooseOptionTypeEvent"
        placeholder="Вид события"
        separator
      )
    .flex.flex-col.gap-y-2
      .flex.gap-x-4.items-center
        span.text-xs.opacity-40.font-bold.leading-3 Контакты
        base-button(
        left-icon="icon-plus"
        rounded secondary
        :size="24"
        :icon-left-size="10"
        id="addContact"
        @click="(e)=>addContact(e)")
      .flex.gap-x-4.items-center(v-for="(contact, index) in listContacts" :key="index")
        .icon-mail.text-xl.icon
        .form-item.cursor-pointer.flex.gap-x-2.px-4.py-2.items-center
          input.item-input.cursor-text.text-base(v-model="eventData.contacts[contact]" type="text" placeholder="E-mail")
    base-button.styled-button.text-base.font-semibold(
    :size="40"
    @click="closeForm"
    ) Создать событие
</template>

<script>
import * as moment from "moment/moment";
import BaseSelect from "@/components/base/BaseSelect";
import BaseButton from "@/components/base/BaseButton";
export default {
  name: "FormChangeEvent",
  components: { BaseSelect, BaseButton },
  props: {
    closeForm: Function,
    ownersData: {
      type: Array,
      default() {
        return [];
      },
    },
    membersData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      listContacts: [1],
      ownerSelectSize: 22,
      kindEventSelectSize: 10,
      memberSelectSize: 29,
      kindEvents: ["Встреча", "Планерка", "Интервью", "Важная работа"],
      eventData: {
        start: "",
        end: "",
        kind: "",
        members: [
          {
            person: null,
            role: null,
          },
        ],
        employees: [
          {
            employee: null,
            role: "owner",
          },
        ],
        contacts: [],
        responsible: "",
        eventClient: "",
        timeEvent: {
          firstTime: "",
          secondTime: "",
        },
        kindEvent: "",
      },
    };
  },
  computed: {
    ownersList() {
      if (this.ownersData) {
        let filteredArray = [];
        this.ownersData.forEach((elem) => {
          filteredArray.push({
            id: elem.id,
            name: this.trimName(elem),
          });
        });
        return filteredArray;
      }
      return [];
    },
    membersList() {
      if (this.membersData) {
        let filteredArray = [];
        this.membersData.forEach((elem) => {
          filteredArray.push({
            id: elem.id,
            name: `${elem.last_name} ${elem.first_name} ${elem.patronymic}`,
          });
        });
        return filteredArray;
      }
      return [];
    },
    ownerName() {
      if (this.eventData.employees[0].employee) {
        return this.trimName(this.eventData.employees[0].employee);
      }
      return "";
    },
    memberName() {
      let data = this.eventData.members[0].person;
      if (data) {
        return `${data.last_name} ${data.first_name} ${data.patronymic}`;
      }
      return "";
    },
    eventStartTime() {
      if (this.eventData.start) {
        console.log(
          `${moment().format("YYYY-MM-DD")}T${this.eventData.start}:00Z`
        );
        return `${moment().format("YYYY-MM-DD")}T${this.eventData.start}:00Z`;
      }
      return "";
    },
  },
  methods: {
    chooseOptionOwner(e) {
      let foundEmployee = this.ownersData.find(
        (elem) => elem.id === e.target.id
      );
      this.eventData.employees[0].employee = {
        id: foundEmployee.id,
        last_name: foundEmployee.last_name,
        first_name: foundEmployee.first_name,
        patronymic: foundEmployee.patronymic,
      };
      console.log(this.eventData.employees[0].employee);
      this.ownerSelectSize = this.ownerName.split(" ").join("").length;
    },
    chooseOptionTypeEvent(e) {
      this.eventData.kindEvent = e.target.id;
      this.kindEventSelectSize = this.eventData.kindEvent
        .split(" ")
        .join("").length;
    },
    chooseOptionMember(e) {
      let foundMember = this.membersData.find(
        (elem) => elem.id === e.target.id
      );
      this.eventData.members[0].person = {
        id: foundMember.id,
        last_name: foundMember.last_name,
        first_name: foundMember.first_name,
        patronymic: foundMember.patronymic,
      };
    },
    addContact(e) {
      if (e.currentTarget.id === "addContact") {
        this.listContacts.push(
          this.listContacts[this.listContacts.length - 1] + 1
        );
      }
    },
    trimName(obj) {
      return `${obj.last_name} ${obj.first_name[0]}.${obj.patronymic[0]}.`;
    },
  },
};
</script>

<style lang="sass" scoped>
.event-form
  height: fit-content
  min-width: 448px
  background-color: var(--default-white)
  box-shadow: -4px -4px 16px rgba(9, 10, 21, 0.25), 4px 4px 16px rgba(9, 10, 21, 0.25)
  border-radius: 4px
  z-index: 5

.form-item
  border-radius: 4px
  width: 344px
  background-color: var(--bg-ligth-blue-color)

.item-input
  appearance: none
  border: none
  outline: none
  color: var(--font-black-color)
  background-color: var(--font-black-color-0)
  &::-webkit-calendar-picker-indicator
    display: none
    -webkit-appearance: none
  &::placeholder
    color: var(--font-black-color-1)

.time-input
  width: 72px
  border-radius: 4px
  background-color: var(--bg-ligth-blue-color)

.icon
  width: 24px
  height: 24px
  color: var(--font-dark-blue-color)

.close-icon
  color: var(--font-dark-blue-color)
  &:hover
    color: var(--btn-blue-color)
.styled-button
  width: 183px
</style>
