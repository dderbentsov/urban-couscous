<template lang="pug">
  .layout-switch-wrapper.inline-block
    button#day.py-2.px-3(:class="dayLayoutState" @click="changeSelectedLayout") День
    button#week.py-2.px-3(:class="weekLayoutState" @click="changeSelectedLayout") Неделя
</template>

<script>
export default {
  name: "CalendarLayoutSwitch",
  data() {
    return {
      selectedLayout: "day",
    };
  },
  computed: {
    dayLayoutState() {
      return {
        active: this.selectedLayout === "day",
      };
    },
    weekLayoutState() {
      return {
        active: this.selectedLayout === "week",
      };
    },
  },
  methods: {
    changeSelectedLayout(event) {
      this.selectedLayout = event.target.id;
      this.$emit("selected", event.target.id);
    },
  },
};
</script>

<style lang="sass" scoped>
.active
  background-color: var(--btn-blue-color-4)
  color: var(--default-white)
  border-radius: 4px

.layout-switch-wrapper
  background-color: var(--bg-lavender-color)
  color: var(--font-dark-blue-color)
  border-radius: 4px
</style>
