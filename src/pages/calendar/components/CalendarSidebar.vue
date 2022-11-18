<template lang="pug">
  .sidebar.flex.flex-col.bg-white(:class="openSidebar")
    .sidebar-wrapper.h-full.my-13px.flex.flex-col.justify-between(:style="sidebarWidth")
      .sidebar-content.items-center.flex.flex-col.gap-y-8.px-4.py-19px
        base-button(
          left-icon="icon-plus",
          rounded,
          :size="40",
          :icon-left-size="10",
          @click="openFormCreate",
          v-if="!isOpen"
        )
        base-button.w-full(
          right-icon="icon-plus",
          split,
          :size="40",
          :icon-right-size="10",
          :marginLeftIcon="7",
          @click="openFormCreate",
          v-else
        ) Создать событие
        calendar-sidebar-event(:is-open="isOpen", :event-type="eventTypes")
        calendar-sidebar-teammate(:team-data="teamData", :is-open="isOpen")
        .button-wrapper.flex.justify-center.mb-23px
          base-button(
            left-icon="icon-long-arrow",
            rounded, :size="40",
            :icon-left-size="18",
            secondary,
            :style="{ transform: `rotate(${turnButton})`}",
            @click="changeSize"
          )
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
import CalendarSidebarEvent from "./CalendarSidebarEvent.vue";
import CalendarSidebarTeammate from "./CalendarSidebarTeammate.vue";

export default {
  name: "CalendarSidebar",
  components: {
    BaseButton,
    CalendarSidebarEvent,
    CalendarSidebarTeammate,
  },
  props: {
    teamData: Array,
    openFormCreate: Function,
    eventTypes: Array,
  },
  data() {
    return {
      widthSidebarOpen: "232px",
      widthSidebarClose: "72px",
      isOpen: false,
      turnButton: "180deg",
    };
  },
  computed: {
    openSidebar() {
      return {
        "open-sidebar": this.isOpen,
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
  },
};
</script>

<style lang="sass" scoped>
.sidebar
  border-top-right-radius: 4px

.sidebar-wrapper
  border-left: 2px solid var(--btn-blue-color-3)

.open-sidebar
  .sidebar-content
    display: flex
    flex-direction: column
    row-gap: 32px
    padding: 19px 16px
    align-items: center
    width: 232px

  .button-wrapper
    justify-content: end
    padding-right: 16px
</style>
