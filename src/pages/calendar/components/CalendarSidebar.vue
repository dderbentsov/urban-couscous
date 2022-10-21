<template lang="pug">
  .sidebar.flex.flex-col.bg-white
    .sidebar-wrapper.h-full.my-13px
      .sidebar-content.items-center.flex.flex-col.gap-y-8.px-4.py-19px
        base-button-plus
        .flex.flex-col.items-center
          base-button-plus(:class="buttonStyled")
          .flex.flex-col.gap-y-2.items-center.mt-4
            .event.flex.items-center.justify-center(v-for="event in events" :key="event.id")
              .event-type(:style="{ background: event.color }")
        .flex.flex-col.items-center.gap-y-2.justify-center
          base-button-plus.mb-2(:class="buttonStyled")
          .team-card(v-for="teammate in team" :key="teammate.id")
            img.avatar-wrapper(:src="teammate.avatar" alt="Team member")
        base-open-button.mt-148px(@click="changeSize" :style="{ transform: `rotate(${turnButton})` }")
</template>

<script>
import BaseButtonPlus from "../../../components/base/buttons/BaseButtonPlus.vue";
import BaseOpenButton from "../../../components/base/buttons/BaseOpenButton.vue";
export default {
  components: {
    BaseButtonPlus,
    BaseOpenButton,
  },
  props: {
    team: Array,
  },
  data() {
    return {
      events: [
        { id: 1, color: "var(--bg-event-meeting-color)" },
        { id: 2, color: "var(--bg-event-planning-color)" },
        { id: 3, color: "var(--bg-event-interview-color)" },
        { id: 4, color: "var(--bg-event-work-color)" },
      ],
      widthSidebarOpen: "152px",
      widthSidebarClose: "312px",
      isOpen: false,
      turnButton: "180deg",
    };
  },
  computed: {
    buttonStyled() {
      return {
        "button-styled": true,
      };
    },
  },
  methods: {
    changeSize() {
      this.isOpen = !this.isOpen;
      this.$emit("width", {
        width: this.isOpen ? this.widthSidebarClose : this.widthSidebarOpen,
      });
      this.turnButton = this.isOpen ? "0deg" : "180deg";
    },
  },
};
</script>

<style lang="sass" scoped>
.sidebar
  width: 72px
.sidebar-wrapper
  border-left: 2px solid var(--btn-blue-color-3)
.button-plus
  width: 40px
  height: 40px
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
  width: 24px
  height: 24px
  max-height: 24px
  background: var(--btn-blue-color-1)
  color: var(--btn-blue-color)
  font-size: 10px
</style>
