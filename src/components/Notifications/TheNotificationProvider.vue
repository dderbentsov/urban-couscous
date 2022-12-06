<template lang="pug">
  teleport(:to="appContainer")
  .absolute.bottom-0.p-2.right-0.overflow-hidden.z-50(class="w-1/4 xl:w-1/3 sm:w-1/2")
    .pt-32(v-if="displayPadding")
    .flex.gap-2.flex-col.relative
      transition-group(name="list", @before-leave="displayPadding = true", @after-leave="displayPadding = false")
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

  data() {
    return {
      displayPadding: false,
    };
  },

  computed: {
    appContainer() {
      return this.$.appContext.app._container;
    },
    notificationsList() {
      return Object.entries(notifications);
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
