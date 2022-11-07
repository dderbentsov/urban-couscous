<template lang="pug">
  .flex.flex-col.items-center.w-full
    .flex.flex-col.items-center(v-if="!isOpen")
      base-button(left-icon="icon-plus", rounded, :size="24", :icon-left-size="10", secondary)
      .flex.flex-col.gap-y-2.items-center.mt-4
        .event.flex.items-center.justify-center(v-for="event in eventType" :key="event.id")
          .event-type(:style="{ background: event.color }")
    .flex.flex-col.gap-y-4.w-full(v-else)
      .flex.items-center.justify-between
        .flex.text-base.font-bold(:style="{ color: 'var(--font-dark-blue-color)' }") Виды событий
        base-button(
          v-if="isOpen",
          left-icon="icon-plus",
          rounded, :size="24",
          :icon-left-size="10",
          secondary
        )
      .flex.flex-col.gap-y-2
        .relative.flex.items-center.gap-x-3.h-8(v-for="event in eventType")
          input.custom-input.py-2.pl-6.h-full.not-italic.font-medium.text-xxs(
            :placeholder="event.label"
            :key="event.id"
          )
          .event-open(:style="{ background: event.color }")
          span.icon-edit.cursor-pointer
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
export default {
  name: "CalendarSidebarEvent",
  components: {
    BaseButton,
  },
  props: {
    isOpen: Boolean,
    eventType: Array,
  },
};
</script>

<style lang="sass" scoped>
.event
  width: 32px
  height: 32px
  background: var(--bg-event-box-color)
  border-radius: 4px

.event-type
  width: 16px
  height: 16px
  border-radius: 2px

.custom-input
  padding-top: 9px
  padding-left: 24px
  border: none
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

.event-open
  position: absolute
  width: 8px
  height: 16px
  top: 8px
  left: 8px
</style>
