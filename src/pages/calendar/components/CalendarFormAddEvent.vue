<template lang="pug">
  .flex.flex-col.gap-y-6.pt-6.pb-7.px-8.event-form.absolute.right-2.bottom-14
    .flex.flex-col.gap-y-2
      .flex.justify-between.pt-2
        span.text-xs.opacity-40.font-bold.leading-3 Ответственный
        .icon-cancel.close-icon.text-xs.cursor-pointer(@click="closeForm")
      base-select(
        id="owners"
        :size-input="ownerSelectSize"
        :option-data="ownerName"
        :list-data="ownersList"
        :choose-option="chooseOptionOwner"
        placeholder="Выберите ответственного"
        separator
        disabled
      )
    .flex.flex-col.gap-y-2
      span.text-xs.opacity-40.font-bold.leading-3 Основная информация
      .flex.gap-x-4.items-center
        .icon-time.text-xl.icon
        .flex.gap-x-2.items-center
          .time-input.flex.gap-x-2.px-4.py-2.items-center
            input.item-input.text-base.cursor-text(
              v-model="start"
              placeholder ="11:00"
            )
          span —
          .time-input.flex.gap-x-2.px-4.py-2.items-center
            input.item-input.text-base.cursor-text(
              v-model="end"
              placeholder ="12:30"
            )
      .flex.gap-x-4.items-center
        .icon-person.text-xl.icon
        base-select(
          id="members"
          :size-input="memberSelectSize"
          :list-data="membersList"
          :optionData="memberName"
          :choose-option="chooseOptionMember"
          @changeInput="addMember"
          placeholder="Выберите участника"
          separator
        )
    .flex.flex-col.gap-y-2
      span.text-xs.opacity-40.font-bold.leading-3 Вид события
      base-select(
        id="kind"
        :size-input="kindEventSelectSize"
        :option-data="kind"
        :list-data="kindEvents"
        :choose-option="chooseOptionTypeEvent"
        placeholder="Вид события"
        separator
        disabled
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
      .flex.gap-x-4.items-center(
        v-for="(contact, index) in listContacts"
        :key="index"
      )
        .icon-mail.text-xl.icon
        .form-item.cursor-pointer.flex.gap-x-2.px-4.py-2.items-center
          input.item-input.cursor-text.text-base(
            v-model="contacts"
            type="text"
            placeholder="E-mail"
          )
    base-button.styled-button.text-base.font-semibold(
      :size="40"
      :disabled="disabledButton"
      @click="sendEventData"
    ) Создать событие
</template>

<script>
import * as moment from "moment/moment";
import BaseSelect from "@/components/base/OldBaseSelect";
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
      eventData: {},
      members: {
        member: null,
        role: null,
      },
      contacts: [],
      start: "",
      end: "",
      employees: {
        employee: null,
        role: "owner",
      },
      kind: "",
    };
  },
  computed: {
    ownersList() {
      if (this.ownersData) {
        let filteredArray = [];
        this.ownersData.forEach((elem) => {
          filteredArray.push({
            id: elem.id,
            name: this.trimOwnerName(elem),
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
            name: this.trimMemberName(elem),
            contacts: elem.contacts,
          });
        });
        return filteredArray;
      }
      return [];
    },
    ownerName() {
      if (this.employees.employee) {
        return this.trimOwnerName(this.employees.employee);
      }
      return "";
    },
    memberName() {
      if (this.members.member) {
        return this.trimMemberName(this.members.member);
      }
      return "";
    },
    eventStartTime() {
      if (this.start) {
        return `${moment().format("YYYY-MM-DD")}T${this.start}:00Z`;
      }
      return "";
    },
    eventEndTime() {
      if (this.end) {
        return `${moment().format("YYYY-MM-DD")}T${this.end}:00Z`;
      }
      return "";
    },
    disabledButton() {
      if (
        this.eventStartTime &&
        this.eventEndTime &&
        this.employees.employee &&
        this.members.member &&
        this.kind
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    chooseOptionOwner(e) {
      let foundEmployee = this.ownersData.find(
        (elem) => elem.id === e.target.id
      );
      this.employees.employee = {
        id: foundEmployee.id,
        last_name: foundEmployee.last_name,
        first_name: foundEmployee.first_name,
        patronymic: foundEmployee.patronymic,
      };
      this.ownerSelectSize = this.ownerName.split(" ").join("").length;
    },
    chooseOptionTypeEvent(e) {
      this.kind = e.target.id;
      this.kindEventSelectSize = this.kind.split(" ").join("").length;
    },
    chooseOptionMember(e) {
      let foundMember = this.membersData.find(
        (elem) => elem.id === e.target.id
      );
      this.members.member = {
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
    trimOwnerName(obj) {
      return `${obj.last_name} ${obj.first_name[0]}.${obj.patronymic[0]}.`;
    },
    trimMemberName(obj) {
      return `${obj.last_name} ${obj.first_name} ${obj.patronymic}`;
    },
    addMember(memberName) {
      let memberData = memberName.split(" ");
      if (memberData.length === 3) {
        this.members.member = {
          id: null,
          last_name: memberData[0],
          first_name: memberData[1],
          patronymic: memberData[2],
        };
      }
    },
    sendEventData() {
      this.eventData = {
        start: this.eventStartTime,
        end: this.eventEndTime,
        kind: this.kind,
        employees: [this.employees],
        members: [this.members],
      };
      this.closeForm();
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
