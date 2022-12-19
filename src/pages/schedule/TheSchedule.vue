<template lang="pug">
  .wrapper.flex.w-full.relative.mx-2
    .schedule-wrapper.relative.flex.flex-col.px-6.py-6.h-full.w-full
      .schedule.flex-col
        .schedule-header.flex.w-full
          .flex.items-center(:style="{padding: '16px 102px'}")
            .text.font-bold Сотрудник
          .column-wrapper.flex
            .schedule-column.flex.flex-col.items-center.justify-center.px-2(
              v-for="day in result",
              :style="{backgroundColor: day.format('ddd') === 'сб' || day.format('ddd') === 'вс' ? 'var(--bg-white-color-1)' : ''}"
            )
              .day.flex {{day.format("D")}}
              .week.flex {{day.format("ddd")}}
        .schedule-body.flex.w-full
          .edit.flex.items-center.justify-center.h-9.w-9
            .flex.icon-edit
          .name.flex
</template>

<script>
import * as moment from "moment";
export default {
  name: "TheSchedule",
  data() {
    return {
      days: "",
      result: [],
      startMonth: moment("2022-12-01"),
    };
  },
  methods: {
    changeDays() {
      this.days = moment().daysInMonth();
    },
    pushMonth() {
      this.result.push(this.startMonth);
      for (let i = 2; i <= this.days; i++) {
        this.result.push(this.startMonth.clone().add(i - 1, "d"));
      }
    },
  },
  mounted() {
    this.changeDays();
    this.pushMonth();
  },
};
</script>

<style lang="sass" scoped>
.wrapper
  overflow: auto
  border-top-left-radius: 4px
  border-top-right-radius: 4px

.schedule-wrapper
  background-color: var(--default-white)
  height: calc(100vh - 64px)

.schedule
  border: 1.5px solid var(--border-light-grey-color-1)
  border-radius: 4px
  min-height: 87px

.schedule-header
  height: 50px
  background-color: #D7D9FF
  border-bottom: 1.5px solid var(--border-light-grey-color-1)
  border-top-left-radius: 2px
  border-top-right-radius: 2px

.column-wrapper
  max-width: 1080px
  overflow: auto

.text
  color: var(--btn-blue-color)

.name
  min-width: 255px
  max-width: 255px
  border-right: 1.5px solid var(--border-light-grey-color-1)

.edit
  border-right: 1.5px solid var(--border-light-grey-color-1)
</style>
