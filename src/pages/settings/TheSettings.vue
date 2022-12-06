<template lang="pug">
  div
    v-select(:items="items", placeholder="Выберите значение", v-model="value" )
    BaseButton(@click="showModal = true") Открыть модалку
    base-modal(v-model="showModal", title="Тестовый заголовок окна" )
    base-button(@click="addNotification") Добавить уведомление
    base-loader
</template>

<script>
import VSelect from "@/components/base/BaseSelect";
import BaseModal from "@/components/base/BaseModal";
import BaseButton from "@/components/base/BaseButton";
import TheNotificationProvider from "@/components/Notifications/TheNotificationProvider";
import { addNotification } from "@/components/Notifications/notificationContext";
import BaseLoader from "@/components/Loader/BaseLoader";
export default {
  name: "TheSettings",
  components: {
    BaseLoader,
    TheNotificationProvider,
    BaseButton,
    BaseModal,
    VSelect,
  },
  data() {
    return {
      items: [
        {
          id: "1",
          label: "12312312",
        },
        {
          id: "2",
          label: "123123afsdfasdf12",
        },
        {
          id: "3",
          label: "123fasvcbxcvbxcvbxcvbxcvdfasdfasdfasdfasd12312",
        },
      ],
      value: "",
      showModal: false,
    };
  },
  methods: {
    addNotification() {
      addNotification(
        new Date().getTime(),
        "test",
        "test-text",
        "warning",
        3000
      );
    },
  },
};
</script>
