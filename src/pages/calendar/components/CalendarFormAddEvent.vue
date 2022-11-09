<template lang="pug">
  .flex.flex-col.gap-y-6.pt-6.pb-7.px-8.event-form.absolute.right-0.bottom-14
    .flex.justify-between
      span.title.text-xl.font-bold {{!selectedEventData.id ? "Назначение события" : "Изменение события"}}
      .flex.pt-2
        .icon-cancel.close-icon.tesxt-xs.cursor-pointer(@click="clearForm")
    .flex.flex-col.gap-y-8
      .flex.flex-col.gap-y-2
        span.text-xs.opacity-40.font-bold.leading-3 Вид события
        base-select.select(
          v-model="kind"
          :items="kindEvents"
          placeholder="Вид события"
          :style="{width: '570px'}"
        )
      .flex.flex-col(class="gap-y-1.5")
        span.text-sm Сотрудник
        base-select.select(
          v-if="!selectedEventData.employees",
          :items="ownersList",
          v-model="employees.employee",
          placeholder="Выберите сотрудника"
        )  
        base-select.select(
          v-else,
          v-model="employees.employee",
          :items="ownersList",
          :placeholder="employeeName"
          placeholderOpacity
        )
      .flex.flex-col(class="gap-y-1.5")
        span.text-sm Клиент
        base-select.select(
          v-if="!selectedEventData.members",
          :items="membersList",
          v-model="members.person",
          placeholder="Выберите клиента",
        )
        base-select.select(
          v-else,
          v-model="members.person",
          :items="membersList",
          :placeholder="memberName",
          placeholderOpacity
        )
    .flex.flex-col.gap-y-8
      .flex.gap-x-4
        .flex.gap-x-2
          .flex.flex-col(class="gap-y-1.5")
            span.text-xs.opacity-40.font-bold.leading-3 Дата
            base-input-date.select(v-model:value="eventDate")
        .flex.gap-x-2.items-center
          .flex.flex-col(class="gap-y-1.5")
            span.text-xs.opacity-40.font-bold.leading-3 Начало
            base-input-time.item-input.text-base.cursor-text.select(
              v-model:value="startTime",
              :width-input="72"
            )
          span.mt-4 —
          .flex.flex-col(class="gap-y-1.5")
            span.text-xs.opacity-40.font-bold.leading-3 Конец
            base-input-time.item-input.text-base.cursor-text.select(
              v-model:value="endTime",
              :width-input="72"
            )
    base-button.create-button.text-base.font-semibold(
      v-if="!selectedEventData.id",
      :size="40",
      :disabled="disabledCreateButton",
      @click="sendEventData"
    ) Создать событие
    base-button.update-button.text-base.font-semibold(
    v-else,
    :size="40",
    :disabled="disabledUpdateButton",
    @click="updateEventData",
    ) Сохранить
</template>

