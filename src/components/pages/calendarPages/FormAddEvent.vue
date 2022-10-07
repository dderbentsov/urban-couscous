<template lang="pug">
  .event-form-change(v-if="formOpen")
    .form-item-container
      .close-icon-position
        span.title-form Ответственный
        basic-icon.close-icon(width="16" height="16" icon-color="#252850" @click="closeEventForm")
          close-icon
      .input-container(@click="openSelectResponsible")
        .form-select
          .form-item-input.select-container-res {{eventData.responsible}}
            .option-container(v-if="selectResponsibleOpen" id="responsible" @click="(event)=>chooseOption(event)")
              .option-item(v-for="(responsible, index) in listResponsible" :key="index" :id="index") {{responsible}}
        .select-form-separator
        basic-icon(width="24" height="24" icon-color="#090A15")
          arrow-down-icon
    .form-item-container
      span.title-form Оновная информация
      .form-inform-container
        basic-icon(width="24" height="24" icon-color="#090A15" )
          clock-icon
        .time-input-container
          .input-container
            input.form-item-input(v-model="eventData.timeEvent.firstTime" type="time" min="08:00" max="18:00")
          span —
          .input-container
            input.form-item-input(v-model="eventData.timeEvent.secondTime" type="time" min="08:00" max="18:00")
      .form-inform-container
        basic-icon(width="24" height="24" icon-color="#090A15")
          user-icon
        .input-container
          input.form-item-input(v-model="eventData.eventClient" type="text" placeholder="ФИО клиента")
    .form-item-container(class='additional-information')
      .form-inform-container
        span.title-form Дополнительная информация
        button-plus(id="addInfo" @click="(e)=>addFriendInfo(e)")
      .form-inform-container(v-for="(info, index) in listFriendInfo" :key="index")
        span.number-additional {{info}}
        .input-container
          input.form-item-input(v-model="eventData.friendInfo[info]" type="text" placeholder="Что-то важное")
    .form-item-container
      span.title-form Вид события
      .input-container(@click="openSelectKindEvent")
        .form-select
          .form-item-input.select-container-kind {{eventData.kindEvent}}
            .option-container(v-if="selectKindEventOpen" id="kind" @click="(event)=>chooseOption(event)")
              .option-item(v-for="(kind, index) in kindEvents" :key="index" :id="index") {{kind}}
        .select-form-separator
        basic-icon(width="24" height="24" icon-color="#090A15")
          arrow-down-icon
    .form-item-container
      .form-inform-container
        span.title-form Контакты
        button-plus(id="addContact" @click="(e)=>addFriendInfo(e)")
      .form-inform-container(v-for="(contact, index) in listContacts" :key="index")
        basic-icon(width="24" height="20" icon-color="#090A15")
          mail-icon
        .input-container
          input.form-item-input(v-model="eventData.contacts[contact]" type="text" placeholder="E-mail")
    add-event-button(@click="createEvent")
</template>

<script>
import BasicIcon from "@/components/iconsComponents/basicIcon/BasicIcon";
import ArrowDownIcon from "@/components/iconsComponents/ArrowDownIcon";
import ClockIcon from  "@/components/iconsComponents/ClockIcon";
import UserIcon from "@/components/iconsComponents/UserSmallIcon";
import MailIcon from "@/components/iconsComponents/MailIcon";
import CloseIcon from "@/components/iconsComponents/CloseIcon"
import AddEventButton from "@/components/baseComponents/buttons/AddEventButton";
import ButtonPlus from "@/components/baseComponents/buttons/ButtonPlus";
export default {
  name: "FormChangeEvent",
  components: {ClockIcon, ArrowDownIcon, UserIcon, MailIcon, CloseIcon, BasicIcon, AddEventButton, ButtonPlus},
  props: {
    listResponsible: {
      default: ["Захарова А.О.", "Коломойцев И.К.", "Ситников А.Г."]
    }
  },
  data() {
    return {
      formOpen: true,
      selectResponsibleOpen: false,
      selectKindEventOpen: false,
      listFriendInfo: [1],
      listContacts: [1],
      kindEvents: ["Встреча", "Планерка", "Интервью","Важная работа"],
      eventData: {
        responsible: "Выберите ответственного",
        eventClient: "",
        timeEvent: {
          firstTime: "11:00",
          secondTime: "12:30",
        },
        friendInfo: {},
        kindEvent: "Вид события",
        contacts: {}
      }
    }
  },
  methods: {
    createEvent() {
      this.formOpen = !this.formOpen
    },
    addFriendInfo(e) {
      if(e.currentTarget.id === "addInfo") {
        this.listFriendInfo.push(this.listFriendInfo[this.listFriendInfo.length-1]+1)
      }
      if(e.currentTarget.id === "addContact") {
        this.listContacts.push(this.listContacts[this.listContacts.length-1]+1)
      }
    },
    closeEventForm() {
      this.formOpen=!this.formOpen
    },
    openSelectResponsible() {
      this.selectResponsibleOpen = !this.selectResponsibleOpen
    },
    openSelectKindEvent() {
      this.selectKindEventOpen = !this.selectKindEventOpen
    },
    chooseOption(event) {
      if(event.currentTarget.id === "responsible") {
        this.eventData.responsible=this.listResponsible[event.target.id]
      }
      if(event.currentTarget.id === "kind") {
        this.eventData.kindEvent=this.kindEvents[event.target.id]
      }
    }
  }
}
</script>

<style lang="sass">
  .event-form-change
    position: relative
    display: flex
    flex-direction: column
    height: fit-content
    row-gap: 24px
    min-width: 448px
    padding: 21px 32px 24px 32px
    background-color: var(--bg-white-color)
    box-shadow: -4px -4px 16px rgba(9, 10, 21, 0.25), 4px 4px 16px rgba(9, 10, 21, 0.25)
    border-radius: 4px
  .title-form
    font-size: 12px
    line-height: 14px
    font-style: normal
    opacity: 0.4
  .form-item-container
    display: flex
    flex-direction: column
    row-gap: 8px
  .input-container
    display: flex
    column-gap: 8px
    align-items: center
    cursor: pointer
    border-radius: 4px
    padding: 8px 16px 8px 16px
    width: fit-content
    background-color: var(--bg-ligth-blue-color)
  .form-item-input
    font-family: Raleway, sans-serif
    font-style: normal
    font-size: 16px
    appearance: none
    border: none
    outline: none
    cursor: pointer
    color: rgba(9, 10, 21, 0.5)
    background-color: rgba(9, 10, 21, 0)
    &::-webkit-calendar-picker-indicator
      display: none
      -webkit-appearance: none
  .select-form-separator
    background-color: rgba(65, 105, 225, 0.2)
    height: 24px
    width: 1px
    border-radius: 1px
  .time-input-container
    display: flex
    align-items: center
    column-gap: 8px
  .form-inform-container
    display: flex
    align-items: center
    column-gap: 16px
  .number-additional
    margin-left: 6px
  .close-icon
    cursor: pointer
  .close-icon-position
    display: flex
    justify-content: space-between
    padding-top: 10px
  .form-select
    position: relative
    display: flex
    flex-direction: column
  .option-container
    position: absolute
    width: max-content
    background-color: var(--bg-ligth-blue-color)
    z-index: 3
  .option-item
    color: var(--font-black-color)
    font-family: Raleway, sans-serif
    font-style: normal
    font-size: 16px
    &:hover
      background-color: var(--btn-blue-color)
  .select-container-res
    min-width: 205px
  .select-container-kind
    min-width: 119px
</style>
