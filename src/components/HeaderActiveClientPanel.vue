<template lang="pug">
  .change-person-wrapper(:class="openOptions")
    .header.flex.items-center.pl-1.pr-2
      img.img-wrapper.mr-2(:src="info.avatarSrc" alt="Charge person avatar")
      span.font-bold.text-sm.mr-6px {{ info.name }}
      .dot.mr-4
      .icon-wrapper.icon-down-arrow.flex.items-center.justify-center.text-xxs.cursor-pointer(@click="changeState")
    .options.flex.flex-col.p-4.mt-1.font-medium.text-sm.gap-y-3(v-if="isOpen")
      .flex.items-center.cursor-pointer
        .options-icon-wrapper.icon-star-off.flex.items-center.justify-center.text-base.mr-2
        span Снять с ведения
      .flex.items-center.cursor-pointer
        .options-icon-wrapper.icon-table.flex.items-center.justify-center.text-lg.mr-2.pb-px
        span Перейти в таблицу
      .flex.items-center.cursor-pointer
        .options-icon-wrapper.flex.items-center.justify-center.icon-user-data.text-base.mr-2
        span Данные 
</template>

<script>
export default {
  name: "HeaderActiveClientPanel",
  props: {
    info: Object,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    openOptions() {
      return {
        "open-options": this.isOpen,
      };
    },
  },
  methods: {
    changeState() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="sass" scoped>
.change-person-wrapper
  color: var(--default-white)

.open-options
  .header
    border-radius: 24px 24px 4px 4px
    color: var(-time-indicator-color)
  .icon-wrapper
    transform: rotate(180deg)

.header
  width: 314px
  height: 40px
  position: relative
  background-color: var(--btn-blue-color)
  border-radius: 40px
  position: relative

.img-wrapper
  width: 34px
  height: 34px

.icon-wrapper
  width: 24px
  height: 24px

.dot
  width: 6px
  height: 6px
  border-radius: 50%
  background-color: var(--btn-red-color)

.options
  position: absolute
  background-color: var(--btn-blue-color)
  width: 100%
  border-radius: 4px 4px 24px 24px

.options-icon-wrapper
  width: 20px
  height: 20px
</style>
