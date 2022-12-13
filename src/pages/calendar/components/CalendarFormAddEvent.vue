<template lang="pug">
  .flex.flex-col.gap-y-6.pt-6.pb-7.px-8.event-form.fixed.right-6.bottom-6(
    v-click-outside="clearForm"
  )
    .flex.justify-between
      span.title.text-xl.font-bold {{!selectedEventData.id ? "Назначение события" : "Изменение события"}}
      .flex.pt-2
        .icon-cancel.close-icon.tesxt-xs.cursor-pointer(@click="clearForm")
    .flex.flex-col.gap-y-8
      .flex.flex-col.gap-y-2
        span.text-xs.opacity-40.font-bold.leading-3 Вид события
        base-custom-select.select(
          v-model="kind",
          :items="eventTypes",
          placeholder="Вид события"
        )
      .flex.flex-col(class="gap-y-1.5")
        span.text-sm Сотрудник
        base-custom-select.select(
          :items="ownersList",
          v-model="employees.employee",
          placeholder="Выберите сотрудника"
        )
      .flex.flex-col(class="gap-y-1.5")
        span.text-sm Клиент
        base-custom-select.select(
          :items="membersList",
          v-model="members.person",
          placeholder="Выберите клиента",
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
            base-input-time.item-input.text-base.select(
              v-model:value="startTime",
              :width-input="72"
            )
          span.mt-4 —
          .flex.flex-col(class="gap-y-1.5")
            span.text-xs.opacity-40.font-bold.leading-3 Конец
            base-input-time.item-input.text-base.select(
              v-model:value="endTime",
              :width-input="72"
            )
    base-button.create-button.text-base.font-semibold(
      v-if="!selectedEventData.id",
      :size="40",
      :disabled="disabledCreateButton",
      @click="sendEventData",
    ) Создать событие
    base-button.update-button.text-base.font-semibold(
      v-else,
      :size="40",
      :disabled="disabledUpdateButton",
      @click="updateEventData",
    ) Сохранить
</template>

<script>
import TheNotificationProvider from "@/components/Notifications/TheNotificationProvider";
import { addNotification } from "@/components/Notifications/notificationContext";
import { fetchWrapper } from "@/shared/fetchWrapper.js";
import BaseInputTime from "@/components/base/BaseInputTime.vue";
import BaseInput from "@/components/base/BaseInput.vue";
import BaseInputDate from "@/components/base/BaseInputDate.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";
import BaseCustomSelect from "@/components/base/BaseCustomSelect.vue";
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
    BaseCustomSelect,
    TheNotificationProvider,
  },
  emits: ["clear-selected-event-data", "close-change-form"],
  props: {
    closeForm: Function,
    ownersData: {
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
    eventTypes: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
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
      membersData: [],
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
    disabledCreateButton() {
      if (
        this.eventDate &&
        this.startTime &&
        this.endTime &&
        this.members.person.label &&
        this.employees.employee.label &&
        this.kind.label
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
        this.kind.label === this.selectedEventData.kind &&
        this.employees.employee.id ===
          this.personId(this.selectedEventData.employees, "employee") &&
        this.members.person.id ===
          this.personId(this.selectedEventData.members, "person")
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
        let foundEmployee = this.selectedEventData.employees.find(
          ({ role }) => role === this.EMPLOYEE_TYPE
        );
        let {
          employee: { id, last_name, first_name, patronymic },
          ...rest
        } = foundEmployee;
        return {
          employee: {
            id: id,
            label: this.trimOwnerName(last_name, first_name, patronymic),
          },
          id: rest.id,
          role: rest?.role || this.EMPLOYEE_TYPE,
        };
      }
      return {
        employee: {
          id: null,
          label: "",
        },
        role: this.EMPLOYEE_TYPE,
      };
    },
    eventMember() {
      if (this.selectedEventData.members) {
        let foundMember = {};
        if (this.selectedEventData.members.length > 1) {
          foundMember = this.selectedEventData.members.find(
            ({ role }) => role === this.MEMBER_TYPE
          );
        } else foundMember = this.selectedEventData.members[0];
        let {
          person: { id, last_name, first_name, patronymic },
          ...rest
        } = foundMember;
        return {
          person: {
            id: id,
            label: this.trimMemberName(last_name, first_name, patronymic),
          },
          id: rest.id,
          role: rest?.role || this.MEMBER_TYPE,
        };
      }
      return {
        person: {
          id: null,
          label: "",
        },
        role: this.MEMBER_TYPE,
      };
    },
    eventKind() {
      return this.selectedEventData.kind
        ? {
            label: this.selectedEventData.kind,
            id: null,
          }
        : {
            label: "",
            id: null,
          };
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
    async sendEventData() {
      this.eventData = {
        start: this.mergeDate(this.eventDate, this.startTime),
        end: this.mergeDate(this.eventDate, this.endTime),
        kind: this.kind.label,
        employees: [
          this.findPerson(this.ownersData, this.employees, "employee"),
        ],
        members: [this.findPerson(this.membersData, this.members, "person")],
      };
      await this.postCreateEvent(this.eventData);
      this.eventData = {};
    },
    async updateEventData() {
      if (
        Object.keys(
          this.findPerson(this.ownersData, this.employees, "employee")
        ).length > 0 &&
        Object.keys(this.findPerson(this.membersData, this.members, "person"))
          .length > 0
      ) {
        this.eventData = {
          start: this.mergeDate(this.eventDate, this.startTime),
          end: this.mergeDate(this.eventDate, this.endTime),
          kind: this.kind.label,
          employees: [
            this.findPerson(this.ownersData, this.employees, "employee"),
          ],
          members: [this.findPerson(this.membersData, this.members, "person")],
        };
        await this.postUpdateEvent(this.id, this.eventData);
        this.eventData = {};
      } else
        this.addErrorNotification(
          "Событие не может быть изменено",
          "Клиент был удален"
        );
    },
    clearForm() {
      if (this.selectedEventData.id) this.$emit("close-change-form");
      this.$emit("clear-selected-event-data");
      this.closeForm();
    },
    mergeDate(eventDate, time) {
      return moment(`${eventDate} ${time}`).format("YYYY-MM-DDTHH:mm:ss");
    },
    findPerson(requestedList, object, field) {
      let foundPerson = requestedList.find(({ id }) => id === object[field].id);
      if (foundPerson) {
        let returnedData = {
          [field]: {
            id: foundPerson.id,
            last_name: foundPerson.last_name,
            first_name: foundPerson.first_name,
            patronymic: foundPerson.patronymic,
            color: foundPerson.color,
          },
          role: object.role,
        };
        if (object.id) returnedData.id = object.id;
        return returnedData;
      }
      return {};
    },
    async postCreateEvent(event) {
      const response = await fetchWrapper.post("registry/event/create/", event);
      if (response.type && response.type === "validation_error") {
        this.addErrorNotification(
          response.errors[0].code,
          response.errors[0].detail
        );
      } else {
        this.addSuccessNotification("Событие успешно создано");
        this.clearForm();
      }
    },
    async postUpdateEvent(id, event) {
      const response = await fetchWrapper.post(
        `registry/event/${id}/update/`,
        event
      );
      if (response.type && response.type === "validation_error") {
        this.addErrorNotification(
          response.errors[0].code,
          response.errors[0].detail
        );
      } else {
        this.addSuccessNotification("Изменения успешно сохранены");
        this.clearForm();
      }
    },
    personId(object, field) {
      if (object) {
        let foundPerson = {};
        if (field === "employee") {
          foundPerson = object.find(({ role }) => role === this.EMPLOYEE_TYPE);
        }
        if (field === "person") {
          if (object.length > 1) {
            foundPerson = object.find(({ role }) => role === this.MEMBER_TYPE);
          }
          foundPerson = object[0];
        }
        let {
          [field]: { id },
        } = foundPerson;
        return id;
      }
    },
    addErrorNotification(title, message) {
      addNotification(new Date().getTime(), title, message, "error", 5000);
    },
    addSuccessNotification(message) {
      addNotification(new Date().getTime(), message, "", "success", 5000);
    },
    fetchMembersData() {
      fetchWrapper
        .get("general/person/?limit=100")
        .then((res) => this.saveMembersData(res));
    },
    saveMembersData(res) {
      this.membersData = res.results;
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
  mounted() {
    this.fetchMembersData();
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
