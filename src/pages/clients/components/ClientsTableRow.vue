<template lang="pug">
  tr.row-client.text-ms.cursor-pointer(:id="id")
    td.py-5
      .px-4.items-center.w-fit
        clients-table-checkbox(:is-check="isCheck" :check="check" :id="id")
    td.py-5
      .px-4.font-semibold.whitespace-nowrap {{fullName}}
    td.py-5
      .px-4.whitespace-nowrap {{age}}
    td.py-5
      .px-4.whitespace-nowrap {{jobTitle}}
    td.py-5
      .px-4.whitespace-nowrap.flex.items-center.gap-x-2
        .circle.w-2.h-2
        span {{priority}}
    td.py-5
      .px-4.whitespace-nowrap {{phone}}
    td.py-5
      .px-4.whitespace-nowrap {{email}}
    td.py-5
      .px-4.whitespace-nowrap.flex
        .w-fit.h-fit(v-for="network in networks" :key="network")
    td.py-5
      .px-4.whitespace-nowrap.gap-x-2.flex
        span {{meetingTime.date}}
        span.meeting-time.text-xs.leading-5 {{meetingTime.time}}
    td.py-5
      .px-4
        .relative.dots-button.icon-dots.text-center.cursor-pointer.leading-6(:tabindex="1" @click="(e) => openPopup(e)" @blur="handleUnFocusPopup")
          clients-action-popup(v-if="isOpenPopup")
</template>

<script>
import ClientsActionPopup from "@/pages/clients/components/ClientsActionPopup";
import ClientsTableCheckbox from "@/pages/clients/components/ClientsTableCheckbox";
export default {
  name: "ClientsTableRow",
  components: { ClientsTableCheckbox, ClientsActionPopup },
  data() {
    return {
      isOpenPopup: false,
    };
  },
  props: {
    id: String,
    check: Function,
    isCheck: Boolean,
    fullName: String,
    age: String,
    jobTitle: String,
    priority: String,
    phone: String,
    email: String,
    networks: Array,
    meetingTime: Object,
  },
  methods: {
    openPopup(e) {
      e.target.focus();
      this.isOpenPopup = !this.isOpenPopup;
    },
    handleUnFocusPopup() {
      this.isOpenPopup = false;
    },
  },
};
</script>

<style lang="sass" scoped>
.row-client
  color: var(--font-dark-blue-color)
  border-bottom: 1px solid #D3D4DC
  &:hover
    background-color: var(--bg-hover-row-table)
.circle
  background-color: var(--font-grey-color)
  border-radius: 50%
.meeting-time
  color: var(--font-grey-color)
.dots-button
  width: 20px
  height: 20px
  border-radius: 50%
  color: var(--font-grey-color)
  &:hover
    background-color: var(--btn-blue-color)
    color: var(--default-white)
</style>