<script>
import { fetchWrapper } from "@/shared/fetchWrapper.js";
import BaseInputTime from "@/components/base/BaseInputTime.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseInputDate from "@/components/base/BaseInputDate.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
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
      kindEvents: [
        {
          id: 1,
          label: "Встреча",
        },
        {
          id: 2,
          label: "Планерка",
        },
        {
          id: 3,
          label: "Интервью",
        },
        {
          id: 4,
          label: "Важная работа",
        },
      ],
      EMPLOYEE_TYPE: "owner",
      MEMBER_TYPE: "primary",
      eventData: {},
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
    membersList() {
      if (this.membersData) {
        let filteredArray = [];
        this.membersData.forEach((elem) => {
          filteredArray.push({
            id: elem.id,
            label: this.trimMemberName(
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
    memberName() {
      if (this.selectedEventData.members) {
        let foundMember = {};
        if (this.selectedEventData.members.length > 1) {
          foundMember = this.selectedEventData.members.find(
            ({ role }) => role === this.MEMBER_TYPE
          );
        } else foundMember = this.selectedEventData.members[0];
        let {
          person: { last_name, first_name, patronymic },
        } = foundMember;
        return this.trimMemberName(last_name, first_name, patronymic);
      }
      return "";
    },
    employeeName() {
      if (this.selectedEventData.employees) {
        let foundEmployee = this.selectedEventData.employees.find(
          ({ role }) => role === this.EMPLOYEE_TYPE
        );
        let {
          employee: { last_name, first_name, patronymic },
        } = foundEmployee;
        return this.trimOwnerName(last_name, first_name, patronymic);
      }
      return "";
    },
    disabledCreateButton() {
      if (
        this.eventDate &&
        this.startTime &&
        this.endTime &&
        this.members.person &&
        this.employees.employee &&
        this.kind
      ) {
        return false;
      }
      return true;
    },
    disabledUpdateButton() {
      let start = moment.parseZone(this.selectedEventData.start);
      let end = moment.parseZone(this.selectedEventData.end);
      if (
        this.eventDate === start.format("YYYY-MM-DD") &&
        this.startTime === start.format("HH:mm") &&
        this.endTime === end.format("HH:mm") &&
        this.kind === this.selectedEventData.kind
      ) {
        return true;
      }
      return false;
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
    eventEmployee() {
      if (this.selectedEventData.employees) {
        return this.selectedEventData.employees;
      }
      return {
        employee: null,
        role: this.EMPLOYEE_TYPE,
      };
    },
    eventMember() {
      return this.selectedEventData.members
        ? this.selectedEventData.members
        : {
            person: null,
            role: this.MEMBER_TYPE,
          };
    },
    eventKind() {
      return this.selectedEventData.kind ? this.selectedEventData.kind : "";
    },
    eventId() {
      return this.selectedEventData.id ? this.selectedEventData.id : "";
    },
  },
  methods: {
    trimOwnerName(lastName, firsName, patronymic) {
      return `${lastName} ${firsName[0]}.${patronymic[0]}.`;
    },
    trimMemberName(lastName, firsName, patronymic) {
      return `${lastName} ${firsName} ${patronymic}`;
    },
    sendEventData() {
      this.eventData = {
        start: this.mergeDate(this.eventDate, this.startTime),
        end: this.mergeDate(this.eventDate, this.endTime),
        kind: this.kind,
        employees: [
          this.findPerson(
            this.ownersData,
            this.ownersList,
            this.employees,
            "employee"
          ),
        ],
        members: [
          this.findPerson(
            this.membersData,
            this.membersList,
            this.members,
            "person"
          ),
        ],
      };
      this.postCreateEvent(this.eventData);
      this.clearForm();
      this.eventData = {};
    },
    updateEventData() {
      this.eventData = {
        start: this.mergeDate(this.eventDate, this.startTime),
        end: this.mergeDate(this.eventDate, this.endTime),
        kind: this.kind,
      };
      this.postUpdateEvent(this.id, this.eventData);
      this.clearForm();
      this.eventData = {};
    },
    clearForm() {
      this.$emit("clear-selected-event-data");
      this.closeForm();
    },
    mergeDate(eventDate, time) {
      return moment(`${eventDate} ${time}`).format("YYYY-MM-DDTHH:mm:ss");
    },
    findPerson(requestedList, serializedList, object, field) {
      let foundId = serializedList.find(
        ({ label }) => label === object[field]
      ).id;
      let foundPerson = requestedList.find(({ id }) => id === foundId);
      return {
        [field]: {
          id: foundPerson.id,
          last_name: foundPerson.last_name,
          first_name: foundPerson.first_name,
          patronymic: foundPerson.patronymic,
          color: foundPerson.color,
        },
        role: object.role,
      };
    },
    postCreateEvent(event) {
      fetchWrapper
        .post("registry/event/create/", event)
        .then(this.$emit("update-events"));
    },
    postUpdateEvent(id, event) {
      fetchWrapper
        .post(`registry/event/${id}/update/`, event)
        .then(this.$emit("update-events"));
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
          this.id = this.eventId;
          this.kind = this.eventKind;
          this.employees = this.eventEmployee;
          this.members = this.eventMember;
        }
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.event-form
  height: fit-content
  width: 634px
  background-color: var(--default-white)
  box-shadow: var(--default-shadow)
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

.create-button
  width: 183px

.select
  height: 40px
  border: 2px solid var(--border-light-grey-color)
  border-radius: 4px

.update-button
  width: 132px
</style>
