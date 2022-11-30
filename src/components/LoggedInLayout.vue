<template lang="pug">
.flex.flex-col.w-full.h-full.gap-y-2
    the-header(
      :is-open-form="isOpenForm",
      :close-form="closeForm",
      :open-form="openForm",
      @update-client="setUpdatedClients"
    )
    .flex.flex-auto
      the-sidebar
      router-view(
        :open-form="openForm",
        :is-open-form="isOpenForm",
        :updated-clients="updatedClients",
        @reset-updated-clients="resetUpdatedClients"
      )
    the-notification-provider
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheSidebar from "@/components/TheSidebar";
import TheNotificationProvider from "@/components/Notifications/TheNotificationProvider";

export default {
  name: "LoggedInLayout",
  components: { TheNotificationProvider, TheHeader, TheSidebar },
  data() {
    return {
      isOpenForm: false,
      updatedClients: false,
    };
  },
  methods: {
    openForm() {
      this.isOpenForm = true;
    },
    closeForm() {
      this.isOpenForm = false;
    },
    setUpdatedClients() {
      this.updatedClients = true;
    },
    resetUpdatedClients() {
      this.updatedClients = false;
    },
  },
};
</script>
