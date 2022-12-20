<template lang="pug">
.flex.flex-col.w-full.h-full.gap-y-2
    the-header(
      :url="url",
      :is-open-form="isOpenForm",
      :close-form="closeForm",
      :open-form="openForm",
      :set-updated-clients="setUpdatedClients",
      :write-created-client-id="writeCreatedClientId"
    )
    .flex.flex-auto
      the-sidebar
      router-view(
        :open-form="openForm",
        :is-open-form="isOpenForm",
        :updated-clients="updatedClients",
        @reset-updated-clients="resetUpdatedClients",
        :url="url",
        :created-client-id="createdClientId"
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
      url: "http://45.84.227.122:8080",
      createdClientId: "",
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
      if (this.$router.currentRoute._value.path === "/clients")
        this.updatedClients = true;
    },
    resetUpdatedClients() {
      this.updatedClients = false;
      this.createdClientId = "";
    },
    writeCreatedClientId(id) {
      if (this.$router.currentRoute._value.path === "/clients")
        this.createdClientId = id;
    },
  },
};
</script>
