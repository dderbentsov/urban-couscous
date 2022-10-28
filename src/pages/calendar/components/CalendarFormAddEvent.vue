<template lang="pug">
  .flex.flex-col.gap-y-6.pt-6.pb-7.px-8.event-form.absolute.right-2.bottom-14
    .flex.flex-col.gap-y-2
      .flex.justify-between.pt-2
        span.not-italic.text-xs.opacity-40.leading-3 Ответственный
        .icon-cancel.close-icon.text-xs.cursor-pointer(@click="closeForm")
      base-select.ba-sel(
        width="205px"
        :option-data="eventData.responsible"
        :list-data="listResponsible"
        :choose-option="chooseOptionResponsible"
      )
    .flex.flex-col.gap-y-2
      span.not-italic.text-xs.opacity-40.leading-3 Основная информация
      .flex.gap-x-4.items-center
        .icon-time.text-xl.icon
        .flex.gap-x-2.items-center
          .form-item.flex.gap-x-2.px-4.py-2.items-center
            input.item-input.no-italic.text-base.cursor-text(v-model="eventData.timeEvent.firstTime" type="time" min="08:00" max="18:00")
          span —
          .form-item.flex.gap-x-2.px-4.py-2.items-center
            input.item-input.no-italic.text-base.cursor-text(v-model="eventData.timeEvent.secondTime" type="time" min="08:00" max="18:00")
      .flex.gap-x-4.items-center
        .icon-person.text-xl.icon
        .form-item.cursor-pointer.flex.gap-x-2.px-4.py-2.items-center
          input.item-input.cursor-text.no-italic.text-base(v-model="eventData.eventClient" type="text" placeholder="ФИО клиента")
    //- .flex.flex-col.gap-y-2(class='additional-information')
      //- .flex.gap-x-4.items-center
      //-   span.not-italic.text-xs.opacity-40.leading-3 Дополнительная информация
      //-   button-plus(id="addInfo" @click="(e)=>addFriendInfo(e)")
      //-   base-button(
            left-icon="icon-plus"
            rounded secondary
            :size="24"
            :icon-left-size="10"
            id="addInfo"
            @click="(e)=>addFriendInfo(e)")
      //- .flex.gap-x-4.items-center(v-for="(info, index) in listFriendInfo" :key="index")
      //-   span.ml-1 {{info}}
      //-   .form-item.cursor-pointer.flex.gap-x-2.px-4.py-2.items-center
      //-     input.item-input.cursor-pointer.no-italic.text-base(v-model="eventData.friendInfo[info]" type="text" placeholder="Что-то важное")
    .flex.flex-col.gap-y-2
      span.not-italic.text-xs.opacity-40.leading-3 Вид события
      base-select(
        width="118px"
        :option-data="eventData.kindEvent"
        :list-data="kindEvents"
        :choose-option="chooseOptionTypeEvent"
      )
    .flex.flex-col.gap-y-2
      .flex.gap-x-4.items-center
        span.not-italic.text-xs.opacity-40.leading-3 Контакты
        base-button(
        left-icon="icon-plus"
        rounded secondary
        :size="24"
        :icon-left-size="10"
        id="addContact"
        @click="(e)=>addFriendInfo(e)")
      .flex.gap-x-4.items-center(v-for="(contact, index) in listContacts" :key="index")
        .icon-mail.text-xl.icon
        .form-item.cursor-pointer.flex.gap-x-2.px-4.py-2.items-center
          input.item-input.cursor-text.no-italic.text-base(v-model="eventData.contacts[contact]" type="text" placeholder="E-mail")
    base-button.styled-button.not-italic.text-base.font-semibold(
    :size="40"
    @click="closeForm"
    ) Создать событие
</template>

<script>
import BaseSelect from "@/components/base/BaseSelect";
import BaseButton from "@/components/base/BaseButton";
export default {
  name: "FormChangeEvent",
  components: { BaseSelect, BaseButton },
  props: {
    closeForm: Function,
    listResponsible: {
      default: ["Захарова А.О.", "Коломойцев И.К.", "Ситников А.Г."],
    },
  },
  data() {
    return {
      listFriendInfo: [1],
      listContacts: [1],
      kindEvents: ["Встреча", "Планерка", "Интервью", "Важная работа"],
      eventData: {
        responsible: "Выберите ответственного",
        eventClient: "",
        timeEvent: {
          firstTime: "11:00",
          secondTime: "12:30",
        },
        // friendInfo: {},
        kindEvent: "Вид события",
        contacts: {},
      },
    };
  },
  methods: {
    chooseOptionResponsible(e) {
      this.eventData.responsible = e.target.id;
    },
    chooseOptionTypeEvent(e) {
      this.eventData.kindEvent = e.target.id;
    },
    addFriendInfo(e) {
      if (e.currentTarget.id === "addInfo") {
        this.listFriendInfo.push(
          this.listFriendInfo[this.listFriendInfo.length - 1] + 1
        );
      }
      if (e.currentTarget.id === "addContact") {
        this.listContacts.push(
          this.listContacts[this.listContacts.length - 1] + 1
        );
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.ba-sel
  color: red
.event-form
  height: fit-content
  min-width: 448px
  background-color: var(--default-white)
  box-shadow: -4px -4px 16px rgba(9, 10, 21, 0.25), 4px 4px 16px rgba(9, 10, 21, 0.25)
  border-radius: 4px
  z-index: 5

.form-item
  border-radius: 4px
  width: fit-content
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
