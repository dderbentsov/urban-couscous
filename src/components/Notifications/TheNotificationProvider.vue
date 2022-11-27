<template lang="pug">
  teleport(:to="appContainer")
    .flex.gap-2.flex-col.absolute.bottom-0.pb-2.right-2.overflow-hidden.pt-32(class="w-1/5")
      transition-group(name="list")
        notification-item(
            v-for="[id, notification] in notificationsList",
            :id="id",
            :key="id",
            :title="notification.title",
            :message="notification.message",
            :type="notification.type"
            :life-time="notification.lifeTime"
          )
</template>

<script>
import { notifications } from "@/components/Notifications/notificationContext";
import BaseButton from "@/components/base/BaseButton";
import NotificationItem from "@/components/Notifications/NotificationItem";

export default {
  name: "TheNotificationProvider",
  components: { NotificationItem, BaseButton },

  computed: {
    appContainer() {
      return this.$.appContext.app._container;
    },
    notificationsList() {
      return Object.entries(notifications);
    },
  },

  watch: {
    notificationsList(val) {
      console.log(val);
    },
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-leave-active {
  position: absolute;
}
.list-move {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
  pointer-events: none;
}
</style>
