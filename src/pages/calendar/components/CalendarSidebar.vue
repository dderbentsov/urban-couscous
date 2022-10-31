<template lang="pug">
  .sidebar.flex.flex-col.bg-white(:class="openSidebar")
    .sidebar-wrapper.h-full.my-13px.flex.flex-col.justify-between(:style="sidebarWidth")
      .sidebar-content.items-center.flex.flex-col.gap-y-8.px-4.py-19px(v-if="!isOpen")
        base-button(left-icon="icon-plus", rounded, :size="40", :icon-left-size="10" @click="openFormCreate" )
        .flex.flex-col.items-center(v-if="!isOpen")
          base-button(left-icon="icon-plus", rounded, :size="24", :icon-left-size="10", secondary )
          .flex.flex-col.gap-y-2.items-center.mt-4
            .event.flex.items-center.justify-center(v-for="event in events" :key="event.id")
              .event-type(:style="{ background: event.color }")
        .flex.flex-col.items-center.gap-y-2.justify-center
          base-button.mb-2(left-icon="icon-plus", rounded, :size="24", :icon-left-size="10", secondary )
          .team-card(v-for="teammate in teamData" :key="teammate.id")
            base-avatar(:size="32")
              img(:src="teammate.avatar" alt="Team member" v-if="teammate.avatar")
              span(v-if="!teammate.avatar") {{`${teammate.last_name[0]}${teammate.first_name[0]}`}}
      .sidebar-content.items-center.flex.flex-col.gap-y-8.px-4.py-19px(v-else)
        base-button(right-icon="icon-plus", split, :size="40", :icon-right-size="10", @click="openFormCreate" ) Создать событие
        .flex.items-center.flex-col.gap-y-4
          .events-wrapper.flex.items-center.justify-between
            .flex {{ "Виды событий" }}
            base-button(left-icon="icon-plus", rounded, :size="24", :icon-left-size="10", secondary )
          .flex.flex-col.gap-y-2
            .relative.flex.items-center.gap-x-3.h-8(v-for="event in events")
              input.custom-input.py-2.pl-6.h-full.not-italic.font-medium.text-xxs(
                :placeholder="event.name"
                :key="event.id")
              .event-type(:style="{ background: event.color }")
              span.icon-edit.cursor-pointer
        .flex.flex-col.gap-y-4
          .events-wrapper.flex.items-center.justify-between
            .flex {{ "Команды" }}
            base-button(left-icon="icon-plus", rounded, :size="24", :icon-left-size="10", secondary )
          .box-team.flex.flex-col.gap-y-2
            .team-card.flex.items-center.justify-between.cursor-pointer(
              v-for="teammate in teamData"
              :key="teammate.id")
              .flex.items-center
                base-avatar(:size="32")
                  img(:src="teammate.avatar" alt="Team member" v-if="teammate.avatar")
                  span(v-if="!teammate.avatar") {{`${teammate.last_name[0]}${teammate.first_name[0]}`}}
                .flex.ml-2.not-italic.font-medium.text-xxs {{ changeName(teammate.last_name, teammate.first_name, teammate.patronymic) }}
              span.icon-change-place.cursor-pointer.w-5.flex.items-center.justify-center.w-6.h-6
      .button-wrapper.flex.justify-center.mb-23px
        base-button(left-icon="icon-long-arrow", rounded, :size="40", :icon-left-size="18", secondary, :style="{ transform: `rotate(${turnButton})`}", @click="changeSize")
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
import BaseAvatar from "@/components/base/BaseAvatar";

export default {
  name: "CalendarSidebar",
  components: {
    BaseButton,
    BaseAvatar,
  },
  props: {
    teamData: Array,
    openFormCreate: Function,
  },
  data() {
    return {
      events: [
        { id: 1, name: "Встреча", color: "var(--bg-event-green-color)" },
        { id: 2, name: "Планерка", color: "var(--bg-event-red-color)" },
        { id: 3, name: "Интервью", color: "var(--bg-event-yellow-color)" },
        { id: 4, name: "Важная работа", color: "var(--bg-event-blue-color)" },
      ],
      widthSidebarOpen: "232px",
      widthSidebarClose: "72px",
      isOpen: false,
      turnButton: "180deg",
      maxLengthLastName: 13,
    };
  },
  computed: {
    openSidebar() {
      return {
        "open-sidebar": this.isOpen,
      };
    },
    buttonStyled() {
      return {
        "button-styled": true,
      };
    },
    sidebarWidth() {
      if (this.isOpen) {
        return {
          width: this.widthSidebarOpen,
        };
      }
      return {
        width: this.widthSidebarClose,
      };
    },
    defaultName(last, first) {
      return `${last[0]}${first[0]}`;
    },
  },
  methods: {
    changeSize() {
      this.isOpen = !this.isOpen;
      this.$emit(
        "width",
        this.isOpen ? this.widthSidebarOpen : this.widthSidebarClose
      );
      this.turnButton = this.isOpen ? "0deg" : "180deg";
    },
    changeName(lastName, fitstName, patronymic) {
      return lastName.length > this.maxLengthLastName
        ? lastName.slice(0, this.maxLengthLastName) +
            "... " +
            fitstName[0] +
            "." +
            patronymic[0] +
            "."
        : lastName + " " + fitstName[0] + "." + patronymic[0] + ".";
    },
  },
};
</script>

<style lang="sass" scoped>
.sidebar-wrapper
  border-left: 2px solid var(--btn-blue-color-3)

.button-plus
  max-height: 40px
  background: var(--btn-blue-color)
  color: var(--default-white)

.event
  width: 32px
  height: 32px
  background: var(--bg-event-box-color)
  border-radius: 4px

.event-type
  width: 16px
  height: 16px
  border-radius: 2px

.avatar-wrapper
  width: 32px
  height: 32px

.open-button
  width: 40px
  height: 40px
  max-height: 40px

.button-styled
  max-height: 24px
  background: var(--btn-blue-color-1)
  color: var(--btn-blue-color)

.open-sidebar
  .sidebar-content
    align-items: flex-end
    padding-left: 15px
  .event-type
    position: absolute
    width: 8px
    height: 16px
    top: 8px
    left: 8px
  .button-wrapper
    justify-content: end
    padding-right: 16px

.create-event
  width: 200px
  height: 40px
  border-radius: 4px

.events-wrapper
  width: 200px

.input-wrapper
  border: none
  background: var(--bg-event-box-color)
  height: 32px
  width: 169px

.team-card
  border-radius: 16px
  &:hover
    background: var(--font-dark-blue-color)
    color: var(--default-white)

.button
  width: 200px

.custom-input
  border-radius: 4px
  width: 169px
  outline: none
  background-color: var(--bg-event-box-color)
  &::placeholder
    color: var(--font-dark-blue-color)
  &:focus
    background-color: var(--font-dark-blue-color)
    color: var(--default-white)
    &::placeholder
      color: var(--default-white)
</style>
