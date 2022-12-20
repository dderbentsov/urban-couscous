<template lang="pug">
  .flex.flex-col.gap-y-5
    .flex.justify-center.pl-8.pr-20.font-bold.text-xl Индивидуальный график
    form-change-shift(v-if="showForm", :close-form="closeForm")
    .flex
      .calendar-header-wrapper.flex.items-center.justify-between.py-3.pl-5.pr-6
        .flex
          base-button.left-arrow.mr-4(
            left-icon="icon-down-arrow",
            rounded,
            secondary,
            :iconLeftSize="16",
            :size="32"
          )
          base-button.right-arrow.mr-6(
            left-icon="icon-down-arrow",
            rounded,
            secondary,
            :iconLeftSize="16",
            :size="32"
          )
          .text.flex.items-center
        .flex.text-xl Жмых Олег Анатольевич
        base-button.font-semibold(:size="40", @click="openForm") Замена смен
</template>

<script>
import BaseButton from "@/components/base/BaseButton.vue";
import FormChangeShift from "@/pages/schedule/components/FormChangeShift.vue";
export default {
  name: "ScheduleHeader",
  components: { BaseButton, FormChangeShift },
  data() {
    return {
      showForm: false,
    };
  },
  methods: {
    openForm() {
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
    },
  },
};
</script>

<style lang="sass" scoped>
.calendar-header-wrapper
  width: 100%
  background-color: var(--default-white)
  height: 56px
  border-radius: 4px
  z-index: 10

.left-arrow
  padding: 3px 4px 0 4px !important
  transform: rotate(90deg)

.right-arrow
  padding: 3px 4px 0 4px !important
  transform: rotate(270deg)

.text
  color: var(--font-dark-blue-color)

.today
  opacity: 0.5
</style>
