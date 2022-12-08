<template lang="pug">
  .notification-container.flex.justify-between(:style="{ backgroundColor: bgColor }")
    .notification-content.flex.mr-16
      .grid(:class="{'grid-rows': message}")
        .text-white.text-xs.icon.row-span-full.flex.justify-center.items-center(:class="iconClass")
        .text-white.text-base.font-black(v-if="title") {{ title }}
        .text-white.text-base.font-semibold(v-if="message") {{ message }}
    .icon-cancel.cursor-pointer.text-white.opacity-50.text-sm(class="hover:opacity-100 active:opacity-75", @click="delNotification")
</template>

<script>
import { deleteNotification } from "@/components/Notifications/notificationContext";

export default {
  name: "NotificationItem",
  props: {
    id: String,
    title: String,
    message: String,
    type: String,
    lifeTime: Number,
  },
  data() {
    return {
      timerId: 0,
    };
  },
  computed: {
    iconClass() {
      switch (this.type) {
        case "error":
          return "icon-cancel";
        case "warning":
          return "icon-edit";
        case "success":
          return "icon-ok";
        default:
          return "icon-bell";
      }
    },
    bgColor() {
      switch (this.type) {
        case "error":
          return "#FF6565";
        case "warning":
          return "#FFBF42";
        case "success":
          return "#55CD76";
        default:
          return "#4772F2";
      }
    },
  },
  methods: {
    delNotification() {
      deleteNotification(this.id);
    },
  },
  mounted() {
    if (this.lifeTime)
      this.timerId = setTimeout(() => this.delNotification(), this.lifeTime);
  },
  beforeUnmount() {
    if (this.timerId) clearTimeout(this.timerId);
  },
};
</script>

<style scoped lang="sass">
.notification-container
  padding: 10px 10px 10px 24px
  box-shadow: 4px 4px 8px rgba(9, 10, 21, 0.1), -4px -4px 8px rgba(9, 10, 21, 0.1)
  border-radius: 5px
  width: 100%
  left: 0
.icon
  border-radius: 50%
  border: 1.5px solid white
  padding: 5px
  line-height: 10px
  width: 24px
  height: 24px
.grid
  grid-template-columns: 24px 1fr
  grid-column-gap: 8px
.grid-rows
  grid-template-rows: repeat(2, auto)
  grid-row-gap: 8px
</style>
