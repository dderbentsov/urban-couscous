<template lang="pug">
  .flex.flex-col.gap-y-6.pt-6.pb-7.px-8.event-form.absolute.right-2.bottom-14
    .flex.flex-col.gap-y-2
      .flex.justify-between.pt-2
        span.text-xs.opacity-40.font-bold.leading-3 Ответственный
        .icon-cancel.close-icon.text-xs.cursor-pointer(@click="clearForm")
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
        .flex.gap-x-2.items-center
          base-input-date(v-model:value="eventDate")
      .flex.items-center
        .flex.gap-x-2.items-center
          base-input-time.item-input.text-base.cursor-text(
            v-model:value="startTime",
            :width-input="72"
          )
          span —
          base-input-time.item-input.text-base.cursor-text(
            v-model:value="endTime",
            :width-input="72"
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
          @click="(e)=>addContact(e)"
        )
      .flex.gap-x-4.items-center(
        v-for="(contact, index) in listContacts"
        :key="index"
      )
        .icon-mail.text-xl.icon
        .form-item.flex.gap-x-2.items-center
          base-input(
            border-none
            v-model="contacts"
            placeholder="E-mail"
            :width-input="72"
          )
    base-button.styled-button.text-base.font-semibold(
      :size="40"
      :disabled="disabledButton"
      @click="sendEventData"
    ) Создать событие
</template>

<script>
import BaseSelect from "@/components/base/OldBaseSelect";
import BaseInputTime from "@/components/base/BaseInputTime.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseInputDate from "@/components/base/BaseInputDate.vue";
import BaseButton from "@/components/base/BaseButton";
import * as moment from "moment/moment";
export default {
  name: "FormChangeEvent",
  components: {
    BaseSelect,
    BaseButton,
    BaseInput,
    BaseInputDate,
    BaseInputTime,
  },
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
    selectedEventData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      listContacts: [1],
      memberSelectSize: 29,
      kindEvents: ["Встреча", "Планерка", "Интервью", "Важная работа"],
      EMPLOYEE_TYPE: "owner",
      eventData: {},
      contacts: [],
      startTime: "",
      endTime: "",
      members: {},
      employees: {},
      eventDate: "",
      kind: "",
      id: null,
      ifClearedForm: true,
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
      if (this.members.person) {
        return this.trimMemberName(this.members.person);
      }
      return "";
    },
    disabledButton() {
      if (
        (this.eventDate,
        this.startTime,
        this.endTime,
        this.employees.employee && this.members.person && this.kind)
      ) {
        return false;
      }
      return true;
    },
    ownerSelectSize() {
      if (this.ownerName) {
        return this.ownerName.split(" ").join("").length;
      }
      return 22;
    },
    kindEventSelectSize() {
      if (this.kind) {
        return this.kind.split(" ").join("").length;
      }
      return 10;
    },
    startDate() {
      return this.selectedEventData.start
        ? moment.parseZone(this.selectedEventData.start)
        : moment();
    },
    endDate() {
      return this.selectedEventData.end
        ? moment.parseZone(this.selectedEventData.end)
        : moment();
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
    },
    chooseOptionTypeEvent(e) {
      this.kind = e.target.id;
    },
    chooseOptionMember(e) {
      let foundMember = this.membersData.find(
        (elem) => elem.id === e.target.id
      );
      this.members.person = {
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
        this.members.person = {
          id: null,
          last_name: memberData[0],
          first_name: memberData[1],
          patronymic: memberData[2],
        };
      }
    },
    sendEventData() {
      this.eventData = {
        id: this.id,
        start: this.mergeDate(this.eventDate, this.startTime),
        end: this.mergeDate(this.eventDate, this.endTime),
        kind: this.kind,
        employees: [this.employees],
        members: [this.members],
      };
      this.clearForm();
      this.eventData = {};
    },
    clearForm() {
      this.$emit("clear-selected-event-data");
      this.closeForm();
    },
    mergeDate(eventDate, time) {
      return moment(`${eventDate} ${time}`).format();
    },
  },
  watch: {
    startDate: {
      immediate: true,
      handler(newDate) {
        if (newDate) {
          this.eventDate = newDate.format("YYYY-MM-DD");
          this.startTime = newDate.format("HH:mm");
        }
      },
    },
    endDate: {
      immediate: true,
      handler(newDate) {
        if (newDate) {
          this.endTime = newDate.format("HH:mm");
        }
      },
    },
    selectedEventData: {
      immediate: true,
      handler(newDate) {
        if (newDate) {
          this.id = this.selectedEventData.id || null;
          this.kind = this.selectedEventData.kind || "";
          this.employees = this.selectedEventData.employees[0] || {
            id: null,
            employee: null,
            role: this.EMPLOYEE_TYPE,
          };
          this.members = this.selectedEventData.members[0] || {
            id: null,
            person: null,
            role: this.EMPLOYEE_TYPE,
          };
        }
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.event-form
  height: fit-content
  min-width: 448px
  background-color: var(--bg-ligth-blue-color)
  box-shadow: -4px -4px 16px rgba(9, 10, 21, 0.25), 4px 4px 16px rgba(9, 10, 21, 0.25)
  border-radius: 4px
  z-index: 5

.form-item
  border-radius: 4px
  width: 344px
  background-color: var(--default-white)

.item-input
  appearance: none
  border: none
  outline: none
  height: 40px
  &::-webkit-calendar-picker-indicator
    display: none
    -webkit-appearance: none
  &::placeholder
    color: var(--font-black-color-1)

.time-input
  width: 72px
  border-radius: 4px
  background-color: var(--default-white)

.date-input
  width: 174px
  border-radius: 4px
  background-color: var(--default-white)

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
